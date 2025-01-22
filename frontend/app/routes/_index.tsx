import { type ActionFunctionArgs, json, type LoaderFunctionArgs } from '@remix-run/node';
import { Form, useActionData, useNavigation, useSubmit, useLoaderData } from '@remix-run/react';
import { useRef, useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { FileText, Upload, ArrowRight, MoveRight } from 'lucide-react';
import { cn } from '~/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { convertResume } from '~/lib/api';
import { LatexOutput } from '~/components/latex-output';
import before from '~/assets/img/before.png';
import after from '~/assets/img/after.png';

type ActionData = {
  latex?: string;
  error?: string;
  request_id?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    API_URL: process.env.API_URL || 'http://localhost:3000'
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return json<ActionData>({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const API_URL = process.env.API_URL || 'http://localhost:3000';
    const response = await convertResume(file, API_URL);
    return json<ActionData>({ request_id: response.request_id });
  } catch (error) {
    return json<ActionData>(
      { error: error instanceof Error ? error.message : 'Failed to convert resume' },
      { status: 500 }
    );
  }
}

export default function Index() {
  const { API_URL } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const [status, setStatus] = useState<string>('');
  const [requestId, setRequestId] = useState<string | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);
  const [latex, setLatex] = useState<string | null>(null);

  // Handle request ID updates from action data
  useEffect(() => {
    console.log('Action data updated:', actionData);
    if (actionData?.request_id) {
      console.log('Setting request ID:', actionData.request_id);
      setRequestId(actionData.request_id);
    }
  }, [actionData]);

  // Handle SSE connection
  useEffect(() => {
    console.log('SSE Effect running:', {
      navigationState: navigation.state,
      requestId,
      hasEventSource: !!eventSourceRef.current,
      actionData: !!actionData
    });

    // Only set up SSE when we have a request ID
    if (requestId && !eventSourceRef.current) {
      console.log('Creating new EventSource connection:', {
        url: `${API_URL}/api/v1/status/events?request_id=${requestId}`
      });

      const eventSource = new EventSource(`${API_URL}/api/v1/status/events?request_id=${requestId}`);
      
      eventSource.onmessage = (event) => {
        console.log('Received SSE message:', event.data);
        const data = JSON.parse(event.data);
        setStatus(data.status);

        // If we have a result, update the state
        if (data.result?.latex) {
          console.log('Received final result, updating latex state');
          setLatex(data.result.latex);
        }

        // Close connection if we receive a completion or error message
        if (data.status.includes("completed") || data.status.includes("Error")) {
          console.log('Closing connection due to completion/error');
          eventSource.close();
          eventSourceRef.current = null;
          setRequestId(null); // Reset request ID
        }
      };

      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        eventSource.close();
        eventSourceRef.current = null;
        setRequestId(null); // Reset request ID
      };

      eventSource.onopen = () => {
        console.log('SSE connection opened successfully');
      };

      eventSourceRef.current = eventSource;
    }

    // Clean up when component unmounts or when we're done
    return () => {
      if (eventSourceRef.current) {
        console.log('Cleaning up SSE connection');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [API_URL, requestId]);

  // Reset state when starting a new submission
  useEffect(() => {
    if (navigation.state === 'submitting') {
      setStatus('');
      setLatex(null);
      if (eventSourceRef.current) {
        console.log('Cleaning up previous SSE connection before new submission');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    }
  }, [navigation.state]);

  const handleSubmission = (formData: FormData) => {
    submit(formData, { method: 'post', encType: 'multipart/form-data' });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer?.files?.[0];
    if (
      file &&
      (file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type === 'text/plain')
    ) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('file', file);
      handleSubmission(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('file', file);
      handleSubmission(formData);
    }
  };

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-blue-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12 relative"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4 relative inline-block">
          Make it{' '}
          <span className="relative inline-block">
            <span className="relative z-10 text-blue-700">Jake's</span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute inset-0 bg-blue-200/80 -skew-y-2 transform origin-left"
            />
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-[500px]">
          Transform your resume into Jake&apos;s elegant LaTeX template with just one click. No
          LaTeX knowledge required.
        </p>
      </motion.div>

      {!latex && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-8 mb-12"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative w-[200px] h-[282px] rounded-lg overflow-hidden shadow-lg"
            >
              <img src={before} alt="Before transformation" className="w-full h-full object-contain" />
              <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-sm py-2 text-center backdrop-blur-sm">
                Before
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col items-center gap-2"
            >
              <MoveRight className="w-8 h-8 text-blue-500" />
              <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                Industry Standard
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative w-[200px] h-[282px] rounded-lg overflow-hidden shadow-lg"
            >
              <img src={after} alt="After transformation" className="w-full h-full object-contain" />
              <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-sm py-2 text-center backdrop-blur-sm">
                After
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Form
              ref={formRef}
              method="post"
              encType="multipart/form-data"
              className={cn(
                'border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out cursor-pointer',
                'hover:border-blue-500/50 hover:bg-blue-50/50',
                dragActive ? 'border-blue-500 bg-blue-50' : 'border-muted-foreground/25',
                selectedFile ? 'border-blue-500/50 bg-blue-50/50' : ''
              )}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() =>
                (formRef.current?.querySelector('input[type="file"]') as HTMLInputElement)?.click()
              }
            >
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center gap-4">
                <div className="p-4 rounded-full bg-white shadow-sm">
                  {selectedFile ? (
                    <FileText className="w-8 h-8 text-blue-500 animate-pulse" />
                  ) : (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <div className="text-center">
                  {selectedFile ? (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">{selectedFile.name}</p>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="group bg-blue-600 hover:bg-blue-700"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {isSubmitting ? 'Converting...' : 'Convert Now'}
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <p className="font-medium">Drop your resume here or click to browse</p>
                      <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX, and TXT files</p>
                    </div>
                  )}
                </div>
              </div>
            </Form>
          </motion.div>
        </>
      )}

      <AnimatePresence>
        {latex && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-4xl"
          >
            <div className="flex justify-end mb-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setSelectedFile(null);
                  setLatex(null);
                  setStatus('');
                  window.location.reload();
                }}
              >
                Convert Another Resume
              </Button>
            </div>
            <LatexOutput latex={latex} />
          </motion.div>
        )}
      </AnimatePresence>

      {actionData?.error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg"
        >
          {actionData.error}
        </motion.div>
      )}

      {status && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-blue-600 animate-pulse"
        >
          {status}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-sm text-muted-foreground">
          No data is stored on our servers. Read our{' '}
          <a href="" className="underline">
            Privacy Policy
          </a>
          . We're{' '}
          <a href="https://github.com/martin226/makeitjakes" className="underline" target="_blank">
            open-source
          </a>{' '}
          ❤️! &copy; {new Date().getFullYear()} Martin Sit.
        </p>
      </motion.div>
    </div>
  );
}

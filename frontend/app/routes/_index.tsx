import { type ActionFunctionArgs, json, type LoaderFunctionArgs } from '@remix-run/node';
import { useActionData, useNavigation, useLoaderData } from '@remix-run/react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { convertResume } from '~/lib/api';
import { LatexOutput } from '~/components/latex-output';
import { Button } from '~/components/ui/button';
import { Header } from '~/components/header';
import { BeforeAfter } from '~/components/before-after';
import { FileUpload } from '~/components/file-upload';
import { StatusMessage } from '~/components/status-message';
import { Footer } from '~/components/footer';

type ActionData = {
  latex?: string;
  error?: string;
  request_id?: string;
};

export async function loader({ request }: LoaderFunctionArgs) {
  // Get the request URL to determine the base URL
  const url = new URL(request.url);
  // Force HTTPS only if we're not in development (localhost)
  if (!url.origin.includes('localhost')) {
    url.protocol = 'https:';
  }
  return json({
    API_ORIGIN: url.origin
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return json<ActionData>({ error: 'No file provided' }, { status: 400 });
  }

  try {
    // Use the request URL to determine the base URL
    const url = new URL(request.url);
    const response = await convertResume(file, url.origin);
    return json<ActionData>({ request_id: response.request_id });
  } catch (error) {
    return json<ActionData>(
      { error: error instanceof Error ? error.message : 'Failed to convert resume' },
      { status: 500 }
    );
  }
}

export default function Index() {
  const { API_ORIGIN } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
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

    let eventSource: EventSource | null = null;

    // Only set up SSE when we have a request ID
    if (requestId && !eventSourceRef.current) {
      // Create EventSource URL
      const eventSourceUrl = new URL(`${API_ORIGIN}/api/v1/status/events`);
      eventSourceUrl.searchParams.set('request_id', requestId);

      console.log('Creating new EventSource connection:', {
        url: eventSourceUrl.toString()
      });

      eventSource = new EventSource(eventSourceUrl.toString());
      eventSourceRef.current = eventSource;

      const handleMessage = (event: MessageEvent) => {
        console.log('Received SSE message:', event.data);
        try {
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
            eventSource?.close();
            eventSourceRef.current = null;
            // Don't reset requestId here, we need it for the PDF preview
          }
        } catch (error) {
          console.error('Failed to parse SSE message:', error);
          setStatus('An error occurred while processing your request');
          eventSource?.close();
          eventSourceRef.current = null;
        }
      };

      const handleError = (error: Event) => {
        console.error('SSE connection error:', error);
        eventSource?.close();
        eventSourceRef.current = null;
        setRequestId(null); // Reset request ID
      };

      const handleOpen = () => {
        console.log('SSE connection opened successfully');
      };

      eventSource.addEventListener('message', handleMessage);
      eventSource.addEventListener('error', handleError);
      eventSource.addEventListener('open', handleOpen);

      // Clean up function
      return () => {
        console.log('Cleaning up SSE connection and listeners');
        eventSource?.removeEventListener('message', handleMessage);
        eventSource?.removeEventListener('error', handleError);
        eventSource?.removeEventListener('open', handleOpen);
        eventSource?.close();
        eventSourceRef.current = null;
      };
    }

    // Clean up when component unmounts or when requestId changes
    return () => {
      if (eventSourceRef.current) {
        console.log('Cleaning up previous SSE connection');
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };
  }, [requestId, API_ORIGIN]);

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

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-6 pt-8">
        <div className="mx-auto space-y-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-playfair text-5xl md:text-6xl lg:text-7xl leading-tight"
            >
              Improve Your Resume in{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-primary/20" />
                <span className="relative">One Click</span>
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4"
            >
              Transform your SWE resume into Jake's elegant LaTeX template with just one click. <span className="font-bold">No LaTeX knowledge required</span>.
            </motion.p>
          </div>

          {!latex && (
            <>
              <div className="relative w-full max-w-5xl mx-auto text-center">
                {/* Floating Cards */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute lg:-left-20 xl:-left-44 -top-12 w-48 h-48 hidden lg:block"
                >
                  <motion.div
                    initial={{ rotate: -15 }}
                    animate={{ rotate: -10 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded mb-2">
                      <svg className="w-6 h-6 text-red-500 m-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                      </svg>
                    </div>
                    <div className="text-xs">resume.pdf</div>
                  </motion.div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="absolute lg:-right-20 xl:-right-44 top-12 w-48 h-48 hidden lg:block"
                >
                  <motion.div
                    initial={{ rotate: 15 }}
                    animate={{ rotate: 10 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="w-full h-full bg-white rounded-lg shadow-lg p-4 flex flex-col"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded mb-2">
                      <svg className="w-6 h-6 text-primary m-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z" />
                      </svg>
                    </div>
                    <div className="text-xs">template.tex</div>
                  </motion.div>
                </motion.div>

                <div className="flex justify-center">
                  <BeforeAfter />
                </div>

                <div className="mt-16 max-w-2xl mx-auto">
                  <FileUpload 
                    isSubmitting={isSubmitting} 
                    isProcessing={!!requestId} 
                  />
                </div>
              </div>
            </>
          )}

          <AnimatePresence>
            {latex && (
              <div className="flex justify-center w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full max-w-[90vw] md:max-w-4xl text-left"
                >
                  <div className="flex justify-end mb-4">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setLatex(null);
                        setStatus('');
                        setRequestId(null);
                        window.location.reload();
                      }}
                    >
                      Convert Another Resume
                    </Button>
                  </div>
                  <LatexOutput latex={latex} requestId={requestId} />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <div className="text-center">
            <StatusMessage error={actionData?.error} status={status} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

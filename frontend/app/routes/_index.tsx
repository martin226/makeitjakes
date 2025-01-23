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

  const isSubmitting = navigation.state === 'submitting';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-blue-50 flex flex-col items-center justify-center p-4">
      <Header />

      {!latex && (
        <>
          <BeforeAfter />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FileUpload isSubmitting={isSubmitting} />
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

      <StatusMessage error={actionData?.error} status={status} />
      <Footer />
    </div>
  );
}

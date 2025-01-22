import { type ActionFunctionArgs, json } from '@remix-run/node';
import { Form, useActionData, useNavigation, useSubmit } from '@remix-run/react';
import { useRef, useState } from 'react';
import { Button } from '~/components/ui/button';
import { FileText, Upload, ArrowRight, MoveRight } from 'lucide-react';
import { cn } from '~/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return json({ error: 'No file provided' }, { status: 400 });
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return json({ success: true });
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

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
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    ) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('file', file);
      submit(formData, { method: 'post', encType: 'multipart/form-data' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('file', file);
      submit(formData, { method: 'post', encType: 'multipart/form-data' });
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
          <img
            src="https://resumeworded.com/assets/images/resume-guides/software-engineer-intern.png"
            alt="Before transformation"
            className="w-full h-full object-contain"
          />
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
          <img
            src="https://i.ibb.co/QbypnwX/image.png"
            alt="After transformation"
            className="w-full h-full object-contain"
          />
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
            accept=".pdf,.docx"
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
                  <p className="text-sm text-muted-foreground">Supports PDF and DOCX files</p>
                </div>
              )}
            </div>
          </div>
        </Form>
      </motion.div>

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

import { useRef, useState } from 'react';
import { Form, useSubmit } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';

interface FileUploadProps {
  isSubmitting: boolean;
  isProcessing?: boolean;
}

export function FileUpload({ isSubmitting, isProcessing = false }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

  const isDisabled = isSubmitting || isProcessing;

  const handleSubmission = (formData: FormData) => {
    if (isDisabled) return;
    submit(formData, { method: 'post', encType: 'multipart/form-data' });
  };

  const handleDrag = (e: React.DragEvent) => {
    if (isDisabled) return;
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    if (isDisabled) return;
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
    if (isDisabled) return;
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const formData = new FormData();
      formData.append('file', file);
      handleSubmission(formData);
    }
  };

  return (
    <Form
      ref={formRef}
      method="post"
      encType="multipart/form-data"
      className={cn(
        'border-2 border-dashed border-gray-300 rounded-lg p-12 text-center',
        !isDisabled && 'cursor-pointer hover:border-primary/50 hover:bg-primary/5',
        dragActive && 'border-primary bg-primary/10'
      )}
      onClick={() => {
        if (!isDisabled) {
          const fileInput = formRef.current?.querySelector('input[type="file"]') as HTMLInputElement;
          fileInput?.click();
        }
      }}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        name="file"
        className="hidden"
        accept=".pdf,.doc,.docx,.txt"
        onChange={handleChange}
        disabled={isDisabled}
      />

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mx-auto w-16 h-16 mb-4"
      >
        <svg className="w-full h-full text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        {selectedFile ? (
          <div className="space-y-2">
            <p className="text-sm font-medium">{selectedFile.name}</p>
            <Button
              type="submit"
              disabled={isDisabled}
              className={cn(
                "bg-primary hover:bg-primary/90",
                isDisabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {isProcessing ? 'Processing...' : isSubmitting ? 'Converting...' : 'Convert Now'}
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Drop your resume here or click to browse</h3>
            <p className="text-muted-foreground">Supports PDF, DOC, DOCX, and TXT files</p>
            <Button className="mt-4 bg-primary hover:bg-primary/90">Upload Resume</Button>
          </div>
        )}
      </motion.div>
    </Form>
  );
} 
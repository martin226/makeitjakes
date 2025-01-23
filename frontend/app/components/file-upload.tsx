import { useRef, useState } from 'react';
import { Form, useSubmit } from '@remix-run/react';
import { Button } from '~/components/ui/button';
import { FileText, Upload, ArrowRight } from 'lucide-react';
import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';

interface FileUploadProps {
  isSubmitting: boolean;
}

export function FileUpload({ isSubmitting }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();

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

  return (
    <Form
      ref={formRef}
      method="post"
      encType="multipart/form-data"
      className={cn(
        'flex flex-col items-center justify-center w-full max-w-md p-8 text-center',
        'border-2 border-dashed rounded-xl transition-colors duration-200 cursor-pointer',
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
      )}
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
      />

      <div className="flex flex-col items-center gap-4">
        <div
          className={cn(
            'p-4 rounded-full transition-colors duration-200',
            dragActive ? 'bg-blue-100' : 'bg-gray-100'
          )}
        >
          {isSubmitting ? (
            <Upload className="w-8 h-8 text-blue-500 animate-bounce" />
          ) : (
            <FileText className="w-8 h-8 text-gray-500" />
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
  );
} 
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
import { Copy, Download, Eye } from 'lucide-react';
import { cn } from '~/lib/utils';

interface LatexOutputProps {
  latex: string;
  className?: string;
  requestId: string | null;
}

export function LatexOutput({ latex, className, requestId }: LatexOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([latex], { type: 'application/x-latex' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.tex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Tabs defaultValue="pdf" className="w-full">
      <TabsList className="mb-4 w-full flex">
        <TabsTrigger value="pdf" className="flex-1">Rendered PDF</TabsTrigger>
        <TabsTrigger value="latex" className="flex-1">LaTeX Code</TabsTrigger>
      </TabsList>

      <TabsContent value="pdf" className="mt-0">
        <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 h-[500px] md:h-[800px]">
          <iframe
            src={`/api/v1/resumes/preview?request_id=${requestId}`}
            className="w-full h-full border-0"
            title="PDF Preview"
          />
        </div>
      </TabsContent>

      <TabsContent value="latex" className="mt-0">
        <div className="relative">
          <div className="sticky top-0 z-10 flex justify-end bg-background/80 backdrop-blur-sm py-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
          <pre className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
            <code className="text-white text-sm whitespace-pre-wrap break-words">{latex}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
} 
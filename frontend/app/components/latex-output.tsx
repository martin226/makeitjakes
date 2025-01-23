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
      <TabsList className="mb-4">
        <TabsTrigger value="pdf">Rendered PDF</TabsTrigger>
        <TabsTrigger value="latex">LaTeX Code</TabsTrigger>
      </TabsList>

      <TabsContent value="pdf" className="mt-0">
        <div className="bg-white rounded-lg shadow-lg p-4 h-[800px]">
          <iframe
            src={`/api/v1/resumes/preview?request_id=${requestId}`}
            className="w-full h-full border-0"
            title="PDF Preview"
          />
        </div>
      </TabsContent>

      <TabsContent value="latex" className="mt-0">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 top-4 gap-1.5"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <pre className="bg-zinc-950 rounded-lg p-4 overflow-x-auto">
            <code className="text-white text-sm">{latex}</code>
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
} 
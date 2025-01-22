import { useState } from 'react';
import { Button } from './ui/button';
import { Copy, Download, Eye } from 'lucide-react';
import { cn } from '~/lib/utils';

interface LatexOutputProps {
  latex: string;
  className?: string;
}

export function LatexOutput({ latex, className }: LatexOutputProps) {
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
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">LaTeX Output</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="gap-2"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://www.overleaf.com/docs?snip_uri=your-latex-url', '_blank')}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview in Overleaf
          </Button>
        </div>
      </div>
      <pre className="bg-zinc-950 text-zinc-50 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{latex}</code>
      </pre>
    </div>
  );
} 
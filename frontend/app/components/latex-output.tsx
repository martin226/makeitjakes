import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Button } from '~/components/ui/button';
import { Copy, Download, ExternalLink, Eye } from 'lucide-react';
import { cn } from '~/lib/utils';
import { useLoaderData } from '@remix-run/react';
import { ClientOnly } from 'remix-utils/client-only';
import { PDFViewer } from './pdf-viewer.client';
import { Buffer } from 'buffer';

interface LatexOutputProps {
  latex: string;
  className?: string;
  requestId: string | null;
}

export function LatexOutput({ latex, className, requestId }: LatexOutputProps) {
  const { API_ORIGIN } = useLoaderData<{ API_ORIGIN: string }>();
  const [copied, setCopied] = useState(false);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [personName, setPersonName] = useState<string | null>(null);

  useEffect(() => {
    const fetchPdf = async () => {
      if (!requestId) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${API_ORIGIN}/api/v1/resumes/preview?request_id=${requestId}`);
        const data = await response.json();
        
        if (data.pdf) {
          setPdfData(`data:application/pdf;base64,${data.pdf}`);
          if (data.name) {
            try {
              // Try to parse as JSON first
              const nameObj = JSON.parse(data.name);
              const first = nameObj.firstName || nameObj.first_name || nameObj.first;
              const last = nameObj.lastName || nameObj.last_name || nameObj.last;
              if (first && last) {
                setPersonName(`${first} ${last}`);
              } else {
                setPersonName(null);
              }
            } catch (e) {
              setPersonName(data.name);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdf();
  }, [requestId, API_ORIGIN]);

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

  const handlePdfDownload = () => {
    if (!pdfData) return;
    
    const byteCharacters = atob(pdfData.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const formatName = (name: string) => {
      return name
        .split(/\s+/)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join('');
    };
    const fileName = personName 
      ? `${formatName(personName)}_Resume.pdf`
      : 'resume.pdf';
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const base64Latex = useMemo(() => {
    return Buffer.from(latex, 'utf-8').toString('base64');
  }, [latex]);

  return (
    <Tabs defaultValue="pdf" className="w-full">
      <TabsList className="mb-4 w-full flex">
        <TabsTrigger value="pdf" className="flex-1">Rendered PDF</TabsTrigger>
        <TabsTrigger value="latex" className="flex-1">LaTeX Code</TabsTrigger>
      </TabsList>

      <TabsContent value="pdf" className="mt-0">
        <div className="bg-white rounded-lg shadow-lg p-2 md:p-4">
          <div className="flex justify-end gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handlePdfDownload}
              disabled={!pdfData}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
          
          <div className="h-[500px] md:h-[800px] overflow-auto">
            <ClientOnly fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            }>
              {() => <PDFViewer pdfData={pdfData} loading={loading} />}
            </ClientOnly>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="latex" className="mt-0">
        <div className="relative">
          <div className="sticky top-0 z-10 flex justify-end gap-2 bg-background/80 backdrop-blur-sm py-2">
            <form action="https://www.overleaf.com/docs" method="post" target="_blank">
              <input type="hidden" name="snip_uri" value={`data:application/x-tex;base64,${base64Latex}`} />
              <Button type="submit" variant="outline" size="sm" className="gap-1.5">
                <ExternalLink className="w-4 h-4" />
                Open in Overleaf
              </Button>
            </form>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
              Download LaTeX
            </Button>
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
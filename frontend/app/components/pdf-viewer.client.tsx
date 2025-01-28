import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import PDFWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
  
pdfjs.GlobalWorkerOptions.workerSrc = PDFWorker;

interface PDFViewerProps {
  pdfData: string | null;
  loading: boolean;
}

export function PDFViewer({ pdfData, loading }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(1);
  
  if (typeof window === 'undefined') return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!pdfData) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No PDF available. Try opening in Overleaf!
      </div>
    );
  }

  return (
    <Document
      file={pdfData}
      onLoadSuccess={({ numPages }: { numPages: number }) => setNumPages(numPages)}
      className="flex flex-col items-center"
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
          width={Math.min(window.innerWidth - 100, 800)}
          className="mb-4"
        />
      ))}
    </Document>
  );
} 
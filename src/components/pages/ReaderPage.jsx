import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Sidebar from "@/components/organisms/Sidebar";
import PDFViewer from "@/components/organisms/PDFViewer";
import FileUpload from "@/components/molecules/FileUpload";
import Loading from "@/components/ui/Loading";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import pdfService from "@/services/api/pdfService";
import annotationService from "@/services/api/annotationService";
import summaryService from "@/services/api/summaryService";
import searchService from "@/services/api/searchService";

const ReaderPage = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);

  // Load initial data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [pdfData, annotationData, summaryData] = await Promise.all([
        pdfService.getAll(),
        annotationService.getAll(),
        summaryService.getAll()
      ]);
      
      setPdfs(pdfData);
      setAnnotations(annotationData);
      setSummaries(summaryData);
      
      // Auto-select first PDF if available
      if (pdfData.length > 0) {
        setSelectedPdf(pdfData[0]);
      }
    } catch (err) {
      setError(err.message);
      toast.error("Failed to load PDF library");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = () => {
    setShowFileUpload(true);
  };

  const handleFileSelect = async (file) => {
    try {
      const newPdf = {
        id: Date.now().toString(),
        title: file.name.replace('.pdf', ''),
        path: URL.createObjectURL(file),
        size: file.size,
        pageCount: Math.floor(Math.random() * 50) + 10, // Simulate page count
        lastOpened: new Date(),
        isOCRProcessed: false,
        extractedText: []
      };

      const savedPdf = await pdfService.create(newPdf);
      setPdfs(prev => [savedPdf, ...prev]);
      setSelectedPdf(savedPdf);
      setShowFileUpload(false);
      
      toast.success(`${file.name} loaded successfully`);
      
      // Simulate OCR processing
      setTimeout(async () => {
        try {
          const updatedPdf = await pdfService.update(savedPdf.id, {
            isOCRProcessed: true,
            extractedText: ["Sample extracted text from OCR processing..."]
          });
          setPdfs(prev => prev.map(p => p.id === savedPdf.id ? updatedPdf : p));
          toast.success("OCR processing completed");
        } catch (err) {
          toast.error("OCR processing failed");
        }
      }, 3000);
      
    } catch (err) {
      toast.error("Failed to load PDF file");
    }
  };

  const handlePdfSelect = async (pdf) => {
    try {
      const updatedPdf = await pdfService.update(pdf.id, {
        lastOpened: new Date()
      });
      setSelectedPdf(updatedPdf);
      setPdfs(prev => prev.map(p => p.id === pdf.id ? updatedPdf : p));
    } catch (err) {
      toast.error("Failed to open PDF");
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const results = await searchService.search(query, pdfs.map(p => p.id));
      setSearchResults(results);
      
      if (results.length === 0) {
        toast.info("No results found for your search");
      } else {
        toast.success(`Found ${results.length} results`);
      }
    } catch (err) {
      toast.error("Search failed");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleAnnotationAdd = async (annotation) => {
    try {
      const savedAnnotation = await annotationService.create(annotation);
      setAnnotations(prev => [savedAnnotation, ...prev]);
      toast.success("Annotation added");
    } catch (err) {
      toast.error("Failed to save annotation");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadData} />;
  }

  return (
    <div className="flex h-screen bg-nord-0">
      <Sidebar
        pdfs={pdfs}
        selectedPdf={selectedPdf}
        onPdfSelect={handlePdfSelect}
        onFileUpload={handleFileUpload}
        searchResults={searchResults}
        onSearch={handleSearch}
        searchLoading={searchLoading}
        annotations={annotations.filter(a => selectedPdf && a.pdfId === selectedPdf.id)}
        summaries={summaries.filter(s => selectedPdf && s.pdfId === selectedPdf.id)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {showFileUpload ? (
          <div className="p-8">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-nord-4 mb-2">Add PDF Files</h2>
                <p className="text-nord-3">
                  Upload PDF documents to start reading with AI-powered features
                </p>
              </div>
              <FileUpload 
                onFileSelect={handleFileSelect}
                accept=".pdf"
                multiple={false}
              />
              <div className="mt-4 text-center">
                <button
                  onClick={() => setShowFileUpload(false)}
                  className="text-nord-3 hover:text-nord-4 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ) : selectedPdf ? (
          <PDFViewer
            pdf={selectedPdf}
            annotations={annotations.filter(a => a.pdfId === selectedPdf.id)}
            onAnnotationAdd={handleAnnotationAdd}
            searchHighlights={searchResults}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <Empty 
              type="pdfs" 
              onAction={handleFileUpload}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReaderPage;
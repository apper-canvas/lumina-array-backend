import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import ZoomControls from "@/components/molecules/ZoomControls";
import AnnotationToolbar from "@/components/molecules/AnnotationToolbar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const PDFViewer = ({ pdf, annotations = [], onAnnotationAdd, searchHighlights = [] }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTool, setSelectedTool] = useState("select");
  const [selectedColor, setSelectedColor] = useState("#88C0D0");
  const [isNightMode, setIsNightMode] = useState(false);
  const [reflowMode, setReflowMode] = useState(false);
  const viewerRef = useRef();

  // Simulate PDF loading
  useEffect(() => {
    if (pdf) {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        try {
          // Simulate successful PDF loading
          setLoading(false);
        } catch (err) {
          setError("Failed to load PDF");
          setLoading(false);
        }
      }, 1500);
    }
  }, [pdf]);

  const handleZoomChange = (newZoom) => {
    if (typeof newZoom === "string") {
      // Handle fit-width, fit-page
      if (newZoom === "fit-width") {
        setZoom(1.2);
      } else if (newZoom === "fit-page") {
        setZoom(1);
      }
    } else {
      setZoom(newZoom);
    }
  };

  const handleToolSelect = (tool, color) => {
    setSelectedTool(tool);
    if (color) setSelectedColor(color);
  };

  const handlePageNavigation = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === "next" && currentPage < pdf.pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection.toString().trim() && selectedTool === "highlight") {
      const annotation = {
        id: Date.now().toString(),
        pdfId: pdf.id,
        type: "highlight",
        pageNumber: currentPage,
        content: selection.toString(),
        color: selectedColor,
        coordinates: { x: 100, y: 100, width: 200, height: 20 },
        createdAt: new Date()
      };
      
      if (onAnnotationAdd) {
        onAnnotationAdd(annotation);
      }
      
      selection.removeAllRanges();
    }
  };

  if (loading) {
    return <Loading type="pdf" />;
  }

  if (error) {
    return <Error message={error} type="file" onRetry={() => window.location.reload()} />;
  }

  if (!pdf) {
    return (
      <div className="flex items-center justify-center h-full text-nord-3">
        <div className="text-center">
          <ApperIcon name="FileText" size={48} className="mx-auto mb-4 text-nord-3" />
          <p>No PDF selected</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-nord-0">
      {/* Toolbar */}
      <motion.div 
        className="flex items-center justify-between p-4 bg-nord-1/50 border-b border-nord-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-nord-4 truncate max-w-md">
            {pdf.title}
          </h2>
          <div className="text-sm text-nord-3">
            Page {currentPage} of {pdf.pageCount}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setReflowMode(!reflowMode)}
            title="Reflow Text"
          >
            <ApperIcon name="AlignLeft" size={16} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNightMode(!isNightMode)}
            title="Night Mode"
          >
            <ApperIcon name={isNightMode ? "Sun" : "Moon"} size={16} />
          </Button>
          
          <ZoomControls zoom={zoom} onZoomChange={handleZoomChange} />
          <AnnotationToolbar 
            selectedTool={selectedTool} 
            onToolSelect={handleToolSelect} 
          />
        </div>
      </motion.div>

      {/* PDF Content */}
      <div 
        ref={viewerRef}
        className={`flex-1 overflow-auto p-4 ${isNightMode ? "night-mode" : ""}`}
        onMouseUp={handleTextSelection}
      >
        <motion.div 
          className="max-w-4xl mx-auto space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
>
          {/* Simulated PDF Pages */}
          {[...Array(Math.min(3, pdf.pageCount))].map((_, index) => (
            <motion.div
              key={`page-${currentPage + index}`}
              className="pdf-page relative bg-white p-8 shadow-lg"
              style={{ 
                transform: `scale(${zoom})`,
                transformOrigin: "top center"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Simulated PDF Content */}
              <div className={`${reflowMode ? "max-w-none" : "max-w-2xl"} font-body text-gray-900 leading-relaxed`}>
                <h1 className="text-2xl font-bold mb-6 text-gray-900">
                  {pdf.title} - Page {currentPage + index}
                </h1>
                
                <p className="mb-4">
                  This is a simulated PDF page with sample content. In a real implementation, 
                  this would be rendered PDF content with actual text that can be selected, 
                  highlighted, and annotated.
                </p>
                
                <p className="mb-4">
                  The viewer supports various annotation tools including highlighting with 
                  different colors, pen drawing, and text notes. OCR processing would make 
                  scanned documents searchable and selectable.
                </p>

                {searchHighlights.length > 0 && (
                  <p className="mb-4">
                    Search results would be <span className="bg-yellow-300 px-1">highlighted</span> 
                    throughout the document, with semantic search finding contextually relevant content 
                    even when exact keywords don't match.
                  </p>
                )}

                {/* Simulated annotations */}
                {annotations.filter(a => a.pageNumber === currentPage + index).map((annotation) => (
                  <div
                    key={annotation.id}
                    className={`absolute pdf-highlight ${
                      annotation.type === "highlight" ? "annotation-highlight" : "annotation-note"
                    }`}
                    style={{
                      left: annotation.coordinates.x,
                      top: annotation.coordinates.y,
                      width: annotation.coordinates.width,
                      height: annotation.coordinates.height,
                      backgroundColor: annotation.color + "50"
                    }}
                    title={annotation.content}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Page Navigation */}
      <motion.div 
        className="flex items-center justify-center gap-4 p-4 bg-nord-1/50 border-t border-nord-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageNavigation("prev")}
          disabled={currentPage === 1}
        >
          <ApperIcon name="ChevronLeft" size={16} />
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-nord-4">
          <input
            type="number"
            min={1}
            max={pdf.pageCount}
            value={currentPage}
            onChange={(e) => setCurrentPage(Math.max(1, Math.min(pdf.pageCount, parseInt(e.target.value) || 1)))}
            className="w-16 px-2 py-1 bg-nord-1 border border-nord-3 rounded text-center focus-ring"
          />
          <span>of {pdf.pageCount}</span>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageNavigation("next")}
          disabled={currentPage === pdf.pageCount}
        >
          <ApperIcon name="ChevronRight" size={16} />
        </Button>
      </motion.div>
    </div>
  );
};

export default PDFViewer;
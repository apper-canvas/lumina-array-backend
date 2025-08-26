import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import Loading from "@/components/ui/Loading";

const Sidebar = ({ 
  pdfs = [], 
  selectedPdf, 
  onPdfSelect, 
  onFileUpload,
  searchResults = [],
  onSearch,
  searchLoading = false,
  annotations = [],
  summaries = []
}) => {
  const [activeTab, setActiveTab] = useState("files");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const tabs = [
    { id: "files", icon: "Files", label: "Files" },
    { id: "search", icon: "Search", label: "Search" },
    { id: "annotations", icon: "MessageSquare", label: "Notes" },
    { id: "summaries", icon: "FileText", label: "Summaries" }
  ];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "files":
        return (
          <div className="space-y-3">
            <Button
              onClick={onFileUpload}
              className="w-full"
              icon="Plus"
            >
              Add PDF
            </Button>
            
            {pdfs.length === 0 ? (
              <Empty type="pdfs" onAction={onFileUpload} />
            ) : (
              <div className="space-y-2">
                {pdfs.map((pdf) => (
                  <motion.div
                    key={pdf.id}
                    onClick={() => onPdfSelect(pdf)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedPdf?.id === pdf.id
                        ? "bg-nord-8/10 border-nord-8"
                        : "bg-nord-1 border-nord-3 hover:bg-nord-2"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-10 bg-nord-11/10 rounded flex items-center justify-center flex-shrink-0">
                        <ApperIcon name="FileText" size={16} className="text-nord-11" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-nord-4 truncate text-sm">
                          {pdf.title}
                        </h3>
                        <p className="text-xs text-nord-3 mt-1">
                          {pdf.pageCount} pages • {formatFileSize(pdf.size)}
                        </p>
                        {pdf.lastOpened && (
                          <p className="text-xs text-nord-3">
                            Last opened {new Date(pdf.lastOpened).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        );

      case "search":
        return (
          <div className="space-y-4">
            <SearchBar 
              onSearch={onSearch}
              loading={searchLoading}
              placeholder="Semantic search..."
            />
            
            {searchLoading ? (
              <Loading type="search" />
            ) : searchResults.length === 0 ? (
              <Empty type="search" />
) : (
              <div className="space-y-3">
                {searchResults.map((result, index) => (
                  <motion.div
                    key={`search-${index}`}
                    className="p-3 bg-nord-1 border border-nord-3 rounded-lg hover:bg-nord-2 cursor-pointer transition-colors"
                    onClick={() => {
                      const pdf = pdfs.find(p => p.id === result.pdfId);
                      if (pdf) onPdfSelect(pdf);
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <ApperIcon name="FileText" size={14} className="text-nord-8" />
                      <span className="text-xs font-medium text-nord-4">
                        Page {result.pageNumber}
                      </span>
                      <div className="w-1 h-1 bg-nord-3 rounded-full" />
                      <span className="text-xs text-nord-3">
                        {Math.round(result.relevanceScore * 100)}% match
                      </span>
                    </div>
                    <p className="text-sm text-nord-4 leading-relaxed">
                      {result.snippet}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        );

      case "annotations":
        return (
<div className="space-y-3">
            {annotations.length === 0 ? (
              <Empty type="annotations" />
            ) : (
              annotations.map((annotation) => (
                <motion.div
                  key={annotation.id}
                  className="p-3 bg-nord-1 border border-nord-3 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: annotation.color }}
                    />
                    <span className="text-xs font-medium text-nord-4">
                      {annotation.type === "highlight" ? "Highlight" : "Note"}
                    </span>
                    <div className="w-1 h-1 bg-nord-3 rounded-full" />
                    <span className="text-xs text-nord-3">
                      Page {annotation.pageNumber}
                    </span>
                  </div>
                  <p className="text-sm text-nord-4">
                    {annotation.content}
                  </p>
                  <p className="text-xs text-nord-3 mt-2">
                    {new Date(annotation.createdAt).toLocaleString()}
                  </p>
                </motion.div>
              ))
            )}
          </div>
        );

      case "summaries":
        return (
<div className="space-y-3">
            {summaries.length === 0 ? (
              <Empty type="summaries" />
            ) : (
              summaries.map((summary) => (
                <motion.div
                  key={summary.id}
                  className="p-3 bg-nord-1 border border-nord-3 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <ApperIcon name="Sparkles" size={14} className="text-nord-13" />
                    <span className="text-xs font-medium text-nord-4">
                      Page {summary.pageNumber} Summary
                    </span>
                  </div>
                  <p className="text-sm text-nord-4 leading-relaxed mb-3">
                    {summary.summaryText}
                  </p>
                  {summary.keyPoints && summary.keyPoints.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-xs font-medium text-nord-3">Key Points:</span>
                      <ul className="space-y-1">
                        {summary.keyPoints.map((point, index) => (
                          <li key={`point-${index}`} className="text-xs text-nord-4 flex items-start gap-2">
                            <div className="w-1 h-1 bg-nord-8 rounded-full mt-2 flex-shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.div 
        className={`hidden lg:flex flex-col bg-nord-1 border-r border-nord-3 transition-all duration-300 ${
          isCollapsed ? "w-16" : "w-80"
        }`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        {/* Header */}
        <div className="p-4 border-b border-nord-3">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <h1 className="text-lg font-bold text-nord-4">LuminaPDF</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
            </Button>
          </div>
        </div>

        {!isCollapsed && (
<>
            {/* Tabs */}
            <div className="p-4 border-b border-nord-3">
              <div className="grid grid-cols-2 gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 text-xs"
                  >
                    <ApperIcon name={tab.icon} size={14} />
                    {tab.label}
                  </Button>
                ))}
</div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>

      {/* Mobile Sidebar (Overlay) */}
      <motion.div 
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-80 bg-nord-1 border-r border-nord-3 transform -translate-x-full"
        initial={{ x: "-100%" }}
      >
        {/* Mobile sidebar content would go here */}
      </motion.div>
    </>
  );
};

export default Sidebar;
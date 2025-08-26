import { useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const FileUpload = ({ onFileSelect, accept = ".pdf", multiple = false }) => {
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && onFileSelect) {
      if (multiple) {
        onFileSelect(files);
      } else {
        onFileSelect(files[0]);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf"
    );
    if (files.length > 0 && onFileSelect) {
      if (multiple) {
        onFileSelect(files);
      } else {
        onFileSelect(files[0]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <motion.div
        className="border-2 border-dashed border-nord-3 rounded-lg p-8 text-center hover:border-nord-8 transition-colors cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-nord-8/10 rounded-full flex items-center justify-center">
            <ApperIcon name="Upload" size={24} className="text-nord-8" />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-nord-4 mb-2">
              Drop PDF files here
            </h3>
            <p className="text-nord-3 text-sm mb-4">
              or click to browse your computer
            </p>
            <Button variant="outline" size="sm">
              <ApperIcon name="FolderOpen" size={16} className="mr-2" />
              Browse Files
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FileUpload;
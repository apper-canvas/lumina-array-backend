import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message, onRetry, type = "default" }) => {
  const getErrorContent = () => {
    switch (type) {
      case "file":
        return {
          icon: "FileX",
          title: "File Error",
          description: "Unable to load or process the PDF file"
        };
      case "ocr":
        return {
          icon: "ScanText",
          title: "OCR Error",
          description: "Failed to extract text from scanned pages"
        };
      case "search":
        return {
          icon: "SearchX",
          title: "Search Error",
          description: "Unable to perform semantic search"
        };
      default:
        return {
          icon: "AlertTriangle",
          title: "Something went wrong",
          description: "An unexpected error occurred"
        };
    }
  };

  const { icon, title, description } = getErrorContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[300px] text-center px-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-16 h-16 bg-nord-11/10 rounded-full flex items-center justify-center mb-4"
      >
        <ApperIcon name={icon} size={32} className="text-nord-11" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-nord-4 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-nord-3 mb-2 max-w-md"
      >
        {description}
      </motion.p>
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-nord-3 mb-6 bg-nord-1 px-3 py-2 rounded-lg font-mono"
        >
          {message}
        </motion.p>
      )}
      
      {onRetry && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onRetry}
          className="flex items-center gap-2 bg-nord-8 hover:bg-nord-9 text-nord-0 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 focus-ring"
        >
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};

export default Error;
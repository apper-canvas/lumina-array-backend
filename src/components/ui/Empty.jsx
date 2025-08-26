import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ type = "default", onAction }) => {
  const getEmptyContent = () => {
    switch (type) {
      case "pdfs":
        return {
          icon: "FileText",
          title: "No PDFs loaded",
          description: "Start by opening a PDF file to begin reading and analysis",
          actionText: "Browse Files",
          actionIcon: "FolderOpen"
        };
      case "search":
        return {
          icon: "Search",
          title: "No results found",
          description: "Try different keywords or check your spelling",
          actionText: "Clear Search",
          actionIcon: "X"
        };
      case "annotations":
        return {
          icon: "MessageSquare",
          title: "No annotations yet",
          description: "Select text to highlight, add notes, or draw annotations",
          actionText: "Start Annotating",
          actionIcon: "Highlighter"
        };
      case "summaries":
        return {
          icon: "FileText",
          title: "No summaries available",
          description: "AI summaries will appear here as you read through pages",
          actionText: "Generate Summary",
          actionIcon: "Sparkles"
        };
      default:
        return {
          icon: "Inbox",
          title: "Nothing here yet",
          description: "Content will appear here once available",
          actionText: "Get Started",
          actionIcon: "ArrowRight"
        };
    }
  };

  const { icon, title, description, actionText, actionIcon } = getEmptyContent();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[200px] text-center px-6 py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="w-16 h-16 bg-nord-8/10 rounded-full flex items-center justify-center mb-4"
      >
        <ApperIcon name={icon} size={32} className="text-nord-8" />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg font-semibold text-nord-4 mb-2"
      >
        {title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-nord-3 mb-6 max-w-sm text-sm leading-relaxed"
      >
        {description}
      </motion.p>
      
      {onAction && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={onAction}
          className="flex items-center gap-2 bg-nord-8/10 hover:bg-nord-8/20 text-nord-8 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 border border-nord-8/20 hover:border-nord-8/30 focus-ring"
        >
          <ApperIcon name={actionIcon} size={16} />
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;
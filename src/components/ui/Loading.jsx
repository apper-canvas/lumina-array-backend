import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "pdf") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] bg-nord-0">
        <div className="w-full max-w-2xl space-y-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="bg-nord-1 rounded-lg h-[200px] border border-nord-2"
            />
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-nord-3 text-sm"
        >
          Rendering PDF pages...
        </motion.div>
      </div>
    );
  }

  if (type === "search") {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
            className="space-y-2"
          >
            <div className="h-4 bg-nord-1 rounded w-3/4"></div>
            <div className="h-3 bg-nord-2 rounded w-full"></div>
            <div className="h-3 bg-nord-2 rounded w-2/3"></div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-nord-3 border-t-nord-8 rounded-full"
      />
    </div>
  );
};

export default Loading;
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ZoomControls = ({ zoom, onZoomChange, minZoom = 0.5, maxZoom = 3 }) => {
  const zoomLevels = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
  
  const handleZoomIn = () => {
    const currentIndex = zoomLevels.findIndex(level => level >= zoom);
    const nextIndex = Math.min(currentIndex + 1, zoomLevels.length - 1);
    onZoomChange(zoomLevels[nextIndex]);
  };

  const handleZoomOut = () => {
    const currentIndex = zoomLevels.findIndex(level => level >= zoom);
    const prevIndex = Math.max(currentIndex - 1, 0);
    onZoomChange(zoomLevels[prevIndex]);
  };

  const handleFitWidth = () => {
    onZoomChange("fit-width");
  };

  const handleFitPage = () => {
    onZoomChange("fit-page");
  };

  return (
    <motion.div 
      className="flex items-center gap-2 bg-nord-1/90 backdrop-blur-sm border border-nord-3 rounded-lg p-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleZoomOut}
        disabled={zoom <= minZoom}
      >
        <ApperIcon name="ZoomOut" size={16} />
      </Button>
      
      <div className="text-sm text-nord-4 font-medium min-w-[60px] text-center">
        {Math.round(zoom * 100)}%
      </div>
      
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleZoomIn}
        disabled={zoom >= maxZoom}
      >
        <ApperIcon name="ZoomIn" size={16} />
      </Button>
      
      <div className="w-px h-6 bg-nord-3 mx-1" />
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleFitWidth}
        className="text-xs"
      >
        Fit Width
      </Button>
      
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleFitPage}
        className="text-xs"
      >
        Fit Page
      </Button>
    </motion.div>
  );
};

export default ZoomControls;
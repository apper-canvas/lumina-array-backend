import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const AnnotationToolbar = ({ onToolSelect, selectedTool = "select" }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState("#88C0D0");

  const tools = [
    { id: "select", icon: "MousePointer", label: "Select" },
    { id: "highlight", icon: "Highlighter", label: "Highlight" },
    { id: "pen", icon: "Pen", label: "Draw" },
    { id: "note", icon: "MessageSquare", label: "Note" },
  ];

  const colors = [
    "#88C0D0", // Arctic blue
    "#EBCB8B", // Warning yellow
    "#A3BE8C", // Success green
    "#BF616A", // Error red
    "#B48EAD", // Purple
    "#D08770", // Orange
  ];

  const handleToolSelect = (toolId) => {
    onToolSelect(toolId, selectedColor);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorPicker(false);
    if (selectedTool === "highlight" || selectedTool === "pen") {
      onToolSelect(selectedTool, color);
    }
  };

  return (
    <motion.div 
      className="flex items-center gap-2 bg-nord-1/95 backdrop-blur-sm border border-nord-3 rounded-lg p-2 shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {tools.map((tool) => (
        <Button
          key={tool.id}
          variant={selectedTool === tool.id ? "default" : "ghost"}
          size="icon"
          onClick={() => handleToolSelect(tool.id)}
          title={tool.label}
        >
          <ApperIcon name={tool.icon} size={16} />
        </Button>
      ))}
      
      {(selectedTool === "highlight" || selectedTool === "pen") && (
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="ml-2"
            title="Choose Color"
          >
            <div 
              className="w-4 h-4 rounded-full border border-nord-3"
              style={{ backgroundColor: selectedColor }}
            />
          </Button>
          
          {showColorPicker && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute top-12 right-0 bg-nord-1 border border-nord-3 rounded-lg p-3 shadow-lg z-50"
>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className="w-8 h-8 rounded-full border-2 hover:scale-110 transition-transform"
                    style={{ 
                      backgroundColor: color,
                      borderColor: selectedColor === color ? "#E5E9F0" : "transparent"
                    }}
                    whileTap={{ scale: 0.95 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AnnotationToolbar;
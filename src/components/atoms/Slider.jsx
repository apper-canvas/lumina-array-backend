import React from "react";
import { cn } from "@/utils/cn";

const Slider = React.forwardRef(({ 
  className, 
  value = 50,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  ...props 
}, ref) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange && onChange(Number(e.target.value))}
        className={cn(
          "w-full h-2 bg-nord-2 rounded-lg appearance-none cursor-pointer slider-thumb",
          className
        )}
        style={{
          background: `linear-gradient(to right, #88C0D0 0%, #88C0D0 ${percentage}%, #434C5E ${percentage}%, #434C5E 100%)`
        }}
        {...props}
      />
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #88C0D0;
          cursor: pointer;
          border: 2px solid #2E3440;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        .slider-thumb::-webkit-slider-thumb:hover {
          background: #81A1C1;
          transform: scale(1.1);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #88C0D0;
          cursor: pointer;
          border: 2px solid #2E3440;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }
        
        .slider-thumb::-moz-range-thumb:hover {
          background: #81A1C1;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
});

Slider.displayName = "Slider";

export default Slider;
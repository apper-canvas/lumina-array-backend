import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  icon,
  error,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <ApperIcon name={icon} size={16} className="text-nord-3" />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-nord-3 bg-nord-1 px-3 py-2 text-sm text-nord-4 placeholder:text-nord-3 focus:outline-none focus:ring-2 focus:ring-nord-8 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          icon && "pl-9",
          error && "border-nord-11 focus:ring-nord-11",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <ApperIcon name="AlertCircle" size={16} className="text-nord-11" />
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
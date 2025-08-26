import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  className, 
  variant = "default", 
  size = "default", 
  icon,
  iconPosition = "left",
  loading = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    default: "bg-nord-8 hover:bg-nord-9 text-nord-0 shadow-sm",
    secondary: "bg-nord-1 hover:bg-nord-2 text-nord-4 border border-nord-3",
    ghost: "hover:bg-nord-1 text-nord-4 hover:text-nord-5",
    outline: "border border-nord-3 hover:bg-nord-1 text-nord-4 hover:text-nord-5",
    destructive: "bg-nord-11 hover:bg-nord-11/90 text-nord-6 shadow-sm",
  };

  const sizes = {
    default: "h-10 px-4 py-2 text-sm",
    sm: "h-8 px-3 text-xs",
    lg: "h-12 px-6 text-base",
    icon: "h-10 w-10",
  };

  const baseClasses = "inline-flex items-center justify-center rounded-lg font-medium ring-offset-nord-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nord-8 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]";

  return (
    <motion.button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" className="mr-2 h-4 w-4 animate-spin" />
      )}
      {icon && iconPosition === "left" && !loading && (
        <ApperIcon name={icon} className={cn("h-4 w-4", children && "mr-2")} />
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon name={icon} className={cn("h-4 w-4", children && "ml-2")} />
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;
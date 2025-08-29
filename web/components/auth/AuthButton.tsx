import React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function AuthButton({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  loadingText,
  icon,
  fullWidth = false,
  children,
  disabled,
  ...props
}: AuthButtonProps) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500 transform hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-gray-500",
    outline: "border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 focus:ring-gray-500",
    ghost: "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-500"
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-12 px-6 text-sm",
    lg: "h-14 px-8 text-base"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          {loadingText || children}
        </>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </button>
  );
}

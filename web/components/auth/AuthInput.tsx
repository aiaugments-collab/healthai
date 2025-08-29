import React, { forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  icon?: React.ReactNode;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  ({
    className,
    type,
    label,
    error,
    showPasswordToggle = false,
    showPassword = false,
    onTogglePassword,
    icon,
    ...props
  }, ref) => {
    const inputType = showPasswordToggle 
      ? (showPassword ? "text" : "password")
      : type;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              "flex h-12 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-3 text-sm transition-all duration-200",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400",
              "hover:border-gray-300 dark:hover:border-gray-600",
              "disabled:cursor-not-allowed disabled:opacity-50",
              icon && "pl-10",
              showPasswordToggle && "pr-12",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            ref={ref}
            {...props}
          />
          {showPasswordToggle && (
            <button
              type="button"
              onClick={onTogglePassword}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <span className="w-1 h-1 bg-red-600 dark:bg-red-400 rounded-full"></span>
            {error}
          </p>
        )}
      </div>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;

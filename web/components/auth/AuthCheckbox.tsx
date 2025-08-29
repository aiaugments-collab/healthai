import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthCheckboxProps {
  id: string;
  name?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label: React.ReactNode;
  required?: boolean;
  className?: string;
}

export default function AuthCheckbox({
  id,
  name,
  checked = false,
  onChange,
  label,
  required = false,
  className
}: AuthCheckboxProps) {
  return (
    <div className={cn("flex items-start space-x-3", className)}>
      <div className="relative">
        <input
          id={id}
          name={name || id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          required={required}
          className="sr-only"
        />
        <label
          htmlFor={id}
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded border-2 cursor-pointer transition-all duration-200",
            "hover:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/20",
            checked
              ? "bg-gradient-to-br from-blue-500 to-purple-600 border-blue-500 text-white"
              : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          )}
        >
          <Check 
            className={cn(
              "w-3 h-3 transition-all duration-200",
              checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
            )} 
          />
        </label>
      </div>
      <label htmlFor={id} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer leading-5">
        {label}
      </label>
    </div>
  );
}

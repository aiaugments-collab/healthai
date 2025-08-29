import React from "react";

interface AuthDividerProps {
  text?: string;
}

export default function AuthDivider({ text = "or" }: AuthDividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-white/70 dark:bg-gray-800/70 text-gray-500 dark:text-gray-400 font-medium">
          {text}
        </span>
      </div>
    </div>
  );
}

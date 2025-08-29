import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Ask me anything about your health...",
  maxLength = 1000
}: ChatInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) {
        onSend();
      }
    }
  };

  const handleVoiceToggle = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  const characterCount = value.length;
  const isNearLimit = characterCount > maxLength * 0.8;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className={cn(
      "relative border rounded-2xl transition-all duration-200 bg-white dark:bg-gray-800",
      isFocused 
        ? "border-blue-500 dark:border-blue-400 shadow-lg ring-4 ring-blue-500/10" 
        : "border-gray-200 dark:border-gray-700 shadow-sm hover:border-gray-300 dark:hover:border-gray-600"
    )}>
      {/* Main Input Area */}
      <div className="flex items-end gap-2 p-3">
        {/* Attachment Button */}
        <Button
          variant="ghost"
          size="sm"
          className="flex-shrink-0 h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          disabled={disabled}
        >
          <Paperclip className="w-4 h-4" />
        </Button>

        {/* Text Input */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxLength}
            rows={1}
            className={cn(
              "w-full resize-none border-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
              "focus:outline-none focus:ring-0 text-sm leading-6",
              "scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent"
            )}
            style={{ minHeight: '24px', maxHeight: '120px' }}
          />
          
          {/* Character Counter */}
          {(isNearLimit || isOverLimit) && (
            <div className={cn(
              "absolute -bottom-5 right-0 text-xs",
              isOverLimit ? "text-red-500" : "text-yellow-500"
            )}>
              {characterCount}/{maxLength}
            </div>
          )}
        </div>

        {/* Voice Recording Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleVoiceToggle}
          className={cn(
            "flex-shrink-0 h-8 w-8 p-0 transition-colors",
            isRecording 
              ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20" 
              : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          )}
          disabled={disabled}
        >
          {isRecording ? (
            <MicOff className="w-4 h-4" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </Button>

        {/* Send Button */}
        <Button
          onClick={onSend}
          disabled={disabled || !value.trim() || isOverLimit}
          size="sm"
          className={cn(
            "flex-shrink-0 h-8 px-3 transition-all duration-200",
            value.trim() && !disabled && !isOverLimit
              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
          )}
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2 shadow-lg">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          Recording...
        </div>
      )}

      {/* Quick Actions */}
      <div className="border-t border-gray-100 dark:border-gray-700 px-3 py-2">
        <div className="flex gap-2">
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            💊 Medications
          </button>
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            📅 Appointments
          </button>
          <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
            📊 Health Logs
          </button>
        </div>
      </div>
    </div>
  );
}

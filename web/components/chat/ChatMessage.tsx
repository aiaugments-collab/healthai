import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "model";
  text: string;
  timestamp?: Date;
  isTyping?: boolean;
}

// Enhanced markdown components with modern styling
const markdownComponents = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h1: ({ children, ...props }: any) => (
    <h1
      className="text-xl font-bold my-3 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-2"
      {...props}
    >
      {children}
    </h1>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h2: ({ children, ...props }: any) => (
    <h2
      className="text-lg font-semibold my-2 text-gray-900 dark:text-gray-100"
      {...props}
    >
      {children}
    </h2>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  h3: ({ children, ...props }: any) => (
    <h3 className="text-base font-semibold my-2 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </h3>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p: ({ children, ...props }: any) => (
    <p className="mb-2 leading-relaxed text-gray-800 dark:text-gray-200 last:mb-0" {...props}>
      {children}
    </p>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside my-2 space-y-1 text-gray-800 dark:text-gray-200" {...props}>
      {children}
    </ul>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside my-2 space-y-1 text-gray-800 dark:text-gray-200" {...props}>
      {children}
    </ol>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  li: ({ children, ...props }: any) => (
    <li className="text-gray-800 dark:text-gray-200" {...props}>
      {children}
    </li>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blockquote: ({ children, ...props }: any) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300 my-2 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r-lg"
      {...props}
    >
      {children}
    </blockquote>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  code: ({ inline, children, ...props }: any) => {
    if (inline) {
      return (
        <code
          className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm font-mono border"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <pre
        className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-3 rounded-lg text-sm font-mono overflow-x-auto my-2 border"
        {...props}
      >
        <code>{children}</code>
      </pre>
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </strong>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  em: ({ children, ...props }: any) => (
    <em className="italic text-gray-800 dark:text-gray-200" {...props}>
      {children}
    </em>
  ),
};

const bubbleVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function ChatMessage({ role, text, timestamp, isTyping }: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Message copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy message");
    }
  };

  return (
    <motion.div
      variants={bubbleVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        "flex gap-3 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white" 
          : "bg-gradient-to-br from-emerald-500 to-teal-600 text-white"
      )}>
        {isUser ? (
          <User className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex flex-col max-w-[70%] sm:max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        {/* Message Bubble */}
        <div className={cn(
          "relative rounded-2xl px-4 py-3 shadow-sm border transition-all duration-200",
          "hover:shadow-md group-hover:scale-[1.02]",
          isUser
            ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-blue-200 dark:border-blue-800"
            : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700"
        )}>
          {/* Copy button */}
          {!isUser && (
            <button
              onClick={handleCopy}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm border border-gray-200 dark:border-gray-600"
              title="Copy message"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-600" />
              ) : (
                <Copy className="w-3 h-3 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          )}

          {/* Message Text */}
          <div className={cn(
            "prose prose-sm max-w-none",
            isUser 
              ? "prose-invert" 
              : "prose-gray dark:prose-invert"
          )}>
            {isTyping ? (
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
              </div>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={markdownComponents}
              >
                {text}
              </ReactMarkdown>
            )}
          </div>
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div className={cn(
            "text-xs text-gray-500 dark:text-gray-400 mt-1 px-2",
            isUser ? "text-right" : "text-left"
          )}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        )}
      </div>
    </motion.div>
  );
}

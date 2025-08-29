import React from "react";
import { motion } from "framer-motion";
import { MessageCircle, Sparkles, Shield, Heart } from "lucide-react";

interface EmptyStateProps {
  onSuggestedPrompt?: (prompt: string) => void;
}

const suggestedPrompts = [
  "How can I track my daily symptoms?",
  "What should I know about my medications?",
  "Help me prepare for my next appointment",
  "Analyze my recent health trends"
];

const features = [
  {
    icon: MessageCircle,
    title: "Conversational AI",
    description: "Chat naturally about your health concerns"
  },
  {
    icon: Sparkles,
    title: "Personalized Insights",
    description: "Get tailored advice based on your health data"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your health information stays secure and private"
  }
];

export default function EmptyState({ onSuggestedPrompt }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto"
      >
        {/* Hero Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Heart className="w-10 h-10 text-white" />
        </div>

        {/* Welcome Message */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Welcome to Health AI
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          Your intelligent health companion is here to help. Ask me anything about your health, medications, appointments, or symptoms.
        </p>

        {/* Features */}
        <div className="grid gap-4 mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3 text-left"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Suggested Prompts */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Try asking:
          </h3>
          <div className="grid gap-2">
            {suggestedPrompts.map((prompt, index) => (
              <motion.button
                key={prompt}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                onClick={() => onSuggestedPrompt?.(prompt)}
                className="text-left p-3 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 group"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  &quot;{prompt}&quot;
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

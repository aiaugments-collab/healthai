import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Sparkles, MessageCircle, BarChart3, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
  trigger?: 'chat_limit' | 'analytics' | 'export' | 'general';
}

const triggerContent = {
  chat_limit: {
    title: "Daily Chat Limit Reached",
    description: "You've used all 5 free AI conversations for today. Upgrade to Pro for unlimited conversations.",
    icon: MessageCircle,
    gradient: "from-blue-500 to-cyan-500"
  },
  analytics: {
    title: "Advanced Analytics Locked",
    description: "Unlock detailed health insights and personalized reports with Health AI Pro.",
    icon: BarChart3,
    gradient: "from-purple-500 to-pink-500"
  },
  export: {
    title: "Export Feature Locked",
    description: "Export your health data and reports with a Pro subscription.",
    icon: Shield,
    gradient: "from-green-500 to-teal-500"
  },
  general: {
    title: "Unlock Premium Features",
    description: "Get the most out of Health AI with unlimited access to all features.",
    icon: Crown,
    gradient: "from-yellow-500 to-orange-500"
  }
};

export default function UpgradeModal({ 
  isOpen, 
  onClose, 
  onUpgrade, 
  trigger = 'general' 
}: UpgradeModalProps) {
  const content = triggerContent[trigger];
  const IconComponent = content.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </button>

                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${content.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {content.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {content.description}
                  </p>
                </div>
              </div>

              {/* Pro Features */}
              <div className="p-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 mb-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-semibold text-gray-900 dark:text-white">Health AI Pro</span>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {[
                      "Unlimited AI conversations",
                      "Advanced health analytics",
                      "Personalized health reports",
                      "Priority customer support",
                      "Export health data",
                      "Family health sharing"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">$29</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    30-day money-back guarantee
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={onUpgrade}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                  
                  <Button
                    onClick={onClose}
                    variant="outline"
                    className="w-full"
                  >
                    Maybe Later
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      <span>HIPAA Compliant</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      <span>Instant Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

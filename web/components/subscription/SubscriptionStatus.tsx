import React from "react";
import Link from "next/link";
import { Crown, Sparkles, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SubscriptionStatusProps {
  isExpanded: boolean;
  currentPlan?: 'free' | 'pro';
  className?: string;
}

export default function SubscriptionStatus({ 
  isExpanded, 
  currentPlan = 'free',
  className 
}: SubscriptionStatusProps) {
  const isPro = currentPlan === 'pro';

  if (!isExpanded) {
    return (
      <div className={cn("relative group", className)}>
        <Link href="/pricing">
          <div className={cn(
            "w-full p-3 rounded-xl transition-all duration-200 cursor-pointer hover:scale-105",
            isPro 
              ? "bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" 
              : "bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 hover:from-blue-500/30 hover:to-purple-500/30"
          )}>
            <div className="flex items-center justify-center">
              {isPro ? (
                <Crown className="w-5 h-5 text-yellow-400" />
              ) : (
                <Sparkles className="w-5 h-5 text-blue-400" />
              )}
            </div>
          </div>
        </Link>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
          {isPro ? "Pro Plan Active" : "Upgrade to Pro"}
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      </div>
    );
  }

  return (
    <Link href="/pricing" className={cn("block", className)}>
      <div className={cn(
        "p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:scale-[1.02] group",
        isPro 
          ? "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-700" 
          : "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700"
      )}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {isPro ? (
              <Crown className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            ) : (
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            )}
            <span className="font-semibold text-gray-900 dark:text-white text-sm">
              {isPro ? "Pro Plan" : "Free Plan"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isPro ? "default" : "secondary"}
              className={isPro ? "bg-yellow-500 text-white" : ""}
            >
              {isPro ? "Active" : "Current"}
            </Badge>
            {!isPro && (
              <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
            )}
          </div>
        </div>
        
        {!isPro && (
          <div className="space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400">
              3 of 5 AI messages used today
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
              Click to upgrade & get unlimited access
            </p>
          </div>
        )}

        {isPro && (
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            Unlimited access • Click to manage
          </p>
        )}
      </div>
    </Link>
  );
}

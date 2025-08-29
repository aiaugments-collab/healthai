import React from "react";
import { Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PricingFeature {
  text: string;
  included: boolean;
  highlight?: boolean;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: number;
  period: string;
  features: PricingFeature[];
  popular?: boolean;
  currentPlan?: boolean;
  buttonText: string;
  onSelect: () => void;
  icon?: React.ReactNode;
  gradient?: string;
}

export default function PricingCard({
  title,
  description,
  price,
  period,
  features,
  popular = false,
  currentPlan = false,
  buttonText,
  onSelect,
  icon,
  gradient = "from-blue-500 to-purple-600"
}: PricingCardProps) {
  return (
    <div className={cn(
      "relative rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:scale-105",
      popular 
        ? "border-blue-500 shadow-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20" 
        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600",
      currentPlan && "ring-2 ring-green-500 ring-offset-2"
    )}>
      {/* Popular Badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 text-sm font-semibold">
            <Star className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* Current Plan Badge */}
      {currentPlan && (
        <div className="absolute -top-4 right-4">
          <Badge variant="outline" className="bg-green-500 text-white border-green-500">
            Current Plan
          </Badge>
        </div>
      )}

      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              `bg-gradient-to-br ${gradient} shadow-lg`
            )}>
              {icon || <Zap className="w-8 h-8 text-white" />}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        </div>

        {/* Pricing */}
        <div className="text-center mb-8">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">
              ${price}
            </span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              /{period}
            </span>
          </div>
          {price > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Billed {period === 'month' ? 'monthly' : 'annually'}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={cn(
                "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                feature.included 
                  ? "bg-green-100 dark:bg-green-900/30" 
                  : "bg-gray-100 dark:bg-gray-700"
              )}>
                <Check className={cn(
                  "w-3 h-3",
                  feature.included 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-gray-400"
                )} />
              </div>
              <span className={cn(
                "text-sm leading-6",
                feature.included 
                  ? "text-gray-900 dark:text-gray-100" 
                  : "text-gray-500 dark:text-gray-400 line-through",
                feature.highlight && "font-semibold text-blue-600 dark:text-blue-400"
              )}>
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          onClick={onSelect}
          disabled={currentPlan}
          className={cn(
            "w-full h-12 text-base font-semibold transition-all duration-200",
            popular
              ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              : currentPlan
              ? "bg-green-500 text-white cursor-default"
              : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100"
          )}
        >
          {currentPlan ? "Current Plan" : buttonText}
        </Button>

        {/* Money Back Guarantee */}
        {price > 0 && (
          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            30-day money-back guarantee
          </p>
        )}
      </div>
    </div>
  );
}

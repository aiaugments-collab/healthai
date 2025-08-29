import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Heart, Crown, Sparkles, Shield, MessageCircle, Calendar, FileText, Pill, BarChart3, Users, Headphones, Zap } from "lucide-react";
import PricingCard from "@/components/pricing/PricingCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function PricingPage() {
  const [currentPlan] = useState<'free' | 'pro'>('free'); // Mock current plan
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handlePlanSelect = (plan: string) => {
    if (plan === 'free') {
      toast.info("You're already on the Free plan!");
    } else {
      toast.success("Redirecting to checkout... (Demo only)");
    }
  };

  const freePlanFeatures = [
    { text: "Basic health tracking", included: true },
    { text: "5 AI chat messages per day", included: true },
    { text: "Medication reminders", included: true },
    { text: "Basic health insights", included: true },
    { text: "Mobile app access", included: true },
    { text: "Advanced AI conversations", included: false },
    { text: "Unlimited health logs", included: false },
    { text: "Personalized health reports", included: false },
    { text: "Priority support", included: false },
    { text: "Health trend analysis", included: false }
  ];

  const proPlanFeatures = [
    { text: "Everything in Free", included: true },
    { text: "Unlimited AI conversations", included: true, highlight: true },
    { text: "Advanced health analytics", included: true, highlight: true },
    { text: "Personalized health reports", included: true, highlight: true },
    { text: "Smart health predictions", included: true, highlight: true },
    { text: "Priority customer support", included: true },
    { text: "Export health data", included: true },
    { text: "Family health sharing", included: true },
    { text: "Integration with wearables", included: true },
    { text: "Custom health goals", included: true }
  ];

  const proPrice = billingPeriod === 'monthly' ? 29 : 290;
  const savings = billingPeriod === 'yearly' ? Math.round(((29 * 12 - 290) / (29 * 12)) * 100) : 0;

  return (
    <>
      <Head>
        <title>Health AI | Pricing Plans</title>
        <meta name="description" content="Choose the perfect Health AI plan for your health journey" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Health Journey
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Unlock the full potential of AI-powered health management with our comprehensive plans
              </p>
            </motion.div>

            {/* Billing Toggle */}
            <motion.div variants={itemVariants} className="flex items-center justify-center mb-12">
              <div className="bg-white dark:bg-gray-800 p-1 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex items-center">
                  <button
                    onClick={() => setBillingPeriod('monthly')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                      billingPeriod === 'monthly'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingPeriod('yearly')}
                    className={`px-6 py-2 rounded-lg text-sm font-medium transition-all relative ${
                      billingPeriod === 'yearly'
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    Yearly
                    {savings > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                        Save {savings}%
                      </Badge>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
              <PricingCard
                title="Free"
                description="Perfect for getting started with health tracking"
                price={0}
                period="forever"
                features={freePlanFeatures}
                currentPlan={currentPlan === 'free'}
                buttonText="Get Started Free"
                onSelect={() => handlePlanSelect('free')}
                icon={<Heart className="w-8 h-8 text-white" />}
                gradient="from-gray-500 to-gray-600"
              />

              <PricingCard
                title="Pro"
                description="Advanced AI health insights and unlimited features"
                price={proPrice}
                period={billingPeriod === 'monthly' ? 'month' : 'year'}
                features={proPlanFeatures}
                popular={true}
                currentPlan={currentPlan === 'pro'}
                buttonText={`Upgrade to Pro`}
                onSelect={() => handlePlanSelect('pro')}
                icon={<Crown className="w-8 h-8 text-white" />}
                gradient="from-blue-500 to-purple-600"
              />
            </motion.div>

            {/* Feature Comparison */}
            <motion.div variants={itemVariants} className="mb-16">
              <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
                Everything you need for optimal health
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                  {
                    icon: MessageCircle,
                    title: "AI Health Assistant",
                    description: "Chat with our advanced AI about symptoms, medications, and health concerns",
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: BarChart3,
                    title: "Health Analytics",
                    description: "Comprehensive insights and trends from your health data",
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: Shield,
                    title: "Privacy & Security",
                    description: "Enterprise-grade security with end-to-end encryption",
                    gradient: "from-green-500 to-teal-500"
                  },
                  {
                    icon: Calendar,
                    title: "Smart Scheduling",
                    description: "Intelligent appointment and medication reminders",
                    gradient: "from-orange-500 to-red-500"
                  },
                  {
                    icon: FileText,
                    title: "Health Records",
                    description: "Secure storage and organization of medical documents",
                    gradient: "from-indigo-500 to-blue-500"
                  },
                  {
                    icon: Users,
                    title: "Family Sharing",
                    description: "Share health insights with family members and caregivers",
                    gradient: "from-pink-500 to-rose-500"
                  }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div variants={itemVariants} className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Frequently Asked Questions
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                {[
                  {
                    question: "Can I upgrade or downgrade anytime?",
                    answer: "Yes! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the end of your billing cycle."
                  },
                  {
                    question: "Is my health data secure?",
                    answer: "Absolutely. We use enterprise-grade encryption and comply with HIPAA regulations to ensure your health data is completely secure and private."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, and bank transfers. All payments are processed securely through Stripe."
                  },
                  {
                    question: "Do you offer refunds?",
                    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with Health AI Pro, we'll refund your payment in full."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={itemVariants} className="text-center mt-16 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white">
              <h2 className="text-3xl font-bold mb-4">
                Ready to transform your health journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of users who trust Health AI with their wellness
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => handlePlanSelect('free')}
                >
                  Start Free Trial
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => handlePlanSelect('pro')}
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Upgrade to Pro
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

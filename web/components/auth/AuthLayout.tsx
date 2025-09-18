import React from "react";
import Link from "next/link";
import { ArrowLeft, Brain, Shield, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backButtonText?: string;
  backButtonHref?: string;
  rightSideContent?: {
    title: string;
    subtitle: string;
    features?: string[];
  };
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  showBackButton = false,
  backButtonText = "Back",
  backButtonHref = "/auth/login",
  rightSideContent = {
    title: "HealthAI Enterprise",
    subtitle: "Healthcare Intelligence Platform",
    features: [
      "Enterprise-grade AI-powered diagnostics",
      "Scalable healthcare analytics and insights",
      "HIPAA-compliant security and compliance"
    ]
  }
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative flex min-h-screen">
        {/* Left side - Form */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
          <div className="w-full max-w-md mx-auto">
            {/* Back button */}
            {showBackButton && (
              <div className="mb-8">
                <Link
                  href={backButtonHref}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  {backButtonText}
                </Link>
              </div>
            )}

            {/* Form container with glass morphism */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-gray-600 dark:text-gray-300">
                    {subtitle}
                  </p>
                )}
              </div>

              {children}
            </div>
          </div>
        </div>

        {/* Right side - Branding */}
        <div className="hidden lg:flex flex-1 relative">
          <div className="flex flex-col justify-center items-center w-full p-12 text-center">
            {/* Glass morphism container */}
            <div className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 dark:border-gray-700/20 max-w-lg">
              {/* Logo/Icon */}
              <div className="mb-8">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {rightSideContent.title}
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {rightSideContent.subtitle}
                </p>
              </div>

              {/* Features */}
              {rightSideContent.features && (
                <div className="space-y-4">
                  {rightSideContent.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        {index === 0 && <Shield className="w-4 h-4 text-white" />}
                        {index === 1 && <Sparkles className="w-4 h-4 text-white" />}
                        {index === 2 && <Brain className="w-4 h-4 text-white" />}
                      </div>
                      <p className="text-gray-700 dark:text-gray-200 font-medium">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

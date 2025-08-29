import React, { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import Head from "next/head";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLink from "@/components/auth/AuthLink";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [errors, setErrors] = useState<{email?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string} = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/updatePassword`,
      });

      if (error) throw error;

      setIsEmailSent(true);
      toast.success("Password reset link sent! Check your email.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/updatePassword`,
      });

      if (error) throw error;

      toast.success("Reset link sent again! Check your email.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Failed to resend reset link.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Health AI | Reset Password</title>
        <meta
          name="description"
          content="Reset your password to regain access to your Health AI account."
        />
      </Head>
      
      <AuthLayout
        title={isEmailSent ? "Check your email" : "Reset your password"}
        subtitle={isEmailSent 
          ? "We've sent a password reset link to your email address"
          : "Enter your email address and we'll send you a link to reset your password"
        }
        showBackButton
        backButtonText="Back to sign in"
        backButtonHref="/auth/login"
        rightSideContent={{
          title: "Health AI",
          subtitle: "We're here to help",
          features: [
            "Secure password reset process",
            "Quick and easy account recovery",
            "Your data remains protected"
          ]
        }}
      >
        {!isEmailSent ? (
          <form onSubmit={handleReset} className="space-y-6">
            <AuthInput
              type="email"
              label="Email address"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors(prev => ({...prev, email: undefined}));
              }}
              error={errors.email}
              icon={<Mail className="w-4 h-4" />}
              required
            />

            <AuthButton
              type="submit"
              loading={isSubmitting}
              loadingText="Sending reset link..."
              fullWidth
              size="lg"
            >
              Send reset link
            </AuthButton>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <AuthLink href="/auth/login" variant="primary">
                  Sign in here
                </AuthLink>
              </p>
            </div>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-400">
                We've sent a password reset link to:
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                {email}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Didn't receive the email?</strong> Check your spam folder or try resending the link.
              </p>
            </div>

            <div className="space-y-3">
              <AuthButton
                onClick={handleResendEmail}
                loading={isSubmitting}
                loadingText="Resending..."
                variant="outline"
                fullWidth
              >
                Resend reset link
              </AuthButton>

              <AuthButton
                onClick={() => setIsEmailSent(false)}
                variant="ghost"
                fullWidth
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Try different email
              </AuthButton>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{" "}
                <AuthLink href="/auth/login" variant="primary">
                  Sign in here
                </AuthLink>
              </p>
            </div>
          </div>
        )}
      </AuthLayout>
    </>
  );
}

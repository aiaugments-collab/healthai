import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Lock, CheckCircle, Shield } from "lucide-react";
import { toast } from "sonner";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLink from "@/components/auth/AuthLink";

export default function UpdatePassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        toast.error("Session not found. Please request a new reset link.");
        router.push("/auth/forgotPassword");
      }
    });
  }, [router]);

  const validateForm = () => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and number";
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength < 50) return "bg-red-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength();
    if (strength < 50) return "Weak";
    if (strength < 75) return "Good";
    return "Strong";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Password updated successfully! Redirecting to your dashboard...");
      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Health AI | Set New Password</title>
        <meta
          name="description"
          content="Create a new secure password for your Health AI account."
        />
      </Head>
      
      <AuthLayout
        title="Set new password"
        subtitle="Create a strong password to secure your account"
        showBackButton
        backButtonText="Back to sign in"
        backButtonHref="/auth/login"
        rightSideContent={{
          title: "Health AI",
          subtitle: "Almost there!",
          features: [
            "Your account security is our priority",
            "Choose a strong, unique password",
            "Access all your health data securely"
          ]
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Password Requirements
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                  At least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <AuthInput
              type="password"
              label="New password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors(prev => ({...prev, password: undefined}));
              }}
              error={errors.password}
              showPasswordToggle
              showPassword={showPassword}
              onTogglePassword={() => setShowPassword(!showPassword)}
              icon={<Lock className="w-4 h-4" />}
              required
            />
            
            {password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Password strength</span>
                  <span className={`font-medium ${
                    getPasswordStrength() < 50 ? 'text-red-600' :
                    getPasswordStrength() < 75 ? 'text-yellow-600' : 'text-green-600'
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${getPasswordStrength()}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <AuthInput
            type="password"
            label="Confirm new password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors(prev => ({...prev, confirmPassword: undefined}));
            }}
            error={errors.confirmPassword}
            showPasswordToggle
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            icon={password && confirmPassword && password === confirmPassword ? 
              <CheckCircle className="w-4 h-4 text-green-500" /> : 
              <Lock className="w-4 h-4" />
            }
            required
          />

          <AuthButton
            type="submit"
            loading={isSubmitting}
            loadingText="Updating password..."
            fullWidth
            size="lg"
          >
            Update password
          </AuthButton>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Remember your password?{" "}
              <AuthLink href="/auth/login" variant="primary">
                Sign in here
              </AuthLink>
            </p>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}

import React, { useState } from "react";
import { useRouter } from "next/router";
import { Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { signIn } from "@/lib/auth";
import Head from "next/head";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLink from "@/components/auth/AuthLink";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthCheckbox from "@/components/auth/AuthCheckbox";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string}>({});

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, session } = await signIn(email, password);
      toast.success("Welcome back! Redirecting to your dashboard...");
      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Health AI | Sign In</title>
        <meta
          name="description"
          content="Sign in to your Health AI account to track and manage your health journey."
        />
      </Head>
      
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to your account to continue your health journey"
        rightSideContent={{
          title: "Health AI",
          subtitle: "Your intelligent health companion",
          features: [
            "Track your health metrics effortlessly",
            "Get personalized insights and recommendations", 
            "Secure, private, and always available"
          ]
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <AuthInput
            type="email"
            label="Email address"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors(prev => ({...prev, email: undefined}));
            }}
            error={errors.email}
            icon={<Mail className="w-4 h-4" />}
            required
          />

          <AuthInput
            type="password"
            label="Password"
            placeholder="Enter your password"
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

          <div className="flex items-center justify-between">
            <AuthCheckbox
              id="remember-me"
              checked={rememberMe}
              onChange={setRememberMe}
              label="Remember me"
            />

            <AuthLink href="/auth/forgotPassword" variant="primary">
              Forgot password?
            </AuthLink>
          </div>

          <AuthButton
            type="submit"
            loading={isSubmitting}
            loadingText="Signing in..."
            fullWidth
            size="lg"
          >
            Sign in
          </AuthButton>
        </form>

        <AuthDivider />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <AuthLink href="/auth/signUp" variant="primary">
              Create one now
            </AuthLink>
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            By signing in, you agree to our{" "}
            <AuthLink href="/terms" variant="muted">
              Terms of Service
            </AuthLink>{" "}
            and{" "}
            <AuthLink href="/privacy" variant="muted">
              Privacy Policy
            </AuthLink>
            .
          </p>
        </div>
      </AuthLayout>
    </>
  );
}

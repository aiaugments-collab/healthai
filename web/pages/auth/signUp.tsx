import React, { useState } from "react";
import { useRouter } from "next/router";
import { Mail, Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { signUp } from "@/lib/auth";
import Head from "next/head";
import AuthLayout from "@/components/auth/AuthLayout";
import AuthInput from "@/components/auth/AuthInput";
import AuthButton from "@/components/auth/AuthButton";
import AuthLink from "@/components/auth/AuthLink";
import AuthDivider from "@/components/auth/AuthDivider";
import AuthCheckbox from "@/components/auth/AuthCheckbox";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    terms?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
      terms?: string;
    } = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
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

    if (!acceptTerms) {
      newErrors.terms = "You must accept the terms and conditions";
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { user, session } = await signUp(email, password);
      toast.success("Account created successfully! Welcome to Health AI!");
      router.push("/home");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Sign up failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Health AI | Create Account</title>
        <meta
          name="description"
          content="Join Health AI to start tracking and managing your health journey with intelligent insights."
        />
      </Head>
      
      <AuthLayout
        title="Create your account"
        subtitle="Join thousands of users taking control of their health"
        rightSideContent={{
          title: "Health AI",
          subtitle: "Start your health journey today",
          features: [
            "Comprehensive health tracking and analytics",
            "AI-powered insights and recommendations",
            "Secure data with enterprise-grade encryption"
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

          <div className="space-y-2">
            <AuthInput
              type="password"
              label="Password"
              placeholder="Create a strong password"
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
            label="Confirm password"
            placeholder="Confirm your password"
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

          <div className="space-y-2">
            <AuthCheckbox
              id="terms"
              checked={acceptTerms}
              onChange={(checked) => {
                setAcceptTerms(checked);
                if (errors.terms) setErrors(prev => ({...prev, terms: undefined}));
              }}
              required
              label={
                <>
                  I agree to the{" "}
                  <AuthLink href="/terms" variant="primary">
                    Terms of Service
                  </AuthLink>{" "}
                  and{" "}
                  <AuthLink href="/privacy" variant="primary">
                    Privacy Policy
                  </AuthLink>
                </>
              }
            />
            {errors.terms && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1 ml-8">
                <span className="w-1 h-1 bg-red-600 dark:bg-red-400 rounded-full"></span>
                {errors.terms}
              </p>
            )}
          </div>

          <AuthButton
            type="submit"
            loading={isSubmitting}
            loadingText="Creating account..."
            fullWidth
            size="lg"
          >
            Create account
          </AuthButton>
        </form>

        <AuthDivider />

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <AuthLink href="/auth/login" variant="primary">
              Sign in here
            </AuthLink>
          </p>
        </div>
      </AuthLayout>
    </>
  );
}

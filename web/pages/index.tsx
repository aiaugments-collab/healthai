import React, { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Inter } from "next/font/google";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  BarChart2,
  Pill,
  Activity,
  Shield,
  ArrowRight,
  Github,
  Brain,
  Sparkles,
  Menu,
  X,
  Star,
} from "lucide-react";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  fallback: ["system-ui", "arial"],
  display: "swap",
});

/**
 * An animated component that fades in when it comes into view
 */
function AnimatedInView({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { delay, duration: 0.6 } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Modern Header Component inspired by CodeGuide
 */
function Header({ user }: { user: unknown }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Health AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              How It Works
            </a>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Privacy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Terms
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link href="/home">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-gray-900 font-medium">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signUp">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium">
                    Start for Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col gap-4">
              <a
                href="#features"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                How It Works
              </a>
              <Link
                href="/privacy"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Terms
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                {user ? (
                  <Link href="/home">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-full font-medium">
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="outline" className="w-full border-gray-300 text-gray-700 py-2 rounded-full font-medium">
                        Login
                      </Button>
                    </Link>
                    <Link href="/auth/signUp">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-2 rounded-full font-medium">
                        Start for Free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setUser(user);
    };

    fetchUser();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Health Assistant",
      description: "Get personalized health insights powered by advanced AI technology"
    },
    {
      icon: Activity,
      title: "Smart Health Tracking",
      description: "Monitor your vitals, symptoms, and wellness metrics effortlessly"
    },
    {
      icon: Pill,
      title: "Medication Management",
      description: "Never miss a dose with intelligent reminder systems"
    },
    {
      icon: BarChart2,
      title: "Advanced Analytics",
      description: "Visualize your health trends with interactive charts and reports"
    },
    {
      icon: CalendarDays,
      title: "Appointment Scheduling",
      description: "Keep track of all your medical appointments in one place"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your health data is encrypted and completely secure"
    }
  ];

  const testimonials = [
    {
      text: "Health AI transformed how I manage my health. The AI insights are incredibly accurate and helpful.",
      author: "Sarah Chen",
      role: "Healthcare Professional"
    },
    {
      text: "The medication reminders and health tracking features have been life-changing for my chronic condition management.",
      author: "Michael Rodriguez",
      role: "Patient"
    },
    {
      text: "As a doctor, I recommend Health AI to my patients. The data visualization helps us make better decisions together.",
      author: "Dr. Emily Watson",
      role: "Primary Care Physician"
    }
  ];

  return (
    <>
      <Head>
        <title>Health AI | AI-Powered Health Management Platform</title>
        <meta
          name="description"
          content="Transform your health journey with AI-powered insights, smart tracking, and personalized care management. Join thousands who trust Health AI."
        />
      </Head>
      <div className={`${inter.className} font-sans overflow-x-hidden`}>
        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }
          html, body {
            overscroll-behavior: none;
          }
        `}</style>

        {/* Header */}
        <Header user={user} />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden pt-16">
          {/* Background Effects */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
            <AnimatedInView delay={0}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">AI-Powered Health Intelligence</span>
              </div>
            </AnimatedInView>
            
            <AnimatedInView delay={0.1}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Health AI
              </h1>
            </AnimatedInView>
            <AnimatedInView delay={0.3}>
              <p className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Anything health
              </p>
            </AnimatedInView>
            
            <AnimatedInView delay={0.4}>
              <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                Health AI is building agents that track symptoms, analyze patterns, 
                and provide personalized health insights on autopilot for hours.
              </p>
            </AnimatedInView>
            
            <AnimatedInView delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={user ? "/home" : "/auth/signUp"}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                    {user ? "Continue Your Journey" : "Start for Free"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full font-semibold backdrop-blur-sm">
                    Learn More
                  </Button>
                </Link>
              </div>
            </AnimatedInView>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimatedInView delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Powerful Features
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Everything you need to take control of your health journey, powered by cutting-edge AI technology.
                </p>
              </div>
            </AnimatedInView>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <AnimatedInView key={index} delay={0.1 * (index + 1)}>
                  <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedInView>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <AnimatedInView delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  How It Works
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Get started in minutes and transform your health management experience.
                </p>
              </div>
            </AnimatedInView>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Sign Up & Setup",
                  description: "Create your account and set up your health profile in under 2 minutes."
                },
                {
                  step: "02", 
                  title: "Track & Monitor",
                  description: "Log your health data, medications, and symptoms with our intuitive interface."
                },
                {
                  step: "03",
                  title: "Get AI Insights",
                  description: "Receive personalized recommendations and insights from our advanced AI assistant."
                }
              ].map((item, index) => (
                <AnimatedInView key={index} delay={0.1 * (index + 1)}>
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-2xl font-bold text-white">{item.step}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </AnimatedInView>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimatedInView delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Trusted by Healthcare Professionals
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  See what our users and healthcare partners are saying about Health AI.
                </p>
              </div>
            </AnimatedInView>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <AnimatedInView key={index} delay={0.1 * (index + 1)}>
                  <Card className="p-8 h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-6 italic leading-relaxed">
                        &quot;{testimonial.text}&quot;
                      </p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedInView>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10K+", label: "Active Users" },
                { number: "50K+", label: "Health Logs Tracked" },
                { number: "99.9%", label: "Uptime" },
                { number: "24/7", label: "AI Support" }
              ].map((stat, index) => (
                <AnimatedInView key={index} delay={0.1 * index}>
                  <div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-lg text-blue-100">{stat.label}</div>
                  </div>
                </AnimatedInView>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <AnimatedInView delay={0}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Health?
              </h2>
            </AnimatedInView>
            <AnimatedInView delay={0.1}>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already managing their health smarter with Health AI.
              </p>
            </AnimatedInView>
            <AnimatedInView delay={0.2}>
              <Link href={user ? "/home" : "/auth/signUp"}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-full font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                  {user ? "Go to Dashboard" : "Get Started Free"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </AnimatedInView>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white py-12 px-4 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-600">
                  © {new Date().getFullYear()} <strong className="text-gray-900">Health AI</strong>. All rights reserved.
                </p>
              </div>
              <div className="flex items-center gap-6">
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Terms of Service
                </Link>
                <Link 
                  href="https://github.com/hoangsonww/SymptomSync-Health-App" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
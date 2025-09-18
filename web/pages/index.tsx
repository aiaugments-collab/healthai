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
            <span className="text-xl font-bold text-gray-900">HealthAI Enterprise</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#solutions" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Solutions
            </a>
            <a href="#platform" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Platform
            </a>
            <a href="#enterprise" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Enterprise
            </a>
            <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Security
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors font-medium">
              Compliance
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
                    Request Demo
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
                href="#solutions"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Solutions
              </a>
              <a
                href="#platform"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Platform
              </a>
              <a
                href="#enterprise"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Enterprise
              </a>
              <Link
                href="/privacy"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Security
              </Link>
              <Link
                href="/terms"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
              >
                Compliance
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
                        Request Demo
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
      title: "Cognitive AI Healthcare Engine",
      description: "Deploy sophisticated machine learning models for predictive diagnostics and clinical decision support with enterprise-grade accuracy"
    },
    {
      icon: Activity,
      title: "Real-Time Health Intelligence",
      description: "Comprehensive patient monitoring with IoT integration, continuous data streams, and advanced biomarker analysis for proactive care"
    },
    {
      icon: Pill,
      title: "Precision Medication Optimization",
      description: "AI-driven pharmaceutical management with drug interaction analysis, personalized dosage algorithms, and adherence optimization"
    },
    {
      icon: BarChart2,
      title: "Enterprise Analytics Suite",
      description: "Advanced business intelligence dashboards with population health insights, ROI tracking, and outcome measurement analytics"
    },
    {
      icon: CalendarDays,
      title: "Integrated Workflow Management",
      description: "Streamlined healthcare operations with automated scheduling, resource optimization, and cross-platform care coordination"
    },
    {
      icon: Shield,
      title: "Enterprise Security & Compliance",
      description: "HIPAA-compliant infrastructure with zero-trust architecture, end-to-end encryption, and regulatory compliance automation"
    }
  ];

  const testimonials = [
    {
      text: "HealthAI Enterprise increased our diagnostic accuracy by 34% and reduced patient readmission rates by 28%. The ROI was evident within the first quarter of implementation.",
      author: "Dr. Michael Harrison, MD",
      role: "Chief Medical Officer, Metropolitan Health System"
    },
    {
      text: "The platform's predictive analytics capabilities transformed our population health management strategy. We're now able to identify at-risk patients 6 months earlier than traditional methods.",
      author: "Sarah Chen, PhD",
      role: "VP of Clinical Innovation, Regional Medical Center"
    },
    {
      text: "Implementation across our 15-hospital network was seamless. The enterprise support team and white-glove onboarding exceeded our expectations for a technology deployment of this scale.",
      author: "David Rodriguez",
      role: "CTO, Nationwide Healthcare Alliance"
    }
  ];

  return (
    <>
      <Head>
        <title>HealthAI Enterprise | Advanced AI-Driven Healthcare Intelligence Platform</title>
        <meta
          name="description"
          content="Enterprise-grade AI-powered healthcare intelligence platform delivering precision diagnostics, predictive analytics, and scalable digital health solutions for healthcare organizations and wellness providers."
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
                <span className="text-sm font-medium">Enterprise-Grade AI Healthcare Intelligence</span>
              </div>
            </AnimatedInView>
            
            <AnimatedInView delay={0.1}>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                HealthAI Enterprise
              </h1>
            </AnimatedInView>
            <AnimatedInView delay={0.3}>
              <p className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Precision Healthcare Intelligence
              </p>
            </AnimatedInView>
            
            <AnimatedInView delay={0.4}>
              <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                Revolutionizing healthcare delivery through advanced machine learning algorithms, 
                predictive analytics, and scalable digital transformation solutions. 
                Empowering healthcare organizations with enterprise-grade AI infrastructure 
                for enhanced patient outcomes and operational excellence.
              </p>
            </AnimatedInView>
            
            <AnimatedInView delay={0.5}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={user ? "/home" : "/auth/signUp"}>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                    {user ? "Access Platform" : "Schedule Enterprise Demo"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="#solutions">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full font-semibold backdrop-blur-sm">
                    Explore Solutions
                  </Button>
                </Link>
              </div>
            </AnimatedInView>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimatedInView delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Enterprise Healthcare Solutions
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Comprehensive AI-powered healthcare technology stack designed for scalable deployment across healthcare organizations, delivering measurable ROI and enhanced patient outcomes.
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

        {/* Platform Architecture */}
        <section id="platform" className="py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <AnimatedInView delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Enterprise Platform Architecture
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Scalable, cloud-native infrastructure built for enterprise deployment with seamless integration capabilities and 99.99% uptime SLA.
                </p>
              </div>
            </AnimatedInView>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Enterprise Integration",
                  description: "Seamless deployment with existing EHR systems, FHIR compliance, and API-first architecture for rapid implementation."
                },
                {
                  step: "02", 
                  title: "AI Model Training",
                  description: "Custom machine learning models trained on your organizational data with federated learning and privacy-preserving techniques."
                },
                {
                  step: "03",
                  title: "Intelligent Automation",
                  description: "Deploy autonomous AI agents for clinical workflows, predictive analytics, and real-time decision support systems."
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

        {/* Enterprise Case Studies */}
        <section id="enterprise" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <AnimatedInView delay={0}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Trusted by Leading Healthcare Organizations
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Healthcare systems worldwide rely on HealthAI Enterprise for mission-critical operations, achieving measurable improvements in patient outcomes and operational efficiency.
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
                { number: "500+", label: "Healthcare Organizations" },
                { number: "10M+", label: "Patient Records Processed" },
                { number: "99.99%", label: "Enterprise SLA Uptime" },
                { number: "34%", label: "Average Diagnostic Accuracy Improvement" }
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
                Ready to Transform Healthcare Delivery?
              </h2>
            </AnimatedInView>
            <AnimatedInView delay={0.1}>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join leading healthcare organizations that have achieved measurable ROI and improved patient outcomes with HealthAI Enterprise. Schedule your executive briefing today.
              </p>
            </AnimatedInView>
            <AnimatedInView delay={0.2}>
              <Link href={user ? "/home" : "/auth/signUp"}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-lg rounded-full font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                  {user ? "Access Enterprise Portal" : "Schedule Executive Demo"}
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
                  © {new Date().getFullYear()} <strong className="text-gray-900">HealthAI Enterprise</strong>. All rights reserved.
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
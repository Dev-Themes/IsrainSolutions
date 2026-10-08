"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserPlus, Edit3, Link as LinkIcon, ShieldCheck, MailCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  {
    id: 1,
    title: "Client Authentication",
    description: "Create an account or log in to your secure client dashboard.",
    icon: UserPlus,
    color: "var(--accent)"
  },
  {
    id: 2,
    title: "Draft Article",
    description: "Write your article manually or leverage our AI assistant to perfect your pitch.",
    icon: Edit3,
    color: "var(--mark)"
  },
  {
    id: 3,
    title: "Source Attribution",
    description: "Provide the canonical URL or original source to ensure proper redirection and SEO equity.",
    icon: LinkIcon,
    color: "var(--accent)"
  },
  {
    id: 4,
    title: "Admin Review",
    description: "Our editorial team reviews your draft for quality, compliance, and formatting.",
    icon: ShieldCheck,
    color: "var(--warn)"
  },
  {
    id: 5,
    title: "Published & Notified",
    description: "Your article goes live! You receive an automated email with the live URL.",
    icon: MailCheck,
    color: "var(--ok)"
  }
];

export default function HowItWorksPage() {
  const [activeStep, setActiveStep] = useState(0);

  // Auto-play the workflow animation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length ? prev + 1 : 0));
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center py-20 px-4 md:px-8 overflow-hidden">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mb-20"
      >
        <span className="text-[var(--accent)] font-bold tracking-wider uppercase text-sm mb-4 block">Publishing Strategy</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-[var(--ink)] mb-6 tracking-tight">
          How Your Article Gets Published
        </h1>
        <p className="text-xl text-[var(--mute)] font-serif">
          Experience our streamlined, transparent workflow. From your first draft to a live audience, we make publishing seamless and impactful.
        </p>
      </motion.div>

      {/* Live Workflow Demonstration */}
      <div className="w-full max-w-5xl relative mb-32">
        {/* Connection Line (Background) */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--line)] -translate-y-1/2 hidden md:block rounded-full z-0" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-[var(--accent)] -translate-y-1/2 hidden md:block z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        <div className="flex flex-col md:flex-row justify-between items-center relative z-10 gap-12 md:gap-0">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index <= activeStep;
            const isCurrent = index === activeStep;

            return (
              <div key={step.id} className="flex flex-col items-center w-full md:w-48 relative">
                
                {/* Ping Animation for current step */}
                {isCurrent && (
                  <motion.div
                    className="absolute top-6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[var(--accent)] opacity-20"
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}

                {/* Node */}
                <motion.div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-4 mb-4 z-10 transition-colors duration-500 shadow-lg ${
                    isActive ? "bg-[var(--card)] border-[var(--accent)]" : "bg-[var(--bg)] border-[var(--line)]"
                  }`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 }}
                >
                  {isActive ? (
                    <Icon className="w-6 h-6" style={{ color: step.color }} />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-[var(--line)]" />
                  )}
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="text-center"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: isActive ? 1 : 0.4 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <h3 className={`font-bold text-lg mb-2 transition-colors duration-500 ${isActive ? "text-[var(--ink)]" : "text-[var(--mute)]"}`}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[var(--mute)] leading-relaxed hidden md:block">
                    {step.description}
                  </p>
                </motion.div>
                
                {/* Mobile description (visible only when active) */}
                {isCurrent && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-sm text-[var(--mute)] text-center mt-4 md:hidden px-4"
                  >
                    {step.description}
                  </motion.p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      <motion.div 
        className="bg-[var(--card)] border border-[var(--line)] rounded-2xl p-10 max-w-2xl w-full text-center shadow-xl relative overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--mark)] rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[var(--accent)] rounded-full opacity-10 blur-3xl" />
        
        <h2 className="text-3xl font-bold text-[var(--ink)] mb-4">Ready to get published?</h2>
        <p className="text-[var(--mute)] mb-8 max-w-md mx-auto">
          Start your journey today. Create your account, draft your pitch, and reach thousands of professionals.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link 
            href="/register" 
            className="flex items-center gap-2 bg-[var(--ink)] text-[var(--bg)] px-8 py-4 rounded-lg font-bold hover:bg-[var(--accent)] hover:text-[var(--bg)] transition-all shadow-md hover:shadow-xl hover:-translate-y-1 w-full sm:w-auto justify-center"
          >
            Create an Account
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-[var(--bg)] border-2 border-[var(--line)] text-[var(--ink)] px-8 py-4 rounded-lg font-bold hover:border-[var(--ink)] transition-all w-full sm:w-auto justify-center"
          >
            Sign In
          </Link>
        </div>
        <p className="text-xs text-[var(--mute)] mt-6 flex items-center justify-center gap-1">
          <CheckCircle2 className="w-4 h-4 text-[var(--ok)]" /> Access is restricted to authenticated clients only.
        </p>
      </motion.div>
    </div>
  );
}

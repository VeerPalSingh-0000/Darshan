import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  ArrowRightIcon,
  PlayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import AntiGravityCanvas from "./ui/particle-effect-for-hero";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────
const LandingPageHero = () => {
  const { isDarkMode } = useTheme();
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div
      className={`${isDarkMode ? "bg-black" : "bg-white"} transition-colors duration-300`}
    >
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section
        className={`relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden ${
          isDarkMode ? "bg-black text-white" : "bg-white text-slate-900"
        }`}
      >
        {/* Interactive particle background */}
        <AntiGravityCanvas
          accentColor={isDarkMode ? "#d97706" : "#7c3aed"}
          particleColor={isDarkMode ? "#ffffff" : "#000000"}
          glowColor={isDarkMode ? "217, 119, 6" : "124, 58, 237"}
        />

        <div
          className={`absolute inset-0 z-[1] pointer-events-none ${
            isDarkMode
              ? "bg-gradient-to-t from-black/60 via-transparent to-black/30"
              : "bg-gradient-to-t from-white/40 via-transparent to-white/20"
          }`}
        />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto pointer-events-none"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs font-mono tracking-[0.5em] uppercase text-amber-500 dark:text-amber-400/80 mb-6"
          >
            ✦ Ancient Wisdom For Modern Living ✦
          </motion.p>

          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif tracking-wide uppercase leading-none mb-6">
            <span className="block text-slate-900 dark:text-white">
              The Seeker's
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 dark:from-amber-300 dark:via-orange-300 dark:to-yellow-200 animate-pulse">
              Path
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 text-lg md:text-2xl max-w-3xl mx-auto text-slate-600 dark:text-slate-300/90 font-light leading-relaxed"
          >
            Discover the profound philosophies of India. Explore{" "}
            <span className="font-serif italic text-violet-600 dark:text-amber-400">
              9 schools of thought
            </span>{" "}
            spanning 3,000 years of wisdom. Find your path to truth, meaning,
            and liberation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col sm:flex-row gap-5 justify-center pointer-events-auto"
          >
            <Link
              to="/explore"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-amber-500 dark:to-orange-500 text-white font-bold tracking-wider uppercase py-4 px-12 rounded-full text-sm hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] dark:hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] transition-all duration-300 hover:-translate-y-1"
            >
              <SparklesIcon className="w-5 h-5" /> Start Your Journey
            </Link>

            <button className="inline-flex items-center justify-center gap-3 border-2 border-slate-300 dark:border-white/30 text-slate-800 dark:text-white font-bold tracking-wider uppercase py-4 px-12 rounded-full text-sm hover:bg-slate-100 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group pointer-events-auto">
              <PlayIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />{" "}
              Watch Intro
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-white/30 flex items-start justify-center pt-2">
            <div className="w-1 h-2 bg-slate-400 dark:bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ TRUST SECTION ═══════════════ */}
      <section
        className={`py-20 px-4 ${isDarkMode ? "bg-slate-900" : "bg-slate-50"}`}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              { num: "9", label: "Philosophical Schools" },
              { num: "3000+", label: "Years of Wisdom" },
              { num: "∞", label: "Eternal Truths" },
              { num: "10K+", label: "Knowledge Seekers" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <p className="text-3xl md:text-5xl font-serif text-violet-600 dark:text-amber-400 mb-2">
                  {stat.num}
                </p>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ FEATURED FEATURES ═══════════════ */}
      <section className={`py-28 px-4 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="text-xs font-mono tracking-[0.5em] uppercase text-amber-500 dark:text-amber-400 mb-4">
              ✦ Discover Features ✦
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-4">
              Start Your Exploration
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-amber-500 dark:to-orange-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                emoji: "🧿",
                num: "01",
                title: "Which School Are You?",
                desc: "Discover which of the 9 schools resonates with your worldview through an interactive quiz.",
                path: "/quiz",
                gradient: "from-violet-500 to-purple-600",
              },
              {
                emoji: "📚",
                num: "02",
                title: "Explore Schools",
                desc: "Deep dive into the philosophies of Samkhya, Yoga, Vedanta, and more with comprehensive guides.",
                path: "/explore",
                gradient: "from-amber-500 to-orange-600",
              },
              {
                emoji: "⏰",
                num: "03",
                title: "Timeline of Wisdom",
                desc: "Journey through 1,400 years of genius across all Indian philosophical traditions.",
                path: "/timeline",
                gradient: "from-emerald-500 to-teal-600",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className={`group relative rounded-2xl p-8 backdrop-blur-sm border border-slate-200/50 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  isDarkMode ? "bg-slate-900/50" : "bg-slate-50/80"
                }`}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <p className="text-4xl mb-4">{feature.emoji}</p>
                  <p
                    className={`text-sm font-mono tracking-widest uppercase text-${feature.gradient} mb-3`}
                  >
                    {feature.num}
                  </p>
                  <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {feature.desc}
                  </p>
                  <Link
                    to={feature.path}
                    className="inline-flex items-center gap-2 font-bold text-violet-600 dark:text-amber-400 hover:text-violet-800 dark:hover:text-amber-300 transition-colors group/link"
                  >
                    Explore
                    <ArrowRightIcon className="w-4 h-4 group-hover/link:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section
        className={`relative py-32 px-4 overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-r from-slate-900 via-black to-slate-900"
            : "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            Ready to Transform Your Mind?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white/90">
            Join thousands of seekers exploring the timeless wisdom of Indian
            philosophy.
          </p>
          <Link
            to="/explore"
            className={`inline-flex items-center gap-3 font-bold tracking-wider uppercase py-4 px-10 rounded-full text-sm transition-all duration-300 hover:scale-105 ${
              isDarkMode
                ? "bg-amber-500 text-slate-900 hover:bg-amber-400"
                : "bg-white text-purple-600 hover:shadow-2xl"
            }`}
          >
            <SparklesIcon className="w-5 h-5" /> Begin Journey Now
          </Link>
        </motion.div>
      </section>

      {/* ═══════════════ FAQ SECTION ═══════════════ */}
      <section className={`py-28 px-4 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-amber-500 dark:to-orange-500 mx-auto rounded-full" />
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                q: "What is Darśana?",
                a: "Darśana means 'to see' or 'to perceive'. It refers to the philosophical systems of India that provide different perspectives on reality, consciousness, and the path to liberation (Mokṣa).",
              },
              {
                q: "How many schools of philosophy are there?",
                a: "There are 9 primary schools (Darśanas) recognized in Indian philosophy: Samkhya, Yoga, Nyaya, Vaishesika, Mimamsa, Vedanta, Jainism, Buddhism, and Carvaka.",
              },
              {
                q: "Do I need to follow all schools?",
                a: "No. Each school offers different paths and insights. The quiz will help you discover which philosophy aligns with your worldview and values.",
              },
              {
                q: "Is this only for Sanskrit scholars?",
                a: "Absolutely not! Our platform makes ancient wisdom accessible to everyone with clear explanations, audio guides, and interactive tools.",
              },
            ].map((faq, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <button
                  onClick={() =>
                    setActiveAccordion(activeAccordion === i ? null : i)
                  }
                  className={`w-full text-left p-6 rounded-xl border transition-all duration-300 ${
                    activeAccordion === i
                      ? isDarkMode
                        ? "bg-slate-800 border-amber-500"
                        : "bg-slate-100 border-violet-600"
                      : isDarkMode
                        ? "bg-slate-900/50 border-slate-700 hover:border-slate-600"
                        : "bg-slate-50 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg text-slate-900 dark:text-white">
                      {faq.q}
                    </h3>
                    <motion.div
                      animate={{ rotate: activeAccordion === i ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDownIcon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                    </motion.div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeAccordion === i ? 1 : 0,
                      height: activeAccordion === i ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPageHero;

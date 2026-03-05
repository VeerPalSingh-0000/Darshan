import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  SparklesIcon,
  ArrowRightIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  ANIMATION                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  DATA                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
const values = [
  {
    emoji: "🔬",
    title: "Accuracy",
    desc: "Grounded in primary texts and scholarly commentary.",
  },
  {
    emoji: "🕊️",
    title: "Respect",
    desc: "Every tradition — orthodox or heterodox — is presented with equal reverence.",
  },
  {
    emoji: "🎨",
    title: "Beauty",
    desc: "Philosophy deserves a home as elegant as the ideas it contains.",
  },
  {
    emoji: "🔓",
    title: "Openness",
    desc: "Free forever. No paywalls, no ads, no tracking. Just wisdom.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
const About = () => {
  return (
    <div className="bg-[#FAFAF8] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      {/* ═══════════ 1. HERO ═══════════ */}
      {/* Compact hero */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-serif text-slate-900/[0.015] dark:text-white/[0.015] select-none leading-none">
            दर्शन
          </div>
          <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p
              variants={fadeIn}
              className="text-[11px] font-mono tracking-[0.5em] uppercase text-amber-600 dark:text-amber-500 mb-6"
            >
              ✦ About Darshanam ✦
            </motion.p>
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white tracking-tight leading-tight mb-8"
            >
              The Journey{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                Within
              </span>
            </motion.h1>
            <motion.div
              variants={fadeIn}
              className="w-20 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8"
            />
            <motion.p
              variants={fadeIn}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light"
            >
              This project was born from a simple yet profound belief: that
              ancient wisdom holds timeless relevance. We aim to bridge the gap
              between millennia-old philosophies and the modern digital world.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 2. GUIDING PHILOSOPHY ═══════════ */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={cardAnim}>
              <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-amber-600 dark:text-amber-500 mb-5">
                Our Mission
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white leading-tight mb-6">
                A way of{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  seeing
                </span>
              </h2>
              <div className="w-16 h-1 bg-amber-500 rounded-full mb-8" />
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-light">
                <strong className="text-slate-900 dark:text-white font-medium">
                  Darśana
                </strong>{" "}
                (दर्शन) means <em>'a way of seeing'</em>. Our mission is not to
                provide definitive answers, but to offer a clearer lens through
                which to view the profound questions of existence.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-light">
                We are dedicated to presenting these complex ideas with clarity,
                respect, and intellectual honesty — creating a space for
                learning and contemplation that does justice to traditions
                spanning over 3,000 years.
              </p>
            </motion.div>

            {/* Values grid */}
            <motion.div variants={cardAnim} className="grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="p-6 rounded-2xl bg-[#FAFAF8] dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300"
                >
                  <div className="text-3xl mb-3">{v.emoji}</div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                    {v.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 4. CREATOR ═══════════ */}
      <section className="py-16 md:py-20 bg-[#FAFAF8] dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-amber-600 dark:text-amber-500 mb-3">
              The Creator
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-white">
              Built with Devotion
            </h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-5" />
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="rounded-[28px] bg-[#FAFAF8] dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/50 overflow-hidden">
              <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/20 flex items-center justify-center text-4xl font-serif text-amber-700 dark:text-amber-400 shadow-inner">
                    VP
                  </div>
                </div>

                {/* Info */}
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-serif text-slate-900 dark:text-white mb-1">
                    Veer Pal Singh
                  </h3>
                  <p className="text-sm font-semibold text-amber-600 dark:text-amber-500 tracking-wider uppercase mb-5">
                    Creator & Lead Developer
                  </p>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-light">
                    A passionate student of philosophy and a self-taught
                    developer, I created Darshanam to build a modern,
                    accessible, and beautiful space for exploring the profound
                    depths of Indian thought. Every line of code is an offering
                    to these timeless traditions.
                  </p>
                  <div className="flex gap-3 justify-center md:justify-start">
                    <a
                      href="https://github.com/VeerPalSingh-0000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-amber-400 dark:hover:border-amber-600 bg-white dark:bg-slate-800 transition-all"
                    >
                      <CodeBracketIcon className="w-3.5 h-3.5" /> GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 5. TECH STACK (small elegant touch) ═══════════ */}
      <section className="py-12 md:py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-slate-400 dark:text-slate-500 mb-6">
              Built With
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "React",
                "Vite",
                "Tailwind CSS",
                "Framer Motion",
                "Firebase",
                "Heroicons",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 6. CTA ═══════════ */}
      <section className="py-16 md:py-24 bg-[#FAFAF8] dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-20 h-20 mx-auto bg-amber-50 dark:bg-amber-900/20 rounded-full flex items-center justify-center mb-8">
              <SparklesIcon className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 leading-tight">
              Begin Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Exploration
              </span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed font-light">
              The path of inquiry is endless. Whether you are a curious newcomer
              or a seasoned student, there is always more to discover.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/explore"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full text-sm hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all"
              >
                <BookOpenIcon className="w-4 h-4" /> Explore the Schools
              </Link>
              <Link
                to="/gita"
                className="inline-flex items-center justify-center gap-2 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold px-8 py-4 rounded-full text-sm hover:border-amber-400 dark:hover:border-amber-600 transition-all"
              >
                Read the Gītā <ArrowRightIcon className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  BookOpenIcon,
  FireIcon,
  HeartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import GayatriMantra from "../Components/GayatriMantra";
import SutraWidget from "../Components/SutraWidget";
import AntiGravityCanvas from "../Components/ui/particle-effect-for-hero";
import { useTheme } from "../context/ThemeContext";
import { schools } from "../data/schoolsOfThought.jsx";

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeIn = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const cardUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Feature CTAs Data ────────────────────────────────────────────────────────
const features = [
  {
    emoji: "🧿",
    label: "Self-Discovery",
    title: "Which School Are You?",
    desc: "10 questions to discover the philosophy that mirrors your worldview.",
    path: "/quiz",
    btnText: "Take the Quiz",
    btnClass: "bg-white text-violet-700 hover:bg-violet-50",
    cardClass: "bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700",
    textClass: "text-violet-200",
  },
  {
    emoji: "📜",
    label: "600 BCE — 800 CE",
    title: "Philosopher Timeline",
    desc: "Journey through 1,400 years of genius across all Indian schools.",
    path: "/timeline",
    btnText: "Explore Timeline",
    btnClass: "bg-amber-500 text-slate-900 hover:bg-amber-400",
    cardClass:
      "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border border-slate-700/50",
    textClass: "text-slate-400",
  },
  {
    emoji: "🔊",
    label: "Audio Guide",
    title: "Sanskrit Pronunciation",
    desc: "38 terms with speaker icons — click to hear every word spoken aloud.",
    path: "/sanskrit",
    btnText: "Open the Guide",
    btnClass: "bg-emerald-400 text-slate-900 hover:bg-emerald-300",
    cardClass:
      "bg-gradient-to-br from-emerald-800 via-teal-900 to-cyan-950 border border-emerald-700/30",
    textClass: "text-emerald-200/70",
  },
];

// ─── Home Component ───────────────────────────────────────────────────────────
const Home = () => {
  const featuredSchools = schools.slice(0, 6);
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen bg-[#F8F5F2] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* ═══════════════ 1. HERO ═══════════════ */}
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
          className="relative z-10 max-w-4xl mx-auto pointer-events-none"
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
            ✦ Indian Philosophy ✦
          </motion.p>
          <h1 className="text-6xl md:text-9xl font-serif tracking-wide uppercase leading-none mb-6">
            <span className="block text-slate-900 dark:text-white">
              The Seeker's
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 dark:from-amber-300 dark:via-orange-300 dark:to-yellow-200">
              Path
            </span>
          </h1>
          <p className="mt-2 text-lg md:text-xl max-w-2xl mx-auto text-slate-600 dark:text-slate-300/90 font-light leading-relaxed">
            Journey through millennia of profound wisdom. Explore the diverse
            philosophies of India and uncover timeless truths about reality,
            consciousness, and the self.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
          >
            <Link
              to="/explore"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-amber-500 dark:to-orange-500 text-white font-bold tracking-wider uppercase py-4 px-10 rounded-full text-sm hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] dark:hover:shadow-[0_0_40px_rgba(245,158,11,0.4)] transition-all duration-300"
            >
              <SparklesIcon className="w-4 h-4" /> Begin Exploring
            </Link>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-3 border-2 border-slate-300 dark:border-white/30 text-slate-800 dark:text-white font-bold tracking-wider uppercase py-4 px-10 rounded-full text-sm hover:bg-slate-100 dark:hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Which School Are You? <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-white/30 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-slate-400 dark:bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ 2. SŪTRA OF THE DAY ═══════════════ */}
      <section className="py-20 sm:py-28 bg-[#F8F5F2] dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            className="text-center mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <p className="text-xs font-mono tracking-[0.4em] uppercase text-violet-600 dark:text-violet-400 mb-3">
              ✦ Daily Wisdom ✦
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 tracking-wide">
              Sūtra of the Day
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent mx-auto mt-5" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <SutraWidget />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 3. WHAT IS DARŚANA? ═══════════════ */}
      <section className="py-24 sm:py-32 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            className="grid md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.div variants={cardUp}>
              <p className="text-xs font-mono tracking-[0.4em] uppercase text-amber-600 dark:text-amber-500 mb-4">
                The Foundation
              </p>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                What is{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  Darśana
                </span>
                ?
              </h2>
              <div className="w-16 h-px bg-amber-500 mb-8" />
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Darśana{" "}
                <span className="text-amber-700 dark:text-amber-400 font-serif">
                  (दर्शन)
                </span>
                , the philosophy of India, is a <em>'way of seeing'</em>
                beyond the veil of ordinary perception. It is a mosaic of
                ancient traditions, each providing a unique
                <span className="text-amber-700 dark:text-amber-400 font-serif">
                  {" "}
                  Mārga (मार्ग)
                </span>{" "}
                — a path of inquiry and practice.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                This journey is undertaken not for academic knowledge alone, but
                for
                <span className="text-amber-700 dark:text-amber-400 font-serif">
                  {" "}
                  Mokṣa (मोक्ष)
                </span>{" "}
                — the soul's liberation from the bonds of suffering, and the
                direct recognition of reality as it truly is.
              </p>
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-500 font-bold hover:text-amber-900 dark:hover:text-amber-400 transition-colors group"
              >
                Explore the Schools{" "}
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div variants={cardUp} className="grid grid-cols-2 gap-4">
              {[
                {
                  num: "9",
                  label: "Schools of Philosophy",
                  color: "text-amber-600",
                },
                {
                  num: "3000+",
                  label: "Years of Wisdom",
                  color: "text-violet-600",
                },
                {
                  num: "∞",
                  label: "Internal Truths",
                  color: "text-emerald-600",
                },
                {
                  num: "1",
                  label: "Common Goal",
                  color: "text-rose-600",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={cardUp}
                  className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 text-center hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300"
                >
                  <p
                    className={`text-3xl md:text-4xl font-serif ${stat.color} mb-2`}
                  >
                    {stat.num}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 4. FEATURED SCHOOLS ═══════════════ */}
      <section className="py-24 sm:py-32 bg-[#F8F5F2] dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <p className="text-xs font-mono tracking-[0.4em] uppercase text-amber-600 dark:text-amber-500 mb-3">
              Āstika & Nāstika
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 tracking-wide">
              Schools of Thought
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-5 mb-4" />
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              A glimpse into the foundational schools that form the bedrock of
              Indian philosophical inquiry.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {featuredSchools.map((school) => (
              <motion.div
                key={school.name}
                variants={cardUp}
                className="group bg-white dark:bg-slate-900 p-7 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)] transition-all duration-300 flex flex-col text-center items-center"
              >
                <div className="bg-amber-500/10 p-4 rounded-2xl group-hover:bg-amber-500/20 transition-colors">
                  {school.icon}
                </div>
                <h3 className="text-xl font-serif tracking-wider uppercase mt-5 mb-2.5 text-slate-800 dark:text-slate-100">
                  {school.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 flex-grow text-sm leading-relaxed">
                  {school.description}
                </p>
                <Link
                  to={school.path}
                  className="mt-5 font-bold text-sm text-amber-700 dark:text-amber-500 hover:text-amber-900 inline-flex items-center group/link"
                >
                  Learn More{" "}
                  <ArrowRightIcon className="ml-2 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 text-lg text-slate-700 dark:text-slate-300 font-semibold hover:text-amber-700 dark:hover:text-amber-500 transition-colors group"
            >
              Explore all nine schools{" "}
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 5. FEATURE CTAs ═══════════════ */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <p className="text-xs font-mono tracking-[0.4em] uppercase text-violet-600 dark:text-violet-400 mb-3">
              Interactive Experiences
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 dark:text-slate-100">
              Go Deeper
            </h2>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={cardUp}
                className={`relative overflow-hidden rounded-[24px] p-8 text-center shadow-xl ${f.cardClass}`}
              >
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:25px_25px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{f.emoji}</div>
                  <p
                    className={`text-[10px] font-mono tracking-[0.3em] uppercase mb-2 ${f.textClass}`}
                  >
                    {f.label}
                  </p>
                  <h3 className="text-2xl font-serif text-white mb-3">
                    {f.title}
                  </h3>
                  <p
                    className={`text-xs mx-auto mb-6 leading-relaxed ${f.textClass}`}
                  >
                    {f.desc}
                  </p>
                  <Link
                    to={f.path}
                    className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-full text-xs transition-all shadow-lg ${f.btnClass}`}
                  >
                    {f.btnText} <ArrowRightIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 6. GĪTĀ VERSE ═══════════════ */}
      <section className="py-24 sm:py-32 bg-[#F8F5F2] dark:bg-slate-950">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <p className="text-xs font-mono tracking-[0.4em] uppercase text-amber-600 dark:text-amber-500 mb-3">
              The Song of the Divine
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100">
              Bhagavad Gītā
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-5" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            {/* Gita highlight card */}
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
              <div className="h-1.5 w-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500" />
              <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl px-8 md:px-14 py-12 rounded-b-[28px] relative">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 65%)",
                  }}
                />
                <div className="relative z-10 text-center max-w-3xl mx-auto">
                  <p className="text-sm tracking-[0.3em] text-amber-600 dark:text-amber-500 uppercase font-bold mb-6">
                    Verse Highlight · Gītā 2.47
                  </p>
                  <blockquote>
                    <p className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-slate-100 leading-relaxed mb-4">
                      कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
                      <br />
                      मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
                    </p>
                    <div className="flex items-center justify-center gap-3 my-5">
                      <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-400/60" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-400/60" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 italic text-lg leading-relaxed">
                      "You have a right to action alone, never to its fruits.
                      Let not the fruits of action be your motive, nor let your
                      attachment be to inaction."
                    </p>
                  </blockquote>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    <Link
                      to="/gita"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3.5 rounded-full text-sm hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all"
                    >
                      <BookOpenIcon className="w-4 h-4" /> Explore the Gītā
                    </Link>
                    <Link
                      to="/sutra"
                      className="inline-flex items-center gap-2 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 font-bold px-8 py-3.5 rounded-full text-sm hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
                    >
                      More Sūtras <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gita paths */}
          <motion.div
            className="grid md:grid-cols-3 gap-5 mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {[
              {
                Icon: BookOpenIcon,
                title: "Jñāna · Karma · Bhakti",
                desc: "Knowledge, action, and devotion — three paths harmonized for liberation.",
              },
              {
                Icon: FireIcon,
                title: "Svadharma & Detachment",
                desc: "Act from your deepest nature, offering fruits without attachment to outcomes.",
              },
              {
                Icon: HeartIcon,
                title: "Yoga of Devotion",
                desc: "Surrender with love; see the Divine in all beings and serve as worship.",
              },
            ].map(({ Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={cardUp}
                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-700 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-500 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-slate-100">
                  {title}
                </h3>
                <p className="mt-1.5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 7. GĀYATRĪ MANTRA ═══════════════ */}
      <GayatriMantra />

      {/* ═══════════════ 8. FINAL CTA ═══════════════ */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <p className="text-xs font-mono tracking-[0.4em] uppercase text-slate-400 mb-4">
              Your Journey Awaits
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-slate-100 mb-6">
              Continue Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-violet-600 dark:from-amber-400 dark:to-violet-400">
                Exploration
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Discover more philosophical traditions, take the personality quiz,
              or dive into the Bhagavad Gītā — the wisdom of India awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/explore"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all"
              >
                <SparklesIcon className="w-4 h-4" /> Explore All Schools
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold px-8 py-4 rounded-full hover:border-amber-400 dark:hover:border-amber-600 transition-all"
              >
                About Darshanam <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;

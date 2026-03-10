import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import philosophyHeroImg from "../assets/Images/indian-philosophy-hero.png";

import { schools } from "../data/schoolsOfThought";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  ANIMATION                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  COMPONENTS                                                                */
/* ═══════════════════════════════════════════════════════════════════════════ */
const SchoolCard = ({ school }) => (
  <motion.div variants={cardAnim}>
    <Link to={school.path} className="group block h-full">
      <div className="relative h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg dark:hover:shadow-2xl">
        {/* Accent bar */}
        <div className="h-[3px]" style={{ background: school.accent }} />

        <div className="p-6 sm:p-7 flex flex-col h-full">
          {/* Top row */}
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{
                backgroundColor: school.accent + "12",
                color: school.accent,
              }}
            >
              {school.icon}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight truncate">
                {school.name}
              </h3>
              <p className="text-xs text-slate-400 font-serif italic">
                {school.sanskrit} · {school.tagline}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">
            {school.description}
          </p>

          {/* Footer */}
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">{school.founder}</span>
            <span
              className="text-xs font-semibold flex items-center gap-1 transition-transform duration-200 group-hover:translate-x-0.5"
              style={{ color: school.accent }}
            >
              Explore <ArrowRightIcon className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const FeatureCard = ({ emoji, title, desc, path, btn, gradient, btnClass }) => (
  <motion.div variants={cardAnim}>
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-7 sm:p-8 h-full`}
    >
      <div className="relative z-10 flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-2xl shrink-0">
          {emoji}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1.5">{title}</h3>
          <p className="text-white/50 text-sm leading-relaxed mb-4">{desc}</p>
          <Link
            to={path}
            className={`inline-flex items-center gap-1.5 font-bold px-5 py-2.5 rounded-full text-xs transition-all ${btnClass}`}
          >
            {btn} <ArrowRightIcon className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
const ExplorePage = () => {
  const [filter, setFilter] = useState("All");
  const displayed =
    filter === "All" ? schools : schools.filter((s) => s.category === filter);

  return (
    <div className="bg-[#FAFAF8] dark:bg-slate-950 min-h-screen transition-colors duration-300">
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={philosophyHeroImg}
            alt="Indian Philosophy Hero"
            className="w-full h-full object-cover object-center transform scale-[1.02]"
            loading="eager"
          />
          {/* Gradients to blend with background and text */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAFAF8] via-[#FAFAF8]/60 to-[#FAFAF8]/20 dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF8]/30 via-transparent to-[#FAFAF8]/30 dark:from-black/40 dark:via-transparent dark:to-black/40" />

          {/* Glowing orb effect */}
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-amber-400/10 dark:bg-amber-500/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
          />
        </div>

        <div className="container relative z-10 mx-auto px-6 max-w-5xl">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <p className="text-[12px] md:text-sm font-mono tracking-[0.6em] uppercase text-amber-700 dark:text-amber-500 mb-6 font-semibold drop-shadow-sm">
              ✦ Indian Philosophy ✦
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-slate-900 dark:text-white leading-tight mb-6 drop-shadow-md">
              Darśana: The Vision
            </h1>
            <p className="text-base sm:text-xl text-slate-700 dark:text-slate-200 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-sm">
              Journey through the{" "}
              <span className="text-amber-700 dark:text-amber-400 font-semibold text-xl">
                ṣaḍ-darśana
              </span>{" "}
              and beyond—the ancient paths of insight that illuminate the nature
              of reality.
            </p>

            {/* Filter pills */}
            <div className="inline-flex items-center bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full p-1 gap-0.5 shadow-sm">
              {["All", "Āstika", "Nāstika"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    filter === f
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md scale-105"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {f === "All"
                    ? "Explore All"
                    : f === "Āstika"
                      ? "Orthodox (6)"
                      : "Heterodox (3)"}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SCHOOL CARDS ─── */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={stagger}
            >
              {displayed.map((s) => (
                <SchoolCard key={s.name} school={s} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ─── DIVIDER ─── */}
      <div className="container mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      </div>

      {/* ─── FEATURES ─── */}
      <section className="py-14 sm:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.p
            className="text-center text-[11px] font-mono tracking-[0.4em] uppercase text-slate-400 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            More Ways to Explore
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-2 gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <FeatureCard
              emoji="🧿"
              title="Which School Are You?"
              desc="10 philosophical questions reveal the tradition that mirrors your worldview."
              path="/quiz"
              btn="Take the Quiz"
              gradient="from-violet-600 to-indigo-700"
              btnClass="bg-white text-violet-700 hover:bg-violet-50"
            />
            <FeatureCard
              emoji="📜"
              title="Philosopher Timeline"
              desc="1,400 years of thinkers—from 600 BCE to 800 CE—across every school."
              path="/timeline"
              btn="View Timeline"
              gradient="from-slate-800 to-slate-950"
              btnClass="bg-amber-500 text-slate-900 hover:bg-amber-400"
            />
            <FeatureCard
              emoji="🔊"
              title="Sanskrit Guide"
              desc="38 terms with audio pronunciation. Click to hear every word spoken."
              path="/sanskrit"
              btn="Open Guide"
              gradient="from-emerald-800 to-teal-950"
              btnClass="bg-emerald-400 text-slate-900 hover:bg-emerald-300"
            />
            <FeatureCard
              emoji="✨"
              title="Sūtra of the Day"
              desc="A new Sanskrit verse daily—transliterated, translated, and shareable."
              path="/sutra"
              btn="Today's Sūtra"
              gradient="from-indigo-900 to-purple-950"
              btnClass="bg-white text-indigo-700 hover:bg-indigo-50"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;

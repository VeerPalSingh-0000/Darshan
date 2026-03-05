import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

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

const FeatureCard = ({
  emoji,
  title,
  desc,
  path,
  btn,
  gradient,
  btnClass,
  delay = 0,
}) => (
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
      {/* ─── HEADER ─── */}
      <header className="pt-28 pb-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <p className="text-[11px] font-mono tracking-[0.4em] uppercase text-amber-600 dark:text-amber-500 mb-4">
              Indian Philosophy
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-slate-900 dark:text-white leading-tight mb-5">
              Schools of Darśana
            </h1>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-10">
              Six{" "}
              <span className="text-amber-700 dark:text-amber-400 font-medium">
                orthodox
              </span>{" "}
              and three{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                heterodox
              </span>{" "}
              traditions that form the intellectual bedrock of Indian thought.
            </p>

            {/* Filter pills */}
            <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 gap-0.5">
              {["All", "Āstika", "Nāstika"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    filter === f
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {f === "All"
                    ? "All (9)"
                    : f === "Āstika"
                      ? "Āstika (6)"
                      : "Nāstika (3)"}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </header>

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

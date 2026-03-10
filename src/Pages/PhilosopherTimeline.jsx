import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";
import ScrollToTop from "../Components/ScrollToTop";

// ─── Data ─────────────────────────────────────────────────────────────────────
// year: negative = BCE, positive = CE
const philosophers = [
  {
    id: 1,
    name: "Kapila",
    year: -600,
    school: "Sāṃkhya",
    schoolPath: "/schools/samkhya",
    role: "Founder",
    description:
      "The sage who formulated the Sāṃkhya system — one of the oldest Hindu philosophies — outlining the 25 Tattvas and the dualism of Puruṣa and Prakṛti.",
    emoji: "🪷",
    color: "from-blue-500 to-indigo-600",
    textColor: "text-blue-500",
    borderColor: "border-blue-500/40",
    bgColor: "bg-blue-500/10",
    era: "Vedic",
    keyIdea: "Puruṣa-Prakṛti Dualism",
    keyText: "Sāṃkhya Kārikā",
  },
  {
    id: 2,
    name: "Bṛhaspati",
    year: -600,
    school: "Cārvāka",
    schoolPath: "/schools/carvaka",
    role: "Founder",
    description:
      "The legendary founder of the Lokāyata (Cārvāka) school of materialism, teaching that perception alone is valid knowledge and matter alone is real.",
    emoji: "🌺",
    color: "from-rose-500 to-pink-600",
    textColor: "text-rose-500",
    borderColor: "border-rose-500/40",
    bgColor: "bg-rose-500/10",
    era: "Vedic",
    keyIdea: "Perception as Only Pramāṇa",
    keyText: "Sarvasiddhānta Saṃgraha",
  },
  {
    id: 3,
    name: "Mahāvīra",
    year: -599,
    school: "Jainism",
    schoolPath: "/schools/jainism",
    role: "24th Tīrthaṅkara",
    description:
      "The last and greatest Tīrthaṅkara of Jainism, who systematized Jain metaphysics, ethics, and the doctrine of Anekāntavāda (many-sided truth).",
    emoji: "💎",
    color: "from-emerald-500 to-green-600",
    textColor: "text-emerald-500",
    borderColor: "border-emerald-500/40",
    bgColor: "bg-emerald-500/10",
    era: "Vedic",
    keyIdea: "Ahiṃsā & Anekāntavāda",
    keyText: "Āgamas",
  },
  {
    id: 4,
    name: "Siddhārtha Gautama",
    year: -563,
    school: "Buddhism",
    schoolPath: "/schools/buddhism",
    role: "The Buddha",
    description:
      "The Awakened One who, under the Bodhi tree, realized the Four Noble Truths and the Eightfold Path — the most transformative philosophical event in Asian history.",
    emoji: "☸️",
    color: "from-amber-500 to-yellow-500",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/40",
    bgColor: "bg-amber-500/10",
    era: "Vedic",
    keyIdea: "Four Noble Truths & Anattā",
    keyText: "Dhammapada, Pali Canon",
  },
  {
    id: 5,
    name: "Kaṇāda",
    year: -600,
    school: "Vaiśeṣika",
    schoolPath: "/schools/vaisesika",
    role: "Founder",
    description:
      "The sage who proclaimed that the universe is made of indivisible atoms (Aṇu) — articulating India's earliest atomic theory and the 7 Padārthas.",
    emoji: "⚛️",
    color: "from-purple-500 to-violet-600",
    textColor: "text-purple-500",
    borderColor: "border-purple-500/40",
    bgColor: "bg-purple-500/10",
    era: "Vedic",
    keyIdea: "Atomic Theory (Aṇu)",
    keyText: "Vaiśeṣika Sūtras",
  },
  {
    id: 6,
    name: "Gautama Maharṣi",
    year: -550,
    school: "Nyāya",
    schoolPath: "/schools/nyaya",
    role: "Founder",
    description:
      "The author of the Nyāya Sūtras who established the rigorous science of logical reasoning, the 4 Pramāṇas, and the 5-step Nyāya syllogism.",
    emoji: "⚖️",
    color: "from-teal-500 to-cyan-500",
    textColor: "text-teal-500",
    borderColor: "border-teal-500/40",
    bgColor: "bg-teal-500/10",
    era: "Vedic",
    keyIdea: "16 Padārthas & Syllogism",
    keyText: "Nyāya Sūtras",
  },
  {
    id: 7,
    name: "Jaimini",
    year: -400,
    school: "Mīmāṃsā",
    schoolPath: "/schools/mimamsa",
    role: "Founder",
    description:
      "The systematizer of Pūrva Mīmāṃsā who argued that the Vedas are eternal and authorless, and that ritual action (Dharma) is the supreme human purpose.",
    emoji: "🔔",
    color: "from-red-500 to-orange-500",
    textColor: "text-red-500",
    borderColor: "border-red-500/40",
    bgColor: "bg-red-500/10",
    era: "Classical",
    keyIdea: "Apauruṣeyā Veda & Apūrva",
    keyText: "Mīmāṃsā Sūtras",
  },
  {
    id: 8,
    name: "Bādarāyaṇa",
    year: -400,
    school: "Vedānta",
    schoolPath: "/schools/vedanta",
    role: "Founder",
    description:
      "The author of the Brahma Sūtras who synthesized the Upaniṣadic teachings into a coherent philosophical school, the foundation of Vedānta.",
    emoji: "🔱",
    color: "from-orange-500 to-amber-500",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/40",
    bgColor: "bg-orange-500/10",
    era: "Classical",
    keyIdea: "Brahman as Ultimate Reality",
    keyText: "Brahma Sūtras",
  },
  {
    id: 9,
    name: "Patañjali",
    year: -200,
    school: "Yoga",
    schoolPath: "/schools/yoga",
    role: "Systematizer",
    description:
      "The great codifier of Yoga philosophy who compiled the 196 Yoga Sūtras, defining Yoga as 'the restraint of the fluctuations of the mind-stuff' (Citta-vṛtti-nirodha).",
    emoji: "🧘",
    color: "from-green-500 to-emerald-500",
    textColor: "text-green-500",
    borderColor: "border-green-500/40",
    bgColor: "bg-green-500/10",
    era: "Classical",
    keyIdea: "Aṣṭāṅga Yoga & Samādhi",
    keyText: "Yoga Sūtras",
  },
  {
    id: 10,
    name: "Nāgārjuna",
    year: 150,
    school: "Buddhism",
    schoolPath: "/schools/buddhism",
    role: "Mādhyamika Founder",
    description:
      "The towering Buddhist philosopher who founded the Mādhyamika school, asserting Śūnyatā (Emptiness) — that all phenomena are empty of intrinsic existence.",
    emoji: "🌕",
    color: "from-amber-500 to-yellow-500",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/40",
    bgColor: "bg-amber-500/10",
    era: "Golden Age",
    keyIdea: "Śūnyatā (Emptiness)",
    keyText: "Mūlamadhyamakakārikā",
  },
  {
    id: 11,
    name: "Vātsyāyana",
    year: 400,
    school: "Nyāya",
    schoolPath: "/schools/nyaya",
    role: "Commentator",
    description:
      "The great commentator on the Nyāya Sūtras whose Nyāya Bhāṣya elaborated and refined Gautama's original system for a new age.",
    emoji: "📜",
    color: "from-teal-500 to-cyan-500",
    textColor: "text-teal-500",
    borderColor: "border-teal-500/40",
    bgColor: "bg-teal-500/10",
    era: "Golden Age",
    keyIdea: "Valid Knowledge & Refutation",
    keyText: "Nyāya Bhāṣya",
  },
  {
    id: 12,
    name: "Vasubandhu",
    year: 400,
    school: "Buddhism",
    schoolPath: "/schools/buddhism",
    role: "Yogācāra Master",
    description:
      "The prolific Buddhist philosopher who mastered both Abhidharma and Mahāyāna, becoming a key figure in the Yogācāra (mind-only) school.",
    emoji: "🪷",
    color: "from-amber-500 to-yellow-500",
    textColor: "text-amber-500",
    borderColor: "border-amber-500/40",
    bgColor: "bg-amber-500/10",
    era: "Golden Age",
    keyIdea: "Vijñaptimātratā (Mind-Only)",
    keyText: "Abhidharmakośa",
  },
  {
    id: 13,
    name: "Ādi Śaṅkarācārya",
    year: 788,
    school: "Vedānta",
    schoolPath: "/schools/vedanta",
    role: "Advaita Champion",
    description:
      "The most influential philosopher in Indian history who systematized Advaita Vedānta, traveled all of India defeating rivals in debate, and established four monastic centers (Maṭhas) that still exist today.",
    emoji: "∞",
    color: "from-orange-500 to-amber-500",
    textColor: "text-orange-500",
    borderColor: "border-orange-500/40",
    bgColor: "bg-orange-500/10",
    era: "Golden Age",
    keyIdea: "Advaita — Ātman = Brahman",
    keyText: "Vivekacūḍāmaṇi, Commentaries",
  },
];

// Era definitions with start/end years and visual color
const eras = [
  {
    label: "Vedic Period",
    start: -650,
    end: -301,
    color: "bg-amber-500/8 dark:bg-amber-500/5",
    border: "border-l-amber-500/30",
    text: "text-amber-600 dark:text-amber-500",
  },
  {
    label: "Classical Period",
    start: -300,
    end: 1,
    color: "bg-blue-500/8 dark:bg-blue-500/5",
    border: "border-l-blue-500/30",
    text: "text-blue-600 dark:text-blue-500",
  },
  {
    label: "Golden Age",
    start: 1,
    end: 850,
    color: "bg-violet-500/8 dark:bg-violet-500/5",
    border: "border-l-violet-500/30",
    text: "text-violet-600 dark:text-violet-500",
  },
];

// ─── Timeline config ──────────────────────────────────────────────────────────
const MIN_YEAR = -650;
const MAX_YEAR = 850;
const TOTAL_SPAN = MAX_YEAR - MIN_YEAR; // 1500 years
const TRACK_WIDTH = 4000; // px — wide scrollable canvas

const yearToX = (year) => ((year - MIN_YEAR) / TOTAL_SPAN) * TRACK_WIDTH;

// Generate tick marks every 100 years
const ticks = [];
for (let y = -600; y <= 800; y += 100) ticks.push(y);

// ─── Component ────────────────────────────────────────────────────────────────
const PhilosopherTimeline = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Drag-to-scroll
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };
  const onMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Scroll to roughly 200 BCE on mount
  useEffect(() => {
    if (scrollRef.current) {
      const targetX = yearToX(-200) - 300;
      scrollRef.current.scrollLeft = targetX;
    }
  }, []);

  const schools = ["All", ...new Set(philosophers.map((p) => p.school))];
  const filtered =
    filter === "All"
      ? philosophers
      : philosophers.filter((p) => p.school === filter);

  const formatYear = (y) => (y < 0 ? `${Math.abs(y)} BCE` : `${y} CE`);

  return (
    <div className="min-h-screen bg-[#f8f6ff] dark:bg-[#07060f] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans">
      <ScrollToTop />

      {/* ── Header ── */}
      <div className="relative overflow-hidden">
        {/* BG gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-100/60 to-transparent dark:from-violet-950/40 dark:to-transparent pointer-events-none" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-violet-400/10 rounded-full blur-[100px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative container mx-auto px-6 pt-24 pb-14 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-violet-600 dark:text-violet-400 text-xs font-mono tracking-[0.4em] uppercase mb-4"
          >
            600 bce — 800 ce
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white mb-4"
          >
            Philosopher
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-400">
              {" "}
              Timeline
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-8"
          >
            Scroll through 1,400 years of philosophical genius. Click any
            thinker to explore their ideas.
          </motion.p>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-4"
          >
            {schools.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200
                  ${
                    filter === s
                      ? "bg-violet-600 border-violet-600 text-white shadow-lg"
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-400 dark:hover:border-violet-500"
                  }`}
              >
                {s}
              </button>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs text-slate-400 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
            Drag to scroll · Click any philosopher to learn more
          </motion.p>
        </div>
      </div>

      {/* ── Era Legend ── */}
      <div className="container mx-auto px-6 mb-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {eras.map((era) => (
            <div key={era.label} className="flex items-center gap-2 text-sm">
              <div
                className={`w-3 h-3 rounded-sm ${era.color.replace("/8", "/40").replace("/5", "/30")} border ${era.border}`}
              />
              <span className={`${era.text} font-medium`}>{era.label}</span>
              <span className="text-slate-400">
                ({formatYear(era.start)} – {formatYear(era.end)})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Horizontal Scrollable Timeline Track ── */}
      <div className="relative mx-auto px-0 pb-8 overflow-hidden">
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-thin scrollbar-thumb-violet-400/30 scrollbar-track-transparent"
          style={{ cursor: "grab" }}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onMouseMove={onMouseMove}
        >
          {/* Inner track */}
          <div
            className="relative"
            style={{
              width: TRACK_WIDTH + 120,
              height: 520,
              minWidth: TRACK_WIDTH + 120,
            }}
          >
            {/* Era Background Bands */}
            {eras.map((era) => {
              const x1 = yearToX(era.start);
              const x2 = yearToX(era.end);
              return (
                <div
                  key={era.label}
                  className={`absolute top-0 bottom-0 ${era.color}`}
                  style={{ left: x1 + 60, width: x2 - x1 }}
                />
              );
            })}

            {/* Year ticks & labels */}
            {ticks.map((year) => {
              const x = yearToX(year) + 60;
              return (
                <div
                  key={year}
                  className="absolute"
                  style={{ left: x, top: 0, bottom: 0 }}
                >
                  <div className="absolute top-0 h-full w-px bg-slate-200 dark:bg-slate-800/60" />
                  <div
                    className="absolute"
                    style={{ top: 232, transform: "translateX(-50%)" }}
                  >
                    <div className="w-px h-4 bg-slate-400/60 dark:bg-slate-600 mx-auto mb-1" />
                    <span className="text-[11px] text-slate-500 font-mono whitespace-nowrap block text-center">
                      {formatYear(year)}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Central baseline */}
            <div
              className="absolute"
              style={{ top: 248, left: 60, width: TRACK_WIDTH, height: 2 }}
            >
              <div className="w-full h-full bg-gradient-to-r from-transparent via-violet-400/50 to-transparent dark:via-violet-500/30" />
            </div>

            {/* "BCE" / "CE" divider at year 0 */}
            <div
              className="absolute"
              style={{ left: yearToX(0) + 60, top: 40 }}
            >
              <div
                className="h-full absolute w-px bg-violet-400/40 dark:bg-violet-500/30 top-0 bottom-0"
                style={{ height: 440 }}
              />
              <div className="absolute -top-1 -translate-x-1/2 bg-violet-500 text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full">
                CE
              </div>
            </div>

            {/* ── Philosopher Nodes ── */}
            {filtered.map((p, idx) => {
              const x = yearToX(p.year) + 60;
              // Alternate above/below the centre line to avoid overlap
              const above = idx % 2 === 0;
              const nodeTop = above ? 80 : 278;

              return (
                <div key={p.id}>
                  {/* Vertical connector line */}
                  <div
                    className={`absolute w-px ${above ? "bg-gradient-to-b" : "bg-gradient-to-t"} from-transparent to-violet-400/40`}
                    style={{
                      left: x,
                      top: above ? nodeTop + 118 : 250,
                      height: above ? 130 : 28 + (nodeTop - 250),
                    }}
                  />

                  {/* Node Card */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: idx * 0.06,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    whileHover={{ scale: 1.07, zIndex: 50 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelected(p)}
                    className={`absolute w-[148px] rounded-2xl border-2 ${p.borderColor} ${p.bgColor} bg-white dark:bg-slate-900 shadow-lg
                      backdrop-blur-sm transition-shadow hover:shadow-[0_0_30px_rgba(139,92,246,0.25)] text-left select-none`}
                    style={{ left: x - 74, top: nodeTop }}
                  >
                    <div
                      className={`h-1 w-full rounded-t-xl bg-gradient-to-r ${p.color}`}
                    />
                    <div className="p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{p.emoji}</span>
                        <span
                          className={`text-[9px] font-bold tracking-widest uppercase ${p.textColor} truncate`}
                        >
                          {p.school}
                        </span>
                      </div>
                      <h3 className="text-sm font-serif text-slate-800 dark:text-slate-100 leading-tight font-bold">
                        {p.name}
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {formatYear(p.year)}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-snug">
                        {p.keyIdea}
                      </p>
                    </div>
                  </motion.button>

                  {/* Dot on baseline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.06 + 0.1 }}
                    className={`absolute w-3 h-3 rounded-full bg-gradient-to-br ${p.color} shadow-[0_0_12px_rgba(139,92,246,0.5)] z-10`}
                    style={{ left: x - 6, top: 243 }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Fade edges */}
        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#f8f6ff] dark:from-[#07060f] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#f8f6ff] dark:from-[#07060f] to-transparent pointer-events-none" />
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-0 left-0 right-0 md:bottom-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
                md:max-w-lg w-full z-50 md:rounded-[28px] rounded-t-[28px] overflow-hidden
                bg-white dark:bg-slate-900 shadow-[0_0_80px_rgba(0,0,0,0.4)]"
            >
              {/* Gradient top bar */}
              <div
                className={`h-2 w-full bg-gradient-to-r ${selected.color}`}
              />

              <div className="p-6 md:p-8">
                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>

                {/* Header */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selected.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}
                  >
                    {selected.emoji}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-mono tracking-[0.3em] uppercase ${selected.textColor} mb-0.5`}
                    >
                      {selected.school} · {selected.role}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white">
                      {selected.name}
                    </h2>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {formatYear(selected.year)} · {selected.era} Period
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                  {selected.description}
                </p>

                {/* Key Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl ${selected.bgColor} border ${selected.borderColor}`}
                  >
                    <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1">
                      Key Idea
                    </p>
                    <p
                      className={`font-serif text-sm ${selected.textColor} font-semibold`}
                    >
                      {selected.keyIdea}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-xl ${selected.bgColor} border ${selected.borderColor}`}
                  >
                    <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1">
                      Key Text
                    </p>
                    <p
                      className={`font-serif text-sm ${selected.textColor} font-semibold`}
                    >
                      {selected.keyText}
                    </p>
                  </div>
                </div>

                {/* Navigate to school */}
                <Link
                  to={selected.schoolPath}
                  onClick={() => setSelected(null)}
                  className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r ${selected.color} text-white font-bold py-3.5 rounded-full hover:opacity-90 transition-all shadow-lg text-sm`}
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  Explore the {selected.school} School
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Back Link ── */}
      <div className="container mx-auto px-6 py-8 text-center">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Explore
        </Link>
      </div>
    </div>
  );
};

export default PhilosopherTimeline;

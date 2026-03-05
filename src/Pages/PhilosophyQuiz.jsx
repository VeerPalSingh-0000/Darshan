import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ScrollToTop from "../Components/ScrollToTop";

// ─── Quiz Data ────────────────────────────────────────────────────────────────
// Each answer scores points for a school. Schools:
// vedanta | yoga | buddhism | jainism | nyaya | vaisesika | samkhya | mimamsa | carvaka

const questions = [
  {
    id: 1,
    question:
      "When you look at the world around you, what do you fundamentally see?",
    emoji: "🌍",
    options: [
      {
        text: "One infinite consciousness appearing as many forms.",
        school: "vedanta",
        icon: "∞",
      },
      {
        text: "A web of causes and effects, nothing standing alone.",
        school: "buddhism",
        icon: "⭕",
      },
      {
        text: "Matter, energy, and atoms — beautiful and real.",
        school: "vaisesika",
        icon: "⚛️",
      },
      {
        text: "A place of both joy and suffering, to be lived mindfully.",
        school: "carvaka",
        icon: "🌺",
      },
    ],
  },
  {
    id: 2,
    question: "What is the nature of the self — the 'I' that you experience?",
    emoji: "🪞",
    options: [
      {
        text: "It is the eternal, unchanging witness (Puruṣa) beyond the body and mind.",
        school: "samkhya",
        icon: "👁️",
      },
      {
        text: "It is Brahman itself — absolute, infinite existence-consciousness.",
        school: "vedanta",
        icon: "🔱",
      },
      {
        text: "There is no permanent self — I am a constantly changing stream.",
        school: "buddhism",
        icon: "🌊",
      },
      {
        text: "It is an eternal soul (Jīva) seeking liberation from karmic matter.",
        school: "jainism",
        icon: "💫",
      },
    ],
  },
  {
    id: 3,
    question: "How do you believe we can arrive at TRUE knowledge?",
    emoji: "💡",
    options: [
      {
        text: "Through direct perception, inference, and logical reasoning.",
        school: "nyaya",
        icon: "⚖️",
      },
      {
        text: "Only through direct sensory perception — see it to believe it.",
        school: "carvaka",
        icon: "👁️",
      },
      {
        text: "By disciplining the mind in meditation until it becomes perfectly still.",
        school: "yoga",
        icon: "🧘",
      },
      {
        text: "Through the eternal, authorless words of the Veda.",
        school: "mimamsa",
        icon: "📜",
      },
    ],
  },
  {
    id: 4,
    question: "What keeps us trapped in suffering and the cycle of rebirth?",
    emoji: "🔗",
    options: [
      {
        text: "Ignorance (Avidyā) — not knowing that Ātman = Brahman.",
        school: "vedanta",
        icon: "🌫️",
      },
      {
        text: "Craving (Taṇhā) and identification with what is impermanent.",
        school: "buddhism",
        icon: "🔥",
      },
      {
        text: "The entanglement of the pure soul in matter through past karma.",
        school: "jainism",
        icon: "⚓",
      },
      {
        text: "The association of pure consciousness (Puruṣa) with Prakṛti.",
        school: "samkhya",
        icon: "🌀",
      },
    ],
  },
  {
    id: 5,
    question: "How do you relate to the idea of God or a Supreme Being?",
    emoji: "✨",
    options: [
      {
        text: "God is the universe itself — one infinite, impersonal Brahman.",
        school: "vedanta",
        icon: "🌌",
      },
      {
        text: "God is unnecessary — the universe runs on natural law (Dharma).",
        school: "buddhism",
        icon: "⚖️",
      },
      {
        text: "God concept is speculation — only what we perceive is real.",
        school: "carvaka",
        icon: "🔬",
      },
      {
        text: "Reality consists of fundamental atoms without a divine creator.",
        school: "vaisesika",
        icon: "⚛️",
      },
    ],
  },
  {
    id: 6,
    question: "What is your primary approach to living an ethical life?",
    emoji: "🌿",
    options: [
      {
        text: "Non-violence (Ahiṃsā) in every thought, word, and action.",
        school: "jainism",
        icon: "🕊️",
      },
      {
        text: "Perform your duties (Dharma) correctly, as the Vedas prescribe.",
        school: "mimamsa",
        icon: "🔔",
      },
      {
        text: "Follow the Eightfold Path — right thought, right action, right effort.",
        school: "buddhism",
        icon: "☸️",
      },
      {
        text: "Live, enjoy, be kind — this life is the only one we have.",
        school: "carvaka",
        icon: "🌸",
      },
    ],
  },
  {
    id: 7,
    question: "When you face a difficult problem, what is your instinct?",
    emoji: "🧩",
    options: [
      {
        text: "Break it into its parts, apply logic — find the valid proof.",
        school: "nyaya",
        icon: "🔍",
      },
      {
        text: "Sit quietly, observe the mind's reactions, let clarity arise.",
        school: "yoga",
        icon: "🧘",
      },
      {
        text: "Look at it from multiple angles — every truth is partial.",
        school: "jainism",
        icon: "💎",
      },
      {
        text: "Experiment and observe — trust what can be empirically verified.",
        school: "vaisesika",
        icon: "⚗️",
      },
    ],
  },
  {
    id: 8,
    question: "What does LIBERATION or ultimate freedom mean to you?",
    emoji: "🕊️",
    options: [
      {
        text: "The recognition that I was always free — I AM Brahman.",
        school: "vedanta",
        icon: "🌅",
      },
      {
        text: "Nirvāṇa — extinguishing craving, resting in unconditioned peace.",
        school: "buddhism",
        icon: "🌙",
      },
      {
        text: "The isolation of pure consciousness from all material entanglement.",
        school: "samkhya",
        icon: "⭐",
      },
      {
        text: "Ascending to Siddhaśilā— the soul in infinite knowledge and bliss.",
        school: "jainism",
        icon: "🏔️",
      },
    ],
  },
  {
    id: 9,
    question: "What role does meditation or inner practice play for you?",
    emoji: "🧘",
    options: [
      {
        text: "It is everything — the restraint of the mind IS the path.",
        school: "yoga",
        icon: "🌊",
      },
      {
        text: "It is the primary vehicle for developing wisdom and compassion.",
        school: "buddhism",
        icon: "🪷",
      },
      {
        text: "Self-reflection helps — but rituals and duty are equally essential.",
        school: "mimamsa",
        icon: "🕯️",
      },
      {
        text: "Less useful than direct inquiry and logical analysis (Tarka).",
        school: "nyaya",
        icon: "⚖️",
      },
    ],
  },
  {
    id: 10,
    question: "Which statement resonates most deeply with your worldview?",
    emoji: "💬",
    options: [
      {
        text: '"Be a lamp unto yourself. Seek truth through experience."',
        school: "buddhism",
        icon: "🪔",
      },
      {
        text: '"Tat Tvam Asi — That Thou Art. You are what you seek."',
        school: "vedanta",
        icon: "🔱",
      },
      {
        text: '"Live harmoniously with all beings. Life is sacred."',
        school: "jainism",
        icon: "🕊️",
      },
      {
        text: '"Yogaś citta-vṛtti-nirodhaḥ — Yoga is the stilling of the mind."',
        school: "yoga",
        icon: "🌿",
      },
    ],
  },
];

// ─── School Results Data ──────────────────────────────────────────────────────
const schoolResults = {
  vedanta: {
    name: "Vedānta",
    sanskrit: "वेदान्त",
    tagline: "You see the Unity behind all of Existence",
    description:
      "You are a Vedāntist at heart. You sense that behind the ceaseless variety of the world, there is one infinite, undivided consciousness — Brahman. You experience life as an exploration of the ultimate mystery: 'Who am I, really?' You are drawn to the idea that the separation between 'you' and the 'universe' is a beautiful illusion, and that recognizing this non-duality is the highest form of freedom.",
    traits: [
      "Non-dual thinker",
      "Mystically inclined",
      "Seeks unity in diversity",
      "Philosophically deep",
    ],
    philosopher: "Ādi Śaṅkarācārya",
    liberationConcept: "Mokṣa — Recognition of Ātman = Brahman",
    keyText: "Vivekacūḍāmaṇi",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    bg: "from-orange-950/30 to-amber-950/20",
    accent: "orange",
    path: "/schools/vedanta",
    accentClass: "text-orange-500",
    borderClass: "border-orange-500/30",
    bgClass: "bg-orange-500/10",
    glow: "shadow-[0_0_80px_rgba(249,115,22,0.25)]",
  },
  buddhism: {
    name: "Buddhism",
    sanskrit: "बौद्ध दर्शन",
    tagline: "You walk the Middle Way with Compassion",
    description:
      "You are a Buddhist philosopher. You see the world clearly — its impermanence, its suffering, and the beautiful possibility of its transcendence. You are deeply analytical yet compassionate, understanding that all suffering arises from clinging to what is inherently unstable. You believe in practical ethics over dogma, and your path is one of mindful presence, wisdom (Prajñā), and compassion (Karuṇā).",
    traits: [
      "Compassionate",
      "Analytically sharp",
      "Present-moment aware",
      "Ethically rigorous",
    ],
    philosopher: "Siddhārtha Gautama (The Buddha)",
    liberationConcept: "Nirvāṇa — Extinguishing of craving",
    keyText: "Dhammapada",
    gradient: "from-amber-500 via-yellow-400 to-white",
    bg: "from-amber-950/30 to-yellow-950/20",
    accent: "amber",
    path: "/schools/buddhism",
    accentClass: "text-amber-500",
    borderClass: "border-amber-500/30",
    bgClass: "bg-amber-500/10",
    glow: "shadow-[0_0_80px_rgba(245,158,11,0.25)]",
  },
  jainism: {
    name: "Jainism",
    sanskrit: "जैन दर्शन",
    tagline: "You hold a Compassion that knows no Bounds",
    description:
      "You are a Jain philosopher — deeply ethical, radically non-violent, and philosophically sophisticated. Your worldview recognizes that truth is multi-faceted (Anekāntavāda), and that true wisdom means acknowledging the limits of any single perspective. You hold life as absolutely sacred and believe the highest form of intelligence is the ability to live without causing harm to any sentient being.",
    traits: [
      "Deeply ethical",
      "Multi-perspectival",
      "Non-violent",
      "Disciplined",
    ],
    philosopher: "Vardhamāna Mahāvīra",
    liberationConcept: "Mokṣa — Ascent to Siddhaśilā",
    keyText: "Tattvārtha Sūtra",
    gradient: "from-emerald-500 via-green-400 to-teal-400",
    bg: "from-emerald-950/30 to-teal-950/20",
    accent: "emerald",
    path: "/schools/jainism",
    accentClass: "text-emerald-500",
    borderClass: "border-emerald-500/30",
    bgClass: "bg-emerald-500/10",
    glow: "shadow-[0_0_80px_rgba(16,185,129,0.25)]",
  },
  yoga: {
    name: "Yoga",
    sanskrit: "योग दर्शन",
    tagline: "You seek Freedom through the Stilling of the Mind",
    description:
      "You are a Yoga philosopher in the tradition of Patañjali. You understand that the root of all suffering is the uncontrolled fluctuation of the mind (Citta-vṛtti), and that freedom comes not from external achievement, but from mastering the instrument of perception itself. You are disciplined, introspective, and deeply committed to the practical work of inner transformation.",
    traits: [
      "Self-disciplined",
      "Deeply introspective",
      "Practical mystic",
      "Inner-focused",
    ],
    philosopher: "Sage Patañjali",
    liberationConcept: "Kaivalya — Isolation of pure consciousness",
    keyText: "Yoga Sūtras of Patañjali",
    gradient: "from-emerald-600 via-teal-500 to-cyan-400",
    bg: "from-emerald-950/30 to-cyan-950/20",
    accent: "teal",
    path: "/schools/yoga",
    accentClass: "text-teal-400",
    borderClass: "border-teal-500/30",
    bgClass: "bg-teal-500/10",
    glow: "shadow-[0_0_80px_rgba(20,184,166,0.25)]",
  },
  nyaya: {
    name: "Nyāya",
    sanskrit: "न्याय",
    tagline: "You illuminate Truth through Rigorous Reasoning",
    description:
      "You are a Nyāyika — a master of logical inquiry. You believe that the world is real and knowable, and that the key to liberation is replacing false knowledge with true understanding. You do not settle for vague intuition; you demand valid proofs, clear definitions, and sound arguments. Your mind is a finely-tuned instrument for separating truth from illusion.",
    traits: [
      "Logically rigorous",
      "Reality-affirming",
      "Analytically precise",
      "Truth-seeking",
    ],
    philosopher: "Sage Gautama",
    liberationConcept:
      "Apavarga — Cessation of all pain through true knowledge",
    keyText: "Nyāya Sūtras",
    gradient: "from-teal-500 via-cyan-400 to-blue-400",
    bg: "from-teal-950/30 to-blue-950/20",
    accent: "teal",
    path: "/schools/nyaya",
    accentClass: "text-teal-400",
    borderClass: "border-teal-500/30",
    bgClass: "bg-teal-500/10",
    glow: "shadow-[0_0_80px_rgba(20,184,166,0.25)]",
  },
  vaisesika: {
    name: "Vaiśeṣika",
    sanskrit: "वैशेषिक",
    tagline: "You map the Universe with Scientific Precision",
    description:
      "You are a Vaiśeṣika — the scientist-philosopher of ancient India. You seek to understand reality by categorizing its fundamental building blocks: atoms, qualities, and their interactions. You are empirical, systematic, and believe that a complete map of reality is the most powerful tool for liberation. You were asking questions about the nature of matter thousands of years before modern physics.",
    traits: [
      "Systematic thinker",
      "Empirically inclined",
      "Reality-mapper",
      "Categorically precise",
    ],
    philosopher: "Sage Kaṇāda",
    liberationConcept:
      "Nihśreyasa — Cessation through true knowledge of reality",
    keyText: "Vaiśeṣika Sūtras",
    gradient: "from-purple-500 via-indigo-500 to-blue-500",
    bg: "from-purple-950/30 to-indigo-950/20",
    accent: "purple",
    path: "/schools/vaisesika",
    accentClass: "text-purple-400",
    borderClass: "border-purple-500/30",
    bgClass: "bg-purple-500/10",
    glow: "shadow-[0_0_80px_rgba(168,85,247,0.25)]",
  },
  samkhya: {
    name: "Sāṃkhya",
    sanskrit: "सांख्य",
    tagline: "You see the Dance of Consciousness and Matter",
    description:
      "You are a Sāṃkhya thinker — one of the most ancient and systematic philosophers. You see reality as a grand interplay between pure, inactive consciousness (Puruṣa) and dynamic, creative nature (Prakṛti). You are a radical dualist who believes liberation comes from the absolute, clear discrimination between 'I' (the witnessing self) and 'not-I' (everything the body and mind do).",
    traits: [
      "Systematic analyst",
      "Dualist thinker",
      "Introspective discriminator",
      "Metaphysically precise",
    ],
    philosopher: "Sage Kapila",
    liberationConcept: "Kaivalya — Isolation of Puruṣa from Prakṛti",
    keyText: "Sāṃkhya Kārikā",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    bg: "from-blue-950/30 to-violet-950/20",
    accent: "blue",
    path: "/schools/samkhya",
    accentClass: "text-blue-400",
    borderClass: "border-blue-500/30",
    bgClass: "bg-blue-500/10",
    glow: "shadow-[0_0_80px_rgba(59,130,246,0.25)]",
  },
  mimamsa: {
    name: "Mīmāṃsā",
    sanskrit: "मीमांसा",
    tagline: "You uphold the Sacred Order through Righteous Action",
    description:
      "You are a Mīmāṃsaka — a guardian of cosmic order. You believe deeply in the power of correct action (Dharma) and that the Vedic texts contain eternal truths about how to live in harmony with the universe. You are someone for whom duty, ritual, and integrity are not mere formalities, but the very substance of a meaningful life. You act precisely because it is right, not for personal reward.",
    traits: [
      "Duty-bound",
      "Action-oriented",
      "Vedic authority-respecting",
      "Ritually precise",
    ],
    philosopher: "Sage Jaimini",
    liberationConcept: "Niḥśreyasa — Through desireless ritual action",
    keyText: "Mīmāṃsā Sūtras",
    gradient: "from-red-500 via-orange-500 to-amber-500",
    bg: "from-red-950/30 to-orange-950/20",
    accent: "red",
    path: "/schools/mimamsa",
    accentClass: "text-red-400",
    borderClass: "border-red-500/30",
    bgClass: "bg-red-500/10",
    glow: "shadow-[0_0_80px_rgba(239,68,68,0.25)]",
  },
  carvaka: {
    name: "Cārvāka",
    sanskrit: "चार्वाक",
    tagline: "You embrace the Beauty of the Present Moment",
    description:
      "You are a Cārvāka — the fearless, joyful materialist of Indian philosophy. You reject the invisible and unknowable and embrace what is directly perceivable, tangible, and real. You believe consciousness is a miraculous emergence of matter, and that the only authentic meaning of life is to live it fully, ethically, and with great joy. You are a philosopher of life, not of escape from it.",
    traits: [
      "Empiricist",
      "Present-moment celebrant",
      "Anti-dogmatic",
      "Joyfully grounded",
    ],
    philosopher: "Bṛhaspati",
    liberationConcept: "Death is the natural, joyful end — live fully now",
    keyText: "Sarvasiddhānta Saṃgraha",
    gradient: "from-rose-500 via-pink-500 to-orange-400",
    bg: "from-rose-950/30 to-orange-950/20",
    accent: "rose",
    path: "/schools/carvaka",
    accentClass: "text-rose-400",
    borderClass: "border-rose-500/30",
    bgClass: "bg-rose-500/10",
    glow: "shadow-[0_0_80px_rgba(244,63,94,0.25)]",
  },
};

// ─── Scoring Engine ───────────────────────────────────────────────────────────
const computeResult = (answers) => {
  const scores = {};
  Object.keys(schoolResults).forEach((k) => (scores[k] = 0));
  answers.forEach((schoolKey) => {
    if (schoolKey) scores[schoolKey] += 1;
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
};

// ─── Component ────────────────────────────────────────────────────────────────
const PhilosophyQuiz = () => {
  const [phase, setPhase] = useState("intro"); // intro | quiz | result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        dur: Math.random() * 10 + 8,
        delay: Math.random() * 8,
      })),
    );
  }, []);

  const handleSelect = (schoolKey) => {
    if (selected !== null) return;
    setSelected(schoolKey);
    const newAnswers = [...answers];
    newAnswers[currentQ] = schoolKey;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selected === null) return;
    if (currentQ < questions.length - 1) {
      setCurrentQ((p) => p + 1);
      setSelected(answers[currentQ + 1]);
    } else {
      const winner = computeResult(answers);
      setResult(winner);
      setPhase("result");
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ((p) => p - 1);
      setSelected(answers[currentQ - 1]);
    } else {
      setPhase("intro");
    }
  };

  const handleRestart = () => {
    setPhase("intro");
    setCurrentQ(0);
    setAnswers(Array(questions.length).fill(null));
    setSelected(null);
    setResult(null);
  };

  const progress = ((currentQ + (selected ? 1 : 0)) / questions.length) * 100;
  const q = questions[currentQ];
  const res = result ? schoolResults[result] : null;

  return (
    <div className="min-h-screen bg-[#f8f5ff] dark:bg-[#06050f] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans relative overflow-hidden">
      <ScrollToTop />

      {/* Ambient particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-violet-500/10 dark:bg-violet-400/10"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{ y: [0, -40, 0], opacity: [0, 0.6, 0] }}
            transition={{
              duration: p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {/* ── INTRO PHASE ─────────────────────────────── */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -30 }}
              className="min-h-screen flex flex-col items-center justify-center px-6 text-center py-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-8 flex justify-center">
                  <div className="relative">
                    <motion.div
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_60px_rgba(139,92,246,0.5)]"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <span className="text-5xl">🧿</span>
                    </motion.div>
                    <motion.div
                      className="absolute -inset-3 rounded-full border border-violet-500/20"
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -inset-6 rounded-full border border-violet-500/10"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                </div>

                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block px-5 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300 text-sm font-bold tracking-[0.3em] uppercase mb-6"
                >
                  Philosophical Self-Discovery
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-serif text-slate-900 dark:text-white mb-6 leading-tight"
                >
                  Which School
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 dark:from-violet-400 dark:via-indigo-400 dark:to-purple-400">
                    Are You?
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8"
                >
                  10 questions. Thousands of years of wisdom. Discover which
                  ancient Indian philosophical school resonates with the way you
                  see the world.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex flex-wrap justify-center gap-3 mb-12 max-w-2xl mx-auto"
                >
                  {[
                    "Vedānta",
                    "Buddhism",
                    "Yoga",
                    "Nyāya",
                    "Jainism",
                    "Sāṃkhya",
                    "Vaiśeṣika",
                    "Mīmāṃsā",
                    "Cārvāka",
                  ].map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium backdrop-blur-sm"
                    >
                      {s}
                    </span>
                  ))}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(139,92,246,0.4)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPhase("quiz")}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold px-10 py-5 rounded-full text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all"
                >
                  <SparklesIcon className="w-5 h-5" />
                  Begin the Journey
                  <ArrowRightIcon className="w-5 h-5" />
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8"
                >
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors text-sm"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Explore
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {/* ── QUIZ PHASE ──────────────────────────────── */}
          {phase === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
            >
              <div className="w-full max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-mono text-violet-600 dark:text-violet-400 tracking-widest">
                      QUESTION {currentQ + 1} / {questions.length}
                    </span>
                    <span className="text-sm text-slate-500">
                      {Math.round(progress)}% complete
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  {/* Dot indicators */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {questions.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`rounded-full transition-all duration-300 ${i === currentQ ? "w-5 h-2 bg-violet-500" : answers[i] ? "w-2 h-2 bg-violet-400/60" : "w-2 h-2 bg-slate-300 dark:bg-slate-700"}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Card */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-2xl p-8 md:p-12 mb-6">
                      <div className="text-5xl mb-6 text-center">{q.emoji}</div>
                      <h2 className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-white text-center leading-snug mb-10">
                        {q.question}
                      </h2>

                      <div className="grid md:grid-cols-2 gap-4">
                        {q.options.map((opt, i) => {
                          const isSelected = selected === opt.school;
                          const isOther =
                            selected !== null && selected !== opt.school;
                          return (
                            <motion.button
                              key={i}
                              onClick={() => handleSelect(opt.school)}
                              disabled={selected !== null}
                              whileHover={
                                selected === null ? { scale: 1.02, y: -2 } : {}
                              }
                              whileTap={
                                selected === null ? { scale: 0.98 } : {}
                              }
                              className={`relative w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group overflow-hidden
                                ${
                                  isSelected
                                    ? "border-violet-500 bg-violet-50 dark:bg-violet-500/15 shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                                    : isOther
                                      ? "border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 opacity-50"
                                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-violet-400 dark:hover:border-violet-500/50 hover:bg-violet-50/50 dark:hover:bg-violet-500/5 cursor-pointer"
                                }`}
                            >
                              {/* Selection glow */}
                              {isSelected && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-2xl pointer-events-none"
                                />
                              )}
                              <div className="flex items-start gap-4 relative z-10">
                                <span
                                  className={`text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-colors
                                  ${isSelected ? "bg-violet-100 dark:bg-violet-500/20" : "bg-slate-100 dark:bg-slate-800"}`}
                                >
                                  {opt.icon}
                                </span>
                                <p
                                  className={`text-sm md:text-base leading-relaxed pt-1 font-medium transition-colors
                                  ${isSelected ? "text-violet-800 dark:text-violet-200" : "text-slate-700 dark:text-slate-300"}`}
                                >
                                  {opt.text}
                                </p>
                              </div>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 400,
                                  }}
                                  className="absolute top-3 right-3 w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
                                >
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-violet-400 transition-all text-sm font-medium"
                      >
                        <ArrowLeftIcon className="w-4 h-4" />
                        {currentQ === 0 ? "Intro" : "Previous"}
                      </motion.button>

                      <AnimatePresence>
                        {selected !== null && (
                          <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            whileHover={{
                              scale: 1.05,
                              boxShadow: "0 0 30px rgba(139,92,246,0.4)",
                            }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleNext}
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold shadow-lg transition-all text-sm"
                          >
                            {currentQ === questions.length - 1 ? (
                              <>
                                <SparklesIcon className="w-4 h-4" />
                                Reveal My Path
                              </>
                            ) : (
                              <>
                                Next
                                <ArrowRightIcon className="w-4 h-4" />
                              </>
                            )}
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {/* ── RESULT PHASE ────────────────────────────── */}
          {phase === "result" && res && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
            >
              <div className="w-full max-w-3xl mx-auto">
                {/* Celebration burst */}
                <motion.div
                  className="fixed inset-0 pointer-events-none z-20 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                >
                  {[...Array(16)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${res.gradient}`}
                      initial={{ scale: 0, x: 0, y: 0 }}
                      animate={{
                        scale: [0, 1, 0],
                        x: Math.cos((i / 16) * Math.PI * 2) * 200,
                        y: Math.sin((i / 16) * Math.PI * 2) * 200,
                      }}
                      transition={{ duration: 1.2, delay: 0.1 * i }}
                    />
                  ))}
                </motion.div>

                {/* Result Hero */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <div className="text-center mb-10">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-sm font-mono tracking-[0.4em] text-violet-600 dark:text-violet-400 uppercase mb-4"
                    >
                      Your Philosophy Revealed
                    </motion.p>

                    <motion.div
                      className="relative inline-block mb-8"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        delay: 0.3,
                      }}
                    >
                      <div
                        className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${res.gradient} flex items-center justify-center ${res.glow}`}
                      >
                        <span className="text-6xl font-serif text-white">
                          {res.sanskrit.charAt(0)}
                        </span>
                      </div>
                      <motion.div
                        className="absolute -inset-3 rounded-full border border-current opacity-20"
                        style={{ borderColor: `var(--${res.accent}-400)` }}
                        animate={{
                          scale: [1, 1.15, 1],
                          opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white mb-3"
                    >
                      {res.name}
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.65 }}
                      className={`text-xl md:text-2xl font-light italic ${res.accentClass} mb-2`}
                    >
                      {res.sanskrit}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.75 }}
                      className="text-xl md:text-2xl font-serif text-slate-700 dark:text-slate-300"
                    >
                      You {res.tagline}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className={`bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-[28px] border border-slate-200 dark:border-slate-800 ${res.glow} shadow-2xl overflow-hidden mb-6`}
                >
                  {/* Top gradient bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${res.gradient}`}
                  />

                  <div className="p-8 md:p-10">
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 font-light">
                      {res.description}
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      {/* Traits */}
                      <div>
                        <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500 mb-4">
                          Your Traits
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {res.traits.map((t, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 1 + i * 0.1 }}
                              className={`px-3 py-1.5 rounded-full text-sm font-medium ${res.bgClass} ${res.accentClass} border ${res.borderClass}`}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* Key Info */}
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500 mb-1">
                            Founder
                          </h4>
                          <p className="text-slate-800 dark:text-slate-200 font-serif text-sm">
                            {res.philosopher}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500 mb-1">
                            Liberation
                          </h4>
                          <p className="text-slate-800 dark:text-slate-200 font-serif text-sm">
                            {res.liberationConcept}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500 mb-1">
                            Key Text
                          </h4>
                          <p
                            className={`${res.accentClass} font-serif text-sm`}
                          >
                            {res.keyText}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to={res.path}
                        className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r ${res.gradient} text-white font-bold px-6 py-4 rounded-full hover:opacity-90 transition-all shadow-lg text-sm`}
                      >
                        <SparklesIcon className="w-4 h-4" />
                        Explore {res.name} in Depth
                      </Link>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRestart}
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-medium px-6 py-4 rounded-full hover:border-violet-400 transition-all text-sm"
                      >
                        ↺ Retake the Quiz
                      </motion.button>
                    </div>
                  </div>
                </motion.div>

                {/* Score Breakdown */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6"
                >
                  <h4 className="text-xs font-mono tracking-[0.3em] uppercase text-slate-500 mb-4">
                    Your Philosophical Resonance
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(
                      answers.reduce((acc, s) => {
                        if (s) acc[s] = (acc[s] || 0) + 1;
                        return acc;
                      }, {}),
                    )
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([school, count], i) => {
                        const s = schoolResults[school];
                        return (
                          <div key={school} className="flex items-center gap-3">
                            <span className="text-xs text-slate-500 w-4">
                              {i + 1}.
                            </span>
                            <span
                              className={`text-sm font-medium w-24 flex-shrink-0 ${s.accentClass}`}
                            >
                              {s.name}
                            </span>
                            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full bg-gradient-to-r ${s.gradient} rounded-full`}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(count / questions.length) * 100}%`,
                                }}
                                transition={{
                                  delay: 1.2 + i * 0.1,
                                  duration: 0.6,
                                }}
                              />
                            </div>
                            <span className="text-xs text-slate-400 w-8 text-right">
                              {count}/{questions.length}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-center"
                >
                  <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors text-sm"
                  >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Explore
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhilosophyQuiz;

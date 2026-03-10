import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookOpenIcon,
  ChevronRightIcon,
  FireIcon,
  HeartIcon,
  ScaleIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import gitaHeroImg from "../Schools-images/gita_hero.png";
import AskKrishnaWidget from "./AskKrishnaWidget";
import SemanticSearch from "./SemanticSearch";
import SEO from "../../components/SEO";

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  GITA VERSES DATA                                                          */
/* ═══════════════════════════════════════════════════════════════════════════ */
const GITA_VERSES = [
  {
    ref: "2.47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
    roman: "Karmaṇy-evādhikāras te mā phaleṣu kadācana",
    translation: "You have a right to action alone, never to its fruits.",
    meaning:
      "Perform your duty with dedication, but relinquish all attachment to the outcome. This is the essence of Karma Yoga.",
    theme: "Karma Yoga",
    accent: "#f59e0b",
  },
  {
    ref: "4.7–8",
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत",
    roman: "Yadā yadā hi dharmasya glānir bhavati Bhārata",
    translation:
      "Whenever righteousness declines and unrighteousness rises, I manifest Myself.",
    meaning:
      "To protect the good, destroy evil, and re-establish dharma — age after age, the Divine descends.",
    theme: "Avatāra",
    accent: "#ef4444",
  },
  {
    ref: "9.22",
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते",
    roman: "Ananyāś cintayanto māṁ ye janāḥ paryupāsate",
    translation:
      "Those who worship Me with undivided attention — I carry what they lack and preserve what they have.",
    meaning:
      "Complete surrender and single-pointed devotion invite divine grace that sustains and protects.",
    theme: "Bhakti",
    accent: "#ec4899",
  },
  {
    ref: "2.14",
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः",
    roman: "Mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ",
    translation:
      "The contacts of the senses with their objects bring cold, heat, pleasure, and pain. They come and go — endure them bravely.",
    meaning:
      "All experiences are transient. Equanimity in pleasure and pain is the mark of a wise person.",
    theme: "Equanimity",
    accent: "#8b5cf6",
  },
  {
    ref: "2.20",
    sanskrit: "न जायते म्रियते वा कदाचित्",
    roman: "Na jāyate mriyate vā kadācit",
    translation:
      "The Self is never born, nor does it ever die. It is eternal, undying, and primeval.",
    meaning:
      "The Ātman transcends birth and death. Understanding this frees one from the deepest fear.",
    theme: "The Self",
    accent: "#6366f1",
  },
  {
    ref: "18.66",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज",
    roman: "Sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja",
    translation:
      "Abandon all varieties of dharma and simply surrender unto Me. I shall deliver you from all sins — do not grieve.",
    meaning:
      "The ultimate teaching: total surrender to the Divine releases one from all bondage and sorrow.",
    theme: "Surrender",
    accent: "#10b981",
  },
];

const getTodayVerseIdx = () => {
  const now = new Date();
  return (
    Math.floor(
      (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 864e5,
    ) % GITA_VERSES.length
  );
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  ANIMATION                                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  DATA                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
const allChapters = [
  {
    num: 1,
    title: "Arjuna Viṣāda Yoga",
    desc: "Arjuna's despair on the battlefield — the catalyst for divine wisdom.",
    verses: 47,
  },
  {
    num: 2,
    title: "Sāṅkhya Yoga",
    desc: "The immortal Self, the path of wisdom, and steadfast intelligence.",
    verses: 72,
  },
  {
    num: 3,
    title: "Karma Yoga",
    desc: "Selfless action — work without attachment fulfills dharma.",
    verses: 43,
  },
  {
    num: 4,
    title: "Jñāna Karma Sannyāsa",
    desc: "Knowledge and renunciation of action — the fire of wisdom burns all karma.",
    verses: 42,
  },
  {
    num: 5,
    title: "Karma Sannyāsa Yoga",
    desc: "Renunciation through action — both paths lead to freedom.",
    verses: 29,
  },
  {
    num: 6,
    title: "Dhyāna Yoga",
    desc: "Meditation, equanimity, and disciplining the restless mind.",
    verses: 47,
  },
  {
    num: 7,
    title: "Jñāna Vijñāna Yoga",
    desc: "Knowledge of the absolute and the manifest — all threads lead back to Me.",
    verses: 30,
  },
  {
    num: 8,
    title: "Akṣara Brahma Yoga",
    desc: "The imperishable Brahman and departure at the hour of death.",
    verses: 28,
  },
  {
    num: 9,
    title: "Rāja Vidyā Rāja Guhya",
    desc: "The sovereign secret — supreme knowledge, direct and joyful.",
    verses: 34,
  },
  {
    num: 10,
    title: "Vibhūti Yoga",
    desc: "Divine manifestations — I am the best of everything that exists.",
    verses: 42,
  },
  {
    num: 11,
    title: "Viśvarūpa Darśana",
    desc: "The cosmic form — Arjuna sees the infinite, awe-inspiring vision.",
    verses: 55,
  },
  {
    num: 12,
    title: "Bhakti Yoga",
    desc: "Devotion — the sweetest, most accessible path to the Divine.",
    verses: 20,
  },
  {
    num: 13,
    title: "Kṣetra Kṣetrajña Vibhāga",
    desc: "The field and the knower — body, Self, and their distinction.",
    verses: 35,
  },
  {
    num: 14,
    title: "Guṇatraya Vibhāga",
    desc: "The three guṇas — sattva, rajas, tamas — and going beyond them.",
    verses: 27,
  },
  {
    num: 15,
    title: "Puruṣottama Yoga",
    desc: "The supreme person — the tree of saṁsāra and liberation from it.",
    verses: 20,
  },
  {
    num: 16,
    title: "Daivāsura Sampad",
    desc: "Divine and demonic qualities — what leads to freedom vs. bondage.",
    verses: 24,
  },
  {
    num: 17,
    title: "Śraddhātraya Vibhāga",
    desc: "Three kinds of faith — sāttvic, rājasic, and tāmasic.",
    verses: 28,
  },
  {
    num: 18,
    title: "Mokṣa Sannyāsa Yoga",
    desc: "Renunciation and liberation — the grand synthesis and final counsel.",
    verses: 78,
  },
];

const themes = [
  {
    Icon: BookOpenIcon,
    title: "Jñāna",
    subtitle: "Wisdom",
    desc: "Discrimination between the eternal Self and the changing world illumines the path.",
    accent: "#6366f1",
  },
  {
    Icon: FireIcon,
    title: "Karma",
    subtitle: "Action",
    desc: "Act with excellence, offer outcomes without ego — duty fulfilled becomes sacred.",
    accent: "#f59e0b",
  },
  {
    Icon: HeartIcon,
    title: "Bhakti",
    subtitle: "Devotion",
    desc: "Surrender with love and trust — see the Divine in all beings and serve as worship.",
    accent: "#ec4899",
  },
  {
    Icon: ScaleIcon,
    title: "Dharma",
    subtitle: "Duty",
    desc: "Your unique nature determines your path — fulfilling svadharma is the way to freedom.",
    accent: "#10b981",
  },
  {
    Icon: EyeIcon,
    title: "Yoga",
    subtitle: "Equanimity",
    desc: "Steadiness amidst all dualities — success and failure, praise and blame.",
    accent: "#8b5cf6",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PAGE                                                                      */
/* ═══════════════════════════════════════════════════════════════════════════ */
const Gita = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedChapters = showAll ? allChapters : allChapters.slice(0, 6);

  // Verse of the Day state
  const todayVerseIdx = getTodayVerseIdx();
  const [verseIdx, setVerseIdx] = useState(todayVerseIdx);
  const [verseDir, setVerseDir] = useState(0);
  const verse = GITA_VERSES[verseIdx];
  const navVerse = (d) => {
    setVerseDir(d);
    setVerseIdx((p) => (p + d + GITA_VERSES.length) % GITA_VERSES.length);
  };

  return (
    <div className="bg-[#FAFAF8] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 min-h-screen">
      <SEO
        title="The Bhagavad Gītā"
        description="Experience the Bhagavad Gītā like never before. Explore ancient wisdom, divine translations, and a beautifully crafted AI spiritual guide."
      />
      {/* ═══════════ 1. HERO (IMPRESSIVE SCALE + KRISHNA/ARJUNA IMAGE) ═══════════ */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-end md:items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={gitaHeroImg}
            alt="Sri Krishna and Arjuna on the Chariot"
            className="w-full h-full object-cover object-[center_20%] md:object-center transform scale-[1.02]"
            loading="eager"
          />
          {/* Light mode: soft warm wash — Dark mode: deep cinematic */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDF8F0] via-[#FDF8F0]/70 via-40% to-[#FDF8F0]/40 dark:from-[#0c0906] dark:via-[#0c0906]/70 dark:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDF8F0]/50 via-transparent to-[#FDF8F0]/50 dark:from-black/40 dark:via-transparent dark:to-black/40 md:dark:from-black/60 md:dark:to-black/60" />

          {/* Subtle slow pulsing glowing orb behind text */}
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-amber-400/10 dark:bg-amber-500/20 rounded-full blur-[100px] md:blur-[120px] pointer-events-none"
          />
        </div>

        <motion.div
          className="relative z-10 w-full px-5 md:px-6 pt-16 pb-20 md:pt-24 md:pb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm md:text-base font-mono tracking-[0.8em] uppercase text-amber-700 dark:text-amber-400 mb-8 drop-shadow-2xl font-semibold">
            ✦ श्रीमद्भगवद्गीता ✦
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] font-serif tracking-tighter leading-[0.9] mb-8 text-slate-900 dark:text-white drop-shadow-2xl">
            Bhagavad <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-amber-600 via-orange-500 to-amber-700 dark:from-amber-200 dark:via-orange-300 dark:to-amber-600">
              Gītā
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-200/90 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg mb-14">
            The Song of the Divine — 700 verses of timeless counsel on duty,
            devotion, and discernment, revealed on the battlefield of life.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link
              to="/gita/chapters"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-bold px-10 py-5 rounded-full text-base hover:shadow-[0_0_50px_rgba(245,158,11,0.6)] transition-all transform hover:-translate-y-1"
            >
              <BookOpenIcon className="w-6 h-6" /> Explore Chapters
            </Link>
            <a
              href="#today"
              className="inline-flex items-center justify-center gap-3 border border-slate-400 dark:border-white/30 bg-slate-100/60 dark:bg-white/5 text-slate-800 dark:text-white font-bold px-10 py-5 rounded-full text-base hover:bg-slate-200/80 dark:hover:bg-white/15 backdrop-blur-xl transition-all"
            >
              Today's Wisdom <ChevronRightIcon className="w-5 h-5" />
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-slate-400 dark:text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-mono mb-3">
            Descend
          </span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-slate-400 dark:from-white/40 to-transparent"></div>
        </motion.div>
      </section>

      {/* ═══════════ 2. TODAY'S VERSE (SutraWidget replaces "Selected Verses") ═══════════ */}
      <section
        id="today"
        className="py-32 sm:py-48 bg-[#FAFAF8] dark:bg-slate-950 relative overflow-hidden"
      >
        {/* Decorative giant watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-serif text-slate-900/[0.02] dark:text-white/[0.01] pointer-events-none select-none whitespace-nowrap leading-none">
          ॐ
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <motion.div
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <p className="text-sm font-mono tracking-[0.5em] uppercase text-amber-600 dark:text-amber-500 mb-4 font-semibold">
              Daily Contemplation
            </p>
            <h2 className="text-5xl md:text-6xl font-serif text-slate-900 dark:text-white tracking-tight">
              Verse of the Day
            </h2>
            <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mt-8" />
          </motion.div>

          {/* Gita-specific Verse Carousel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto"
          >
            <div className="relative rounded-[28px] overflow-hidden shadow-2xl">
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(to right, ${verse.accent}, ${verse.accent}60)`,
                }}
              />
              <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl border-x border-b border-slate-100 dark:border-slate-800 px-6 md:px-12 py-12 rounded-b-[28px] relative overflow-hidden">
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${verse.accent}0d 0%, transparent 65%)`,
                  }}
                />
                <div className="flex justify-center mb-6 relative z-10">
                  <span
                    className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border"
                    style={{
                      color: verse.accent,
                      borderColor: verse.accent + "50",
                      backgroundColor: verse.accent + "12",
                    }}
                  >
                    {verse.theme} · Gītā {verse.ref}
                  </span>
                </div>
                <AnimatePresence mode="wait" custom={verseDir}>
                  <motion.div
                    key={verseIdx}
                    initial={{ opacity: 0, x: verseDir > 0 ? 60 : -60 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                    }}
                    exit={{
                      opacity: 0,
                      x: verseDir > 0 ? -40 : 40,
                      transition: { duration: 0.25 },
                    }}
                    className="text-center relative z-10"
                  >
                    <p
                      className="font-serif text-3xl md:text-5xl text-slate-900 dark:text-white leading-relaxed mb-5"
                      style={{ textShadow: `0 0 50px ${verse.accent}25` }}
                    >
                      {verse.sanskrit}
                    </p>
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div
                        className="h-px w-14"
                        style={{
                          background: `linear-gradient(to right, transparent, ${verse.accent}70)`,
                        }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: verse.accent }}
                      />
                      <div
                        className="h-px w-14"
                        style={{
                          background: `linear-gradient(to left, transparent, ${verse.accent}70)`,
                        }}
                      />
                    </div>
                    <p
                      className="font-serif italic text-lg mb-3"
                      style={{ color: verse.accent }}
                    >
                      {verse.roman}
                    </p>
                    <p className="text-lg md:text-2xl font-serif text-slate-800 dark:text-slate-100 mb-5">
                      "{verse.translation}"
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                      {verse.meaning}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => navVerse(-1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-sm transition-all shadow-sm"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" /> Prev
              </button>
              <div className="flex items-center gap-1.5">
                {GITA_VERSES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setVerseDir(i > verseIdx ? 1 : -1);
                      setVerseIdx(i);
                    }}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === verseIdx ? 18 : 7,
                      height: 7,
                      background:
                        i === verseIdx
                          ? verse.accent
                          : i === todayVerseIdx
                            ? verse.accent + "55"
                            : "#cbd5e1",
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() => navVerse(1)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 text-sm transition-all shadow-sm"
              >
                Next <ArrowRightIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3. ESSENCE ═══════════ */}
      <section className="py-32 sm:py-48 bg-white dark:bg-[#0a0f18] border-y border-slate-100 dark:border-slate-800/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="grid lg:grid-cols-12 gap-20 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            {/* Massive text block taking 5 columns */}
            <motion.div variants={cardAnim} className="lg:col-span-5 order-1">
              <p className="text-sm font-mono tracking-[0.5em] uppercase text-amber-600 dark:text-amber-500 mb-6 font-bold">
                The Core Philosophy
              </p>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white leading-[1.1] mb-10 tracking-tight">
                Three paths. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                  One liberation.
                </span>
              </h2>
              <div className="w-20 h-1.5 bg-amber-500 rounded-full mb-10" />
              <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed mb-8 font-light">
                The Gītā masterfully integrates the paths of{" "}
                <strong className="text-slate-900 dark:text-white font-medium">
                  Jñāna
                </strong>{" "}
                (wisdom),
                <strong className="text-slate-900 dark:text-white font-medium">
                  {" "}
                  Karma
                </strong>{" "}
                (action), and
                <strong className="text-slate-900 dark:text-white font-medium">
                  {" "}
                  Bhakti
                </strong>{" "}
                (devotion).
              </p>
              <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                It guides one to act without attachment, steady the mind, and
                see the Divine in all beings. Its counsel does not demand
                renunciation of the world, but a profound, awakened engagement
                with it.
              </p>
            </motion.div>

            {/* 5 pillars taking 7 columns */}
            <motion.div
              variants={cardAnim}
              className="lg:col-span-7 order-2 grid sm:grid-cols-2 gap-6"
            >
              {themes.map(({ Icon, title, subtitle, desc, accent }, idx) => (
                <div
                  key={title}
                  className={`flex flex-col p-8 rounded-[32px] bg-[#FAFAF8] dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all duration-500 ${idx === 4 ? "sm:col-span-2 sm:mx-auto sm:w-1/2" : ""}`}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: accent + "1a", color: accent }}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-serif text-slate-900 dark:text-white mb-2">
                    {title}
                  </h4>
                  <p className="text-sm font-mono tracking-widest text-slate-400 uppercase mb-4">
                    {subtitle}
                  </p>
                  <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ 3.5 SEMANTIC SEARCH ═══════════ */}
      <SemanticSearch />

      {/* ═══════════ 4. CHAPTERS ═══════════ */}
      <section className="py-32 sm:py-48 bg-[#FAFAF8] dark:bg-[#070b12]">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeIn}
          >
            <div>
              <p className="text-sm font-mono tracking-[0.5em] uppercase text-amber-600 dark:text-amber-500 mb-4 font-bold">
                The Journey
              </p>
              <h2 className="text-5xl md:text-6xl font-serif text-slate-900 dark:text-white tracking-tight">
                The 18 Adhyāyas
              </h2>
            </div>
            {!showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 text-lg font-bold text-amber-600 dark:text-amber-500 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                Reveal all 18 Chapters <ChevronRightIcon className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {displayedChapters.map((c) => (
                <motion.div
                  key={c.num}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={cardAnim}
                  layout
                >
                  <Link
                    to={`/gita/chapters/adhyay${c.num}`}
                    className="group block h-full"
                  >
                    <div className="h-full rounded-[32px] border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-10 hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 flex flex-col">
                      <div className="flex items-start justify-between mb-8">
                        <span className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/20 text-amber-700 dark:text-amber-400 flex items-center justify-center text-2xl font-serif shadow-inner">
                          {c.num}
                        </span>
                        <span className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-mono">
                          {c.verses} Verses
                        </span>
                      </div>
                      <h4 className="text-2xl font-semibold text-slate-900 dark:text-white leading-tight mb-4">
                        {c.title}
                      </h4>
                      <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-10 flex-grow">
                        {c.desc}
                      </p>

                      <div className="flex items-center text-sm font-bold text-amber-600 dark:text-amber-500 group-hover:translate-x-2 transition-transform duration-300">
                        Enter Chapter{" "}
                        <ArrowRightIcon className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ═══════════ 5. MASSIVE CTA ═══════════ */}
      <section className="py-32 sm:py-48 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-amber-100 to-orange-50 dark:from-amber-900/40 dark:to-orange-900/20 rounded-full flex items-center justify-center mb-10 shadow-lg">
              <SparklesIcon className="w-12 h-12 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-serif text-slate-900 dark:text-white mb-10 leading-[1.1] tracking-tight">
              Act with clarity. <br /> Offer the fruits. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                Rest in freedom.
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed font-light">
              The Gītā's path invites steadiness in action and tenderness of
              heart. Study the chapters, reflect on the verses, and bring its
              timeless wisdom into daily life.
            </p>
            <div className="flex justify-center">
              <Link
                to="/explore"
                className="inline-flex items-center gap-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold px-12 py-5 rounded-full text-lg hover:border-amber-400 dark:hover:border-amber-600 transition-all hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xl shadow-slate-900/5 dark:shadow-black/20"
              >
                Back to Explore Darśanas <ArrowRightIcon className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Floating Ask Krishna AI Widget */}
      <AskKrishnaWidget />
    </div>
  );
};

export default Gita;

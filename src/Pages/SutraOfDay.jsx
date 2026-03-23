import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ShareIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import ScrollToTop from "../Components/ScrollToTop";
import BackToPhilosophy from "../Components/BackToPhilosophy";

import { sutras } from "../data/sutras";

// ─── Determine today's sūtra by date ──────────────────────────────────────────
const getTodayIndex = () => {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  );
  return dayOfYear % sutras.length;
};

// ─── Canvas-based image generator ─────────────────────────────────────────────
const generateShareImage = async (sutra) => {
  const W = 1200,
    H = 628;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, "#0a0812");
  bgGrad.addColorStop(0.5, "#12101f");
  bgGrad.addColorStop(1, "#0a0812");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Glow orb
  const glow = ctx.createRadialGradient(
    W * 0.5,
    H * 0.5,
    0,
    W * 0.5,
    H * 0.5,
    380,
  );
  glow.addColorStop(0, sutra.accent + "22");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Grid pattern (subtle)
  ctx.strokeStyle = "rgba(255,255,255,0.03)";
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Top accent bar
  const barGrad = ctx.createLinearGradient(0, 0, W, 0);
  barGrad.addColorStop(0, "transparent");
  barGrad.addColorStop(0.3, sutra.accent);
  barGrad.addColorStop(0.7, sutra.accent);
  barGrad.addColorStop(1, "transparent");
  ctx.fillStyle = barGrad;
  ctx.fillRect(0, 0, W, 4);

  // School badge
  ctx.font = "bold 13px monospace";
  ctx.fillStyle = sutra.accent;
  ctx.letterSpacing = "0.3em";
  ctx.textAlign = "center";
  ctx.fillText(
    sutra.school.toUpperCase() + "  ·  " + sutra.category,
    W / 2,
    55,
  );

  // Sanskrit verse (large)
  ctx.font = "bold 62px serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(sutra.sanskrit, W / 2, H / 2 - 60);

  // Separator
  ctx.fillStyle = sutra.accent + "80";
  ctx.fillRect(W / 2 - 60, H / 2 - 28, 120, 2);

  // Transliteration
  ctx.font = "italic 28px serif";
  ctx.fillStyle = sutra.accent;
  ctx.textAlign = "center";
  ctx.fillText(sutra.roman, W / 2, H / 2 + 10);

  // Translation
  ctx.font = "26px sans-serif";
  ctx.fillStyle = "#e2e8f0";
  ctx.textAlign = "center";
  // Manual word-wrap
  const words = ('"' + sutra.translation + '"').split(" ");
  let line = "",
    lines = [],
    maxW = 700;
  for (const w of words) {
    const test = line + w + " ";
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line.trim());
      line = w + " ";
    } else line = test;
  }
  if (line) lines.push(line.trim());
  lines.forEach((l, i) => ctx.fillText(l, W / 2, H / 2 + 60 + i * 36));

  // Source
  ctx.font = "16px monospace";
  ctx.fillStyle = "rgba(148,163,184,0.7)";
  ctx.textAlign = "center";
  ctx.fillText(
    "— " + sutra.source + "  ·  " + sutra.philosopher,
    W / 2,
    H - 60,
  );

  // Branding
  ctx.font = "bold 14px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.textAlign = "left";
  ctx.fillText("Darshanam", 48, H - 28);

  ctx.textAlign = "right";
  ctx.fillText("darshanam.app/sutra", W - 48, H - 28);

  return canvas.toDataURL("image/png");
};

// ─── Main Component ────────────────────────────────────────────────────────────
const SutraOfDay = () => {
  const todayIdx = getTodayIndex();
  const [currentIdx, setCurrentIdx] = useState(todayIdx);
  const [direction, setDirection] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);

  const sutra = sutras[currentIdx];
  const isToday = currentIdx === todayIdx;

  const navigate = (dir) => {
    setDirection(dir);
    setCurrentIdx((prev) => (prev + dir + sutras.length) % sutras.length);
  };

  const copyText = useCallback(async () => {
    const text = `${sutra.sanskrit}\n${sutra.roman}\n\n"${sutra.translation}"\n\n${sutra.meaning}\n\n— ${sutra.source} · ${sutra.philosopher}\n[${sutra.school} Philosophy · Darshanam]`;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [sutra]);

  const downloadImage = useCallback(async () => {
    const dataUrl = await generateShareImage(sutra);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `sutra-${sutra.id}-${sutra.roman.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  }, [sutra]);

  const shareNative = useCallback(async () => {
    const text = `"${sutra.translation}"\n\n${sutra.sanskrit} — ${sutra.roman}\n\n${sutra.source} · ${sutra.school} Philosophy\n\nVia Darshanam`;
    if (navigator.share) {
      await navigator.share({ title: "Sūtra of the Day · Darshanam", text });
    } else {
      await copyText();
    }
    setShared(true);
    setTimeout(() => setShared(false), 2500);
  }, [sutra, copyText]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, scale: 0.97 }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -60 : 60,
      scale: 0.98,
      transition: { duration: 0.3 },
    }),
  };

  return (
    <div className="min-h-screen bg-[#f8f5ff] dark:bg-[#06050e] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans">
      <ScrollToTop />
      <BackToPhilosophy />

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          key={sutra.id}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px]"
          style={{ background: sutra.accent + "12" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
          initial={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:45px_45px]" />
      </div>

      {/* ── Header ── */}
      <div className="relative z-10 container mx-auto px-6 pt-20 pb-6 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-mono tracking-[0.5em] uppercase text-violet-600 dark:text-violet-400 mb-4">
            ✦ Daily Wisdom ✦
          </p>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white mb-4">
            Sūtra of the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-400">
              {" "}
              Day
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base max-w-xl mx-auto">
            A new verse from the depths of Indian philosophy — every day, a
            fresh lens on existence.
          </p>
        </motion.div>
      </div>

      {/* ── Today Badge ── */}
      <div className="relative z-10 flex justify-center mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isToday ? (
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-slate-900 border border-violet-300 dark:border-violet-500/40 text-violet-700 dark:text-violet-300 text-sm font-semibold shadow-lg">
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              Today's Sūtra
            </span>
          ) : (
            <button
              onClick={() => {
                setDirection(todayIdx > currentIdx ? 1 : -1);
                setCurrentIdx(todayIdx);
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm hover:border-violet-400 transition-all"
            >
              <SparklesIcon className="w-3.5 h-3.5" />
              Go to Today's Sūtra
            </button>
          )}
        </motion.div>
      </div>

      {/* ── Sūtra Card ── */}
      <div className="relative z-10 container mx-auto px-4 max-w-3xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={sutra.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="relative rounded-[32px] overflow-hidden shadow-2xl"
          >
            {/* Top gradient bar */}
            <div
              className={`h-1.5 w-full bg-gradient-to-r ${sutra.schoolColor}`}
            />

            {/* Card body */}
            <div className="bg-white dark:bg-slate-900/95 backdrop-blur-md border-x border-b border-slate-200 dark:border-slate-800 px-8 md:px-14 py-12 rounded-b-[32px]">
              {/* School + Category */}
              <div className="flex flex-wrap items-center gap-2 justify-center mb-8">
                <Link
                  to={sutra.schoolPath}
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border transition-colors hover:opacity-80"
                  style={{
                    color: sutra.accent,
                    borderColor: sutra.accent + "50",
                    backgroundColor: sutra.accent + "12",
                  }}
                >
                  {sutra.school}
                </Link>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="text-xs text-slate-400 font-medium">
                  {sutra.category}
                </span>
              </div>

              {/* Sanskrit verse */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mb-6"
              >
                <p
                  className="font-serif text-4xl md:text-5xl text-slate-900 dark:text-white leading-relaxed tracking-wide"
                  style={{ textShadow: `0 0 60px ${sutra.accent}30` }}
                >
                  {sutra.sanskrit}
                </p>
              </motion.div>

              {/* Divider with glow */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div
                  className="h-px flex-1 max-w-[80px]"
                  style={{
                    background: `linear-gradient(to right, transparent, ${sutra.accent}60)`,
                  }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: sutra.accent,
                    boxShadow: `0 0 8px ${sutra.accent}`,
                  }}
                />
                <div
                  className="h-px flex-1 max-w-[80px]"
                  style={{
                    background: `linear-gradient(to left, transparent, ${sutra.accent}60)`,
                  }}
                />
              </div>

              {/* Transliteration */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-center text-lg md:text-xl font-serif italic mb-4"
                style={{ color: sutra.accent }}
              >
                {sutra.roman}
              </motion.p>

              {/* Translation */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center text-xl md:text-2xl font-serif text-slate-800 dark:text-slate-100 mb-8 leading-relaxed"
              >
                "{sutra.translation}"
              </motion.p>

              {/* Expander: meaning */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25 }}
                className="rounded-2xl p-6 mb-6 border"
                style={{
                  backgroundColor: sutra.accent + "08",
                  borderColor: sutra.accent + "25",
                }}
              >
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base text-center">
                  {sutra.meaning}
                </p>
              </motion.div>

              {/* Source and Philosopher */}
              <div className="text-center mb-10">
                <p className="text-xs font-mono text-slate-400 tracking-wider">
                  —{" "}
                  <span className="text-slate-600 dark:text-slate-300 font-semibold">
                    {sutra.source}
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {sutra.philosopher}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={downloadImage}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all"
                  style={
                    downloaded
                      ? {
                          background: sutra.accent,
                          borderColor: sutra.accent,
                          color: "#fff",
                        }
                      : {
                          background: "transparent",
                          borderColor: sutra.accent + "60",
                          color: sutra.accent,
                        }
                  }
                >
                  {downloaded ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <ArrowDownTrayIcon className="w-4 h-4" />
                  )}
                  {downloaded ? "Saved!" : "Save as Image"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={copyText}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-violet-400 transition-all"
                >
                  {copied ? (
                    <CheckIcon className="w-4 h-4 text-green-500" />
                  ) : (
                    <ClipboardDocumentIcon className="w-4 h-4" />
                  )}
                  {copied ? "Copied!" : "Copy Quote"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={shareNative}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-all shadow-lg"
                >
                  {shared ? (
                    <CheckIcon className="w-4 h-4" />
                  ) : (
                    <ShareIcon className="w-4 h-4" />
                  )}
                  {shared ? "Shared!" : "Share"}
                </motion.button>

                <Link
                  to={sutra.schoolPath}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-400 dark:hover:text-violet-400 transition-all"
                >
                  Explore {sutra.school} →
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ── */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all shadow-md text-sm font-medium"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Previous
          </motion.button>

          {/* Dot nav */}
          <div className="flex items-center gap-1.5">
            {sutras.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIdx ? 1 : -1);
                  setCurrentIdx(i);
                }}
                className={`rounded-full transition-all duration-300 ${i === currentIdx ? "w-6 h-2" : "w-2 h-2"}`}
                style={{
                  background:
                    i === currentIdx
                      ? `linear-gradient(90deg, ${sutra.accent}dd, ${sutra.accent})`
                      : undefined,
                  backgroundColor:
                    i === currentIdx
                      ? sutra.accent
                      : i === todayIdx
                        ? sutra.accent + "50"
                        : "#cbd5e1",
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => navigate(1)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all shadow-md text-sm font-medium"
          >
            Next
            <ArrowRightIcon className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Counter */}
        <p className="text-center text-xs text-slate-400 mb-12">
          Sūtra{" "}
          <span className="font-mono font-bold text-violet-500">
            {currentIdx + 1}
          </span>{" "}
          of {sutras.length}
          {isToday && <span className="ml-2 text-violet-500">← today</span>}
        </p>
      </div>

      {/* ── All Sūtras Grid ── */}
      <div className="relative z-10 container mx-auto px-6 max-w-5xl pb-24">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-2xl font-serif text-slate-800 dark:text-slate-200 whitespace-nowrap">
            All Sūtras
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-violet-300/50 to-transparent dark:from-violet-500/20" />
          <span className="text-xs text-slate-400 font-mono">
            {sutras.length} verses
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sutras.map((s, i) => (
            <motion.button
              key={s.id}
              onClick={() => {
                setDirection(i > currentIdx ? 1 : -1);
                setCurrentIdx(i);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 relative overflow-hidden
                ${
                  i === currentIdx
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-500/10 shadow-lg"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-violet-300 dark:hover:border-violet-500/40"
                }`}
            >
              {/* top color bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.schoolColor}`}
              />

              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className="text-xs font-bold tracking-widest uppercase"
                  style={{ color: s.accent }}
                >
                  {s.school}
                </span>
                {i === todayIdx && (
                  <span className="text-[9px] font-bold tracking-widest uppercase bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 px-2 py-0.5 rounded-full">
                    Today
                  </span>
                )}
              </div>

              <p className="font-serif text-lg text-slate-800 dark:text-slate-200 mb-1 leading-tight">
                {s.sanskrit}
              </p>
              <p className="text-xs italic text-slate-400 mb-2">
                {s.transliteration}
              </p>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                "{s.translation}"
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Back Link ── */}
      <div className="relative z-10 container mx-auto px-6 pb-16 text-center">
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

export default SutraOfDay;

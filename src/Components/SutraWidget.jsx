import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  ClipboardDocumentIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

import { sutras } from "../data/sutras";

export const getTodayIdx = () => {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24,
  );
  return dayOfYear % sutras.length;
};

export const generateImg = async (s) => {
  const [W, H] = [1200, 628];
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d");
  let g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#0a0812");
  g.addColorStop(1, "#12101f");
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  g = x.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, 350);
  g.addColorStop(0, s.accent + "28");
  g.addColorStop(1, "transparent");
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  g = x.createLinearGradient(0, 0, W, 0);
  g.addColorStop(0, "transparent");
  g.addColorStop(0.3, s.accent);
  g.addColorStop(0.7, s.accent);
  g.addColorStop(1, "transparent");
  x.fillStyle = g;
  x.fillRect(0, 0, W, 4);
  x.font = "bold 13px monospace";
  x.fillStyle = s.accent;
  x.textAlign = "center";
  x.fillText(s.school.toUpperCase() + " · SŪTRA OF THE DAY", W / 2, 55);
  x.font = "bold 58px serif";
  x.fillStyle = "#fff";
  x.fillText(s.sanskrit, W / 2, H / 2 - 55);
  x.fillStyle = s.accent + "80";
  x.fillRect(W / 2 - 60, H / 2 - 28, 120, 2);
  x.font = "italic 27px serif";
  x.fillStyle = s.accent;
  x.fillText(s.roman, W / 2, H / 2 + 8);
  x.font = "24px sans-serif";
  x.fillStyle = "#e2e8f0";
  const ws = `"${s.translation}"`.split(" ");
  let l = "",
    ls = [];
  for (const w of ws) {
    const t = l + w + " ";
    if (x.measureText(t).width > 680 && l) {
      ls.push(l.trim());
      l = w + " ";
    } else l = t;
  }
  if (l) ls.push(l.trim());
  ls.forEach((li, i) => x.fillText(li, W / 2, H / 2 + 52 + i * 36));
  x.font = "14px monospace";
  x.fillStyle = "rgba(148,163,184,.6)";
  x.fillText("— " + s.source + " · Darshanam", W / 2, H - 48);
  return c.toDataURL("image/png");
};

const SutraWidget = () => {
  const todayIdx = getTodayIdx();
  const [idx, setIdx] = useState(todayIdx);
  const [dir, setDir] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const s = sutras[idx];

  const nav = (d) => {
    setDir(d);
    setIdx((p) => (p + d + sutras.length) % sutras.length);
  };

  const copy = useCallback(async () => {
    await navigator.clipboard.writeText(
      `${s.sanskrit}\n${s.roman}\n\n"${s.translation}"\n\n${s.meaning}\n\n— ${s.source} · ${s.school} · Darshanam`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, [s]);

  const download = useCallback(async () => {
    const url = await generateImg(s);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sutra-${s.roman.replace(/\s+/g, "-").toLowerCase()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2200);
  }, [s]);

  return (
    <div>
      <div className="relative rounded-[28px] overflow-hidden shadow-2xl mb-6">
        <div className={`h-1.5 w-full bg-gradient-to-r ${s.color}`} />
        <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl border-x border-b border-slate-100 dark:border-slate-800 px-6 md:px-12 py-10 rounded-b-[28px] relative overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at 50% 0%, ${s.accent}0d 0%, transparent 65%)`,
            }}
          />
          <div className="flex justify-center mb-6 relative z-10">
            <Link
              to={s.schoolPath}
              className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border transition-opacity hover:opacity-75"
              style={{
                color: s.accent,
                borderColor: s.accent + "50",
                backgroundColor: s.accent + "12",
              }}
            >
              {s.school}
            </Link>
          </div>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              exit={{
                opacity: 0,
                x: dir > 0 ? -40 : 40,
                transition: { duration: 0.25 },
              }}
              className="text-center relative z-10"
            >
              <p
                className="font-serif text-3xl md:text-5xl text-slate-900 dark:text-white leading-relaxed mb-4"
                style={{ textShadow: `0 0 50px ${s.accent}25` }}
              >
                {s.sanskrit}
              </p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div
                  className="h-px w-14"
                  style={{
                    background: `linear-gradient(to right, transparent, ${s.accent}70)`,
                  }}
                />
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: s.accent }}
                />
                <div
                  className="h-px w-14"
                  style={{
                    background: `linear-gradient(to left, transparent, ${s.accent}70)`,
                  }}
                />
              </div>
              <p
                className="font-serif italic text-lg mb-2"
                style={{ color: s.accent }}
              >
                {s.roman}
              </p>
              <p className="text-lg md:text-2xl font-serif text-slate-800 dark:text-slate-100 mb-4">
                "{s.translation}"
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-4">
                {s.meaning}
              </p>
              <p className="text-xs font-mono text-slate-400">— {s.source}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-wrap justify-center gap-2.5 mt-8 relative z-10">
            <button
              onClick={download}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all"
              style={
                downloaded
                  ? {
                      background: s.accent,
                      borderColor: s.accent,
                      color: "#fff",
                    }
                  : {
                      borderColor: s.accent + "60",
                      color: s.accent,
                      background: "transparent",
                    }
              }
            >
              {downloaded ? (
                <CheckIcon className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownTrayIcon className="w-3.5 h-3.5" />
              )}{" "}
              {downloaded ? "Saved!" : "Save Image"}
            </button>
            <button
              onClick={copy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-400 bg-white dark:bg-slate-800 transition-all"
            >
              {copied ? (
                <CheckIcon className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <ClipboardDocumentIcon className="w-3.5 h-3.5" />
              )}{" "}
              {copied ? "Copied!" : "Copy"}
            </button>
            <Link
              to="/sutra"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-all shadow-md"
            >
              <SparklesIcon className="w-3.5 h-3.5" /> All Sūtras →
            </Link>
          </div>
        </div>
      </div>
      {/* Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => nav(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-all shadow-sm"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" /> Prev
        </button>
        <div className="flex items-center gap-1.5">
          {sutras.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > idx ? 1 : -1);
                setIdx(i);
              }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 18 : 7,
                height: 7,
                background:
                  i === idx
                    ? s.accent
                    : i === todayIdx
                      ? s.accent + "55"
                      : "#cbd5e1",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => nav(1)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-violet-400 hover:text-violet-600 dark:hover:text-violet-400 text-sm transition-all shadow-sm"
        >
          Next <ArrowRightIcon className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default SutraWidget;

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────
   GLOBAL – only ONE audio can ever play
   ────────────────────────────────────────── */
let gAudio = null; // the one Audio element
let gOwner = null; // setPlaying of the active button
let gSession = 0; // numeric session id

function stopGlobal() {
  gSession++; // invalidate any pending tryNext
  if (gAudio) {
    gAudio.onended = null; // detach FIRST
    gAudio.pause();
    gAudio = null;
  }
  if (gOwner) {
    try {
      gOwner(false);
    } catch (_) {}
    gOwner = null;
  }
}

/* ──── URL helpers ──── */
const pad3 = (v) => String(v).padStart(3, "0");

const extractCV = ({ audioUrl, chapterNumber, verseNumber }) => {
  if (chapterNumber && verseNumber)
    return { chapter: Number(chapterNumber), verse: Number(verseNumber) };
  if (!audioUrl) return null;
  const m = audioUrl.match(/\/audio\/(\d+)\/(\d+)\.mp3$/i);
  return m ? { chapter: Number(m[1]), verse: Number(m[2]) } : null;
};

const buildCandidates = ({ audioUrl, chapterNumber, verseNumber }) => {
  const list = [];
  const cv = extractCV({ audioUrl, chapterNumber, verseNumber });
  const CLOUD = "https://res.cloudinary.com/dbkqcnogo/video/upload/gita";
  if (audioUrl) list.push(audioUrl);
  if (cv) {
    list.push(`${CLOUD}/Chapter_${cv.chapter}_Verse_${cv.verse}.wav`);
    const c = pad3(cv.chapter),
      v = pad3(cv.verse);
    list.push(`https://shlokam.org/audio/bg/${c}_${v}.mp3`);
    list.push(
      `https://shlokam.org/wp-content/uploads/audio/bhagavad-gita/${c}_${v}.mp3`,
    );
    list.push(`https://bhagavadgitaapi.in/audio/${cv.chapter}/${cv.verse}.mp3`);
  }
  return [...new Set(list.filter(Boolean))];
};

/* ──────────────────────────────────────────
   TRY playing candidates one by one.
   Uses only play().then/catch – NO onerror.
   ────────────────────────────────────────── */
function playCandidates(candidates, setPlaying, mountedRef) {
  const sess = ++gSession; // new session, invalidates old ones
  gOwner = setPlaying;

  let idx = 0;

  function tryNext() {
    if (gSession !== sess) return; // session was cancelled

    if (idx >= candidates.length) {
      // all sources failed – reset
      gAudio = null;
      gOwner = null;
      if (mountedRef.current) setPlaying(false);
      return;
    }

    // pause previous attempt (if any)
    if (gAudio) {
      gAudio.onended = null;
      gAudio.pause();
      gAudio = null;
    }

    const audio = new Audio();
    gAudio = audio;

    audio.onended = () => {
      audio.onended = null;
      if (gAudio === audio) {
        gAudio = null;
        gOwner = null;
      }
      if (mountedRef.current) setPlaying(false);
    };

    // Set src and try to play
    audio.src = candidates[idx];

    audio
      .play()
      .then(() => {
        // Succeeded! But check session is still valid
        if (gSession !== sess) {
          audio.onended = null;
          audio.pause();
          return;
        }
        if (mountedRef.current) setPlaying(true);
      })
      .catch(() => {
        // This source failed. Clean up and try next.
        audio.onended = null;
        audio.pause();
        if (gSession !== sess) return;
        idx++;
        tryNext();
      });
  }

  tryNext();
}

/* ──── Component ──── */
const SpeakButton = ({
  audioUrl,
  chapterNumber,
  verseNumber,
  className = "",
}) => {
  const [playing, setPlaying] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      if (gOwner === setPlaying) stopGlobal();
    };
  }, []);

  useEffect(() => {
    if (gOwner === setPlaying) stopGlobal();
  }, [audioUrl, chapterNumber, verseNumber]);

  function handleClick(e) {
    e.stopPropagation();

    // THIS button is playing → stop
    if (gOwner === setPlaying) {
      stopGlobal();
      return;
    }

    // Something else playing → stop it
    stopGlobal();

    // Build URLs and play
    const urls = buildCandidates({ audioUrl, chapterNumber, verseNumber });
    if (!urls.length) return;

    if (mountedRef.current) setPlaying(true);
    playCandidates(urls, setPlaying, mountedRef);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      className={`relative p-3 rounded-full transition-all duration-300 group/speak ${
        playing
          ? "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30 text-amber-600 shadow-lg"
          : "hover:bg-amber-50 dark:hover:bg-amber-900/20 text-slate-400 hover:text-amber-600"
      } ${className}`}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
    >
      {playing && (
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-amber-500/30"
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-5 h-5 relative z-10"
      >
        {playing ? (
          <g>
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </g>
        ) : (
          <polygon
            points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"
            fill="currentColor"
          />
        )}
      </svg>
    </motion.button>
  );
};

export default SpeakButton;

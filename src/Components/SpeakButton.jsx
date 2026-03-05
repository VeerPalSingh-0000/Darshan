import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

/**
 * SpeakButton — plays pre-recorded audio with optional TTS fallback.
 * * Priority:
 * 1. Cloudinary Hosted Audio (Your high-quality .wav files)
 * 2. Local fallback (if you keep any in /public)
 * 3. Remote APIs (shlokam.org, etc.)
 * 4. Browser TTS Fallback
 */

let cachedVoice = null;
let voicesLoaded = false;

const pad3 = (value) => String(value).padStart(3, "0");

const extractChapterVerse = ({ audioUrl, chapterNumber, verseNumber }) => {
  if (chapterNumber && verseNumber) {
    return { chapter: Number(chapterNumber), verse: Number(verseNumber) };
  }

  if (!audioUrl) return null;

  const match = audioUrl.match(/\/audio\/(\d+)\/(\d+)\.mp3$/i);
  if (!match) return null;

  return { chapter: Number(match[1]), verse: Number(match[2]) };
};

const buildAudioCandidates = ({ audioUrl, chapterNumber, verseNumber }) => {
  const candidates = [];
  const cv = extractChapterVerse({ audioUrl, chapterNumber, verseNumber });

  // YOUR CLOUDINARY BASE URL
  // Includes your cloud name 'dbkqcnogo' and the 'gita' folder
  const CLOUDINARY_GITA_PATH = "https://res.cloudinary.com/dbkqcnogo/video/upload/gita";

  if (audioUrl) {
    candidates.push(audioUrl);
  }

  if (cv) {
    // --- 1. CLOUDINARY PRIORITY (Primary Source) ---
    // Uses your specific naming: Chapter_X_Verse_Y.wav
    candidates.push(`${CLOUDINARY_GITA_PATH}/Chapter_${cv.chapter}_Verse_${cv.verse}.wav`);

    // --- 2. LOCAL FALLBACK ---
    candidates.push(`/audio/gita/Chapter_${cv.chapter}_Verse_${cv.verse}.wav`);
    candidates.push(`/audio/gita/Chapter_${cv.chapter}_Verse_${cv.verse}.mp3`);

    // --- 3. REMOTE API FALLBACKS ---
    const chapter = pad3(cv.chapter);
    const verse = pad3(cv.verse);

    candidates.push(`https://shlokam.org/audio/bg/${chapter}_${verse}.mp3`);
    candidates.push(`https://shlokam.org/wp-content/uploads/audio/bhagavad-gita/${chapter}_${verse}.mp3`);
    candidates.push(`https://www.holy-bhagavad-gita.org/public/audio/${chapter}_${verse}.mp3`);
    candidates.push(`https://bhagavadgitaapi.in/audio/${cv.chapter}/${cv.verse}.mp3`);
  }

  return [...new Set(candidates.filter(Boolean))];
};

const findBestVoice = () => {
  if (cachedVoice && voicesLoaded) return cachedVoice;

  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  if (!voices.length) return null;

  voicesLoaded = true;

  const googleHindiMale = voices.find(
    (v) =>
      v.name.toLowerCase().includes("google") &&
      v.lang.startsWith("hi") &&
      !v.name.toLowerCase().includes("female")
  );
  if (googleHindiMale) return (cachedVoice = googleHindiMale);

  const hindiMale = voices.find(
    (v) =>
      v.lang.startsWith("hi") &&
      (v.name.toLowerCase().includes("male") ||
        v.name.toLowerCase().includes("hemant"))
  );

  return (cachedVoice =
    hindiMale || voices.find((v) => v.lang.startsWith("hi")) || null);
};

const SpeakButton = ({
  text,
  audioUrl,
  chapterNumber,
  verseNumber,
  className = "",
  fallbackToTTS = true,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  useEffect(() => {
    const loadVoices = () => findBestVoice();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      synthRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    synthRef.current.cancel();
    setIsSpeaking(false);
  }, [audioUrl, chapterNumber, verseNumber]);

  const playFallbackTTS = useCallback(() => {
    const cleanedText = text
      ?.replace(/\|\|[^|]*\|\|/g, "")
      .replace(/\|/g, ",")
      .replace(/\\n/g, ", ")
      .trim();

    if (!cleanedText) {
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(
      cleanedText.split(/[।॥]+/).join(" ... ")
    );

    const voice = findBestVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.rate = 0.6;
    utterance.pitch = 0.65;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  }, [text]);

  const handleSpeak = useCallback(() => {
    if (isSpeaking) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      synthRef.current.cancel();
      setIsSpeaking(false);
      return;
    }

    const candidates = buildAudioCandidates({
      audioUrl,
      chapterNumber,
      verseNumber,
    });

    if (!candidates.length) {
      if (fallbackToTTS) playFallbackTTS();
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    let index = 0;
    let resolved = false;

    const tryNext = () => {
      if (resolved) return;

      const source = candidates[index];
      if (!source) {
        resolved = true;
        setIsSpeaking(false);
        if (fallbackToTTS) playFallbackTTS();
        return;
      }

      const audio = new Audio(source);
      audioRef.current = audio;

      const fail = () => {
        if (resolved) return;
        index += 1;
        tryNext();
      };

      audio.onended = () => setIsSpeaking(false);
      audio.onerror = fail;

      audio
        .play()
        .then(() => {
          if (resolved) {
            audio.pause();
            return;
          }
          resolved = true;
          setIsSpeaking(true);
        })
        .catch(fail);
    };

    tryNext();
  }, [audioUrl, chapterNumber, verseNumber, fallbackToTTS, isSpeaking, playFallbackTTS]);

  return (
    <motion.button
      onClick={handleSpeak}
      className={`relative p-3 rounded-full transition-all duration-300 group/speak ${
        isSpeaking
          ? "bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/30 text-amber-600 shadow-lg"
          : "hover:bg-amber-50 dark:hover:bg-amber-900/20 text-slate-400 hover:text-amber-600"
      } ${className}`}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.88 }}
    >
      {isSpeaking && (
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
        {isSpeaking ? (
          <g>
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
            <rect x="14" y="4" width="4" height="16" fill="currentColor" />
          </g>
        ) : (
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" />
        )}
        
        {!isSpeaking && (
          <path
              d="M15.54 8.46a5 5 0 0 1 0 7.07"
              className="opacity-0 group-hover/speak:opacity-100 transition-opacity duration-300"
          />
        )}
      </svg>
    </motion.button>
  );
};

export default SpeakButton;
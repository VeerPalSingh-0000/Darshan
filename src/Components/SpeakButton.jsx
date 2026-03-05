import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

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
  const CLOUDINARY_GITA_PATH = "https://res.cloudinary.com/dbkqcnogo/video/upload/gita";

  if (audioUrl) candidates.push(audioUrl);

  if (cv) {
    candidates.push(`${CLOUDINARY_GITA_PATH}/Chapter_${cv.chapter}_Verse_${cv.verse}.wav`);
    const chapter = pad3(cv.chapter);
    const verse = pad3(cv.verse);
    candidates.push(`https://shlokam.org/audio/bg/${chapter}_${verse}.mp3`);
    candidates.push(`https://shlokam.org/wp-content/uploads/audio/bhagavad-gita/${chapter}_${verse}.mp3`);
    candidates.push(`https://bhagavadgitaapi.in/audio/${cv.chapter}/${cv.verse}.mp3`);
  }
  return [...new Set(candidates.filter(Boolean))];
};

const SpeakButton = ({ audioUrl, chapterNumber, verseNumber, className = "" }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const audioRef = useRef(null);
  const abortController = useRef(false); // The "Kill Switch"

  const stopAll = useCallback(() => {
    abortController.current = true; // Tell any pending tryNext to stop
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Clear the source
      audioRef.current.load(); // Force the browser to drop the audio resource
      audioRef.current = null;
    }
    
    setIsSpeaking(false);
  }, []);

  useEffect(() => {
    return () => stopAll();
  }, [stopAll]);

  useEffect(() => {
    stopAll();
  }, [audioUrl, chapterNumber, verseNumber, stopAll]);

  const handleSpeak = useCallback(() => {
    // If already playing or loading, STOP
    if (isSpeaking || audioRef.current) {
      stopAll();
      return;
    }

    const candidates = buildAudioCandidates({ audioUrl, chapterNumber, verseNumber });
    if (!candidates.length) return;

    abortController.current = false; // Reset kill switch
    let index = 0;

    const tryNext = () => {
      // Strict check: If user clicked stop, exit the loop immediately
      if (abortController.current) return;

      const source = candidates[index];
      if (!source) {
        stopAll();
        return;
      }

      const audio = new Audio(source);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };

      audio.onerror = () => {
        if (abortController.current) return;
        index += 1;
        tryNext();
      };

      audio.play()
        .then(() => {
          // Double check: Did the user click "Stop" while it was buffering?
          if (abortController.current) {
            audio.pause();
            audio.src = "";
            audioRef.current = null;
            return;
          }
          setIsSpeaking(true);
        })
        .catch(() => {
          if (abortController.current) return;
          index += 1;
          tryNext();
        });
    };

    tryNext();
  }, [audioUrl, chapterNumber, verseNumber, isSpeaking, stopAll]);

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
      </svg>
    </motion.button>
  );
};

export default SpeakButton;
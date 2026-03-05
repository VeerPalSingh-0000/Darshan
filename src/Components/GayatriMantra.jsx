import React, { useState, useRef, useEffect } from "react";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import mantraAudio from "../assets/gayatrimantra.mp3";

const GayatriMantra = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => setIsLoaded(true);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((e) => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 font-sans border-y border-white/5">
      {/* Static Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative container mx-auto px-6">
        <div className="max-w-xl mx-auto">
          {/* Clean Card Design */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative bg-white/[0.02] rounded-[32px] border border-white/10 p-8 md:p-12 shadow-2xl"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-8 mb-10 pb-8 border-b border-white/5">
              {/* Text Content */}
              <div className="text-center sm:text-left">
                <h1 className="text-4xl font-serif text-amber-100 mb-2 tracking-tight">
                  गायत्री मंत्र
                </h1>
                <p className="text-amber-500/40 text-[11px] font-mono uppercase tracking-[0.4em]">
                  The Universal Prayer
                </p>
              </div>

              {/* Minimalist Play Button */}
              <button
                onClick={togglePlayPause}
                disabled={!isLoaded}
                className={`w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300
                  ${
                    isPlaying
                      ? "bg-amber-500 text-white shadow-[0_4px_20px_rgba(245,158,11,0.3)]"
                      : "bg-white/5 text-amber-400 hover:bg-white/10 border border-amber-400/20 shadow-lg"
                  } disabled:opacity-50`}
              >
                {!isLoaded ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-500" />
                ) : isPlaying ? (
                  <PauseIcon className="w-7 h-7" />
                ) : (
                  <PlayIcon className="w-7 h-7 ml-1" />
                )}
              </button>
            </div>

            <audio ref={audioRef} src={mantraAudio} preload="metadata" />

            {/* Mantra Text - Static & Elegant */}
            <div className="text-center space-y-6">
              <p
                className={`font-serif text-3xl sm:text-5xl transition-colors duration-1000 ${isPlaying ? "text-amber-200" : "text-white/90"}`}
              >
                ॐ भूर्भुवः स्वः
              </p>
              <div className="space-y-3">
                <p
                  className={`font-serif text-xl sm:text-3xl transition-colors duration-1000 ${isPlaying ? "text-amber-100" : "text-white/60"}`}
                >
                  तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
                </p>
                <p
                  className={`font-serif text-xl sm:text-3xl transition-colors duration-1000 ${isPlaying ? "text-amber-100" : "text-white/60"}`}
                >
                  धियो यो नः प्रचोदयात् ॥
                </p>
              </div>

              {/* Subtle Translated Meaning */}
              <div className="pt-8">
                <p className="text-xs text-white/20 italic font-light tracking-wide max-w-sm mx-auto leading-relaxed">
                  "We meditate on that divine light. May it awaken our
                  intellect."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GayatriMantra;

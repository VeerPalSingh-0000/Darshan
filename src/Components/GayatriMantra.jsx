import React, { useState, useRef, useEffect } from 'react';
import { 
  PlayIcon,
  PauseIcon 
} from '@heroicons/react/24/solid';
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

    // Add event listeners
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('ended', onEnded);

    // Cleanup function to remove listeners
    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.error("Audio play failed:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative overflow-hidden bg-[#1a1a1a] py-20 sm:py-28 font-sans">
      {/* Background Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000"
        style={{ animation: 'glow 10s infinite alternate' }}
      ></div>

      <div className="relative container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-12 mx-auto max-w-3xl">
          
          {/* Header with Title and Play/Pause Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 mb-8">
            <div className="text-center sm:text-left">
              <h1 
                className="text-4xl pt-4 sm:text-5xl font-serif font-medium text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-2"
                style={{textShadow: '0 0 15px rgba(251, 191, 36, 0.3)'}}
              >
                गायत्री मंत्र
              </h1>
              <p className="text-yellow-200/50 text-base uppercase tracking-[0.2em]">The Universal Prayer</p>
            </div>

            {/* Simple, small Play/Pause button */}
            <button
                onClick={togglePlayPause}
                disabled={!isLoaded}
                className="flex-shrink-0 w-16 h-16 flex items-center justify-center text-yellow-400 bg-yellow-400/10 rounded-full hover:bg-yellow-400/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:text-gray-500 disabled:bg-gray-700/50 disabled:cursor-not-allowed"
                aria-label={isPlaying ? 'Pause' : 'Play'}
            >
                {!isLoaded ? (
                    <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-yellow-500"></div>
                ) : isPlaying ? (
                    <PauseIcon className="w-8 h-8" /> 
                ) : (
                    <PlayIcon className="w-8 h-8 ml-1" />
                )}
            </button>
          </div>

          <audio ref={audioRef} src={mantraAudio} preload="metadata" />

          {/* Mantra Text */}
          <div className="text-center my-10 p-6 border-y border-yellow-600/10">
            <p 
              className={`font-serif text-4xl md:text-5xl text-yellow-100 mb-6 leading-relaxed tracking-wider transition-all duration-1000 ${isPlaying ? 'text-shadow-glow' : ''}`}
            >
              ॐ भूर्भुवः स्वः
            </p>
            <p className={`font-serif text-2xl md:text-3xl text-yellow-100/80 leading-relaxed tracking-wider transition-all duration-1000 ${isPlaying ? 'text-shadow-glow-subtle' : ''}`}>
              तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि
            </p>
            <p className={`font-serif text-2xl md:text-3xl text-yellow-100/80 leading-relaxed tracking-wider transition-all duration-1000 ${isPlaying ? 'text-shadow-glow-subtle' : ''}`}>
              धियो यो नः प्रचोदयात् ॥
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes glow {
          from {
            transform: translate(-50%, -50%) scale(0.9);
            opacity: 0.7;
          }
          to {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
        }
        .text-shadow-glow {
          text-shadow: 0 0 8px rgba(252, 211, 77, 0.7), 0 0 20px rgba(245, 158, 11, 0.5);
        }
        .text-shadow-glow-subtle {
          text-shadow: 0 0 5px rgba(252, 211, 77, 0.5);
        }
      `}</style>
    </div>
  );
};

export default GayatriMantra;

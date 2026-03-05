import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle Theme"
      className="relative flex items-center w-[72px] h-9 rounded-full cursor-pointer z-50 overflow-hidden outline-none hover:shadow-lg transition-shadow duration-300"
      style={{
        background: isDarkMode
          ? "linear-gradient(to right, #0f2027, #203a43, #2c5364)" // Deep space night
          : "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)", // Vibrant day sky
        boxShadow:
          "inset 0 3px 6px rgba(0,0,0,0.4), inset 0 -3px 6px rgba(255,255,255,0.1)",
      }}
    >
      {/* --- Night Sky Stars --- */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: isDarkMode ? 1 : 0, y: isDarkMode ? 0 : 10 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute top-[8px] left-[14px] w-[2px] h-[2px] bg-white rounded-full shadow-[0_0_3px_#fff]" />
        <div className="absolute top-[20px] left-[24px] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_2px_#fff]" />
        <div className="absolute top-[26px] left-[10px] w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_2px_#fff]" />
        <div className="absolute top-[12px] left-[32px] w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_3px_#fff]" />
      </motion.div>

      {/* --- Day Sky Clouds --- */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={false}
        animate={{ opacity: isDarkMode ? 0 : 1, y: isDarkMode ? 10 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="absolute top-[16px] right-[10px] w-5 h-2 bg-white/95 rounded-full blur-[0.3px]">
          <div className="absolute -top-1.5 left-1.5 w-3 h-3 bg-white/95 rounded-full" />
        </div>
        <div className="absolute top-[6px] right-[26px] w-4 h-1.5 bg-white/80 rounded-full blur-[0.3px]">
          <div className="absolute -top-1 left-1 w-2 h-2 bg-white/80 rounded-full" />
        </div>
      </motion.div>

      {/* --- The Toggle Thumb (Sun/Moon) --- */}
      <motion.div
        className="relative z-10 w-7 h-7 rounded-full flex items-center justify-center pointer-events-none"
        initial={false}
        animate={{
          x: isDarkMode ? 40 : 4, // 72px total - 28px thumb - 4px padding = 40px left
          rotate: isDarkMode ? 0 : 180,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          background: isDarkMode ? "#cbd5e1" : "#fcd34d", // slate-300 / amber-300
          boxShadow: isDarkMode
            ? "inset -3px -2px 5px rgba(0,0,0,0.4), 0 0 10px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.5)" // Moon shading
            : "inset -2px -2px 4px rgba(217, 119, 6, 0.4), inset 2px 2px 4px rgba(255, 255, 255, 0.6), 0 0 15px rgba(251, 191, 36, 0.8), 0 2px 4px rgba(0,0,0,0.2)", // Sun glow
        }}
      >
        {/* Moon Craters (Only visible in dark mode) */}
        <motion.div
          className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
          initial={false}
          animate={{ opacity: isDarkMode ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute top-[4px] left-[5px] w-[6px] h-[6px] rounded-full bg-slate-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]" />
          <div className="absolute top-[12px] left-[13px] w-[8px] h-[8px] rounded-full bg-slate-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]" />
          <div className="absolute top-[18px] left-[6px] w-[4px] h-[4px] rounded-full bg-slate-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]" />
          <div className="absolute top-[8px] left-[21px] w-[3px] h-[3px] rounded-full bg-slate-400 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]" />
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../../Components/SEO";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  BookOpenIcon,
  BookmarkIcon as BookmarkSolidIcon,
  LightBulbIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../../Components/ScrollToTop";
import SpeakButton from "../../../Components/SpeakButton";

// --- Firebase & Auth Imports ---
// Make sure these paths are correct for your project structure
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

// --- Data for Chapter 1 ---
import { chapter1Shlokas } from "../../../data/chapter1";

// --- Animation Variants for Performance & Staggering ---
const pageFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

// --- Helper Component to format Word-by-Word Meanings ---
const WordMeaningDisplay = ({ text, language }) => {
  if (!text) return null;

  let parsed = [];
  try {
    if (language === "english" || language === "spanish" || language === "bengali" || language === "tamil") {
      const pairs = text.split(';').map(p => p.trim()).filter(Boolean);
      parsed = pairs.map((pair) => {
        const parts = pair.split(/—|-/);
        const word = parts[0]?.trim();
        const meaning = parts.slice(1).join('-')?.trim();
        return { word, meaning: meaning || "" };
      }).filter(p => p.word);
    } else if (language === "hindi") {
      const parts = text.split('(').map(p => p.trim()).filter(Boolean);
      parsed = parts.map((part) => {
        const [word, ...meaningParts] = part.split(')');
        return { word: word?.trim(), meaning: meaningParts.join(')')?.trim() };
      }).filter(p => p.word);
    }
  } catch (e) {
    parsed = [];
  }

  if (parsed.length === 0 || !parsed[0].meaning) {
    return (
      <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg font-medium italic">
        {text}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 mt-1">
      {parsed.map((item, idx) => (
        <div 
          key={idx} 
          className="group relative flex items-center gap-3 bg-white/60 dark:bg-slate-800/40 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/50 rounded-full pl-4 pr-5 py-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 hover:border-emerald-300/60 dark:hover:border-emerald-600/50"
        >
          <span className="font-bold text-emerald-800 dark:text-emerald-400 text-[15px] tracking-wide whitespace-nowrap">
            {item.word}
          </span>
          <div className="h-4 w-[2px] rounded-full bg-slate-200 dark:bg-slate-600/70 group-hover:bg-emerald-300 dark:group-hover:bg-emerald-500/50 transition-colors"></div>
          <span className="text-slate-700 dark:text-slate-300 font-medium italic text-[15px]">
            {item.meaning}
          </span>
        </div>
      ))}
    </div>
  );
};

const Adhyay1 = () => {
  const { currentUser } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");

  // --- Fetch bookmarks from Firestore when user logs in ---
  useEffect(() => {
    if (currentUser) {
      const fetchBookmarks = async () => {
        setIsLoading(true);
        const docRef = doc(db, "userBookmarks", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBookmarks(docSnap.data().chapter1 || []);
        } else {
          setBookmarks([]);
        }
        setIsLoading(false);
      };
      fetchBookmarks();
    } else {
      setBookmarks([]);
      setIsLoading(false);
    }
  }, [currentUser]);

  // --- Function to toggle a bookmark and save to Firestore ---
  const toggleBookmark = async (shlokaNum) => {
    if (!currentUser) {
      alert("Please log in to save your bookmarks.");
      return;
    }
    const newBookmarks = bookmarks.includes(shlokaNum)
      ? bookmarks.filter((num) => num !== shlokaNum)
      : [...bookmarks, shlokaNum];
    setBookmarks(newBookmarks);
    try {
      const docRef = doc(db, "userBookmarks", currentUser.uid);
      await setDoc(docRef, { chapter1: newBookmarks }, { merge: true });
    } catch (error) {
      console.error("Error updating bookmarks:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/30 via-[#F8F5F2] to-orange-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300">
      <SEO
        title={`Bhagavad Gītā Chapter 1: अर्जुनविषादयोगः - Darshanam`}
        description={`Explore Bhagavad Gītā Chapter 1 - The Yoga of Arjuna's Dejection. Read translations, listen to audio, and discover the meaning.`}
      />
      {/* Page Header */}
      <motion.section
        className="relative py-20 sm:py-28 text-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={pageFadeIn}
      >
        <div className="relative container mx-auto px-4">
          <motion.div
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10 backdrop-blur-sm border border-amber-200/50 dark:border-amber-900/30 text-amber-700 dark:text-amber-500 flex items-center justify-center shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BookOpenIcon className="w-10 h-10" />
          </motion.div>
          <motion.p
            className="text-amber-700 font-bold tracking-[0.2em] text-sm uppercase mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            अध्याय १
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 mt-4 mb-6 p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            अर्जुनविषादयोगः
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl font-serif text-slate-600 dark:text-slate-400 italic mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            The Yoga of Arjuna's Dejection
          </motion.h2>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/gita/chapters"
              className="group inline-flex items-center gap-3 text-amber-700 dark:text-amber-500 font-semibold hover:text-amber-900 dark:hover:text-amber-400 transition-all duration-300 px-6 py-3 rounded-full border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-900/20 backdrop-blur-sm"
            >
              <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to All Chapters
            </Link>

            <div className="flex items-center gap-2 px-4 py-3 bg-white/90 dark:bg-slate-800/50 backdrop-blur-sm border border-amber-200/50 dark:border-slate-700 rounded-full shadow-sm hover:bg-amber-50 dark:hover:bg-slate-700/80 transition-all duration-300">
              <span className="text-amber-700 dark:text-amber-500 font-semibold">
                Language:
              </span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-slate-800 dark:text-slate-100 font-bold focus:outline-none cursor-pointer"
              >
                <option
                  value="hindi"
                  className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  Hindi
                </option>
                <option
                  value="english"
                  className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  English
                </option>
                <option
                  value="tamil"
                  className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  Tamil
                </option>
                <option
                  value="bengali"
                  className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  Bengali
                </option>
                <option
                  value="spanish"
                  className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
                >
                  Spanish
                </option>
              </select>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Shlokas List */}
      <section className="relative pb-20 sm:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            className="space-y-10"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {chapter1Shlokas.map((shloka) => (
              <motion.div
                key={shloka.num}
                className="group relative bg-white/80 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-500 hover:border-amber-200 dark:hover:border-amber-900/50"
                variants={listItemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="relative p-8 md:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xl font-bold text-amber-700 dark:text-amber-500 bg-gradient-to-r from-amber-100 to-amber-50 dark:from-amber-900/20 dark:to-amber-900/10 px-5 py-2 rounded-xl border border-amber-200/50 dark:border-amber-900/30 shadow-sm">
                      1.{shloka.num}
                    </span>
                    <div className="flex items-center gap-1">
                      <SpeakButton
                        text={shloka.sanskrit}
                        audioUrl={shloka.audio}
                      />
                      <motion.button
                        onClick={() => toggleBookmark(shloka.num)}
                        className="p-3 rounded-full hover:bg-amber-100/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label={
                          bookmarks.includes(shloka.num)
                            ? "Remove bookmark"
                            : "Add bookmark"
                        }
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={isLoading || !currentUser}
                      >
                        {bookmarks.includes(shloka.num) ? (
                          <BookmarkSolidIcon className="w-6 h-6 text-amber-500" />
                        ) : (
                          <BookmarkOutlineIcon className="w-6 h-6 text-slate-400 group-hover:text-amber-500 transition-colors" />
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Sanskrit Verse with decorative accents */}
                  <div className="relative py-6 mb-6">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full" />
                    <p className="text-2xl md:text-3xl font-serif text-slate-900 dark:text-slate-100 leading-loose text-center whitespace-pre-line relative z-10 tracking-wide">
                      {shloka.sanskrit}
                    </p>
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent rounded-full" />
                  </div>

                  {/* Speaker Badge */}
                  {shloka.speaker && (
                    <div className="flex justify-center mb-8">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/50 text-slate-600 dark:text-slate-400 text-sm font-medium">
                        🗣️ {selectedLanguage === "hindi" ? "वक्ता" : "Speaker"}: <span className="text-slate-800 dark:text-slate-200 font-semibold">{shloka.speaker}</span>
                      </span>
                    </div>
                  )}

                  <div className="space-y-8">
                    {/* Translation */}
                    <motion.div
                      key={`translation-${shloka.num}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "100px" }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1.5 h-7 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full shadow-sm shadow-amber-400/30" />
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg tracking-wide">
                          {selectedLanguage === "hindi"
                            ? "हिन्दी अनुवाद (Hindi Translation)"
                            : selectedLanguage === "english"
                              ? "English Translation"
                              : `${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Translation`}
                        </h3>
                      </div>
                      <div className="relative bg-gradient-to-br from-slate-50/80 to-amber-50/40 dark:from-slate-800/60 dark:to-amber-950/20 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-700/40 backdrop-blur-sm">
                        <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg font-medium">
                          {shloka[selectedLanguage] ||
                            `Translation for ${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} will be available soon.`}
                        </p>
                      </div>
                    </motion.div>

                    {/* Word-by-Word Meaning */}
                    {(selectedLanguage === "hindi" && shloka.hindi_meaning) ||
                      (selectedLanguage === "english" && shloka.meaning) ||
                      shloka[`${selectedLanguage}_meaning`] ? (
                      <motion.div
                        key={`meaning-${shloka.num}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1.5 h-7 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full shadow-sm shadow-emerald-400/30" />
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg tracking-wide">
                            {selectedLanguage === "hindi"
                              ? "शब्दार्थ (Word-by-Word Meaning)"
                              : selectedLanguage === "english"
                                ? "Word-by-Word Meaning"
                                : `${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Meaning`}
                          </h3>
                        </div>
                        <div className="relative bg-gradient-to-br from-emerald-50/30 to-green-50/20 dark:from-emerald-950/20 dark:to-green-950/10 p-6 rounded-2xl border border-emerald-100/40 dark:border-emerald-900/30 backdrop-blur-sm">
                          <WordMeaningDisplay 
                            text={selectedLanguage === "hindi" ? shloka.hindi_meaning : (selectedLanguage === "english" ? shloka.meaning : shloka[`${selectedLanguage}_meaning`])} 
                            language={selectedLanguage} 
                          />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={`meaning-${shloka.num}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1.5 h-7 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full shadow-sm shadow-emerald-400/30" />
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg tracking-wide">
                            {selectedLanguage.charAt(0).toUpperCase() +
                              selectedLanguage.slice(1)}{" "}
                            Meaning
                          </h3>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50/30 to-green-50/20 dark:from-emerald-950/20 dark:to-green-950/10 p-6 rounded-2xl border border-emerald-100/40 dark:border-emerald-900/30">
                          <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg italic">
                            Meaning for{" "}
                            {selectedLanguage.charAt(0).toUpperCase() +
                              selectedLanguage.slice(1)}{" "}
                            will be available soon.
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* ═══ Detailed Analysis Section ═══ */}
                    {shloka.translations && shloka.translations[selectedLanguage] && (
                      <motion.div
                        key={`detailed-${shloka.num}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ delay: 0.6 }}
                        className="space-y-5 pt-4"
                      >
                        {/* Section Divider */}
                        <div className="flex items-center gap-4 mb-2">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent" />
                          <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                            {selectedLanguage === "hindi" ? "गहन विश्लेषण" : "Deep Analysis"}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Philosophical Meaning */}
                          <motion.div 
                            className="relative group overflow-hidden bg-gradient-to-br from-indigo-50/60 to-violet-50/40 dark:from-indigo-950/30 dark:to-violet-950/20 p-6 rounded-2xl border border-indigo-200/40 dark:border-indigo-800/30 hover:border-indigo-300/70 dark:hover:border-indigo-600/50 transition-all duration-500 hover:shadow-lg hover:shadow-indigo-500/5"
                            whileHover={{ y: -2 }}
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-200/20 dark:from-indigo-500/5 to-transparent rounded-bl-full" />
                            <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 border border-indigo-200/50 dark:border-indigo-700/40">
                                  <LightBulbIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h4 className="font-bold text-indigo-800 dark:text-indigo-300 text-base">
                                  {selectedLanguage === "hindi" ? "दार्शनिक अर्थ" : "Philosophical Meaning"}
                                </h4>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed">
                                {shloka.translations[selectedLanguage].philosophical_meaning}
                              </p>
                            </div>
                          </motion.div>

                          {/* Practical Meaning */}
                          <motion.div 
                            className="relative group overflow-hidden bg-gradient-to-br from-teal-50/60 to-emerald-50/40 dark:from-teal-950/30 dark:to-emerald-950/20 p-6 rounded-2xl border border-teal-200/40 dark:border-teal-800/30 hover:border-teal-300/70 dark:hover:border-teal-600/50 transition-all duration-500 hover:shadow-lg hover:shadow-teal-500/5"
                            whileHover={{ y: -2 }}
                          >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-teal-200/20 dark:from-teal-500/5 to-transparent rounded-bl-full" />
                            <div className="relative z-10">
                              <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-100 dark:bg-teal-900/40 border border-teal-200/50 dark:border-teal-700/40">
                                  <WrenchScrewdriverIcon className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                                </div>
                                <h4 className="font-bold text-teal-800 dark:text-teal-300 text-base">
                                  {selectedLanguage === "hindi" ? "व्यावहारिक अर्थ" : "Practical Meaning"}
                                </h4>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed">
                                {shloka.translations[selectedLanguage].practical_meaning}
                              </p>
                            </div>
                          </motion.div>
                        </div>

                        {/* Key Lesson — Full Width Highlight Card */}
                        <motion.div 
                          className="relative overflow-hidden md:col-span-2 bg-gradient-to-r from-amber-50 via-orange-50/80 to-yellow-50/60 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/10 p-6 rounded-2xl border border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300/70 dark:hover:border-amber-600/50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/5"
                          whileHover={{ y: -2 }}
                        >
                          <div className="absolute -top-2 -right-2 w-32 h-32 bg-gradient-to-bl from-amber-200/15 dark:from-amber-500/5 to-transparent rounded-bl-full" />
                          <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-200/10 dark:from-orange-500/5 to-transparent rounded-tr-full" />
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                              <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 border border-amber-200/50 dark:border-amber-700/40">
                                <SparklesIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                              </div>
                              <h4 className="font-bold text-amber-800 dark:text-amber-300 text-base">
                                {selectedLanguage === "hindi" ? "मुख्य पाठ" : "Key Lesson"}
                              </h4>
                            </div>
                            <p className="text-slate-800 dark:text-slate-200 text-lg leading-relaxed font-medium">
                              {shloka.translations[selectedLanguage].key_lesson}
                            </p>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <ScrollToTop />
    </div>
  );
};

export default Adhyay1;

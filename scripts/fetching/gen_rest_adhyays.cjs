const fs = require("fs");
const path = require("path");

const chapters = [
  {
    num: 8,
    hindiNum: "८",
    hindiName: "अक्षरब्रह्मयोगः",
    englishName: "Akshara Brahma Yoga - The Eternal God",
    dataVar: "chapter8Shlokas",
    dataFile: "chapter8",
  },
  {
    num: 9,
    hindiNum: "९",
    hindiName: "राजविद्याराजगुह्ययोगः",
    englishName: "Raja Vidya Raja Guhya Yoga - The King of Sciences",
    dataVar: "chapter9Shlokas",
    dataFile: "chapter9",
  },
  {
    num: 10,
    hindiNum: "१०",
    hindiName: "विभूतिविस्तारयोगः",
    englishName: "Vibhuti Vistara Yoga - The Divine Manifestations",
    dataVar: "chapter10Shlokas",
    dataFile: "chapter10",
  },
  {
    num: 11,
    hindiNum: "११",
    hindiName: "विश्वरूपदर्शनयोगः",
    englishName: "Vishwarupa Darshana Yoga - The Universal Form",
    dataVar: "chapter11Shlokas",
    dataFile: "chapter11",
  },
  {
    num: 12,
    hindiNum: "१२",
    hindiName: "भक्तियोगः",
    englishName: "Bhakti Yoga - The Yoga of Devotion",
    dataVar: "chapter12Shlokas",
    dataFile: "chapter12",
  },
  {
    num: 13,
    hindiNum: "१३",
    hindiName: "क्षेत्रक्षेत्रज्ञविभागयोगः",
    englishName: "Kshetra Kshetrajna Vibhaga Yoga - Matter and Spirit",
    dataVar: "chapter13Shlokas",
    dataFile: "chapter13",
  },
  {
    num: 14,
    hindiNum: "१४",
    hindiName: "गुणत्रयविभागयोगः",
    englishName: "Gunatraya Vibhaga Yoga - The Three Modes of Nature",
    dataVar: "chapter14Shlokas",
    dataFile: "chapter14",
  },
  {
    num: 15,
    hindiNum: "१५",
    hindiName: "पुरुषोत्तमयोगः",
    englishName: "Purushottama Yoga - The Supreme Person",
    dataVar: "chapter15Shlokas",
    dataFile: "chapter15",
  },
  {
    num: 16,
    hindiNum: "१६",
    hindiName: "दैवासुरसम्पद्विभागयोगः",
    englishName: "Daivasura Sampad Vibhaga Yoga - Divine and Demonic Natures",
    dataVar: "chapter16Shlokas",
    dataFile: "chapter16",
  },
  {
    num: 17,
    hindiNum: "१७",
    hindiName: "श्रद्धात्रयविभागयोगः",
    englishName: "Shraddhatraya Vibhaga Yoga - Threefold Faith",
    dataVar: "chapter17Shlokas",
    dataFile: "chapter17",
  },
  {
    num: 18,
    hindiNum: "१८",
    hindiName: "मोक्षसंन्यासयोगः",
    englishName: "Moksha Sanyasa Yoga - Liberation and Renunciation",
    dataVar: "chapter18Shlokas",
    dataFile: "chapter18",
  },
];

const template = (c) => `import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  BookOpenIcon,
  BookmarkIcon as BookmarkSolidIcon,
} from "@heroicons/react/24/solid";
import { BookmarkIcon as BookmarkOutlineIcon } from "@heroicons/react/24/outline";

import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { ${c.dataVar} } from "../../../data/${c.dataFile}";

const pageFadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Adhyay${c.num} = () => {
  const { currentUser } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");

  useEffect(() => {
    if (currentUser) {
      const fetchBookmarks = async () => {
        setIsLoading(true);
        const docRef = doc(db, "userBookmarks", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setBookmarks(docSnap.data().${c.dataFile} || []);
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
      await setDoc(docRef, { ${c.dataFile}: newBookmarks }, { merge: true });
    } catch (error) {
      console.error("Error updating bookmarks:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-amber-50/30 via-[#F8F5F2] to-orange-50/20 text-slate-800 min-h-screen font-sans">
      <motion.section
        className="relative py-20 sm:py-28 text-center overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={pageFadeIn}
      >
        <div className="relative container mx-auto px-4">
          <motion.div
            className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-200/50 text-amber-700 flex items-center justify-center shadow-lg"
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
            अध्याय ${c.hindiNum}
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 mt-4 mb-6 p-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ${c.hindiName}
          </motion.h1>
          <motion.h2
            className="text-2xl md:text-3xl font-serif text-slate-600 italic mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            ${c.englishName}
          </motion.h2>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              to="/gita/chapters"
              className="group inline-flex items-center gap-3 text-amber-700 font-semibold hover:text-amber-900 transition-all duration-300 px-6 py-3 rounded-full border border-amber-200/50 hover:border-amber-300 hover:bg-amber-50/50 backdrop-blur-sm"
            >
              <ArrowLeftIcon className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to All Chapters
            </Link>
            <div className="flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-full shadow-sm hover:border-amber-300 transition-colors">
              <span className="text-amber-700 font-semibold">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer"
              >
                <option value="hindi">Hindi</option>
                <option value="english">English</option>
                <option value="tamil">Tamil</option>
                <option value="bengali">Bengali</option>
                <option value="spanish">Spanish</option>
              </select>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <section className="relative pb-20 sm:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            className="space-y-10"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {${c.dataVar}.map((shloka) => (
              <motion.div
                key={shloka.num}
                className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-500 hover:border-amber-200"
                variants={listItemVariants}
                whileHover={{ y: -4 }}
              >
                <div className="relative p-8 md:p-10">
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-xl font-bold text-amber-700 bg-gradient-to-r from-amber-100 to-amber-50 px-5 py-2 rounded-xl border border-amber-200/50 shadow-sm">
                      ${c.num}.{shloka.num}
                    </span>
                    <motion.button
                      onClick={() => toggleBookmark(shloka.num)}
                      className="p-3 rounded-full hover:bg-amber-100/50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label={bookmarks.includes(shloka.num) ? "Remove bookmark" : "Add bookmark"}
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

                  <p className="text-2xl md:text-3xl font-serif text-slate-900 leading-loose text-center whitespace-pre-line relative z-10 tracking-wide mb-10">
                    {shloka.sanskrit}
                  </p>

                  <div className="space-y-8">
                    <motion.div
                      key={\`translation-\${selectedLanguage}-\${shloka.num}\`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                        <h3 className="font-bold text-slate-800 text-lg">
                          {selectedLanguage === "hindi"
                            ? "हिन्दी अनुवाद (Hindi Translation)"
                            : selectedLanguage === "english"
                              ? "English Translation"
                              : \`\${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Translation\`}
                        </h3>
                      </div>
                      <div className="bg-gradient-to-r from-slate-50 to-amber-50/30 p-6 rounded-xl border border-slate-100">
                        <p className="text-slate-700 leading-relaxed text-lg font-medium">
                          {shloka[selectedLanguage] ||
                            \`Translation for \${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} will be available soon.\`}
                        </p>
                      </div>
                    </motion.div>

                    {(selectedLanguage === "hindi" && shloka.hindi_meaning) ||
                    (selectedLanguage === "english" && shloka.meaning) ||
                    shloka[\`\${selectedLanguage}_meaning\`] ? (
                      <motion.div
                        key={\`meaning-\${selectedLanguage}-\${shloka.num}\`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-green-500 rounded-full" />
                          <h3 className="font-bold text-slate-800 text-lg">
                            {selectedLanguage === "hindi"
                              ? "भावार्थ (Hindi Meaning)"
                              : selectedLanguage === "english"
                                ? "English Meaning"
                                : \`\${selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Meaning\`}
                          </h3>
                        </div>
                        <div className="bg-gradient-to-r from-emerald-50/20 to-green-50/20 p-6 rounded-xl border border-slate-100">
                          <p className="text-slate-700 leading-relaxed text-lg font-medium italic">
                            {selectedLanguage === "hindi"
                              ? shloka.hindi_meaning
                              : selectedLanguage === "english"
                                ? shloka.meaning
                                : shloka[\`\${selectedLanguage}_meaning\`]}
                          </p>
                        </div>
                      </motion.div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Adhyay${c.num};
`;

chapters.forEach((c) => {
  const filePath = path.join(
    "src",
    "Pages",
    "Gita",
    "Chapters",
    `Adhyay${c.num}.jsx`,
  );
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, template(c), "utf8");
  console.log(`Created ${filePath}`);
});

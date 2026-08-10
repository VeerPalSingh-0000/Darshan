import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../../Components/SEO";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  BookOpenIcon,
  BookmarkIcon as BookmarkSolidIcon,
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

// --- Speaker Name Translations ---
const speakerMap = {
  "Lord Krishna": {
    hindi: "श्रीकृष्ण",
    english: "Lord Krishna",
    tamil: "ஸ்ரீ கிருஷ்ணர்",
    bengali: "শ্রীকৃষ্ণ",
    spanish: "Señor Krishna",
  },
  "Arjuna": {
    hindi: "अर्जुन",
    english: "Arjuna",
    tamil: "அர்ஜுனன்",
    bengali: "অর্জুন",
    spanish: "Arjuna",
  },
  "Sanjaya": {
    hindi: "संजय",
    english: "Sanjaya",
    tamil: "சஞ்சயன்",
    bengali: "সঞ্জয়",
    spanish: "Sanjaya",
  },
  "Dhritarashtra": {
    hindi: "धृतराष्ट्र",
    english: "Dhritarashtra",
    tamil: "திருதராஷ்டிரன்",
    bengali: "ধৃতরাষ্ট্র",
    spanish: "Dhritarashtra",
  },
  "Duryodhana": {
    hindi: "दुर्योधन",
    english: "Duryodhana",
    tamil: "துரியோதனன்",
    bengali: "দুর্যোধন",
    spanish: "Duryodhana",
  },
};

const Adhyay1 = () => {
  const { currentUser } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const [showBackground, setShowBackground] = useState(false);

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
    const newBookmarks = bookmarks.includes(shlokaNum) ? [] : [shlokaNum];
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

      {/* ═══ Background of the Mahabharata — for newcomers ═══ */}
      <section className="relative pb-10 sm:pb-14">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <button
              onClick={() => setShowBackground(!showBackground)}
              className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50/80 to-yellow-50/60 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/20 backdrop-blur-sm border border-amber-200/60 dark:border-amber-800/40 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-500 hover:border-amber-300 dark:hover:border-amber-600/50 text-left"
            >
              <div className="absolute -top-4 -right-4 w-40 h-40 bg-gradient-to-bl from-amber-200/15 dark:from-amber-500/5 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-200/10 dark:from-orange-500/5 to-transparent rounded-tr-full" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/40 border border-amber-200/50 dark:border-amber-700/40 shadow-sm">
                    <span className="text-2xl">📜</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-900 dark:text-amber-300 tracking-wide">
                      {selectedLanguage === "hindi" ? "महाभारत की पृष्ठभूमि" : "Background of the Mahābhārata"}
                    </h3>
                    <p className="text-sm text-amber-700/70 dark:text-amber-400/60 mt-0.5 font-medium">
                      {selectedLanguage === "hindi"
                        ? "नए पाठकों के लिए — यह कहानी क्या है?"
                        : "New to this? — A brief introduction to the story"}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: showBackground ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </motion.div>
              </div>
            </button>

            {/* Expandable Background Content */}
            <motion.div
              initial={false}
              animate={{
                height: showBackground ? "auto" : 0,
                opacity: showBackground ? 1 : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-4 bg-white/80 dark:bg-slate-900/90 backdrop-blur-sm border border-slate-200/60 dark:border-slate-800 rounded-2xl shadow-lg p-8 md:p-10 space-y-8">

                {/* ─── The Story ─── */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-7 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
                      {selectedLanguage === "hindi" ? "🏛️ कहानी संक्षेप में" : "🏛️ The Story in Brief"}
                    </h4>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-amber-950/20 dark:to-orange-950/10 p-6 rounded-2xl border border-amber-100/40 dark:border-amber-900/30 space-y-4">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">
                      {selectedLanguage === "hindi"
                        ? "महाभारत दुनिया का सबसे बड़ा महाकाव्य है। यह हस्तिनापुर (आज के दिल्ली के पास) के एक राजपरिवार की कहानी है। इस परिवार में दो भाई थे — धृतराष्ट्र (जो जन्म से अंधे थे) और पाण्डु। धृतराष्ट्र बड़े थे पर अंधे होने के कारण राजा नहीं बन सके, इसलिए पाण्डु राजा बने। पाण्डु की असमय मृत्यु के बाद, उनके पाँच पुत्रों (पाण्डव — युधिष्ठिर, भीम, अर्जुन, नकुल, सहदेव) को राज्य मिलना चाहिए था।"
                        : "The Mahābhārata is the world's longest epic poem. It tells the story of a royal family in the kingdom of Hastinapura (near modern-day Delhi, India). This family had two brothers — Dhritarashtra (born blind) and Pandu. Because Dhritarashtra was blind, Pandu became king instead. After Pandu's early death, his five sons (the Pandavas — Yudhishthira, Bhima, Arjuna, Nakula, and Sahadeva) were the rightful heirs to the throne."}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">
                      {selectedLanguage === "hindi"
                        ? "लेकिन धृतराष्ट्र के सौ पुत्रों (कौरव — जिनमें दुर्योधन सबसे बड़ा था) ने राज्य देने से मना कर दिया। दुर्योधन ने ईर्ष्या और लालच में आकर पाण्डवों को छल से जुए में हराया, उन्हें 13 साल के वनवास पर भेजा, और वनवास पूरा होने के बाद भी राज्य लौटाने से इनकार कर दिया। भगवान कृष्ण ने शांति दूत बनकर बातचीत की कोशिश की, लेकिन दुर्योधन ने कहा — 'सुई की नोक जितनी भी ज़मीन नहीं दूँगा'।"
                        : "However, Dhritarashtra's one hundred sons (the Kauravas — led by the eldest, Duryodhana) refused to share power. Driven by jealousy and greed, Duryodhana cheated the Pandavas in a rigged game of dice, sent them into 13 years of exile, and even after the exile was completed, refused to return even a single village. Lord Krishna himself went as a peace messenger, but Duryodhana declared — 'I won't give them land equal to the tip of a needle.'"}
                    </p>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">
                      {selectedLanguage === "hindi"
                        ? "जब सभी शांतिपूर्ण प्रयास विफल हो गए, तो युद्ध अपरिहार्य हो गया। दोनों पक्षों की विशाल सेनाएँ कुरुक्षेत्र (हरियाणा, भारत) के मैदान में एकत्र हुईं। यह 18 दिनों तक चलने वाला भयंकर युद्ध था।"
                        : "When all peaceful efforts failed, war became inevitable. The massive armies of both sides assembled on the plains of Kurukshetra (in modern-day Haryana, India). This devastating war would last 18 days."}
                    </p>
                  </div>
                </div>

                {/* ─── Key Characters ─── */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-7 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-full" />
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
                      {selectedLanguage === "hindi" ? "👥 मुख्य पात्र" : "👥 Key Characters"}
                    </h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        emoji: "🦚",
                        name: selectedLanguage === "hindi" ? "श्री कृष्ण" : "Lord Krishna",
                        desc: selectedLanguage === "hindi"
                          ? "भगवान विष्णु के अवतार। अर्जुन के सारथी और मार्गदर्शक। गीता का ज्ञान इन्होंने ही दिया।"
                          : "Incarnation of Lord Vishnu. Arjuna's charioteer and guide. He is the one who delivers the teachings of the Gita."
                      },
                      {
                        emoji: "🏹",
                        name: selectedLanguage === "hindi" ? "अर्जुन" : "Arjuna",
                        desc: selectedLanguage === "hindi"
                          ? "पाँच पाण्डवों में तीसरे भाई और सबसे महान धनुर्धर। कृष्ण के परम मित्र।"
                          : "The third of the five Pandava brothers and the greatest archer of his time. Krishna's dearest friend."
                      },
                      {
                        emoji: "👑",
                        name: selectedLanguage === "hindi" ? "दुर्योधन" : "Duryodhana",
                        desc: selectedLanguage === "hindi"
                          ? "धृतराष्ट्र का ज्येष्ठ पुत्र और कौरवों का नेता। लालच और ईर्ष्या से प्रेरित।"
                          : "The eldest son of Dhritarashtra and leader of the Kauravas. Driven by greed and jealousy."
                      },
                      {
                        emoji: "🙈",
                        name: selectedLanguage === "hindi" ? "धृतराष्ट्र" : "Dhritarashtra",
                        desc: selectedLanguage === "hindi"
                          ? "कौरवों के अंधे पिता। पुत्रमोह के कारण अन्याय रोकने में असमर्थ रहे।"
                          : "The blind father of the Kauravas. His attachment to his sons prevented him from stopping injustice."
                      },
                      {
                        emoji: "👁️",
                        name: selectedLanguage === "hindi" ? "संजय" : "Sanjaya",
                        desc: selectedLanguage === "hindi"
                          ? "धृतराष्ट्र के सारथी। उन्हें दिव्य दृष्टि प्राप्त थी जिससे वे महल में बैठे युद्ध का आँखों देखा हाल सुना सके।"
                          : "Dhritarashtra's charioteer. He was granted divine vision to narrate the events of the war from the palace."
                      },
                      {
                        emoji: "⚔️",
                        name: selectedLanguage === "hindi" ? "भीष्म" : "Bhishma",
                        desc: selectedLanguage === "hindi"
                          ? "कुरुवंश के पितामह और महान योद्धा। कर्तव्य से बंधे कौरवों की ओर से लड़ रहे थे।"
                          : "The grand patriarch of the Kuru dynasty. A legendary warrior fighting for the Kauravas out of duty, not conviction."
                      },
                    ].map((char, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-slate-50/60 to-indigo-50/30 dark:from-slate-800/50 dark:to-indigo-950/20 rounded-xl border border-slate-200/40 dark:border-slate-700/30 hover:border-indigo-200/60 dark:hover:border-indigo-700/40 transition-all duration-300"
                      >
                        <span className="text-2xl mt-0.5">{char.emoji}</span>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200 text-[15px]">{char.name}</p>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mt-0.5">{char.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ─── Setting of the Gita ─── */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-1.5 h-7 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full" />
                    <h4 className="font-bold text-slate-800 dark:text-slate-100 text-lg">
                      {selectedLanguage === "hindi" ? "🕉️ गीता कहाँ से शुरू होती है?" : "🕉️ Where Does the Gita Begin?"}
                    </h4>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50/40 to-green-50/20 dark:from-emerald-950/20 dark:to-green-950/10 p-6 rounded-2xl border border-emerald-100/40 dark:border-emerald-900/30">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[15px]">
                      {selectedLanguage === "hindi"
                        ? "भगवद्गीता का उपदेश ठीक युद्ध शुरू होने से पहले का है। दोनों सेनाएँ आमने-सामने खड़ी हैं। अर्जुन अपने रथ पर खड़े हैं, कृष्ण उनके सारथी हैं। जब अर्जुन दोनों तरफ अपने ही परिवार के लोगों — दादा भीष्म, गुरु द्रोण, भाइयों, चचेरे भाइयों — को देखते हैं, तो वे भावनात्मक रूप से टूट जाते हैं और हथियार रखने की बात करते हैं। यहीं से कृष्ण उन्हें कर्तव्य, धर्म, आत्मा, और जीवन के गहरे रहस्यों का ज्ञान देते हैं — यही भगवद्गीता है। अध्याय 1 में अर्जुन की यह दुविधा और विषाद (grief) विस्तार से दिखाया गया है।"
                        : "The Bhagavad Gita begins on the battlefield, moments before the war starts. Both armies stand face-to-face. Arjuna stands in his chariot with Krishna as his charioteer. When Arjuna sees his own family on both sides — his grandfather Bhishma, his teacher Drona, his cousins and loved ones — he is emotionally shattered and wants to drop his weapons and refuse to fight. This is where Krishna begins his timeless teachings about duty, righteousness, the soul, and the deepest secrets of life — this is the Bhagavad Gita. Chapter 1 focuses entirely on Arjuna's inner crisis and despair."}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Shlokas List */}
      <section className="relative pb-20 sm:pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {bookmarks.length > 0 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  const el = document.getElementById(`verse-${bookmarks[0]}`);
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 rounded-lg hover:bg-amber-200 dark:hover:bg-amber-900/60 transition-colors shadow-sm"
              >
                <BookmarkSolidIcon className="w-5 h-5" />
                <span className="font-medium">Go to Bookmark (Verse {bookmarks[0]})</span>
              </button>
            </div>
          )}
          <motion.div
            className="space-y-10"
            variants={listContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {chapter1Shlokas.map((shloka) => (
              <motion.div
                key={shloka.num}
                id={`verse-${shloka.num}`}
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
                        🗣️ {selectedLanguage === "hindi" ? "वक्ता" : "Speaker"}: <span className="text-slate-800 dark:text-slate-200 font-semibold">{speakerMap[shloka.speaker]?.[selectedLanguage] || shloka.speaker}</span>
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

                    {/* Context & Background — beginner-friendly explanation */}
                    {shloka.translations && shloka.translations[selectedLanguage] && shloka.translations[selectedLanguage].literal_meaning && (
                      <motion.div
                        key={`context-${shloka.num}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ delay: 0.4 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-1.5 h-7 bg-gradient-to-b from-emerald-400 to-green-500 rounded-full shadow-sm shadow-emerald-400/30" />
                          <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg tracking-wide">
                            {selectedLanguage === "hindi"
                              ? "📖 सरल संदर्भ — यहाँ क्या हो रहा है?"
                              : "📖 Context — What's Happening Here?"}
                          </h3>
                        </div>
                        <div className="relative bg-gradient-to-br from-emerald-50/30 to-green-50/20 dark:from-emerald-950/20 dark:to-green-950/10 p-6 rounded-2xl border border-emerald-100/40 dark:border-emerald-900/30 backdrop-blur-sm">
                          <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-lg font-medium">
                            {shloka.translations[selectedLanguage].literal_meaning}
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* ═══ Key Lesson ═══ */}
                    {shloka.translations && shloka.translations[selectedLanguage] && shloka.translations[selectedLanguage].key_lesson && (
                      <motion.div
                        key={`lesson-${shloka.num}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "100px" }}
                        transition={{ delay: 0.6 }}
                        className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50/80 to-yellow-50/60 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-yellow-950/10 p-6 rounded-2xl border border-amber-200/50 dark:border-amber-800/30 hover:border-amber-300/70 dark:hover:border-amber-600/50 transition-all duration-500 hover:shadow-lg hover:shadow-amber-500/5"
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

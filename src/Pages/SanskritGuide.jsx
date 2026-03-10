import React, { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  SpeakerWaveIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  XMarkIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { SpeakerWaveIcon as SpeakerSolid } from "@heroicons/react/24/solid";
import ScrollToTop from "../Components/ScrollToTop";

// ─── Sanskrit Terms Database ───────────────────────────────────────────────
// phonetic: simplified English approximation fed to SpeechSynthesis
const terms = [
  // ── Schools ────────────────────────────────────────────────────────────────
  {
    id: 1,
    category: "Schools of Philosophy",
    sanskrit: "सांख्य",
    roman: "Sāṃkhya",
    meaning: "The philosophy of enumeration and cosmic dualism.",
    phonetic: "Saam-khya",
    school: "Sāṃkhya",
    detail:
      "From 'saṃkhyā' meaning 'number' or 'enumeration'. One of the oldest of the six āstika schools.",
  },
  {
    id: 2,
    category: "Schools of Philosophy",
    sanskrit: "योग",
    roman: "Yoga",
    meaning: "Union; the discipline of stilling the mind.",
    phonetic: "Yoh-ga",
    school: "Yoga",
    detail:
      "Root 'yuj' = to yoke or unite. The school that bridges Sāṃkhya metaphysics with practical meditative discipline.",
  },
  {
    id: 3,
    category: "Schools of Philosophy",
    sanskrit: "न्याय",
    roman: "Nyāya",
    meaning: "Logic, reasoning, the school of valid knowledge.",
    phonetic: "Nyaah-ya",
    school: "Nyāya",
    detail:
      "From 'ni-ī' = to lead into. The school of logical inference, epistemology, and valid argumentation.",
  },
  {
    id: 4,
    category: "Schools of Philosophy",
    sanskrit: "वैशेषिक",
    roman: "Vaiśeṣika",
    meaning: "The school of particularity and atomic theory.",
    phonetic: "Vai-sheh-shika",
    school: "Vaiśeṣika",
    detail:
      "From 'viśeṣa' = particular/specific. India's ancient atomistic philosophy.",
  },
  {
    id: 5,
    category: "Schools of Philosophy",
    sanskrit: "मीमांसा",
    roman: "Mīmāṃsā",
    meaning: "Investigation; the school of Vedic exegesis and ritual.",
    phonetic: "Mee-maam-saa",
    school: "Mīmāṃsā",
    detail:
      "From 'man' = to think deeply. The school devoted to interpreting and defending the Vedas.",
  },
  {
    id: 6,
    category: "Schools of Philosophy",
    sanskrit: "वेदान्त",
    roman: "Vedānta",
    meaning: "The end or culmination of the Vedas.",
    phonetic: "Veh-daan-ta",
    school: "Vedānta",
    detail:
      "'Veda' + 'anta' (end). The philosophical tradition rooted in the Upaniṣads, Brahma Sūtras, and Bhagavad Gītā.",
  },
  {
    id: 7,
    category: "Schools of Philosophy",
    sanskrit: "चार्वाक",
    roman: "Cārvāka",
    meaning: "The materialist school; 'sweet-worded'.",
    phonetic: "Chaar-vaa-ka",
    school: "Cārvāka",
    detail:
      "Also called Lokāyata. Rejects the supernatural; accepts only direct perception as valid knowledge.",
  },

  // ── Core Metaphysical Concepts ─────────────────────────────────────────────
  {
    id: 8,
    category: "Core Metaphysical Concepts",
    sanskrit: "ब्रह्म",
    roman: "Brahman",
    meaning: "The infinite, ultimate reality; the ground of all being.",
    phonetic: "Brah-man",
    school: "Vedānta",
    detail:
      "Not to be confused with Brahmā (the creator deity). 'Brah' = to grow/expand. Pure, infinite existence-consciousness-bliss (Sat-Cit-Ānanda).",
  },
  {
    id: 9,
    category: "Core Metaphysical Concepts",
    sanskrit: "आत्मन्",
    roman: "Ātman",
    meaning: "The individual self, soul, or pure consciousness.",
    phonetic: "Aat-man",
    school: "Vedānta",
    detail:
      "The innermost self behind body-mind. In Advaita, Ātman is non-different from Brahman.",
  },
  {
    id: 10,
    category: "Core Metaphysical Concepts",
    sanskrit: "पुरुष",
    roman: "Puruṣa",
    meaning: "Pure consciousness; the eternal witness.",
    phonetic: "Poo-ru-sha",
    school: "Sāṃkhya",
    detail:
      "In Sāṃkhya: the inactive, unchanging conscious principle. Distinct from Prakṛti (nature/matter).",
  },
  {
    id: 11,
    category: "Core Metaphysical Concepts",
    sanskrit: "प्रकृति",
    roman: "Prakṛti",
    meaning: "Nature; the primal, dynamic principle of matter.",
    phonetic: "Pra-kriti",
    school: "Sāṃkhya",
    detail:
      "The active, creative, evolving aspect of reality. Composed of three Guṇas. Contrasted with Puruṣa.",
  },
  {
    id: 12,
    category: "Core Metaphysical Concepts",
    sanskrit: "माया",
    roman: "Māyā",
    meaning:
      "Illusion; the cosmic power that makes Brahman appear as the world.",
    phonetic: "Maa-yaa",
    school: "Vedānta",
    detail:
      "Not 'mere illusion' but the inexplicable creative power (śakti) of Brahman. Neither real nor fully unreal.",
  },
  {
    id: 13,
    category: "Core Metaphysical Concepts",
    sanskrit: "जीव",
    roman: "Jīva",
    meaning: "The individual, embodied living soul.",
    phonetic: "Jee-va",
    school: "Jainism",
    detail:
      "In Jainism: the eternal soul seeking liberation from karma. In Vedānta: the individual self identified with ego.",
  },
  {
    id: 14,
    category: "Core Metaphysical Concepts",
    sanskrit: "अणु",
    roman: "Aṇu",
    meaning: "Atom; the indivisible unit of matter.",
    phonetic: "Anu",
    school: "Vaiśeṣika",
    detail:
      "Kaṇāda's atomic theory in the Vaiśeṣika school. The smallest, eternal, indivisible unit of physical reality.",
  },

  // ── Three Gunas ────────────────────────────────────────────────────────────
  {
    id: 15,
    category: "The Three Guṇas",
    sanskrit: "सत्त्व",
    roman: "Sattva",
    meaning: "Purity, clarity, luminosity, harmony.",
    phonetic: "Sat-va",
    school: "Sāṃkhya",
    detail:
      "The guṇa of lightness and clarity. Associated with knowledge, peace, and upward movement.",
  },
  {
    id: 16,
    category: "The Three Guṇas",
    sanskrit: "रजस्",
    roman: "Rajas",
    meaning: "Activity, passion, restlessness, dynamism.",
    phonetic: "Ra-jas",
    school: "Sāṃkhya",
    detail:
      "The guṇa of energy and motion. The animating force, associated with desire and action.",
  },
  {
    id: 17,
    category: "The Three Guṇas",
    sanskrit: "तमस्",
    roman: "Tamas",
    meaning: "Inertia, dullness, darkness, heaviness.",
    phonetic: "Ta-mas",
    school: "Sāṃkhya",
    detail:
      "The guṇa of heaviness and obscuration. Associated with sleep, confusion, and downward movement.",
  },

  // ── Epistemology ───────────────────────────────────────────────────────────
  {
    id: 18,
    category: "Epistemology (Valid Knowledge)",
    sanskrit: "प्रमाण",
    roman: "Pramāṇa",
    meaning: "A source or instrument of valid knowledge.",
    phonetic: "Pra-maa-na",
    school: "Nyāya",
    detail:
      "Nyāya accepts 4: Pratyakṣa (perception), Anumāna (inference), Upamāna (analogy), Śabda (testimony).",
  },
  {
    id: 19,
    category: "Epistemology (Valid Knowledge)",
    sanskrit: "प्रत्यक्ष",
    roman: "Pratyakṣa",
    meaning: "Direct perception; what is immediately sensed.",
    phonetic: "Pra-tyak-sha",
    school: "Nyāya",
    detail:
      "The most immediate pramāṇa, accepted by all schools. Cārvāka accepts ONLY this.",
  },
  {
    id: 20,
    category: "Epistemology (Valid Knowledge)",
    sanskrit: "अनुमान",
    roman: "Anumāna",
    meaning: "Inference; reasoning from evidence.",
    phonetic: "Anu-maa-na",
    school: "Nyāya",
    detail:
      "The classic example: 'The hill has fire, because it has smoke, like a kitchen.' A 5-step syllogism.",
  },
  {
    id: 21,
    category: "Epistemology (Valid Knowledge)",
    sanskrit: "शब्द",
    roman: "Śabda",
    meaning: "Verbal testimony; the authority of a reliable source.",
    phonetic: "Shab-da",
    school: "Mīmāṃsā",
    detail:
      "In Mīmāṃsā, the Vedas are the supreme, eternal, authorless (Apauruṣeyā) śabda pramāṇa.",
  },
  {
    id: 22,
    category: "Epistemology (Valid Knowledge)",
    sanskrit: "अनेकान्तवाद",
    roman: "Anekāntavāda",
    meaning: "The doctrine of many-sidedness of truth.",
    phonetic: "A-ne-kaan-ta-vaa-da",
    school: "Jainism",
    detail:
      "Jain epistemology: reality is complex; no single perspective can claim the whole truth. Each view is a 'syāt' (maybe).",
  },

  // ── Liberation ─────────────────────────────────────────────────────────────
  {
    id: 23,
    category: "Liberation & Ethics",
    sanskrit: "मोक्ष",
    roman: "Mokṣa",
    meaning: "Liberation; freedom from the cycle of birth and death.",
    phonetic: "Mok-sha",
    school: "Vedānta",
    detail:
      "The supreme goal across most Indian schools. In Advaita: recognition of Ātman = Brahman. In Jainism: the soul's ascent to Siddhaśilā.",
  },
  {
    id: 24,
    category: "Liberation & Ethics",
    sanskrit: "निर्वाण",
    roman: "Nirvāṇa",
    meaning: "Extinguishing; the blowing out of craving and suffering.",
    phonetic: "Nir-vaa-na",
    school: "Buddhism",
    detail:
      "Not annihilation, but the cessation of the fires of greed, hatred, and delusion. The unconditioned peace.",
  },
  {
    id: 25,
    category: "Liberation & Ethics",
    sanskrit: "कैवल्य",
    roman: "Kaivalya",
    meaning: "Aloneness; the isolation of pure consciousness.",
    phonetic: "Kai-val-ya",
    school: "Yoga",
    detail:
      "In Yoga/Sāṃkhya: the final state where Puruṣa rests in its own nature, free from Prakṛti.",
  },
  {
    id: 26,
    category: "Liberation & Ethics",
    sanskrit: "धर्म",
    roman: "Dharma",
    meaning: "Cosmic order, duty, righteousness, the law of reality.",
    phonetic: "Dhar-ma",
    school: "Mīmāṃsā",
    detail:
      "One of the most multifaceted terms. From 'dhṛ' = to uphold. Cosmic law as well as individual ethical duty.",
  },
  {
    id: 27,
    category: "Liberation & Ethics",
    sanskrit: "कर्म",
    roman: "Karma",
    meaning: "Action and its consequence; the law of cause and effect.",
    phonetic: "Kar-ma",
    school: "Jainism",
    detail:
      "In Jainism: actual physical particles that stick to the soul. In Yoga: the impressions (saṃskāras) that create rebirth.",
  },
  {
    id: 28,
    category: "Liberation & Ethics",
    sanskrit: "अहिंसा",
    roman: "Ahiṃsā",
    meaning: "Non-violence in thought, word, and action.",
    phonetic: "A-him-saa",
    school: "Jainism",
    detail:
      "The supreme Jain virtue: 'Ahiṃsā paramo dharmaḥ' — Non-violence is the highest dharma.",
  },

  // ── Sanskrit Roots ─────────────────────────────────────────────────────────
  {
    id: 29,
    category: "Buddhist Philosophy",
    sanskrit: "अनित्य",
    roman: "Anicca / Anitya",
    meaning: "Impermanence; nothing lasts forever.",
    phonetic: "A-ni-tya",
    school: "Buddhism",
    detail:
      "One of the three marks of existence in Buddhism. All conditioned phenomena are impermanent.",
  },
  {
    id: 30,
    category: "Buddhist Philosophy",
    sanskrit: "दुःख",
    roman: "Duḥkha",
    meaning: "Suffering, unsatisfactoriness, the ache of existence.",
    phonetic: "Duh-kha",
    school: "Buddhism",
    detail:
      "The first Noble Truth. 'Du' = difficult, 'kha' = space (of a wheel axle). Existence is 'a bad fit'.",
  },
  {
    id: 31,
    category: "Buddhist Philosophy",
    sanskrit: "अनात्मन्",
    roman: "Anattā / Anātman",
    meaning: "Non-self; there is no permanent, unchanging self.",
    phonetic: "An-aat-man",
    school: "Buddhism",
    detail:
      "Counter to the Ātman doctrine. What we call 'self' is five ever-changing aggregates (Skandhas).",
  },
  {
    id: 32,
    category: "Buddhist Philosophy",
    sanskrit: "शून्यता",
    roman: "Śūnyatā",
    meaning: "Emptiness; all phenomena are empty of inherent existence.",
    phonetic: "Shoon-ya-taa",
    school: "Buddhism",
    detail:
      "Nāgārjuna's Mādhyamika teaching: things exist only dependently, never from their own side.",
  },
  {
    id: 33,
    category: "Buddhist Philosophy",
    sanskrit: "तृष्णा",
    roman: "Taṇhā / Tṛṣṇā",
    meaning: "Thirst, craving; the cause of suffering.",
    phonetic: "Trish-naa",
    school: "Buddhism",
    detail:
      "The Second Noble Truth. Craving for sensory pleasure, for existence, and for non-existence.",
  },

  // ── Yoga Terms ─────────────────────────────────────────────────────────────
  {
    id: 34,
    category: "Yoga Philosophy",
    sanskrit: "चित्त",
    roman: "Citta",
    meaning: "The mind-stuff; the field of consciousness.",
    phonetic: "Chit-ta",
    school: "Yoga",
    detail:
      "In Patañjali's yoga, includes manas (sensory mind), buddhi (intellect), and ahaṃkāra (ego).",
  },
  {
    id: 35,
    category: "Yoga Philosophy",
    sanskrit: "वृत्ति",
    roman: "Vṛtti",
    meaning: "Fluctuations, modifications, or waves of the mind.",
    phonetic: "Vriti",
    school: "Yoga",
    detail:
      "Yoga is defined as 'Citta-vṛtti-nirodhaḥ' — the restraint of the fluctuations of the mind-field.",
  },
  {
    id: 36,
    category: "Yoga Philosophy",
    sanskrit: "समाधि",
    roman: "Samādhi",
    meaning: "Deep meditative absorption; the 8th limb of Yoga.",
    phonetic: "Sa-maa-dhi",
    school: "Yoga",
    detail:
      "The culminating state of meditation where the meditator, the act of meditation, and the object merge into one.",
  },
  {
    id: 37,
    category: "Yoga Philosophy",
    sanskrit: "प्राणायाम",
    roman: "Prāṇāyāma",
    meaning: "Breath regulation; expansion of the vital life-force.",
    phonetic: "Praa-naa-yaa-ma",
    school: "Yoga",
    detail:
      "The 4th of Patañjali's 8 limbs. 'Prāṇa' (life-force) + 'āyāma' (expansion/restraint).",
  },
  {
    id: 38,
    category: "Yoga Philosophy",
    sanskrit: "अष्टांग",
    roman: "Aṣṭāṅga",
    meaning: "Eight-limbed; Patañjali's eight-fold path of Yoga.",
    phonetic: "Ash-taan-ga",
    school: "Yoga",
    detail:
      "Yama, Niyama, Āsana, Prāṇāyāma, Pratyāhāra, Dhāraṇā, Dhyāna, Samādhi.",
  },
];

const categories = ["All", ...new Set(terms.map((t) => t.category))];
const schools = ["All Schools", ...new Set(terms.map((t) => t.school))];

// ─── Speaker Button ────────────────────────────────────────────────────────
const SpeakButton = ({ phonetic, roman, size = "md" }) => {
  const [speaking, setSpeaking] = useState(false);
  const [supported] = useState(() => "speechSynthesis" in window);

  const speak = useCallback(
    (e) => {
      e.stopPropagation();
      if (!supported || speaking) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phonetic || roman);
      utterance.rate = 0.72;
      utterance.pitch = 1.0;
      utterance.volume = 1;

      // Try to find an Indian English or English voice
      const voices = window.speechSynthesis.getVoices();
      const preferred =
        voices.find(
          (v) =>
            v.lang.startsWith("en-IN") ||
            v.lang.startsWith("hi") ||
            v.lang.startsWith("en-GB"),
        ) || voices.find((v) => v.lang.startsWith("en"));
      if (preferred) utterance.voice = preferred;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utterance);
    },
    [phonetic, roman, speaking, supported],
  );

  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  if (!supported) return null;

  return (
    <motion.button
      onClick={speak}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.92 }}
      title={`Pronounce: ${roman}`}
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0
        ${
          speaking
            ? "bg-violet-500 text-white shadow-[0_0_16px_rgba(139,92,246,0.6)]"
            : "bg-violet-100 dark:bg-violet-500/15 text-violet-600 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-500/30"
        }`}
    >
      <AnimatePresence mode="wait">
        {speaking ? (
          <motion.div
            key="speaking"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-0.5"
          >
            {[0, 0.1, 0.2].map((d, i) => (
              <motion.div
                key={i}
                className="w-0.5 bg-white rounded-full"
                animate={{ height: [4, 10, 4] }}
                transition={{ duration: 0.5, delay: d, repeat: Infinity }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          >
            <SpeakerWaveIcon
              className={
                size === "sm"
                  ? "w-3.5 h-3.5"
                  : size === "lg"
                    ? "w-5 h-5"
                    : "w-4 h-4"
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// ─── Term Card ─────────────────────────────────────────────────────────────
const TermCard = ({ term, onClick, isExpanded }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    whileHover={!isExpanded ? { y: -3 } : {}}
    onClick={() => onClick(term)}
    className={`cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden
      ${
        isExpanded
          ? "bg-violet-50 dark:bg-violet-500/10 border-violet-400 dark:border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.15)]"
          : "bg-white dark:bg-slate-900/70 border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-500/40 hover:shadow-lg"
      }`}
  >
    <div className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Sanskrit + Roman */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-2xl font-serif text-slate-800 dark:text-slate-100">
              {term.sanskrit}
            </span>
            <span className="text-slate-400 dark:text-slate-600 text-sm">
              ·
            </span>
            <span className="text-base font-medium text-violet-700 dark:text-violet-400 font-serif italic">
              {term.roman}
            </span>
          </div>
          {/* Meaning */}
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {term.meaning}
          </p>
        </div>
        {/* Speaker */}
        <SpeakButton phonetic={term.phonetic} roman={term.roman} size="md" />
      </div>

      {/* School badge */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
          {term.school}
        </span>
        <span className="text-[10px] text-violet-500 font-medium">
          {isExpanded ? "▲ less" : "▼ more"}
        </span>
      </div>
    </div>

    {/* Expanded detail */}
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 border-t border-violet-200 dark:border-violet-500/20 pt-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpenIcon className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {term.detail}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-slate-400">Pronounce as:</span>
                  <code className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md">
                    {term.phonetic}
                  </code>
                  <SpeakButton
                    phonetic={term.phonetic}
                    roman={term.roman}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ─── Hero Pronunciation Banner ─────────────────────────────────────────────
const HeroSoundBar = () => {
  const featured = [
    {
      sanskrit: "ॐ",
      roman: "Om",
      phonetic: "Aum",
      desc: "The primordial sound",
    },
    { sanskrit: "सत्यम्", roman: "Satyam", phonetic: "Sat-yam", desc: "Truth" },
    {
      sanskrit: "शिवम्",
      roman: "Śivam",
      phonetic: "Shi-vam",
      desc: "Auspiciousness",
    },
    {
      sanskrit: "सुन्दरम्",
      roman: "Sundaram",
      phonetic: "Sun-da-ram",
      desc: "Beauty",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 my-8">
      {featured.map((f) => (
        <motion.div
          key={f.roman}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: featured.indexOf(f) * 0.1 }}
          className="flex flex-col items-center gap-2 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm border border-violet-200 dark:border-violet-500/20 rounded-2xl px-6 py-4 min-w-[110px]"
        >
          <span className="text-3xl font-serif text-slate-800 dark:text-slate-100">
            {f.sanskrit}
          </span>
          <span className="text-sm font-serif italic text-violet-600 dark:text-violet-400">
            {f.roman}
          </span>
          <span className="text-xs text-slate-400">{f.desc}</span>
          <SpeakButton phonetic={f.phonetic} roman={f.roman} size="sm" />
        </motion.div>
      ))}
    </div>
  );
};

// ─── Main Page ─────────────────────────────────────────────────────────────
const SanskritGuide = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSchool, setActiveSchool] = useState("All Schools");
  const [expandedId, setExpandedId] = useState(null);

  const handleCardClick = (term) =>
    setExpandedId((prev) => (prev === term.id ? null : term.id));

  const filtered = terms.filter((t) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      t.roman.toLowerCase().includes(q) ||
      t.meaning.toLowerCase().includes(q) ||
      t.sanskrit.includes(q) ||
      t.phonetic.toLowerCase().includes(q);
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSchool =
      activeSchool === "All Schools" || t.school === activeSchool;
    return matchSearch && matchCat && matchSchool;
  });

  // Group by category for display
  const grouped = categories
    .filter((c) => c !== "All")
    .map((cat) => ({
      category: cat,
      items: filtered.filter((t) => t.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="min-h-screen bg-[#f8f6ff] dark:bg-[#07060e] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans">
      <ScrollToTop />

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-100/70 to-transparent dark:from-violet-950/40 dark:to-transparent pointer-events-none" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-violet-400/8 rounded-full blur-[120px] pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 9, repeat: Infinity }}
        />

        <div className="relative container mx-auto px-6 pt-24 pb-8 text-center max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-violet-600 dark:text-violet-400 text-xs font-mono tracking-[0.4em] uppercase mb-4"
          >
            ✦ Interactive Audio Guide ✦
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-serif text-slate-900 dark:text-white mb-4"
          >
            Sanskrit
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500 dark:from-violet-400 dark:to-indigo-400">
              {" "}
              Pronunciation
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-2"
          >
            Click the{" "}
            <span className="inline-flex items-center gap-1 mx-1 px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 text-sm font-medium">
              <SpeakerWaveIcon className="w-3.5 h-3.5" /> speaker
            </span>{" "}
            icon next to any term to hear its correct pronunciation.
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-500 dark:text-slate-500 text-sm mb-6"
          >
            {terms.length} terms across {categories.length - 1} categories
          </motion.p>

          {/* Quick-play featured terms */}
          <HeroSoundBar />
        </div>
      </div>

      {/* ── Search & Filters ─────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-5xl mb-10">
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-lg">
          {/* Search */}
          <div className="relative mb-4">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search terms, meanings, phonetics…"
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 text-sm focus:outline-none focus:border-violet-400 dark:focus:border-violet-500 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center hover:bg-slate-300 transition-colors"
              >
                <XMarkIcon className="w-3 h-3 text-slate-500" />
              </button>
            )}
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-xs text-slate-400 self-center mr-1 font-mono tracking-wider uppercase">
              Category:
            </span>
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
                  ${
                    activeCategory === c
                      ? "bg-violet-600 border-violet-600 text-white"
                      : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-400"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* School filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-slate-400 self-center mr-1 font-mono tracking-wider uppercase">
              School:
            </span>
            {schools.map((s) => (
              <button
                key={s}
                onClick={() => setActiveSchool(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all
                  ${
                    activeSchool === s
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-400"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Results Count ─────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-5xl mb-6 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-violet-600 dark:text-violet-400">
            {filtered.length}
          </span>{" "}
          terms
          {search && (
            <>
              {" "}
              for "<span className="italic">{search}</span>"
            </>
          )}
        </p>
        {expandedId && (
          <button
            onClick={() => setExpandedId(null)}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
          >
            <XMarkIcon className="w-3.5 h-3.5" /> Collapse all
          </button>
        )}
      </div>

      {/* ── Terms Grid ────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-5xl pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-slate-500 text-lg">
              No terms found for "{search}"
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
                setActiveSchool("All Schools");
              }}
              className="mt-4 text-violet-600 dark:text-violet-400 text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : activeCategory !== "All" ? (
          // Flat view when category selected
          <motion.div layout className="grid md:grid-cols-2 gap-4">
            <AnimatePresence>
              {filtered.map((term) => (
                <TermCard
                  key={term.id}
                  term={term}
                  onClick={handleCardClick}
                  isExpanded={expandedId === term.id}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // Grouped view by category
          <div className="space-y-12">
            {grouped.map((group, gi) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: gi * 0.05 }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="text-xl font-serif text-slate-800 dark:text-slate-200 font-semibold whitespace-nowrap">
                    {group.category}
                  </h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-violet-300/50 to-transparent dark:from-violet-500/20" />
                  <span className="text-xs text-slate-400 font-mono">
                    {group.items.length} terms
                  </span>
                </div>
                {/* Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {group.items.map((term) => (
                      <TermCard
                        key={term.id}
                        term={term}
                        onClick={handleCardClick}
                        isExpanded={expandedId === term.id}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── Browser Support Note ─────────────────────────── */}
      <div className="container mx-auto px-6 max-w-5xl pb-12 text-center">
        <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <SpeakerWaveIcon className="w-3.5 h-3.5" />
          Pronunciation uses your browser's Text-to-Speech engine. For best
          results, use Chrome or Edge.
        </p>
      </div>

      {/* ── Back Link ───────────────────────────────────────── */}
      <div className="container mx-auto px-6 pb-16 text-center">
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors text-sm"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to Explore
        </Link>
      </div>
    </div>
  );
};

export default SanskritGuide;

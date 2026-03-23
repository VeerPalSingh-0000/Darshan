import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import kapilaImg from "../Schools-images/kapila.png";
import purushaImg from "../Schools-images/purusha.png";
import prakritiImg from "../Schools-images/prakriti.png";

const SamkhyaPage = () => {
  const [activeTattva, setActiveTattva] = useState(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const tattvas = [
    {
      name: "Puruṣa",
      desc: "Pure Consciousness. The silent, eternal witness. It is neither produced nor does it produce.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Prakṛti",
      desc: "Primordial Matter. The unmanifest root cause of the universe. It is productive but unproduced.",
      color: "from-pink-500 to-rose-400",
    },
    {
      name: "Mahat / Buddhi",
      desc: "Cosmic Intellect / Intelligence. The first evolute of Prakriti. It possesses the capacity for decision and cognition.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Ahaṃkāra",
      desc: "Ego / I-consciousness. The principle of individuation. It creates the illusion of a separate 'self'.",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Manas",
      desc: "The Central Mind. It synthesizes sensory data and directs the organs of action.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "5 Jñānendriyas",
      desc: "The sensory organs: Eyes (Sight), Ears (Hearing), Nose (Smell), Tongue (Taste), Skin (Touch).",
      color: "from-lime-500 to-green-500",
    },
    {
      name: "5 Karmendriyas",
      desc: "The organs of action: Hands (Grasping), Feet (Walking), Speech, Excretory, Reproductive.",
      color: "from-red-500 to-pink-600",
    },
    {
      name: "5 Tanmātras",
      desc: "The subtle elements: Sound, Touch, Form/Color, Taste, and Smell.",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "5 Mahābhūtas",
      desc: "The gross elements: Akasha (Space), Vayu (Air), Agni (Fire), Jala (Water), Prithvi (Earth).",
      color: "from-yellow-600 to-amber-700",
    },
  ];

  return (
    <div className="bg-[#fdfbf7] dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-amber-500/30">
      <ScrollToTop />

      {/* Hero Section */}
      <motion.section
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={kapilaImg}
            alt="Sage Kapila in meditation"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fdfbf7] via-[#fdfbf7]/80 to-transparent dark:from-[#0b0f19] dark:via-[#0b0f19]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              Founded by Sage Kapila
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6 drop-shadow-sm"
          >
            Sāṃkhya
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Philosophy of Absolute Dualism
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "There is no knowledge equal to Sāṃkhya, and no power equal to
              Yoga." <br /> — Mahabharata (Shanti Parva)
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Discover the Cosmos
          </span>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Introduction to Duality */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#0a0f1e] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm text-cyan-600 dark:text-cyan-500 font-bold tracking-[0.3em] uppercase mb-4">
                The Great Divide
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                Two Eternal Realities
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Consider everything you experience: your thoughts, the stars,
                your physical body, the concepts of time and space. Sāṃkhya, the
                oldest of the six orthodox (Astika) schools of Hindu philosophy,
                boldly declares that all of this belongs to only{" "}
                <strong>one half</strong> of reality.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                The universe is an interplay of two fundamentally distinct,
                eternal, and irreducible principles. This uncompromising dualism
                is the radical core of Sāṃkhya.
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-slate-800">
              <div className="absolute inset-0 flex">
                <div className="relative w-1/2 h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center border-r border-slate-300 dark:border-slate-800/50 group/purusha overflow-hidden">
                  <img
                    src={purushaImg}
                    alt="Purusha"
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover/purusha:opacity-60 transition-opacity duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="relative z-10 text-2xl md:text-3xl font-serif text-blue-600 dark:text-blue-400 tracking-[0.2em] md:tracking-[0.4em] drop-shadow-2xl">
                    PURUṢA
                  </span>
                </div>
                <div className="relative w-1/2 h-full bg-slate-200 dark:bg-slate-900 flex items-center justify-center group/prakriti overflow-hidden">
                  <img
                    src={prakritiImg}
                    alt="Prakriti"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/prakriti:opacity-80 transition-opacity duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="relative z-10 text-2xl md:text-3xl font-serif text-amber-600 dark:text-amber-500 tracking-[0.2em] md:tracking-[0.4em] drop-shadow-2xl">
                    PRAKṚTI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Purusha & Prakriti Deep Dive */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-sm text-amber-600 dark:text-amber-500 font-bold tracking-[0.3em] uppercase mb-4">
              The Pillars of Existence
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white">
              Puruṣa &amp; Prakṛti
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              variants={fadeIn}
              className="group relative bg-slate-100 dark:bg-[#131b2f] p-10 md:p-14 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500/50 transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-500"></div>
              <h4 className="text-4xl font-serif text-blue-600 dark:text-blue-400 mb-2">
                Puruṣa
              </h4>
              <p className="text-slate-500 font-mono text-sm uppercase mb-8 tracking-widest">
                The Silent Witness
              </p>
              <ul className="space-y-6 text-slate-700 dark:text-slate-300 text-lg">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                  <p>
                    <strong>Pure Consciousness:</strong> Puruṣa is sentient but
                    possesses no attributes, form, or activity. It is the
                    ultimate "I am".
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                  <p>
                    <strong>Plurality of Souls:</strong> Unlike Advaita Vedanta
                    which posits one universal soul, Sāṃkhya insists on a{" "}
                    <em>plurality</em> of Puruṣas because beings are born, live,
                    and die differently.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 shrink-0"></div>
                  <p>
                    <strong>Complete Inaction:</strong> It acts like a crystal
                    reflecting a colored flower; it seems to take on the
                    emotions of the mind, but remains eternally pristine and
                    untouched.
                  </p>
                </li>
              </ul>
            </motion.div>
            <motion.div
              variants={fadeIn}
              className="group relative bg-slate-100 dark:bg-[#131b2f] p-10 md:p-14 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] group-hover:bg-amber-500/10 transition-colors duration-500"></div>
              <h4 className="text-4xl font-serif text-amber-600 dark:text-amber-500 mb-2">
                Prakṛti
              </h4>
              <p className="text-slate-500 font-mono text-sm uppercase mb-8 tracking-widest">
                The Primal Nature
              </p>
              <ul className="space-y-6 text-slate-700 dark:text-slate-300 text-lg">
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0"></div>
                  <p>
                    <strong>Unconscious Matter:</strong> Prakṛti lacks
                    consciousness but contains infinite potential energy. It is
                    the unmanifest (Avyakta) source of the physical universe,
                    psychology, and intellect.
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0"></div>
                  <p>
                    <strong>The Teleological Dance:</strong> Why does Prakṛti
                    evolve? Sāṃkhya states it evolves{" "}
                    <em>for the sake of Puruṣa</em>—to provide experience
                    (Bhoga) and eventual liberation (Apavarga).
                  </p>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2.5 shrink-0"></div>
                  <p>
                    <strong>The Three Guṇas:</strong> Prakṛti consists of three
                    interwoven threads (Gunas). Before creation, they are in
                    perfect equilibrium. The mere proximity of Puruṣa disrupts
                    this harmony, triggering the Big Bang of Sāṃkhyan evolution.
                  </p>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        {/* The 3 Gunas */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#0a0f1e] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 text-center">
              The Triad of the Guṇas
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-slate-100 dark:bg-[#111827]/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 dark:border-t-white/10 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-slate-600 dark:bg-white shadow-[0_0_10px_#fff]"></div>
                </div>
                <h3 className="text-2xl font-serif text-slate-800 dark:text-white mb-4">
                  Sattva
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  The principle of light, clarity, harmony, and intelligence. It
                  produces happiness, illumination, and upward movement (like
                  the leaping of a flame).
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-[#111827]/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 dark:border-t-red-500/20 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]"></div>
                </div>
                <h3 className="text-2xl font-serif text-red-600 dark:text-red-500 mb-4">
                  Rajas
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  The principle of energy, passion, action, and motion. It
                  produces suffering, restlessness, and lateral movement (like
                  the blowing of wind).
                </p>
              </div>
              <div className="bg-slate-100 dark:bg-[#111827]/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-6">
                  <div className="w-4 h-4 rounded-full bg-slate-500 dark:bg-slate-950"></div>
                </div>
                <h3 className="text-2xl font-serif text-slate-500 dark:text-slate-400 mb-4">
                  Tamas
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  The principle of darkness, inertia, ignorance, and heaviness.
                  It produces apathy, delusion, and downward movement (like the
                  falling of a rock).
                </p>
              </div>
            </div>
            <p className="mt-12 text-center text-slate-500 italic max-w-3xl mx-auto">
              "Like a lamp functioning through the cooperation of flame, oil,
              and wick, the Gunas cooperate to produce the manifest universe
              despite their opposing natures."
            </p>
          </div>
        </motion.section>

        {/* The 25 Tattvas */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              The 25 Tattvas Configuration
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              How does the entire cosmos cascade from a single point of
              unmanifest matter? Explore the evolutionary timeline (Sarga).
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {tattvas.map((tattva, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activeTattva === index ? "bg-amber-50 dark:bg-slate-800/80 border-amber-500 dark:border-slate-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700"}`}
                  onClick={() =>
                    setActiveTattva(index === activeTattva ? null : index)
                  }
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-serif text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 dark:text-slate-600 font-mono text-sm mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {tattva.name}
                    </h4>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${activeTattva === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activeTattva === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-amber-500/50 ml-2 py-1">
                          {tattva.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32 h-[600px] bg-slate-50 dark:bg-[#0d1323] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activeTattva === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-slate-300 dark:border-slate-700 rounded-full flex items-center justify-center mb-6 animate-[spin_10s_linear_infinite]">
                    <div className="w-3 h-3 bg-slate-400 rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Chain of Evolution
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a Tattva from the list to reveal its position in the
                    cosmic cascade.
                  </p>
                </div>
              ) : (
                <motion.div
                  key={activeTattva}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10"
                >
                  <div
                    className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${tattvas[activeTattva].color} flex items-center justify-center mb-8 shadow-lg opacity-90 blur-[2px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-5xl font-serif text-slate-900 dark:text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                      {tattvas[activeTattva].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0d1323]/80 p-4 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-800">
                    {tattvas[activeTattva].desc}
                  </p>
                </motion.div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"></div>
            </div>
          </div>
        </motion.section>

        {/* Epistemology */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-sm text-fuchsia-600 dark:text-fuchsia-500 font-bold tracking-[0.3em] uppercase mb-4">
              Epistemology
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white">
              How Do We Know?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto">
              Sāṃkhya accepts only three reliable sources of valid knowledge
              (Pramāṇas), ruthlessly applying logic to deconstruct the universe.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Pratyakṣa",
                sub: "DIRECT PERCEPTION",
                desc: "Knowledge acquired through direct contact of the sense organs with the objects of the world. It must be definite and undeniable.",
              },
              {
                num: "02",
                title: "Anumāna",
                sub: "LOGICAL INFERENCE",
                desc: "Knowledge derived from reasoning based on prior perception. (e.g., Inferring the existence of unseen fire because there is smoke).",
              },
              {
                num: "03",
                title: "Śabda",
                sub: "RELIABLE TESTIMONY",
                desc: "Knowledge from the verbal testimony or texts of reliable, enlightened individuals who possess direct insight (Apta-vakya) and the Vedas.",
              },
            ].map((item) => (
              <div
                key={item.num}
                className="bg-white dark:bg-[#111827] p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
              >
                <div className="text-fuchsia-500 font-serif text-5xl mb-4 opacity-50">
                  {item.num}
                </div>
                <h4 className="text-2xl text-slate-800 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-slate-500 font-semibold mb-4 text-sm">
                  {item.sub}
                </p>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Liberation */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl border border-blue-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Kaivalya: The Ultimate Freedom
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            According to Sāṃkhya, all suffering is merely the consequence of an
            optical illusion. The pure, eternal Puruṣa mistakenly identifies
            itself with the changing, suffering Intellect (Buddhi).
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Liberation is not ascending to a heaven, but attaining{" "}
            <strong>विवेक-ख्याति (Viveka-Khyati)</strong> — the razor-sharp
            discriminative knowledge that "I am consciousness, not matter." When
            the intellect realizes this, Prakṛti ceases her dance for that soul.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Continue Exploring
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default SamkhyaPage;

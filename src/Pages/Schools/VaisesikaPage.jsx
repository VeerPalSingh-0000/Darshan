import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import vaisesikaImg from "../Schools-images/vaisesika_hero.png";

const VaisesikaPage = () => {
  const [activePadartha, setActivePadartha] = useState(null);

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

  const padarthas = [
    {
      name: "Dravya",
      desc: "Substance. The substratum of qualities and actions. There are 9: Earth, Water, Fire, Air, Ether, Time, Space, Self, and Mind.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Guṇa",
      desc: "Quality. The static attributes of a substance. There are 24 recognized qualities like color, taste, weight, etc.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Karma",
      desc: "Action or Motion. The dynamic element of reality. Divided into five types: upward, downward, contraction, expansion, and locomotion.",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Sāmānya",
      desc: "Generality. The common essence that makes several things belong to a single class (e.g., 'Cowness' in all cows).",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Viśeṣa",
      desc: "Particularity. The unique individuality of basic atoms and souls that distinguishes them from everything else.",
      color: "from-rose-500 to-pink-500",
    },
    {
      name: "Samavāya",
      desc: "Inherence. The inseparable relationship between two things (e.g., the relationship between a cloth and its threads).",
      color: "from-red-500 to-rose-600",
    },
    {
      name: "Abhāva",
      desc: "Non-existence. The reality of 'absence'. Vaisesika recognizes that what IS NOT is as important as what IS (e.g., the absence of a pot).",
      color: "from-slate-600 to-slate-800",
    },
  ];

  return (
    <div className="bg-[#f5f3ff] dark:bg-[#0c0c14] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-purple-500/30">
      <ScrollToTop />

      {/* Hero */}
      <motion.section
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={vaisesikaImg}
            alt="Sage Kanada and the atoms of the universe"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f5f3ff] via-[#f5f3ff]/80 to-transparent dark:from-[#0c0c14] dark:via-[#0c0c14]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
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
            <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-400 text-sm font-semibold tracking-widest uppercase">
              Founded by Sage Kaṇāda
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6"
          >
            Vaiśeṣika
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Philosophy of Atomism and Particulars
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "The universe is constructed of eternal atoms, and liberation is
              the understanding of their true nature." <br /> — Kaṇāda Sūtra
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Map the Universe
          </span>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Introduction */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#070e1a] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm text-purple-600 dark:text-purple-500 font-bold tracking-[0.3em] uppercase mb-4">
                The First Physicists
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                Anu: The Indivisible Point
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Long before modern science, Sage Kaṇāda proposed that the
                physical world is composed of eternal, indivisible atoms called{" "}
                <strong>Aṇu</strong>. Vaiśeṣika is a pluralist realism that
                tries to categorize everything in the universe into fundamental
                particulars.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                By understanding the 'particularity' (Viśeṣa) of each basic
                entity, the school aims to give a complete metaphysical map of
                reality, allowing the seeker to distinguish the eternal self
                from temporary atomic configurations.
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0c0c14] flex items-center justify-center p-8">
              <div className="relative w-64 h-64 flex items-center justify-center">
                {[...Array(24)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-500/40 rounded-full"
                    animate={{
                      x: [
                        Math.cos(i * 15) * 100,
                        Math.cos(i * 15 + Math.PI) * 120,
                        Math.cos(i * 15) * 100,
                      ],
                      y: [
                        Math.sin(i * 15) * 100,
                        Math.sin(i * 15 + Math.PI) * 80,
                        Math.sin(i * 15) * 100,
                      ],
                      opacity: [0.2, 0.6, 0.2],
                    }}
                    transition={{
                      duration: 10 + (i % 5),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <motion.div
                    className="w-3 h-3 bg-purple-500 dark:bg-white rounded-full shadow-[0_0_20px_#a855f7] mb-6"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-3xl font-serif text-purple-600 dark:text-purple-400 tracking-[0.3em] uppercase drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                    Viśeṣa
                  </span>
                  <span className="text-sm font-serif text-purple-500/40 tracking-[0.5em] mt-2">
                    विशेष
                  </span>
                </div>
                <div className="absolute w-40 h-40 border border-purple-500/10 rounded-full animate-[ping_4s_infinite]"></div>
                <div className="absolute w-72 h-72 border border-blue-500/5 rounded-full animate-[spin_30s_linear_infinite]"></div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 7 Padarthas */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              The 7 Padārthas
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Everything that exists and is knowable can be placed in one of
              these seven fundamental categories.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {padarthas.map((padartha, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activePadartha === index ? "bg-purple-50 dark:bg-slate-800/80 border-purple-500 dark:border-purple-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  onClick={() =>
                    setActivePadartha(index === activePadartha ? null : index)
                  }
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-serif text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 dark:text-slate-600 font-mono text-sm mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {padartha.name}
                    </h4>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activePadartha === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activePadartha === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-purple-500/50 ml-2 py-1">
                          {padartha.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32 h-[550px] bg-slate-50 dark:bg-[#0d1323] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activePadartha === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-purple-600 dark:border-purple-700 rounded-full flex items-center justify-center mb-6 animate-[pulse_5s_infinite]">
                    <div className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Taxonomy of Reality
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a category to see how Vaiśeṣika organizes the
                    components of the manifest world.
                  </p>
                </div>
              ) : (
                <motion.div
                  key={activePadartha}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10"
                >
                  <div
                    className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${padarthas[activePadartha].color} mb-8 shadow-lg opacity-80 blur-[2px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-5xl font-serif text-slate-900 dark:text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                      {padarthas[activePadartha].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0d1323]/90 p-6 rounded-xl backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
                    {padarthas[activePadartha].desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Elements */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#0a0a12] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 text-center">
            The Eternal Dravyas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Earth", "Water", "Fire", "Air", "Ether"].map((el, i) => (
              <div
                key={i}
                className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 text-center hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]"></div>
                </div>
                <span className="text-slate-800 dark:text-white font-serif">
                  {el}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-slate-500 italic max-w-3xl mx-auto">
            "These elements, along with Time, Space, Self, and Mind, form the
            complete inventory of the substances from which the universe is
            built."
          </p>
        </motion.section>

        {/* Liberation */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-3xl border border-purple-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-rose-500"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Nihśreyasa: The Final Cessation
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            In Vaiśeṣika, liberation is the absolute cessation of all pain. This
            is achieved through <strong>Tattva-jñāna</strong> — the true
            knowledge of the seven categories.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            When the soul realizes it is distinct from atoms, mind, and body, it
            stops performing actions that lead to rebirth. The 'particularity'
            of the soul is finally understood, and it remains in its own pure,
            attribute-less state.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Return to Exploration
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default VaisesikaPage;

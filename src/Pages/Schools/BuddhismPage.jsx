import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import buddhismImg from "../Schools-images/buddhism_hero.png";

const BuddhismPage = () => {
  const [activeTruth, setActiveTruth] = useState(null);

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

  const truths = [
    {
      name: "Duḥkha",
      desc: "The Truth of Suffering. Life inherently involves dissatisfaction, pain, and transience. To live is to experience disharmony.",
      color: "from-slate-600 to-slate-800",
    },
    {
      name: "Samudaya",
      desc: "The Origin of Suffering. Suffering arises from 'Taṇhā' (craving) and attachment, rooted in ignorance (Avijjā) of the true nature of reality.",
      color: "from-amber-600 to-orange-500",
    },
    {
      name: "Nirodha",
      desc: "The Cessation of Suffering. It is possible to end suffering by letting go of attachment and craving. This state is Nirvāṇa.",
      color: "from-emerald-500 to-teal-400",
    },
    {
      name: "Magga",
      desc: "The Path to Cessation. The Eight-fold Path (Right View, Resolve, Speech, Action, Livelihood, Effort, Mindfulness, and Samadhi).",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Anicca",
      desc: "Impermanence. Everything that arises must pass away. Nothing in the manifest world is permanent or fixed.",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "Anattā",
      desc: "Non-Self. There is no permanent, unchanging 'soul' or 'self'. We are a collection of changing aggregates (Skandhas).",
      color: "from-rose-500 to-red-400",
    },
    {
      name: "Pratītyasamutpāda",
      desc: "Dependent Origination. Everything arises in dependence upon causes and conditions. Nothing exists in isolation.",
      color: "from-indigo-500 to-blue-600",
    },
  ];

  return (
    <div className="bg-[#fefce8] dark:bg-[#05080a] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-amber-500/30">
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
            src={buddhismImg}
            alt="The Buddha under the Bodhi tree"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fefce8] via-[#fefce8]/80 to-transparent dark:from-[#05080a] dark:via-[#05080a]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[140px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[140px]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          />
        </div>
        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-sm font-semibold tracking-widest uppercase">
              The Enlightened One
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6"
          >
            Buddhism
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Middle Way to Liberation
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "Thousands of candles can be lighted from a single candle, and the
              life of the candle will not be shortened. Happiness never
              decreases by being shared." <br /> — The Buddha
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Walk the Path
          </span>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Introduction */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#080c14] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm text-amber-600 dark:text-amber-500 font-bold tracking-[0.3em] uppercase mb-4">
                The Great Awakening
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                Liberation from the Wheel
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Buddhism is a path of spiritual practice and social reform that
                emerged in the 6th century BCE. At its heart is a simple,
                revolutionary insight:{" "}
                <strong>suffering is not an inevitable fate</strong>, but a
                process that can be understood and dismantled.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                By seeing through the illusion of a permanent 'self' and
                recognizing the radical interdependence of all things, we can
                attain Nirvāṇa — the extinguishing of the fires of greed,
                hatred, and delusion.
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a0c10] flex items-center justify-center p-12">
              <div className="relative w-64 h-64">
                <motion.div
                  className="absolute inset-0 border-[1px] border-amber-500/20 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-32 bg-amber-500/10 origin-bottom"
                      style={{
                        transform: `rotate(${i * 45}deg)`,
                        transformOrigin: "bottom center",
                      }}
                    ></div>
                  ))}
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-serif text-amber-600 dark:text-amber-500 tracking-[0.2em] uppercase">
                    Dharma Chakra
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4 Noble Truths */}
        <motion.section
          className="mb-32 bg-white dark:bg-slate-950/40 p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 text-center">
            The Four Noble Truths
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Dukkha", desc: "Suffering is real and universal." },
              { title: "Samudaya", desc: "Suffering has a cause: Craving." },
              { title: "Nirodha", desc: "Suffering can be overcome." },
              { title: "Magga", desc: "The Eightfold Path leads to the end." },
            ].map((t, i) => (
              <div
                key={i}
                className="p-8 bg-slate-50 dark:bg-[#0a0c10] rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/30 transition-colors"
              >
                <h3 className="text-2xl font-serif text-amber-600 dark:text-amber-500 mb-4">
                  {t.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Core Wisdom */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              The Wisdom of Emptiness
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore the core insights that deconstruct our identification with
              the transient world.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {truths.map((truth, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activeTruth === index ? "bg-amber-50 dark:bg-slate-800/80 border-amber-500 dark:border-amber-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  onClick={() =>
                    setActiveTruth(index === activeTruth ? null : index)
                  }
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-serif text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 dark:text-slate-600 font-mono text-sm mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {truth.name}
                    </h4>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeTruth === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activeTruth === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-amber-500/50 ml-2 py-1">
                          {truth.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32 h-[550px] bg-slate-50 dark:bg-[#0c0e12] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activeTruth === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-amber-600 dark:border-amber-700 rounded-full flex items-center justify-center mb-6 animate-[ping_4s_infinite]">
                    <div className="w-2 h-2 bg-amber-500 dark:bg-amber-400 rounded-full shadow-[0_0_15px_#f59e0b]"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Void of Light
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a principle to see how it contributes to the
                    deconstruction of suffering.
                  </p>
                </div>
              ) : (
                <motion.div
                  key={activeTruth}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10"
                >
                  <div
                    className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${truths[activeTruth].color} mb-8 shadow-lg opacity-70 blur-[2px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-5xl font-serif text-slate-900 dark:text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                      {truths[activeTruth].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0c0e12]/90 p-8 rounded-xl backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
                    {truths[activeTruth].desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Nirvana */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-amber-100 to-blue-100 dark:from-amber-900/20 dark:to-blue-900/20 rounded-3xl border border-amber-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-white to-blue-500"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Nirvāṇa: The Unconditioned Reality
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Nirvāṇa is not an afterlife or a heaven. It is the 'blowing out' of
            the fires of greed, hatred, and delusion. It is the peace that
            remains when all clinging has ceased.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Beyond language, beyond concept, beyond the reach of
            suffering—Nirvāṇa is the ultimate freedom. It is the realization of
            the unconditioned state, where the mind is perfectly still, open,
            and luminous.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Continue the Quietness
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default BuddhismPage;

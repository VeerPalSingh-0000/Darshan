import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import jainismImg from "../Schools-images/jainism_hero.png";

const JainismPage = () => {
  const [activeVow, setActiveVow] = useState(null);

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

  const vows = [
    {
      name: "Ahiṃsā",
      desc: "Non-violence in thought, word, and deed. It is the highest dharma (Ahimsa Paramo Dharma).",
      color: "from-emerald-500 to-green-400",
    },
    {
      name: "Satya",
      desc: "Truthfulness. Always speaking the truth in a way that is harmless and compassionate.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Asteya",
      desc: "Non-stealing. Not taking anything that is not given, and not desiring what belongs to others.",
      color: "from-amber-500 to-yellow-400",
    },
    {
      name: "Brahmacarya",
      desc: "Chastity or Sexual Restraint. Conserving vital energy for spiritual pursuit.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      name: "Aparigraha",
      desc: "Non-possessiveness. Detachment from material wealth and internal attachments.",
      color: "from-slate-500 to-slate-700",
    },
    {
      name: "Anekāntavāda",
      desc: "Many-sidedness. The recognition that truth and reality are multi-faceted and complex.",
      color: "from-rose-500 to-pink-500",
    },
    {
      name: "Syādvāda",
      desc: "The theory of conditioned predication. Every statement is true only from a certain perspective (the 'maybe' logic).",
      color: "from-teal-500 to-cyan-500",
    },
  ];

  return (
    <div className="bg-[#f0fdf4] dark:bg-[#0a0f0a] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-emerald-500/30">
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
            src={jainismImg}
            alt="Lord Mahavira in meditation"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0fdf4] via-[#f0fdf4]/80 to-transparent dark:from-[#0a0f0a] dark:via-[#0a0f0a]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[140px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[140px]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
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
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase">
              Path of the Tīrthaṅkaras
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6"
          >
            Jainism
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Path of Absolute Compassion
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "Live and let live. Love all, serve all." <br /> — Lord Mahavira
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Embrace the All
          </span>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Introduction */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#081014] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm text-emerald-600 dark:text-emerald-500 font-bold tracking-[0.3em] uppercase mb-4">
                The Eternal Dharma
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                Harmlessness Supreme
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Jainism is one of the world's oldest religions, emphasizing
                total non-violence (Ahiṃsā) and the multi-dimensional nature of
                truth. It teaches that every living being, from a microscopic
                organism to a human, has an eternal soul (Jīva) seeking
                liberation.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                By shedding the karmic particles that weigh the soul down
                through ethical living and self-discipline, one can attain
                Kevala Jñāna—perfect knowledge—and transcend the cycle of
                rebirth forever.
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(16,185,129,0.1)] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0c140c] flex items-center justify-center p-12">
              <div className="group relative">
                <motion.div
                  className="w-48 h-48 border-2 border-emerald-500/30 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <div className="absolute -top-2 left-1/2 w-4 h-4 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]"></div>
                </motion.div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-serif text-emerald-600 dark:text-white opacity-40">
                    अहिंसा
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vows & Philosophy */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              The Path of Purification
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Through the Five Vows and the recognition of multifaceted truth,
              the Jain path leads to absolute clarity.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {vows.map((vow, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activeVow === index ? "bg-emerald-50 dark:bg-slate-800/80 border-emerald-500 dark:border-emerald-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  onClick={() =>
                    setActiveVow(index === activeVow ? null : index)
                  }
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-serif text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 dark:text-slate-600 font-mono text-sm mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {vow.name}
                    </h4>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeVow === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activeVow === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-emerald-500/50 ml-2 py-1">
                          {vow.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32 h-[550px] bg-slate-50 dark:bg-[#0c140c] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activeVow === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-emerald-600 dark:border-emerald-700 rounded-full flex items-center justify-center mb-6 animate-[pulse_4s_infinite]">
                    <div className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full shadow-[0_0_15px_#10b981]"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Crystal of Truth
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a principle to explore the depth of Jain ethics and
                    epistemology.
                  </p>
                </div>
              ) : (
                <motion.div
                  key={activeVow}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10"
                >
                  <div
                    className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${vows[activeVow].color} mb-8 shadow-lg opacity-80 blur-[2px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-5xl font-serif text-slate-900 dark:text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                      {vows[activeVow].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0c140c]/90 p-8 rounded-xl backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
                    {vows[activeVow].desc}
                  </p>
                </motion.div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"></div>
            </div>
          </div>
        </motion.section>

        {/* Liberation */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-3xl border border-emerald-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-green-500 to-white"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Mokṣa: The Ascent to Perfection
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Mokṣa is the liberation of the soul from the bondage of Karma. In
            Jainism, Karma is not just a law of consequence, but physical
            particles (Pudgala) that stick to the soul.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Through Right Faith, Right Knowledge, and Right Conduct (the Triple
            Gems), the soul prevents new karma from entering (Saṃvara) and burns
            away existing karma (Nirjarā). The liberated soul then ascends to{" "}
            <strong>Siddhaśilā</strong>—the apex of the universe—where it
            resides eternally in infinite knowledge, power, and bliss.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Continue the Path
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default JainismPage;

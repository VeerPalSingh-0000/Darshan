import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import BackToPhilosophy from "../../Components/BackToPhilosophy";
import nyayaImg from "../Schools-images/nyaya_hero.png";

const NyayaPage = () => {
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
      name: "Pramāṇa",
      desc: "The valid means of knowledge: Perception, Inference, Comparison, and Testimony.",
      color: "from-teal-500 to-cyan-400",
    },
    {
      name: "Prameya",
      desc: "The objects of valid knowledge: Self, body, senses, mind, and the external world.",
      color: "from-rose-500 to-pink-400",
    },
    {
      name: "Saṃśaya",
      desc: "Doubt. The initial state of uncertainty that triggers a logical inquiry.",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Prayojana",
      desc: "Purpose. The motive or aim behind undertaking a logical investigation.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Dṛṣṭānta",
      desc: "Example. A familiar case used to illustrate a general principle in an argument.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Siddhānta",
      desc: "Doctrine. An established tenet or conclusion accepted as true by the school.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Avayava",
      desc: "Syllogism. The five steps of a Nyaya argument: Proposition, Reason, Example, Application, Conclusion.",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "Tarka",
      desc: "Hypothetical Reasoning. Re-evaluating an argument to strengthen its logical basis.",
      color: "from-red-500 to-rose-600",
    },
    {
      name: "Nirṇaya",
      desc: "Certainty. The final determination of truth after examining all doubts and evidence.",
      color: "from-lime-500 to-green-500",
    },
  ];

  const pramanas = [
    {
      title: "Pratyakṣa",
      sub: "Direct Perception",
      color: "text-teal-600 dark:text-teal-400",
      hover: "hover:border-teal-400 dark:hover:border-teal-500/50",
      desc: "Knowledge that arises from the contact of sense organs with their objects. It must be non-erroneous (Avyabhicāri) and definite (Vyavasāyātmaka).",
    },
    {
      title: "Anumāna",
      sub: "Inference",
      color: "text-amber-600 dark:text-amber-500",
      hover: "hover:border-amber-400 dark:hover:border-amber-500/50",
      desc: "Reaching a conclusion based on a logical sign (Liṅga) or reason (Hetu). It follows the famous five-member syllogism.",
    },
    {
      title: "Upamāna",
      sub: "Comparison / Analogy",
      color: "text-purple-600 dark:text-purple-400",
      hover: "hover:border-purple-400 dark:hover:border-purple-500/50",
      desc: "Knowledge of an object based on its similarity to a known object. It is the process of learning through comparative attributes.",
    },
    {
      title: "Śabda",
      sub: "Verbal Testimony",
      color: "text-rose-600 dark:text-rose-400",
      hover: "hover:border-rose-400 dark:hover:border-rose-500/50",
      desc: "Knowledge acquired from the words of a reliable person (Āpta). This includes both the testimony of trustworthy individuals and the Vedas.",
    },
  ];

  const syllogism = [
    {
      num: "1.",
      title: "Pratijñā (Proposition)",
      desc: '"The mountain has fire."',
    },
    { num: "2.", title: "Hetu (Reason)", desc: '"Because it has smoke."' },
    {
      num: "3.",
      title: "Udāharaṇa (Example)",
      desc: '"Whatever has smoke has fire, e.g., a kitchen hearth."',
    },
    {
      num: "4.",
      title: "Upanaya (Application)",
      desc: '"This mountain is similarly smoky."',
    },
    {
      num: "5.",
      title: "Nigamana (Conclusion)",
      desc: '"Therefore, this mountain has fire."',
    },
  ];

  return (
    <div className="bg-[#f0fdfa] dark:bg-[#060b10] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-teal-500/30">
      <ScrollToTop /> <BackToPhilosophy />
      {/* Hero */}
      <motion.section
        className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute inset-0 z-0">
          <img
            src={nyayaImg}
            alt="Sage Gautama with the lamp of logic"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0fdfa] via-[#f0fdfa]/80 to-transparent dark:from-[#060b10] dark:via-[#060b10]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]"
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
            <span className="px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-400 text-sm font-semibold tracking-widest uppercase">
              Founded by Sage Gautama
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6"
          >
            Nyāya
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Path of Logical Realism
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "Valid knowledge is the torch that illuminates the darkness of
              ignorance." <br /> — Nyāya Sutras
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Illuminate the Truth
          </span>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.section>
      <div className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Introduction */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#08101a] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm text-amber-600 dark:text-amber-500 font-bold tracking-[0.3em] uppercase mb-4">
                The Science of Reasoning
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                From Doubt to Certainty
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Nyāya is the school of logical realism. It asserts that the
                world exists independently of our minds, and we can know it
                truly through rigorous logical methods. For the Nyāyika,
                philosophy is not mere speculation; it is the{" "}
                <strong>science of valid inquiry</strong>.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                By masterfully dissecting the process of thinking, Nyāya
                provides the tools to distinguish truth from error, leading the
                soul from the bondage of false knowledge to the light of
                liberation.
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-72 h-72 border border-teal-500/10 rounded-full animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 group">
                    <div className="w-4 h-4 bg-teal-500 rounded-full shadow-[0_0_15px_#14b8a6]"></div>
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] text-teal-500 font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      PRATYAKṢA
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-56 h-56 border border-amber-500/10 rounded-full animate-[spin_15s_linear_reverse_infinite]">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 group">
                    <div className="w-4 h-4 bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b]"></div>
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[10px] text-amber-500 font-mono tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      ANUMĀNA
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <motion.div
                  className="w-24 h-24 border border-teal-500/30 rounded-full flex items-center justify-center mb-4"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-4xl font-serif text-slate-400 dark:text-white opacity-20">
                    ज्ञान
                  </span>
                </motion.div>
                <span className="text-4xl font-serif text-teal-600 dark:text-teal-400 tracking-[0.2em] uppercase drop-shadow-[0_0_20px_rgba(20,184,166,0.5)]">
                  Nirṇaya
                </span>
                <span className="text-sm font-serif text-teal-500/40 tracking-[0.5em] mt-2">
                  निर्णय
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Pramanas */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="text-center mb-16">
            <h2 className="text-sm text-teal-600 dark:text-teal-500 font-bold tracking-[0.3em] uppercase mb-4">
              The Four Pramāṇas
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white">
              The Mirrors of Truth
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {pramanas.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className={`bg-slate-50 dark:bg-[#131b2f] p-10 md:p-14 rounded-3xl border border-slate-200 dark:border-slate-800 ${p.hover} transition-colors duration-500`}
              >
                <h4 className={`text-4xl font-serif ${p.color} mb-2`}>
                  {p.title}
                </h4>
                <p className="text-slate-500 font-mono text-sm uppercase mb-8 tracking-widest">
                  {p.sub}
                </p>
                <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 16 Padarthas */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              The 16 Logical Categories
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Nyāya outlines 16 categories of reality and logic (Padārthas) that
              lead to the attainment of truth and the cessation of pain.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {padarthas.map((padartha, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activePadartha === index ? "bg-teal-50 dark:bg-slate-800/80 border-teal-500 dark:border-teal-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
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
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-teal-500/50 ml-2 py-1">
                          {padartha.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
              <div className="p-4 text-center text-slate-500 italic">
                ... and 7 others: Jalpa (Wrangling), Vitaṇḍā (Cavil), Hetvābhāsa
                (Fallacy), etc.
              </div>
            </div>
            <div className="sticky top-32 h-[500px] bg-slate-50 dark:bg-[#0d1323] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activePadartha === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-teal-600 dark:border-teal-700 rounded-full flex items-center justify-center mb-6 animate-[pulse_3s_infinite]">
                    <div className="w-3 h-3 bg-teal-500 dark:bg-teal-400 rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Anatomy of a Debate
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a category to see its role in the Nyāya system of
                    logical verification.
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
                    className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${padarthas[activePadartha].color} flex items-center justify-center mb-8 shadow-lg opacity-90 blur-[2px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-5xl font-serif text-slate-900 dark:text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.3)]">
                      {padarthas[activePadartha].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0d1323]/80 p-4 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-800">
                    {padarthas[activePadartha].desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Syllogism */}
        <motion.section
          className="mb-32 bg-white dark:bg-slate-950 p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 text-center">
            The Nyāya Syllogism
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {syllogism.map((s, i) => (
              <div key={i} className="flex gap-6 items-start">
                <span className="text-teal-600 dark:text-teal-500 font-mono text-xl pt-1">
                  {s.num}
                </span>
                <div>
                  <h4 className="text-xl text-slate-800 dark:text-white font-serif mb-2">
                    {s.title}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Liberation */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-teal-100 to-blue-100 dark:from-teal-900/20 dark:to-blue-900/20 rounded-3xl border border-teal-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Apavarga: The End of Suffering
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            For Nyāya, the root of all pain is <strong>Mithyā-jñāna</strong>{" "}
            (False Knowledge). We suffer because we misunderstand the nature of
            the self and the world.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Liberation (Apavarga) is attained by replacement of false knowledge
            with <strong>Tattva-jñāna</strong> (Knowledge of Reality). When we
            truly know the 16 categories, the faults of attraction and repulsion
            cease, rebirth stops, and the soul resides in absolute, painless
            tranquility.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Continue the Inquiry
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default NyayaPage;

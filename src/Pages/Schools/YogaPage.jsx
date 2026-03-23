import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import yogaImg from "../Schools-images/yoga_hero.png";

const YogaPage = () => {
  const [activeLimb, setActiveLimb] = useState(null);

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

  const limbs = [
    {
      name: "Yama",
      desc: "Ethical restraints: Non-violence (Ahimsa), Truthfulness (Satya), Non-stealing (Asteya), Continence (Brahmacharya), Non-possessiveness (Aparigraha).",
      color: "from-emerald-500 to-teal-400",
    },
    {
      name: "Niyama",
      desc: "Individual observances: Purity (Saucha), Contentment (Santosha), Austerity (Tapas), Self-study (Svadhyaya), Surrender (Ishvara-pranidhana).",
      color: "from-blue-500 to-cyan-400",
    },
    {
      name: "Āsana",
      desc: "'Sthira-sukham-asanam' — Posture should be steady and comfortable. It prepares the body for meditation.",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Prāṇāyāma",
      desc: "Breath control. The regulation of vital energy (Prana) through conscious breathing patterns.",
      color: "from-rose-500 to-pink-500",
    },
    {
      name: "Pratyāhāra",
      desc: "Withdrawal of the senses. Drawing the attention away from external distractions and turning it inward.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Dhāraṇā",
      desc: "Concentration. Fixing the mind on a single point or object without deviation.",
      color: "from-violet-500 to-fuchsia-500",
    },
    {
      name: "Dhyāna",
      desc: "Meditation. An uninterrupted flow of consciousness toward the object of meditation.",
      color: "from-indigo-600 to-blue-700",
    },
    {
      name: "Samādhi",
      desc: "Absolute Absorption. The state where the meditator and the object of meditation become one. The ultimate goal.",
      color: "from-yellow-400 to-amber-600",
    },
  ];

  return (
    <div className="bg-[#f0f9ff] dark:bg-[#050b14] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-emerald-500/30">
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
            src={yogaImg}
            alt="Yogi in deep meditation"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#f0f9ff] via-[#f0f9ff]/80 to-transparent dark:from-[#050b14] dark:via-[#050b14]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, delay: 1 }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeIn} className="mb-6 flex justify-center">
            <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              Systematized by Sage Patañjali
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6 drop-shadow-sm"
          >
            Yoga
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Science of Stilling the Mind
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "Yogaś citta-vṛtti-nirodhaḥ." — The restraint of the modifications
              of the mind-stuff is Yoga. <br /> — Yoga Sutras I.2
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Still the Mind
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
              <h2 className="text-sm text-emerald-600 dark:text-emerald-500 font-bold tracking-[0.3em] uppercase mb-4">
                The Inner Journey
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                Beyond the Fluctuations
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Most philosophies attempt to understand the mind; Yoga seeks to{" "}
                <strong>master</strong> it. It defines the mind as an ocean with
                constant waves (Vṛttis). When the waves are still, the observer
                (Puruṣa) can finally see its own true reflection.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Yoga is a practical, scientific psychology that leads to the
                direct realization of pure awareness. It is the art of
                disconnecting from the mechanical world and reconnecting with
                the eternal 'I'.
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1221] flex items-center justify-center">
              <div className="relative w-72 h-72">
                <motion.div
                  className="absolute inset-0 border-2 border-emerald-500/20 rounded-full"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 border-2 border-emerald-500/30 rounded-full"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                />
                <motion.div
                  className="absolute inset-8 border-2 border-emerald-400/50 rounded-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-serif text-emerald-500 dark:text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">
                    ॐ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* The 8 Limbs Interactive */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              The Aṣṭāṅga Path
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The Eight Limbs of Yoga provide an integrated blueprint for
              living, breathing, and expanding into infinite consciousness.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {limbs.map((limb, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activeLimb === index ? "bg-emerald-50 dark:bg-slate-800/80 border-emerald-500 dark:border-emerald-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700"}`}
                  onClick={() =>
                    setActiveLimb(index === activeLimb ? null : index)
                  }
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-serif text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 dark:text-slate-600 font-mono text-sm mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {limb.name}
                    </h4>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${activeLimb === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activeLimb === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-emerald-500/50 ml-2 py-1">
                          {limb.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32 h-[550px] bg-slate-50 dark:bg-[#0d1323] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activeLimb === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-emerald-600 dark:border-emerald-700 rounded-full flex items-center justify-center mb-6 animate-[spin_12s_linear_infinite]">
                    <div className="w-3 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Infinite Ladder
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a limb to understand how it transforms the body,
                    breath, and mind.
                  </p>
                </div>
              ) : (
                <motion.div
                  key={activeLimb}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10"
                >
                  <div
                    className={`w-36 h-36 mx-auto rounded-full bg-gradient-to-br ${limbs[activeLimb].color} flex items-center justify-center mb-8 shadow-lg opacity-80 blur-[1px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-5xl font-serif text-slate-900 dark:text-white drop-shadow-[0_5px_8px_rgba(0,0,0,0.3)]">
                      {limbs[activeLimb].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0d1323]/90 p-6 rounded-xl backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
                    {limbs[activeLimb].desc}
                  </p>
                </motion.div>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"></div>
            </div>
          </div>
        </motion.section>

        {/* Kriya Yoga */}
        <motion.section
          className="mb-32 bg-white dark:bg-gradient-to-br dark:from-[#0f172a] dark:to-[#050b14] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 text-center">
            Kriyā Yoga: Stillness in Action
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tapas",
                color: "text-amber-600 dark:text-amber-500",
                border: "border-amber-200 dark:border-amber-500/20",
                desc: "Heat or Austerity. The disciplined fire that purifies the body and mind, burning away impurities and developing will-power.",
              },
              {
                title: "Svādhyāya",
                color: "text-blue-600 dark:text-blue-400",
                border: "border-blue-200 dark:border-blue-500/20",
                desc: "Self-study. The regular study of sacred texts and the constant observation of one's own thoughts and actions.",
              },
              {
                title: "Īśvara-praṇidhāna",
                color: "text-emerald-600 dark:text-emerald-400",
                border: "border-emerald-200 dark:border-emerald-500/20",
                desc: "Surrender. The letting go of the ego's control and dedicating the fruits of one's actions to the Supreme Consciousness.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-slate-50 dark:bg-[#111827]/80 p-8 rounded-2xl border-t-2 ${item.border}`}
              >
                <h3 className={`text-2xl font-serif ${item.color} mb-4`}>
                  {item.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Kaivalya */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-emerald-100 to-blue-100 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-3xl border border-emerald-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Kaivalya: The Radiant Solitude
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            In Yoga, freedom is called <strong>Kaivalya</strong> — the isolation
            of Puruṣa from the field of Prakṛti. It is not an escape from life,
            but the attainment of an unclouded vision where awareness rests in
            its own nature.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            When the mind is perfectly still, the illusion of being the 'body'
            or the 'doer' dissolves. The soul remains, in its absolute,
            non-attached existential glory — free, eternal, and blissfully
            aware.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Continue the Journey
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default YogaPage;

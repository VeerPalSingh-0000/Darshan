import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import vedantaImg from "../Schools-images/vedanta_hero.png";

const VedantaPage = () => {
  const [activeConcept, setActiveConcept] = useState(null);

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

  const concepts = [
    {
      name: "Brahman",
      desc: "The Ultimate Reality. The unchanging, infinite, and immanent substratum of all existence. It is Sat-Chit-Ananda (Truth-Consciousness-Bliss).",
      color: "from-orange-500 to-amber-400",
    },
    {
      name: "Ātman",
      desc: "The Individual Soul or Self. In Advaita, the Atman is ultimately identical to Brahman. It is the silent witness within.",
      color: "from-blue-500 to-indigo-400",
    },
    {
      name: "Māyā",
      desc: "The Illusion. The creative power that makes the non-dual Brahman appear as a world of multiplicity. It is neither real nor unreal (Anirvacanīya).",
      color: "from-emerald-500 to-teal-400",
    },
    {
      name: "Avidyā",
      desc: "Ignorance. The lack of true knowledge that causes the Soul to misidentify itself with the body and mind.",
      color: "from-slate-600 to-slate-800",
    },
    {
      name: "Adhyāsa",
      desc: "Superimposition. The process by which we project the qualities of one thing onto another (e.g., seeing a snake in a rope).",
      color: "from-purple-500 to-fuchsia-500",
    },
    {
      name: "Mahāvākyas",
      desc: "The Great Sayings from the Upanishads, such as 'Tat Tvam Asi' (That Thou Art), declaring the unity of the self and the absolute.",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="bg-[#fff7ed] dark:bg-[#0a060f] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-orange-500/30">
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
            src={vedantaImg}
            alt="The vast ocean of consciousness"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fff7ed] via-[#fff7ed]/80 to-transparent dark:from-[#0a060f] dark:via-[#0a060f]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px]"
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
            <span className="px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400 text-sm font-semibold tracking-widest uppercase">
              Culmination of the Vedas
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6"
          >
            Vedānta
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Ultimate Non-Dual Reality
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "Brahman is the only reality, the world is an appearance, and the
              soul is none other than Brahman." <br /> — Vivekachudamani
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Awaken to the One
          </span>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Introduction - Advaita section */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#0c0a1a] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm text-orange-600 dark:text-orange-500 font-bold tracking-[0.3em] uppercase mb-4">
                The End of Knowledge
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                Advaita: Not Two
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Vedānta (literally 'the end of the Vedas') is the most
                influential of the Hindu schools. It asks a radical question:
                What if the division between you and the universe is an
                illusion?
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Advaita (non-dualism), championed by Adi Shankaracharya,
                declares that the individual soul (Ātman) and the ultimate
                reality (Brahman) are <strong>absolutely identical</strong>. The
                apparent multiplicity of the world is the result of cosmic
                illusion (Māyā).
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(0,0,0,0.6)] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#09060d] flex items-center justify-center">
              {/* Advaita animation */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-orange-400/20"
                    style={{
                      width: `${120 + i * 60}px`,
                      height: `${120 + i * 60}px`,
                    }}
                    animate={{
                      rotate: i % 2 === 0 ? 360 : -360,
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 15 + i * 5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.15)_0%,transparent_70%)]"
                  animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative z-10 text-center">
                  <span className="text-6xl font-serif text-orange-600 dark:text-orange-400 tracking-[0.2em] drop-shadow-[0_0_30px_rgba(249,115,22,0.4)]">
                    अद्वैत
                  </span>
                  <p className="mt-4 text-xs tracking-[0.6em] text-orange-500/60 uppercase font-bold">
                    Not Two
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Core Concepts */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              Core Concepts
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Explore the foundational ideas that map the path from ignorance to
              the recognition of the one, undivided reality.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {concepts.map((concept, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activeConcept === index ? "bg-orange-50 dark:bg-slate-800/80 border-orange-500 dark:border-orange-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  onClick={() =>
                    setActiveConcept(index === activeConcept ? null : index)
                  }
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-serif text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 dark:text-slate-600 font-mono text-sm mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {concept.name}
                    </h4>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeConcept === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activeConcept === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-orange-500/50 ml-2 py-1">
                          {concept.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32 h-[550px] bg-slate-50 dark:bg-[#0d1323] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activeConcept === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-orange-600 dark:border-orange-700 rounded-full flex items-center justify-center mb-6 animate-[pulse_4s_infinite]">
                    <div className="w-2 h-2 bg-orange-500 dark:bg-orange-400 rounded-full shadow-[0_0_15px_#f97316]"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Mirror of the Absolute
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a concept to peer into the heart of Vedāntic
                    non-duality.
                  </p>
                </div>
              ) : (
                <motion.div
                  key={activeConcept}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10"
                >
                  <div
                    className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${concepts[activeConcept].color} mb-8 shadow-lg opacity-80 blur-[2px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-5xl font-serif text-slate-900 dark:text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.3)]">
                      {concepts[activeConcept].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0d1323]/90 p-6 rounded-xl backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
                    {concepts[activeConcept].desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Sub-schools */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#0c0a1a] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 text-center">
            The Schools of Vedānta
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Advaita",
                founder: "Śaṅkarācārya",
                color: "text-orange-600 dark:text-orange-400",
                border: "border-orange-200 dark:border-orange-500/20",
                bg: "bg-orange-50 dark:bg-[#111827]/80",
                desc: "Non-dualism. Brahman alone is real; the world and individuality are ultimately illusory.",
              },
              {
                title: "Viśiṣṭādvaita",
                founder: "Rāmānujācārya",
                color: "text-blue-600 dark:text-blue-400",
                border: "border-blue-200 dark:border-blue-500/20",
                bg: "bg-blue-50 dark:bg-[#111827]/80",
                desc: "Qualified non-dualism. The world and souls are real but they are modes or attributes of Brahman.",
              },
              {
                title: "Dvaita",
                founder: "Madhvācārya",
                color: "text-emerald-600 dark:text-emerald-400",
                border: "border-emerald-200 dark:border-emerald-500/20",
                bg: "bg-emerald-50 dark:bg-[#111827]/80",
                desc: "Dualism. God (Vishnu) and souls are eternally distinct. Liberation is nearness, not merger, with God.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className={`${s.bg} p-8 rounded-2xl border-t-2 ${s.border}`}
              >
                <h3 className={`text-2xl font-serif ${s.color} mb-2`}>
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm mb-4 font-mono">
                  — {s.founder}
                </p>
                <p className="text-slate-600 dark:text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Liberation */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-orange-100 to-indigo-100 dark:from-orange-900/20 dark:to-indigo-900/20 rounded-3xl border border-orange-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-indigo-500"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Mokṣa: The Dissolution of Division
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Mokṣa in Vedānta is not a place to go to, but an error to be
            corrected. The ego's belief in its own separateness from the whole
            of existence is the fundamental delusion.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            When true knowledge (Jñāna) arises and superimposition is dissolved,
            the individual realizes what was always already the case:{" "}
            <strong>Aham Brahmāsmi</strong> — I am Brahman.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Return to the One
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default VedantaPage;

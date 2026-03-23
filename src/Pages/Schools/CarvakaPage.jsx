import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import ScrollToTop from "../../Components/ScrollToTop";
import carvakaImg from "../Schools-images/carvaka_hero.png";

const CarvakaPage = () => {
  const [activeTenet, setActiveTenet] = useState(null);

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

  const tenets = [
    {
      name: "Pratyakṣa-eka-pramāṇa",
      desc: "Perception is the ONLY source of valid knowledge. Inference and testimony are unreliable as they cannot be independently verified.",
      color: "from-orange-500 to-red-500",
    },
    {
      name: "Dehātmavāda",
      desc: "The soul is nothing but the body itself characterized by consciousness. There is no soul separate from the body.",
      color: "from-amber-500 to-yellow-500",
    },
    {
      name: "Bhūta-caitanya",
      desc: "Consciousness is a byproduct of the combination of the four material elements, just as the intoxicating power of wine arises from fermentation.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Nāsti Parolokaḥ",
      desc: "There is no other world, no heaven, and no hell. Death is the final end of existence.",
      color: "from-slate-600 to-slate-800",
    },
    {
      name: "Artha & Kāma",
      desc: "Material wealth and sensory pleasure are the only real goals of human life. Rituals are for the benefit of the priesthood.",
      color: "from-rose-500 to-pink-500",
    },
  ];

  return (
    <div className="bg-[#fff1f2] dark:bg-[#120805] text-slate-800 dark:text-slate-200 transition-colors duration-300 font-sans selection:bg-rose-500/30">
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
            src={carvakaImg}
            alt="The sensory joy of earthly life"
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fff1f2] via-[#fff1f2]/80 to-transparent dark:from-[#120805] dark:via-[#120805]/80 dark:to-transparent"></div>
          <motion.div
            className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-rose-500/10 rounded-full blur-[130px]"
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[130px]"
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
            <span className="px-4 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm font-semibold tracking-widest uppercase">
              Founded by Brihaspati
            </span>
          </motion.div>
          <motion.h1
            variants={fadeIn}
            className="text-6xl md:text-8xl lg:text-9xl font-serif tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-500 mb-6"
          >
            Cārvāka
          </motion.h1>
          <motion.p
            variants={fadeIn}
            className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 font-light tracking-wide mb-12"
          >
            The Radiant Materialism
          </motion.p>
          <motion.div variants={fadeIn}>
            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto font-serif italic">
              "While life remains, let a man live happily, let him feed on ghee
              even though he runs in debt." <br /> — Sarvasiddhanta Samgraha
            </p>
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm tracking-widest uppercase">
            Live in the Now
          </span>
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </motion.section>

      <div className="container mx-auto px-6 py-24 max-w-6xl">
        {/* Introduction */}
        <motion.section
          className="mb-32 bg-white dark:bg-[#1a0c0a] p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm text-rose-600 dark:text-rose-500 font-bold tracking-[0.3em] uppercase mb-4">
                The Earthly Path
              </h2>
              <h3 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-8 leading-tight">
                Matter is the Source
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Cārvāka is the radical materialist school of Indian philosophy.
                It rejects everything that cannot be perceived—God, the soul,
                and the afterlife. For the Cārvāka, the world is not a mystical
                illusion but a tangible reality to be enjoyed.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                Known as Lokāyata (prevalent among the people), this school
                emphasizes that consciousness is a property of matter and that
                the only valid aim of life is to maximize happiness and minimize
                pain here and now.
              </p>
            </div>
            <div className="relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl dark:shadow-[0_0_50px_rgba(244,63,94,0.1)] border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d0705] flex items-center justify-center p-12">
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-orange-500/20 rounded-full blur-sm"
                    initial={{
                      opacity: 0,
                      y: 400,
                      x: Math.random() * 400 - 200,
                      rotate: 0,
                    }}
                    animate={{
                      opacity: [0, 0.4, 0],
                      y: -100,
                      x: (Math.random() - 0.5) * 400,
                      rotate: 360,
                    }}
                    transition={{
                      duration: 5 + Math.random() * 5,
                      repeat: Infinity,
                      delay: i * 0.5,
                      ease: "linear",
                    }}
                  />
                ))}
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.15)_0%,transparent_70%)]"
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <motion.div
                    className="w-24 h-24 border border-rose-500/30 rounded-full flex items-center justify-center"
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
                        className="absolute top-0 left-1/2 w-1 h-3 bg-rose-500/40 origin-bottom"
                        style={{
                          transform: `rotate(${i * 45}deg) translateY(-40px)`,
                        }}
                      ></div>
                    ))}
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center text-rose-500 dark:text-rose-400">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                </div>
                <span className="text-6xl md:text-8xl font-serif text-slate-700 dark:text-white tracking-[0.2em] drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]">
                  सुख
                </span>
                <p className="mt-4 text-xs tracking-[0.6em] text-rose-600 dark:text-rose-500/60 uppercase font-bold">
                  Joy of the Present
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4 Elements */}
        <motion.section
          className="mb-32 bg-white dark:bg-slate-950/50 p-10 md:p-16 rounded-[40px] border border-slate-200 dark:border-slate-800/80 shadow-xl dark:shadow-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-16 text-center">
            The Four Real Elements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Earth (Pṛthivī)",
              "Water (Ap)",
              "Fire (Tejas)",
              "Air (Vāyu)",
            ].map((el, i) => (
              <div
                key={i}
                className="p-8 bg-slate-50 dark:bg-[#0a0505] rounded-2xl border border-slate-200 dark:border-slate-800 text-center hover:border-rose-400 dark:hover:border-rose-500/30 transition-colors"
              >
                <span className="text-xl font-serif text-rose-600 dark:text-rose-500 mb-2 block">
                  {el}
                </span>
                <p className="text-slate-500 text-xs uppercase tracking-widest mt-4">
                  Perceptible
                </p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-slate-500 italic max-w-3xl mx-auto">
            "Ether is rejected because it is not an object of perception. Only
            that which we can touch, see, and sense is real."
          </p>
        </motion.section>

        {/* Tenets */}
        <motion.section
          className="mb-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeIn}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
              The Radical Realism
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              How Cārvāka deconstructs supernatural claims and grounds reality
              in the physical.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-3">
              {tenets.map((tenet, index) => (
                <motion.div
                  key={index}
                  className={`p-5 rounded-xl cursor-pointer border transition-all duration-300 ${activeTenet === index ? "bg-rose-50 dark:bg-slate-800/80 border-rose-500 dark:border-rose-600 shadow-lg" : "bg-white dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                  onClick={() =>
                    setActiveTenet(index === activeTenet ? null : index)
                  }
                  whileHover={{ x: 5 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-serif text-slate-800 dark:text-slate-200">
                      <span className="text-slate-400 dark:text-slate-600 font-mono text-sm mr-4">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {tenet.name}
                    </h4>
                    <ChevronDownIcon
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${activeTenet === index ? "rotate-180" : ""}`}
                    />
                  </div>
                  <AnimatePresence>
                    {activeTenet === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed pl-10 border-l-2 border-rose-500/50 ml-2 py-1">
                          {tenet.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="sticky top-32 h-[500px] bg-slate-50 dark:bg-[#0d0705] rounded-3xl border border-slate-200 dark:border-slate-800 hidden lg:flex items-center justify-center p-8 flex-col relative overflow-hidden shadow-xl dark:shadow-2xl">
              {activeTenet === null ? (
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto border border-rose-600 dark:border-rose-700 rounded-full flex items-center justify-center mb-6 animate-[pulse_4s_infinite]">
                    <div className="w-2 h-2 bg-rose-500 dark:bg-rose-400 rounded-full shadow-[0_0_15px_#f43f5e]"></div>
                  </div>
                  <h3 className="text-2xl font-serif text-slate-700 dark:text-slate-300 mb-2">
                    The Lamp of the Body
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Select a tenet to see how Cārvāka interprets the phenomenon
                    of life and consciousness.
                  </p>
                </div>
              ) : (
                <motion.div
                  key={activeTenet}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center z-10"
                >
                  <div
                    className={`w-40 h-40 mx-auto rounded-full bg-gradient-to-br ${tenets[activeTenet].color} mb-8 shadow-lg opacity-80 blur-[2px]`}
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <h3 className="text-4xl font-serif text-slate-900 dark:text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                      {tenets[activeTenet].name}
                    </h3>
                  </div>
                  <p className="text-xl text-slate-700 dark:text-slate-300 max-w-md mx-auto mt-24 leading-relaxed bg-white/90 dark:bg-[#0d0705]/90 p-8 rounded-xl backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl">
                    {tenets[activeTenet].desc}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.section>

        {/* Conclusion */}
        <motion.section
          className="relative py-20 px-8 md:px-16 bg-gradient-to-r from-rose-100 to-orange-100 dark:from-rose-900/20 dark:to-orange-900/20 rounded-3xl border border-rose-200 dark:border-slate-700/50 text-center overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"></div>
          <h2 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6">
            Death is Liberation
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            For Cārvāka, there is no need to seek liberation from life.
            Liberation is the natural end of life itself.
          </p>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            "Bhasmībhūtasya dehasya punāragamanaṃ kutaḥ" — When the body is
            reduced to ashes, how can it ever return? Enjoy this life while you
            have it, live with integrity and joy, for the only meaning of
            existence is the experience of the present moment.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-8 py-4 rounded-full hover:bg-slate-700 dark:hover:bg-slate-200 transition-colors shadow-lg"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Return to the World
          </Link>
        </motion.section>
      </div>
    </div>
  );
};

export default CarvakaPage;

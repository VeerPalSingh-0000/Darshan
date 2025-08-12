import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you'll have a back button

// ================================================================================
// Main Component to be exported
// ================================================================================
const VaisesikaPage = () => {
  // Animation Variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="bg-[#F8F5F2] text-slate-800 font-sans">
      {/* Hero Section */}
      <motion.section 
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center text-white text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1532187863486-abf9db50b7d3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGF0b21zJTIwYWJzdHJhY3R8ZW58MHx8MHx8fDA%3D" 
            alt="Abstract representation of atoms and particles"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
        <motion.div className="relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-5xl md:text-8xl font-serif tracking-wider uppercase">Vaiśeṣika</h1>
          <p className="mt-2 text-xl md:text-2xl text-amber-100/90 font-light">The Philosophy of Atomistic Realism</p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">

        {/* Introduction to Atomism */}
        <motion.section className="mb-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">The Atomic Theory of Reality</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Founded by the sage Kaṇāda, Vaiśeṣika is a school of naturalism that proposes an atomic theory of the universe. It seeks to identify, classify, and understand the fundamental categories (**Padārthas**) of reality. It is a sister school to Nyāya, with which it eventually merged.
          </p>
        </motion.section>

        {/* Paramāṇu & Dravya Section */}
        <motion.section className="grid md:grid-cols-2 gap-12 items-center mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-red-700 mb-3">Paramāṇu (परमाणु)</h3>
            <p className="text-slate-600 leading-relaxed">
              The **Paramāṇu** is the indivisible, eternal, and indestructible atom. Vaiśeṣika posits that all material objects in the universe are formed by combinations of these atoms, which exist for earth, water, fire, and air.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-slate-600 mb-3">Dravya (द्रव्य)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Dravya**, or substance, is the substratum where qualities and actions reside. There are nine substances: the four atomic ones (earth, water, fire, air) and five non-atomic, eternal substances: ether (**Ākāśa**), time (**Kāla**), space (**Diś**), soul (**Ātman**), and mind (**Manas**).
            </p>
          </motion.div>
        </motion.section>

        {/* The Six Padārthas Section */}
        <motion.section className="mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">The Six Padārthas (Categories of Reality)</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Vaiśeṣika organizes all of existence into six fundamental categories (a seventh, **Abhāva** or non-existence, was added later). Understanding these categories is key to understanding reality itself.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">1. Dravya</h5>
                    <p className="text-sm text-slate-600">(Substance)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">2. Guṇa</h5>
                    <p className="text-sm text-slate-600">(Quality / Attribute)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">3. Karma</h5>
                    <p className="text-sm text-slate-600">(Action / Motion)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">4. Sāmānya</h5>
                    <p className="text-sm text-slate-600">(Generality / Universal)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">5. Viśeṣa</h5>
                    <p className="text-sm text-slate-600">(Particularity / Individuality)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">6. Samavāya</h5>
                    <p className="text-sm text-slate-600">(Inherence)</p>
                </div>
            </div>
          </div>
        </motion.section>

        {/* Path to Liberation Section */}
        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">Mokṣa: Liberation Through Knowledge of Reality</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            The goal of Vaiśeṣika is **Mokṣa** (liberation). This is attained through a true, analytical knowledge of the Padārthas. By correctly understanding the nature of reality and recognizing the Self (**Ātman**) as a substance distinct from the body, mind, and the atomic world, one can achieve freedom from the cycle of suffering and rebirth.
          </p>
          <Link to="/explore" className="mt-10 inline-block bg-red-700 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-red-800 transition-all duration-300 rounded-sm">
            Back to Explore
          </Link>
        </motion.section>

      </div>
    </div>
  );
};

export default VaisesikaPage;
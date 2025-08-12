import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you'll have a back button

// ================================================================================
// Main Component to be exported
// ================================================================================
const NyayaPage = () => {
  // Animation Variants (re-used from your original component)
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
            src="https://images.unsplash.com/photo-1519397631344-a4a79b099994?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGxvZ2ljJTIwYW5kJTIwcmVhc29ufGVufDB8fDB8fHww" 
            alt="Abstract representation of logic and reason"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
        <motion.div className="relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-5xl md:text-8xl font-serif tracking-wider uppercase">Nyāya</h1>
          <p className="mt-2 text-xl md:text-2xl text-amber-100/90 font-light">The Philosophy of Logical Realism</p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">

        {/* Introduction to Logic */}
        <motion.section className="mb-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">The Quest for Valid Knowledge</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            The Nyāya school, founded by the sage Gautama, is a system of logic and epistemology. Its primary concern is establishing the conditions for acquiring valid knowledge (**Pramā**) and the nature of reality. It provides a rigorous framework for reasoning and argumentation.
          </p>
        </motion.section>

        {/* Pramāṇa & Prameya Section */}
        <motion.section className="grid md:grid-cols-2 gap-12 items-center mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-teal-700 mb-3">Pramāṇa (प्रमाण)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Pramāṇa** refers to the valid means of knowing. Nyāya accepts four sources of correct knowledge: Perception (Pratyakṣa), Inference (Anumāna), Comparison (Upamāna), and Testimony (Śabda). These are the tools for verifying reality.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-rose-700 mb-3">Prameya (प्रमेय)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Prameya** signifies the objects of valid knowledge—that which is to be known. This includes the Self (Ātman), the body, the senses, the mind, and the external world. Nyāya asserts that these objects are real and can be comprehended through the Pramāṇas.
            </p>
          </motion.div>
        </motion.section>

        {/* The 16 Padārthas Section */}
        <motion.section className="mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">The 16 Padārthas (Categories)</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              The entire methodology of Nyāya is structured around 16 logical categories (**Padārthas**) that guide an inquiry from doubt to certainty. These categories provide a complete system for analysis and debate.
            </p>
          </div>
          {/* A simplified visual representation of the Padarthas */}
          <div className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto">
            <h4 className="font-bold text-center text-xl mb-6">The Process of Inquiry</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <h5 className="font-bold mb-2">1. Pramāṇa</h5>
                    <p className="text-sm text-slate-600">The Means of Knowledge (Perception, Inference, etc.)</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-200">
                    <h5 className="font-bold mb-2">2. Prameya</h5>
                    <p className="text-sm text-slate-600">The Objects of Knowledge (The Self, Body, Senses, etc.)</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">3. Saṃśaya</h5>
                    <p className="text-sm text-slate-600">Doubt or a State of Uncertainty</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">4. Prayojana</h5>
                    <p className="text-sm text-slate-600">The Purpose or Motive for the Inquiry</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">5. Dṛṣṭānta</h5>
                    <p className="text-sm text-slate-600">An Example or Familiar Case</p>
                </div>
                <div className="bg-slate-100 p-4 rounded-lg border border-slate-300 flex items-center justify-center">
                    <p className="font-semibold text-slate-700">... and 11 other categories</p>
                </div>
            </div>
          </div>
        </motion.section>

        {/* Path to Liberation Section */}
        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">Apavarga: Liberation Through Logic</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            In Nyāya, suffering arises from **Mithyā Jñāna** (false knowledge or ignorance), which leads to flawed actions and the cycle of rebirth. The ultimate goal is **Apavarga** (liberation), achieved through **Tattva Jñāna** (knowledge of reality). By systematically applying the tools of logic to eliminate ignorance, one attains true knowledge and freedom from all suffering.
          </p>
          <Link to="/explore" className="mt-10 inline-block bg-teal-600 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-teal-700 transition-all duration-300 rounded-sm">
            Back to Explore
          </Link>
        </motion.section>

      </div>
    </div>
  );
};

export default NyayaPage;
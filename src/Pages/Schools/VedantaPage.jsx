import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you'll have a back button

// ================================================================================
// Main Component to be exported
// ================================================================================
const VedantaPage = () => {
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
        className="relative h-[60vh] min-h-[100vh] flex items-center justify-center text-white text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <img 
            src="https://cdn.pixabay.com/photo/2017/09/12/11/56/universe-2742113_1280.jpg" 
            alt="A cosmic nebula representing ultimate reality"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
        <motion.div className="relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-5xl md:text-8xl font-serif tracking-wider uppercase">Vedānta</h1>
          <p className="mt-2 text-xl md:text-2xl text-amber-100/90 font-light">The Culmination of the Vedas</p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">

        {/* Introduction to Vedanta */}
        <motion.section className="mb-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">The Essence of the Upanishads</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Vedānta, meaning "the end of the Vedas," is one of the most significant schools of Indian philosophy. It is primarily based on the philosophical treatises of the Upanishads and focuses on the nature of ultimate reality (**Brahman**) and its relationship with the individual self (**Ātman**).
          </p>
        </motion.section>

        {/* Brahman & Ātman Section */}
        <motion.section className="grid md:grid-cols-2 gap-12 items-center mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-purple-800 mb-3">Brahman (ब्रह्मन्)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Brahman** is the ultimate, unchanging, infinite, and absolute reality. It is the single, transcendent ground of all being, the source and substance of the entire universe. It is beyond all attributes and distinctions.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-cyan-600 mb-3">Ātman (आत्मन्)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Ātman** refers to the individual self, the innermost essence of a being. It is the pure, eternal consciousness that acts as the silent witness within. The central question of Vedānta is the precise relationship between Ātman and Brahman.
            </p>
          </motion.div>
        </motion.section>

        {/* The Major Sub-Schools Section */}
        <motion.section className="mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">One Reality, Diverse Views: The Major Sub-Schools</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              The interpretation of the relationship between Brahman and Ātman led to the development of several influential sub-schools, each offering a unique perspective.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">Advaita (Non-dualism)</h5>
                    <p className="text-sm text-slate-600">Championed by **Śaṅkara**, it posits that Ātman is identical to Brahman. The perceived difference is an illusion (**Māyā**).</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">Viśiṣṭādvaita (Qualified Non-dualism)</h5>
                    <p className="text-sm text-slate-600">Taught by **Rāmānuja**, it holds that Ātman is a part of Brahman, inseparable yet distinct, like a spark from a fire.</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h5 className="font-bold mb-2">Dvaita (Dualism)</h5>
                    <p className="text-sm text-slate-600">Proposed by **Madhva**, it asserts that Ātman and Brahman are eternally separate and distinct realities.</p>
                </div>
            </div>
          </div>
        </motion.section>

        {/* Path to Liberation Section */}
        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">Mokṣa: Liberation Through Self-Realization</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            The ultimate goal in all Vedāntic schools is **Mokṣa**—liberation from the cycle of birth and death (**Saṃsāra**). This is achieved by overcoming ignorance (**Avidyā**) through the direct, experiential knowledge (**Jñāna**) of one's true nature and its relationship to the ultimate reality, Brahman.
          </p>
          <Link to="/explore" className="mt-10 inline-block bg-purple-800 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-purple-900 transition-all duration-300 rounded-sm">
            Back to Explore
          </Link>
        </motion.section>

      </div>
    </div>
  );
};

export default VedantaPage;
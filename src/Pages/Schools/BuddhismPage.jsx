import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you'll have a back button

// ================================================================================
// Main Component to be exported
// ================================================================================
const BuddhismPage = () => {
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
            src="https://images.unsplash.com/photo-1547793397-9436e453965b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVkZGhhJTIwc3RhdHVlfGVufDB8fDB8fHww" 
            alt="A serene statue of the Buddha"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
        <motion.div className="relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-5xl md:text-8xl font-serif tracking-wider uppercase">Buddhism</h1>
          <p className="mt-2 text-xl md:text-2xl text-amber-100/90 font-light">The Path to Enlightenment</p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">

        {/* Introduction to Buddhism */}
        <motion.section className="mb-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">The Middle Way to Awakening</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Founded by Siddhartha Gautama, the Buddha, Buddhism is a path focused on understanding the nature of suffering and achieving liberation from it. It advocates for the "Middle Way," a path of moderation that avoids the extremes of both sensual indulgence and severe asceticism.
          </p>
        </motion.section>

        {/* Anātman & Pratītyasamutpāda Section */}
        <motion.section className="grid md:grid-cols-2 gap-12 items-center mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-violet-700 mb-3">Anātman (अनात्मन्)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Anātman**, or "no-self," is a core Buddhist doctrine. It states that there is no permanent, unchanging, independent self or soul. What we perceive as "I" is a temporary combination of ever-changing physical and mental components (**skandhas**).
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-sky-700 mb-3">Pratītyasamutpāda (प्रतीत्यसमुत्पाद)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Pratītyasamutpāda**, or "Dependent Origination," is the principle of interconnectedness. It posits that all phenomena arise in dependence upon other phenomena; nothing exists in isolation. "When this is, that is. When this ceases, that ceases."
            </p>
          </motion.div>
        </motion.section>

        {/* The Four Noble Truths & Eightfold Path Section */}
        <motion.section className="mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">The Four Noble Truths</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              The foundation of Buddhist teaching is the Four Noble Truths, which diagnose the human condition and prescribe the cure. The fourth truth is the Noble Eightfold Path.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto">
            {/* The Four Truths */}
            <ol className="list-decimal list-inside space-y-2 mb-8 font-serif text-lg">
                <li>The Truth of Suffering (**Duḥkha**)</li>
                <li>The Truth of the Origin of Suffering (**Samudāya**)</li>
                <li>The Truth of the Cessation of Suffering (**Nirodha**)</li>
                <li>The Truth of the Path to Cessation (**Mārga**)</li>
            </ol>
            <hr className="my-6"/>
            {/* The Eightfold Path */}
            <div className="text-center">
                 <h4 className="font-bold text-xl mb-4 text-slate-800">The Noble Eightfold Path</h4>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                        <h5 className="font-bold mb-2">Wisdom (Prajñā)</h5>
                        <p className="text-sm text-slate-600">1. Right View</p>
                        <p className="text-sm text-slate-600">2. Right Intention</p>
                    </div>
                     <div className="bg-sky-50 p-4 rounded-lg border border-sky-200">
                        <h5 className="font-bold mb-2">Ethical Conduct (Śīla)</h5>
                        <p className="text-sm text-slate-600">3. Right Speech</p>
                        <p className="text-sm text-slate-600">4. Right Action</p>
                        <p className="text-sm text-slate-600">5. Right Livelihood</p>
                    </div>
                     <div className="bg-violet-50 p-4 rounded-lg border border-violet-200">
                        <h5 className="font-bold mb-2">Mental Discipline (Samādhi)</h5>
                        <p className="text-sm text-slate-600">6. Right Effort</p>
                        <p className="text-sm text-slate-600">7. Right Mindfulness</p>
                        <p className="text-sm text-slate-600">8. Right Concentration</p>
                    </div>
                 </div>
            </div>
          </div>
        </motion.section>

        {/* Path to Liberation Section */}
        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">Nirvāṇa: The Extinction of Suffering</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            The ultimate goal of the Buddhist path is **Nirvāṇa**, which literally means "to extinguish." It is not a place, but the cessation of suffering and the cycle of rebirth (**Saṃsāra**) by extinguishing the "three fires": greed, aversion, and ignorance. It is a state of profound peace, liberation, and awakening to the true nature of reality.
          </p>
          <Link to="/explore" className="mt-10 inline-block bg-violet-600 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-violet-700 transition-all duration-300 rounded-sm">
            Back to Explore
          </Link>
        </motion.section>

      </div>
    </div>
  );
};

export default BuddhismPage;
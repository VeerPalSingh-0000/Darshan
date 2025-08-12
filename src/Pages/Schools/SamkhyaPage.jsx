import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you'll have a back button

// ================================================================================
// Main Component to be exported
// ================================================================================
const SankhyaPage = () => {
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
            src="https://images.unsplash.com/photo-1664252092739-8b4dadb0b7d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QWJzdHJhY3QlMjByZXByZXNlbnRhdGlvbiUyMG9mJTIwZHVhbGl0eXxlbnwwfHwwfHx8MA%3D%3D" 
            alt="Abstract representation of duality"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
        <motion.div className="relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-5xl md:text-8xl font-serif tracking-wider uppercase">Sāṃkhya</h1>
          <p className="mt-2 text-xl md:text-2xl text-amber-100/90 font-light">The Philosophy of Dualism</p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">

        {/* Introduction to Duality */}
        <motion.section className="mb-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">The Great Duality</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Sāṃkhya is one of the oldest and most influential schools of Indian philosophy. Its foundation rests on a profound dualism between two eternal and distinct principles: **Puruṣa**, the silent, passive consciousness, and **Prakṛti**, the dynamic, active primordial matter.
          </p>
        </motion.section>

        {/* Purusha & Prakriti Section */}
        <motion.section className="grid md:grid-cols-2 gap-12 items-center mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-amber-700 mb-3">Puruṣa (पुरुष)</h3>
            <p className="text-slate-600 leading-relaxed">
              Puruṣa is the principle of pure consciousness. It is the silent witness, unchanging, and uninvolved in the workings of the material world. It is the seer, not the seen. Sāṃkhya posits that there are an infinite number of individual Puruṣas.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-indigo-700 mb-3">Prakṛti (प्रकृति)</h3>
            <p className="text-slate-600 leading-relaxed">
              Prakṛti is the primordial matter or nature, the source of everything in the manifest universe. It is unconscious, active, and constantly changing, composed of three fundamental qualities or **Guṇas**: Sattva (harmony), Rajas (activity), and Tamas (inertia).
            </p>
          </motion.div>
        </motion.section>

        {/* The 25 Tattvas Section */}
        <motion.section className="mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">The 25 Tattvas (Principles)</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              The entire universe evolves out of the interaction between Puruṣa and Prakṛti. This evolution unfolds through 24 principles, known as Tattvas, emerging from Prakṛti. Puruṣa is the 25th, separate Tattva.
            </p>
          </div>
          {/* A simplified visual representation of the Tattvas */}
          <div className="space-y-6 text-center">
            <div className="font-bold text-xl">Puruṣa & Prakṛti</div>
            <div className="text-2xl">↓</div>
            <div className="bg-white p-4 rounded-lg shadow-sm border max-w-sm mx-auto">
              <h4 className="font-bold">Buddhi (Intellect)</h4>
            </div>
            <div className="text-2xl">↓</div>
            <div className="bg-white p-4 rounded-lg shadow-sm border max-w-sm mx-auto">
              <h4 className="font-bold">Ahaṃkāra (Ego)</h4>
            </div>
            <div className="text-2xl">↓</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                <h4 className="font-bold mb-2">Sattvic</h4>
                <p>Manas (Mind)</p>
                <p>5 Jñānendriyas (Senses)</p>
                <p>5 Karmendriyas (Actions)</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200 col-span-2">
                 <h4 className="font-bold mb-2">Tamasic</h4>
                 <p>5 Tanmātras (Subtle Elements)</p>
                 <p>↓</p>
                 <p>5 Mahābhūtas (Gross Elements)</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Path to Liberation Section */}
        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">Kaivalya: The Path to Liberation</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Suffering arises from the Puruṣa's mistaken identification with Prakṛti and its evolutes (like the ego and body). Liberation, or **Kaivalya**, is achieved through discriminative knowledge—the profound realization of the absolute distinction between the self (Puruṣa) and the non-self (Prakṛti). When this knowledge dawns, the Puruṣa is freed, resting in its true nature as a pure, silent witness.
          </p>
          <Link to="/explore" className="mt-10 inline-block bg-amber-600 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-amber-700 transition-all duration-300 rounded-sm">
            Back to Explore
          </Link>
        </motion.section>

      </div>
    </div>
  );
};

export default SankhyaPage;

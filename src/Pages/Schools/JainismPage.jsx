import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you'll have a back button

// ================================================================================
// Main Component to be exported
// ================================================================================
const JainismPage = () => {
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
            src="https://images.unsplash.com/photo-1605364023722-1b4142728b7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amFpbiUyMHN5bWJvbHxlbnwwfHwwfHx8MA%3D%3D" 
            alt="The Jain symbol of a hand with a wheel, representing Ahimsa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        </div>
        <motion.div className="relative z-10" initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className="text-5xl md:text-8xl font-serif tracking-wider uppercase">Jainism</h1>
          <p className="mt-2 text-xl md:text-2xl text-amber-100/90 font-light">The Path of Non-Violence</p>
        </motion.div>
      </motion.section>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-24 max-w-5xl">

        {/* Introduction to Jainism */}
        <motion.section className="mb-24 text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">An Ancient Path of Self-Effort</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Jainism is an ancient Indian tradition that prescribes a path of non-violence (**Ahiṃsā**) towards all living beings. It emphasizes self-control and asceticism as the means for the soul to achieve liberation. The path is illuminated by 24 teachers, or **Tīrthaṅkaras**, with Lord Mahāvīra being the most recent.
          </p>
        </motion.section>

        {/* Jīva & Ajīva Section */}
        <motion.section className="grid md:grid-cols-2 gap-12 items-center mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-emerald-700 mb-3">Jīva (जीव)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Jīva** is the immortal and conscious soul or life force. According to Jainism, a Jīva exists in every single living being, from humans and animals to plants, rocks, and even microscopic organisms. Its intrinsic nature is pure consciousness, bliss, and energy.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200/80">
            <h3 className="text-3xl font-serif text-slate-600 mb-3">Ajīva (अजीव)</h3>
            <p className="text-slate-600 leading-relaxed">
              **Ajīva** represents everything in the universe that is not a soul. It is inanimate and unconscious. This includes matter (**Pudgala**), the principles of motion and rest (**Dharma** and **Adharma**), space (**Ākāśa**), and time (**Kāla**). Karma is also a form of subtle matter.
            </p>
          </motion.div>
        </motion.section>

        {/* The Three Jewels Section */}
        <motion.section className="mb-24" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif text-slate-900 mb-4">The Triratna: Three Jewels to Liberation</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              The path to liberation in Jainism is defined by the **Triratna**, or the Three Jewels. They must be cultivated together to purify the soul and end the cycle of rebirth.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm border max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h5 className="font-bold mb-2">1. Samyak Darśana</h5>
                    <p className="text-sm text-slate-600">Right Faith or Right View</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h5 className="font-bold mb-2">2. Samyak Jñāna</h5>
                    <p className="text-sm text-slate-600">Right Knowledge</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h5 className="font-bold mb-2">3. Samyak Cāritra</h5>
                    <p className="text-sm text-slate-600">Right Conduct</p>
                </div>
            </div>
            <div className="text-center mt-8">
                <h4 className="font-bold text-lg mb-4 text-slate-800">Right Conduct is expressed through the 5 Great Vows:</h4>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                    <span className="bg-slate-100 py-1 px-3 rounded-full">Ahiṃsā (Non-violence)</span>
                    <span className="bg-slate-100 py-1 px-3 rounded-full">Satya (Truth)</span>
                    <span className="bg-slate-100 py-1 px-3 rounded-full">Asteya (Non-stealing)</span>
                    <span className="bg-slate-100 py-1 px-3 rounded-full">Brahmacarya (Chastity)</span>
                    <span className="bg-slate-100 py-1 px-3 rounded-full">Aparigraha (Non-possessiveness)</span>
                </div>
            </div>
          </div>
        </motion.section>

        {/* Path to Liberation Section */}
        <motion.section className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
          <h2 className="text-4xl font-serif text-slate-900 mb-4">Mokṣa: The Soul's Final Liberation</h2>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Suffering is caused by **Karma**—subtle particles of matter—that attach to the soul (Jīva) due to our thoughts and actions. The ultimate goal is **Mokṣa**, the complete liberation of the soul from karmic bondage. By following the path of the Three Jewels, one stops the influx of new karma and sheds old karma. A liberated soul ascends to the highest realm (**Siddhaloka**) to exist in a state of eternal, omniscient bliss.
          </p>
          <Link to="/explore" className="mt-10 inline-block bg-emerald-600 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-emerald-700 transition-all duration-300 rounded-sm">
            Back to Explore
          </Link>
        </motion.section>

      </div>
    </div>
  );
};

export default JainismPage;
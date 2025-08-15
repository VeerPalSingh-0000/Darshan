import React from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon, ScaleIcon, PuzzlePieceIcon, SunIcon, UserGroupIcon, HandRaisedIcon } from '@heroicons/react/24/solid';

// --- Data for the Scholars ---
// This data could be moved to a separate file (e.g., src/data/scholarsData.js)
const scholars = [
  {
    name: 'Adi Shankara',
    era: 'c. 788 – c. 820 CE',
    school: 'Advaita Vedānta',
    contribution: 'Consolidated the philosophy of non-dualism (Advaita), asserting the identity of the Self (Ātman) and the Ultimate Reality (Brahman).',
    icon: <PuzzlePieceIcon />,
    color: 'amber',
  },
  {
    name: 'Gautama Buddha',
    era: 'c. 563 – c. 483 BCE',
    school: 'Buddhism',
    contribution: 'Taught the Four Noble Truths and the Eightfold Path as the way to end suffering (Dukkha) and achieve enlightenment (Nirvāṇa).',
    icon: <UserGroupIcon />,
    color: 'sky',
  },
  {
    name: 'Patañjali',
    era: 'c. 2nd century BCE',
    school: 'Yoga',
    contribution: 'Compiled the Yoga Sūtras, a foundational text that systematizes the practice of Yoga into an eight-limbed path (Ashtanga) to still the mind.',
    icon: <SunIcon />,
    color: 'teal',
  },
  {
    name: 'Mahavira',
    era: 'c. 599 – c. 527 BCE',
    school: 'Jainism',
    contribution: 'The 24th Tirthankara who propagated the core tenets of Jainism, emphasizing non-violence (Ahiṃsā), non-absolutism (Anekāntavāda), and non-attachment (Aparigraha).',
    icon: <HandRaisedIcon />,
    color: 'indigo',
  },
  {
    name: 'Akṣapāda Gautama',
    era: 'c. 6th century BCE',
    school: 'Nyāya',
    contribution: 'Authored the Nyāya Sūtras, establishing a systematic school of logic and epistemology focused on the valid means of acquiring knowledge (Pramāṇas).',
    icon: <ScaleIcon />,
    color: 'rose',
  },
];

// --- Animation Variants for Framer Motion ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

// --- The ScholarsPage Component ---
const Scholars = () => {
  return (
    <div className="bg-[#F8F5F2] text-slate-800 min-h-screen">
      {/* Page Header */}
      <header className="bg-white shadow-sm py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex justify-center items-center gap-4 mb-4">
              <AcademicCapIcon className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-wider text-slate-900">
              The Great Thinkers
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Meet the pivotal scholars and philosophers who founded the major schools of thought and shaped the course of Indian intellectual history.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content - Timeline */}
      <main className="py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {scholars.map((scholar) => (
              <motion.div
                key={scholar.name}
                variants={fadeIn}
                className="bg-white rounded-xl border border-slate-200/70 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden transform hover:-translate-y-2"
              >
                <div className={`p-8 border-b-4 border-${scholar.color}-500`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full bg-${scholar.color}-100 text-${scholar.color}-600 flex items-center justify-center flex-shrink-0`}>
                      {React.cloneElement(scholar.icon, { className: 'w-8 h-8' })}
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif text-slate-900">{scholar.name}</h2>
                      <p className="text-sm text-slate-500">{scholar.era}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <p className="text-slate-600 leading-relaxed flex-grow">
                    {scholar.contribution}
                  </p>
                  <div className={`mt-6 text-xs font-semibold uppercase tracking-wider text-${scholar.color}-700 bg-${scholar.color}-100 py-1 px-3 rounded-full self-start`}>
                    {scholar.school}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Scholars;

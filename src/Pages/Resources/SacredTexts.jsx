import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';

// --- Data for the Sacred Texts ---
// For a larger application, this data could be moved to its own file (e.g., src/data/textsData.js)
const sacredTexts = [
  {
    title: 'The Vedas (वेद)',
    sanskrit_title: 'Knowledge',
    description: 'The most ancient Hindu scriptures, a vast collection of hymns, prayers, and philosophical treatises. They are considered Shruti ("what is heard") and are believed to be of divine origin.',
    key_concept: 'The foundational source of dharma and spiritual wisdom in Hinduism.',
    color: 'amber',
  },
  {
    title: 'The Upanishads (उपनिषद्)',
    sanskrit_title: 'Sitting Down Near',
    description: 'A collection of philosophical texts that form the theoretical basis for the Hindu religion. They explore the nature of ultimate reality (Brahman) and the self (Ātman).',
    key_concept: 'Central theme: "Tat Tvam Asi" (That Thou Art) – the identity of the individual soul and the Supreme Being.',
    color: 'orange',
  },
  {
    title: 'The Bhagavad Gītā (भगवद्गीता)',
    sanskrit_title: 'The Song of God',
    description: 'A 700-verse scripture within the epic Mahabharata. It presents a synthesis of Dharma, Bhakti, and Moksha through a dialogue between Prince Arjuna and his charioteer, Krishna.',
    key_concept: 'Advocates for selfless action (Karma Yoga) and devotion (Bhakti Yoga) as paths to liberation.',
    color: 'red',
  },
  {
    title: 'The Brahma Sutras (ब्रह्मसूत्र)',
    sanskrit_title: 'Aphorisms on Brahman',
    description: 'A Sanskrit text that systematizes and summarizes the philosophical and spiritual ideas of the Upanishads. It is a foundational text of the Vedānta school.',
    key_concept: 'Provides a logical framework to understand the often complex and varied teachings of the Upanishads.',
    color: 'yellow',
  },
  {
    title: 'The Yoga Sutras of Patañjali',
    sanskrit_title: 'योगसूत्र',
    description: 'A collection of 196 Sanskrit aphorisms on the theory and practice of yoga. It is the foundational text of the Yoga school of philosophy.',
    key_concept: 'Outlines the eight limbs of yoga (Ashtanga) as a systematic path to quiet the mind and achieve liberation.',
    color: 'teal',
  },
  {
    title: 'The Pāli Canon (Tipiṭaka)',
    sanskrit_title: 'Three Baskets',
    description: 'The standard collection of scriptures in the Theravada Buddhist tradition, as preserved in the Pāli language. It is the first known and most complete early Buddhist canon.',
    key_concept: 'Contains the core teachings of the Buddha on the Four Noble Truths and the Eightfold Path.',
    color: 'sky',
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
      staggerChildren: 0.15,
    },
  },
};

// --- The SacredTextsPage Component ---
const SacredTexts = () => {
  return (
    <div className="bg-[#F8F5F2] text-slate-800">
      {/* Page Header */}
      <header className="bg-white shadow-sm py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex justify-center items-center gap-4 mb-4">
              <BookOpenIcon className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-wider text-slate-900">
              The Sacred Texts
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Explore the foundational scriptures that have shaped millennia of spiritual inquiry and philosophical debate across the Indian subcontinent.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="py-20 sm:py-28">
        <motion.div 
          className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {sacredTexts.map((text) => (
            <motion.div
              key={text.title}
              variants={fadeIn}
              className={`bg-white rounded-xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-${text.color}-300 transition-all duration-300 flex flex-col overflow-hidden`}
            >
              <div className="p-8 flex-grow">
                <h2 className="text-2xl font-serif text-slate-900">{text.title}</h2>
                <p className="text-sm text-slate-500 italic mt-1">Sanskrit: "{text.sanskrit_title}"</p>
                <p className="text-slate-600 mt-4 text-sm leading-relaxed">
                  {text.description}
                </p>
              </div>
              <div className={`bg-${text.color}-50 border-t border-${text.color}-200 p-6`}>
                <div className="flex items-start gap-3">
                  <SparklesIcon className={`h-5 w-5 text-${text.color}-600 flex-shrink-0 mt-0.5`} />
                  <div>
                    <h4 className="font-semibold text-sm text-slate-800">Key Concept</h4>
                    <p className="text-xs text-slate-600 mt-1">{text.key_concept}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default SacredTexts;

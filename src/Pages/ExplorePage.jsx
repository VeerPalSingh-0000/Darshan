import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import icons and the full list of schools
import { ArrowRightIcon, StarIcon, SunIcon, BookOpenIcon, ScaleIcon, PuzzlePieceIcon, UsersIcon, ChatBubbleBottomCenterTextIcon, HandRaisedIcon, SparklesIcon } from '@heroicons/react/24/solid';

// ================================================================================
// MOCK DATA (This should be in a separate file like 'src/data/schoolsOfThought.js')
// ================================================================================
const schools = [
  // Āstika (Orthodox) Schools
  {
    name: 'Sāṃkhya',
    icon: <PuzzlePieceIcon className="w-8 h-8 text-amber-600" />,
    description: 'A dualistic school emphasizing the distinction between consciousness (puruṣa) and matter (prakṛti).',
    path: '/schools/samkhya', // Changed from /explore/samkhya
    category: 'Āstika'
  },
  {
    name: 'Yoga',
    icon: <SunIcon className="w-8 h-8 text-amber-600" />,
    description: 'Focuses on meditative and ascetic practices to unite the self with the ultimate reality.',
    path: '/schools/yoga', // Changed from /explore/yoga
    category: 'Āstika'
  },
  {
    name: 'Nyāya',
    icon: <ScaleIcon className="w-8 h-8 text-amber-600" />,
    description: 'The school of logic, focusing on the sources of valid knowledge (pramāṇas).',
    path: '/schools/nyaya', // Changed from /explore/nyaya
    category: 'Āstika'
  },
  {
    name: 'Vaiśeṣika',
    icon: <SparklesIcon className="w-8 h-8 text-amber-600" />,
    description: 'An atomist school that postulates that all objects in the physical universe are reducible to atoms.',
    path: '/schools/vaisesika', // Changed from /explore/vaisesika
    category: 'Āstika'
  },
  {
    name: 'Mīmāṃsā',
    icon: <BookOpenIcon className="w-8 h-8 text-amber-600" />,
    description: 'Focuses on the exegesis of the Vedas, emphasizing dharma and ritual obligations.',
    path: '/schools/mimamsa', // Changed from /explore/mimamsa
    category: 'Āstika'
  },
  {
    name: 'Vedānta',
    icon: <StarIcon className="w-8 h-8 text-amber-600" />,
    description: 'Focuses on the philosophical teachings of the Upanishads, with many sub-schools like Advaita and Viśiṣṭādvaita.',
    path: '/schools/vedanta', // Changed from /explore/vedanta
    category: 'Āstika'
  },
  // Nāstika (Heterodox) Schools
  {
    name: 'Jainism',
    icon: <HandRaisedIcon className="w-8 h-8 text-indigo-600" />,
    description: 'Emphasizes non-violence (ahiṃsā), non-absolutism (anekāntavāda), and non-attachment (aparigraha).',
    path: '/schools/jainism', // Changed from /explore/jainism
    category: 'Nāstika'
  },
  {
    name: 'Buddhism',
    icon: <UsersIcon className="w-8 h-8 text-indigo-600" />,
    description: 'Based on the teachings of Siddhartha Gautama, focusing on the path to enlightenment (Nirvāṇa).',
    path: '/schools/buddhism', // Changed from /explore/buddhism
    category: 'Nāstika'
  },
  {
    name: 'Cārvāka',
    icon: <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-indigo-600" />,
    description: 'A materialist and skeptical school that rejected supernaturalism and accepted only direct perception as a means of knowledge.',
    path: '/schools/carvaka', // Changed from /explore/carvaka
    category: 'Nāstika'
  }
];

// Animation variants for Framer Motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

// ================================================================================
// ExplorePage COMPONENT
// ================================================================================
const ExplorePage = () => {
  const astikaSchools = schools.filter(s => s.category === 'Āstika');
  const nastikaSchools = schools.filter(s => s.category === 'Nāstika');

  return (
    <div className="bg-[#F8F5F2]">
      {/* Page Header */}
      <header className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-wider text-slate-900">The Schools of Darśana</h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Indian philosophy is broadly divided into two categories: Āstika (orthodox) and Nāstika (heterodox). Explore the foundational schools that form this rich intellectual and spiritual landscape.
            </p>
          </motion.div>
        </div>
      </header>
      
      {/* Āstika (Orthodox) Schools Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">Āstika Schools</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">The six orthodox schools that accept the authority of the Vedas as scripture.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {astikaSchools.map((school, index) => (
              <SchoolCard key={school.name} school={school} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Nāstika (Heterodox) Schools Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container mx-auto px-6">
          <motion.div className="text-center mb-16" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">Nāstika Schools</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">The heterodox schools that do not accept the authority of the Vedas.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {nastikaSchools.map((school, index) => (
              <SchoolCard key={school.name} school={school} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// ================================================================================
// Reusable SchoolCard COMPONENT
// ================================================================================
const SchoolCard = ({ school, index }) => {
  return (
    <motion.div
      className="bg-slate-50/50 p-8 rounded-lg border border-slate-200/80 hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col text-center items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
      }}
    >
      <div className={`p-4 rounded-full ${school.category === 'Āstika' ? 'bg-amber-500/10' : 'bg-indigo-500/10'}`}>
        {school.icon}
      </div>
      <h3 className="text-2xl font-serif tracking-wider uppercase mt-6 mb-3 text-slate-800">{school.name}</h3>
      <p className="text-slate-600 flex-grow text-sm leading-6">{school.description}</p>
      <Link to={school.path} className="mt-6 font-bold text-sm text-amber-700 hover:text-amber-900 inline-flex items-center group">
        Learn More <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  );
};

export default ExplorePage;

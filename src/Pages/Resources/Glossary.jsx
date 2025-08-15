import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ListBulletIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// --- Data for the Glossary ---
// In a real application, this might come from a dedicated data file.
const glossaryTerms = [
  { term: 'Advaita', sanskrit: 'अद्वैत', definition: '"Non-duality"; the monistic philosophy of Adi Shankara, asserting that Ātman (the self) is identical with Brahman (the ultimate reality).' },
  { term: 'Ātman', sanskrit: 'आत्मन्', definition: 'The eternal, unchanging self or soul; the spiritual essence of an individual, distinct from the ego or personality.' },
  { term: 'Brahman', sanskrit: 'ब्रह्मन्', definition: 'The ultimate, unchanging reality of the universe in Hinduism; the supreme cosmic spirit.' },
  { term: 'Bhakti', sanskrit: 'भक्ति', definition: 'Devotion and the love of a personal god or a representational god by a devotee.' },
  { term: 'Dharma', sanskrit: 'धर्म', definition: 'Cosmic law and order, righteousness, and one\'s duty, role, or path in life. It is a foundational concept in Indian religions.' },
  { term: 'Jñāna', sanskrit: 'ज्ञान', definition: 'Knowledge, particularly the spiritual knowledge that leads to liberation (Moksha).' },
  { term: 'Karma', sanskrit: 'कर्म', definition: 'The universal law of cause and effect, where the sum of a person\'s actions and intentions in this and previous states of existence is seen as deciding their fate in future existences.' },
  { term: 'Māyā', sanskrit: 'माया', definition: '"Illusion" or "magic"; the powerful force that creates the cosmic illusion that the phenomenal world is real.' },
  { term: 'Moksha', sanskrit: 'मोक्ष', definition: 'Liberation or release from the cycle of death and rebirth (samsara).' },
  { term: 'Nirvāṇa', sanskrit: 'निर्वाण', definition: 'In Buddhism, the ultimate goal, representing the release from the cycle of rebirth (samsara) and the extinguishing of suffering.' },
  { term: 'Prakṛti', sanskrit: 'प्रकृति', definition: 'In the Sāṃkhya school, "nature" or matter; the primal material energy from which all physical and mental phenomena evolve.' },
  { term: 'Puruṣa', sanskrit: 'पुरुष', definition: 'In the Sāṃkhya school, the pure, eternal consciousness, the silent witness, distinct from matter (Prakṛti).' },
  { term: 'Samsara', sanskrit: 'संसार', definition: 'The cycle of death and rebirth to which life in the material world is bound.' },
  { term: 'Yoga', sanskrit: 'योग', definition: '"To yoke" or "unite"; a group of physical, mental, and spiritual practices or disciplines which originated in ancient India with a goal to control and still the mind.' },
].sort((a, b) => a.term.localeCompare(b.term)); // Alphabetize the list

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
      staggerChildren: 0.1,
    },
  },
};

// --- The GlossaryPage Component ---
const Glossary = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = useMemo(() => 
    glossaryTerms.filter(item => 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    ), 
    [searchTerm]
  );

  return (
    <div className="bg-[#F8F5F2] text-slate-800 min-h-screen">
      {/* Page Header */}
      <header className="bg-white shadow-sm py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex justify-center items-center gap-4 mb-4">
              <ListBulletIcon className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-wider text-slate-900">
              Glossary of Key Terms
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              A guide to the essential Sanskrit terms and concepts that are fundamental to understanding the diverse schools of Indian philosophy.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Search and Content Section */}
      <main className="py-20 sm:py-24">
        <div className="container mx-auto px-6">
          {/* Search Bar */}
          <motion.div className="mb-12 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 text-slate-400 absolute top-1/2 left-4 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search terms or definitions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-slate-300 rounded-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-shadow"
              />
            </div>
          </motion.div>

          {/* Glossary List */}
          <motion.div
            key={searchTerm} // Re-trigger animation on search
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item) => (
                <motion.div
                  key={item.term}
                  variants={fadeIn}
                  className="bg-white border border-slate-200/80 rounded-lg p-6 shadow-sm"
                >
                  <h2 className="text-xl font-serif text-slate-900">
                    {item.term}
                    <span className="text-lg text-slate-500 ml-2 font-sans">({item.sanskrit})</span>
                  </h2>
                  <p className="mt-2 text-slate-600 leading-relaxed">{item.definition}</p>
                </motion.div>
              ))
            ) : (
              <motion.div variants={fadeIn} className="text-center py-12">
                <p className="text-slate-500">No terms found matching your search.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Glossary;

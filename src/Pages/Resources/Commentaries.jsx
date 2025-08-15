import React from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, BookOpenIcon, LinkIcon } from '@heroicons/react/24/solid';

// --- Data for the Commentaries ---
// This could be moved to a separate file (e.g., src/data/commentariesData.js)
const commentaries = [
  {
    originalText: 'Brahma Sūtras',
    originalAuthor: 'Vyāsa',
    commentaryTitle: 'Śārīraka Bhāṣya',
    commentator: 'Adi Shankara',
    school: 'Advaita Vedānta',
    description: 'A monumental commentary that systematically establishes the philosophy of non-dualism (Advaita), interpreting the aphorisms of the Brahma Sūtras to show the identity of the individual self (Ātman) with the ultimate reality (Brahman).',
    color: 'amber',
  },
  {
    originalText: 'Yoga Sūtras',
    originalAuthor: 'Patañjali',
    commentaryTitle: 'Yoga Bhāṣya',
    commentator: 'Vyāsa',
    school: 'Yoga',
    description: 'The foundational commentary on the Yoga Sūtras, providing the most authoritative and traditional explanation of Patañjali\'s aphorisms on the practice of yoga, the nature of the mind, and the path to liberation.',
    color: 'teal',
  },
  {
    originalText: 'Nyāya Sūtras',
    originalAuthor: 'Akṣapāda Gautama',
    commentaryTitle: 'Nyāya Bhāṣya',
    commentator: 'Vātsyāyana',
    school: 'Nyāya',
    description: 'The first and most important commentary on the Nyāya Sūtras, which elaborates on the principles of logic, epistemology, and debate, forming the bedrock of the Nyāya school of classical Indian philosophy.',
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

// --- The Commentaries Component ---
const Commentaries = () => {
  return (
    <div className="bg-[#F8F5F2] text-slate-800 min-h-screen">
      {/* Page Header */}
      <header className="bg-white shadow-sm py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <div className="flex justify-center items-center gap-4 mb-4">
              <ChatBubbleLeftRightIcon className="h-10 w-10 text-amber-600" />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-wider text-slate-900">
              The Great Commentaries
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
              Discover the tradition of Bhāṣya (commentary), where generations of scholars have illuminated the dense wisdom of foundational texts, shaping the evolution of Indian philosophy.
            </p>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20 sm:py-28">
        <motion.div 
          className="container mx-auto px-6 space-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {commentaries.map((item) => (
            <motion.div
              key={item.commentaryTitle}
              variants={fadeIn}
              className="bg-white rounded-xl border border-slate-200/70 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Original Text Info */}
                  <div className="md:col-span-5 lg:col-span-4 text-center md:text-left">
                    <div className="inline-block bg-slate-100 p-4 rounded-full">
                      <BookOpenIcon className="h-8 w-8 text-slate-500" />
                    </div>
                    <h3 className="mt-4 text-xl font-serif text-slate-800">Original Text</h3>
                    <p className="text-2xl font-semibold text-slate-900">{item.originalText}</p>
                    <p className="text-sm text-slate-500">by {item.originalAuthor}</p>
                  </div>

                  {/* Linking Icon */}
                  <div className="hidden md:flex md:col-span-2 lg:col-span-1 justify-center items-center">
                    <div className="bg-slate-200 rounded-full p-3">
                      <LinkIcon className="h-6 w-6 text-slate-600 transform rotate-45" />
                    </div>
                  </div>

                  {/* Commentary Info */}
                  <div className="md:col-span-5 lg:col-span-7 text-center md:text-left">
                     <div className={`inline-block bg-${item.color}-100 p-4 rounded-full`}>
                      <ChatBubbleLeftRightIcon className={`h-8 w-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="mt-4 text-xl font-serif text-slate-800">Commentary</h3>
                    <p className="text-2xl font-semibold text-slate-900">{item.commentaryTitle}</p>
                    <p className="text-sm text-slate-500">by {item.commentator}</p>
                  </div>
                </div>
              </div>
              <div className={`bg-${item.color}-50 border-t border-${item.color}-200 p-8`}>
                <p className="text-slate-700 leading-relaxed">{item.description}</p>
                <div className={`mt-4 text-xs font-semibold uppercase tracking-wider text-${item.color}-700 bg-${item.color}-100 py-1 px-3 rounded-full inline-block`}>
                  {item.school}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default Commentaries;

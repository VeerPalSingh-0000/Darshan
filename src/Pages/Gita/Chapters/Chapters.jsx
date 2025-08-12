import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline';

// Data for all 18 chapters of the Bhagavad Gītā
const allChapters = [
  { num: 1, title: 'Arjuna Viṣāda Yoga', translation: 'The Yoga of Arjuna\'s Dejection', desc: 'Arjuna\'s crisis of conscience on the battlefield as he faces his own kinsmen.' },
  { num: 2, title: 'Sāṅkhya Yoga', translation: 'The Yoga of Wisdom', desc: 'Krishna introduces the distinction between the eternal Self (Ātman) and the mortal body, urging Arjuna to act.' },
  { num: 3, title: 'Karma Yoga', translation: 'The Yoga of Action', desc: 'The path of selfless action performed without attachment to results, as a duty and an offering.' },
  { num: 4, title: 'Jñāna-Karma-Sannyāsa Yoga', translation: 'The Yoga of Wisdom in Action', desc: 'Reveals the divine origin of knowledge and how wisdom informs and purifies action.' },
  { num: 5, title: 'Karma Sannyāsa Yoga', translation: 'The Yoga of Renunciation of Action', desc: 'Clarifies that renouncing the fruits of action is superior to renouncing action itself.' },
  { num: 6, title: 'Dhyāna Yoga', translation: 'The Yoga of Meditation', desc: 'Techniques for controlling the mind and senses through meditation to achieve inner peace.' },
  { num: 7, title: 'Jñāna Vijñāna Yoga', translation: 'The Yoga of Knowledge and Realization', desc: 'Krishna explains His divine nature as the source of all material and spiritual existence.' },
  { num: 8, title: 'Akṣara Brahma Yoga', translation: 'The Yoga of the Imperishable Brahman', desc: 'Discusses cosmology, death, and how to attain the supreme abode through remembrance.' },
  { num: 9, title: 'Rāja Vidyā Rāja Guhya Yoga', translation: 'The Yoga of Royal Knowledge & Secret', desc: 'The most confidential knowledge of devotion, revealing God\'s relationship with the cosmos.' },
  { num: 10, title: 'Vibhūti Yoga', translation: 'The Yoga of Divine Glories', desc: 'Krishna describes His opulent manifestations to help the devotee perceive the Divine everywhere.' },
  { num: 11, title: 'Viśvarūpa Darśana Yoga', translation: 'The Yoga of the Universal Form', desc: 'Krishna grants Arjuna divine vision to behold His cosmic, all-encompassing form.' },
  { num: 12, title: 'Bhakti Yoga', translation: 'The Yoga of Devotion', desc: 'The path of pure, loving devotion is declared the most direct means to unite with God.' },
  { num: 13, title: 'Kṣetra-Kṣetrajña Vibhāga Yoga', translation: 'The Yoga of the Field & its Knower', desc: 'An analysis of the body as the "field" and the soul as its "knower," fostering detachment.' },
  { num: 14, title: 'Guṇatraya Vibhāga Yoga', translation: 'The Yoga of the Three Modes', desc: 'Explains the three modes (gunas) of material nature—sattva, rajas, and tamas—and how to transcend them.' },
  { num: 15, title: 'Puruṣottama Yoga', translation: 'The Yoga of the Supreme Person', desc: 'Describes the material world as an inverted banyan tree and reveals the nature of the Supreme Being.' },
  { num: 16, title: 'Daivāsura Sampad Vibhāga Yoga', translation: 'The Yoga of Divine & Demonic Natures', desc: 'Contrasts the qualities of the divine-minded with those of the demonic, guiding righteous conduct.' },
  { num: 17, title: 'Śraddhātraya Vibhāga Yoga', translation: 'The Yoga of the Threefold Faith', desc: 'Analyzes the three types of faith, food, sacrifice, and austerity based on the gunas.' },
  { num: 18, title: 'Mokṣa Sannyāsa Yoga', translation: 'The Yoga of Liberation by Renunciation', desc: 'A summary of the Gītā’s teachings on action, knowledge, and devotion, culminating in the ultimate instruction of surrender.' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Chapters = () => {
  return (
    <div className="bg-[#F8F5F2] text-slate-800 min-h-screen">
      {/* Page Header */}
      <motion.section
        className="py-20 sm:py-24 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <BookOpenIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">
            The 18 Yogas of the Gītā
          </h1>
          <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            Each chapter of the Bhagavad Gītā is a specialized form of yoga, a path to connect with the Divine. Together, they form a complete guide to living a life of wisdom, purpose, and spiritual freedom.
          </p>
          <div className="mt-8">
            <Link
              to="/gita"
              className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Gītā Overview
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Chapters Grid */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {allChapters.map((c, i) => (
              <motion.div
                key={c.num}
                className="bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-lg hover:border-amber-300 transition-all duration-300 flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05 } },
                }}
              >
                <div className="flex-grow">
                  <div className="text-amber-700 font-semibold tracking-wide">Chapter {c.num}</div>
                  <h2 className="mt-2 text-xl font-semibold text-slate-900">{c.title}</h2>
                  <h3 className="mt-1 text-base text-slate-500 italic">{c.translation}</h3>
                  <p className="mt-3 text-slate-600 text-sm leading-6">{c.desc}</p>
                </div>
                <div className="mt-6 text-right">
                    {/* This link is a placeholder for a future individual chapter page */}
                    <Link to={`/gita/chapters/adhyay${c.num}`} className="font-bold text-sm text-amber-700 hover:text-amber-900 inline-flex items-center group">
                        Read More
                        <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chapters;
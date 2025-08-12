import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  HeartIcon,
  LightBulbIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const guideSections = [
    {
        Icon: HeartIcon,
        title: "1. Set Your Intention (Saṅkalpa)",
        content: "Before you read the first verse, take a moment to set a clear, heartfelt intention. Are you seeking clarity, peace, strength, or a deeper connection to the Divine? Approaching the Gītā as a sacred dialogue rather than just an academic text will open your heart to its wisdom."
    },
    {
        Icon: BookOpenIcon,
        title: "2. Choose a Worthy Companion",
        content: "The Gītā's depth is best revealed through a good translation and commentary. A commentary acts as a trusted guide, clarifying complex ideas and cultural context. Find one that resonates with you.",
        link: { to: "/gita/resources", text: "Explore Recommended Commentaries" }
    },
    {
        Icon: LightBulbIcon,
        title: "3. Read for Insight, Not Information (Svādhyāya)",
        content: "Don't rush. Read small sections at a time—perhaps just a few verses or a single page. After reading, pause. Reflect on the meaning. Ask yourself: What does this mean to me? How does it apply to my life right now? This practice of self-study and contemplation is key."
    },
    {
        Icon: ArrowPathIcon,
        title: "4. Create an Integration Ritual",
        content: "The goal is not to master the text, but to let the text master you. Pick one verse or idea that stands out each week. Write it down. Meditate on it. Make it your theme and consciously try to apply it in your daily interactions, work, and challenges. This is how wisdom becomes embodied."
    },
];


const GitaGuide = () => {
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
            <AcademicCapIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">
            A Guide to Studying the Gītā
          </h1>
          <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            The Bhagavad Gītā is more than a book; it's a manual for life. This guide offers a simple framework to help you approach its timeless wisdom with reverence, clarity, and a practical spirit.
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

      {/* The Guide Content */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="space-y-12">
                {guideSections.map((section, i) => (
                    <motion.div
                        key={section.title}
                        className="flex items-start gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: i * 0.15 } },
                        }}
                    >
                        <div className="flex-shrink-0 w-12 h-12 mt-1 rounded-full bg-white border border-slate-200 text-amber-700 flex items-center justify-center">
                            <section.Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif text-slate-900">{section.title}</h2>
                            <p className="mt-3 text-slate-600 text-[17px] leading-relaxed">{section.content}</p>
                            {section.link && (
                                <div className="mt-4">
                                    <Link to={section.link.to} className="font-bold text-amber-700 hover:text-amber-900 inline-flex items-center group">
                                        {section.link.text}
                                        <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Concluding CTA */}
            <motion.div
                className="mt-20 text-center bg-white border border-amber-200/60 rounded-xl p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeIn}
            >
                <h3 className="text-2xl font-serif text-slate-900">Your Journey Begins</h3>
                <p className="max-w-xl mx-auto mt-3 text-slate-600">
                    With these principles in mind, you are ready to begin. Start with the foundational chapters or simply explore the verses that call to you. Let the Gītā speak.
                </p>
                <div className="mt-6">
                    <Link
                        to="/gita/chapters"
                        className="inline-block bg-amber-600 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-amber-700 transition-all duration-300 rounded-md"
                    >
                        Explore All Chapters
                    </Link>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

// A small ArrowRightIcon component needed for the internal link
const ArrowRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);


export default GitaGuide;
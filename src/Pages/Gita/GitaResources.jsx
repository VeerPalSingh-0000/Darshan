import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeftIcon,
  BookmarkSquareIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

// Data for different types of Gita resources
const commentaries = [
  {
    title: "The Bhagavad Gita",
    author: "Commentary by Eknath Easwaran",
    description:
      "A highly accessible and practical translation and commentary that focuses on applying the Gita's wisdom to daily life and meditation.",
    link: "https://www.amazon.in/dp/1586380192/",
  },
  {
    title: "God Talks with Arjuna",
    author: "Commentary by Paramahansa Yogananda",
    description:
      "A comprehensive and deeply spiritual interpretation from a yogic perspective, revealing the esoteric layers of the text.",
    link: "https://www.amazon.in/dp/0876120322/",
  },
  {
    title: "The Bhagavad Gita: A New Translation",
    author: "Translated by Stephen Mitchell",
    description:
      "A modern, poetic translation that is praised for its clarity and lyrical quality, making it accessible to contemporary readers.",
    link: "https://www.amazon.in/dp/0609810340/",
  },
];

const websites = [
  {
    title: "Gita Supersite",
    creator: "IIT Kanpur",
    description:
      "An extensive resource with multiple translations and commentaries (including Shankara, Ramanuja, and Madhva), word-for-word translations, and audio recordings.",
    link: "https://www.gitasupersite.iitk.ac.in/",
  },
  {
    title: "Bhagavad Gita by Swami Vivekananda",
    creator: "Vivekananda.net",
    description:
      "A collection of Swami Vivekananda's insightful commentaries and notes on the Gita, presented in a clear, readable format.",
    link: "https://www.vivekananda.net/gita.html",
  },
];

const apps = [
  {
    title: "Bhagavad Gita - Audio & Text",
    creator: "Gita Society",
    description:
      "A simple and clean app featuring text in multiple languages, audio recitations, and basic search functionality for on-the-go study.",
    link: "https://play.google.com/store/apps/details?id=com.gitagames.gita",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const GitaResources = () => {
  return (
    <div className="bg-[#F8F5F2] dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">
      {/* Page Header */}
      <motion.section
        className="py-20 sm:py-24 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center">
            <BookmarkSquareIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-wider text-slate-900 dark:text-slate-100">
            Study Resources
          </h1>
          <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A curated list of reliable commentaries, websites, and applications
            to support and deepen your journey with the Bhagavad Gītā.
          </p>
          <div className="mt-8">
            <Link
              to="/gita"
              className="inline-flex items-center gap-2 text-amber-700 dark:text-amber-500 font-semibold hover:text-amber-900 dark:hover:text-amber-400 transition-colors"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Gītā Overview
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Main Content Sections */}
      <div className="container mx-auto px-6 pb-20 sm:pb-24 space-y-16">
        {/* Section: Books */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-serif text-slate-800 dark:text-slate-200 mb-8 text-center">
            Essential Commentaries (Books)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commentaries.map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-300 flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: i * 0.1 },
                  },
                }}
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    by {item.author}
                  </p>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 group"
                  >
                    View Resource
                    <LinkIcon className="h-4 w-4 transform transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section: Websites & Apps */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-serif text-slate-800 dark:text-slate-200 mb-8 text-center">
            Digital & Mobile Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...websites, ...apps].map((item, i) => (
              <motion.div
                key={item.title}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800 hover:shadow-lg hover:border-amber-300 dark:hover:border-amber-500 transition-all duration-300 flex flex-col"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: i * 0.1 },
                  },
                }}
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    from {item.creator}
                  </p>
                  <p className="mt-3 text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-6">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-900 group"
                  >
                    Visit Website or App
                    <LinkIcon className="h-4 w-4 transform transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default GitaResources;

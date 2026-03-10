import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MagnifyingGlassIcon,
  SparklesIcon,
  CheckCircleIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const SemanticSearch = () => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock semantic search data
  const MOCK_RESULTS = [
    {
      ref: "2.14",
      sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः",
      translation:
        "The contacts of the senses with their objects bring cold, heat, pleasure, and pain. They come and go — endure them bravely.",
      matchScore: 92,
      reasoning:
        "Discusses enduring emotional and physical turbulence (anxiety/stress) with equanimity.",
    },
    {
      ref: "2.47",
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन",
      translation: "You have a right to action alone, never to its fruits.",
      matchScore: 88,
      reasoning:
        "Focuses on action without attachment to outcomes, relieving the pressure of expectation.",
    },
    {
      ref: "6.34",
      sanskrit: "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद् दृढम्",
      translation:
        "The mind is very restless, turbulent, strong and obstinate, O Krishna. I deem it as difficult to control as the wind.",
      matchScore: 85,
      reasoning: "Directly addresses the turbulent nature of the human mind.",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setHasSearched(false);

    // Simulate backend vector query latency
    setTimeout(() => {
      setResults(query.toLowerCase().length > 3 ? MOCK_RESULTS : []);
      setIsSearching(false);
      setHasSearched(true);
    }, 1800);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#FDF8F0] dark:bg-[#0c0f17] border-y border-amber-900/5 dark:border-amber-100/5 relative overflow-hidden">
      {/* Mystical Background Orbs */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-amber-400/5 dark:bg-amber-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-sky-400/5 dark:bg-sky-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/50 dark:bg-amber-900/20 border border-amber-200/50 dark:border-amber-800/30 text-amber-700 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-6">
            <SparklesIcon className="w-4 h-4" /> AI Semantic Search
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 dark:text-white mb-6 tracking-tight">
            Search by Concept, Not Keyword
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 font-light max-w-2xl mx-auto">
            Experience deep vector-based search. Try conceptual questions like:{" "}
            <br />
            <span className="italic font-medium text-amber-600 dark:text-amber-400">
              "How do I handle anxiety?"
            </span>{" "}
            or{" "}
            <span className="italic font-medium text-amber-600 dark:text-amber-400">
              "What is the meaning of duty?"
            </span>
          </p>
        </div>

        {/* Search Bar Container */}
        <motion.form
          onSubmit={handleSearch}
          className="relative max-w-3xl mx-auto group shadow-[0_0_40px_rgba(245,158,11,0.05)] dark:shadow-[0_0_40px_rgba(245,158,11,0.02)] rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-300 dark:from-amber-600 dark:to-orange-600 rounded-3xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="relative flex items-center bg-white dark:bg-slate-900 pl-6 pr-3 py-3 rounded-3xl border border-amber-100 dark:border-slate-800">
            <MagnifyingGlassIcon className="w-6 h-6 text-amber-500 dark:text-amber-600" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. How to deal with loss and grief?"
              className="flex-1 bg-transparent border-none focus:ring-0 text-lg md:text-xl px-4 py-3 text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-serif outline-none"
            />
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-white px-8 py-3.5 rounded-2xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSearching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Divining...
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </motion.form>

        {/* Search Results Area */}
        <AnimatePresence>
          {hasSearched && results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 space-y-6"
            >
              <div className="flex items-center gap-3 mb-8 border-b border-amber-900/10 dark:border-slate-800 pb-4">
                <CheckCircleIcon className="w-6 h-6 text-green-500" />
                <h3 className="text-xl font-serif text-slate-800 dark:text-white">
                  Most Relevant Verses
                </h3>
                <span className="ml-auto text-xs font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-slate-500">
                  Powered by Vector Embeddings
                </span>
              </div>

              {results.map((res, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  key={idx}
                  className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-md border border-amber-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl hover:shadow-xl hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-orange-500 opacity-80" />

                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    <div className="md:w-3/4">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-bold text-lg text-amber-700 dark:text-amber-500">
                          Gītā {res.ref}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                        <span className="text-sm font-semibold tracking-wide text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded flex items-center gap-1">
                          {res.matchScore}% Match
                        </span>
                      </div>

                      <p
                        className="font-serif text-2xl text-slate-900 dark:text-white mb-3"
                        style={{ textShadow: "0 0 40px rgba(245,158,11,0.1)" }}
                      >
                        {res.sanskrit}
                      </p>
                      <p className="text-lg text-slate-700 dark:text-slate-200 mb-6 italic border-l-2 border-slate-200 dark:border-slate-700 pl-4">
                        "{res.translation}"
                      </p>
                    </div>

                    <div className="md:w-1/4 bg-amber-50/50 dark:bg-amber-900/10 p-5 rounded-2xl border border-amber-100/50 dark:border-amber-800/30 self-start">
                      <div className="flex items-center gap-2 mb-2 text-amber-800 dark:text-amber-400 font-medium text-sm">
                        <SparklesIcon className="w-4 h-4" /> AI Reasoning
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {res.reasoning}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {hasSearched && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-16 text-center text-slate-500 dark:text-slate-400 py-12"
            >
              <DocumentTextIcon className="w-12 h-12 mx-auto mb-4 opacity-50 text-amber-400" />
              <p>
                No highly relevant verses found in this dimension. Try another
                concept.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SemanticSearch;

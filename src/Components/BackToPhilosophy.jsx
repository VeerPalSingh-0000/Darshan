import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const BackToPhilosophy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-20 left-6 z-40 md:top-24 md:left-8"
    >
      <Link to="/explore">
        <motion.button
          whileHover={{ x: -3, y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 dark:bg-black/30 backdrop-blur-md text-white font-medium text-sm hover:bg-white/20 dark:hover:bg-black/40 transition-all duration-200 border border-white/20 dark:border-white/10 shadow-lg hover:shadow-xl ring-1 ring-white/10"
        >
          <ArrowLeftIcon className="w-4 h-4 stroke-[2.5]" />
          Back
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default BackToPhilosophy;

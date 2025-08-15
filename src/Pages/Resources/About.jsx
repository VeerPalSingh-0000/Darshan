import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Assuming you are using react-router-dom for navigation
import { 
  HeartIcon, 
  BookOpenIcon, 
  SparklesIcon, 
  ArrowRightIcon,
  AcademicCapIcon,
  GlobeAltIcon,
  LightBulbIcon
} from '@heroicons/react/24/solid';

// --- Animation Variants for Framer Motion ---

// Standard fade-in-up animation
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.6, -0.05, 0.01, 0.99] 
    } 
  }
};

// Stagger container for animating children in sequence
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

// Feature card animation
const featureCardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// --- Team Member Data (for easy updating) ---
const teamMembers = [
  {
    name: 'Veer Pal Singh', // Replace with your name
    role: 'Creator & Lead Developer',
    avatarUrl: 'https://placehold.co/400x400/FFFDF9/333333?text=VPS', // Replace with a link to your photo or use a placeholder
    bio: 'A passionate student of philosophy and a self-taught developer, I created The Seeker\'s Path to build a modern, accessible, and beautiful space for exploring the profound depths of Indian thought.',
    socials: [
      { name: 'Twitter', url: '#', icon: 'T' }, // Replace with your social links
      { name: 'GitHub', url: 'https://github.com/VeerPalSingh-0000', icon: 'G' },
      { name: 'LinkedIn', url: '#', icon: 'L' },
    ]
  }
];

// --- The About Component ---
const About = () => {
  return (
    <div className="bg-[#F8F5F2] text-slate-800 font-sans">
      
      {/* =================================== */}
      {/* Hero Section */}
      {/* =================================== */}
      <header className="bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 py-24 md:py-32 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <SparklesIcon className="h-12 w-12 text-amber-500 mx-auto mb-4" />
            </motion.div>
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-serif uppercase tracking-wider text-slate-900"
            >
              The Journey Within
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              This project was born from a simple yet profound belief: that ancient wisdom holds timeless relevance. We aim to bridge the gap between millennia-old philosophies and the modern digital world.
            </motion.p>
          </motion.div>
        </div>
      </header>
      
      {/* =================================== */}
      {/* Our Mission Section */}
      {/* =================================== */}
      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-serif text-slate-900">
              Our Guiding Philosophy
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8"></motion.div>
            <motion.p variants={fadeInUp} className="text-slate-600 text-lg leading-relaxed">
              Darśana means 'a way of seeing'. Our mission is not to provide definitive answers, but to offer a clearer lens through which to view the profound questions of existence. We are dedicated to presenting these complex ideas with clarity, respect, and intellectual honesty, creating a space for learning and contemplation.
            </motion.p>
          </motion.div>
        </div>
      </section>
      
      {/* =================================== */}
      {/* Features Section */}
      {/* =================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-serif uppercase tracking-wider text-slate-900">What This Platform Offers</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              A toolkit for the modern seeker.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {/* Feature 1: Structured Learning */}
            <motion.div variants={featureCardVariants} className="bg-slate-50/50 p-8 rounded-xl border border-slate-200/80 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <BookOpenIcon className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">Structured Learning</h3>
              <p className="mt-2 text-slate-600 text-sm leading-6">
                Journey through the Āstika and Nāstika schools, presented with clear explanations and historical context.
              </p>
            </motion.div>
            
            {/* Feature 2: Deep Dives */}
            <motion.div variants={featureCardVariants} className="bg-slate-50/50 p-8 rounded-xl border border-slate-200/80 text-center">
              <div className="w-16 h-16 rounded-full bg-teal-500/10 text-teal-600 flex items-center justify-center mx-auto">
                <AcademicCapIcon className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">In-Depth Resources</h3>
              <p className="mt-2 text-slate-600 text-sm leading-6">
                Explore key texts, influential scholars, and a comprehensive glossary of Sanskrit terms to deepen your understanding.
              </p>
            </motion.div>
            
            {/* Feature 3: Mindful Design */}
            <motion.div variants={featureCardVariants} className="bg-slate-50/50 p-8 rounded-xl border border-slate-200/80 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-600 flex items-center justify-center mx-auto">
                <HeartIcon className="w-8 h-8" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900">A Mindful Experience</h3>
              <p className="mt-2 text-slate-600 text-sm leading-6">
                A clean, beautiful, and ad-free interface designed to facilitate focus and contemplation without digital distraction.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* =================================== */}
      {/* Creator Section */}
      {/* =================================== */}
      <section className="py-20 sm:py-28 bg-[#F8F5F2]">
        <div className="container mx-auto px-6">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl font-serif uppercase tracking-wider text-slate-900">Meet The Creator</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              This project is a labor of love by a dedicated individual.
            </p>
          </motion.div>
          
          {teamMembers.map((member) => (
            <motion.div 
              key={member.name}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:flex"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <div className="md:w-1/3">
                <img 
                  className="w-full h-full object-cover" 
                  src={member.avatarUrl}
                  alt={`Portrait of ${member.name}`}
                  onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/FFFDF9/333333?text=Error'; }}
                />
              </div>
              <div className="p-8 md:p-10 md:w-2/3 flex flex-col justify-center">
                <h3 className="text-2xl font-serif text-slate-900">{member.name}</h3>
                <p className="text-sm font-semibold text-amber-600 tracking-wider uppercase">{member.role}</p>
                <p className="mt-4 text-slate-600 leading-relaxed">{member.bio}</p>
                <div className="mt-6 flex space-x-4">
                  {member.socials.map(social => (
                    <a 
                      key={social.name} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-amber-500 hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      {/* Simple text icons for easy setup */}
                      <span className="font-bold text-sm">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* =================================== */}
      {/* Call to Action Section */}
      {/* =================================== */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20 sm:py-24">
          <motion.div 
            className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-8 md:p-12 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-serif text-slate-900">
              Begin Your Journey
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-slate-600">
              The path of inquiry is endless. Whether you are a curious newcomer or a seasoned student, there is always more to discover.
            </p>
            <div className="mt-8">
              <Link
                to="/explore" // Link to your main exploration page
                className="inline-flex items-center gap-2 bg-amber-600 text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-amber-700 transition-all duration-300 rounded-md shadow-lg hover:shadow-xl"
              >
                Explore The Schools
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRightIcon, BookOpenIcon, FireIcon, HeartIcon } from '@heroicons/react/24/outline';

// Import the new GayatriMantra component
import GayatriMantra from '../Components/GayatriMantra'; 

// Import the schools data from our data file
import { schools } from '../data/schoolsOfThought.jsx';

// Animation variants for Framer Motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Home = () => {
  // We'll feature the first 3 schools on the homepage
  const featuredSchools = schools.slice(0, 3);

  return (
    <div className="min-h-screen"> {/* Added container with min-height */}
      {/* Replace the old component with the new one */}
      <GayatriMantra />

      <div className="bg-[#F8F5F2] text-slate-800">
        {/* ============== Hero Section ============== */}
        <section className="relative min-h-screen flex items-center justify-center text-center text-white px-4">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1698167646833-b705453b235e?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Himalayan sunrise background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
          </div>
          
          <motion.div 
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-8xl font-serif tracking-wide uppercase text-shadow-md">
              The Seeker's Path
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-200 font-light leading-relaxed">
              Journey through millennia of profound wisdom. Explore the diverse philosophies of India and uncover timeless truths about reality, consciousness, and the self.
            </p>
            <Link 
              to="/explore" 
              className="mt-10 inline-block border-2 border-white text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Begin Exploring
            </Link>
          </motion.div>
        </section>

        {/* ============== Introduction Section ============== */}
        <section className="py-24 sm:py-32 bg-[#F8F5F2]">
          <motion.div 
            className="container mx-auto px-6 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">What is Darśana?</h2>
            <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8"></div>
            <p className="max-w-4xl mx-auto text-lg text-slate-600 leading-relaxed">
              Darśana (दर्शन), the philosophy of India, is a 'way of seeing' beyond the veil of ordinary perception. It is a mosaic of ancient traditions, each providing a unique Mārga (मार्ग)—a path of inquiry and practice. This journey is undertaken not for academic knowledge, but for Moksha (मोक्ष), the soul's release from the bonds of suffering.
            </p>
          </motion.div>
        </section>

        {/* ============== Featured Schools Section ============== */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="container mx-auto px-6">
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">Schools of Thought</h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">A glimpse into the foundational schools that form the bedrock of Indian philosophy.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredSchools.map((school, index) => (
                <motion.div
                  key={school.name}
                  className="bg-slate-50/50 p-8 rounded-lg border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-colors duration-300 flex flex-col text-center items-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                  }}
                >
                  <div className="bg-amber-500/10 p-4 rounded-full">{school.icon}</div>
                  <h3 className="text-2xl font-serif tracking-wider uppercase mt-6 mb-3 text-slate-800">{school.name}</h3>
                  <p className="text-slate-600 flex-grow text-sm leading-6">{school.description}</p>
                  <Link to={school.path} className="mt-6 font-bold text-sm text-amber-700 hover:text-amber-900 inline-flex items-center group">
                    Learn More <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-16">
              <Link to="/explore" className="text-lg text-slate-700 font-semibold hover:text-black">
                Explore all nine schools &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* ============== Bhagavad Gītā Section ============== */}
        <section className="py-24 sm:py-32 bg-[#FFFDF9]">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-14"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">Bhagavad Gītā</h2>
              <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8"></div>
              <p className="mt-2 text-lg text-slate-600 max-w-3xl mx-auto">
                The Song of the Divine—an intimate dialogue on duty, devotion, and discernment at the edge of battle.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  Icon: BookOpenIcon,
                  title: "Jnana, Karma, Bhakti",
                  desc: "Integrated paths of knowledge, action, and devotion harmonized for inner clarity and outer responsibility."
                },
                {
                  Icon: FireIcon,
                  title: "Svadharma & Detachment",
                  desc: "Act according to your nature and role, offering fruits of action without attachment to outcomes."
                },
                {
                  Icon: HeartIcon,
                  title: "Yoga of Devotion",
                  desc: "Surrender with love and trust; see the Divine in all beings and serve the world as worship."
                }
              ].map(({ Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  className="bg-white p-8 rounded-xl border border-slate-200/70 shadow-sm hover:shadow-md transition-shadow"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } }
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-2 text-slate-600 text-sm leading-6">{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Key Verse */}
            <motion.div
              className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-8 md:p-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-sm tracking-wider text-amber-700 uppercase font-semibold">Verse Highlight</p>
                <blockquote className="mt-4">
                  <p className="text-xl md:text-2xl font-serif text-slate-900 leading-relaxed">
                    कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।
                    मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥
                  </p>
                  <p className="mt-3 text-slate-600 italic">
                    You have a right to action alone, never to its fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction. (Gītā 2.47)
                  </p>
                </blockquote>
                <div className="mt-8">
                  <Link
                    to="/gita"
                    className="inline-flex items-center gap-2 font-bold text-amber-700 hover:text-amber-900"
                  >
                    Read more from the Gītā
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============== Additional Content Section (to ensure enough height) ============== */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
            >
              <h3 className="text-2xl font-serif text-slate-800 mb-4">Continue Your Journey</h3>
              <p className="text-slate-600 mb-8">
                Discover more philosophical traditions and deepen your understanding of ancient wisdom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/explore" 
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors duration-300"
                >
                  Explore All Schools
                </Link>
                <Link 
                  to="/about" 
                  className="border border-amber-600 text-amber-600 px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors duration-300"
                >
                  Learn About This Project
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;

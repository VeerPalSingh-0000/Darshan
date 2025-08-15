import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRightIcon,
  BookOpenIcon,
  FireIcon,
  HeartIcon,
  ScaleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const chapters = [
  { num: 1, title: 'Arjuna Viṣāda Yoga', desc: 'Arjuna\'s despair and the setting of the stage for spiritual instruction.' },
  { num: 2, title: 'Sāṅkhya Yoga', desc: 'The Yoga of Wisdom: discernment, steadiness, and duty.' },
  { num: 3, title: 'Karma Yoga', desc: 'Selfless action offered without attachment to fruits.' },
  { num: 6, title: 'Dhyāna Yoga', desc: 'Meditation and the disciplined mind.' },
  { num: 12, title: 'Bhakti Yoga', desc: 'The path of loving devotion.' },
  { num: 18, title: 'Mokṣa Sannyāsa Yoga', desc: 'Renunciation, freedom, and culminating counsel.' },
];

const verses = [
  {
    ref: '2.47',
    devanagari:
      'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    translit:
      "karmaṇy evādhikāras te mā phaleṣu kadācana; mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi.",
    translation:
      'You have a right to action alone, never to the fruits. Let not the fruits of action be your motive; neither let your attachment be to inaction.',
  },
  {
    ref: '4.7–8',
    devanagari:
      'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदाऽअत्मानं सृजाम्यहम्॥\nपरित्राणाय साधूनाṁ विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',
    translit:
      'yadā yadā hi dharmasya glānir bhavati bhārata,\nabhyutthānam adharmasya tadā ātmānaṁ sṛjāmy aham.\nparitrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām,\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge.',
    translation:
      'Whenever righteousness declines and unrighteousness rises, I manifest Myself; to protect the good, destroy the wicked, and establish dharma—age after age.',
  },
  {
    ref: '12.15',
    devanagari:
      'यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥',
    translit:
      'yasmān nodvijate loko lokān nodvijate ca yaḥ\nharṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ',
    translation:
      'One who neither agitates the world nor is agitated by it, who is free from joy, envy, fear, and anxiety—such a devotee is dear to Me.',
  },
];

const themes = [
  {
    Icon: BookOpenIcon,
    title: 'Jnana (Wisdom)',
    desc: 'Discrimination (viveka) between the imperishable Self and changing nature clarifies action.',
  },
  {
    Icon: FireIcon,
    title: 'Karma (Action)',
    desc: 'Act selflessly, offering results, and fulfill your duty in harmony with dharma.',
  },
  {
    Icon: HeartIcon,
    title: 'Bhakti (Devotion)',
    desc: 'Surrender with love and trust; see the Divine in all and serve as worship.',
  },
  {
    Icon: ScaleIcon,
    title: 'Svadharma & Detachment',
    desc: 'Perform your role according to your nature, without attachment to outcomes.',
  },
  {
    Icon: EyeIcon,
    title: 'Yoga of Equanimity',
    desc: 'Steadiness amidst dualities—success and failure, praise and blame.',
  },
];

const Gita = () => {
  return (
    <div className="bg-[#F8F5F2] text-slate-800">
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[100vh] flex items-center justify-center text-center text-white px-4">
        <div className="absolute inset-0">
          <img
            src="https://cdn.pixabay.com/photo/2017/03/05/21/43/mountains-2120004_1280.jpg"
            alt="Subtle sunrise over river"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30" />
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-serif tracking-wide uppercase">Bhagavad Gītā</h1>
          <p className="mt-4 text-base md:text-lg max-w-3xl mx-auto text-slate-200 font-light leading-relaxed">
            A dialogue on duty, devotion, and discernment—revealed in the heart of conflict to illumine a life of freedom.
          </p>
          <div className="mt-8">
            <Link
              to="/explore"
              className="inline-block border-2 border-white text-white font-bold tracking-widest uppercase py-3 px-8 text-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              Back to Explore
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Overview */}
      <section className="py-20 sm:py-24">
        <motion.div
          className="container mx-auto px-6 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">
            Essence of the Gītā
          </h2>
          <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8" />
          <p className="max-w-4xl mx-auto text-lg text-slate-600 leading-relaxed">
            The Gītā integrates paths of wisdom (Jñāna), action (Karma), and devotion (Bhakti), guiding one to
            act without attachment, steady the mind, and see the Divine in all. Its counsel harmonizes inner
            freedom with outer responsibility.
          </p>
        </motion.div>
      </section>

      {/* Chapters grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl md:text-4xl font-serif uppercase tracking-wider text-slate-900">Key Chapters</h3>
            <p className="mt-3 text-slate-600">Landmarks on the integrative path of the Gītā.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chapters.map((c, i) => (
              // --- UPDATED: Wrapped chapter card in a Link component ---
              <Link to={`/gita/chapters/adhyay${c.num}`} key={c.num} className="block group">
                <motion.div
                  className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/80 group-hover:border-amber-400 group-hover:bg-white transition-all duration-300 h-full flex flex-col group-hover:shadow-lg"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } },
                  }}
                >
                  <div className="text-amber-700 font-semibold tracking-wide">Chapter {c.num}</div>
                  <h4 className="mt-2 text-xl font-semibold text-slate-900">{c.title}</h4>
                  <p className="mt-2 text-slate-600 text-sm leading-6 flex-grow">{c.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/gita/chapters" className="font-bold text-amber-700 hover:text-amber-900 inline-flex items-center group">
              Explore all chapters
              <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Verse highlights */}
      <section className="py-20 sm:py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl md:text-4xl font-serif uppercase tracking-wider text-slate-900">Selected Verses</h3>
            <p className="mt-3 text-slate-600">Reflections that frame action, devotion, and steadiness.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {verses.map((v, i) => (
              <motion.figure
                key={v.ref}
                className="bg-gradient-to-b from-amber-50 to-orange-50 border border-amber-100 rounded-xl p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } },
                }}
              >
                <figcaption className="text-xs tracking-wider text-amber-700 uppercase font-semibold">Gītā {v.ref}</figcaption>
                <blockquote className="mt-3 whitespace-pre-line text-slate-900 font-serif leading-relaxed">
                  {v.devanagari}
                </blockquote>
                <p className="mt-3 text-slate-700 text-sm italic whitespace-pre-line">{v.translit}</p>
                <p className="mt-3 text-slate-600 text-sm leading-6">{v.translation}</p>
              </motion.figure>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gita/verses" className="font-bold text-amber-700 hover:text-amber-900 inline-flex items-center group">
              Read more verses
              <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Thematic pillars */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-14"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl md:text-4xl font-serif uppercase tracking-wider text-slate-900">Living the Gītā</h3>
            <p className="mt-3 text-slate-600">Integrate wisdom, action, and devotion in everyday life.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {themes.map(({ Icon, title, desc }, i) => (
              <motion.div
                key={title}
                className="bg-slate-50/50 p-6 rounded-xl border border-slate-200/80 hover:border-slate-300 hover:bg-white transition-colors duration-300"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06 } },
                }}
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="mt-4 text-lg font-semibold text-slate-900">{title}</h4>
                <p className="mt-2 text-slate-600 text-sm leading-6">{desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/gita/resources" className="font-bold text-amber-700 hover:text-amber-900 inline-flex items-center group">
              Study resources and commentaries
              <ArrowRightIcon className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20  sm:py-24 relative overflow-hidden text-white">
        <div className="absolute inset-0">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/29/04/19/ocean-1867285_1280.jpg"
            alt="Calm river at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/80 via-orange-700/70 to-red-700/70" />
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <motion.h3
            className="text-3xl md:text-5xl font-serif"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7 }}
          >
            Act with clarity. Offer the fruits. Rest in freedom.
          </motion.h3>
          <motion.p
            className="mt-4 text-slate-100 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            The Gītā’s integrative path invites steadiness in action and tenderness of heart. Begin a focused study or explore key verses to bring its wisdom into daily life.
          </motion.p>
          <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
            <Link
              to="/gita/guide"
              className="inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-md hover:bg-slate-100 transition"
            >
              Study Guide
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to="/gita/verses"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-slate-900 transition"
            >
              Key Verses
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gita;

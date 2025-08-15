import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, SparklesIcon, BookOpenIcon, HeartIcon, SunIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/solid';

// --- Expanded Verse Data with Thematic Categories ---
const allVerses = [
  // Karma Yoga (The Path of Action)
  { ref: '2.47', devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥', translit: "karmaṇy evādhikāras te mā phaleṣu kadācana;\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi.", translation: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.', category: 'Karma Yoga' },
  { ref: '3.5', devanagari: 'न हि कश्चित्क्षणमपि जातु तिष्ठत्यकर्मकृत्।\nकार्यते ह्यवशः कर्म सर्वः प्रकृतिजैर्गुणैः॥', translit: 'na hi kaścit kṣaṇam api jātu tiṣṭhaty akarma-kṛt;\nkāryate hy avaśaḥ karma sarvaḥ prakṛti-jair guṇaiḥ.', translation: 'No one can remain without action even for a moment. Indeed, all are helplessly driven to action by the qualities born of material nature.', category: 'Karma Yoga' },
  { ref: '18.47', devanagari: 'श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात्।\nस्वभावनियतं कर्म कुर्वन्नाप्नोति किल्बिषम्॥', translit: 'śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt;\nsvabhāva-niyataṁ karma kurvan nāpnoti kilbiṣam.', translation: 'It is better to engage in one’s own occupation, even though one may perform it imperfectly, than to accept another’s occupation and perform it perfectly. Duties prescribed according to one’s nature are never affected by sinful reactions.', category: 'Karma Yoga' },

  // Jñāna Yoga (The Path of Knowledge)
  { ref: '2.20', devanagari: 'न जायते म्रियते वा कदाचि-\nन्नायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥', translit: 'na jāyate mriyate vā kadācin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ.\najo nityaḥ śāśvato ’yaṁ purāṇo\nna hanyate hanyamāne śarīre.', translation: 'For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing and primeval. He is not slain when the body is slain.', category: 'Jñāna Yoga' },
  { ref: '4.38', devanagari: 'न हि ज्ञानेन सदृशं पवित्रमिह विद्यते।\nतत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति॥', translit: 'na hi jñānena sadṛśaṁ pavitram iha vidyate;\ntat svayaṁ yoga-saṁsiddhaḥ kālenātmani vindati.', translation: 'In this world, there is nothing so sublime and pure as transcendental knowledge. Such knowledge is the mature fruit of all mysticism. And one who has become accomplished in the practice of devotional service enjoys this knowledge within himself in due course of time.', category: 'Jñāna Yoga' },
  { ref: '13.28', devanagari: 'समं सर्वेषु भूतेषु तिष्ठन्तं परमेश्वरम्।\nविनश्यत्स्वविनश्यन्तं यः पश्यति स पश्यति॥', translit: 'samaṁ sarveṣu bhūteṣu tiṣṭhantaṁ parameśvaram;\nvinaśyatsv avinaśyantaṁ yaḥ paśyati sa paśyati.', translation: 'One who sees the Supersoul accompanying the individual soul in all bodies, and who understands that neither the soul nor the Supersoul within the destructible body is ever destroyed, actually sees.', category: 'Jñāna Yoga' },

  // Bhakti Yoga (The Path of Devotion)
  { ref: '9.26', devanagari: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥', translit: 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati;\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ.', translation: 'If one offers Me with love and devotion a leaf, a flower, a fruit, or water, I will accept it.', category: 'Bhakti Yoga' },
  { ref: '12.13-14', devanagari: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥\nसन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥', translit: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca;\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī.\nsantuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ;\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ.', translation: 'One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant, always satisfied, self-controlled, and engaged in devotional service with determination, his mind and intelligence fixed on Me—such a devotee of Mine is very dear to Me.', category: 'Bhakti Yoga' },
  { ref: '18.66', devanagari: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥', translit: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja;\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ.', translation: 'Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.', category: 'Bhakti Yoga' },
];

const categories = [
  { name: 'All Verses', icon: <SparklesIcon /> },
  { name: 'Karma Yoga', icon: <SunIcon /> },
  { name: 'Jñāna Yoga', icon: <BookOpenIcon /> },
  { name: 'Bhakti Yoga', icon: <HeartIcon /> },
];

// --- Animation Variants ---
const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeInOut" } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants = { hidden: { opacity: 0, y: 20, scale: 0.98 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } } };

// --- Reusable Copy Button Component ---
const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-1.5 rounded-full bg-amber-200/50 text-amber-700 hover:bg-amber-200 transition-colors">
      {copied ? <CheckIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}
    </button>
  );
};


// --- Main GitaVerses Component ---
const GitaVerses = () => {
  const [activeCategory, setActiveCategory] = useState('All Verses');
  const [verseOfTheDay, setVerseOfTheDay] = useState(null);

  useEffect(() => {
    // Select a random verse of the day on component mount
    setVerseOfTheDay(allVerses[Math.floor(Math.random() * allVerses.length)]);
  }, []);

  const filteredVerses = useMemo(() => 
    activeCategory === 'All Verses' 
      ? allVerses 
      : allVerses.filter(v => v.category === activeCategory),
    [activeCategory]
  );

  return (
    <div className="bg-[#FFFDF9] text-slate-800 min-h-screen font-sans">
      {/* Page Header */}
      <motion.header className="bg-white py-20 sm:py-24 text-center border-b border-slate-200" initial="hidden" animate="visible" variants={fadeIn}>
        <div className="container mx-auto px-6">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-lg">
            <SparklesIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">Words of Wisdom</h1>
          <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">A curated collection of pivotal verses from the Bhagavad Gītā, offering timeless guidance on wisdom, action, and devotion.</p>
          <div className="mt-8">
            <Link to="/gita" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:text-amber-900 transition-colors">
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Gītā Overview
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Verse of the Day Section */}
      {verseOfTheDay && (
        <section className="py-16 bg-[#F8F5F2]">
          <div className="container mx-auto px-6">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
              <h2 className="text-center text-2xl font-serif text-slate-800 mb-8">Verse of the Day</h2>
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-slate-200/80 p-8">
                <figcaption className="text-sm tracking-wider text-amber-800 uppercase font-semibold">Gītā {verseOfTheDay.ref}</figcaption>
                <blockquote className="mt-4 whitespace-pre-line text-slate-900 font-serif text-2xl leading-relaxed">{verseOfTheDay.devanagari}</blockquote>
                <p className="mt-4 text-slate-700 text-md italic whitespace-pre-line">{verseOfTheDay.translit}</p>
                <p className="mt-6 text-slate-600 text-[16px] leading-relaxed">{verseOfTheDay.translation}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Filtering Tabs */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 border-b border-slate-200">
        <div className="container mx-auto px-6 flex justify-center items-center gap-2 sm:gap-4">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-semibold rounded-full transition-all duration-300 ${activeCategory === cat.name ? 'bg-amber-500 text-white shadow-md' : 'text-slate-600 hover:bg-amber-100'}`}
            >
              {React.cloneElement(cat.icon, { className: 'w-4 h-4' })}
              {cat.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Verses Grid */}
      <main className="py-20 sm:py-24">
        <motion.div
          key={activeCategory} // Re-run animation when category changes
          className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredVerses.map(v => (
              <motion.figure
                key={v.ref}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-white border border-slate-200/80 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col"
              >
                <figcaption className="text-xs tracking-wider text-amber-800 uppercase font-semibold">Gītā {v.ref}</figcaption>
                <div className="mt-4 border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-start">
                    <blockquote className="whitespace-pre-line text-slate-900 font-serif text-xl leading-relaxed">{v.devanagari}</blockquote>
                    <CopyButton textToCopy={v.devanagari} />
                  </div>
                  <div className="flex justify-between items-start mt-4">
                    <p className="text-slate-700 text-sm italic whitespace-pre-line">{v.translit}</p>
                    <CopyButton textToCopy={v.translit} />
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-200 pt-4 flex-grow">
                  <div className="flex justify-between items-start">
                    <p className="text-slate-600 text-[15px] leading-relaxed">{v.translation}</p>
                    <CopyButton textToCopy={v.translation} />
                  </div>
                </div>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default GitaVerses;

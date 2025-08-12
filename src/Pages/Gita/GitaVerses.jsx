import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';

// A curated collection of important verses from the Bhagavad Gītā
const allVerses = [
  {
    ref: '2.47',
    devanagari: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    translit: "karmaṇy evādhikāras te mā phaleṣu kadācana;\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi.",
    translation: 'You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.',
  },
  {
    ref: '2.56',
    devanagari: 'दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते॥',
    translit: 'duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ;\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate.',
    translation: 'One whose mind is not shaken by misfortune, who is not elated by happiness, and who is free from attachment, fear, and anger, is called a sage of steady wisdom.',
  },
  {
    ref: '4.7-8',
    devanagari: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥\nपरित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥',
    translit: 'yadā yadā hi dharmasya glānir bhavati bhārata,\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham.\nparitrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām,\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge.',
    translation: 'Whenever and wherever there is a decline in righteous principles and a predominant rise of irreligion—at that time I descend Myself. To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of religion, I Myself appear, millennium after millennium.',
  },
  {
    ref: '9.26',
    devanagari: 'पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः॥',
    translit: 'patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati;\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ.',
    translation: 'If one offers Me with love and devotion a leaf, a flower, a fruit, or water, I will accept it.',
  },
  {
    ref: '12.13-14',
    devanagari: 'अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च।\nनिर्ममो निरहङ्कारः समदुःखसुखः क्षमी॥\nसन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः॥',
    translit: 'adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca;\nnirmamo nirahaṅkāraḥ sama-duḥkha-sukhaḥ kṣamī.\nsantuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ;\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ.',
    translation: 'One who is not envious but is a kind friend to all living entities, who does not think himself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant, always satisfied, self-controlled, and engaged in devotional service with determination, his mind and intelligence fixed on Me—such a devotee of Mine is very dear to Me.',
  },
  {
    ref: '18.66',
    devanagari: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    translit: 'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja;\nahaṁ tvāṁ sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ.',
    translation: 'Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const GitaVerses = () => {
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
            <SparklesIcon className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif uppercase tracking-wider text-slate-900">
            Words of Wisdom
          </h1>
          <div className="w-24 h-px bg-amber-500 mx-auto mt-6 mb-8" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 leading-relaxed">
            A curated collection of pivotal verses from the Bhagavad Gītā. These ślokas encapsulate the core teachings on wisdom, action, and devotion, offering timeless guidance.
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

      {/* Verses Grid */}
      <section className="pb-20 sm:pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {allVerses.map((v, i) => (
              <motion.figure
                key={v.ref}
                className="bg-gradient-to-b from-amber-50 to-orange-50/70 border border-amber-100 rounded-xl p-6 h-full flex flex-col"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } },
                }}
              >
                <figcaption className="text-xs tracking-wider text-amber-800 uppercase font-semibold">
                  Gītā {v.ref}
                </figcaption>
                <blockquote className="mt-4 whitespace-pre-line text-slate-900 font-serif text-xl leading-relaxed">
                  {v.devanagari}
                </blockquote>
                <p className="mt-4 text-slate-700 text-sm italic whitespace-pre-line">{v.translit}</p>
                <p className="mt-4 text-slate-600 text-[15px] leading-relaxed flex-grow">{v.translation}</p>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GitaVerses;
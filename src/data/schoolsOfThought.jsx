import { BeakerIcon, BoltIcon, BookOpenIcon, CircleStackIcon, ScaleIcon, ShieldCheckIcon, StarIcon } from '@heroicons/react/24/outline';

// We'll reuse icons for simplicity. You can find more specific ones if you like.
export const schools = [
  // Āstika (Orthodox) Schools
  {
    name: 'Sāṃkhya (सांख्य)',
    description: 'A dualistic school that views reality as composed of two principles: consciousness (puruṣa) and matter (prakṛti).',
    icon: <CircleStackIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/samkhya'
  },
  {
    name: 'Yoga (योग)',
    description: 'Closely linked to Sāṃkhya, it provides the practical path for liberation through discipline, meditation, and control of the mind.',
    icon: <StarIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/yoga'
  },
  {
    name: 'Nyāya (न्याय)',
    description: 'The school of logic, focusing on epistemology and the means of acquiring valid knowledge as the path to liberation.',
    icon: <ScaleIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/nyaya'
  },
  {
    name: 'Vaiśeṣika (वैशेषिक)',
    description: 'An atomist school that posits all objects in the physical universe are reducible to a finite number of atoms.',
    icon: <BeakerIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/vaisheshika'
  },
  {
    name: 'Mīmāṃsā (मीमांसा)',
    description: 'Focuses on the exegesis of the Vedas, emphasizing the importance of ritual (yajña) and upholding Dharma.',
    icon: <BookOpenIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/mimamsa'
  },
  {
    name: 'Vedānta (वेदान्त)',
    description: 'Concentrates on the philosophical teachings of the Upanishads, exploring the nature of Brahman, Ātman, and their relationship.',
    icon: <ShieldCheckIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/vedanta'
  },
  // Nāstika (Heterodox) Schools
  {
    name: 'Jainism (जैन धर्म)',
    description: 'Emphasizes non-violence (ahiṃsā), non-absolutism (anekāntavāda), and non-possessiveness (aparigraha).',
    icon: <BoltIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/jainism'
  },
  {
    name: 'Buddhism (बौद्ध धर्म)',
    description: 'Based on the teachings of Siddhartha Gautama, it focuses on the Four Noble Truths and the path to ending suffering (Nirvāṇa).',
    icon: <BoltIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/buddhism'
  },
  {
    name: 'Cārvāka (चार्वाक)',
    description: 'A materialist school that rejected supernaturalism and accepted only direct perception as a means of knowledge.',
    icon: <BoltIcon className="h-8 w-8 text-amber-600" />,
    path: '/schools/carvaka'
  }
];
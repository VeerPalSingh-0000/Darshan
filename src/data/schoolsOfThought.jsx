import React from "react";
import {
  StarIcon,
  SunIcon,
  BookOpenIcon,
  ScaleIcon,
  PuzzlePieceIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  HandRaisedIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

export const schools = [
  {
    name: "Sāṃkhya",
    sanskrit: "सांख्य",
    icon: <PuzzlePieceIcon className="w-6 h-6" />,
    tagline: "Cosmic Dualism",
    description:
      "Analysis of consciousness (puruṣa) and matter (prakṛti) through 25 evolving tattvas.",
    path: "/schools/samkhya",
    category: "Āstika",
    founder: "Kapila",
    accent: "#ea580c",
  },
  {
    name: "Yoga",
    sanskrit: "योग",
    icon: <SunIcon className="w-6 h-6" />,
    tagline: "Discipline of Mind",
    description:
      "Eight limbs of practice to still the fluctuations of thought and realize pure awareness.",
    path: "/schools/yoga",
    category: "Āstika",
    founder: "Patañjali",
    accent: "#059669",
  },
  {
    name: "Nyāya",
    sanskrit: "न्याय",
    icon: <ScaleIcon className="w-6 h-6" />,
    tagline: "Logic & Epistemology",
    description:
      "Rigorous system of reasoning—four valid means of knowledge to reach truth.",
    path: "/schools/nyaya",
    category: "Āstika",
    founder: "Akṣapāda Gautama",
    accent: "#4f46e5",
  },
  {
    name: "Vaiśeṣika",
    sanskrit: "वैशेषिक",
    icon: <SparklesIcon className="w-6 h-6" />,
    tagline: "Atomic Realism",
    description:
      "Reality analyzed into six padārthas—atoms as the irreducible building blocks of all existence.",
    path: "/schools/vaisesika",
    category: "Āstika",
    founder: "Kaṇāda",
    accent: "#7c3aed",
  },
  {
    name: "Mīmāṃsā",
    sanskrit: "मीमांसा",
    icon: <BookOpenIcon className="w-6 h-6" />,
    tagline: "Vedic Hermeneutics",
    description:
      "Dharma discerned through precise exegesis of Vedic injunctions and ritual analysis.",
    path: "/schools/mimamsa",
    category: "Āstika",
    founder: "Jaimini",
    accent: "#db2777",
  },
  {
    name: "Vedānta",
    sanskrit: "वेदान्त",
    icon: <StarIcon className="w-6 h-6" />,
    tagline: "End of the Vedas",
    description:
      "The nature of Brahman, Ātman, and liberation—with sub-schools from Advaita to Dvaita.",
    path: "/schools/vedanta",
    category: "Āstika",
    founder: "Bādarāyaṇa",
    accent: "#d97706",
  },
  {
    name: "Jainism",
    sanskrit: "जैन",
    icon: <HandRaisedIcon className="w-6 h-6" />,
    tagline: "Non-Violence",
    description:
      "Ahiṃsā, anekāntavāda, and aparigraha—the soul's ascent to omniscience.",
    path: "/schools/jainism",
    category: "Nāstika",
    founder: "Mahāvīra",
    accent: "#16a34a",
  },
  {
    name: "Buddhism",
    sanskrit: "बौद्ध",
    icon: <UsersIcon className="w-6 h-6" />,
    tagline: "The Middle Way",
    description:
      "Dependent origination, emptiness, and the Noble Eightfold Path to Nirvāṇa.",
    path: "/schools/buddhism",
    category: "Nāstika",
    founder: "Siddhārtha Gautama",
    accent: "#ca8a04",
  },
  {
    name: "Cārvāka",
    sanskrit: "चार्वाक",
    icon: <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />,
    tagline: "Radical Materialism",
    description:
      "Only perception is valid—live fully in this world, this moment, this body.",
    path: "/schools/carvaka",
    category: "Nāstika",
    founder: "Bṛhaspati",
    accent: "#dc2626",
  },
];

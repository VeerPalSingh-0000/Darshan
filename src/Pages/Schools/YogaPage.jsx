import React, { useState } from 'react';
import { ChevronRight, Scroll, Flower, Eye, Heart, Brain, Flame, Droplets, Mountain, Wind, X } from 'lucide-react';
import bgImage from '../../assets/Images/mountains.jpg'; // Example background image
const YogaPage = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  // Data
  const quotes = [
    {
      text: "Yogaś citta-vṛtti-nirodhaḥ. (Yoga is the cessation of the fluctuations of consciousness.)",
      author: "Patañjali, Yoga Sūtra 1.2"
    },
    {
      text: "Abhyāsa vairāgyābhyāṁ tannirodhaḥ. (Practice and dispassion are the means to stilling.)",
      author: "Patañjali, Yoga Sūtra 1.12"
    },
    {
      text: "Sthira-sukham-āsanam. (Posture should be steady and comfortable.)",
      author: "Patañjali, Yoga Sūtra 2.46"
    }
  ];

  const principles = [
    {
      icon: <Flower className="w-8 h-8" />,
      title: "Eight Limbs",
      subtitle: "Aṣṭāṅga Yoga",
      description: "Yama, Niyama, Āsana, Prāṇāyāma, Pratyāhāra, Dhāraṇā, Dhyāna, Samādhi—an integrated path to liberation."
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Discipline & Dispassion",
      subtitle: "Abhyāsa & Vairāgya",
      description: "Consistent practice and non-attachment are the twin pillars that steady the mind."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Ethical Foundations",
      subtitle: "Yama & Niyama",
      description: "Non-violence, truthfulness, non-stealing, continence, non-greed; purity, contentment, austerity, study, surrender."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Liberation",
      subtitle: "Kaivalya",
      description: "The isolation of Puruṣa from Prakṛti—pure awareness resting in its own nature."
    }
  ];

  const elements = [
    { name: "Stability", sanskrit: "Sthiratā", icon: <Mountain className="w-6 h-6" />, color: "bg-emerald-100 text-emerald-800" },
    { name: "Flow", sanskrit: "Pravāha", icon: <Droplets className="w-6 h-6" />, color: "bg-blue-100 text-blue-800" },
    { name: "Vital Heat", sanskrit: "Tapas", icon: <Flame className="w-6 h-6" />, color: "bg-orange-100 text-orange-800" },
    { name: "Breath", sanskrit: "Prāṇa", icon: <Wind className="w-6 h-6" />, color: "bg-gray-100 text-gray-800" }
  ];

  // Comparison table content (Yoga vs Cārvāka/Materialism)
  const comparison = [
    {
      concept: "Self (Ātman/Puruṣa)",
      orthodox: "Puruṣa: pure consciousness, distinct from matter",
      yoga: "Puruṣa is eternal and separate; realization through samādhi"
    },
    {
      concept: "Knowledge Sources",
      orthodox: "Perception, inference, scripture (śabda)",
      yoga: "Perception, inference, scripture; emphasis on direct realization"
    },
    {
      concept: "Life Goal",
      orthodox: "Mokṣa through discrimination (viveka)",
      yoga: "Kaivalya—cessation of vṛttis and isolation of Puruṣa"
    },
    {
      concept: "Practice",
      orthodox: "Varies by school",
      yoga: "Eight-limbed path: ethics, posture, breath, sense-withdrawal, concentration, meditation, absorption"
    },
    {
      concept: "Matter (Prakṛti)",
      orthodox: "Often Māyā or real depending on school",
      yoga: "Real and distinct; components evolve from guṇas"
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.1); }
          100% { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 text-slate-800 font-sans min-h-screen">
        {/* Floating Navigation */}
        <nav className="fixed top-6 left-6 z-50">
          <a
            href="/explore"
            className="bg-white/90 backdrop-blur-md text-slate-800 px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
          >
            ← Back to Explore
          </a>
        </nav>

        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src={bgImage}
              alt="Meditative dawn over mountains"
              className="w-full h-full object-cover scale-110 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          </div>

          <div className="relative z-10 text-center px-4">
            <div className="mb-8 inline-block">
              <div className="w-16 h-0.5 bg-emerald-300 mx-auto mb-4"></div>
              <p className="text-emerald-200 text-sm uppercase tracking-widest font-medium">Classical Indian Philosophy</p>
            </div>

            <h1 className="text-6xl md:text-9xl font-serif tracking-wider mb-6">
              <span className="bg-gradient-to-r from-emerald-200 via-teal-200 to-sky-200 bg-clip-text text-transparent">
                Yoga
              </span>
            </h1>

            <p className="text-xl md:text-3xl text-slate-200 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              योग • The Path of Stillness, Insight, and Liberation
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="text-emerald-300 text-lg italic">"Yoga is the stilling of the mind"</span>
              <div className="hidden sm:block w-1 h-1 bg-emerald-300 rounded-full"></div>
              <span className="text-slate-300 text-sm">योगश्चित्तवृत्तिनिरोधः</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
            <ChevronRight className="w-6 h-6 transform rotate-90" />
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-slate-900 mb-6">Four Pillars of Yoga</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Core tenets distilled from the Yoga Sūtras for a balanced path of practice and realization
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((p, i) => (
                <div
                  key={i}
                  className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
                >
                  <div className="text-emerald-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{p.title}</h3>
                  <p className="text-emerald-700 text-sm font-medium mb-3 italic">{p.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed text-sm">{p.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Elements/Aspects */}
        <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif mb-6">Four Key Aspects</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Practical dimensions that support steadiness, vitality, breath, and flow in practice
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {elements.map((e, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 ${e.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {e.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{e.name}</h3>
                  <p className="text-emerald-300 text-sm italic">{e.sanskrit}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <p className="text-slate-300 text-center leading-relaxed">
                Note: Breath (Prāṇa) bridges body and mind. Cultivating Tapas, Svādhyāya, and Īśvara-praṇidhāna (Kriyā Yoga) refines practice.
              </p>
            </div>
          </div>
        </section>

        {/* Historical Context */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-serif text-slate-900 mb-8">Historical Context</h2>
                <div className="space-y-6 text-slate-600 leading-relaxed">
                  <p>
                    The Yoga system is codified by <span className="font-medium text-slate-800">Patañjali</span> (c. 2nd century BCE–2nd century CE) in the Yoga Sūtras, synthesizing earlier yogic traditions.
                  </p>
                  <p>
                    Rooted in Sāṅkhya metaphysics, Yoga emphasizes disciplined practice for the direct realization of Puruṣa, distinct from Prakṛti and its guṇas.
                  </p>
                  <p>
                    Commentaries by <span className="font-medium text-slate-800">Vyāsa</span> and later scholars shaped its interpretation across centuries and schools.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-3xl shadow-xl">
                  <div className="text-center mb-6">
                    <Scroll className="w-12 h-12 text-emerald-700 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif text-slate-800">Timeline</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">Pre</div>
                      <div>
                        <p className="font-medium text-slate-800">Pre-Classical</p>
                        <p className="text-sm text-slate-600">Vedic and Upaniṣadic yogic strands</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">YS</div>
                      <div>
                        <p className="font-medium text-slate-800">Yoga Sūtras</p>
                        <p className="text-sm text-slate-600">Systematization of the path</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-sky-600 text-white rounded-full flex items-center justify-center text-sm font-bold">Med</div>
                      <div>
                        <p className="font-medium text-slate-800">Medieval</p>
                        <p className="text-sm text-slate-600">Haṭha Yoga texts and praxis</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Philosophical Arguments */}
        <section className="py-24 bg-gradient-to-br from-slate-100 to-slate-200">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-slate-900 mb-6">Philosophical Foundations</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                How Yoga integrates ethics, embodiment, and meditative insight to still the mind
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Kriyā Yoga */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-emerald-700 mb-4">Kriyā Yoga</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Tapas, Svādhyāya, and Īśvara-praṇidhāna purify and focus the practitioner, preparing for deeper samādhi.
                  </p>
                  <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-300">
                    <p className="text-sm">
                      Practice, study, and surrender balance effort and grace on the path.
                    </p>
                  </div>
                </div>
              </div>

              {/* Citta-vṛtti-nirodhaḥ */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-emerald-700 mb-4">Citta-vṛtti-nirodhaḥ</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Stilling the fluctuations of the mind reveals Puruṣa as distinct from the changing field of Prakṛti.
                  </p>
                  <div className="bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-300">
                    <p className="text-sm">
                      Concentration (Dhāraṇā) matures into Meditation (Dhyāna) and culminates in Absorption (Samādhi).
                    </p>
                  </div>
                </div>
              </div>

              {/* Prāṇāyāma & Pratyāhāra */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Prāṇāyāma & Pratyāhāra</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Breath regulation refines attention; sense-withdrawal turns the mind inward for steady contemplation.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-300">
                    <p className="text-sm">
                      A calm nervous system creates the conditions for insight.
                    </p>
                  </div>
                </div>
              </div>

              {/* Yama & Niyama */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Yama & Niyama</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Ethical restraint and observances stabilize relationships and inner life, removing obstacles to practice.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-300">
                    <p className="text-sm">
                      Ahimsā, Satya, Asteya, Brahmacarya, Aparigraha; Śauca, Santoṣa, Tapas, Svādhyāya, Īśvara-praṇidhāna.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Interactive Quotes */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-slate-900 mb-6">Yoga Wisdom</h2>
              <p className="text-xl text-slate-600">
                Timeless sutras and insights for steady practice and clear seeing
              </p>
            </div>

            <div className="grid gap-6">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  className="bg-gradient-to-r from-emerald-100 to-teal-100 p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  onClick={() => setSelectedQuote(q)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-6xl text-emerald-600/30 font-serif leading-none">"</div>
                    <div className="flex-1">
                      <p className="text-lg text-slate-700 leading-relaxed mb-4 italic group-hover:text-slate-800 transition-colors">
                        {q.text}
                      </p>
                      <p className="text-emerald-700 font-medium text-right">— {q.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif mb-6">Yoga vs. Materialism</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Where Pātañjala Yoga diverges from materialist assumptions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                <thead className="bg-white/10">
                  <tr>
                    <th className="p-6 text-left text-emerald-300 font-bold">Concept</th>
                    <th className="p-6 text-left text-blue-300 font-bold">General (Orthodox/Other)</th>
                    <th className="p-6 text-left text-emerald-400 font-bold">Yoga Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {comparison.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 font-medium text-emerald-200">{row.concept}</td>
                      <td className="p-6 text-slate-300">{row.orthodox}</td>
                      <td className="p-6 text-slate-300">{row.yoga}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quote Modal */}
        {selectedQuote && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto relative shadow-2xl">
              <button
                onClick={() => setSelectedQuote(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center">
                <div className="text-8xl text-emerald-600/20 font-serif mb-4">"</div>
                <p className="text-xl text-slate-700 leading-relaxed italic mb-6">
                  {selectedQuote.text}
                </p>
                <p className="text-emerald-700 font-bold text-lg">— {selectedQuote.author}</p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
            <h2 className="text-5xl font-serif mb-6">अभ्यासेन वैराग्येण</h2>
            <p className="text-2xl font-light mb-8 opacity-90">
              With practice and non-attachment, the mind becomes still
            </p>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-12 opacity-80">
              Yoga offers a practical, integrated path to clarity and freedom—grounded in ethics, embodiment, and deep meditation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/explore" className="bg-white text-slate-800 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all duration-300 shadow-lg">
                Explore Other Philosophies
              </a>
              <a href="/yoga/resources" className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-slate-800 transition-all duration-300">
                Learn More About Yoga
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-serif text-emerald-300 mb-2">Yoga</h3>
              <p className="text-sm opacity-70">Pātañjala Tradition • योगसूत्र</p>
            </div>
            <div className="w-16 h-0.5 bg-emerald-600 mx-auto mb-6"></div>
            <p className="text-sm opacity-60 max-w-2xl mx-auto leading-relaxed">
              This page presents key themes from the Yoga Sūtras and their practice-oriented commentarial tradition—inviting disciplined exploration toward clarity and peace.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default YogaPage;

import React, { useState } from 'react';
import { ChevronRight, Scroll, Eye, Heart, Brain, Flame, Droplets, Mountain, Wind, X } from 'lucide-react';

const CarvakaPage = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const quotes = [
    {
      text: "While life remains, let a man live happily, let him feed on ghee even though he runs in debt; when once the body becomes ashes, how can it ever return again?",
      author: "Traditional Cārvāka Maxim"
    },
    {
      text: "The Vedas are tainted by three faults: falsehood, self-contradiction, and needless repetition.",
      author: "Bṛhaspati (attributed)"
    },
    {
      text: "There is no heaven, no final liberation, nor any soul in another world, nor do the actions of the four castes produce any real effect.",
      author: "Cārvāka Doctrine"
    }
  ];

  const principles = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Empiricism",
      subtitle: "Pratyakṣa Pramāṇa",
      description: "Only direct perception through the senses can provide valid knowledge. What cannot be observed does not exist."
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: "Materialism",
      subtitle: "Bhūta-Caitanya-Vāda",
      description: "Consciousness emerges from the combination of material elements, like intoxication from fermented rice."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Hedonism",
      subtitle: "Kāma Paramārtha",
      description: "Pleasure is the highest goal of life. Since there's no afterlife, maximize happiness in this existence."
    },
    {
      icon: <Scroll className="w-8 h-8" />,
      title: "Skepticism",
      subtitle: "Śāstra Niṣedha",
      description: "Religious texts and metaphysical claims lack empirical foundation and should be rejected as fabrications."
    }
  ];

  const elements = [
    { name: "Earth", sanskrit: "Pṛthvī", icon: <Mountain className="w-6 h-6" />, color: "bg-amber-100 text-amber-800" },
    { name: "Water", sanskrit: "Jala", icon: <Droplets className="w-6 h-6" />, color: "bg-blue-100 text-blue-800" },
    { name: "Fire", sanskrit: "Agni", icon: <Flame className="w-6 h-6" />, color: "bg-red-100 text-red-800" },
    { name: "Air", sanskrit: "Vāyu", icon: <Wind className="w-6 h-6" />, color: "bg-gray-100 text-gray-800" }
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
      
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 text-slate-800 font-sans min-h-screen">
        {/* Floating Navigation */}
        <nav className="fixed top-6 left-6 z-50">
            <a
                href="/explore"
                className="bg-white/90 backdrop-blur-md text-slate-800 px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all duration-300 flex items-center gap-2 text-sm font-medium"
            >
                ← Back to Explore
            </a>
        </nav>

        {/* Hero Section with Parallax Effect */}
        <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.1.0" 
              alt="Ancient feast representing worldly pleasures"
              className="w-full h-full object-cover scale-110 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
          </div>
          
          <div className="relative z-10 text-center px-4">
            <div className="mb-8 inline-block">
              <div className="w-16 h-0.5 bg-amber-400 mx-auto mb-4"></div>
              <p className="text-amber-200 text-sm uppercase tracking-widest font-medium">Ancient Indian Philosophy</p>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-serif tracking-wider mb-6">
              <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-red-200 bg-clip-text text-transparent">
                Cārvāka
              </span>
            </h1>
            
            <p className="text-xl md:text-3xl text-slate-200 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
              लोकायत • The Path of Materialism & Empirical Truth
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="text-amber-300 text-lg italic">"Eat, drink, and be merry"</span>
              <div className="hidden sm:block w-1 h-1 bg-amber-300 rounded-full"></div>
              <span className="text-slate-300 text-sm">यावज्जीवेत् सुखं जीवेत्</span>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
            <ChevronRight className="w-6 h-6 transform rotate-90" />
          </div>
        </section>

        {/* Core Principles Grid */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-slate-900 mb-6">Four Pillars of Cārvāka</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                The foundational principles that distinguish this materialist philosophy from all other Indian schools of thought
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <div 
                  key={index}
                  className="group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
                >
                  <div className="text-amber-700 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {principle.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{principle.title}</h3>
                  <p className="text-amber-600 text-sm font-medium mb-3 italic">{principle.subtitle}</p>
                  <p className="text-slate-600 leading-relaxed text-sm">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Four Elements */}
        <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif mb-6">The Four Elements</h2>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Cārvākas accept only the four gross elements as the fundamental reality of the universe
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {elements.map((element, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300 group"
                >
                  <div className={`w-16 h-16 ${element.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {element.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{element.name}</h3>
                  <p className="text-amber-300 text-sm italic">{element.sanskrit}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/20">
              <p className="text-slate-300 text-center leading-relaxed">
                <span className="text-amber-300 font-medium">Note:</span> Unlike other Indian philosophies, Cārvākas reject 
                <span className="text-red-300 font-medium"> Ākāśa </span>(ether/space) as the fifth element, 
                since it cannot be directly perceived through the senses.
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
                    The Cārvāka school emerged during the 6th century BCE, contemporary with Buddhism and Jainism. 
                    <span className="font-medium text-slate-800"> Bṛhaspati</span> is traditionally credited as its founder, 
                    though this attribution is debated by modern scholars.
                  </p>
                  <p>
                    The term <span className="font-medium text-amber-700">"Lokāyata"</span> literally means 
                    "prevalent among people" or "worldly," emphasizing its focus on common sense and observable reality 
                    rather than abstract metaphysical speculation.
                  </p>
                  <p>
                    Most Cārvāka texts have been lost to history. Our knowledge comes primarily from their opponents' 
                    critiques, particularly from <span className="font-medium text-slate-800">Śaṅkara, Mādhava, and Hemacandra</span>, 
                    which may not fully represent their nuanced positions.
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-3xl shadow-xl">
                  <div className="text-center mb-6">
                    <Scroll className="w-12 h-12 text-amber-700 mx-auto mb-4" />
                    <h3 className="text-2xl font-serif text-slate-800">Timeline</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-600 text-white rounded-full flex items-center justify-center text-sm font-bold">6th</div>
                      <div>
                        <p className="font-medium text-slate-800">6th Century BCE</p>
                        <p className="text-sm text-slate-600">Emergence of Cārvāka school</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold">8th</div>
                      <div>
                        <p className="font-medium text-slate-800">8th Century CE</p>
                        <p className="text-sm text-slate-600">Śaṅkara's critiques documented</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">14th</div>
                      <div>
                        <p className="font-medium text-slate-800">14th Century CE</p>
                        <p className="text-sm text-slate-600">Mādhava's Sarvadarśanasaṅgraha</p>
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
              <h2 className="text-5xl font-serif text-slate-900 mb-6">Philosophical Arguments</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                The logical foundation of Cārvāka materialism through systematic critique of competing worldviews
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Against Inference */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-700 mb-4">Against Inference (Anumāna)</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Cārvākas argue that inference is fundamentally unreliable because it depends on 
                    <span className="font-medium text-slate-800"> vyāpti</span> (universal concomitance), 
                    which can never be fully established through limited observation.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-300">
                    <p className="text-sm">
                      <span className="font-medium">Example:</span> We observe fire and smoke together in kitchens, 
                      but cannot observe all possible cases to establish that smoke always indicates fire.
                    </p>
                  </div>
                </div>
              </div>

              {/* Against Testimony */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-red-700 mb-4">Against Testimony (Śabda)</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Religious texts and scriptural authority are rejected as human fabrications. 
                    Cārvākas view the <span className="font-medium text-slate-800">Vedas</span> as products of 
                    clever priests seeking to maintain social control.
                  </p>
                  <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-300">
                    <p className="text-sm">
                      <span className="font-medium">Critique:</span> "The Vedas are characterized by tautology, 
                      contradiction, and meaningless jargon" - attributed to Cārvāka texts.
                    </p>
                  </div>
                </div>
              </div>

              {/* Against Soul */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Against the Soul (Ātman)</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Consciousness is viewed as an emergent property of matter, similar to how 
                    <span className="font-medium text-slate-800"> madhu</span> (intoxication) 
                    emerges from fermented grain without being inherent in the ingredients.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-300">
                    <p className="text-sm">
                      <span className="font-medium">Analogy:</span> Just as sweetness emerges from combining 
                      molasses with other ingredients, consciousness emerges from bodily elements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Against Afterlife */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-purple-700 mb-4">Against Afterlife & Karma</h3>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Since no one has returned from death to verify an afterlife, and consciousness 
                    depends on the body, death represents complete cessation. 
                    <span className="font-medium text-slate-800">Karma</span> is therefore meaningless.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-300">
                    <p className="text-sm">
                      <span className="font-medium">Logic:</span> If consciousness requires a body, 
                      and the body decomposes after death, no awareness can persist.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Quotes Section */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-slate-900 mb-6">Cārvāka Wisdom</h2>
              <p className="text-xl text-slate-600">
                Preserved fragments of materialist philosophy through centuries of opposition
              </p>
            </div>

            <div className="grid gap-6">
              {quotes.map((quote, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-2xl shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 group"
                  onClick={() => setSelectedQuote(quote)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-6xl text-amber-600/30 font-serif leading-none">"</div>
                    <div className="flex-1">
                      <p className="text-lg text-slate-700 leading-relaxed mb-4 italic group-hover:text-slate-800 transition-colors">
                        {quote.text}
                      </p>
                      <p className="text-amber-700 font-medium text-right">— {quote.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison with Other Schools */}
        <section className="py-24 bg-gradient-to-br from-slate-800 to-slate-900 text-white">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif mb-6">Cārvāka vs. Orthodox Schools</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                How materialist philosophy challenges the fundamental assumptions of Vedantic thought
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden">
                <thead className="bg-white/10">
                  <tr>
                    <th className="p-6 text-left text-amber-300 font-bold">Concept</th>
                    <th className="p-6 text-left text-green-400 font-bold">Orthodox Schools</th>
                    <th className="p-6 text-left text-red-400 font-bold">Cārvāka Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-amber-200">Soul (Ātman)</td>
                    <td className="p-6 text-slate-300">Eternal, immortal essence</td>
                    <td className="p-6 text-slate-300">Non-existent; consciousness = body</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-amber-200">Knowledge Sources</td>
                    <td className="p-6 text-slate-300">Perception, inference, testimony</td>
                    <td className="p-6 text-slate-300">Perception only (pratyakṣa)</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-amber-200">Life Goal</td>
                    <td className="p-6 text-slate-300">Liberation (mokṣa)</td>
                    <td className="p-6 text-slate-300">Pleasure (kāma)</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-amber-200">Death</td>
                    <td className="p-6 text-slate-300">Rebirth & karma continue</td>
                    <td className="p-6 text-slate-300">Complete cessation</td>
                  </tr>
                  <tr className="hover:bg-white/5 transition-colors">
                    <td className="p-6 font-medium text-amber-200">Rituals</td>
                    <td className="p-6 text-slate-300">Sacred & efficacious</td>
                    <td className="p-6 text-slate-300">Wasteful priestly deception</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Modern Relevance */}
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-serif text-slate-900 mb-6">Modern Relevance</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                How ancient Indian materialism anticipates contemporary philosophical and scientific perspectives
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-blue-700 mb-3">Scientific Materialism</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The Cārvāka emphasis on empirical observation and rejection of supernatural explanations 
                    parallels modern scientific methodology and physicalist approaches to consciousness.
                  </p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-green-700 mb-3">Secular Humanism</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The focus on human welfare in this life, without appeal to divine authority, 
                    resonates with contemporary secular humanist ethics and evidence-based reasoning.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-purple-700 mb-3">Emergentism</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The idea that consciousness emerges from material combinations anticipates modern theories 
                    of emergence in neuroscience and philosophy of mind.
                  </p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md">
                  <h3 className="text-xl font-bold text-amber-700 mb-3">Critical Thinking</h3>
                  <p className="text-slate-600 leading-relaxed">
                    The systematic questioning of religious authority and demand for empirical evidence 
                    reflects contemporary emphasis on critical thinking and skeptical inquiry.
                  </p>
                </div>
              </div>
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
                <div className="text-8xl text-amber-600/20 font-serif mb-4">"</div>
                <p className="text-xl text-slate-700 leading-relaxed italic mb-6">
                  {selectedQuote.text}
                </p>
                <p className="text-amber-700 font-bold text-lg">— {selectedQuote.author}</p>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="py-24 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto max-w-4xl px-6 text-center relative z-10">
            <h2 className="text-5xl font-serif mb-6">यावज्जीवेत् सुखं जीवेत्</h2>
            <p className="text-2xl font-light mb-8 opacity-90">
              "As long as you live, live happily"
            </p>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-12 opacity-80">
              The Cārvāka philosophy reminds us to embrace the present moment, question dogma, 
              and find meaning in our direct experience of the world. Though ancient, 
              its emphasis on empirical truth and human flourishing remains profoundly relevant.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-slate-800 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all duration-300 shadow-lg">
                Explore Other Philosophies
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-slate-800 transition-all duration-300">
                Learn More About Materialism
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-12 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-serif text-amber-300 mb-2">Cārvāka</h3>
              <p className="text-sm opacity-70">Ancient Indian Materialism • लोकायत</p>
            </div>
            <div className="w-16 h-0.5 bg-amber-600 mx-auto mb-6"></div>
            <p className="text-sm opacity-60 max-w-2xl mx-auto leading-relaxed">
              This page explores the philosophical positions of the Cārvāka school as understood through 
              historical sources and scholarly interpretation. The materialist tradition continues to 
              influence contemporary philosophical discourse on consciousness, empiricism, and ethics.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CarvakaPage;

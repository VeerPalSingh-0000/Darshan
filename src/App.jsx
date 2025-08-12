import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Provider & Protected Routes
import { AuthProvider } from './context/AuthContext'; // Adjust path if needed
import ProtectedRoute from './Components/ProtectedRoute'; // Adjust path if needed

// Layout
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

// Public Pages
import Home from './Pages/Home';
import ExplorePage from './Pages/ExplorePage';
import AuthPage from './Pages/AuthPage';

// School Pages (Public)
import SamkhyaPage from './Pages/Schools/SamkhyaPage';
import YogaPage from './Pages/Schools/YogaPage';
import NyayaPage from './Pages/Schools/NyayaPage';
import VaisesikaPage from './Pages/Schools/VaisesikaPage';
import MimamsaPage from './Pages/Schools/MimamsaPage';
import VedantaPage from './Pages/Schools/VedantaPage';
import JainismPage from './Pages/Schools/JainismPage';
import BuddhismPage from './Pages/Schools/BuddhismPage';
import CarvakaPage from './Pages/Schools/CarvakaPage';

// Gita Pages (Now Protected)
import Gita from './Pages/Gita/Gita';
import GitaChapters from './Pages/Gita/Chapters/Chapters';
import GitaVerses from './Pages/Gita/GitaVerses';
import GitaResources from './Pages/Gita/GitaResources';
import GitaGuide from './Pages/Gita/GitaGuide';
import Adhyay1 from './Pages/Gita/Chapters/Adhyay1';

// 404 Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl md:text-5xl font-serif text-slate-900">Page Not Found</h1>
      <p className="mt-4 text-slate-600">The page you're looking for doesn't exist.</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen font-sans bg-[#F8F5F2]">
          <Navbar />
          <main id="main-content" className="flex-grow" role="main">
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/explore/samkhya" element={<SamkhyaPage />} />
              <Route path="/explore/yoga" element={<YogaPage />} />
              <Route path="/explore/nyaya" element={<NyayaPage />} />
              <Route path="/explore/vaisesika" element={<VaisesikaPage />} />
              <Route path="/explore/mimamsa" element={<MimamsaPage />} />
              <Route path="/explore/vedanta" element={<VedantaPage />} />
              <Route path="/explore/jainism" element={<JainismPage />} />
              <Route path="/explore/buddhism" element={<BuddhismPage />} />
              <Route path="/explore/carvaka" element={<CarvakaPage />} />

              {/* --- Protected Gita Routes --- */}
              <Route path="/gita" element={<ProtectedRoute><Gita /></ProtectedRoute>} />
              <Route path="/gita/chapters" element={<ProtectedRoute><GitaChapters /></ProtectedRoute>} />
              <Route path="/gita/verses" element={<ProtectedRoute><GitaVerses /></ProtectedRoute>} />
              <Route path="/gita/resources" element={<ProtectedRoute><GitaResources /></ProtectedRoute>} />
              <Route path="/gita/guide" element={<ProtectedRoute><GitaGuide /></ProtectedRoute>} />
              <Route path="/gita/chapters/adhyay1" element={<ProtectedRoute><Adhyay1 /></ProtectedRoute>} />
              
              {/* 404 Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

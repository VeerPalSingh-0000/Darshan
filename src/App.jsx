import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

// Auth Provider & Protected Routes
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./Components/ProtectedRoute";

// Layout Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

// Public Pages (Home is static for instant landing load)
import Home from "./Pages/Home";

// Lazy-loaded routes
const ExplorePage = lazy(() => import("./Pages/ExplorePage"));
const AuthPage = lazy(() => import("./Pages/AuthPage"));

// Resource Pages
const AboutPage = lazy(() => import("./Pages/Resources/About"));
const CommentariesPage = lazy(() => import("./Pages/Resources/Commentaries"));
const GlossaryPage = lazy(() => import("./Pages/Resources/Glossary"));
const SacredTextsPage = lazy(() => import("./Pages/Resources/SacredTexts"));
const ScholarsPage = lazy(() => import("./Pages/Resources/Scholars"));

// School Pages (Public)
const SamkhyaPage = lazy(() => import("./Pages/Schools/SamkhyaPage"));
const YogaPage = lazy(() => import("./Pages/Schools/YogaPage"));
const NyayaPage = lazy(() => import("./Pages/Schools/NyayaPage"));
const VaisesikaPage = lazy(() => import("./Pages/Schools/VaisesikaPage"));
const MimamsaPage = lazy(() => import("./Pages/Schools/MimamsaPage"));
const VedantaPage = lazy(() => import("./Pages/Schools/VedantaPage"));
const JainismPage = lazy(() => import("./Pages/Schools/JainismPage"));
const BuddhismPage = lazy(() => import("./Pages/Schools/BuddhismPage"));
const CarvakaPage = lazy(() => import("./Pages/Schools/CarvakaPage"));

const PhilosophyQuiz = lazy(() => import("./Pages/PhilosophyQuiz"));
const PhilosopherTimeline = lazy(() => import("./Pages/PhilosopherTimeline"));
const SanskritGuide = lazy(() => import("./Pages/SanskritGuide"));
const SutraOfDay = lazy(() => import("./Pages/SutraOfDay"));

// Gita Pages (Protected)
const Gita = lazy(() => import("./Pages/Gita/Gita"));
const GitaChapters = lazy(() => import("./Pages/Gita/Chapters/Chapters"));
const GitaVerses = lazy(() => import("./Pages/Gita/GitaVerses"));
const GitaResources = lazy(() => import("./Pages/Gita/GitaResources"));
const GitaGuide = lazy(() => import("./Pages/Gita/GitaGuide"));
const Adhyay1 = lazy(() => import("./Pages/Gita/Chapters/Adhyay1"));
const Adhyay2 = lazy(() => import("./Pages/Gita/Chapters/Adhyay2"));
const Adhyay3 = lazy(() => import("./Pages/Gita/Chapters/Adhyay3"));
const Adhyay4 = lazy(() => import("./Pages/Gita/Chapters/Adhyay4"));
const Adhyay5 = lazy(() => import("./Pages/Gita/Chapters/Adhyay5"));
const Adhyay6 = lazy(() => import("./Pages/Gita/Chapters/Adhyay6"));
const Adhyay7 = lazy(() => import("./Pages/Gita/Chapters/Adhyay7"));
const Adhyay8 = lazy(() => import("./Pages/Gita/Chapters/Adhyay8"));
const Adhyay9 = lazy(() => import("./Pages/Gita/Chapters/Adhyay9"));
const Adhyay10 = lazy(() => import("./Pages/Gita/Chapters/Adhyay10"));
const Adhyay11 = lazy(() => import("./Pages/Gita/Chapters/Adhyay11"));
const Adhyay12 = lazy(() => import("./Pages/Gita/Chapters/Adhyay12"));
const Adhyay13 = lazy(() => import("./Pages/Gita/Chapters/Adhyay13"));
const Adhyay14 = lazy(() => import("./Pages/Gita/Chapters/Adhyay14"));
const Adhyay15 = lazy(() => import("./Pages/Gita/Chapters/Adhyay15"));
const Adhyay16 = lazy(() => import("./Pages/Gita/Chapters/Adhyay16"));
const Adhyay17 = lazy(() => import("./Pages/Gita/Chapters/Adhyay17"));
const Adhyay18 = lazy(() => import("./Pages/Gita/Chapters/Adhyay18"));


// --- NEW: Main Layout Component ---
const MainLayout = () => (
  <div className="flex flex-col min-h-screen font-sans bg-[#F8F5F2] dark:bg-slate-950 transition-colors duration-300">
    <Navbar />
    <main id="main-content" className="flex-grow" role="main">
      <Outlet />
    </main>
    <Footer />
  </div>
);

// 404 Component
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2] dark:bg-slate-950 transition-colors duration-300">
    <div className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-3xl md:text-5xl font-serif text-slate-900 dark:text-slate-100">
        Page Not Found
      </h1>
      <p className="mt-4 text-slate-600 dark:text-slate-400">
        The page you're looking for doesn't exist.
      </p>
    </div>
  </div>
);

// --- NEW: Loading Fallback Spinner ---
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2] dark:bg-slate-950 transition-colors duration-300">
    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* --- LANDING PAGE (Public - First thing new users see) --- */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route
                  path="/resources/sacred-texts"
                  element={<SacredTextsPage />}
                />
                <Route
                  path="/resources/commentaries"
                  element={<CommentariesPage />}
                />
                <Route path="/resources/scholars" element={<ScholarsPage />} />
                <Route path="/resources/glossary" element={<GlossaryPage />} />
                <Route path="/schools/samkhya" element={<SamkhyaPage />} />
                <Route path="/schools/yoga" element={<YogaPage />} />
                <Route path="/schools/nyaya" element={<NyayaPage />} />
                <Route path="/schools/vaisesika" element={<VaisesikaPage />} />
                <Route path="/schools/mimamsa" element={<MimamsaPage />} />
                <Route path="/schools/vedanta" element={<VedantaPage />} />
                <Route path="/schools/jainism" element={<JainismPage />} />
                <Route path="/schools/buddhism" element={<BuddhismPage />} />
                <Route path="/schools/carvaka" element={<CarvakaPage />} />
                <Route path="/quiz" element={<PhilosophyQuiz />} />
                <Route path="/timeline" element={<PhilosopherTimeline />} />
                <Route path="/sanskrit" element={<SanskritGuide />} />
                <Route path="/sutra" element={<SutraOfDay />} />

                {/* --- GITA PAGES (Public - Open for all) --- */}
                <Route path="/gita" element={<Gita />} />
                <Route path="/gita/chapters" element={<GitaChapters />} />
                <Route path="/gita/verses" element={<GitaVerses />} />
                <Route path="/gita/resources" element={<GitaResources />} />
                <Route path="/gita/guide" element={<GitaGuide />} />
                <Route path="/gita/chapters/adhyay1" element={<Adhyay1 />} />
                <Route path="/gita/chapters/adhyay2" element={<Adhyay2 />} />
                <Route path="/gita/chapters/adhyay3" element={<Adhyay3 />} />
                <Route path="/gita/chapters/adhyay4" element={<Adhyay4 />} />
                <Route path="/gita/chapters/adhyay5" element={<Adhyay5 />} />
                <Route path="/gita/chapters/adhyay6" element={<Adhyay6 />} />
                <Route path="/gita/chapters/adhyay7" element={<Adhyay7 />} />
                <Route path="/gita/chapters/adhyay8" element={<Adhyay8 />} />
                <Route path="/gita/chapters/adhyay9" element={<Adhyay9 />} />
                <Route path="/gita/chapters/adhyay10" element={<Adhyay10 />} />
                <Route path="/gita/chapters/adhyay11" element={<Adhyay11 />} />
                <Route path="/gita/chapters/adhyay12" element={<Adhyay12 />} />
                <Route path="/gita/chapters/adhyay13" element={<Adhyay13 />} />
                <Route path="/gita/chapters/adhyay14" element={<Adhyay14 />} />
                <Route path="/gita/chapters/adhyay15" element={<Adhyay15 />} />
                <Route path="/gita/chapters/adhyay16" element={<Adhyay16 />} />
                <Route path="/gita/chapters/adhyay17" element={<Adhyay17 />} />
                <Route path="/gita/chapters/adhyay18" element={<Adhyay18 />} />
              </Route>

              {/* --- LOGIN PAGE (No Navbar/Footer) --- */}
              <Route path="/login" element={<AuthPage />} />

              {/* --- 404 Page --- */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

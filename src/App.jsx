import React from "react";
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

// Public Pages
import Home from "./Pages/Home";
import ExplorePage from "./Pages/ExplorePage";
import AuthPage from "./Pages/AuthPage";

// Resource Pages
import AboutPage from "./Pages/Resources/About";
import CommentariesPage from "./Pages/Resources/Commentaries";
import GlossaryPage from "./Pages/Resources/Glossary";
import SacredTextsPage from "./Pages/Resources/SacredTexts";
import ScholarsPage from "./Pages/Resources/Scholars";

// School Pages (Public)
import SamkhyaPage from "./Pages/Schools/SamkhyaPage";
import YogaPage from "./Pages/Schools/YogaPage";
import NyayaPage from "./Pages/Schools/NyayaPage";
import VaisesikaPage from "./Pages/Schools/VaisesikaPage";
import MimamsaPage from "./Pages/Schools/MimamsaPage";
import VedantaPage from "./Pages/Schools/VedantaPage";
import JainismPage from "./Pages/Schools/JainismPage";
import BuddhismPage from "./Pages/Schools/BuddhismPage";
import CarvakaPage from "./Pages/Schools/CarvakaPage";
import PhilosophyQuiz from "./Pages/PhilosophyQuiz";
import PhilosopherTimeline from "./Pages/PhilosopherTimeline";
import SanskritGuide from "./Pages/SanskritGuide";
import SutraOfDay from "./Pages/SutraOfDay";

// Gita Pages (Protected)
import Gita from "./Pages/Gita/Gita";
import GitaChapters from "./Pages/Gita/Chapters/Chapters";
import GitaVerses from "./Pages/Gita/GitaVerses";
import GitaResources from "./Pages/Gita/GitaResources";
import GitaGuide from "./Pages/Gita/GitaGuide";
import Adhyay1 from "./Pages/Gita/Chapters/Adhyay1";
import Adhyay2 from "./Pages/Gita/Chapters/Adhyay2";
import Adhyay3 from "./Pages/Gita/Chapters/Adhyay3";
import Adhyay4 from "./Pages/Gita/Chapters/Adhyay4";
import Adhyay5 from "./Pages/Gita/Chapters/Adhyay5";
import Adhyay6 from "./Pages/Gita/Chapters/Adhyay6";
import Adhyay7 from "./Pages/Gita/Chapters/Adhyay7";
import Adhyay8 from "./Pages/Gita/Chapters/Adhyay8";
import Adhyay9 from "./Pages/Gita/Chapters/Adhyay9";
import Adhyay10 from "./Pages/Gita/Chapters/Adhyay10";
import Adhyay11 from "./Pages/Gita/Chapters/Adhyay11";
import Adhyay12 from "./Pages/Gita/Chapters/Adhyay12";
import Adhyay13 from "./Pages/Gita/Chapters/Adhyay13";
import Adhyay14 from "./Pages/Gita/Chapters/Adhyay14";
import Adhyay15 from "./Pages/Gita/Chapters/Adhyay15";
import Adhyay16 from "./Pages/Gita/Chapters/Adhyay16";
import Adhyay17 from "./Pages/Gita/Chapters/Adhyay17";
import Adhyay18 from "./Pages/Gita/Chapters/Adhyay18";

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

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* --- Route for Auth Page (No Navbar/Footer) --- */}
            <Route path="/login" element={<AuthPage />} />

            {/* --- Routes with Main Layout (Includes Navbar/Footer) --- */}
            <Route element={<MainLayout />}>
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

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <ExplorePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita"
                element={
                  <ProtectedRoute>
                    <Gita />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters"
                element={
                  <ProtectedRoute>
                    <GitaChapters />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/verses"
                element={
                  <ProtectedRoute>
                    <GitaVerses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/resources"
                element={
                  <ProtectedRoute>
                    <GitaResources />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/guide"
                element={
                  <ProtectedRoute>
                    <GitaGuide />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay1"
                element={
                  <ProtectedRoute>
                    <Adhyay1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay2"
                element={
                  <ProtectedRoute>
                    <Adhyay2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay3"
                element={
                  <ProtectedRoute>
                    <Adhyay3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay4"
                element={
                  <ProtectedRoute>
                    <Adhyay4 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay5"
                element={
                  <ProtectedRoute>
                    <Adhyay5 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay6"
                element={
                  <ProtectedRoute>
                    <Adhyay6 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay7"
                element={
                  <ProtectedRoute>
                    <Adhyay7 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay8"
                element={
                  <ProtectedRoute>
                    <Adhyay8 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay9"
                element={
                  <ProtectedRoute>
                    <Adhyay9 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay10"
                element={
                  <ProtectedRoute>
                    <Adhyay10 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay11"
                element={
                  <ProtectedRoute>
                    <Adhyay11 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay12"
                element={
                  <ProtectedRoute>
                    <Adhyay12 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay13"
                element={
                  <ProtectedRoute>
                    <Adhyay13 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay14"
                element={
                  <ProtectedRoute>
                    <Adhyay14 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay15"
                element={
                  <ProtectedRoute>
                    <Adhyay15 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay16"
                element={
                  <ProtectedRoute>
                    <Adhyay16 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay17"
                element={
                  <ProtectedRoute>
                    <Adhyay17 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/gita/chapters/adhyay18"
                element={
                  <ProtectedRoute>
                    <Adhyay18 />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;

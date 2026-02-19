import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { authService } from './services/authService';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatAssistant from './components/ChatAssistant';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Consultas from './pages/Consultas';
import Documentos from './pages/Documentos';
import Juridico from './pages/Juridico';
import Dependentes from './pages/Dependentes';
import Configuracoes from './pages/Configuracoes';

// Styles
import './App.css';

const AnimatedPage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = ({ user }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rotas Públicas */}
        <Route path="/" element={<AnimatedPage><LandingPage /></AnimatedPage>} />
        <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
        <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />

        {/* Rotas Privadas (Com Layout) */}
        <Route path="/*" element={
          <div className={`app-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="main-content">
              <Navbar user={user} onMenuClick={toggleSidebar} />
              <main className="page-container">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    <Route path="/dashboard" element={<AnimatedPage><Dashboard user={user} /></AnimatedPage>} />
                    <Route path="/consultas" element={<AnimatedPage><Consultas user={user} /></AnimatedPage>} />
                    <Route path="/documentos" element={<AnimatedPage><Documentos user={user} /></AnimatedPage>} />
                    <Route path="/juridico" element={<AnimatedPage><Juridico user={user} /></AnimatedPage>} />
                    <Route path="/dependentes" element={<AnimatedPage><Dependentes user={user} /></AnimatedPage>} />
                    <Route path="/configuracoes" element={<AnimatedPage><Configuracoes user={user} /></AnimatedPage>} />
                  </Routes>
                </AnimatePresence>
              </main>
            </div>
            <ChatAssistant user={user} />
          </div>
        } />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar sessão inicial
    authService.getCurrentUser().then(user => {
      setUser(user);
      setLoading(false);
    });

    // Escutar mudanças no status
    const { data: { subscription } } = authService.onAuthStateChange((user) => {
      setUser(user);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="loading-screen">Iniciando ResolveSaúde...</div>;

  return (
    <Router>
      <div className="app-container">
        <AnimatedRoutes user={user} />
      </div>
    </Router>
  );
}

export default App;

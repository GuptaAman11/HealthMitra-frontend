import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BookingSystem } from './components/BookingSystem';
import { Dashboard } from './components/Dashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { LoginPage } from './components/Auth/LoginPage';
import { SignupPage } from './components/Auth/SignupPage';
import ChatBot from './components/ChatBot';
import { User } from './types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoCallPage from './components/VideoCallPage';

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [authView, setAuthView] = useState<'login' | 'signup' | null>(null);
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const handleViewChange = (view: string) => {
    if ((view === 'dashboard' || view === 'booking') && !user) {
      setAuthView('login');
      return;
    }

    setCurrentView(view);
    if (view !== 'booking') {
      setSelectedService('');
    }
  };

  const handleBookService = (serviceType: string) => {
    if (!user) {
      setAuthView('login');
      return;
    }
    setSelectedService(serviceType);
    setCurrentView('booking');
  };

  const handleGetStarted = () => {
    setCurrentView('services');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setAuthView(null);
    setCurrentView('dashboard');
  };

  const handleSignup = (userData: User) => {
    setUser(userData);
    setAuthView(null);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleBackToHome = () => {
    setAuthView(null);
    setCurrentView('home');
  };

  const location = useLocation();
  const hideHeaderRoutes = ['/login', '/signup'];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  if (authView === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setAuthView('signup')}
        onBack={handleBackToHome}
      />
    );
  }

  if (authView === 'signup') {
    return (
      <Route path="/signup" element={
        <SignupPage
          onSwitchToLogin={() => setAuthView('login')}
        />
      } />
      
    );
  }

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!shouldHideHeader && (
        <Header
          currentView={currentView}
          onViewChange={handleViewChange}
          user={user}
          onLogin={() => setAuthView('login')}
          onLogout={handleLogout}
        />
      )}
      <Routes>
        <Route path="/" element={<Hero onGetStarted={handleGetStarted} />} />
        <Route path="/services" element={<Services onBookService={handleBookService} />} />
        <Route path="/booking" element={
          <BookingSystem
            serviceType={selectedService}
            onBack={() => handleViewChange('services')}
          />
        } />
        <Route path="/dashboard" element={
          user ? (user.role === 'doctor' ? <DoctorDashboard /> : <Dashboard />) : (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h2>
                <p className="text-gray-600 mb-8">You need to be signed in to access your dashboard</p>
                <button
                  onClick={() => setAuthView('login')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          )
        } />
        <Route path="/login" element={
          <LoginPage
            onLogin={handleLogin}
            onSwitchToSignup={() => setAuthView('signup')}
            onBack={handleBackToHome}
          />
        } />
        <Route path="/signup" element={
          <SignupPage
            // onSignup={handleSignup}
            onSwitchToLogin={() => setAuthView('login')}
            // onBack={handleBackToHome}
          />
        } />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/video/:roomId" element={<VideoCallPage />} />

      </Routes>
    </>
  );
}

export default AppWrapper;

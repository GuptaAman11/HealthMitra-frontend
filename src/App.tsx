import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { BookingSystem } from './components/BookingSystem';
import { Dashboard } from './components/Dashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import { LoginPage } from './components/Auth/LoginPage';
import { SignupPage } from './components/Auth/SignupPage';
import { User } from './types';
import ChatBot from './components/ChatBot';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedService, setSelectedService] = useState('');
  const [authView, setAuthView] = useState<'login' | 'signup' | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const handleViewChange = (view: string) => {
    if (view === 'dashboard' && !user) {
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

  const handleLogin = (email: string, password: string, role: 'patient' | 'doctor') => {
    // Mock login - in real app, this would make an API call
    const mockUser: User = {
      id: role === 'doctor' ? 'd1' : 'p1',
      name: role === 'doctor' ? 'Dr. Sarah Johnson' : 'John Doe',
      email,
      phone: '+1-555-0101',
      role,
      avatar: role === 'doctor' 
        ? 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
        : undefined,
      createdAt: new Date()
    };
    
    setUser(mockUser);
    setAuthView(null);
    setCurrentView('dashboard');
  };

  const handleSignup = (userData: any) => {
    // Mock signup - in real app, this would make an API call
    const mockUser: User = {
      id: userData.role === 'doctor' ? 'd2' : 'p2',
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      createdAt: new Date()
    };
    
    setUser(mockUser);
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

  // Show auth pages
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
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={() => setAuthView('login')}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <>
        <Router>
           <Header 
             currentView={currentView} 
             onViewChange={handleViewChange} 
             user={user} 
             onLogin={() => setAuthView('login')}
             onLogout={handleLogout} 
           />
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
                 onSignup={handleSignup}
                 onSwitchToLogin={() => setAuthView('login')}
                 onBack={handleBackToHome}
               />
             } />
             <Route path="/chatbot" element = {<ChatBot />} />
           </Routes>  
        </Router>
    </>
  
  );
}

export default App;
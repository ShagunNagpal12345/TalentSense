import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 1. Landing & Entry Points
import LandingPage from './pages/LandingPage';
import ClientLoginPage from './pages/ClientLoginPage';
import RecruiterLoginPage from './pages/RecruiterLoginPage';
import CandidateComingSoon from './pages/CandidateComingSoon';

// --- NEW: Import the Candidate Pages ---
import CandidateLoginPage from './pages/CandidateLoginPage';
import CandidateDashboard from './pages/CandidateDashboard';

// 2. Dashboards
import ClientDashboard from './pages/ClientDashboard';
import RecruiterDashboard from './pages/RecruiterDashboard';

function App() {
  return (
    // 👇 ADDED FUTURE FLAGS HERE TO FIX WARNINGS
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        {/* --- Public Landing Page --- */}
        <Route path="/" element={<LandingPage />} />

        {/* --- Authentication Routes --- */}
        <Route path="/client/login" element={<ClientLoginPage />} />
        <Route path="/recruiter/login" element={<RecruiterLoginPage />} />
        
        {/* 👇 UPDATED: Now points to the actual Candidate Login page! */}
        <Route path="/candidate/login" element={<CandidateLoginPage />} />
        
        {/* (Optional) Kept the coming soon page routing just in case you need it later */}
        <Route path="/candidate/coming-soon" element={<CandidateComingSoon />} />

        {/* --- Protected Dashboards --- */}
        {/* Note: Ensure ClientDashboard handles its own sub-routes if it uses /client/* internally, 
            otherwise keep exact paths like this if dashboard is a single page */}
        <Route path="/client/dashboard/*" element={<ClientDashboard />} />
        <Route path="/recruiter/dashboard/*" element={<RecruiterDashboard />} />
        
        {/* 👇 NEW: Candidate Dashboard Route */}
        <Route path="/candidate/dashboard/*" element={<CandidateDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
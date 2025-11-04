// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ✅ Import All Pages (Don't redefine them!)
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Order from './pages/Order';
import Feedback from './pages/Feedback';
import Payment from './pages/Payment';
import Track from './pages/Track';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // ✅ Use context
  return currentUser ? children : <Navigate to="/login" replace />;
};
function App() {
  return (
    
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />
      <Route path="/support" element={<Support />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/order" element={<PrivateRoute><Order /></PrivateRoute>} />
      <Route path="/feedback" element={<PrivateRoute><Feedback /></PrivateRoute>} />
      <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
      <Route path="/track" element={<PrivateRoute><Track /></PrivateRoute>} />
      
      </Routes>
  );
}

export default App;
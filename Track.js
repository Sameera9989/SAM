
// src/pages/Track.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Track() {
  const [progress, setProgress] = useState(1); // 1: Preparing, 2: Out, 3: Delivered
  const [timeLeft, setTimeLeft] = useState("18 min");
  const navigate = useNavigate();

  const statusLabels = ["Preparing", "Out for Delivery", "Delivered"];
  const currentStatus = statusLabels[progress - 1];

  // Simulate real-time order progression
  useEffect(() => {
    const timer1 = setTimeout(() => {
      alert("🍽️ Your food is being prepared!");
      setProgress(2);
      setTimeLeft("10 min");
    }, 6000);

    const timer2 = setTimeout(() => {
      alert("🚴‍♂️ Delivery partner Raj is on the way!");
      setProgress(3);
      setTimeLeft("2 min");
    }, 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <Navbar />

      <main style={{
        padding: '80px 2rem',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <h1 style={{ color: '#e63946' }}>🏃‍♂️ Track Your Order</h1>
        <p><strong>Estimated Arrival:</strong> <span style={{ fontWeight: 'bold', color: '#e63946' }}>{timeLeft}</span></p>

        {/* Progress Bar */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '15px',
          margin: '2rem 0',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
        }}>
          <h3>Status: <strong>{currentStatus}</strong></h3>

          <div style={{
            width: '100%',
            height: '10px',
            background: '#eee',
            borderRadius: '5px',
            overflow: 'hidden',
            margin: '1rem 0'
          }}>
            <div
              style={{
                width: `${(progress / 3) * 100}%`,
                height: '100%',
                background: '#e63946',
                transition: 'width 0.5s ease-in-out'
              }}
            />
          </div>

          <p>Your food is being cooked and will be delivered soon.</p>
        </div>

        {/* Delivery Agent Info */}
        {progress >= 2 && (
          <div style={{
            background: '#f8f8f8',
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <h4>📦 Delivery Partner: <strong>Raj Kumar</strong></h4>
            <p>
              📞 <a href="tel:+919876543210" style={{ color: '#e63946' }}>Call Driver</a>
            </p>
          </div>
        )}

        {/* Fake Map Simulation */}
        <div style={{
          width: '100%',
          height: '200px',
          background: '#ddd',
          borderRadius: '12px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '2rem'
        }}>
          <div style={{ padding: '1rem', color: '#555' }}>📍 Live Location (Simulated)</div>

          {/* Restaurant Marker */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: '#e63946',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            🏪 Restaurant
          </div>

          {/* User Home */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: '#333',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '8px',
            fontSize: '0.9rem'
          }}>
            🏠 You
          </div>

          {/* Moving Delivery Agent */}
          <div style={{
            position: 'absolute',
            top: progress === 1 ? '20px' : progress === 2 ? '100px' : '160px',
            left: progress === 1 ? '20px' : progress === 2 ? '150px' : '250px',
            background: '#007bff',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '8px',
            fontSize: '0.9rem',
            transition: 'all 1s ease'
          }}>
            🚴‍♂️ Raj
          </div>
        </div>

        {/* Feedback Button After Delivery */}
        {progress === 3 && (
          <button
            onClick={() => navigate('/feedback')}
            style={{
              padding: '0.8rem 1.8rem',
              background: '#e63946',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer'
            }}
          >
            ⭐ Rate & Give Feedback
          </button>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Track;

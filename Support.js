
// src/pages/Support.js
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Support() {
  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main style={{
        padding: '80px 2rem',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center',
        color: '#333',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <h1 style={{ fontSize: '2.5rem', color: '#e63946', marginBottom: '1rem' }}>
          📞 How Can We Help?
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '2rem' }}>
          We’re here 24/7 to assist with orders, refunds, account issues, or feedback.
        </p>

        <div style={{
          display: 'grid',
          gap: '1.5rem',
          maxWidth: '500px',
          margin: '2rem auto'
        }}>
          {/* Email */}
          <a
            href="mailto:support@foodpulse.com"
            style={supportLinkStyle}
          >
            ✉️ Email Us
            <br />
            <small>Get a response within 2 hours</small>
          </a>

          {/* Phone */}
          <a
            href="tel:+1234567890"
            style={supportLinkStyle}
          >
            📞 Call Support
            <br />
            <small>Available 8 AM – 10 PM</small>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={supportLinkStyle}
          >
            💬 Chat on WhatsApp
            <br />
            <small>Fastest support channel</small>
          </a>

          {/* Back to Home */}
          <Link
            to="/home"
            style={{ ...supportLinkStyle, background: '#ddd', color: '#333' }}
          >
            🔙 Back to Home
          </Link>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

// Reusable style for links
const supportLinkStyle = {
  display: 'block',
  padding: '1.2rem',
  background: '#e63946',
  color: 'white',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: 'bold',
  fontSize: '1.1rem',
  transition: 'background 0.3s',
};

export default Support;

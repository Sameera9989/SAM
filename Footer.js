import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={footerStyle}>
    <div style={containerStyle}>
      <p>&copy; 2025 FoodPulse. Made with 🌱 for food lovers.</p>
      <ul style={footerLinks}>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/support">Support</Link></li>
      </ul>
    </div>
  </footer>
);

const footerStyle = {
  background: '#333',
  color: 'white',
  padding: '2rem',
  textAlign: 'center',
  marginTop: '4rem'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap'
};

const footerLinks = {
  listStyle: 'none',
  display: 'flex',
  gap: '1.5rem'
};

export default Footer;
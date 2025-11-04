import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const {logout, cart } = useAuth();
  const { currentUser } = useAuth();
  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        <Link to="/home" style={logoStyle}>🍽️ FoodPulse</Link>

        <ul style={navList}>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          {currentUser ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><button onClick={logout} style={linkButton}>Logout</button></li>
            </>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
<li>
  <Link to="/order" style={{ position: 'relative' }}>
    🛒 Order
    {cart.length > 0 && (
      <span style={{
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        background: '#e63946',
        color: 'white',
        fontSize: '0.7rem',
        borderRadius: '50%',
        width: '18px',
        height: '18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {cart.length}
      </span>
    )}
  </Link>
</li>
    </nav>
  );
};

const navbarStyle = {
  background: 'white',
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  position: 'fixed',
  width: '100%',
  top: 0,
  zIndex: 1000
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  fontSize: '1.8rem',
  fontWeight: '700',
  color: '#e63946',
  textDecoration: 'none'
};

const navList = {
  display: 'flex',
  listStyle: 'none',
  gap: '2rem',
  alignItems: 'center'
};

const linkButton = {
  background: 'none',
  border: 'none',
  color: '#e63946',
  cursor: 'pointer',
  fontSize: '1rem'
};

export default Navbar;


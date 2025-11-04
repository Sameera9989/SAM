// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null); // Track which social button is loading
  const { login } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  setTimeout(() => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
    } else {
      login(formData.email, formData.password); // ✅ Pass both!
    }
    setLoading(false);
  }, 800);
};

// ✅ Enhanced: Handle Google Login with "saved emails"
const handleGoogleLogin = () => {
  // Mock saved Google accounts on this device
  const savedEmails = [
    "you@gmail.com",
    "hello@company.com",
    "user.backup@gmail.com"
  ];

  const choice = prompt(
    `Choose a Google account to continue:\n\n1. ${savedEmails[0]}\n2. ${savedEmails[1]}\n3. ${savedEmails[2]}\n\nEnter 1, 2, or 3`,
    "1"
  );

  if (!choice) return; // Cancelled

  const selectedEmail = savedEmails[parseInt(choice) - 1];

  if (selectedEmail) {
    alert(`🟢 Signed in with Google as ${selectedEmail}`);
    login(selectedEmail); // Use your existing login function
  } else {
    alert("❌ Invalid selection");
  }
};

// ✅ Enhanced: Handle Facebook Login with "saved emails"
const handleFacebookLogin = () => {
  // Mock saved Facebook-linked accounts
  const savedEmails = [
    "you@gmail.com",
    "friend@yahoo.com"
  ];

  const choice = prompt(
    `Continue as:\n\n1. ${savedEmails[0]} (Facebook connected)\n2. ${savedEmails[1]} (Facebook connected)\n\nChoose 1 or 2`,
    "1"
  );

  if (!choice) return;

  const selectedEmail = savedEmails[parseInt(choice) - 1];

  if (selectedEmail) {
    alert(`🔵 Logged in via Facebook as ${selectedEmail}`);
    login(selectedEmail);
  } else {
    alert("❌ Invalid selection");
  }
};

  return (
    <div style={pageStyle}>
      {/* Subtle food pattern background */}
      <div style={bgPattern} />

      <div style={cardStyle}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.4rem',
            fontWeight: 'bold',
            color: '#e63946',
            margin: 0
          }}>🍽️ FoodPulse</h1>
          <p style={{ color: '#555', marginTop: '0.5rem' }}>Welcome back to flavor town!</p>
        </div>

        <h2 style={{
          fontSize: '1.8rem',
          color: '#333',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          🔐 Log In
        </h2>

        {/* Error Message */}
        {error && (
          <div style={errorStyle}>{error}</div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputGroupStyle}>
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="hello@foodpulse.com"
              required
              style={inputStyle}
            />
          </div>

          <div style={inputGroupStyle}>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={btnPrimaryStyle}
          >
            {loading ? 'Signing in...' : 'Log In'}
          </button>
        </form>

        {/* Sign Up Prompt */}
        <p style={footerTextStyle}>
          Don’t have an account?{' '}
          <span
            onClick={() => (window.location.href = '/signup')}
            style={linkStyle}
          >
            Create one
          </span>
        </p>

        {/* Divider */}
        <div style={dividerStyle}>
          <span>or continue with</span>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={socialLoading === 'google'}
          style={
            socialLoading === 'google'
              ? { ...socialBtnStyle, background: '#cfcfcf', cursor: 'wait' }
              : socialBtnStyle
          }
        >
          {socialLoading === 'google' ? (
            <>🟡 Logging in with Google...</>
          ) : (
            <>🔍 Sign in with Google</>
          )}
        </button>

        {/* Facebook Button */}
        <button
          onClick={handleFacebookLogin}
          disabled={socialLoading === 'facebook'}
          style={
            socialLoading === 'facebook'
              ? { ...socialBtnStyle, background: '#cfcfcf', cursor: 'wait' }
              : { ...socialBtnStyle, background: '#1877f2', color: 'white' }
          }
        >
          {socialLoading === 'facebook' ? (
            <>🔵 Connecting to Facebook...</>
          ) : (
            <>📘 Sign in with Facebook</>
          )}
        </button>
      </div>
    </div>
  );
}

// <<< STYLES >>> (same as before)
const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #fff8f8, #f1f1f1)',
  padding: '20px',
  position: 'relative',
  fontFamily: "'Poppins', sans-serif"
};

const bgPattern = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `
    url("https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg"),
`,
  zIndex: -1
};

const cardStyle = {
  background: 'white',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  padding: '3rem',
  width: '100%',
  maxWidth: '420px',
  textAlign: 'center'
};

const inputGroupStyle = {
  marginBottom: '1.2rem',
  textAlign: 'left'
};

const inputStyle = {
  width: '100%',
  padding: '1rem',
  borderRadius: '12px',
  border: '1px solid #ddd',
  outline: 'none',
  fontSize: '1rem'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column'
};

const btnPrimaryStyle = {
  padding: '1rem',
  background: '#e63946',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
  marginTop: '1rem'
};

const errorStyle = {
  backgroundColor: '#ffccd5',
  color: '#d62828',
  padding: '1rem',
  borderRadius: '12px',
  fontSize: '0.9rem',
  marginBottom: '1rem'
};

const footerTextStyle = {
  fontSize: '0.95rem',
  color: '#555',
  marginTop: '1.5rem'
};

const linkStyle = {
  color: '#e63946',
  fontWeight: '600',
  textDecoration: 'underline',
  cursor: 'pointer'
};

const dividerStyle = {
  borderTop: '1px solid #eee',
  textAlign: 'center',
  position: 'relative',
  margin: '1.8rem 0'
};

dividerStyle['::before'] = {
  content: '" "',
  position: 'absolute',
  top: '-1px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: 'white',
  padding: '0 10px',
  color: '#aaa',
  fontSize: '0.9rem'
};

const socialBtnStyle = {
  padding: '0.8rem',
  border: '1px solid #ddd',
  background: 'white',
  borderRadius: '12px',
  fontSize: '1rem',
  cursor: 'pointer',
  marginBottom: '0.8rem',
  transition: 'all 0.3s'
};

export default Login;
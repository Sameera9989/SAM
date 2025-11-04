
// src/pages/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (!formData.name || !formData.email) {
      setError("Please fill your name and email.");
      return;
    }
    setError('');
    setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Simulate success
    setTimeout(() => {
      alert(`🎉 Welcome, ${formData.name}! Your account is ready.`);
      navigate('/login');
    }, 1500);
  };

  return (
    <div style={pageStyle}>
      {/* Animated food dots background */}
      <div style={dotsBg} />

      <div style={cardStyle}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.4rem',
            fontWeight: 'bold',
            color: '#e63946',
            margin: 0
          }}>🍽️ FoodPulse</h1>
          <p style={{ color: '#555', marginTop: '0.5rem' }}>Let’s get you started on your food journey.</p>
        </div>

        {/* Progress Steps */}
        <div style={stepsStyle}>
          <div style={step === 1 ? activeStep : inactiveStep}>1</div>
          <span style={{ margin: '0 10px', color: '#ccc' }}>→</span>
          <div style={step === 2 ? activeStep : inactiveStep}>2</div>
        </div>

        <h2 style={{
          fontSize: '1.8rem',
          color: '#333',
          marginBottom: '1.5rem',
          textAlign: 'center'
        }}>
          {step === 1 ? '🧑 Tell Us About You' : '🔑 Set Your Password'}
        </h2>

        {error && <div style={errorStyle}>{error}</div>}

        {step === 1 ? (
          <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} style={formStyle}>
            <div style={inputGroupStyle}>
              <label>Your Full Name</label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Alex Johnson"
                required
                style={inputStyle}
              />
            </div>
            <div style={inputGroupStyle}>
              <label>Email Address</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@example.com"
                required
                style={inputStyle}
              />
            </div>
            <button type="submit" style={btnPrimaryStyle}>
              Continue
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={inputGroupStyle}>
              <label>Create Password</label>
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
            <div style={inputGroupStyle}>
              <label>Confirm Password</label>
              <input
                name="confirm"
                type="password"
                value={formData.confirm}
                onChange={handleChange}
                placeholder="••••••••"
                required
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={prevStep} style={btnSecondaryStyle}>
                Back
              </button>
              <button type="submit" disabled={loading} style={btnPrimaryStyle}>
                {loading ? 'Creating...' : 'Sign Up'}
              </button>
            </div>
          </form>
        )}

        <p style={footerTextStyle}>
          Already have an account?{' '}
          <Link to="/login" style={linkStyle}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

// <<< STYLES >>>
const pageStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #f1faee, #a8dadc)',
  padding: '20px',
  fontFamily: "'Poppins', sans-serif"
};

const dotsBg = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundImage: `
    url("https://static.spotapps.co/website_images/ab_websites/174603_website_v1/menu.jpg")
  `,
  zIndex: -1
};

const cardStyle = {
  background: 'white',
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  padding: '3rem',
  width: '100%',
  maxWidth: '450px',
  textAlign: 'center'
};

const stepsStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2rem'
};

const activeStep = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  background: '#e63946',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold'
};

const inactiveStep = {
  ...activeStep,
  background: '#ddd',
  color: '#555'
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

const btnSecondaryStyle = {
  ...btnPrimaryStyle,
  background: '#ddd',
  color: '#333',
  flex: 1
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
  textDecoration: 'underline'
};

export default Signup;

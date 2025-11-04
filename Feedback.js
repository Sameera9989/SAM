// src/pages/Feedback.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save feedback object
    const feedback = {
      rating,
      review: review.trim(),
      timestamp: new Date().toISOString()
    };

    // Optional: Save to localStorage
    const savedFeedback = JSON.parse(localStorage.getItem('deliveryFeedback') || '[]');
    localStorage.setItem('deliveryFeedback', JSON.stringify([...savedFeedback, feedback]));

    // Show success message
    alert(`⭐ Thank you for your feedback!\nRating: ${rating} stars\nReview: "${review}"`);

    // Redirect to home
    navigate('/home');
  };

  return (
    <>
      <Navbar />

      <main style={{
        padding: '80px 2rem',
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#e63946' }}>⭐ How Was Your Delivery?</h1>
        <p>We'd love to hear about your experience.</p>

        <form onSubmit={handleSubmit} style={{ textAlign: 'left', marginTop: '2rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label>Delivery Rating:</label>
            <div style={{ marginTop: '0.5rem' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  role="button"
                  tabIndex="0"
                  style={{
                    fontSize: '2rem',
                    cursor: 'pointer',
                    color: star <= rating ? '#e63946' : '#ccc',
                    userSelect: 'none'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setRating(star);
                    }
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="review">Additional Comments:</label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="5"
              placeholder="Tell us what we did well or how we can improve..."
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginTop: '0.5rem',
                resize: 'vertical'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '0.8rem 1.8rem',
              background: '#e63946',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer'
            }}
          >
            Submit Feedback
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
}

export default Feedback;
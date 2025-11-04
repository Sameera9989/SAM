// src/pages/Payment.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Payment() {
  const { getTotalPrice, clearCart, cart } = useAuth();
  const navigate = useNavigate();

  // State for payment steps
  const [step, setStep] = useState(1); // 1: Show UPI details, 2: Processing, 3: Receipt
  const [paymentId, setPaymentId] = useState('');

  const totalAmount = parseFloat(getTotalPrice());
  const upiId = "foodpulse@ybl";
  const qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?data=upi%3A%2F%2Fpay%3Fpa%3Dfoodpulse%40ybl%26pn%3DFoodPulse%26am%3D" + (totalAmount * 83.5).toFixed(2) + "%26cu%3DINR&size=300x300";

  const handlePayNow = () => {
    setStep(2); // Go to processing

    // Simulate delay like real app
    setTimeout(() => {
      const id = `fp${Date.now().toString().slice(-6)}`;
      setPaymentId(id);
      setStep(3); // Show receipt
    }, 2500);
  };

  const closeReceipt = () => {
    clearCart();
    navigate('/track');
  };

  return (
    <>
      <Navbar />

      {/* Main Content */}
      <main style={{
        padding: '80px 2rem',
        maxWidth: '500px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: "'Poppins', sans-serif"
      }}>

        {/* Step 1: Show UPI Details */}
        {step === 1 && (
          <>
            <h1 style={{ color: '#e63946' }}>💳 Pay via UPI</h1>
            <p>Scan QR or send to UPI ID below</p>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              marginTop: '2rem'
            }}>
              <h2>Total: ₹{(totalAmount * 83.5).toFixed(2)}</h2>

              {/* QR Code */}
              <img
                src={qrCodeUrl}
                alt="Scan to Pay"
                style={{
                  width: '180px',
                  height: '180px',
                  margin: '1.5rem auto',
                  border: '1px solid #ddd',
                  borderRadius: '12px'
                }}
              />

              {/* UPI ID */}
              <div style={{
                padding: '1rem',
                background: '#f8f8f8',
                borderRadius: '12px',
                fontSize: '1rem',
                wordBreak: 'break-all'
              }}>
                <strong>Send to:</strong><br />
                <span style={{ color: '#e63946', fontWeight: 'bold' }}>{upiId}</span>
              </div>

              <button
                onClick={handlePayNow}
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem 2rem',
                  background: '#e63946',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px',
                  fontSize: '1.1rem',
                  cursor: 'pointer'
                }}
              >
                I've Paid → Confirm
              </button>
            </div>

            {/* Test Info */}
            <div style={{
              marginTop: '1.5rem',
              fontSize: '0.9rem',
              color: '#555',
              textAlign: 'left'
            }}>
              <strong>💡 How to Pay:</strong>
              <ul>
                <li>Open PhonePe, Google Pay, or any UPI app</li>
                <li>Scan QR or paste UPI ID: <strong>{upiId}</strong></li>
                <li>Send exact amount: ₹{(totalAmount * 83.5).toFixed(2)}</li>
                <li>Click “I've Paid” after successful transfer</li>
              </ul>
            </div>
          </>
        )}

        {/* Step 2: Processing Animation */}
        {step === 2 && (
          <div style={{
            padding: '3rem 2rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '8px solid #f3f3f3',
              borderTop: '8px solid #e63946',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto'
            }}></div>
            <h2 style={{ color: '#e63946', margin: '1.5rem 0' }}>Processing Payment...</h2>
            <p>Please wait while we confirm your transaction.</p>
          </div>
        )}

        {/* Step 3: Payment Receipt */}
        {step === 3 && (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '15px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ color: '#e63946', margin: '0 0 1rem' }}>✅ Payment Successful!</h2>
            <p>Your order is confirmed and will be delivered soon.</p>
            {/* Receipt */}
            <div style={{
              textAlign: 'left',
              padding: '1.5rem',
              background: '#f8f8f8',
              borderRadius: '12px',
              margin: '1.5rem 0',
              fontSize: '0.95rem'
            }}>
              <p><strong>Order ID:</strong> FP{paymentId}</p>
              <p><strong>Date & Time:</strong> {new Date().toLocaleString()}</p>
              <p><strong>Payment Method:</strong> UPI • {upiId}</p>
              <p><strong>Items:</strong></p>
              <ul style={{ marginLeft: '1rem', marginBottom: '0.5rem' }}>
                {cart.map(({ dish, quantity }) => (
                  <li key={dish.name}>
                    {quantity}x {dish.name} ({dish.price})
                  </li>
                ))}
              </ul>
              <hr />
              <p><strong>Total Paid:</strong> ₹{(totalAmount * 83.5).toFixed(2)}</p>
            </div>

            <button
              onClick={closeReceipt}
              style={{
                padding: '0.8rem 1.8rem',
                background: '#e63946',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer'
              }}
            >
              View Tracking
            </button>
          </div>
        )}
      </main>

      {/* Add Spin Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <Footer />
    </>
  );
}

export default Payment;
// src/pages/Order.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Order() {
  const { cart, getTotalPrice } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <div style={{
          padding: '80px 20px',
          textAlign: 'center',
          color: '#333'
        }}>
          <h2>🛒 Your Order is Empty</h2>
          <Link to="/home" style={{
            padding: '0.8rem 1.8rem',
            background: '#e63946',
            color: 'white',
            borderRadius: '30px',
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '1rem'
          }}>
            Browse Restaurants
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main style={{
        padding: '80px 2rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: '#333'
      }}>
        <h1 style={{ fontSize: '2.2rem', color: '#e63946', marginBottom: '2rem' }}>🛒 My Order</h1>

        {/* Order Items */}
        <div style={{ marginBottom: '3rem' }}>
          {cart.map(({ dish, quantity }) => (
            <div key={dish.name} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              borderBottom: '1px solid #eee',
              gap: '1rem'
            }}>
              <img
                src={dish.img}
                alt={dish.name}
                style={{
                  width: '60px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }}
              />
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0', fontSize: '1rem' }}>{dish.name}</h3>
                <p style={{ margin: '0.2rem 0', color: '#e63946', fontWeight: 'bold' }}>
                  {dish.price} × {quantity} = ${(parseFloat(dish.price.replace('$', '')) * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{
          padding: '1.5rem',
          background: '#f8f8f8',
          borderRadius: '12px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>Total: <strong>${getTotalPrice()}</strong></h3>
          <p style={{ fontSize: '0.9rem', color: '#555' }}>Includes taxes and delivery fee.</p>
        </div>

        {/* Pay Now Button */}
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={() => navigate('/payment')}
            style={{
              padding: '1rem 2rem',
              background: '#e63946',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              fontSize: '1.1rem',
              cursor: 'pointer'
            }}
          >
            💳 Place Order & Pay
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Order;
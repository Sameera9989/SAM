// src/components/Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, title, image, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        width: '90%',
        maxWidth: '900px',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '15px',
        padding: '2rem',
        textAlign: 'left',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            background: '#e63946',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '1.5rem',
            cursor: 'pointer',
            float: 'right'
          }}
        >
          ✕
        </button>

        {/* Optional Image */}
        {image && (
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '1rem'
            }}
          />
        )}

        {/* Title */}
        {title && <h2 style={{ color: '#e63946', marginTop: '0' }}>{title}</h2>}

        {/* Dynamic Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
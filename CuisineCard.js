import React from 'react';

const CuisineCard = ({ cuisine, onClick }) => {
  return (
    <div
      onClick={() => onClick(cuisine)}
      style={cardStyle}
      onMouseOver={e => e.currentTarget.style.transform = 'translateY(-10px)'}
      onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <img src={cuisine.image} alt={cuisine.title} style={cardImage} />
      <h3 style={{ color: '#e63946', margin: '0.8rem 0 0.4rem' }}>{cuisine.title}</h3>
      <p style={{ color: '#555', fontSize: '0.95rem' }}>{cuisine.desc}</p>
    </div>
  );
};

const cardStyle = {
  background: '#fdf4f4',
  padding: '1rem',
  borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  transition: 'all 0.4s ease',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const cardImage = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '10px'
};

export default CuisineCard;
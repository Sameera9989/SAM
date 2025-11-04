import React from 'react';

const Button = ({ children, variant = "primary", onClick, type = "button", full = false, disabled = false }) => {
  const base = "padding: 0.8rem 1.8rem; border: none; border-radius: 30px; font-weight: 600; cursor: pointer; transition: all 0.3s;";
  const variants = {
    primary: "background: #e63946; color: white;",
    secondary: "background: #ddd; color: #333;",
    link: "background: transparent; color: #e63946;"
  };

  return (
    <button
      type={type}
      style={{
        ...{ display: full ? 'block' : 'inline-block' },
        ...{ width: full ? '100%' : 'auto' },
        cssText: `${base} ${variants[variant]} ${disabled ? 'opacity: 0.6; cursor: not-allowed;' : ''}`
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const  {logout } = useAuth();
  const navigate = useNavigate();
  const { currentUser } = useAuth();


  const recentOrders = [
    { id: 1, dish: "Masala Dosa", cuisine: "South Indian", status: "Delivered", img: "https://images.unsplash.com/photo-1546549500-2d3e41d54e4c?w=300" },
    { id: 2, dish: "Butter Chicken", cuisine: "North Indian", status: "Delivered", img: "https://images.unsplash.com/photo-1565299587563-d6c73c9be07c?w=300" },
    { id: 3, dish: "Margherita Pizza", cuisine: "Italian", status: "Preparing", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300" }
  ];

  return (
    <>
      <Navbar />

      <main style={{
        padding: '80px 2rem 4rem',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: "'Poppins', sans-serif"
      }}>
        <header style={{
          textAlign: 'center',
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, #e63946, #c1121f)',
          color: 'white',
          padding: '3rem',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(230, 57, 70, 0.3)'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            Welcome back, {currentUser?.name}! 👋
          </h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>
            Ready for your next delicious adventure?
          </p>
        </header>

        {/* Quick Actions */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <Link to="/home" style={dashboardCard}>
            🔍 Explore Cuisines
          </Link>
          <Link to="/about" style={dashboardCard}>
            📚 Learn About Us
          </Link>
          <button onClick={logout} style={{ ...dashboardCard, background: '#ff6b6b' }}>
            🚪 Log Out
          </button>
        </section>

        {/* Recent Orders */}
        <section>
          <h2 style={{ fontSize: '2rem', color: '#e63946', marginBottom: '2rem' }}>🍽️ Recent Orders</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {recentOrders.map(order => (
              <div key={order.id} style={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
                padding: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}>
                <img
                  src={order.img}
                  alt={order.dish}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '8px',
                    objectFit: 'cover'
                  }}
                />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{order.dish}</h3>
                  <p style={{ margin: '0.3rem 0', color: '#666', fontSize: '0.9rem' }}>{order.cuisine}</p>
                  <span style={{
                    padding: '0.3rem 0.6rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    background: order.status === 'Delivered' ? '#d4edda' : '#fff3cd',
                    color: order.status === 'Delivered' ? '#155724' : '#856404'
                  }}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
           <Button as="button" onClick={() => navigate('/home')} full>
  Order Again
</Button>
        </div>
      </main>

      <Footer />
    </>
  );
}

const dashboardCard = {
  padding: '2rem',
  background: '#fdf4f4',
  borderRadius: '15px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
  cursor: 'pointer',
  transition: 'transform 0.3s',
  fontSize: '1.2rem',
  textDecoration: 'none',
  color: '#333',
  border: 'none'
};

export default Dashboard;
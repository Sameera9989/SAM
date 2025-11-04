import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
  const [activeTab, setActiveTab] = React.useState('mission');

  const tabs = {
    mission: {
      title: "🌱 Our Mission",
      content: "To make food delivery not just fast, but meaningful — connecting you with authentic global cuisines while reducing waste and supporting local kitchens."
    },
    vision: {
      title: "🔭 Our Vision",
      content: "A world where every meal is sustainable, personalized, and joyful — powered by technology that respects people and the planet."
    },
    values: {
      title: "✨ Core Values",
      content: (
        <ul style={{ marginLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li><strong>Globally Inspired:</strong> Celebrate diverse cultures through food.</li>
          <li><strong>Eco-Conscious:</strong> Reduce food waste via rescue meals.</li>
          <li><strong>User-Centric:</strong> Real-time AR tracking and smart recommendations.</li>
          <li><strong>Inclusive:</strong> Accessible to everyone, everywhere.</li>
        </ul>
      )
    }
  };

  return (
    <>
      <Navbar />

      <main style={{
        padding: '80px 2rem 4rem',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: "'Poppins', sans-serif",
        lineHeight: '1.8'
      }}>
        <section style={{
          textAlign: 'center',
          marginBottom: '3rem',
          color: '#333'
        }}>
          <h1 style={{ fontSize: '2.8rem', color: '#e63946', marginBottom: '1rem' }}>🍽️ About FoodPulse</h1>
          <p style={{ fontSize: '1.2rem', color: '#555' }}>
            We’re not just another food app. We're building a future where food connects cultures, reduces waste, and delights your senses.
          </p>
        </section>

        {/* Tabs */}
        <div style={{
          background: '#fdf4f4',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          marginBottom: '3rem'
        }}>
          <div style={{
            display: 'flex',
            borderBottom: '1px solid #ddd'
          }}>
            {Object.keys(tabs).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: '1rem',
                  border: 'none',
                  background: activeTab === tab ? '#e63946' : '#f8f8f8',
                  color: activeTab === tab ? 'white' : '#333',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {tabs[tab].title.split(' ')[0]} <span style={{ marginLeft: '0.5rem' }}>{tabs[tab].title.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>

          <div style={{
            padding: '2rem',
            background: 'white',
            minHeight: '200px'
          }}>
            {tabs[activeTab].content}
          </div>
        </div>

        {/* Team Section */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {[
            {
              name: "Priya K.",
              role: "Head Chef & Taste Curator",
              bio: "Formerly at Taj Hotels, she ensures every dish meets authenticity standards.",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAG-dJA4ZRQWTW2CICLUdn5ajyHUCNbvEjRA&s"
            },
            {
              name: "Arjun M.",
              role: "Tech Lead",
              bio: "Built scalable apps for Swiggy & Zomato before founding FoodPulse.",
              img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            },
            {
              name: "Lila N.",
              role: "Sustainability Director",
              bio: "Ex-Greenpeace. Leads our zero-waste kitchen partnerships.",
              img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
            }
          ].map((member, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <img
                src={member.img}
                alt={member.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem'
                }}
              />
              <h3 style={{ color: '#e63946', margin: '0.5rem 0' }}>{member.name}</h3>
              <p style={{ fontWeight: '600', color: '#555' }}>{member.role}</p>
              <p style={{ fontSize: '0.95rem', color: '#666', marginTop: '0.5rem' }}>{member.bio}</p>
            </div>
          ))}
        </section>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button as={Link} to="/signup">
  Join Our Journey
</Button>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;
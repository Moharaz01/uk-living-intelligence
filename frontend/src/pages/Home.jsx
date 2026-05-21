import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#08090f' }}>
      
      {/* Hero Section */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '100px 48px 60px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 16px',
          border: '1px solid rgba(108,143,255,0.3)',
          borderRadius: '100px',
          color: '#6c8fff',
          fontSize: '12px',
          marginBottom: '28px',
          background: 'rgba(108,143,255,0.07)'
        }}>
          🇬🇧 Real UK Data — Updated Regularly
        </div>

        <h1 style={{
          fontFamily: 'serif',
          fontSize: 'clamp(40px, 6vw, 72px)',
          fontWeight: '900',
          lineHeight: '1.1',
          marginBottom: '20px',
          letterSpacing: '-1.5px'
        }}>
          Know Your Area.<br />
          <span style={{ color: '#6c8fff', fontStyle: 'italic' }}>Live Smarter.</span>
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#b0b8d8',
          lineHeight: '1.8',
          maxWidth: '600px',
          margin: '0 auto 40px',
          fontWeight: '300'
        }}>
          The UK's most accessible intelligence platform for crime rates, rental costs, 
          and local services — helping you make smarter decisions about where you live, 
          work, and move.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/crime')}
            style={{
              padding: '14px 32px',
              background: '#6c8fff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Explore Crime Map
          </button>
          <button
            onClick={() => navigate('/rent')}
            style={{
              padding: '14px 32px',
              background: 'transparent',
              color: '#b0b8d8',
              border: '1px solid rgba(180,190,255,0.2)',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            View Rent Data
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 48px 100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {[
          {
            icon: '🔴',
            title: 'Crime Intelligence',
            desc: 'Street-level crime data across every UK area. Search by postcode and see exactly what\'s happening near you — updated from official UK Police records.',
            color: '#ff6b6b'
          },
          {
            icon: '🏠',
            title: 'Rental Market Data',
            desc: 'Average rental costs by area, property type, and bedroom count. Official ONS data helping you understand the true cost of living anywhere in the UK.',
            color: '#6c8fff'
          },
          {
            icon: '📍',
            title: 'Local Services',
            desc: 'Find shops, amenities, transport links and services near any UK postcode. Everything you need to know before you move — coming soon.',
            color: '#4dd9c0'
          }
        ].map((card, i) => (
          <div key={i} style={{
            padding: '32px',
            background: '#0f1120',
            border: '1px solid rgba(180,190,255,0.08)',
            borderRadius: '12px',
            transition: 'all 0.3s'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>{card.icon}</div>
            <h3 style={{
              fontFamily: 'serif',
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '12px',
              color: card.color
            }}>{card.title}</h3>
            <p style={{ fontSize: '14px', color: '#7880a0', lineHeight: '1.7' }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* GDPR Notice */}
      <div style={{
        maxWidth: '800px',
        margin: '0 auto 60px',
        padding: '20px 48px',
        textAlign: 'center'
      }}>
        <p style={{ fontSize: '12px', color: '#4a5068', lineHeight: '1.6' }}>
          🔒 All data is sourced from official UK government APIs and public datasets. 
          We collect no personal data. UK GDPR compliant by design.
        </p>
      </div>

    </div>
  )
}
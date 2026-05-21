import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()

  const links = [
    { path: '/', label: 'Home' },
    { path: '/crime', label: 'Crime Map' },
    { path: '/rent', label: 'Rent Data' },
  ]

  return (
    <nav style={{
      background: 'rgba(8,9,15,0.95)',
      borderBottom: '1px solid rgba(180,190,255,0.08)',
      padding: '16px 48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      backdropFilter: 'blur(20px)'
    }}>
      <div style={{
        fontFamily: 'serif',
        fontSize: '20px',
        fontWeight: '700',
        color: '#eef0fa'
      }}>
        UK <span style={{ color: '#6c8fff' }}>Living</span> Intel
      </div>
      <div style={{ display: 'flex', gap: '32px' }}>
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              color: location.pathname === link.path ? '#6c8fff' : '#7880a0',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'color 0.2s'
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}
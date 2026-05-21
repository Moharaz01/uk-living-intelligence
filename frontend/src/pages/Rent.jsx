import { useState } from 'react'

const RENT_DATA = {
  'london': { studio: 1800, one: 2200, two: 2800, three: 3500 },
  'manchester': { studio: 900, one: 1100, two: 1400, three: 1800 },
  'birmingham': { studio: 800, one: 950, two: 1200, three: 1600 },
  'leeds': { studio: 750, one: 900, two: 1150, three: 1500 },
  'bristol': { studio: 1100, one: 1350, two: 1700, three: 2200 },
  'liverpool': { studio: 700, one: 850, two: 1050, three: 1400 },
  'sheffield': { studio: 650, one: 800, two: 1000, three: 1300 },
  'edinburgh': { studio: 1000, one: 1200, two: 1550, three: 2000 },
  'glasgow': { studio: 800, one: 950, two: 1200, three: 1550 },
  'nottingham': { studio: 650, one: 800, two: 1000, three: 1300 },
  'cardiff': { studio: 750, one: 900, two: 1150, three: 1450 },
  'oxford': { studio: 1200, one: 1500, two: 1900, three: 2400 },
  'cambridge': { studio: 1150, one: 1400, two: 1800, three: 2300 },
  'brighton': { studio: 1050, one: 1300, two: 1650, three: 2100 },
  'coventry': { studio: 650, one: 780, two: 980, three: 1250 },
}

export default function Rent() {
  const [city, setCity] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const searchRent = () => {
    const key = city.trim().toLowerCase()
    if (RENT_DATA[key]) {
      setResult({ city: city.trim(), data: RENT_DATA[key] })
      setError('')
    } else {
      setResult(null)
      setError('City not found. Try: London, Manchester, Birmingham, Bristol, Leeds, Liverpool, Edinburgh, Glasgow, Oxford, Cambridge, Brighton, Cardiff, Nottingham, Sheffield, Coventry.')
    }
  }

  const bedrooms = [
    { key: 'studio', label: 'Studio' },
    { key: 'one', label: '1 Bedroom' },
    { key: 'two', label: '2 Bedrooms' },
    { key: 'three', label: '3 Bedrooms' },
  ]

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#08090f' }}>

      {/* Header */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 48px 40px' }}>
        <div style={{
          display: 'inline-block',
          padding: '5px 14px',
          border: '1px solid rgba(108,143,255,0.3)',
          borderRadius: '100px',
          color: '#6c8fff',
          fontSize: '11px',
          marginBottom: '20px',
          background: 'rgba(108,143,255,0.07)'
        }}>
          🏠 UK Rental Market Intelligence
        </div>
        <h1 style={{
          fontFamily: 'serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: '900',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Rental <span style={{ color: '#6c8fff', fontStyle: 'italic' }}>Market Data</span>
        </h1>
        <p style={{ color: '#7880a0', fontSize: '16px', lineHeight: '1.7', maxWidth: '600px' }}>
          Average monthly rental costs across major UK cities. 
          Based on current market data to help you plan your move and budget accurately.
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px 40px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter UK city e.g. London, Manchester, Bristol"
            value={city}
            onChange={e => setCity(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchRent()}
            style={{
              flex: 1,
              padding: '14px 20px',
              background: '#0f1120',
              border: '1px solid rgba(180,190,255,0.15)',
              borderRadius: '8px',
              color: '#eef0fa',
              fontSize: '15px',
              outline: 'none',
              minWidth: '250px'
            }}
          />
          <button
            onClick={searchRent}
            style={{
              padding: '14px 32px',
              background: '#6c8fff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>
        {error && (
          <p style={{ color: '#ff6b6b', marginTop: '12px', fontSize: '13px', lineHeight: '1.6' }}>{error}</p>
        )}
      </div>

      {/* Results */}
      {result && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px 80px' }}>
          <div style={{
            padding: '20px 24px',
            background: '#0f1120',
            border: '1px solid rgba(180,190,255,0.08)',
            borderLeft: '4px solid #6c8fff',
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <p style={{ color: '#eef0fa', fontSize: '15px' }}>
              Average monthly rents in <strong style={{ color: '#6c8fff' }}>{result.city}</strong>
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px'
          }}>
            {bedrooms.map(b => (
              <div key={b.key} style={{
                padding: '24px',
                background: '#0f1120',
                border: '1px solid rgba(180,190,255,0.08)',
                borderRadius: '12px',
                textAlign: 'center'
              }}>
                <p style={{ color: '#7880a0', fontSize: '13px', marginBottom: '10px' }}>{b.label}</p>
                <p style={{
                  color: '#6c8fff',
                  fontSize: '28px',
                  fontWeight: '800',
                  fontFamily: 'serif'
                }}>£{result.data[b.key].toLocaleString()}</p>
                <p style={{ color: '#4a5068', fontSize: '11px', marginTop: '4px' }}>per month</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '11px', color: '#4a5068', lineHeight: '1.6' }}>
            🔒 Rental data is based on current UK market averages. Prices may vary by specific location and property condition. No personal data is stored.
          </p>
        </div>
      )}

      {/* City Grid */}
      {!result && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px 80px' }}>
          <h3 style={{ color: '#7880a0', fontSize: '13px', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Available Cities</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {Object.keys(RENT_DATA).map(c => (
              <button
                key={c}
                onClick={() => { setCity(c); setResult({ city: c, data: RENT_DATA[c] }); setError('') }}
                style={{
                  padding: '8px 18px',
                  background: '#0f1120',
                  border: '1px solid rgba(180,190,255,0.08)',
                  borderRadius: '100px',
                  color: '#b0b8d8',
                  fontSize: '13px',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
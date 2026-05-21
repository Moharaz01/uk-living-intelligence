import { useState } from 'react'
import axios from 'axios'

export default function Crime() {
  const [postcode, setPostcode] = useState('')
  const [crimes, setCrimes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const searchCrime = async () => {
    if (!postcode.trim()) return
    setLoading(true)
    setError('')
    setCrimes([])
    setSearched(false)

    try {
      // First get coordinates from postcode
      const geoRes = await axios.get(`https://api.postcodes.io/postcodes/${postcode.trim()}`)
      const { latitude, longitude } = geoRes.data.result

      // Then get crime data from UK Police API
      const crimeRes = await axios.get(
        `https://data.police.uk/api/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`
      )

      setCrimes(crimeRes.data)
      setSearched(true)
    } catch (err) {
      setError('Could not find data for this postcode. Please check and try again.')
    } finally {
      setLoading(false)
    }
  }

  // Count crimes by category
  const crimeSummary = crimes.reduce((acc, crime) => {
    const cat = crime.category.replace(/-/g, ' ')
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})

  const sortedCrimes = Object.entries(crimeSummary).sort((a, b) => b[1] - a[1])

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#08090f' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 48px 40px' }}>
        <div style={{
          display: 'inline-block',
          padding: '5px 14px',
          border: '1px solid rgba(255,107,107,0.3)',
          borderRadius: '100px',
          color: '#ff6b6b',
          fontSize: '11px',
          marginBottom: '20px',
          background: 'rgba(255,107,107,0.07)'
        }}>
          🔴 Live UK Police Data
        </div>
        <h1 style={{
          fontFamily: 'serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: '900',
          marginBottom: '16px',
          letterSpacing: '-1px'
        }}>
          Crime <span style={{ color: '#6c8fff', fontStyle: 'italic' }}>Intelligence</span>
        </h1>
        <p style={{ color: '#7880a0', fontSize: '16px', lineHeight: '1.7', maxWidth: '600px' }}>
          Search any UK postcode to see street-level crime data from official UK Police records. 
          Understand crime patterns in any area before you move or visit.
        </p>
      </div>

      {/* Search Box */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px 40px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Enter UK postcode e.g. SW1A 1AA"
            value={postcode}
            onChange={e => setPostcode(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchCrime()}
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
            onClick={searchCrime}
            disabled={loading}
            style={{
              padding: '14px 32px',
              background: loading ? '#3a4a7a' : '#6c8fff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
        {error && (
          <p style={{ color: '#ff6b6b', marginTop: '12px', fontSize: '14px' }}>{error}</p>
        )}
      </div>

      {/* Results */}
      {searched && (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 48px 80px' }}>
          
          {/* Summary */}
          <div style={{
            padding: '20px 24px',
            background: '#0f1120',
            border: '1px solid rgba(180,190,255,0.08)',
            borderLeft: '4px solid #6c8fff',
            borderRadius: '8px',
            marginBottom: '24px'
          }}>
            <p style={{ color: '#eef0fa', fontSize: '15px' }}>
              Found <strong style={{ color: '#6c8fff' }}>{crimes.length} crimes</strong> near <strong>{postcode.toUpperCase()}</strong> in the last recorded month.
            </p>
          </div>

          {/* Crime Breakdown */}
          <h3 style={{
            fontFamily: 'serif',
            fontSize: '22px',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#eef0fa'
          }}>Crime Breakdown</h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px'
          }}>
            {sortedCrimes.map(([category, count]) => (
              <div key={category} style={{
                padding: '16px 20px',
                background: '#0f1120',
                border: '1px solid rgba(180,190,255,0.08)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: '#b0b8d8',
                  fontSize: '13px',
                  textTransform: 'capitalize'
                }}>{category}</span>
                <span style={{
                  color: '#6c8fff',
                  fontWeight: '700',
                  fontSize: '18px',
                  fontFamily: 'monospace'
                }}>{count}</span>
              </div>
            ))}
          </div>

          {/* GDPR Note */}
          <p style={{
            marginTop: '32px',
            fontSize: '11px',
            color: '#4a5068',
            lineHeight: '1.6'
          }}>
            🔒 Data sourced from data.police.uk — Official UK Police open data. No personal data is stored or processed.
          </p>
        </div>
      )}
    </div>
  )
}
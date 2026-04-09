import { useState } from 'react'

export default function SignalColumn({ signals }) {
  const [hoveredSignalId, setHoveredSignalId] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoverTimeout, setHoverTimeout] = useState(null)

  const handleMouseEnter = (id, e) => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setMousePos({ x: e.clientX, y: e.clientY })
    const timer = setTimeout(() => {
      setHoveredSignalId(id)
    }, 500) // 500ms delay
    setHoverTimeout(timer)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setHoveredSignalId(null)
  }

  const categories = [...new Set(signals.map(s => s.category || 'Uncategorized'))]

  return (
    <div className="column1">
      <div className="title-medium" style={{ textAlign: 'center' }}>Observed signals</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {categories.map(category => (
          <div key={category} style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sys-color-outline)', padding: '16px 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {category}
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {signals.filter(s => (s.category || 'Uncategorized') === category).map(s => (
                <div 
                  key={s.id} 
                  className="signal-row"
                  style={{ borderTop: '1px solid var(--sys-color-outline-variant)', padding: '16px' }}
                  onMouseEnter={(e) => handleMouseEnter(s.id, e)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                >
                  {hoveredSignalId === s.id && (s.whyItMatters || s.confidence) && (
                    <div 
                      className="signal-tooltip"
                      style={{ 
                        left: `${mousePos.x + 12}px`, 
                        top: `${mousePos.y + 12}px`,
                        position: 'fixed'
                      }}
                    >
                      {s.confidence && (
                        <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                          Confidence: {s.confidence}
                        </div>
                      )}
                      {s.whyItMatters && <div>{s.whyItMatters}</div>}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '12px', color: 'var(--sys-color-on-surface-variant)' }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--sys-color-on-surface)' }}>
                      {s.value}
                    </div>
                    {s.sources && s.sources.length > 0 && (
                      <div style={{ fontSize: '12px', color: 'var(--sys-color-on-surface-variant)', opacity: 0.7 }}>
                        Source: {s.sources.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button className="btn btn-outline" style={{ alignSelf: 'flex-start' }}>
          Add new signal
        </button>
      </div>
    </div>
  )
}


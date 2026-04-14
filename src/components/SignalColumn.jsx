import { useState } from 'react'

export default function SignalColumn({ 
  signals, 
  onDeleteSignal, 
  onAddSignalText, 
  onRegenerateRecommendations, 
  isSignalsModified,
  isParsingSignal,
  isRegenerating 
}) {
  const [hoveredSignalId, setHoveredSignalId] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [hoverTimeout, setHoverTimeout] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [newSignalText, setNewSignalText] = useState('')

  const handleMouseEnter = (id, e) => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setMousePos({ x: e.clientX, y: e.clientY })
    const timer = setTimeout(() => {
      setHoveredSignalId(id)
    }, 500)
    setHoverTimeout(timer)
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    setHoveredSignalId(null)
  }

  const handleAddSubmit = () => {
    if (newSignalText.trim()) {
      onAddSignalText(newSignalText)
      setNewSignalText('')
      setIsAdding(false)
    }
  }

  const categories = [...new Set(signals.map(s => s.category || 'Uncategorized'))]

  return (
    <div className="column1">
      <div className="title-medium" style={{ textAlign: 'center' }}>Signals and context engine</div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
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
                  style={{ borderTop: '1px solid var(--sys-color-outline-variant)', padding: '16px', position: 'relative' }}
                  onMouseEnter={(e) => handleMouseEnter(s.id, e)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                >
                  {hoveredSignalId === s.id && (
                    <button
                      onClick={(e) => { e.stopPropagation(); onDeleteSignal(s.id); }}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--sys-color-outline)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        borderRadius: '50%'
                      }}
                      title="Remove signal"
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                    </button>
                  )}

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
                        Potential sources: {s.sources.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {isAdding ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px 0' }}>
            <textarea
              rows="2"
              placeholder="Describe one or more ambient context signals..."
              value={newSignalText}
              onChange={(e) => setNewSignalText(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid var(--sys-color-outline-variant)',
                backgroundColor: 'var(--sys-color-surface-container-lowest)',
                color: 'var(--sys-color-on-surface)',
                fontFamily: 'inherit',
                resize: 'none'
              }}
            />
            <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
              <button 
                className="btn btn-text btn-small"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary btn-small"
                onClick={handleAddSubmit}
                disabled={!newSignalText.trim()}
              >
                Parse
              </button>
            </div>
          </div>
        ) : (
          <button 
            className="btn btn-outline btn-medium"
            style={{ 
              alignSelf: 'flex-start',
              marginTop: '16px',
              borderRadius: '20px',
              opacity: isParsingSignal ? 0.6 : 1,
              cursor: isParsingSignal ? 'wait' : 'pointer'
            }}
            onClick={() => setIsAdding(true)}
            disabled={isParsingSignal}
          >
            <span className="material-symbols-outlined" style={{ marginRight: '8px', fontSize: '18px' }}>add</span>
            {isParsingSignal ? 'Parsing...' : 'Add new signal'}
          </button>
        )}

        {isSignalsModified && (
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--sys-color-outline-variant)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '12px', color: 'var(--sys-color-outline)', fontStyle: 'italic' }}>
              Context has changed. Ready to re-evaluate potential outcomes?
            </div>
            <button 
              className="btn btn-primary btn-medium"
              style={{ width: '100%', borderRadius: '24px' }}
              onClick={onRegenerateRecommendations}
              disabled={isRegenerating}
            >
              {isRegenerating ? (
                <>
                  <div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: '2px solid var(--sys-color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px', display: 'inline-block' }} />
                  Updating reasoning...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ marginRight: '8px', fontSize: '18px' }}>refresh</span>
                  Regenerate reasoning
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}


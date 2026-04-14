import { useState, useEffect, useRef } from 'react'
import { SUGGESTED_PROMPTS } from '../config/suggestedPrompts'

export default function ZeroState({ onPromptSubmit, onClose, mode, isLoading, initialPrompt = '' }) {

  const [promptText, setPromptText] = useState(initialPrompt)
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * SUGGESTED_PROMPTS.length))
  const [isFading, setIsFading] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  // Cycle through suggestions every 6 seconds with a smooth fade
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          let next = Math.floor(Math.random() * SUGGESTED_PROMPTS.length)
          while (next === prevIndex && SUGGESTED_PROMPTS.length > 1) {
            next = Math.floor(Math.random() * SUGGESTED_PROMPTS.length)
          }
          return next
        })
        setIsFading(false)
      }, 500) // Wait half a second for the fade-out before switching text
    }, 6000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const handleSubmit = () => {
    if (promptText.trim()) {
      onPromptSubmit(promptText)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleSubmit()
    }
    if (e.key === 'Tab' && !promptText) {
      e.preventDefault()
      setPromptText(SUGGESTED_PROMPTS[currentIndex])
    }
    if (!promptText) {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        setCurrentIndex((prev) => (prev + 1) % SUGGESTED_PROMPTS.length)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setCurrentIndex((prev) => (prev - 1 + SUGGESTED_PROMPTS.length) % SUGGESTED_PROMPTS.length)
      }
    }
  }

  return (
    <div className={`zero-state-overlay ${mode === 'reset' ? 'reset-mode' : ''}`}>
      <div className="zero-state-content">
        {onClose && (
          <button className="zero-state-close-btn" onClick={onClose} title="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        )}
        <div className="zero-state-input-card" style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef}
            className="zero-state-textarea"
            placeholder="Describe a scenario to simulate"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          
          {/* Rotating Suggestion Overlay underneath the regular placeholder */}
          {!promptText && (
            <div 
              style={{
                position: 'absolute',
                top: '52px',
                left: '24px',
                right: '24px',
                pointerEvents: 'none',
                fontSize: '16px',
                color: 'var(--sys-color-on-surface-variant)',
                opacity: isFading ? 0 : 0.6,
                fontStyle: 'italic',
                fontWeight: 300,
                lineHeight: 1.5,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              {SUGGESTED_PROMPTS[currentIndex]}
              <span 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid var(--sys-color-outline-variant)',
                  borderRadius: '4px',
                  padding: '0 6px',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  marginLeft: '8px',
                  backgroundColor: 'var(--sys-color-surface)',
                  color: 'var(--sys-color-on-surface-variant)',
                  opacity: 0.9,
                  verticalAlign: 'middle'
                }}
              >
                Tab ⇥
              </span>
            </div>
          )}

          <div className="zero-state-actions" style={{ height: '40px', alignItems: 'center' }}>
            <div style={{ minWidth: '64px', display: 'flex', alignItems: 'center' }}>
              {promptText && (
                <button 
                  onClick={() => setPromptText('')}
                  className="btn"
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--sys-color-primary)',
                    padding: '0 12px',
                    fontWeight: 600,
                    height: '36px'
                  }}
                >
                  Clear
                </button>
              )}
            </div>
             {isLoading ? (
              <button 
                className="btn btn-primary" 
                disabled 
                style={{ height: '36px' }}
              >
                <style>{`
                  @keyframes spin {
                    to { transform: rotate(360deg); }
                  }
                `}</style>
                <div 
                  style={{
                    width: '14px',
                    height: '14px',
                    border: '2px solid rgba(31, 31, 31, 0.12)',
                    borderTopColor: 'rgba(31, 31, 31, 0.38)',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
                <span>Generating...</span>
              </button>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={handleSubmit} 
                disabled={!promptText.trim()}
                title="Simulate scenario (Cmd+Enter)" 
                style={{ 
                  height: '36px',
                  opacity: promptText.trim() ? 1 : 0.4,
                  cursor: promptText.trim() ? 'pointer' : 'not-allowed',
                  transition: 'opacity 0.2s'
                }}
              >
                <span className="material-symbols-outlined">send</span>
                <span>Generate</span>
              </button>
            )}
          </div>

        </div>
        <div className="zero-state-footer">
          This is intended as an experimental playground for a future in which Gemini anticipates, acts, and orchestrates across all Google surfaces
        </div>
        <div className="zero-state-link">
          Learn more
        </div>
      </div>
    </div>
  )
}


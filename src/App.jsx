import { useState, useEffect, useRef } from 'react'
import TopBar from './components/TopBar'
import SignalColumn from './components/SignalColumn'
import ActionColumn from './components/ActionColumn'
import PreviewPane from './components/PreviewPane'
import LogicMapping from './components/LogicMapping'
import ZeroState from './components/ZeroState'
import ApiKeyModal from './components/ApiKeyModal'
import { initialSignals, initialActions, initialSelectedAction, generateDataFromPrompt } from './services/simulationService'

function App() {
  const [showApiKeyModal, setShowApiKeyModal] = useState(() => {
    return !localStorage.getItem('gemini_api_key');
  });
  const [isZeroState, setIsZeroState] = useState(true)
  const [zeroStateMode, setZeroStateMode] = useState('initial')
  const [isLoading, setIsLoading] = useState(false)
  const [scenario, setScenario] = useState('')
  const [signals, setSignals] = useState([])
  const [actions, setActions] = useState([])
  const [selectedAction, setSelectedAction] = useState(null)

  const [activeSurface, setActiveSurface] = useState('gmail')
  const [orchestrationCache, setOrchestrationCache] = useState({})
  const [errorSnackbar, setErrorSnackbar] = useState(null)
  const [showLogic, setShowLogic] = useState(false)
  const [fadeStage, setFadeStage] = useState(3)
  const [leftWidth, setLeftWidth] = useState(40) // 40% by default so col1 and col2 are 20% each, col3 is 60%
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [storedLeftWidth, setStoredLeftWidth] = useState(40)

  const handleFullScreenToggle = () => {
    if (isFullScreen) {
      setLeftWidth(storedLeftWidth)
      setIsFullScreen(false)
    } else {
      setStoredLeftWidth(leftWidth)
      setLeftWidth(0)
      setIsFullScreen(true)
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e) => {
    const totalWidth = window.innerWidth
    const newWidthPercent = (e.clientX / totalWidth) * 100
    if (newWidthPercent > 25 && newWidthPercent < 75) {
      setLeftWidth(newWidthPercent)
    }
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }


  const handleActionSelect = (action) => {
    setSelectedAction(action)
    setActiveSurface(action.surfaces[0] || 'gmail')
  }

  // Loop 2 Pre-Caching Engine
  const useExperimental = localStorage.getItem('use_experimental_logic') === 'true';
  
  if (useExperimental) {
    import('./services/geminiServiceExperimental').then(({ fetchOrchestrationFromExperimental }) => {
      actions.forEach(action => {
        if (!orchestrationCache[action.id]) {
          setOrchestrationCache(prev => ({ ...prev, [action.id]: 'loading' }))
          fetchOrchestrationFromExperimental(action).then(data => {
            if (data) {
              setOrchestrationCache(prev => ({ ...prev, [action.id]: data }))
            }
          })
        }
      })
    })
  } else {
    import('./services/geminiService').then(({ fetchOrchestrationFromGemini }) => {
      actions.forEach(action => {
        if (!orchestrationCache[action.id]) {
          setOrchestrationCache(prev => ({ ...prev, [action.id]: 'loading' }))
          fetchOrchestrationFromGemini(action).then(data => {
            if (data) {
              setOrchestrationCache(prev => ({ ...prev, [action.id]: data }))
            }
          })
        }
      })
    })
  }



  const handlePromptSubmit = async (promptText) => {
    setIsLoading(true)
    setFadeStage(0) // Instantly hide columns during the loading screen so they never flash full opacity
    setScenario(promptText)
    try {
      const { signals: newSignals, actions: newActions } = await generateDataFromPrompt(promptText)
      setOrchestrationCache({}) // Invalidate stale cache
      setSignals(newSignals)

      setActions(newActions)
      setSelectedAction(newActions[0] || null)
      setActiveSurface(newActions[0]?.surfaces[0] || 'gmail')
      setIsZeroState(false)
      setTimeout(() => setFadeStage(1), 600)
      setTimeout(() => setFadeStage(2), 900)
      setTimeout(() => setFadeStage(3), 1200)
    } catch (error) {
      console.error('Failed to generate data:', error)
      setSignals([])
      setActions([])
      setSelectedAction(null)
      setIsZeroState(false)
      setErrorSnackbar("Context generation failed. Please refine your scenario and try again.")
    } finally {

      setIsLoading(false)
    }
  }

  const handleSaveApiKey = (key, model) => {
    localStorage.setItem('gemini_api_key', key);
    if (model) {
      localStorage.setItem('gemini_model', model);
    }
    setShowApiKeyModal(false);
  };


  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setShowApiKeyModal(true);
  };

  return (
    <div className="app-container">
      {showApiKeyModal && (
        <ApiKeyModal 
          onSave={handleSaveApiKey} 
          onClose={() => setShowApiKeyModal(false)} 
        />
      )}
      <TopBar onClearApiKey={handleClearApiKey} />

      {isZeroState && (
        <ZeroState 
          onPromptSubmit={handlePromptSubmit} 
          onClose={zeroStateMode === 'reset' ? () => setIsZeroState(false) : null}
          mode={zeroStateMode}
          isLoading={isLoading}
          initialPrompt={scenario}
        />
      )}


      <div className="main-content">
        <div className="left-pane" style={{ flexDirection: 'column', flex: `0 0 ${leftWidth}%`, borderRight: 'none', overflow: 'hidden', opacity: isFullScreen ? 0 : 1, transition: 'flex 0.4s cubic-bezier(0.2, 0, 0, 1), opacity 0.2s ease-out' }}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', opacity: fadeStage >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-in', overflow: 'hidden' }}>
              <SignalColumn signals={signals} />
            </div>
            <div className="divider-vertical"></div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', opacity: fadeStage >= 2 ? 1 : 0, transition: 'opacity 0.6s ease-in', overflow: 'hidden' }}>
              <ActionColumn 
                actions={actions} 
                selectedAction={selectedAction} 
                onActionSelect={handleActionSelect} 
              />
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--sys-color-outline-variant)', padding: '8px', display: 'flex', justifyContent: 'center' }}>
            <button 
              className="btn btn-tonal" 
              onClick={() => { setIsZeroState(true); setZeroStateMode('reset'); }}
            >
              <span className="material-symbols-outlined">edit</span>
              Edit prompt
            </button>
          </div>
        </div>

        {!isFullScreen && (
          <div 
            onMouseDown={handleMouseDown}
            style={{
              width: '4px',
              cursor: 'col-resize',
              backgroundColor: 'var(--sys-color-outline-variant)',
              transition: 'background-color 0.2s',
              zIndex: 100
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--sys-color-primary)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--sys-color-outline-variant)'}
          />
        )}

        <div className="column3" style={{ flex: 1, opacity: fadeStage >= 3 ? 1 : 0, transition: 'opacity 0.6s ease-in', overflow: 'hidden' }}>
          {showLogic ? (
            <LogicMapping 
              selectedAction={selectedAction}
              orchestrationCache={orchestrationCache}
              onToggle={() => setShowLogic(false)}
              isFullScreen={isFullScreen}
              onFullScreenToggle={handleFullScreenToggle}
            />
          ) : (
            <PreviewPane 
              selectedAction={selectedAction} 
              activeSurface={activeSurface} 
              onSurfaceChange={setActiveSurface}
              orchestrationCache={orchestrationCache}
              onInfoClick={() => setShowLogic(true)}
              isFullScreen={isFullScreen}
              onFullScreenToggle={handleFullScreenToggle}
            />
          )}
        </div>

        {errorSnackbar && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            backgroundColor: 'var(--sys-color-on-surface)',
            color: 'var(--sys-color-surface)',
            padding: '12px 16px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 2000,
            fontSize: '14px'
          }}>
            <span style={{ flex: 1 }}>{errorSnackbar}</span>
            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--sys-color-inverse-primary)', 
                fontWeight: 600, 
                cursor: 'pointer',
                padding: 0
              }}
              onClick={() => {
                setErrorSnackbar(null);
                setIsZeroState(true);
                setZeroStateMode('reset');
              }}
            >
              Try again
            </button>
            <span 
              className="material-symbols-outlined" 
              style={{ cursor: 'pointer', fontSize: '18px' }}
              onClick={() => setErrorSnackbar(null)}
            >
              close
            </span>
          </div>
        )}

      </div>

    </div>
  )
}


export default App

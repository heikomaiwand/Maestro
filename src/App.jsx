import { useState } from 'react'
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


  const handleActionSelect = (action) => {
    setSelectedAction(action)
    setActiveSurface(action.surfaces[0] || 'gmail')
  }

  // Loop 2 Pre-Caching Engine
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


  const handlePromptSubmit = async (promptText) => {
    setIsLoading(true)
    setScenario(promptText)
    try {
      const { signals: newSignals, actions: newActions } = await generateDataFromPrompt(promptText)
      setOrchestrationCache({}) // Invalidate stale cache
      setSignals(newSignals)

      setActions(newActions)
      setSelectedAction(newActions[0] || null)
      setActiveSurface(newActions[0]?.surfaces[0] || 'gmail')
      setIsZeroState(false)
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
        <div className="left-pane" style={{ flexDirection: 'column' }}>
          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            <SignalColumn signals={signals} />
            <div className="divider-vertical"></div>
            <ActionColumn 
              actions={actions} 
              selectedAction={selectedAction} 
              onActionSelect={handleActionSelect} 
            />
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

        {showLogic ? (
          <LogicMapping 
            selectedAction={selectedAction}
            orchestrationCache={orchestrationCache}
            onToggle={() => setShowLogic(false)}
          />
        ) : (
          <PreviewPane 
            selectedAction={selectedAction} 
            activeSurface={activeSurface} 
            onSurfaceChange={setActiveSurface}
            orchestrationCache={orchestrationCache}
            onInfoClick={() => setShowLogic(true)}
          />
        )}

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

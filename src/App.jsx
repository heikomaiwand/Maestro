import { useState } from 'react'
import TopBar from './components/TopBar'
import SignalColumn from './components/SignalColumn'
import ActionColumn from './components/ActionColumn'
import PreviewPane from './components/PreviewPane'
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
  const [signals, setSignals] = useState(initialSignals)
  const [actions, setActions] = useState(initialActions)
  const [selectedAction, setSelectedAction] = useState(initialSelectedAction)
  const [activeSurface, setActiveSurface] = useState('gmail')

  const handleActionSelect = (action) => {
    setSelectedAction(action)
    setActiveSurface(action.surfaces[0] || 'gmail')
  }

  const handlePromptSubmit = async (promptText) => {
    setIsLoading(true)
    setScenario(promptText)
    try {
      const { signals: newSignals, actions: newActions } = await generateDataFromPrompt(promptText)
      setSignals(newSignals)
      setActions(newActions)
      setSelectedAction(newActions[0] || null)
      setActiveSurface(newActions[0]?.surfaces[0] || 'gmail')
      setIsZeroState(false)
    } catch (error) {
      console.error('Failed to generate data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveApiKey = (key) => {
    localStorage.setItem('gemini_api_key', key);
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

        <PreviewPane 
          selectedAction={selectedAction} 
          activeSurface={activeSurface} 
          onSurfaceChange={setActiveSurface} 
        />
      </div>
    </div>
  )
}


export default App

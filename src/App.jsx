import { useState, useEffect, useRef } from 'react'
import TopBar from './components/TopBar'
import SignalColumn from './components/SignalColumn'
import ActionColumn from './components/ActionColumn'
import PreviewPane from './components/PreviewPane'
import LogicMapping from './components/LogicMapping'
import ZeroState from './components/ZeroState'
import ApiKeyModal from './components/ApiKeyModal'
import DebugModal from './components/DebugModal'
import GuidedTour from './components/GuidedTour'
import { initialSignals, initialActions, initialSelectedAction, generateDataFromPrompt } from './services/simulationService'

const TOUR_STEPS = [
  {
    targetId: 'tour-col1',
    title: 'How might we know this?',
    description: 'A list of all of the possible sources that Google could ingest to understand the user\'s world context to understand this scenario.',
    arrowPosition: 'left'
  },
  {
    targetId: 'tour-col2',
    title: 'The most useful action/suggestion',
    description: 'Given this scenario, what are the most helpful things that Google and Gemini could do or suggest on behalf of the user.',
    arrowPosition: 'left'
  },
  {
    targetId: 'tour-col3',
    title: 'Communicating with the user',
    description: 'The orchestration to determine when, where, and how to communicate with the user across all potential touchpoints. Some are immediate, others are contextual.',
    arrowPosition: 'right'
  },
  {
    targetId: 'tour-edit-prompt',
    title: 'Try others',
    description: 'Describe other scenarios to see how a omni-present and omni-channel agent might be helpful.',
    arrowPosition: 'bottom'
  }
];

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
  const [isTourActive, setIsTourActive] = useState(false)
  const [hasCompletedTour, setHasCompletedTour] = useState(() => localStorage.getItem('hasCompletedTour') === 'true')

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


  const [showDebugModal, setShowDebugModal] = useState(false)

  const handleActionSelect = (action) => {
    setSelectedAction(action)
    const orch = orchestrationCache[action.id];
    const topInterface = orch && orch !== 'loading' && orch !== 'error' && orch.where && Array.isArray(orch.where.rankedSurfaces) && orch.where.rankedSurfaces.length > 0
      ? orch.where.rankedSurfaces[0]
      : (action.surfaces[0] || 'gmail');
    setActiveSurface(topInterface);
  }

  useEffect(() => {
    if (!selectedAction) return;
    const orch = orchestrationCache[selectedAction.id];
    if (orch && orch !== 'loading' && orch !== 'error') {
      const topInterface = orch.where && Array.isArray(orch.where.rankedSurfaces) && orch.where.rankedSurfaces.length > 0
        ? orch.where.rankedSurfaces[0]
        : (selectedAction.surfaces[0] || 'gmail');
      
      setActiveSurface(prev => (prev !== topInterface ? topInterface : prev));
    }
  }, [selectedAction, orchestrationCache]);

  // Loop 2 Pre-Caching Engine
  import('./services/geminiService').then(({ fetchOrchestrationFromGemini }) => {
    actions.forEach(action => {
      if (!orchestrationCache[action.id]) {
        setOrchestrationCache(prev => ({ ...prev, [action.id]: 'loading' }))
        fetchOrchestrationFromGemini(action, scenario).then(data => {
          if (data) {
            setOrchestrationCache(prev => ({ ...prev, [action.id]: data }))
          }
        }).catch(err => {
          console.error("Orchestration failed:", err);
          setOrchestrationCache(prev => ({ ...prev, [action.id]: 'error' }))
        })
      }
    })
  })

  const retryOrchestration = (actionToRetry) => {
    setOrchestrationCache(prev => ({ ...prev, [actionToRetry.id]: 'loading' }));
    import('./services/geminiService').then(({ fetchOrchestrationFromGemini }) => {
      fetchOrchestrationFromGemini(actionToRetry, scenario).then(data => {
        if (data) setOrchestrationCache(prev => ({ ...prev, [actionToRetry.id]: data }));
      }).catch(err => {
        console.error("Orchestration retry failed:", err);
        setOrchestrationCache(prev => ({ ...prev, [actionToRetry.id]: 'error' }));
      });
    });
  };  const [isSignalsModified, setIsSignalsModified] = useState(false)
  const [isParsingSignal, setIsParsingSignal] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleDeleteSignal = (id) => {
    setSignals(prev => prev.filter(s => s.id !== id))
    setIsSignalsModified(true)
  }

  const handleAddSignalText = async (text) => {
    setIsParsingSignal(true)
    try {
      const { parseAddedSignalsFromText } = await import('./services/geminiService')
      const newParsedSignals = await parseAddedSignalsFromText(text, signals)
      
      const maxId = signals.reduce((acc, curr) => Math.max(acc, curr.id || 0), 0)
      const mappedNewSignals = newParsedSignals.map((s, idx) => ({
        ...s,
        id: maxId + idx + 1
      }))

      setSignals(prev => [...prev, ...mappedNewSignals])
      setIsSignalsModified(true)
    } catch (err) {
      console.error("Signal Parsing failed:", err)
    } finally {
      setIsParsingSignal(false)
    }
  }

  const handleRegenerateRecommendations = async () => {
    setIsRegenerating(true)
    try {
      const { regenerateActionsFromSignals } = await import('./services/geminiService')
      const responseData = await regenerateActionsFromSignals(signals)
      if (responseData && responseData.actions) {
        setOrchestrationCache({}) 
        setActions(responseData.actions)
        setSelectedAction(responseData.actions[0] || null)
        setActiveSurface(responseData.actions[0]?.surfaces[0] || 'gmail')
        setIsSignalsModified(false)
      }
    } catch (err) {
      console.error("Regeneration failed:", err)
    } finally {
      setIsRegenerating(false)
    }
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
      
      const shouldShowTour = localStorage.getItem('showGuidedTour')
      if (shouldShowTour === 'true' || shouldShowTour === null) {
        setTimeout(() => setIsTourActive(true), 1500)
      }
    } catch (error) {
      console.error('Failed to generate data:', error)
      setSignals([])
      setActions([])
      setSelectedAction(null)
      setIsZeroState(false)
      setErrorSnackbar("API call failed. Servers might be busy or you may be offline.")
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
      {showDebugModal && (
        <DebugModal 
          onClose={() => setShowDebugModal(false)} 
          selectedAction={selectedAction} 
        />
      )}
      <TopBar 
        onClearApiKey={handleClearApiKey} 
        onDebugClick={() => setShowDebugModal(true)} 
        onShowTour={() => {
          localStorage.setItem('showGuidedTour', 'true');
          setIsTourActive(true);
        }}
      />

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
            <div id="tour-col1" style={{ flex: 1, display: 'flex', flexDirection: 'column', opacity: fadeStage >= 1 ? 1 : 0, transition: 'opacity 0.6s ease-in', overflow: 'hidden' }}>
              <SignalColumn 
                signals={signals} 
                onDeleteSignal={handleDeleteSignal}
                onAddSignalText={handleAddSignalText}
                onRegenerateRecommendations={handleRegenerateRecommendations}
                isSignalsModified={isSignalsModified}
                isParsingSignal={isParsingSignal}
                isRegenerating={isRegenerating}
              />
            </div>
            <div className="divider-vertical"></div>
            <div id="tour-col2" style={{ flex: 1, display: 'flex', flexDirection: 'column', opacity: fadeStage >= 2 ? 1 : 0, transition: 'opacity 0.6s ease-in', overflow: 'hidden' }}>
              <ActionColumn 
                actions={actions} 
                selectedAction={selectedAction} 
                onActionSelect={handleActionSelect} 
              />
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--sys-color-outline-variant)', padding: '8px', display: 'flex', justifyContent: 'center' }}>
            <button 
              id="tour-edit-prompt"
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

        <div id="tour-col3" className="column3" style={{ flex: 1, opacity: fadeStage >= 3 ? 1 : 0, transition: 'opacity 0.6s ease-in', overflow: 'hidden' }}>
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
              onRetry={() => retryOrchestration(selectedAction)}
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
        {isTourActive && (
          <GuidedTour 
            steps={TOUR_STEPS} 
            onComplete={() => {
              setIsTourActive(false);
              localStorage.setItem('showGuidedTour', 'false');
            }} 
            onClose={() => {
              setIsTourActive(false);
            }}
          />
        )}
      </div>

    </div>
  )
}


export default App

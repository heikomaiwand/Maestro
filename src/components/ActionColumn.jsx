import { useState } from 'react'

export default function ActionColumn({ actions, selectedAction, onActionSelect, onResetPrompt }) {
  const [hoveredChip, setHoveredChip] = useState(null); // { actionId, type }
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (actionId, type, e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    setHoveredChip({ actionId, type });
  };

  const handleMouseLeave = () => {
    setHoveredChip(null);
  };

  return (
    <div className="column2">
      <div className="title-medium" style={{ textAlign: 'center' }}>Intelligent actions</div>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {actions.map(a => (
          <div 
            key={a.id} 
            className={`action-card ${selectedAction?.id === a.id ? 'selected' : ''}`}
            onClick={() => onActionSelect(a)}
          >
            <div style={{ fontSize: '14px', fontWeight: 500 }}>{a.title}</div>
            <div style={{ fontSize: '10px', color: 'var(--sys-color-on-surface-variant)' }}>{a.why}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'var(--sys-color-surface-container)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 300, color: 'var(--sys-color-on-surface-variant)' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--sys-color-on-surface-variant)' }}>
                  {a.type === 'Proactive Action' ? 'bolt' : 'tips_and_updates'}
                </span>
                {a.type === 'Proactive Action' ? 'Action' : 'Suggestion'}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <div 
                  style={{ backgroundColor: 'var(--sys-color-surface-container)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--sys-color-on-surface-variant)' }}
                  onMouseEnter={(e) => handleMouseEnter(a.id, 'urgency', e)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--sys-color-on-surface-variant)' }}>timer</span> {a.urgency}
                </div>
                <div 
                  style={{ backgroundColor: 'var(--sys-color-surface-container)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 300, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', color: 'var(--sys-color-on-surface-variant)' }}
                  onMouseEnter={(e) => handleMouseEnter(a.id, 'value', e)}
                  onMouseLeave={handleMouseLeave}
                  onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--sys-color-on-surface-variant)' }}>diamond_shine</span> {a.value}
                </div>
              </div>
            </div>

          </div>

        ))}
      </div>


      {hoveredChip && (
        <div 
          className="signal-tooltip"
          style={{ 
            left: `${mousePos.x + 12}px`, 
            top: `${mousePos.y + 12}px`,
            position: 'fixed',
            zIndex: 1000
          }}
        >
          {(() => {
            const action = actions.find(ac => ac.id === hoveredChip.actionId);
            if (!action) return null;
            if (hoveredChip.type === 'urgency') {
              return (
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>Urgency: {action.urgency}</div>
                  <div>{action.urgencyReasoning}</div>
                </div>
              );
            } else {
              return (
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '4px' }}>Value: {action.value}</div>
                  <div>{action.valueReasoning}</div>
                </div>
              );
            }
          })()}
        </div>
      )}
    </div>
  )
}

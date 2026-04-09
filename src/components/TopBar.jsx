import { useState } from 'react';

export default function TopBar() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <header className="top-bar">
      <div 
        style={{ fontSize: '20px', color: '#000', cursor: 'pointer', position: 'relative' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        MAESTRO prototype
        
        {isHovered && (
          <div 
            className="signal-tooltip"
            style={{ 
              left: `${mousePos.x + 12}px`, 
              top: `${mousePos.y + 12}px`,
              position: 'fixed',
              zIndex: 1000,
              width: '320px', // Wider for the long acronym
              fontWeight: 'normal'
            }}
          >
            Multi-device Adaptive Engine for Smart Task Recommendation & Orchestration
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>bug_report</span>
        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>settings</span>
      </div>
    </header>
  )
}

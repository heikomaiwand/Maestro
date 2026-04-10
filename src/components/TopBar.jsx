import { useState, useRef, useEffect } from 'react';

export default function TopBar({ onClearApiKey }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const menuRef = useRef(null);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleConfirmClear = () => {
    if (onClearApiKey) onClearApiKey();
    setShowConfirmModal(false);
    setShowMenu(false);
  };

  return (
    <header className="top-bar">
      <div 
        style={{ fontSize: '20px', color: 'var(--sys-color-on-surface)', cursor: 'pointer', position: 'relative' }}
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
              width: '320px',
              fontWeight: 'normal'
            }}
          >
            Multi-device Adaptive Engine for Smart Task Recommendation & Orchestration
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center', position: 'relative' }}>
        {/* Muted Bug Icon */}
        <span 
          className="material-symbols-outlined" 
          title="Debug mode (coming soon)"
          style={{ color: 'var(--sys-color-outline-variant)', cursor: 'default' }}
        >
          bug_report
        </span>

        {/* Active Settings Menu */}
        <div ref={menuRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <span 
            className="material-symbols-outlined" 
            style={{ cursor: 'pointer', color: showMenu ? 'var(--sys-color-primary)' : 'var(--sys-color-on-surface)' }}
            onClick={() => setShowMenu(!showMenu)}
            title="Settings"
          >
            settings
          </span>

          {showMenu && (
            <div 
              style={{
                position: 'absolute',
                top: '40px',
                right: '0',
                backgroundColor: 'var(--sys-color-surface)',
                border: '1px solid var(--sys-color-outline-variant)',
                borderRadius: '12px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                width: '220px',
                zIndex: 2000,
                padding: '8px 0',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <button 
                className="btn btn-text"
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                  setShowMenu(false);
                }}
                style={{ 
                  justifyContent: 'space-between', 
                  width: '100%', 
                  padding: '12px 20px', 
                  borderRadius: 0,
                  color: 'var(--sys-color-on-surface)',
                  fontWeight: 400
                }}
              >
                <span>Change theme</span>
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>tonality</span>
              </button>
              <hr style={{ border: 'none', borderTop: '1px solid var(--sys-color-outline-variant)', margin: '4px 0' }} />
              <button 
                className="btn btn-text"
                onClick={() => setShowConfirmModal(true)}
                style={{ 
                  justifyContent: 'flex-start', 
                  width: '100%', 
                  padding: '12px 20px', 
                  borderRadius: 0,
                  color: 'var(--sys-color-on-surface)',
                  fontWeight: 400
                }}
              >
                <span>Clear API key</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Clean Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          backdropFilter: 'blur(4px)'
        }}>
          <div style={{
            backgroundColor: 'var(--sys-color-surface)',
            padding: '24px',
            borderRadius: '16px',
            width: '360px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            border: '1px solid var(--sys-color-outline-variant)'
          }}>
            <h3 style={{ marginTop: 0, marginBottom: '12px', color: 'var(--sys-color-on-surface)', fontSize: '18px', fontWeight: 500 }}>
              Clear API Key?
            </h3>
            <p style={{ color: 'var(--sys-color-on-surface-variant)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
              Are you sure you want to remove your Gemini API key from this browser? You will need to re-enter a valid key to run live simulations.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                className="btn btn-text" 
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary" 
                onClick={handleConfirmClear}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

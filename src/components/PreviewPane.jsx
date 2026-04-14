import { useState, useRef, useEffect } from 'react';
import { SURFACES } from '../config/interfaces';
import { getSurfacePreviewComponent } from './SurfacePreviews';

export default function PreviewPane({ selectedAction, activeSurface, onSurfaceChange, orchestrationCache = {}, onInfoClick, isFullScreen, onFullScreenToggle, onRetry }) {


  const scrollRef = useRef(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Update arrow visibility on scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    
    // Using a threshold of 5px to prevent flickering
    setShowLeftArrow(scrollLeft > 5);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
  };

  useEffect(() => {
    // Initial check
    handleScroll();
    
    // Check when surfaces change or window resizes
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  // Update arrows if active selection changes view
  useEffect(() => {
    handleScroll();
  }, [selectedAction]);

  // Drag to scroll handlers
  const onMouseDown = (e) => {
    setIsMouseDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsMouseDown(false);
  };

  const onMouseUp = () => {
    setIsMouseDown(false);
  };

  const onMouseMove = (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
    handleScroll();
  };

  const scrollByAmount = (amount) => {
    if (!scrollRef.current) return;
    scrollRef.current.scroll({
      left: scrollRef.current.scrollLeft + amount,
      behavior: 'smooth'
    });
    // Scroll listener will pick up the change, but let's force check
    setTimeout(handleScroll, 300); // Wait for smooth scroll
  };

  const orch = selectedAction && orchestrationCache ? orchestrationCache[selectedAction.id] : null;
  const activeRanked = orch && orch.where && Array.isArray(orch.where.rankedSurfaces) 
    ? orch.where.rankedSurfaces 
    : (selectedAction ? selectedAction.surfaces : []);

  const sortedSurfaces = [...SURFACES].sort((a, b) => {
    const aIndex = activeRanked.indexOf(a.id);
    const bIndex = activeRanked.indexOf(b.id);
    
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    const activeIds = selectedAction ? selectedAction.surfaces : [];
    const origA = activeIds.indexOf(a.id);
    const origB = activeIds.indexOf(b.id);
    if (origA !== -1 && origB !== -1) return origA - origB;
    if (origA !== -1) return -1;
    if (origB !== -1) return 1;
    
    return 0;
  });

  return (

    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div className="title-medium" style={{ textAlign: 'center' }}>Interface preview</div>
      
      {selectedAction && (
        <>
          {orchestrationCache[selectedAction.id] === 'loading' ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', margin: 'auto 0' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid var(--sys-color-outline-variant)', borderTop: '4px solid var(--sys-color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              <div style={{ fontSize: '14px', color: 'var(--sys-color-on-surface-variant)', fontWeight: 500 }}>
                Reasoning about optimal multi-surface delivery...
              </div>
            </div>
          ) : orchestrationCache[selectedAction.id] === 'error' ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', margin: 'auto 0' }}>
              <div style={{ fontSize: '14px', color: 'var(--sys-color-error)', fontWeight: 500 }}>
                Orchestration failed to load.
              </div>
              <button 
                onClick={onRetry} 
                style={{ padding: '8px 16px', backgroundColor: 'var(--sys-color-primary)', color: 'var(--sys-color-on-primary)', borderRadius: '20px', fontWeight: 500, cursor: 'pointer', border: 'none' }}
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <div className="tab-scroll-wrapper" style={{ margin: '0 -24px' }}>
                <div className={`scroll-gradient left`} style={{ opacity: showLeftArrow ? 1 : 0 }} />
                {showLeftArrow && (
                  <button className="scroll-arrow-btn left" onClick={() => scrollByAmount(-200)}>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                )}

                <div 
                  className="tab-group" 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  onMouseDown={onMouseDown}
                  onMouseLeave={onMouseLeave}
                  onMouseUp={onMouseUp}
                  onMouseMove={onMouseMove}
                  style={{ 
                    cursor: isMouseDown ? 'grabbing' : 'grab',
                    userSelect: 'none'
                  }}
                >
                  {sortedSurfaces.map(surface => {
                    const orch = orchestrationCache[selectedAction.id];
                    const activeRanked = orch && orch.where && Array.isArray(orch.where.rankedSurfaces) ? orch.where.rankedSurfaces : selectedAction.surfaces;
                    const isUnavailable = !activeRanked.includes(surface.id);

                    return (
                      <button 
                        key={surface.id} 
                        className={`tab ${activeSurface === surface.id ? 'active' : ''}`}
                        onClick={() => onSurfaceChange(surface.id)}
                        style={{ 
                          opacity: isUnavailable ? 0.35 : 1,
                          flex: '0 0 auto',
                          cursor: 'pointer'
                        }}
                        title={isUnavailable ? "AI determined this surface is inappropriate for delivery" : (orch && orch.where && orch.where.reasoning ? orch.where.reasoning : surface.description)}
                      >
                        {surface.label}
                      </button>
                    );
                  })}
                </div>

                <div className={`scroll-gradient right`} style={{ opacity: showRightArrow ? 1 : 0 }} />
                {showRightArrow && (
                  <button className="scroll-arrow-btn right" onClick={() => scrollByAmount(200)}>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                )}
              </div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', padding: '40px', boxSizing: 'border-box' }}>
                {getSurfacePreviewComponent(activeSurface, selectedAction, orchestrationCache)}
              </div>

            </>
          )}


      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', marginTop: 'auto' }}>
        <span 
          className="material-symbols-outlined" 
          onClick={onFullScreenToggle}
          style={{ cursor: 'pointer', color: 'var(--sys-color-on-surface-variant)' }}
          title={isFullScreen ? "Restore Width" : "Full Width"}
        >
          {isFullScreen ? 'zoom_in_map' : 'zoom_out_map'}
        </span>
        <span 
          className="material-symbols-outlined" 
          style={{ cursor: 'pointer', color: 'var(--sys-color-on-surface-variant)' }} 
          onClick={onInfoClick}
          title="View Orchestration Logic"
        >
          info
        </span>
      </div>
      </>
      )}
    </div>
  )

}

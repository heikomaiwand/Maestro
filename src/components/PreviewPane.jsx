import { useState, useRef, useEffect } from 'react';
import { SURFACES } from '../config/surfaces';
import { getSurfacePreviewComponent } from './SurfacePreviews';

export default function PreviewPane({ selectedAction, activeSurface, onSurfaceChange }) {
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

  const activeIds = selectedAction ? selectedAction.surfaces : [];

  const sortedSurfaces = [...SURFACES].sort((a, b) => {
    const aIndex = activeIds.indexOf(a.id);
    const bIndex = activeIds.indexOf(b.id);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return 0;
  });

  return (

    <div className="column3">
      <div className="title-medium" style={{ textAlign: 'center' }}>Interface preview</div>
      
      <div className="tab-scroll-wrapper" style={{ margin: '0 -24px' }}>
        {/* Left Fade + Arrow */}
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
            const isUnavailable = selectedAction && !selectedAction.surfaces.includes(surface.id);
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
              >
                {surface.label}
              </button>
            );
          })}
        </div>

        {/* Right Fade + Arrow */}
        <div className={`scroll-gradient right`} style={{ opacity: showRightArrow ? 1 : 0 }} />
        {showRightArrow && (
          <button className="scroll-arrow-btn right" onClick={() => scrollByAmount(200)}>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        )}
      </div>


      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', minHeight: 0, overflow: 'hidden' }}>
        {getSurfacePreviewComponent(activeSurface, selectedAction && selectedAction.surfaces.includes(activeSurface) ? selectedAction : null)}
      </div>

      
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px', marginTop: 'auto' }}>
        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>zoom_out_map</span>
        <span className="material-symbols-outlined" style={{ cursor: 'pointer' }}>info</span>
      </div>
    </div>
  )
}

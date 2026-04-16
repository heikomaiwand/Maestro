import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function GuidedTour({ steps, onComplete, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState(null);
  const tooltipRef = useRef(null);
  const [tooltipStyle, setTooltipStyle] = useState({});

  const step = steps[currentStep];

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps.length, onComplete]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handleBack();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handleBack, onClose]);

  useEffect(() => {
    let timer;
    const updatePosition = () => {
      if (!step || !step.targetId) return;
      const element = document.getElementById(step.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);

        // Calculate tooltip position
        const padding = 16;
        let top = 0;
        let left = 0;

        // Default positioning based on arrow direction
        if (step.arrowPosition === 'left') {
          top = rect.top + rect.height / 2;
          left = rect.right + padding;
        } else if (step.arrowPosition === 'right') {
          top = rect.top + rect.height / 2;
          left = rect.left - padding;
        } else if (step.arrowPosition === 'top') {
          top = rect.bottom + padding;
          left = rect.left + rect.width / 2;
        } else if (step.arrowPosition === 'bottom') {
          top = rect.top - padding;
          left = rect.left + rect.width / 2;
        }

        setTooltipStyle({
          position: 'fixed',
          top: `${top}px`,
          left: `${left}px`,
          transform: step.arrowPosition === 'left' 
            ? 'translateY(-50%)' 
            : step.arrowPosition === 'right'
              ? 'translate(-100%, -50%)'
              : step.arrowPosition === 'bottom'
                ? 'translate(-50%, -100%)'
                : 'translateX(-50%)',
          zIndex: 10002,
          transition: 'all 0.3s ease'
        });
      } else {
        timer = setTimeout(updatePosition, 100);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep, step]);

  if (!step || !targetRect) return null;

  // Arrow styles
  const getArrowStyle = () => {
    const base = {
      position: 'absolute',
      width: '0',
      height: '0',
      borderStyle: 'solid',
    };

    if (step.arrowPosition === 'left') {
      return {
        ...base,
        left: '-8px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '8px 8px 8px 0',
        borderColor: 'transparent var(--sys-color-primary) transparent transparent',
      };
    } else if (step.arrowPosition === 'right') {
      return {
        ...base,
        right: '-8px',
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: '8px 0 8px 8px',
        borderColor: 'transparent transparent transparent var(--sys-color-primary)',
      };
    } else if (step.arrowPosition === 'top') {
      return {
        ...base,
        top: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '0 8px 8px 8px',
        borderColor: 'transparent transparent var(--sys-color-primary) transparent',
      };
    } else if (step.arrowPosition === 'bottom') {
      return {
        ...base,
        bottom: '-8px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: '8px 8px 0 8px',
        borderColor: 'var(--sys-color-primary) transparent transparent transparent',
      };
    }
    return {};
  };

  return (
    <>
      {/* Scrim with cutout */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10000, pointerEvents: 'none' }}>
        <defs>
          <mask id="tour-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <rect 
              x={targetRect.left - 8} 
              y={targetRect.top - 8} 
              width={targetRect.width + 16} 
              height={targetRect.height + 16} 
              fill="black" 
              rx="12" 
            />
          </mask>
        </defs>
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          fill="rgba(0,0,0,0.5)" 
          mask="url(#tour-mask)" 
          style={{ pointerEvents: 'none' }} 
        />
      </svg>

      {/* Tooltip */}
      <div ref={tooltipRef} style={tooltipStyle}>
        <div style={{
          backgroundColor: 'var(--sys-color-primary)',
          color: 'var(--sys-color-on-primary)',
          padding: '20px',
          borderRadius: '12px',
          width: '280px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          position: 'relative'
        }}>
          {/* Arrow */}
          <div style={getArrowStyle()} />

          {/* Close button */}
          <span 
            className="material-symbols-outlined" 
            style={{ 
              position: 'absolute', 
              top: '12px', 
              right: '12px', 
              cursor: 'pointer',
              fontSize: '20px',
              opacity: 0.8
            }}
            onClick={onClose}
          >
            close
          </span>

          <h3 style={{ marginTop: 0, marginBottom: '8px', fontSize: '16px', fontWeight: '600' }}>
            {step.title}
          </h3>
          <p style={{ fontSize: '13px', lineHeight: '1.5', opacity: 0.9, marginBottom: '20px' }}>
            {step.description}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Pagination dots */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {steps.map((_, index) => (
                <div 
                  key={index}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--sys-color-on-primary)',
                    opacity: index === currentStep ? 1 : 0.4,
                    transition: 'opacity 0.2s'
                  }}
                />
              ))}
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {currentStep > 0 && (
                <button 
                  className="btn btn-text" 
                  style={{ color: 'var(--sys-color-on-primary)', padding: '4px 8px', minWidth: 'auto' }}
                  onClick={handleBack}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', marginRight: '4px' }}>arrow_back</span>
                  Back
                </button>
              )}
              <button 
                className="btn btn-text" 
                style={{ color: 'var(--sys-color-on-primary)', padding: '4px 8px', minWidth: 'auto' }}
                onClick={handleNext}
              >
                {currentStep === steps.length - 1 ? 'Got it' : 'Next'}
                {currentStep !== steps.length - 1 && (
                  <span className="material-symbols-outlined" style={{ fontSize: '18px', marginLeft: '4px' }}>arrow_forward</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

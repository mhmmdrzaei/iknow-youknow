"use client";
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface OnLeaveResult {
  cancel?: boolean;
}

interface ScrollComponentProps {
  children: ReactNode;
  options?: {
    arrowKeys?: boolean;
    duration?: number;
    easing?: string;
    ordered?: boolean;
    scrollBar?: boolean;
    onLeave?: (currentPoint: number, nextPoint: number) => OnLeaveResult;
    onArrive?: (prevPoint: number, currentPoint: number) => void;
  };
}

const ScrollComponent: React.FC<ScrollComponentProps> = ({ children, options }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrolling, setScrolling] = useState(false);

  const defaults = {
    arrowKeys: false,
    duration: 1000,
    easing: 'ease-in-out',
    ordered: true,
    scrollBar: true,
    onLeave: (): OnLeaveResult => ({}),
    onArrive: () => {},
  };

  const config = { ...defaults, ...options };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const snapPoints = Array.from(container.querySelectorAll('[data-snap-point]'));

    if (!config.ordered) {
      snapPoints.sort((a, b) => {
        const aVal = Number((a as HTMLElement).dataset.snapPoint);
        const bVal = Number((b as HTMLElement).dataset.snapPoint);
        return aVal - bVal;
      });
    }

    container.style.overflowY = config.scrollBar ? 'scroll' : 'hidden';

    const lastY = { current: 0 };

    const handleWheel = (e: WheelEvent) => {
      const delta = -e.deltaY;
      if (delta > 5) scrollPrev();
      if (delta < -5) scrollNext();
      e.preventDefault();
    };

    const handleTouchStart = (e: TouchEvent) => {
      lastY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const delta = currentY - lastY.current;
      if (delta > 5) scrollPrev();
      if (delta < -5) scrollNext();
      lastY.current = currentY;
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') scrollPrev();
      if (e.key === 'ArrowDown') scrollNext();
    };

    container.addEventListener('wheel', handleWheel);
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    if (config.arrowKeys) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      if (config.arrowKeys) {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [config]);

  const currentPoint = (): number => {
    const container = containerRef.current;
    if (!container) return -1;

    const middleOfElem = container.clientHeight / 2;
    const snapPoints = Array.from(container.querySelectorAll('[data-snap-point]'));

    let currentPoint = -1;
    let minDiff = Infinity;

    snapPoints.forEach((snapPoint, index) => {
      const rect = (snapPoint as HTMLElement).getBoundingClientRect();
      const pointMiddle = (rect.top + rect.bottom) / 2;
      const diff = Math.abs(pointMiddle - middleOfElem);
      if (diff < minDiff) {
        currentPoint = index;
        minDiff = diff;
      }
    });

    return currentPoint;
  };

  const easeInOutQuad = (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };
  
  const scrollToPoint = (targetPoint: number) => {
    if (scrolling) return;
  
    const container = containerRef.current;
    if (!container) return;
  
    const snapPoints = Array.from(container.querySelectorAll('[data-snap-point]'));
    const current = currentPoint();
  
    if (config.onLeave(current, targetPoint)?.cancel) return;
  
    setScrolling(true);
  
    const containerHeight = container.clientHeight;
    const targetRect = (snapPoints[targetPoint] as HTMLElement).getBoundingClientRect();
    const targetMiddle = (targetRect.top + targetRect.bottom) / 2;
    const middleOfContainer = containerHeight / 2;
    const currentScrollTop = container.scrollTop;
    const targetScrollTop = currentScrollTop + (targetMiddle - middleOfContainer);
  
    const startTime = performance.now();
    const duration = config.duration; 
  
    const animateScroll = (time: number) => {
      const elapsedTime = time - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easing = easeInOutQuad(progress);
  
      container.scrollTop = currentScrollTop + (targetScrollTop - currentScrollTop) * easing;
  
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setScrolling(false);
        config.onArrive(current, targetPoint);
      }
    };
  
    requestAnimationFrame(animateScroll);
  };

  const scrollPrev = () => {
    const current = currentPoint();
    if (current > 0) scrollToPoint(current - 1);
  };

  const scrollNext = () => {
    const current = currentPoint();
    if (current < (containerRef.current?.querySelectorAll('[data-snap-point]').length || 0) - 1) {
      scrollToPoint(current + 1);
    }
  };

  return (
    <div className='scroller' ref={containerRef} style={{ overflowY: config.scrollBar ? 'scroll' : 'hidden', height: '100dvh', width: '100%' }}>
      {children}
    </div>
  );
};

export default ScrollComponent;

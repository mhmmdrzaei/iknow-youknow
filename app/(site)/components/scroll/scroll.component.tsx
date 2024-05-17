"use client"
import React, { useEffect, ReactNode,useState } from 'react';
interface ScrollComponentProps {
  children: ReactNode;
}

const ScrollComponent: React.FC<ScrollComponentProps> = ({ children }) => {
  useEffect(() => {
    const sections = document.querySelectorAll(`.section`);
    let currentSectionIndex = 0;
    let isScrolling = false;
    let accumulatedScroll = 0;
    const scrollThreshold = 200; // Adjust this value as needed for your scroll sensitivity
    const defaultDuration = 800; // Default duration for smooth scrolling
    const fastDuration = 800; // Faster duration for sections with a parent of .singleCatListing or .hero_img
    

    const scrollToSection = (index: number) => {
      if (isScrolling) return;
      isScrolling = true;
      const section = sections[index];
      const hasFastParent = section.closest('.singleCatListing') || section.closest('.hero_img');
      const duration = hasFastParent ? fastDuration : defaultDuration;
      section.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        isScrolling = false;
      }, duration);
    };

    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return;
      accumulatedScroll += event.deltaY;
      if (Math.abs(accumulatedScroll) >= scrollThreshold) {
        const direction = accumulatedScroll > 0 ? 1 : -1;
        const nextIndex = Math.min(Math.max(currentSectionIndex + direction, 0), sections.length - 1);
        if (nextIndex !== currentSectionIndex) {
          currentSectionIndex = nextIndex;
          scrollToSection(currentSectionIndex);
        }
        accumulatedScroll = 0; // Reset the accumulated scroll after moving one section
      }
    };

 const handleKey = (event: KeyboardEvent) => {
    if (isScrolling) return;

    if (event.key === 'ArrowUp') { // Up arrow key
      const newIndex = Math.max(currentSectionIndex - 1, 0);
      scrollToSection(newIndex);
    } else if (event.key === 'ArrowDown') { // Down arrow key
      const newIndex = Math.min(currentSectionIndex + 1, document.querySelectorAll('.section').length - 1);
      scrollToSection(newIndex);
    }
  };

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className="container-scroll">
      {children}
    </div>
  );
};

export default ScrollComponent;
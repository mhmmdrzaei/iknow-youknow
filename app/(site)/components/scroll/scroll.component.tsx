"use client"
import React, { useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type ScrollSectionProps = {
  children: ReactNode;
};

const ScrollSection = ({ children }: ScrollSectionProps) => {

  useEffect(() => {
    gsap.utils.toArray('.section').forEach((section: any) => {
      const sectionHeight = section.clientHeight; // Get the height of the section 
      ScrollTrigger.create({
        trigger: section as Element, // Type assertion for section
        start: 'bottom bottom',
        end: `+=${sectionHeight}`,
        snap: 1,
        scrub: 1,
        
        pinSpacing: false,
        pin: true,
      });
    });


  }, []);

  

  return <>{children}</>;
};

export default ScrollSection;

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
    gsap.utils.toArray('.section').forEach(section => {
      ScrollTrigger.create({
        trigger: section as Element, // Type assertion for section
        start: 'top top',
        pin: true,
        markers: true,
        scrub: .1,
        end: 'bottom top',
      });
    });
  }, []);

  return <>{children}</>;
};

export default ScrollSection;

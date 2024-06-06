"use client";
import React, { useEffect, useState, ReactNode } from 'react';
import ScrollComponent from '../scroll/scroll.component';

interface ConditionalScrollComponentProps {
  children: ReactNode;
}

const ConditionalScrollComponent: React.FC<ConditionalScrollComponentProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 640);
    };

    handleResize(); // Check on initial load
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return <ScrollComponent>{children}</ScrollComponent>;
  }

  return <>{children}</>;
};

export default ConditionalScrollComponent;

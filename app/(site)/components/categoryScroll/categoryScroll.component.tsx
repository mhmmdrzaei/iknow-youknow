"use client"
import React, { useEffect, useRef } from 'react';

interface ScrollLinkProps {
  categorySlug: string;
  categoryName: string;
}

const ScrollLink: React.FC<ScrollLinkProps> = ({ categorySlug, categoryName }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    const element = document.getElementById(categorySlug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <span className='category' onClick={handleClick}>
        {categoryName && <>{categoryName}</>}
    </span>
  );
};

export default ScrollLink;

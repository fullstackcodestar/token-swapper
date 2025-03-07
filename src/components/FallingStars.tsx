
import React, { useEffect, useRef } from 'react';

interface Star {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  element: HTMLDivElement | null;
}

const FallingStars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    
    // Create 15 stars with random properties
    const createStars = () => {
      for (let i = 0; i < 15; i++) {
        const angle = Math.random() * Math.PI / 4 + Math.PI / 8; // Angle between PI/8 and 3PI/8
        const startX = Math.random() * width;
        const startY = Math.random() * height * 0.3; // Start in top 30% of screen
        const distance = 300 + Math.random() * 500; // Random distance between 300-800px
        
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        
        const star: Star = {
          id: i,
          startX,
          startY,
          endX,
          endY,
          size: 1 + Math.random() * 2,
          duration: 1 + Math.random() * 3, // Between 1-4 seconds
          delay: Math.random() * 15, // Delay up to 15 seconds
          rotation: angle * (180 / Math.PI), // Convert radians to degrees
          element: null
        };
        
        starsRef.current.push(star);
      }
    };
    
    const renderStars = () => {
      starsRef.current.forEach(star => {
        if (star.element) return;
        
        const element = document.createElement('div');
        element.className = 'star';
        element.style.setProperty('--startX', `${star.startX}px`);
        element.style.setProperty('--startY', `${star.startY}px`);
        element.style.setProperty('--endX', `${star.endX}px`);
        element.style.setProperty('--endY', `${star.endY}px`);
        element.style.setProperty('--rotation', `${star.rotation}deg`);
        element.style.width = `${star.size}px`;
        element.style.height = `${star.size * 3}px`; // Make it slightly elongated
        element.style.animationDuration = `${star.duration}s`;
        element.style.animationDelay = `${star.delay}s`;
        element.style.animationIterationCount = 'infinite';
        
        container.appendChild(element);
        star.element = element;
      });
    };
    
    const resetStar = (star: Star) => {
      if (!star.element || !container) return;
      
      // Update star properties for next animation cycle
      const angle = Math.random() * Math.PI / 4 + Math.PI / 8;
      const startX = Math.random() * width;
      const startY = Math.random() * height * 0.3;
      const distance = 300 + Math.random() * 500;
      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;
      
      // Update CSS variables
      star.element.style.setProperty('--startX', `${startX}px`);
      star.element.style.setProperty('--startY', `${startY}px`);
      star.element.style.setProperty('--endX', `${endX}px`);
      star.element.style.setProperty('--endY', `${endY}px`);
      star.element.style.setProperty('--rotation', `${angle * (180 / Math.PI)}deg`);
    };

    const handleResize = () => {
      if (!container) return;
      
      // Clear existing stars
      container.innerHTML = '';
      starsRef.current = [];
      
      // Create new stars for the new dimensions
      createStars();
      renderStars();
    };
    
    createStars();
    renderStars();

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      starsRef.current.forEach(star => {
        if (star.element) {
          star.element.remove();
        }
      });
    };
  }, []);

  return <div ref={containerRef} className="stars-container" />;
};

export default FallingStars;

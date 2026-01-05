import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Penguin() {
  const { unifiedTheme } = useTheme();
  const [penguins, setPenguins] = useState([]);
  
  // Generate array of frame paths
  const frames = Array.from({ length: 10 }, (_, i) => 
    `/assets/images/penguin/FA_PENGUIN_Run_${String(i).padStart(3, '0')}.png`
  );

  // Spawn penguins randomly
  useEffect(() => {
    if (unifiedTheme !== 'winter') {
      setPenguins([]);
      return;
    }

    const spawnPenguin = () => {
      // Random velocity in pixels per second (50-150 px/s)
      const velocity = 50 + Math.random() * 100;
      const id = Date.now() + Math.random();
      
      setPenguins((prev) => [
        ...prev,
        { id, velocity }
      ]);
    };

    // Spawn initial penguin
    spawnPenguin();
    
    // Spawn new penguins randomly (every 3-8 seconds)
    const spawnInterval = setInterval(() => {
      spawnPenguin();
    }, 3000 + Math.random() * 5000);

    return () => clearInterval(spawnInterval);
  }, [unifiedTheme]);

  const containerRef = useRef(null);

  // Only show penguins on winter theme
  if (unifiedTheme !== 'winter') {
    return null;
  }

  return (
    <div ref={containerRef} className="penguin-container">
      {penguins.map((penguin) => (
        <PenguinSprite 
          key={penguin.id} 
          frames={frames} 
          velocity={penguin.velocity}
          containerRef={containerRef}
          onComplete={() => {
            setPenguins((prev) => prev.filter(p => p.id !== penguin.id));
          }}
        />
      ))}
    </div>
  );
}

function PenguinSprite({ frames, velocity, containerRef, onComplete }) {
  const [currentFrame, setCurrentFrame] = useState(0);
  const penguinRef = useRef(null);

  // Cycle through frames
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 100);

    return () => clearInterval(interval);
  }, [frames.length]);

  // Calculate distance and duration based on velocity
  useEffect(() => {
    if (!penguinRef.current || !containerRef?.current) return;

    let timeoutId;
    let removeTimeoutId;

    const updateAnimation = () => {
      const container = containerRef.current;
      const penguin = penguinRef.current;
      
      if (!container || !penguin) return;

      // Get container width (container is fixed to the viewport)
      const containerWidth = container.offsetWidth;
      const penguinWidth = 80;
      
      // Start just off-screen on the left so it emerges from behind the sidebar
      const startLeft = -penguinWidth;
      
      // Distance to travel: from start to completely off-screen on the right
      const distance = containerWidth - startLeft + penguinWidth;
      
      // Calculate duration based on velocity (distance / velocity = time in seconds)
      const duration = distance / velocity;
      
      // Set CSS variable for animation distance and duration
      penguin.style.setProperty('--penguin-distance', `${distance}px`);
      penguin.style.animationDuration = `${duration}s`;
      
      // Set timeout to remove when animation completes
      removeTimeoutId = setTimeout(() => {
        onComplete();
      }, duration * 1000 + 500);
    };

    // Wait for layout, then calculate
    timeoutId = setTimeout(updateAnimation, 50);
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (removeTimeoutId) clearTimeout(removeTimeoutId);
    };
  }, [velocity, onComplete, containerRef]);

  // Remove when off-screen using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.left > window.innerWidth) {
            onComplete();
          }
        });
      },
      { threshold: 0, rootMargin: '0px' }
    );

    if (penguinRef.current) {
      observer.observe(penguinRef.current);
    }

    return () => {
      if (penguinRef.current) {
        observer.unobserve(penguinRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div 
      ref={penguinRef}
      className="penguin" 
      style={{ 
        animationName: 'penguinWalk',
        animationDuration: '10s', // Fallback duration
        '--penguin-distance': '100vw' // Fallback distance
      }}
    >
      <img
        src={frames[currentFrame]}
        alt="Walking penguin"
        className="penguin-sprite"
      />
    </div>
  );
}

export default Penguin;


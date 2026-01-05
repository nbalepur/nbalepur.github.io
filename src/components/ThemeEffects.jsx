import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeEffects() {
  const { theme, isDark } = useTheme();
  const starsContainerRef = useRef(null);
  const snowflakesContainerRef = useRef(null);
  const coffeeSteamContainerRef = useRef(null);

  // Generate animated dots for Space theme
  useEffect(() => {
    if (theme === 'space' && starsContainerRef.current) {
      const container = starsContainerRef.current;
      container.innerHTML = ''; // Clear existing dots
      
      // Color palette for space theme - different for light and dark
      const colors = isDark ? [
        '#6366f1', // indigo
        '#8b5cf6', // purple
        '#ec4899', // pink
        '#f59e0b', // amber
        '#10b981', // emerald
        '#3b82f6', // blue
        '#f97316', // orange
        '#06b6d4', // cyan
      ] : [
        '#4f46e5', // darker indigo for light theme
        '#7c3aed', // darker purple
        '#db2777', // darker pink
        '#d97706', // darker amber
        '#059669', // darker emerald
        '#2563eb', // darker blue
        '#ea580c', // darker orange
        '#0891b2', // darker cyan
      ];
      
      // Create fixed smaller dots (background stars) - reduced count
      for (let i = 0; i < 50; i++) {
        const dot = document.createElement('div');
        dot.className = 'space-dot space-dot-small space-dot-fixed';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        const dotColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.backgroundColor = dotColor;
        dot.style.setProperty('--dot-color', dotColor);
        // Fixed dots don't animate
        container.appendChild(dot);
      }
      
      // Create animated dots (moving stars) - all moving left to right
      // Reduced count and adjusted timing for continuous stream
      const numAnimatedDots = 15;
      const baseDuration = 30; // Base duration in seconds
      
      for (let i = 0; i < numAnimatedDots; i++) {
        const dot = document.createElement('div');
        const size = Math.random() < 0.6 ? 'medium' : 'large';
        dot.className = `space-dot space-dot-${size}`;
        
        // All move left to right (direction = 1)
        dot.style.setProperty('--direction', '1');
        
        // Position at 100vw (right edge) so when animation starts with translateX(-100vw),
        // they'll be at the left edge and visible as they move across
        dot.style.left = '100vw';
        // Random vertical position
        dot.style.top = `${Math.random() * 100}%`;
        
        const dotColor = colors[Math.floor(Math.random() * colors.length)];
        dot.style.backgroundColor = dotColor;
        dot.style.setProperty('--dot-color', dotColor);
        // Use consistent duration with staggered delays to ensure continuous stream
        dot.style.animationDuration = `${baseDuration}s`;
        // Stagger delays evenly to create continuous stream
        dot.style.animationDelay = `${(i * baseDuration) / numAnimatedDots}s`;
        
        container.appendChild(dot);
      }
    }
  }, [theme, isDark]);

  // Generate snowflakes for Winter theme
  useEffect(() => {
    if (theme === 'winter' && snowflakesContainerRef.current) {
      const container = snowflakesContainerRef.current;
      container.innerHTML = ''; // Clear existing snowflakes
      
      // Create 30 snowflakes
      for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.top = '-100px'; // Start off-screen
        snowflake.style.opacity = '0'; // Start invisible
        snowflake.style.animationDuration = `${10 + Math.random() * 10}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowflake.style.fontSize = `${0.5 + Math.random() * 1}em`;
        container.appendChild(snowflake);
      }
    }
  }, [theme]);

  // Generate coffee steam wisps for Coffee theme - scattered across the page
  useEffect(() => {
    if (theme === 'coffee' && coffeeSteamContainerRef.current) {
      const container = coffeeSteamContainerRef.current;
      container.innerHTML = ''; // Clear existing steam
      
      // Create 3 steam wisps that appear near each other with slight delays
      // Like the original mug steam: three circles staggered horizontally
      const numSteamWisps = 3;
      const wispDuration = 4; // seconds per wisp animation
      const staggerDelay = 0.5; // small delay between each circle appearing
      const pauseDuration = 4; // seconds of pause after all 3 appear
      const cycleDuration = (numSteamWisps * staggerDelay) + wispDuration + pauseDuration; // total cycle time
      
      // Randomize base position across the page (between 20% and 80% of screen width)
      const basePositionPercent = 20 + Math.random() * 60; // 20% to 80%
      const baseOffset = -200; // base offset from center
      
      // Base offsets for the three circles (relative positions)
      const baseOffsets = [-50, 0, 50]; // left, center, right relative positions
      const jitterRange = 40; // ±40px jitter
      
      // Animation types
      const animations = ['steam-one', 'steam-two', 'steam-one'];
      
      for (let i = 0; i < numSteamWisps; i++) {
        const steam = document.createElement('div');
        steam.className = `coffee-steam ${animations[i]}`;
        
        // Calculate position: random base + relative offset + jitter
        const jitter = (Math.random() - 0.5) * jitterRange; // -20px to +20px
        const totalOffset = baseOffset + baseOffsets[i] + jitter;
        steam.style.left = `calc(${basePositionPercent}% + ${totalOffset}px)`;
        
        // Start from the bottom of the page
        steam.style.bottom = '0';
        
        // Each wisp appears with a small delay (0.5s apart)
        // Then pause, then repeat the cycle
        const delay = i * staggerDelay;
        steam.style.animationDelay = `${delay}s`;
        steam.style.animationDuration = `${cycleDuration}s`;
        steam.style.animationIterationCount = 'infinite';
        
        container.appendChild(steam);
      }
    } else if (coffeeSteamContainerRef.current) {
      // Clear when not coffee theme
      coffeeSteamContainerRef.current.innerHTML = '';
    }
  }, [theme]);

  return (
    <>
      {theme === 'space' && (
        <>
          <div ref={starsContainerRef} className="space-dots-container" />
          <div className="rocket-ship" title="🚀">🚀</div>
        </>
      )}
      {theme === 'winter' && (
        <div ref={snowflakesContainerRef} className="snowflakes-container" />
      )}
      {theme === 'coffee' && (
        <div ref={coffeeSteamContainerRef} className="coffee-steam-container">
          {/* Mug and steam will be injected here */}
        </div>
      )}
    </>
  );
}

export default ThemeEffects;


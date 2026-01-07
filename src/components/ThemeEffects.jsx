import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function ThemeEffects() {
  const { theme, isDark } = useTheme();
  const starsContainerRef = useRef(null);
  const snowflakesContainerRef = useRef(null);
  const coffeeSteamContainerRef = useRef(null);
  const cherryBlossomsContainerRef = useRef(null);
  const fallingPetalsContainerRef = useRef(null);
  const fallingLeavesContainerRef = useRef(null);

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

      // Create 3 steam wisps that appear near each other with slight delays.
      // Requirement: locations should re-randomize each time the 3-puff cycle happens.
      const numSteamWisps = 3;
      const wispDuration = 4; // seconds per wisp animation (active portion)
      const staggerDelay = 0.5; // seconds between wisps within a batch
      const pauseDuration = 4; // seconds of pause after wisps finish (invisible portion)

      // Total animation duration per wisp includes pause; the last wisp starts later.
      const cycleDuration = (numSteamWisps * staggerDelay) + wispDuration + pauseDuration;
      const batchDuration = cycleDuration + (numSteamWisps - 1) * staggerDelay;

      const jitterRange = 40; // ±40px jitter to keep wisps close but varied
      const baseOffsets = [-40, 0, 40]; // cluster around a shared center
      const animations = ['steam-one', 'steam-two', 'steam-one'];
      const steamSizePx = 400;

      const timeouts = new Set();

      const spawnBatch = () => {
        const c = coffeeSteamContainerRef.current;
        if (!c) return;

        // Pick a shared cluster center (20%-80%) so wisps stay near each other
        const basePositionPercent = 20 + Math.random() * 60;

        for (let i = 0; i < numSteamWisps; i++) {
          const steam = document.createElement('div');
          steam.className = `coffee-steam ${animations[i]}`;

          // Clustered horizontal position: shared base + small offset + jitter
          const jitter = (Math.random() - 0.5) * jitterRange;
          steam.style.left = `calc(${basePositionPercent}% + ${baseOffsets[i]}px + ${jitter}px)`;

          // Start from the bottom of the page
          // Offset by half the circle size so the wisp "origin" is at the bottom edge.
          steam.style.bottom = `${-(steamSizePx / 2)}px`;

          // Stagger within this batch, run once, then remove
          const delay = i * staggerDelay;
          steam.style.animationDelay = `${delay}s`;
          steam.style.animationDuration = `${cycleDuration}s`;
          steam.style.animationIterationCount = '1';
          steam.style.animationFillMode = 'forwards';

          c.appendChild(steam);

          const removeAfterMs = (delay + cycleDuration + 0.1) * 1000;
          const t = window.setTimeout(() => {
            steam.remove();
            timeouts.delete(t);
          }, removeAfterMs);
          timeouts.add(t);
        }
      };

      // Kick off immediately, then repeat batches
      spawnBatch();
      const intervalId = window.setInterval(spawnBatch, batchDuration * 1000);

      return () => {
        window.clearInterval(intervalId);
        for (const t of timeouts) window.clearTimeout(t);
        timeouts.clear();
        if (coffeeSteamContainerRef.current) coffeeSteamContainerRef.current.innerHTML = '';
      };
    } else if (coffeeSteamContainerRef.current) {
      // Clear when not coffee theme
      coffeeSteamContainerRef.current.innerHTML = '';
    }
  }, [theme]);

  // Summer theme now uses pure CSS background animation - no JS needed

  // Generate cherry blossom branches and falling petals for Spring theme
  useEffect(() => {
    if (theme === 'spring') {
      // Create cherry blossom branches extending from left and right
      if (cherryBlossomsContainerRef.current) {
        const container = cherryBlossomsContainerRef.current;
        container.innerHTML = ''; // Clear existing branches
        
        // Create both branches first so they're available for positioning functions
        // Create left branch - positioned to touch the sidebar
        // Should point left (into screen from left), so don't flip it
        const leftBranch = document.createElement('img');
        leftBranch.src = '/assets/images/cherry-blossom.png';
        leftBranch.className = 'cherry-blossom-branch cherry-blossom-branch-left';
        leftBranch.alt = 'Cherry blossom branch';
        // Position at sidebar width: 288px (lg) or 320px (xl)
        // Using 288px as base, will adjust for xl screens
        leftBranch.style.left = '288px'; // lg:w-72 = 288px
        leftBranch.style.transform = 'none'; // Position from top-left, no centering
        leftBranch.style.height = 'auto';
        leftBranch.style.opacity = '0.3';
        container.appendChild(leftBranch);
        
        // Create right branch - positioned to touch the right edge
        // Should point right (into screen from right), so flip it
        const rightBranch = document.createElement('img');
        rightBranch.src = '/assets/images/cherry-blossom.png';
        rightBranch.className = 'cherry-blossom-branch cherry-blossom-branch-right';
        rightBranch.alt = 'Cherry blossom branch';
        rightBranch.style.right = '0px'; // Position at right edge
        rightBranch.style.transform = 'scaleX(-1)'; // Flip to point right, no vertical centering
        rightBranch.style.height = 'auto';
        rightBranch.style.opacity = '0.3';
        container.appendChild(rightBranch);
        
        // Function to update branch size and position
        const updateLeftBranchSize = () => {
          // Calculate width as 1/3 of viewport width
          const viewportWidth = window.innerWidth;
          const branchWidth = viewportWidth / 3;
          leftBranch.style.width = `${branchWidth}px`;
        };
        
        // Function to update branch position based on sidebar width
        const updateLeftBranchPosition = () => {
          // Check if sidebar is visible (lg breakpoint is 1024px)
          const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
          if (isDesktop) {
            // Sidebar is visible - position at sidebar edge
            const isXl = window.matchMedia('(min-width: 1280px)').matches;
            leftBranch.style.left = isXl ? '320px' : '288px'; // xl:w-80 = 320px, lg:w-72 = 288px
          } else {
            // No sidebar on mobile - position at left edge
            leftBranch.style.left = '0px';
          }
        };
        
        // Store the initial random position (as a percentage) so it doesn't change on resize
        let leftBranchTopPercent = null;
        
        // Function to calculate branch height (used by both left and right branches)
        const getBranchHeight = (branch) => {
          const branchWidth = window.innerWidth / 3;
          if (branch.naturalWidth && branch.naturalHeight) {
            const aspectRatio = branch.naturalHeight / branch.naturalWidth;
            return branchWidth * aspectRatio;
          }
          return 0;
        };
        
        // Function to update right branch size (1/3 of viewport width)
        const updateRightBranchSize = () => {
          const viewportWidth = window.innerWidth;
          const branchWidth = viewportWidth / 3;
          rightBranch.style.width = `${branchWidth}px`;
        };
        
        // Function to set right branch vertical position as complement of left branch
        const setRightBranchVerticalPosition = (isInitial = false, leftTop = null, leftMaxTop = null) => {
          const viewportHeight = window.innerHeight;
          const branchHeight = getBranchHeight(rightBranch);
          const maxTop = Math.max(0, viewportHeight - branchHeight);
          
          let topPosition;
          if (leftTop !== null && leftMaxTop !== null) {
            // Calculate complement: if left is at top, right should be at bottom
            // Formula: rightTop = maxTop - (leftTop / leftMaxTop) * maxTop
            // This ensures when left is at 0, right is at maxTop, and vice versa
            const leftRatio = leftMaxTop > 0 ? leftTop / leftMaxTop : 0;
            topPosition = maxTop - (leftRatio * maxTop);
            // Clamp to ensure it stays within bounds
            topPosition = Math.max(0, Math.min(topPosition, maxTop));
          } else {
            // Fallback: if left branch position not available yet, use a default
            topPosition = maxTop;
          }
          rightBranch.style.top = `${topPosition}px`;
        };
        
        // Function to set random vertical position ensuring full image is visible (only on initial load)
        const setLeftBranchVerticalPosition = (isInitial = false) => {
          const viewportHeight = window.innerHeight;
          const branchHeight = getBranchHeight(leftBranch);
          // Calculate max top position so bottom of image stays visible
          const maxTop = Math.max(0, viewportHeight - branchHeight);
          
          let topPosition;
          if (isInitial || leftBranchTopPercent === null) {
            // Only randomize on initial load
            const randomTop = Math.random() * maxTop;
            leftBranchTopPercent = (randomTop / viewportHeight) * 100; // Store as percentage
            topPosition = randomTop;
          } else {
            // On resize, use the stored percentage but clamp to valid range
            const desiredTop = (leftBranchTopPercent / 100) * viewportHeight;
            topPosition = Math.min(desiredTop, maxTop);
          }
          leftBranch.style.top = `${topPosition}px`;
          
          // Update right branch position to mirror the left (complement)
          if (rightBranch) {
            setRightBranchVerticalPosition(false, topPosition, maxTop);
          }
        };
        
        // Set up onload handler for left branch
        leftBranch.onload = () => {
          setLeftBranchVerticalPosition(true);
        };
        
        // Initial setup
        updateLeftBranchSize();
        updateLeftBranchPosition();
        setLeftBranchVerticalPosition(true); // Initial load - randomize
        
        // Update on window resize - will also update right branch via setLeftBranchVerticalPosition
        const handleResize = () => {
          updateLeftBranchSize();
          updateLeftBranchPosition();
          setLeftBranchVerticalPosition(false); // Resize - don't randomize, keep same relative position (this also updates right branch)
          updateRightBranchSize();
        };
        window.addEventListener('resize', handleResize);
        
        // Also listen for media query changes (both lg and xl breakpoints)
        const lgMediaQuery = window.matchMedia('(min-width: 1024px)');
        const xlMediaQuery = window.matchMedia('(min-width: 1280px)');
        lgMediaQuery.addEventListener('change', updateLeftBranchPosition);
        xlMediaQuery.addEventListener('change', updateLeftBranchPosition);
        
        // Set up onload handler for right branch
        rightBranch.onload = () => {
          // Right branch position will be set when left branch position is calculated
          if (leftBranch.naturalWidth && leftBranch.naturalHeight) {
            const viewportHeight = window.innerHeight;
            const leftBranchHeight = getBranchHeight(leftBranch);
            const leftMaxTop = Math.max(0, viewportHeight - leftBranchHeight);
            const leftTop = parseFloat(leftBranch.style.top) || 0;
            setRightBranchVerticalPosition(false, leftTop, leftMaxTop);
          }
        };
        
        // Initial setup
        updateRightBranchSize();
        // Right branch position will be set by setLeftBranchVerticalPosition when left branch loads
      }
      
      // Create falling cherry blossom petals
      if (fallingPetalsContainerRef.current) {
        const container = fallingPetalsContainerRef.current;
        container.innerHTML = ''; // Clear existing petals
        
        // Create 20 falling petals with even distribution
        const numPetals = 20;
        for (let i = 0; i < numPetals; i++) {
          const petal = document.createElement('div');
          petal.className = 'falling-petal';
          petal.innerHTML = '🌸';
          // Evenly distribute across the width for better distribution
          petal.style.left = `${(i / (numPetals - 1)) * 100}%`;
          petal.style.top = '-100px'; // Start off-screen
          petal.style.opacity = '0'; // Start invisible
          const fallDuration = 22 + Math.random() * 18; // much slower fall (22-40s)
          const fallDelay = Math.random() * 12;
          petal.style.animationDuration = `${fallDuration}s`;
          petal.style.animationDelay = `${fallDelay}s`;
          petal.style.fontSize = `${0.5 + Math.random() * 0.8}em`;
          // Add random horizontal drift for more natural falling
          const randomX = (Math.random() - 0.5) * 80; // -40px to 40px
          petal.style.setProperty('--random-x', randomX);
          container.appendChild(petal);
        }
      }
    } else {
      // Clear when not spring theme
      if (cherryBlossomsContainerRef.current) {
        cherryBlossomsContainerRef.current.innerHTML = '';
      }
      if (fallingPetalsContainerRef.current) {
        fallingPetalsContainerRef.current.innerHTML = '';
      }
    }
  }, [theme]);

  // Generate falling autumn leaves with straight fall and wind gusts for Autumn theme
  useEffect(() => {
    if (theme === 'autumn' && fallingLeavesContainerRef.current) {
      const container = fallingLeavesContainerRef.current;
      container.innerHTML = ''; // Clear existing leaves
      
      // Create leaves for page coverage (reduced for performance)
      const numLeaves = 25;
      const maxLeaves = 70; // cap to avoid runaway DOM nodes
      const leaves = [];
      const clampOffset = (value, limit = 900) => Math.max(-limit, Math.min(limit, value));
      
      for (let i = 0; i < numLeaves; i++) {
        // Create wrapper for wind gust transform
        const wrapper = document.createElement('div');
        wrapper.className = 'leaf-wrapper';
        
        // Create the actual leaf element
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        
        // Use various leaf emojis for variety
        const leafEmojis = ['🍂', '🍁', '🍃'];
        leaf.innerHTML = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        
        // Spawn across the top, plus some extra far-left off-screen
        const viewportWidth = window.innerWidth || 1200;
        const startType = Math.random();
        if (startType < 0.2) {
          // Far left off-screen
          wrapper.style.left = `${-400 - Math.random() * 200}px`;
        } else {
          // Across visible width with jitter
          const jitter = (Math.random() - 0.5) * 200;
          wrapper.style.left = `${Math.min(Math.max(Math.random() * viewportWidth + jitter, -200), viewportWidth + 200)}px`;
        }
        
        wrapper.style.top = `${-100 - Math.random() * 300}px`; // Start off-screen top with more variation
        
        // Varying animation durations for natural effect (10-25 seconds) - wider range
        const duration = 10 + Math.random() * 15;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.animationDelay = `${Math.random() * 8}s`; // Longer delays for better distribution
        
        // Random size for variety
        leaf.style.fontSize = `${0.6 + Math.random() * 1}em`;
        
        // Small base drift to keep motion from looking perfectly vertical
        const baseDrift = (Math.random() - 0.5) * 60;
        leaf.style.setProperty('--base-drift', `${baseDrift}px`);
        
        // Random rotation speed
        const rotationSpeed = 360 + Math.random() * 720; // 1-3 full rotations
        leaf.style.setProperty('--rotation-speed', rotationSpeed);
        
        // Initialize wind gust offset
        wrapper.style.setProperty('--wind-gust-x', '0px');
        // Per-leaf offset to avoid perfectly aligned gust bands
        const leafOffset = (Math.random() - 0.5) * 120;
        wrapper.style.setProperty('--leaf-offset', `${leafOffset}px`);
        
        wrapper.appendChild(leaf);
        container.appendChild(wrapper);
        
        // Store wrapper with its offset for tracking
        wrapper._windGustOffset = 0;
        leaves.push(wrapper); // Store wrapper for wind gust manipulation
      }
      
      // Function to create a new leaf
      const createLeaf = () => {
        const wrapper = document.createElement('div');
        wrapper.className = 'leaf-wrapper';
        
        const leaf = document.createElement('div');
        leaf.className = 'falling-leaf';
        
        const leafEmojis = ['🍂', '🍁', '🍃'];
        leaf.innerHTML = leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
        
        // Determine starting position
        // Important: We need to spawn leaves so that when the wind offset is applied,
        // they appear at the correct visual position on screen
        // Random starting position across width with some far-left spawns
        const viewportWidth = window.innerWidth;
        const startType = Math.random();
        if (startType < 0.25) {
          // Far left off-screen
          wrapper.style.left = `${-400 - Math.random() * 200}px`;
        } else {
          const jitter = (Math.random() - 0.5) * 200;
          const spawnPos = Math.random() * viewportWidth + jitter;
          wrapper.style.left = `${Math.min(Math.max(spawnPos, -240), viewportWidth + 240)}px`;
        }
        
        wrapper.style.top = `${-100 - Math.random() * 300}px`;
        
        const duration = 10 + Math.random() * 15;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.animationDelay = `${Math.random() * 2}s`;
        
        leaf.style.fontSize = `${0.6 + Math.random() * 1}em`;
        
        const baseDrift = (Math.random() - 0.5) * 60;
        leaf.style.setProperty('--base-drift', `${baseDrift}px`);
        
        const rotationSpeed = 360 + Math.random() * 720;
        leaf.style.setProperty('--rotation-speed', rotationSpeed);
        
        const leafOffset = (Math.random() - 0.5) * 120;
        wrapper.style.setProperty('--leaf-offset', `${leafOffset}px`);
        
        wrapper.appendChild(leaf);
        container.appendChild(wrapper);
        
        return wrapper;
      };
      
      // Function to check if a leaf is off-screen and remove it
      const checkAndRemoveOffScreenLeaves = () => {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const margin = 300; // Extra margin before removing
        
        // Iterate backwards to safely remove items
        for (let i = leaves.length - 1; i >= 0; i--) {
          const wrapper = leaves[i];
          
          if (!wrapper.parentElement) {
            leaves.splice(i, 1);
            continue;
          }
          
          const rect = wrapper.getBoundingClientRect();
          // Calculate actual visual position accounting for wind offset (transform)
          // getBoundingClientRect already accounts for transforms, so we can use it directly
          const visualX = rect.left;
          const visualY = rect.top;
          
          // Allow wider horizontal travel; only remove sideways once leaf is well down the page
          const isOffScreen = 
            visualY > viewportHeight + margin || // Below screen
            (visualY > viewportHeight * 0.6 && (visualX < -margin || visualX > viewportWidth + margin)); // Side removal only after lower half
          
          if (isOffScreen) {
            wrapper.remove();
            leaves.splice(i, 1);
          }
        }
      };
      
      // Continuous leaf spawning from top with staggered cadence
      let spawnInterval;
      const spawnLeaves = () => {
        if (leaves.length >= maxLeaves) return;
        for (let i = 0; i < 2; i++) {
          setTimeout(() => {
            if (container.parentElement) { // Check container still exists
              if (leaves.length < maxLeaves) {
                leaves.push(createLeaf());
              }
            }
          }, i * 500);
        }
      };
      
      // Start continuous spawning
      spawnLeaves();
      spawnInterval = setInterval(spawnLeaves, 3500); // Slightly slower spawn to reduce load
      
      // Check for off-screen leaves periodically and remove them
      let cleanupInterval = setInterval(checkAndRemoveOffScreenLeaves, 1000); // Check every second
      
      // Wind gust system - steady rightward gust every N seconds
      let windGustTimeout;
      const gustDuration = 8000; // 8 seconds - longer lasting gusts
      const gustIntervalMin = 22000; // base pause between gusts for more breathing room
      const gustIntervalRange = 10000; // add jitter so spacing feels natural (22-32s)
      
      const triggerWindGust = () => {
        // Fixed direction: always to the right for natural, steady wind
        const gustIntensity = 350 + Math.random() * 350; // 350-700px push
        const gustOffset = gustIntensity; // rightward
        
        // Drive gust via CSS on container for better performance
        container.style.setProperty('--gust-distance', `${gustOffset}px`);
        container.style.setProperty('--gust-duration', `${gustDuration}ms`);
        container.classList.remove('gusting'); // reset if already set
        // Force reflow to restart animation
        void container.offsetWidth;
        container.classList.add('gusting');
        
        // Spawn new leaves to fill the gap (respecting cap)
        for (let i = 0; i < 2 && leaves.length < maxLeaves; i++) { // Fewer leaves spawned
          setTimeout(() => {
            if (container.parentElement) {
              if (leaves.length < maxLeaves) {
                const newLeaf = createLeaf();
                leaves.push(newLeaf);
              }
            }
          }, i * 200); // Stagger the spawns
        }
      };
      
      // Start gusts on a steady cadence
      triggerWindGust(); // initial gust
      const scheduleWindGust = () => {
        const delay = gustIntervalMin + Math.random() * gustIntervalRange;
        windGustTimeout = setTimeout(() => {
          triggerWindGust();
          scheduleWindGust();
        }, delay);
      };
      scheduleWindGust();
      
      return () => {
        if (windGustTimeout) {
          clearTimeout(windGustTimeout);
        }
        if (spawnInterval) {
          clearInterval(spawnInterval);
        }
        if (cleanupInterval) {
          clearInterval(cleanupInterval);
        }
        container.classList.remove('gusting');
      };
    } else if (fallingLeavesContainerRef.current) {
      // Clear when not autumn theme
      fallingLeavesContainerRef.current.innerHTML = '';
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
      {theme === 'summer' && (
        <>
          <div className="heat-wave-container" />
          <div className="radiating-sun" title="☀️">
            <div className="sun-core"></div>
            <div className="radiation-ring radiation-ring-1"></div>
            <div className="radiation-ring radiation-ring-2"></div>
            <div className="radiation-ring radiation-ring-3"></div>
          </div>
        </>
      )}
      {theme === 'spring' && (
        <>
          <div ref={cherryBlossomsContainerRef} className="cherry-blossoms-container">
            {/* Cherry blossom branches will be injected here */}
          </div>
          <div ref={fallingPetalsContainerRef} className="falling-petals-container">
            {/* Falling petals will be injected here */}
          </div>
        </>
      )}
      {theme === 'autumn' && (
        <div ref={fallingLeavesContainerRef} className="falling-leaves-container">
          {/* Falling autumn leaves will be injected here */}
        </div>
      )}
    </>
  );
}

export default ThemeEffects;


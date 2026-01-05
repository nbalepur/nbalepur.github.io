import React, { useState, useEffect, useRef } from 'react';
import { useFilter } from '../contexts/FilterContext';

function Tips({ title }) {
  const { filterByPaperTitle } = useFilter();
  const [isGameExpanded, setIsGameExpanded] = useState(false);
  const [isMouseOverGame, setIsMouseOverGame] = useState(false);
  const rafRef = useRef(null);
  const gameContainerRef = useRef(null);
  
  const handlePaperClick = (paperTitle, e) => {
    e.preventDefault();
    filterByPaperTitle(paperTitle);
  };

  const toggleGame = (e) => {
    e.preventDefault();
    setIsGameExpanded(!isGameExpanded);
  };

  // Prevent keyboard-triggered scrolling while allowing mouse/trackpad scrolling
  // The iframe is cross-origin so we can't intercept its key events.
  // Instead, we track mouse/wheel/touch events and only allow scroll changes from those.
  useEffect(() => {
    if (isGameExpanded) {
      let allowedScrollPosition = window.pageYOffset;
      let lastMouseInteractionTime = 0;
      const MOUSE_SCROLL_WINDOW = 150; // ms to allow scroll after mouse interaction
      
      // Track mouse/wheel/touch events - these are the only allowed scroll sources
      const onMouseInteraction = () => {
        lastMouseInteractionTime = Date.now();
      };
      
      // Continuously check scroll position and revert if it changed without mouse
      const checkScroll = () => {
        const currentScroll = window.pageYOffset;
        const timeSinceMouseInteraction = Date.now() - lastMouseInteractionTime;
        
        // Allow scroll if: mouse interaction happened recently OR mouse is over the game iframe
        if (timeSinceMouseInteraction < MOUSE_SCROLL_WINDOW || isMouseOverGame) {
          // Mouse/wheel was used recently or mouse is over iframe - this is an allowed scroll
          allowedScrollPosition = currentScroll;
        } else if (currentScroll !== allowedScrollPosition) {
          // Scroll changed without mouse = keyboard scroll = revert immediately
          window.scrollTo(0, allowedScrollPosition);
        }
        
        rafRef.current = requestAnimationFrame(checkScroll);
      };
      
      // Listen to all mouse/touch/wheel events
      window.addEventListener('wheel', onMouseInteraction, { passive: true });
      window.addEventListener('mousedown', onMouseInteraction, { passive: true });
      window.addEventListener('touchstart', onMouseInteraction, { passive: true });
      window.addEventListener('touchmove', onMouseInteraction, { passive: true });
      
      // Start the scroll position checker
      rafRef.current = requestAnimationFrame(checkScroll);
      
      return () => {
        window.removeEventListener('wheel', onMouseInteraction);
        window.removeEventListener('mousedown', onMouseInteraction);
        window.removeEventListener('touchstart', onMouseInteraction);
        window.removeEventListener('touchmove', onMouseInteraction);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
  }, [isGameExpanded, isMouseOverGame]);

  const tips = [
    {
      content: (
        <>
          I've shifted from focusing on specific papers or deadlines to building useful artifacts-interfaces, tools, models, etc. I've found this approach to be personally more fulfilling, but I imagine it can frustrate my co-authors when I don't have concrete research questions planned until an MVP is done 😬
        </>
      )
    },
    {
      content: (
        <>
          Sometimes I think people take AI research and paper writing a bit too seriously. It's totally fine to try and have fun while writing! I've found the papers I'm most motivated about are the ones where I could add the most easter eggs, like our self-referential{' '}
          <a 
            href="#" 
            onClick={(e) => handlePaperClick("Which of These Best Describes Multiple Choice Evaluation with LLMs? A) Forced B) Flawed C) Fixable D) All of the Above", e)}
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            MCQA paper title
          </a>
          , our planning paper that was{' '}
          <a 
            href="#" 
            onClick={(e) => handlePaperClick("A Good Plan is Hard to Find: Aligning Models with Preferences is Misaligned with What Helps Users", e)}
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            structured like a step-by-step plan
          </a>
          , and{' '}
          <button
            onClick={toggleGame}
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          >
            adding games in our interfaces
          </button>
          .
        </>
      ),
      hasGame: true
    },
    {
      content: (
        <>
          Without good reviews, publishing is meaningless, and I think reviewing is something we can all improve at. I wrote a{' '}
          <a 
            href="/assets/pdf/review-advice.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            short guide
          </a>
          {' '}with my reviewing experience that might be helpful.
        </>
      )
    }
  ];

  return (
    <section id="tips" className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {tip.content}
            </p>
            
            {/* Game iframe - expandable */}
            {tip.hasGame && (
              <div 
                ref={gameContainerRef}
                className={`overflow-hidden transition-all duration-300 ${
                  isGameExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
                onMouseEnter={() => setIsMouseOverGame(true)}
                onMouseLeave={() => setIsMouseOverGame(false)}
              >
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-200 dark:border-gray-700"
                    src="https://nbalepur.github.io/ai2-trex-runner/"
                    title="AI2 T-Rex Runner Game"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tips;


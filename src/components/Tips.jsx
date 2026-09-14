import React, { useState, useEffect, useRef } from 'react';
import { useFilter } from '../contexts/FilterContext';

function Tips({ title }) {
  const { filterByPaperTitle } = useFilter();
  const [isGameExpanded, setIsGameExpanded] = useState(false);
  const [isMouseOverGame, setIsMouseOverGame] = useState(false);
  const rafRef = useRef(null);
  const gameContainerRef = useRef(null);

  // Helper to check if device supports hover
  const supportsHover = () => {
    return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  };
  
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
          Over time, I've largely changed my approach to research. I have previously optimized for: 1) proposing new hard tasks and models to climb then; 2) probing simple and surprising model weaknesses; and 3) focusing solely on building useful artifacts. Now, I enjoy thinking about grander, pie in the sky, impossible-to-scope research questions
        </>
      )
    },
    {
      content: (
        <>
          I am recently quite pessimistic about current research incentives (e.g., paper quantity), as they are too easy to climb with AI. I am actively thinking of how to implement better solutions (e.g., new forms of submissions like talks) — if you have ideas, let's chat! 
        </>
      )
    },
    {
      content: (
        <>
          IMO, the two most important skills to develop now in research are{' '}
          <a
            href="https://chenhaot.com/papers/mirage_ai_scientist.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            taste
          </a>
          {' '}and presentation. Relatedly, it's important to{' '}
          <a
            href="https://www.cs.columbia.edu/~johnhew/lab/ai-policy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            finish tasks alone at first
          </a>
          ,{' '}
          <a
            href="https://arxiv.org/abs/2607.26375"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            understand your work
          </a>
          , and{' '}
          <a
            href="https://eytanadar.medium.com/ai-native-phd-students-f9f6eebc1f91"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            forcing yourself to struggle
          </a>
          {' '}beyond just checking off tasks 
        </>
      )
    },
    {
      content: (
        <>
          Papers are too serious, have fun while you can! The papers I'm most proud of are the ones where I could add the most jokes, like our self-referential{' '}
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
          , and our <a 
            href="#" 
            onClick={(e) => handlePaperClick("DRACULA: Hunting for the Actions Users Want Deep Research Agents to Execute", e)}
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            vampire
          </a> and <a 
            href="#" 
            onClick={(e) => handlePaperClick("Programming is Not Just Editing! The Importance of Code Understanding in Agents", e)}
       
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            goat
          </a>-themed papers.
        </>
      ),
      hasGame: true
    },
    {
      content: (
        <>
          Publishing can only survive with dedicated reviewers, and I think reviewing is something we can all improve at. I wrote a{' '}
          <a 
            href="/assets/pdf/review-advice.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            short guide
          </a>
          {' '}with my reviewing experience that my mentees find helpful.
        </>
      )
    },

    {
      content: (
        <>
          Ph.D. is significantly more enjoyable with friends and hobbies. Beyond complaining, I enjoy getting bigger (😋🏋️‍♂️), climbing things (🧗‍♂️🥾), swinging rackets (🏸🎾), and           <a 
            href="https://x.com/NishantBalepur/status/2054612790770339967?s=20"
            target="_blank"
            rel="noopener noreferrer"
            className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
          >
            gossiping and loitering
          </a>
        </>
      )
    },
  ];

  return (
    <section id="tips" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <p className="text-[15px] leading-[1.55] text-gray-700 dark:text-gray-300 mb-4">
        I try to keep this part of my website updated with my current thoughts about my Ph.D. and research :)
      </p>
      <ul className="list-disc list-outside space-y-3 ml-5 text-[15px] leading-[1.55] text-gray-700 dark:text-gray-300 marker:text-gray-400 dark:marker:text-gray-500">
        {tips.map((tip, index) => (
          <li key={index}>
            {tip.content}
            
            {/* Game iframe - expandable */}
            {tip.hasGame && (
              <div 
                ref={gameContainerRef}
                className={`overflow-hidden transition-all duration-300 ${
                  isGameExpanded ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
                onMouseEnter={() => {
                  if (supportsHover()) {
                    setIsMouseOverGame(true);
                  }
                }}
                onMouseLeave={() => {
                  if (supportsHover()) {
                    setIsMouseOverGame(false);
                  }
                }}
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
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Tips;


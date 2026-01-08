import React, { useState, useEffect, useRef } from 'react';
import { useFilter } from '../contexts/FilterContext';

function Tips({ title }) {
  const { filterByPaperTitle } = useFilter();
  const [isAtTop, setIsAtTop] = useState(false);
  const gameContainerRef = useRef(null);
  
  const handlePaperClick = (paperTitle, e) => {
    e.preventDefault();
    filterByPaperTitle(paperTitle);
  };

  // Check if game container is at the top of viewport
  useEffect(() => {
    const checkPosition = () => {
      if (gameContainerRef.current) {
        const rect = gameContainerRef.current.getBoundingClientRect();
        // Consider it at top if it's within the top portion of the viewport
        setIsAtTop(rect.top >= 0 && rect.top < window.innerHeight * 0.3);
      }
    };

    checkPosition();
    window.addEventListener('scroll', checkPosition, { passive: true });
    window.addEventListener('resize', checkPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkPosition);
      window.removeEventListener('resize', checkPosition);
    };
  }, []);

  const tips = [
    {
      content: (
        <>
          I've shifted from focusing on specific papers or deadlines to building useful artifacts (interfaces, tools, models, etc.) that can help people. This approach is personally more fulfilling, but I find it has frustrated my co-authors when I don't have concrete research questions planned until I see something concrete 😬
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
          , and adding games in our interfaces.
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
            
            {/* Game iframe - responsive to scroll position */}
            {tip.hasGame && (
              <div 
                ref={gameContainerRef}
                className={`overflow-hidden mt-4 ${
                  isAtTop ? 'h-[600px]' : 'h-[200px]'
                }`}
              >
                <div className="relative w-full h-full">
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


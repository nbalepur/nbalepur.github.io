import React, { useEffect } from 'react';
import ThemeEffects from './components/ThemeEffects';
import Penguin from './components/Penguin';
import SiteNav from './components/SiteNav';
import { sections } from './config/sections';

function App() {
  // Lightweight press feedback for cards (no hover, no sticky toggle)
  useEffect(() => {
    const clearActiveCards = () => {
      document.querySelectorAll('.paper-card.card-active').forEach(card => {
        card.classList.remove('card-active');
      });
    };

    const handlePointerDown = (e) => {
      const paperCard = e.target.closest('.paper-card');
      if (!paperCard) return;
      paperCard.classList.add('card-active');
    };

    document.addEventListener('pointerdown', handlePointerDown, { passive: true });
    document.addEventListener('pointerup', clearActiveCards, { passive: true });
    document.addEventListener('pointercancel', clearActiveCards, { passive: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', clearActiveCards);
      document.removeEventListener('pointercancel', clearActiveCards);
    };
  }, []);

  return (
    <div className="app-container min-h-screen" style={{ backgroundColor: 'var(--theme-bg-primary, #f9fafb)' }}>
      <ThemeEffects />
      <Penguin />
      <main className="relative z-10 mx-auto w-full max-w-4xl px-4 sm:px-6 pt-8 sm:pt-12 pb-8">
        <SiteNav />
        {sections.map((section, index) => {
          const Component = section.component;
          const isAbout = section.id === 'about';
          return (
            <div
              key={section.id}
              className={
                index > 0
                  ? 'pt-12 pb-4 border-t border-gray-200 dark:border-gray-700'
                  : 'pb-4'
              }
            >
              <Component title={isAbout ? undefined : section.label} />
            </div>
          );
        })}
        <footer className="mt-4 pt-3 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          This website was created by <s>vibe coding</s> human-AI collaboration.
        </footer>
      </main>
    </div>
  );
}

export default App;

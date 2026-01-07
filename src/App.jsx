import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ThemeEffects from './components/ThemeEffects';
import Penguin from './components/Penguin';
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
    <div className="app-container" style={{ backgroundColor: 'var(--theme-bg-primary, #f9fafb)' }}>
      <ThemeEffects />
      <Penguin />
      <div className="flex flex-col lg:flex-row min-h-screen">
        <Sidebar />
        {/* Main Content */}
        <main className="w-full flex-1 px-4 lg:px-16 xl:px-24 2xl:px-32 pt-8 lg:pt-16 pb-8">
          {sections.map((section, index) => {
            const Component = section.component;
            return (
              <div
                key={section.id}
                className={index > 0 ? "pt-16 pb-4 border-t border-gray-200 dark:border-gray-700" : "pb-4"}
              >
                <Component title={section.label} />
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default App;

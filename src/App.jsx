import React from 'react';
import ThemeEffects from './components/ThemeEffects';
import Penguin from './components/Penguin';
import SiteNav from './components/SiteNav';
import { sections } from './config/sections';

function App() {
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
          This website was proudly created by <s>vibe coding</s> collaborating with Cursor :)
        </footer>
      </main>
    </div>
  );
}

export default App;

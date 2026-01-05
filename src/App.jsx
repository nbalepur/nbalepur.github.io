import React from 'react';
import Sidebar from './components/Sidebar';
import ThemeEffects from './components/ThemeEffects';
import Penguin from './components/Penguin';
import { sections } from './config/sections';

function App() {
  return (
    <div className="app-container" style={{ backgroundColor: 'var(--theme-bg-primary, #f9fafb)' }}>
      <ThemeEffects />
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        {/* Main Content */}
        <main className="w-full flex-1 px-4 md:px-16 lg:px-24 xl:px-32 pt-8 md:pt-16 pb-8">
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
          <Penguin />
        </main>
      </div>
    </div>
  );
}

export default App;

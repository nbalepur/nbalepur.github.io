import React from 'react';
import { useActiveSection } from '../contexts/ActiveSectionContext';
import { sections } from '../config/sections';

function SiteNav() {
  const { activeSection, setActiveSection } = useActiveSection();

  const handleClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      window.history.pushState(null, '', `#${sectionId}`);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      className="sticky top-0 z-50 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-8 border-b backdrop-blur-sm"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--theme-bg-primary, #f9fafb) 92%, transparent)',
        borderBottomColor: 'var(--theme-border, #e5e7eb)',
      }}
    >
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              className={`bg-transparent border-0 p-0 cursor-pointer transition-colors ${
                isActive
                  ? 'text-gray-900 dark:text-white font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {section.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default SiteNav;

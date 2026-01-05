import React from 'react';
import { Coffee } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useActiveSection } from '../contexts/ActiveSectionContext';
import { sections } from '../config/sections';

function Sidebar() {
  const { isDark, unifiedTheme, cycleTheme } = useTheme();
  const { activeSection, setActiveSection } = useActiveSection();

  const renderContactButtons = () => (
    <>
      <a 
        href="https://scholar.google.com/citations?user=YOUR_ID" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        title="Google Scholar"
      >
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5s-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
        </svg>
      </a>
      
      <a 
        href="https://twitter.com/NishantBalepur" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        title="Twitter"
      >
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </a>
      
      <a 
        href="https://github.com/nbalepur" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        title="GitHub"
      >
        <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
      
      <a 
        href="/assets/pdf/cv.pdf" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        title="CV"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">CV</span>
      </a>
    </>
  );

  const renderNavigation = () => (
    <nav className="w-full pt-6 border-t border-gray-200 dark:border-gray-700 md:block">
      <div className="flex flex-row md:flex-col flex-wrap md:flex-nowrap md:space-y-2 gap-x-4 md:gap-x-0 gap-y-2 md:gap-y-0">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a 
              key={section.id}
              href={`#${section.id}`}
              className={`text-xs md:text-sm uppercase tracking-wide transition-all duration-300 flex items-center ${
                isActive
                  ? 'text-gray-900 dark:text-white font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(section.id);
                
                // Use a more robust scroll method with a small delay to ensure DOM is ready
                setTimeout(() => {
                  const element = document.getElementById(section.id);
                  if (element) {
                    // Update URL hash
                    window.history.pushState(null, '', `#${section.id}`);
                    
                    // Use scrollIntoView with proper options for reliable scrolling
                    element.scrollIntoView({ 
                      behavior: 'smooth', 
                      block: 'start',
                      inline: 'nearest'
                    });
                  }
                }, 10);
              }}
            >
              <span
                className={`mr-2 transition-all duration-300 hidden md:inline ${
                  isActive
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2'
                }`}
              >
                &gt;
              </span>
              {section.label}
            </a>
          );
        })}
      </div>
    </nav>
  );

  const themeLabels = {
    light: 'Light',
    dark: 'Dark',
    winter: 'Winter',
    space: 'Space',
    coffee: 'Coffee'
  };

  const getThemeIcon = (unifiedTheme) => {
    switch (unifiedTheme) {
      case 'light':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          </svg>
        );
      case 'dark':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          </svg>
        );
      case 'winter':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v5m0 10v5M2 12h5m10 0h5M6.343 6.343l3.536 3.536m4.242 4.242l3.536 3.536M17.657 6.343l-3.536 3.536m-4.242 4.242L6.343 17.657"/>
          </svg>
        );
      case 'space':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2zM5 5h1m13 0h-1M5 19h1m13 0h-1M12 5v1m0 13v1"/>
          </svg>
        );
      case 'coffee':
        return <Coffee className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const renderThemeToggle = () => (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        cycleTheme();
      }}
      className="flex-shrink-0 w-10 h-10 md:w-full md:py-3 md:px-4 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300 relative z-50"
    >
      {getThemeIcon(unifiedTheme)}
      <span className="text-sm uppercase tracking-wide hidden md:inline">
        {themeLabels[unifiedTheme] || 'Theme'}
      </span>
    </button>
  );

  return (
    <>
      {/* Mobile Layout: Header at top */}
      <aside className="md:hidden w-full border-b p-4 relative z-50" style={{ backgroundColor: 'var(--theme-bg-secondary, #ffffff)', borderBottomColor: 'var(--theme-border, #e5e7eb)' }}>
        <div className="flex items-start space-x-4">
          {/* Photo - Small on mobile */}
          <div className="flex-shrink-0">
            <img 
              src="/assets/images/profile.png" 
              alt="Photo" 
              className="w-16 h-16 rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
          </div>
          
          {/* Name and Email */}
          <div className="flex flex-col flex-1 min-w-0">
            <h1 className="text-lg font-bold text-black dark:text-white truncate">Nishant Balepur</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">CS Ph.D. candidate</p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">nbalepur [at] umd [dot] edu</p>
          </div>
          
          {/* Theme Controls - Compact on mobile */}
          <div className="flex gap-2">
            {renderThemeToggle()}
          </div>
        </div>
        
        {/* Contact Buttons - Below name/email on mobile */}
        <div className="flex flex-row flex-wrap items-center gap-2 mt-3">
          {renderContactButtons()}
        </div>
        
        {/* Navigation Links - Horizontal on mobile */}
        <div className="mt-4">
          {renderNavigation()}
        </div>
      </aside>

      {/* Desktop Layout: Fixed sidebar on left */}
      <aside
        className="sidebar-desktop hidden md:flex md:sticky md:top-0 md:h-screen md:w-1/5 lg:w-72 xl:w-80 border-r p-6 flex-col overflow-y-auto relative z-50 flex-shrink-0"
        style={{ backgroundColor: 'var(--theme-bg-secondary, #ffffff)', borderRightColor: 'var(--theme-border, #e5e7eb)' }}
      >
        <div className="flex flex-col items-center space-y-6 flex-grow">
          {/* Photo */}
          <div className="w-full px-4">
            <img 
              src="/assets/images/profile.png" 
              alt="Photo" 
              className="w-full aspect-square rounded-full object-cover border border-gray-300 dark:border-gray-600"
            />
          </div>
          
          {/* Name */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black dark:text-white">Nishant Balepur</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">CS Ph.D. candidate</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">nbalepur [at] umd [dot] edu</p>
          </div>
          
          {/* Contact Buttons - Wrap to multiple rows if needed */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3">
            {renderContactButtons()}
          </div>
          
          {/* Navigation Links */}
          {renderNavigation()}
        </div>
        
        {/* Theme Controls at Bottom */}
        <div className="flex flex-col gap-2 md:mt-auto">
          {renderThemeToggle()}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
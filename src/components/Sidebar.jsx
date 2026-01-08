import React, { useState, useEffect, useRef } from 'react';
import { 
  Coffee, 
  Menu, 
  X, 
  Link as LinkIcon,
  Lightbulb,
  Moon,
  Snowflake,
  Sparkles,
  Waves,
  Flower2,
  Leaf,
  FileText
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useActiveSection } from '../contexts/ActiveSectionContext';
import { sections } from '../config/sections';

function Sidebar() {
  const { isDark, unifiedTheme, cycleTheme } = useTheme();
  const { activeSection, setActiveSection } = useActiveSection();
  const [isContactMenuOpen, setIsContactMenuOpen] = useState(false);
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const isUpdatingRef = useRef(false);
  const lastStableScrollYRef = useRef(0);

  useEffect(() => {
    // Single threshold - no hysteresis since we're using debouncing
    const scrollThreshold = 50;
    
    const updateScrollState = () => {
      // Prevent updates during transitions to avoid feedback loops
      if (isUpdatingRef.current) {
        return;
      }

      const currentScroll = window.scrollY;
      const newState = currentScroll > scrollThreshold;
      
      setIsScrolled(prev => {
        // Only update if state actually changed
        if (newState !== prev) {
          isUpdatingRef.current = true;
          lastStableScrollYRef.current = currentScroll;
          
          // Release the lock after transition completes (300ms matches CSS transition duration)
          setTimeout(() => {
            isUpdatingRef.current = false;
          }, 350);
          
          return newState;
        }
        
        return prev;
      });
    };

    const handleScroll = () => {
      // Clear any pending timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Only update state after scrolling has stopped (debounced)
      // This prevents feedback loops from layout shifts
      scrollTimeoutRef.current = setTimeout(() => {
        updateScrollState();
      }, 100); // Wait 100ms after scroll stops
    };

    // Initialize
    lastStableScrollYRef.current = window.scrollY;
    updateScrollState();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isNavigationOpen && !event.target.closest('.navigation-dropdown')) {
        setIsNavigationOpen(false);
      }
      if (isContactMenuOpen && !event.target.closest('.contact-dropdown')) {
        setIsContactMenuOpen(false);
      }
    };

    if (isNavigationOpen || isContactMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isNavigationOpen, isContactMenuOpen]);

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

  const handleNavigationClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsNavigationOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        window.history.pushState(null, '', `#${sectionId}`);
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 10);
  };

  const renderContactDropdown = () => (
    <div className="contact-dropdown relative">
      <button
        onClick={() => setIsContactMenuOpen(!isContactMenuOpen)}
        className={`rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center text-gray-700 dark:text-gray-300 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
        aria-label="Contact menu"
        title="Contact"
      >
        <LinkIcon className={`transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
      </button>
      
      {isContactMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 z-50">
          <div className="flex flex-col gap-2 px-2">
            <a 
              href="https://scholar.google.com/citations?user=YOUR_ID" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsContactMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5s-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z"/>
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Google Scholar</span>
            </a>
            
            <a 
              href="https://twitter.com/NishantBalepur" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsContactMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">Twitter</span>
            </a>
            
            <a 
              href="https://github.com/nbalepur" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsContactMenuOpen(false)}
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm text-gray-700 dark:text-gray-300">GitHub</span>
            </a>
            
            <a 
              href="/assets/pdf/cv.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setIsContactMenuOpen(false)}
            >
              <FileText className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="text-sm text-gray-700 dark:text-gray-300">CV</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );

  const renderNavigationDropdown = () => (
    <div className="navigation-dropdown relative">
      <button
        onClick={() => setIsNavigationOpen(!isNavigationOpen)}
        className={`rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center text-gray-700 dark:text-gray-300 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
        aria-label="Navigation menu"
        title="Navigation"
      >
        {isNavigationOpen ? (
          <X className={`transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
        ) : (
          <Menu className={`transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} />
        )}
      </button>
      
      {isNavigationOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 py-2 z-50">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => handleNavigationClick(section.id)}
                className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-700'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {section.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderNavigation = () => (
    <nav className="w-full pt-6 pb-6 lg:pb-8 border-t border-gray-200 dark:border-gray-700 lg:block">
      <div className="grid grid-cols-2 lg:flex lg:flex-col lg:space-y-2 gap-2 lg:gap-0">
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a 
              key={section.id}
              href={`#${section.id}`}
              className={`text-xs lg:text-sm uppercase tracking-wide transition-all duration-300 flex items-center py-2 px-3 rounded lg:rounded-none lg:px-0 lg:py-0 ${
                isActive
                  ? 'text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-800 lg:bg-transparent'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigationClick(section.id);
              }}
            >
              <span
                className={`mr-2 transition-all duration-300 hidden lg:inline ${
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
    coffee: 'Coffee',
    summer: 'Summer',
    spring: 'Spring',
    autumn: 'Autumn'
  };

  const getThemeIcon = (unifiedTheme, size = 'w-5 h-5') => {
    switch (unifiedTheme) {
      case 'light':
        return <Lightbulb className={size} />;
      case 'dark':
        return <Moon className={size} />;
      case 'winter':
        return <Snowflake className={size} />;
      case 'space':
        return <Sparkles className={size} />;
      case 'coffee':
        return <Coffee className={size} />;
      case 'summer':
        return <Waves className={size} />;
      case 'spring':
        return <Flower2 className={size} />;
      case 'autumn':
        return <Leaf className={size} />;
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
      className="flex-shrink-0 w-12 h-12 lg:w-full lg:py-3 lg:px-4 rounded-full lg:rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-center lg:space-x-2 text-gray-700 dark:text-gray-300"
      title={`Theme: ${themeLabels[unifiedTheme] || 'Theme'}`}
    >
      {getThemeIcon(unifiedTheme)}
      <span className="text-sm uppercase tracking-wide hidden lg:inline">
        {themeLabels[unifiedTheme] || 'Theme'}
      </span>
    </button>
  );

  return (
    <>
      {/* Mobile Layout: Sticky Header at top */}
      <aside 
        className={`lg:hidden w-full border-b sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'p-3' : 'p-5'}`} 
        style={{ 
          backgroundColor: 'var(--theme-bg-secondary, #ffffff)', 
          borderBottomColor: 'var(--theme-border, #e5e7eb)'
        }}
      >
        {/* Top Row: Profile Image + Info + Menu/Theme Toggle */}
        <div className={`flex items-center transition-all duration-300 ${isScrolled ? 'gap-2.5' : 'gap-4'}`}>
          {/* Photo */}
          <div className="flex-shrink-0">
            <img 
              src="/assets/images/profile.png" 
              alt="Photo" 
              className={`rounded-full object-cover border border-gray-300 dark:border-gray-600 transition-all duration-300 ${isScrolled ? 'w-14 h-14' : 'w-28 h-28'}`}
            />
          </div>
          
          {/* Name, Email, School Info */}
          <div className="flex flex-col flex-1 min-w-0">
            <h1 className={`font-bold text-black dark:text-white truncate transition-all duration-300 ${isScrolled ? 'text-base' : 'text-xl'}`}>Nishant Balepur</h1>
            <p className={`text-gray-600 dark:text-gray-400 truncate transition-all duration-300 ${isScrolled ? 'text-sm' : 'text-base'}`}>Ph.D. Candidate</p>
            <p className={`text-gray-600 dark:text-gray-400 truncate transition-all duration-300 ${isScrolled ? 'text-xs' : 'text-sm'}`}>nbalepur [at] umd [dot] edu</p>
          </div>
          
          {/* Theme Toggle + Contact Dropdown + Navigation Dropdown */}
          <div className={`flex flex-shrink-0 transition-all duration-300 ${isScrolled ? 'flex-row gap-2' : 'flex-col gap-2.5'}`}>
            {/* Theme Toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                cycleTheme();
              }}
              className={`rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 flex items-center justify-center text-gray-700 dark:text-gray-300 ${isScrolled ? 'w-10 h-10' : 'w-12 h-12'}`}
              title={`Theme: ${themeLabels[unifiedTheme] || 'Theme'}`}
            >
              {getThemeIcon(unifiedTheme, isScrolled ? 'w-5 h-5' : 'w-6 h-6')}
            </button>
            {/* Contact Dropdown */}
            {renderContactDropdown()}
            {/* Navigation Dropdown */}
            {renderNavigationDropdown()}
          </div>
        </div>
      </aside>

      {/* Desktop Layout: Fixed sidebar on left */}
      <aside
        className="sidebar-desktop hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-72 xl:w-80 border-r px-6 pt-6 pb-8 flex-col overflow-y-auto relative z-50 flex-shrink-0"
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
            <p className="text-base text-gray-600 dark:text-gray-400 mt-1">Ph.D. Candidate</p>
            <p className="text-base text-gray-600 dark:text-gray-400 mt-1">nbalepur [at] umd [dot] edu</p>
          </div>
          
          {/* Contact Buttons - Wrap to multiple rows if needed */}
          <div className="flex flex-row flex-wrap items-center justify-center gap-3">
            {renderContactButtons()}
          </div>
          
          {/* Navigation Links */}
          {renderNavigation()}
        </div>
        
        {/* Theme Controls at Bottom */}
        <div className="flex flex-col gap-2 lg:mt-8 items-center pb-2">
          {renderThemeToggle()}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
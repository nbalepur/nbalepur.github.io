import React, { useState, useMemo, useEffect, useRef } from 'react';
import papersJsonl from '../data/papers.jsonl?raw';
import { useFilter } from '../contexts/FilterContext';

// Demo video component that auto-plays, loops, and resets when expanded
const DemoVideo = ({ src, isExpanded }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isExpanded && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => {
        // Auto-play might be blocked by browser, but we'll try
        console.log('Auto-play prevented:', err);
      });
    } else if (!isExpanded && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isExpanded]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(err => {
        console.log('Auto-play prevented on loop:', err);
      });
    };

    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      controls
      className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
    >
      Your browser does not support the video tag.
    </video>
  );
};

const PIVOT_ASPECTS = {
  'Selected': 'selected', // Special case for selected papers
  'Paper Type': 'type',
  'RQ': 'rqs',
  'Domain': 'domain',
  'Contribution': 'contributions',
  'Vibe': 'style'
};

// Parse JSONL into array of papers
const parseJsonl = (jsonlText) => {
  // Split by double newlines (blank lines) to separate JSON objects
  return jsonlText
    .split(/\n\s*\n/)
    .filter(block => block.trim())
    .map(block => JSON.parse(block.trim()));
};

function Research({ title }) {
  const papers = useMemo(() => parseJsonl(papersJsonl), []);
  const { registerFilterFunction } = useFilter();
  // Track expanded content types per paper: { "paperTitle": Set(["video", "demo", "poster", "tldr"]) }
  const [expandedContent, setExpandedContent] = useState(new Map());
  const [pivotAspect, setPivotAspect] = useState('Selected');
  const [activeTab, setActiveTab] = useState('Selected');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredAspect, setHoveredAspect] = useState(null);
  const [filterByTitle, setFilterByTitle] = useState(null);
  const [filterByAuthor, setFilterByAuthor] = useState(null);

  // Dynamically extract unique values for each aspect from the papers data
  const filterOptions = useMemo(() => {
    const options = {
      type: new Set(),
      rqs: new Set(),
      domain: new Set(),
      contributions: new Set(),
      style: new Set()
    };

    papers.forEach(paper => {
      if (paper.type) paper.type.forEach(val => options.type.add(val));
      if (paper.rqs) paper.rqs.forEach(val => options.rqs.add(val));
      if (paper.domain) paper.domain.forEach(val => options.domain.add(val));
      if (paper.contributions) paper.contributions.forEach(val => options.contributions.add(val));
      if (paper.style) paper.style.forEach(val => options.style.add(val));
    });

    // Convert Sets to sorted arrays
    return {
      type: Array.from(options.type).sort(),
      rqs: Array.from(options.rqs).sort(),
      domain: Array.from(options.domain).sort(),
      contributions: Array.from(options.contributions).sort(),
      style: Array.from(options.style).sort()
    };
  }, [papers]);

  const formatAuthors = (authors) => {
    if (authors.length === 0) return '';
    
    const formatAuthor = (author) => {
      if (author === 'Nishant Balepur') {
        return <strong>{author}</strong>;
      }
      return author;
    };
    
    if (authors.length === 1) {
      return formatAuthor(authors[0]);
    }
    
    if (authors.length === 2) {
      return (
        <>
          {formatAuthor(authors[0])} and {formatAuthor(authors[1])}
        </>
      );
    }
    
    return (
      <>
        {authors.slice(0, -1).map((author, index) => (
          <React.Fragment key={index}>
            {formatAuthor(author)}
            {index < authors.length - 2 ? ', ' : ''}
          </React.Fragment>
        ))}
        , and {formatAuthor(authors[authors.length - 1])}
      </>
    );
  };

  const isActualVenue = (venue) => {
    const nonActualVenues = ['Under Review', 'Technical Report'];
    return !nonActualVenues.includes(venue);
  };

  const formatVenue = (venue, year) => {
    if (isActualVenue(venue)) {
      return (
        <>
          <span className="font-bold text-black dark:text-white">{venue}</span>{' '}
          <span className="font-bold text-black dark:text-white">{year}</span>
        </>
      );
    }
    return `${venue} ${year}`;
  };

  const formatTitle = (title) => {
    // Check if this is the "Which of These" paper
    if (title.includes("Which of These Best Describes Multiple Choice Evaluation with LLMs?")) {
      // Split the title to find "D) All of the Above"
      const parts = title.split(/(D\) All of the Above)/);
      if (parts.length > 1) {
        return (
          <>
            {parts[0]}
            <span className="bg-maroon-100 dark:bg-maroon-900/30 px-1 rounded">
              {parts[1]}
            </span>
            {parts[2]}
          </>
        );
      }
    }
    return title;
  };

  const toggleContentExpansion = (paperTitle, contentType) => {
    setExpandedContent(prev => {
      const newMap = new Map(prev);
      const paperSet = newMap.get(paperTitle) || new Set();
      const newSet = new Set(paperSet);
      
      if (newSet.has(contentType)) {
        // If clicking the same content type, close it
        newSet.delete(contentType);
      } else {
        // If opening a different content type, close any open ones first
        newSet.clear();
        newSet.add(contentType);
      }
      
      if (newSet.size > 0) {
        newMap.set(paperTitle, newSet);
      } else {
        newMap.delete(paperTitle);
      }
      
      return newMap;
    });
  };

  const isContentExpanded = (paperTitle, contentType) => {
    const paperSet = expandedContent.get(paperTitle);
    return paperSet ? paperSet.has(contentType) : false;
  };

  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  // Build poster path
  const getPosterPath = (poster) => {
    if (!poster) return null;
    if (poster.startsWith('http://') || poster.startsWith('https://')) {
      return poster;
    }
    // If it already includes 'poster/', use as is, otherwise prepend 'poster/'
    if (poster.startsWith('poster/')) {
      return `/assets/${poster}`;
    }
    return `/assets/poster/${poster}`;
  };

  // Build demo path
  const getDemoPath = (demo) => {
    if (!demo) return null;
    if (demo.startsWith('http://') || demo.startsWith('https://')) {
      return demo;
    }
    // If it already includes 'ui-demos/', use as is, otherwise prepend 'ui-demos/'
    if (demo.startsWith('ui-demos/')) {
      return `/assets/${demo}`;
    }
    return `/assets/ui-demos/${demo}`;
  };


  // Get emoji for a specific tab name
  const getTabEmoji = (tab) => {
    // Map each tab name to a specific emoji
    const emojiMap = {
      // Selected tabs
      'Selected': '⭐',
      '😎 Also Good': '😎',
      
      // Domain
      'Education': '🎓',
      'Question Answering': '🤔',
      'Agents / RAG': '🌐',
      
      // Paper Type
      'Conference': '🏛️',
      'Preprint': '📄',
      'Workshop': '🔧',
      
      // Research Questions
      'Benchmarking': '📊',
      'Factuality': '🤓',
      'Helpfulness': '🤝',
      'Personalization': '🎨',
      
      // Contributions
      'Dataset': '📦',
      'Evaluation': '📈',
      'Modeling': '🤖',
      'User Study': '👥',
      
      // Vibe
      'Analysis Paper': '🔍',
      'Complaining Paper': '😡',
      'Improvement Paper': '💪',

      'Information Extraction': '⛏️',
    };
    
    return emojiMap[tab] || '📌';
  };

  // Get available tabs based on the pivot aspect (or hovered aspect for preview)
  const getTabs = () => {
    const aspectToUse = hoveredAspect || pivotAspect;
    if (aspectToUse === 'Selected') {
      return ['Selected', '😎 Also Good'];
    }
    const aspectKey = PIVOT_ASPECTS[aspectToUse];
    return filterOptions[aspectKey] || [];
  };

  // Handle pivot aspect change
  const handlePivotChange = (newPivot) => {
    setPivotAspect(newPivot);
    setHoveredAspect(null);
    setIsDropdownOpen(false);
    // Reset all other filters
    setFilterByTitle(null);
    setFilterByAuthor(null);
    // Auto-select first tab when pivot changes
    if (newPivot === 'Selected') {
      setActiveTab('Selected');
    } else {
      const aspectKey = PIVOT_ASPECTS[newPivot];
      const firstTab = filterOptions[aspectKey]?.[0] || null;
      setActiveTab(firstTab);
    }
  };


  // Handle tab selection
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Reset all other filters
    setFilterByTitle(null);
    setFilterByAuthor(null);
  };

  // Register filter function for external use (from About component)
  useEffect(() => {
    const filterAndScroll = (pivot, tab, title = null, author = null) => {
      if (author) {
        // Filter by author
        setFilterByAuthor(author);
        setFilterByTitle(null);
        setPivotAspect('Selected');
        setActiveTab('😎 Also Good');
      } else if (title) {
        // Filter by title
        setFilterByTitle(title);
        setFilterByAuthor(null);
        setPivotAspect('Selected');
        setActiveTab('😎 Also Good');
      } else {
        // Normal filtering
        setFilterByTitle(null);
        setFilterByAuthor(null);
        setPivotAspect(pivot);
        setActiveTab(tab);
      }
      setHoveredAspect(null);
      setIsDropdownOpen(false);
      // Scroll to research section
      setTimeout(() => {
        const researchSection = document.getElementById('research');
        if (researchSection) {
          researchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    };
    registerFilterFunction(filterAndScroll);
  }, [registerFilterFunction]);

  // Calculate paper count for each tab (using hovered aspect for preview)
  const getTabCount = (tab) => {
    const aspectToUse = hoveredAspect || pivotAspect;
    if (aspectToUse === 'Selected') {
      if (tab === 'Selected') {
        return papers.filter(paper => paper.selected === true).length;
      } else if (tab === '😎 Also Good') {
        return papers.length;
      }
      return 0;
    }
    
    const aspectKey = PIVOT_ASPECTS[aspectToUse];
    if (aspectKey) {
      return papers.filter(paper => {
        const paperValues = paper[aspectKey] || [];
        return paperValues.includes(tab);
      }).length;
    }
    
    return 0;
  };

  const filteredPapers = useMemo(() => {
    let filtered = [...papers];
    
    // If filtering by author, filter papers that contain this author
    // Author names in papers may include special characters like † (U+2020) and *, so we remove them for comparison
    if (filterByAuthor) {
      filtered = filtered.filter(paper => {
        return paper.authors.some(author => {
          // Remove special characters (dagger † U+2020 and asterisk *) for comparison
          const cleanAuthor = author.replace(/\u2020|\*/g, '').trim();
          const cleanFilterName = filterByAuthor.trim();
          return cleanAuthor === cleanFilterName;
        });
      });
      return filtered;
    }
    
    // If filtering by title, show only that paper
    if (filterByTitle) {
      return filtered.filter(paper => paper.title === filterByTitle);
    }
    
    const aspectToUse = hoveredAspect || pivotAspect;
    
    // When hovering, use the first tab of that aspect (0th index)
    let tabToUse = activeTab;
    if (hoveredAspect) {
      if (hoveredAspect === 'Selected') {
        tabToUse = 'Selected';
      } else {
        const aspectKey = PIVOT_ASPECTS[hoveredAspect];
        const firstTab = filterOptions[aspectKey]?.[0] || null;
        tabToUse = firstTab;
      }
    }

    // If no tab is selected, show all papers
    if (!tabToUse) {
      return filtered;
    }

    // Handle Selected pivot aspect
    if (aspectToUse === 'Selected') {
      if (tabToUse === 'Selected') {
        return filtered.filter(paper => paper.selected === true);
      } else if (tabToUse === '😎 Also Good') {
        return filtered;
      }
      return filtered;
    }

    // Filter by the selected aspect and tab value
    const aspectKey = PIVOT_ASPECTS[aspectToUse];
    if (aspectKey) {
      filtered = filtered.filter(paper => {
        const paperValues = paper[aspectKey] || [];
        return paperValues.includes(tabToUse);
      });
    }

    return filtered;
  }, [papers, pivotAspect, activeTab, hoveredAspect, filterOptions, filterByTitle, filterByAuthor]);

  const tabs = getTabs();

  return (
    <section id="research" className="mb-12">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        
        {/* Controls: Group by selector and filter tabs */}
        <div className="mb-6">
          {/* Group by selector with horizontal dropdown */}
          <div className="pivot-dropdown-container flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-sm uppercase tracking-wide font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">Group by:</span>
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm whitespace-nowrap"
              >
                <span>{pivotAspect}</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            {/* Dropdown Options - horizontal row to the right of the button */}
            {isDropdownOpen && (
              <div 
                className="flex flex-row flex-wrap items-center gap-2 pivot-dropdown-options"
                onMouseLeave={() => {
                  setHoveredAspect(null);
                }}
              >
                {Object.keys(PIVOT_ASPECTS).map((aspect, index) => {
                  if (aspect === pivotAspect) return null;
                  return (
                    <button
                      key={aspect}
                      onMouseEnter={() => setHoveredAspect(aspect)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setHoveredAspect(null);
                        handlePivotChange(aspect);
                      }}
                      className={`text-sm font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-500 hover:shadow-md transition-all duration-200 shadow-sm whitespace-nowrap ${
                        aspect === pivotAspect ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } animate-fade-in`}
                      style={{
                        animationDelay: `${index * 30}ms`,
                        animationFillMode: 'both',
                      }}
                    >
                      {aspect}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pb-1">
            {tabs.map((tab, index) => {
              let isActive = false;
              if (hoveredAspect) {
                // When hovering, highlight the first tab (0th index)
                isActive = index === 0;
              } else {
                isActive = activeTab === tab;
              }
              const count = getTabCount(tab);
              // Check if tab already starts with an emoji (like '😎 Also Good')
              const hasEmoji = /^[\p{Emoji}\u200d]+/u.test(tab);
              const emoji = hasEmoji ? '' : getTabEmoji(tab) + ' ';
              return (
                <button
                  key={tab}
                  onClick={(e) => {
                    handleTabClick(tab);
                    e.currentTarget.blur();
                  }}
                  className={`text-sm uppercase tracking-wide transition-all duration-200 pt-1.5 pb-1 border-b-2 ${
                    isActive
                      ? 'font-bold text-gray-900 dark:text-white border-gray-900 dark:border-white'
                      : 'font-normal text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {emoji}{tab} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <a 
          href="https://scholar.google.com/citations?user=YOUR_ID" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 underline"
        >
          All papers on Google Scholar
        </a>
        . * means equal contribution, † means mentored student.
      </p>

      <div className="space-y-4" style={{ overflow: 'visible' }}>
        {filteredPapers.length === 0 ? (
          <div className="text-center py-8 bg-gray-100 dark:bg-gray-700">
            <p className="text-gray-500 dark:text-gray-400">No papers match the selected filter.</p>
          </div>
        ) : (
          filteredPapers.map((paper, index) => (
          <div key={paper.title} data-paper-title={paper.title} className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-2">
              {paper.image && (
                <div className="mb-3">
                  <img 
                    src={paper.image} 
                    alt={paper.title}
                    className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {(paper.links?.pdf || paper.links?.url) ? (
                  <a
                    href={paper.links?.pdf || paper.links?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-900 dark:text-white hover:underline"
                  >
                    {formatTitle(paper.title)}
                  </a>
                ) : (
                  formatTitle(paper.title)
                )}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                {formatAuthors(paper.authors)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {formatVenue(paper.venue, paper.year)}
                {paper.awards && (
                  <>
                    <span className="text-gray-400 dark:text-gray-500"> • </span>
                    <span className="text-maroon-600 dark:text-maroon-400 font-semibold not-italic">
                      {paper.awards}
                    </span>
                  </>
                )}
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-1 mt-2 text-sm text-gray-600 dark:text-gray-400">
              {/* Links that open in new tabs: Paper, Code, Poster */}
              {[
                (paper.links?.pdf || paper.links?.url) && {
                  type: 'link',
                  href: paper.links?.pdf || paper.links?.url,
                  label: 'Paper',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  )
                },
                paper.links?.code && {
                  type: 'link',
                  href: paper.links.code,
                  label: 'Code',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  )
                },
                paper.links?.poster && {
                  type: 'link',
                  href: getPosterPath(paper.links.poster),
                  label: 'Poster',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  )
                }
              ].filter(Boolean).map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="mx-1.5 text-gray-400 dark:text-gray-500">/</span>}
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-1"
                  >
                    {item.icon}
                    {item.label}
                  </a>
                </React.Fragment>
              ))}
              
              {/* Separator bullet if we have both links and expandable content */}
              {[
                ...((paper.links?.pdf || paper.links?.url) ? [1] : []),
                ...(paper.links?.code ? [1] : []),
                ...(paper.links?.poster ? [1] : [])
              ].filter(Boolean).length > 0 && [
                ...(paper.links?.video && extractYouTubeId(paper.links.video) ? [1] : []),
                ...(paper.links?.demo ? [1] : []),
                ...(paper.description ? [1] : [])
              ].filter(Boolean).length > 0 && (
                <>
                  <span className="mx-1.5 text-gray-400 dark:text-gray-500">•</span>
                </>
              )}

              {/* Expandable content: Video, Demo, TL;DR */}
              {[
                paper.links?.video && extractYouTubeId(paper.links.video) && {
                  type: 'button',
                  onClick: () => toggleContentExpansion(paper.title, 'video'),
                  label: 'Embarrassing Video',
                  isExpanded: isContentExpanded(paper.title, 'video'),
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                },
                paper.links?.demo && {
                  type: 'button',
                  onClick: () => toggleContentExpansion(paper.title, 'demo'),
                  label: 'UI Demo',
                  isExpanded: isContentExpanded(paper.title, 'demo'),
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )
                },
                paper.description && {
                  type: 'button',
                  onClick: () => toggleContentExpansion(paper.title, 'tldr'),
                  label: 'TL;DR',
                  isExpanded: isContentExpanded(paper.title, 'tldr'),
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  )
                }
              ].filter(Boolean).map((item, idx, arr) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="mx-1.5 text-gray-400 dark:text-gray-500">/</span>}
                  <button
                    onClick={item.onClick}
                    className={`hover:text-gray-900 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex items-center gap-1 ${item.isExpanded ? 'font-semibold' : ''}`}
                    aria-label={item.isExpanded ? `Hide ${item.label}` : `Show ${item.label}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
            
            {/* Expanded content sections - each content type expands independently */}
            {/* YouTube Video */}
            {paper.links?.video && extractYouTubeId(paper.links.video) && (
              <div className={`overflow-hidden transition-all duration-300 ${
                isContentExpanded(paper.title, 'video') ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${extractYouTubeId(paper.links.video)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Demo Video */}
            {paper.links?.demo && (
              <div className={`overflow-hidden transition-all duration-300 ${
                isContentExpanded(paper.title, 'demo') ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
                <DemoVideo
                  src={getDemoPath(paper.links.demo)}
                  isExpanded={isContentExpanded(paper.title, 'demo')}
                />
              </div>
            )}

            {/* TL;DR Description */}
            {paper.description && (
              <div className={`overflow-hidden transition-all duration-300 ${
                isContentExpanded(paper.title, 'tldr') ? 'max-h-[300px] opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}>
                <div>
                  <p className="pl-3 border-l-2 border-beige-600 dark:border-beige-400 text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">
                    {paper.description}
                  </p>
                </div>
              </div>
            )}
          </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Research;

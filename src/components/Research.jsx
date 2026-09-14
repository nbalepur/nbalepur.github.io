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

const INITIAL_PAPER_COUNT = 5;

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
  const [showAllPapers, setShowAllPapers] = useState(false);

  // Helper to check if device supports hover
  const supportsHover = () => {
    return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  };

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

  const formatVenue = (venue, year) => (
    <em className="text-gray-500 dark:text-gray-400 italic">
      {venue} {year}
    </em>
  );

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
    const aspectToUse = hoveredAspect || pivotAspect;
    // "Evaluation" is both an RQ and a Contribution — disambiguate by aspect
    if (tab === 'Evaluation') {
      return aspectToUse === 'Contribution' ? '📈' : '📊';
    }

    const emojiMap = {
      // Selected tabs
      'Selected': '⭐',
      '😎 Also Good': '😎',
      
      // Domain
      'Education': '🎓',
      'Question Answering': '🤔',
      'Agents / RAG': '🧰',
      
      // Paper Type
      'Conference': '🏛️',
      'Preprint': '📄',
      'Workshop': '🔧',
      
      // Research Questions
      'Factuality': '🤓',
      'Human-AI Collaboration': '🤝',
      'Personalization': '🎨',
      
      // Contributions
      'Dataset': '📦',
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

  // Collapse the list again when filters change
  useEffect(() => {
    setShowAllPapers(false);
  }, [pivotAspect, activeTab, hoveredAspect, filterByTitle, filterByAuthor]);

  const previewPapers = filteredPapers.slice(0, INITIAL_PAPER_COUNT);
  const restPapers = filteredPapers.slice(INITIAL_PAPER_COUNT);
  const hasMorePapers = restPapers.length > 0;
  const hiddenCount = restPapers.length;

  const renderPaper = (paper) => {
    const pdfHref = paper.links?.pdf || paper.links?.url;
    const youtubeId = extractYouTubeId(paper.links?.video);
    const externalLinks = [
      pdfHref && { href: pdfHref, label: 'Paper' },
      paper.links?.code && { href: paper.links.code, label: 'Code' },
      paper.links?.poster && { href: getPosterPath(paper.links.poster), label: 'Poster' },
    ].filter(Boolean);
    const expandable = [
      youtubeId && { type: 'video', label: 'Embarrassing Video' },
      paper.links?.demo && { type: 'demo', label: 'UI Demo' },
      paper.description && { type: 'tldr', label: 'TL;DR' },
    ].filter(Boolean);
    const linkClass =
      'inline-block mr-1.5 text-[13px] leading-snug text-maroon-600 dark:text-maroon-400 hover:underline';

    return (
      <article key={paper.title} data-paper-title={paper.title} className="py-4 first:pt-1">
        <h3 className="text-[16px] font-bold text-gray-900 dark:text-white leading-snug mb-0.5">
          {pdfHref ? (
            <a
              href={pdfHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {formatTitle(paper.title)}
            </a>
          ) : (
            formatTitle(paper.title)
          )}
        </h3>
        <p className="text-[15px] text-gray-700 dark:text-gray-300 leading-[1.48]">
          {formatAuthors(paper.authors)}
        </p>
        <p className="text-[15px] leading-[1.48] mt-0.5">
          {formatVenue(paper.venue, paper.year)}
          {paper.awards && (
            <>
              <span className="text-gray-400 dark:text-gray-500"> · </span>
              <span className="text-maroon-600 dark:text-maroon-400 font-medium not-italic">
                {paper.awards}
              </span>
            </>
          )}
        </p>
        {(externalLinks.length > 0 || expandable.length > 0) && (
          <p className="mt-1">
            {externalLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                [{item.label}]
              </a>
            ))}
            {expandable.map((item) => (
              <button
                key={item.type}
                type="button"
                onClick={() => toggleContentExpansion(paper.title, item.type)}
                className={`${linkClass} bg-transparent border-0 p-0 cursor-pointer ${
                  isContentExpanded(paper.title, item.type) ? 'font-semibold' : ''
                }`}
                aria-label={isContentExpanded(paper.title, item.type) ? `Hide ${item.label}` : `Show ${item.label}`}
              >
                [{item.label}]
              </button>
            ))}
          </p>
        )}

        {youtubeId && (
          <div className={`overflow-hidden transition-all duration-300 ${
            isContentExpanded(paper.title, 'video') ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}>
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {paper.links?.demo && (
          <div className={`overflow-hidden transition-all duration-300 ${
            isContentExpanded(paper.title, 'demo') ? 'max-h-[600px] opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}>
            <DemoVideo
              src={getDemoPath(paper.links.demo)}
              isExpanded={isContentExpanded(paper.title, 'demo')}
            />
          </div>
        )}

        {paper.description && (
          <div className={`overflow-hidden transition-all duration-300 ${
            isContentExpanded(paper.title, 'tldr') ? 'max-h-[300px] opacity-100 mt-3' : 'max-h-0 opacity-0'
          }`}>
            <p className="pl-3 border-l-2 border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 text-sm leading-relaxed italic">
              {paper.description}
            </p>
          </div>
        )}
      </article>
    );
  };

  return (
    <section id="research" className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        
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
                  if (supportsHover()) {
                    setHoveredAspect(null);
                  }
                }}
              >
                {Object.keys(PIVOT_ASPECTS).map((aspect, index) => {
                  if (aspect === pivotAspect) return null;
                  return (
                    <button
                      key={aspect}
                      onMouseEnter={() => {
                        if (supportsHover()) {
                          setHoveredAspect(aspect);
                        }
                      }}
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
          href="https://scholar.google.com/citations?user=G8_fojUAAAAJ" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 underline"
        >
          All papers on Google Scholar
        </a>
        . * means equal contribution, † means mentored student.
      </p>

      <div style={{ overflow: 'visible' }}>
        {filteredPapers.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 py-4">No papers match the selected filter.</p>
        ) : (
          <>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {previewPapers.map(renderPaper)}
            </div>
            {hasMorePapers && (
              <button
                type="button"
                onClick={() => setShowAllPapers((prev) => !prev)}
                className="group flex w-full items-center gap-3 py-2.5 text-sm text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors bg-transparent border-0 cursor-pointer"
                aria-expanded={showAllPapers}
              >
                <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors" />
                <span className="shrink-0 tracking-wide lowercase">
                  {showAllPapers ? 'see less' : `see more (${hiddenCount})`}
                </span>
                <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700 group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors" />
              </button>
            )}
            {showAllPapers && hasMorePapers && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {restPapers.map(renderPaper)}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Research;

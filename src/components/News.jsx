import React, { useState } from 'react';
import { useFilter } from '../contexts/FilterContext';
import positiveNewsData from '../data/positive-news.json';
import negativeNewsData from '../data/negative-news.json';

function News({ title }) {
  const [isHovering, setIsHovering] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { filterByPaperTitle } = useFilter();
  const positiveHighlights = positiveNewsData.highlights;
  const negativeHighlights = negativeNewsData.highlights;

  // Helper to check if device supports hover
  const supportsHover = () => {
    return typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;
  };

  // Helper to check if we're on mobile (below xl breakpoint)
  const checkIsMobile = () => {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 1279px)').matches;
  };
  
  // Allow hover to work in both single column and multi-column layouts
  const getIsNegativeVisible = () => {
    return isHovering || isExpanded;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  const handlePaperClick = (paperTitle, e, isNegativeSection = false) => {
    e.preventDefault();
    // Don't navigate if clicking in negative section and it's not visible
    if (isNegativeSection && !getIsNegativeVisible()) {
      return;
    }
    filterByPaperTitle(paperTitle);
  };

  const handleExternalLinkClick = (e, isNegativeSection = false) => {
    // Don't navigate if clicking in negative section and it's not visible
    if (isNegativeSection && !getIsNegativeVisible()) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const renderTextWithLinks = (text, paperLinks, isNegativeSection = false) => {
    if (!paperLinks) return text;

    // Sort keys by length (longest first) to handle overlapping matches correctly
    const linkKeys = Object.keys(paperLinks).sort((a, b) => b.length - a.length);
    
    // Create a regex pattern that matches whole words only
    const parts = [];
    let lastIndex = 0;
    const textLower = text.toLowerCase();
    
    // Find all matches with their positions
    const matches = [];
    linkKeys.forEach(key => {
      const keyLower = key.toLowerCase();
      const regex = new RegExp(`\\b${keyLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          key: key,
          paperTitle: paperLinks[key]
        });
      }
    });
    
    // Sort matches by start position
    matches.sort((a, b) => a.start - b.start);
    
    // Remove overlapping matches (keep the first one)
    const nonOverlappingMatches = [];
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (nonOverlappingMatches.length === 0 || 
          match.start >= nonOverlappingMatches[nonOverlappingMatches.length - 1].end) {
        nonOverlappingMatches.push(match);
      }
    }
    
    // Build the JSX with links
    const elements = [];
    nonOverlappingMatches.forEach((match, index) => {
      // Add text before the match
      if (match.start > lastIndex) {
        elements.push(text.substring(lastIndex, match.start));
      }
      
      // Add the link
      const matchedText = text.substring(match.start, match.end);
      elements.push(
        <a
          key={index}
          href="#"
          onClick={(e) => handlePaperClick(match.paperTitle, e, isNegativeSection)}
          className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
        >
          {matchedText}
        </a>
      );
      
      lastIndex = match.end;
    });
    
    // Add remaining text
    if (lastIndex < text.length) {
      elements.push(text.substring(lastIndex));
    }
    
    return elements.length > 0 ? elements : text;
  };

  const renderHighlights = (highlights, isNegativeSection = false) => (
    <div className="space-y-3">
      {highlights.map((item, index) => {
        let textContent;
        if (item.externalLink) {
          // Handle external links - replace linkText with actual link
          const linkText = item.linkText || item.externalLink;
          const linkIndex = item.text.indexOf(linkText);
          if (linkIndex !== -1) {
            const beforeText = item.text.substring(0, linkIndex);
            const afterText = item.text.substring(linkIndex + linkText.length);
            textContent = (
              <>
                {beforeText}
                <a
                  href={item.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleExternalLinkClick(e, isNegativeSection)}
                  className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
                >
                  {linkText}
                </a>
                {afterText}
              </>
            );
          } else {
            // If linkText not found, just show text with link at end
            textContent = (
              <>
                {item.text}{' '}
                <a
                  href={item.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleExternalLinkClick(e, isNegativeSection)}
                  className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
                >
                  {linkText}
                </a>
              </>
            );
          }
        } else if (item.paperLinks) {
          textContent = renderTextWithLinks(item.text, item.paperLinks, isNegativeSection);
        } else if (item.paperTitle) {
          textContent = (
            <a
              href="#"
              onClick={(e) => handlePaperClick(item.paperTitle, e, isNegativeSection)}
              className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
            >
              {item.text}
            </a>
          );
        } else {
          textContent = item.text;
        }

        return (
          <div key={index} className="flex items-start space-x-3">
            <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[100px]">{formatDate(item.date)}</span>
            <span className="text-gray-700 dark:text-gray-300">{textContent}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section id="news" className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Positive Highlights */}
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Good News! 🎉</h3>
          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg min-h-[300px]">
            <div className="overflow-y-auto max-h-[300px] pr-2 p-4">
              {renderHighlights(positiveHighlights)}
            </div>
          </div>
        </div>

        {/* Negative Highlights - Easter Egg */}
        <div 
          className="flex flex-col"
          onMouseEnter={() => {
            if (supportsHover()) {
              setIsHovering(true);
            }
          }}
          onMouseLeave={() => {
            if (supportsHover()) {
              setIsHovering(false);
            }
          }}
        >
          <div className="mb-3">
            <div
              className={`transition-opacity duration-300 ${getIsNegativeVisible() ? 'opacity-100' : 'opacity-0'}`}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Negative Results 😭</h3>
            </div>
          </div>
          <div 
            onClick={(e) => {
              // Make entire div clickable on mobile (below xl breakpoint) for touch devices
              // Hover works in all layouts, but click provides an alternative for touch devices
              if (checkIsMobile()) {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }
            }}
            className={`paper-card min-h-[300px] transition-all duration-300 relative cursor-pointer xl:cursor-auto ${
              getIsNegativeVisible()
                ? 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:-translate-y-1 hover:shadow-lg' 
                : 'bg-transparent border border-dashed border-gray-300 dark:border-gray-600'
            }`}
          >
            {!getIsNegativeVisible() && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                <span className="text-4xl">👀</span>
              </div>
            )}
            <div className={`overflow-y-auto max-h-[300px] pr-2 p-4 transition-opacity duration-300 ${getIsNegativeVisible() ? 'opacity-100' : 'opacity-0'}`}>
              {renderHighlights(negativeHighlights, true)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default News;


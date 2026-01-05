import React from 'react';
import { useFilter } from '../contexts/FilterContext';

function Experience({ title }) {
  const { filterByPaperTitle } = useFilter();
  
  const handlePaperClick = (paperTitle, e) => {
    e.preventDefault();
    filterByPaperTitle(paperTitle);
  };
  
  return (
    <section id="experience" className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      
      {/* Education */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Education</h3>
        <div className="space-y-4">
          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">University of Maryland, College Park</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Aug 2023 - May 2027 (Expected)</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Ph.D. Computer Science • GPA: 4.00/4.00</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-1">
              Advisors: <a href="https://users.umiacs.umd.edu/~ying/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Jordan Boyd-Graber</a>, <a href="https://rudinger.github.io/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Rachel Rudinger</a>
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Thesis (Proposed): <a href="/assets/pdf/thesis-proposal.pdf" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Teaching AI to Answer Questions with Reasoning that Actually Helps You</a>
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">New York University</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Aug 2025 - May 2026</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Visiting Student</p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Host: <a href="https://eunsol.github.io/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Eunsol Choi</a>
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">University of Illinois at Urbana-Champaign</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Aug 2019 - May 2023</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">B.S. Computer Science; B.S. Statistics • GPA: 4.00/4.00</p>
          </div>
        </div>
      </div>

      {/* Industry Research Experience */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Industry Research</h3>
        <div className="space-y-4">
          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Microsoft Research (MSR)</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">May 2026 - Aug 2026</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Incoming Research Intern: AI Interaction and Learning</p>
            <p className="mt-2 pl-3 border-l-2 border-beige-600 dark:border-beige-400 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <span className="font-semibold">Outcome:</span> 🤷
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Allen Institute for Artificial Intelligence (Ai2)</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">May 2025 - May 2026</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Research Scientist Intern: Semantic Scholar</p>
            <p className="mt-2 pl-3 border-l-2 border-beige-600 dark:border-beige-400 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <span className="font-semibold">Outcome:</span> One paper submitted on <a href="#" onClick={(e) => handlePaperClick("Language Models Dont Know What You Want: Evaluating Personalization in Deep Research Needs Real Users", e)} className="text-maroon-600 dark:text-maroon-400 hover:underline">personalized deep research</a>, one paper submitted on <a href="#" onClick={(e) => handlePaperClick("AstaBench: Rigorous Benchmarking of AI Agents with a Scientific Research Suite", e)} className="text-maroon-600 dark:text-maroon-400 hover:underline">benchmarking scientific agents</a>.
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Adobe</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">May 2024 - Aug 2024</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Research Scientist Intern: Document Intelligence</p>
            <p className="mt-2 pl-3 border-l-2 border-beige-600 dark:border-beige-400 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <span className="font-semibold">Outcome:</span> Patent, <a href="#" onClick={(e) => handlePaperClick("MoDS: Moderating a Mixture of Document Speakers to Summarize Debatable Queries in Document Collections", e)} className="text-maroon-600 dark:text-maroon-400 hover:underline">Paper at NAACL 2025 on multi-LLM QA</a>.
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Meta</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">May 2022 - Aug 2022</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-1">Software Engineering Intern: Facebook Creators Well-being (Comment Safety)</p>
            <p className="mt-2 pl-3 border-l-2 border-beige-600 dark:border-beige-400 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              <span className="font-semibold">Outcome:</span> 15% drop in negative interactions among Facebook's 1 billion users
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;


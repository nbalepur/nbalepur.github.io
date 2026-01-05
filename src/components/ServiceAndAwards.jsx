import React, { useState } from 'react';
import { useFilter } from '../contexts/FilterContext';

function ServiceAndAwards({ title }) {
  const [showEvidence2025, setShowEvidence2025] = useState(false);
  const [showEvidence2024, setShowEvidence2024] = useState(false);
  const { filterByPaperTitle } = useFilter();
  
  const handlePaperClick = (paperTitle, e) => {
    e.preventDefault();
    filterByPaperTitle(paperTitle);
  };

  return (
    <section id="service-and-awards" className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      
      {/* Fellowships and Grants */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Fellowships and Grants</h3>
        <div className="space-y-4">
          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                <a 
                  href="https://www.nsfgrfp.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
                >
                  NSF Graduate Research Fellowship
                </a>
              </h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Apr 2023 - Apr 2028</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Wrote proposal on NLP for information accessibility—$159,000 over 3 Years of Ph.D.
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                <a 
                  href="https://cohere.com/blog/granting-access" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
                >
                  Cohere for AI Research Grant (2x)
                </a>
              </h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Apr 2024</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Accepted proposal on LLM for Education and AI Safety—full access to Cohere models
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                <a 
                  href="https://gradschool.umd.edu/funding/student-fellowships-awards/university-deans-and-merit-program" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-maroon-600 dark:text-maroon-400 hover:text-maroon-700 dark:hover:text-maroon-300 hover:underline"
                >
                  Dean's Fellowship
                </a>
              </h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Apr 2023 - Apr 2025</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Awarded the Dean's Fellowship from UMD for outstanding academic achievement
            </p>
          </div>
        </div>
      </div>

      {/* Awards */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Awards</h3>
        <div className="space-y-4">
          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">MASC-SLL 2025 Best Paper Award</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Apr 2025</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Best paper award for our <a href="#" onClick={(e) => handlePaperClick("Which of These Best Describes Multiple Choice Evaluation with LLMs? A) Forced B) Flawed C) Fixable D) All of the Above", e)} className="text-maroon-600 dark:text-maroon-400 hover:underline">MCQA Position Paper</a> by PSU
            </p>
            <button
              onClick={() => setShowEvidence2025(!showEvidence2025)}
              className="text-sm text-maroon-700 dark:text-maroon-400 hover:text-maroon-800 dark:hover:text-maroon-300 hover:underline flex items-center gap-1 transition-all"
            >
              🕵️ Proof <span className={`inline-block w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-current transition-transform duration-200 ${showEvidence2025 ? 'rotate-180' : ''}`}></span>
            </button>
            {showEvidence2025 && (
              <div className="mt-3">
                <img 
                  src="/assets/images/masc2025.jpg" 
                  alt="MASC-SLL 2025 Best Paper Award" 
                  className="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">MASC-SLL 2024 Best Paper Award</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">May 2024</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
              Best paper award for <a href="#" onClick={(e) => handlePaperClick("Artifacts or Abduction: How Do LLMs Answer Multiple-Choice Questions Without the Question?", e)} className="text-maroon-600 dark:text-maroon-400 hover:underline">"Artifacts or Abduction"</a> by JHU
            </p>
            <button
              onClick={() => setShowEvidence2024(!showEvidence2024)}
              className="text-sm text-maroon-700 dark:text-maroon-400 hover:text-maroon-800 dark:hover:text-maroon-300 hover:underline flex items-center gap-1 transition-all"
            >
              🕵️ Proof <span className={`inline-block w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-current transition-transform duration-200 ${showEvidence2024 ? 'rotate-180' : ''}`}></span>
            </button>
            {showEvidence2024 && (
              <div className="mt-3">
                <img 
                  src="/assets/images/masc2024.jpg" 
                  alt="MASC-SLL 2024 Best Paper Award" 
                  className="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">UIUC CS Graduation with Highest Honors</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">May 2023</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Recommended by the UIUC computer science department to graduate with highest honors
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">C.W. Gear Outstanding Undergraduate Student</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">May 2022</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Awarded to two seniors that have demonstrated excellence in research and service
            </p>
          </div>
        </div>
      </div>

      {/* Professional Service */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Professional Service</h3>
        <div className="space-y-4">
          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Conference Reviewer</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">2022-Present</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
              Reviewer for: *ACL/ARR 2023-Present, IEEE TASLP 2024, TrustNLP 2024, SRW 2025
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="font-semibold">Great Reviewer Nomination:</span> Apr, June (#6), Aug (#4), Oct (#2), Dec 2024, Feb 2025 ARR
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              <span className="font-semibold">Outstanding Reviewer:</span> EMNLP 2024 • EMNLP 2025
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Conference Volunteer</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">2023, 2025</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              ACL 2023, NAACL 2025
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Visiting Student Day Volunteer</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Mar 2024, 2025</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Volunteer and ambassador for UMD's visiting student day
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">Winter Storm LLM Workshop</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Jan 2023</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              Led a 5-day workshop on LLMs for non-CS graduate students
            </p>
          </div>

          <div className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">SIGNLL @ UIUC</h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">Aug 2020 - May 2021</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              President of Special Interest Group for Natural Language Learning
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceAndAwards;


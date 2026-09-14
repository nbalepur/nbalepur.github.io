import React, { useState } from 'react';
import { useFilter } from '../contexts/FilterContext';

const linkClass = 'text-maroon-600 dark:text-maroon-400 hover:underline';

function Entry({ title, dates, children }) {
  return (
    <div className="py-3 first:pt-0">
      <div className="flex items-baseline justify-between gap-x-4 gap-y-0.5 flex-wrap">
        <h4 className="text-[16px] font-bold text-gray-900 dark:text-white leading-snug">{title}</h4>
        <span className="text-[13.5px] text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">{dates}</span>
      </div>
      {children && (
        <div className="text-[15px] leading-[1.48] text-gray-700 dark:text-gray-300">{children}</div>
      )}
    </div>
  );
}

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
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Fellowships and Grants</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <Entry
            title={
              <a href="https://www.nsfgrfp.org/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                NSF Graduate Research Fellowship
              </a>
            }
            dates="Apr 2023 – Apr 2028"
          >
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Wrote proposal on NLP for information accessibility—$159,000 over 3 Years of Ph.D.
            </p>
          </Entry>

          <Entry
            title={
              <a href="https://cohere.com/blog/granting-access" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Cohere for AI Research Grant (2x)
              </a>
            }
            dates="Apr 2024"
          >
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Accepted proposal on LLM for Education and AI Safety—full access to Cohere models
            </p>
          </Entry>

          <Entry
            title={
              <a href="https://gradschool.umd.edu/funding/student-fellowships-awards/university-deans-and-merit-program" target="_blank" rel="noopener noreferrer" className={linkClass}>
                Dean&apos;s Fellowship
              </a>
            }
            dates="Apr 2023 – Apr 2025"
          >
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Awarded the Dean&apos;s Fellowship from UMD for outstanding academic achievement
            </p>
          </Entry>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Awards</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <Entry title="MASC-SLL 2025 Best Paper Award" dates="Apr 2025">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Best paper award for our{' '}
              <a href="#" onClick={(e) => handlePaperClick("Which of These Best Describes Multiple Choice Evaluation with LLMs? A) Forced B) Flawed C) Fixable D) All of the Above", e)} className={linkClass}>MCQA Position Paper</a>
              {' '}by PSU
            </p>
            <button
              type="button"
              onClick={() => setShowEvidence2025(!showEvidence2025)}
              className="mt-1 text-[13px] text-maroon-600 dark:text-maroon-400 hover:underline bg-transparent border-0 p-0 cursor-pointer inline-flex items-center gap-1"
            >
              🕵️ Proof <span className={`inline-block w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-current transition-transform duration-200 ${showEvidence2025 ? 'rotate-180' : ''}`}></span>
            </button>
            {showEvidence2025 && (
              <div className="mt-2">
                <img 
                  src="/assets/images/masc2025.jpg" 
                  alt="MASC-SLL 2025 Best Paper Award" 
                  className="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
          </Entry>

          <Entry title="MASC-SLL 2024 Best Paper Award" dates="May 2024">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Best paper award for{' '}
              <a href="#" onClick={(e) => handlePaperClick("Artifacts or Abduction: How Do LLMs Answer Multiple-Choice Questions Without the Question?", e)} className={linkClass}>&quot;Artifacts or Abduction&quot;</a>
              {' '}by JHU
            </p>
            <button
              type="button"
              onClick={() => setShowEvidence2024(!showEvidence2024)}
              className="mt-1 text-[13px] text-maroon-600 dark:text-maroon-400 hover:underline bg-transparent border-0 p-0 cursor-pointer inline-flex items-center gap-1"
            >
              🕵️ Proof <span className={`inline-block w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-current transition-transform duration-200 ${showEvidence2024 ? 'rotate-180' : ''}`}></span>
            </button>
            {showEvidence2024 && (
              <div className="mt-2">
                <img 
                  src="/assets/images/masc2024.jpg" 
                  alt="MASC-SLL 2024 Best Paper Award" 
                  className="w-full max-w-xs rounded-lg border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
          </Entry>

          <Entry title="UIUC CS Graduation with Highest Honors" dates="May 2023">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Recommended by the UIUC computer science department to graduate with highest honors
            </p>
          </Entry>

          <Entry title="C.W. Gear Outstanding Undergraduate Student" dates="May 2022">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Awarded to two seniors that have demonstrated excellence in research and service
            </p>
          </Entry>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Professional Service</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <Entry title="Conference Reviewer" dates="2022–Present">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Reviewer for: *ACL/ARR 2023-Present, IEEE TASLP 2024, TrustNLP 2024, SRW 2025
            </p>
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Great Reviewer Nomination:</span> Apr, June (#6), Aug (#4), Oct (#2), Dec 2024, Feb 2025 ARR
            </p>
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Outstanding Reviewer:</span> EMNLP 2024 • EMNLP 2025
            </p>
          </Entry>

          <Entry title="Conference Volunteer" dates="2023, 2025">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">ACL 2023, NAACL 2025</p>
          </Entry>

          <Entry title="Visiting Student Day Volunteer" dates="Mar 2024, 2025">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">Volunteer and ambassador for UMD&apos;s visiting student day</p>
          </Entry>

          <Entry title="Winter Storm LLM Workshop" dates="Jan 2023">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">Led a 5-day workshop on LLMs for non-CS graduate students</p>
          </Entry>

          <Entry title="SIGNLL @ UIUC" dates="Aug 2020 – May 2021">
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">President of Special Interest Group for Natural Language Learning</p>
          </Entry>
        </div>
      </div>
    </section>
  );
}

export default ServiceAndAwards;

import React from 'react';
import { useFilter } from '../contexts/FilterContext';

const linkClass = 'text-maroon-600 dark:text-maroon-400 hover:underline';

function Entry({ title, dates, children }) {
  return (
    <div className="py-3 first:pt-0">
      <div className="flex items-baseline justify-between gap-x-4 gap-y-0.5 flex-wrap">
        <h4 className="text-[16px] font-bold text-gray-900 dark:text-white leading-snug">{title}</h4>
        <span className="text-[13.5px] text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">{dates}</span>
      </div>
      <div className="text-[15px] leading-[1.48] text-gray-700 dark:text-gray-300">{children}</div>
    </div>
  );
}

function Experience({ title }) {
  const { filterByPaperTitle } = useFilter();
  
  const handlePaperClick = (paperTitle, e) => {
    e.preventDefault();
    filterByPaperTitle(paperTitle);
  };
  
  return (
    <section id="experience" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Education</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <Entry title="University of Maryland, College Park" dates="Aug 2023 – May 2027 (Expected)">
            <p className="mt-0.5">Ph.D. Computer Science • GPA: 4.00/4.00</p>
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Advisors:{' '}
              <a href="https://users.umiacs.umd.edu/~ying/" target="_blank" rel="noopener noreferrer" className={linkClass}>Jordan Boyd-Graber</a>,{' '}
              <a href="https://rudinger.github.io/" target="_blank" rel="noopener noreferrer" className={linkClass}>Rachel Rudinger</a>
            </p>
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Thesis (Proposed):{' '}
              <a href="/assets/pdf/thesis-proposal.pdf" target="_blank" rel="noopener noreferrer" className={linkClass}>Teaching AI to Answer Questions with Reasoning that Actually Helps You</a>
            </p>
          </Entry>

          <Entry title="New York University" dates="Aug 2025 – May 2026">
            <p className="mt-0.5">Visiting Student</p>
            <p className="mt-0.5 text-gray-500 dark:text-gray-400">
              Host: <a href="https://eunsol.github.io/" target="_blank" rel="noopener noreferrer" className={linkClass}>Eunsol Choi</a>
            </p>
          </Entry>

          <Entry title="University of Illinois at Urbana-Champaign" dates="Aug 2019 – May 2023">
            <p className="mt-0.5">B.S. Computer Science; B.S. Statistics • GPA: 4.00/4.00</p>
          </Entry>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Industry Research</h3>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <Entry title="Microsoft Research (MSR)" dates="May 2026 – Aug 2026">
            <p className="mt-0.5">Research Intern: AI Interaction and Learning</p>
            <p className="mt-1 pl-3 border-l-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 italic">
              <span className="font-semibold not-italic">Outcome:</span> One paper submission on{' '}
              <a href="#" onClick={(e) => handlePaperClick("Code Understanding is a Bottleneck for Coding Agents", e)} className={`${linkClass} not-italic`}>coding agent evaluations</a>.
            </p>
          </Entry>

          <Entry title="Allen Institute for Artificial Intelligence (Ai2)" dates="May 2025 – May 2026">
            <p className="mt-0.5">Research Scientist Intern: Semantic Scholar</p>
            <p className="mt-1 pl-3 border-l-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 italic">
              <span className="font-semibold not-italic">Outcome:</span> One ACL paper on{' '}
              <a href="#" onClick={(e) => handlePaperClick("Language Models Don't Know What You Want: Evaluating Personalization in Deep Research Needs Real Users", e)} className={`${linkClass} not-italic`}>personalized deep research</a>, One paper submission on{' '}
              <a href="#" onClick={(e) => handlePaperClick("DRACULA: Hunting for the Actions Users Want Deep Research Agents to Execute", e)} className={`${linkClass} not-italic`}>learning from deep research feedback</a>, co-authored ICLR paper on{' '}
              <a href="#" onClick={(e) => handlePaperClick("AstaBench: Rigorous Benchmarking of AI Agents with a Scientific Research Suite", e)} className={`${linkClass} not-italic`}>benchmarking scientific agents</a>.
            </p>
          </Entry>

          <Entry title="Adobe" dates="May 2024 – Aug 2024">
            <p className="mt-0.5">Research Scientist Intern: Document Intelligence</p>
            <p className="mt-1 pl-3 border-l-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 italic">
              <span className="font-semibold not-italic">Outcome:</span> Patent,{' '}
              <a href="#" onClick={(e) => handlePaperClick("MoDS: Moderating a Mixture of Document Speakers to Summarize Debatable Queries in Document Collections", e)} className={`${linkClass} not-italic`}>Paper at NAACL 2025 on multi-LLM QA</a>.
            </p>
          </Entry>

          <Entry title="Meta" dates="May 2022 – Aug 2022">
            <p className="mt-0.5">Software Engineering Intern: Facebook Creators Well-being (Comment Safety)</p>
            <p className="mt-1 pl-3 border-l-2 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 italic">
              <span className="font-semibold not-italic">Outcome:</span> 15% drop in negative interactions among Facebook&apos;s 1 billion users
            </p>
          </Entry>
        </div>
      </div>
    </section>
  );
}

export default Experience;

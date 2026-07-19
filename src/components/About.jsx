import React, { useId, useMemo, useState } from 'react';
import papersJsonl from '../data/papers.jsonl?raw';
import { useFilter } from '../contexts/FilterContext';
import { collaborations } from '../data/collaborations';
import { papersForMentors, parsePapersJsonl } from '../utils/papers';

const papers = parsePapersJsonl(papersJsonl);

const mentorLinkClass =
  'text-maroon-700 dark:text-maroon-400 hover:underline';
const pubLinkClass =
  'text-gray-500 dark:text-gray-400 hover:underline';

function Org({ orgKey }) {
  const org = collaborations[orgKey];
  const tooltipId = useId();
  const [open, setOpen] = useState(false);

  const pubs = useMemo(
    () => (org ? papersForMentors(papers, org.mentors) : []),
    [org]
  );

  if (!org) return null;

  const hasMentors = org.mentors?.length > 0;
  const hasPubs = pubs.length > 0;
  const hasTip = Boolean(org.tip);
  const hasContent = hasTip || hasMentors || hasPubs;

  return (
    <span
      className="relative whitespace-nowrap"
      onMouseEnter={() => hasContent && setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => hasContent && setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline p-0 m-0 bg-transparent border-0 cursor-help text-inherit font-inherit leading-[inherit] border-b border-dotted border-maroon-700/40 dark:border-maroon-400/40 hover:border-maroon-700 dark:hover:border-maroon-400 transition-colors"
        aria-describedby={hasContent && open ? tooltipId : undefined}
      >
        <img
          src={`/assets/icons/${org.icon}`}
          alt=""
          aria-hidden="true"
          className="inline-block h-[1.05em] w-[1.05em] object-contain rounded-sm align-[-0.15em] mr-1"
        />
        {org.name}
      </button>

      {hasContent && open && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute left-1/2 bottom-full z-30 mb-1.5 w-max max-w-[18rem] -translate-x-1/2 rounded-md border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-left text-xs leading-snug text-gray-700 dark:text-gray-200 shadow-lg normal-case font-normal whitespace-normal after:absolute after:left-0 after:right-0 after:top-full after:h-2 after:content-['']"
        >
          {hasTip && !hasMentors ? (
            <span className="block">{org.tip}</span>
          ) : (
            <span className="block">
              {hasMentors &&
                org.mentors.map((m, i) => (
                  <span key={m.name}>
                    {i > 0 && ', '}
                    {m.url ? (
                      <a
                        href={m.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={mentorLinkClass}
                      >
                        {m.name}
                      </a>
                    ) : (
                      m.name
                    )}
                  </span>
                ))}
              {hasPubs && (
                <span>
                  {' '}(
                  {pubs.map((p, i) => (
                    <span key={p.title}>
                      {i > 0 && ', '}
                      {p.pdf ? (
                        <a
                          href={p.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={pubLinkClass}
                        >
                          {p.label}
                        </a>
                      ) : (
                        <span>{p.label}</span>
                      )}
                    </span>
                  ))}
                  )
                </span>
              )}
            </span>
          )}

          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-gray-900"
          />
        </span>
      )}
    </span>
  );
}

const iconClass =
  'w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors';

function SocialLinks() {
  return (
    <div className="flex items-center gap-3 flex-shrink-0">
      <a
        href="mailto:nbalepur@umd.edu"
        className={iconClass}
        title="Email"
        aria-label="Email"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </a>
      <a
        href="https://scholar.google.com/citations?user=G8_fojUAAAAJ"
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        title="Google Scholar"
        aria-label="Google Scholar"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5s-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        </svg>
      </a>
      <a
        href="https://twitter.com/NishantBalepur"
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        title="Twitter"
        aria-label="Twitter"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      </a>
      <a
        href="https://github.com/nbalepur"
        target="_blank"
        rel="noopener noreferrer"
        className={iconClass}
        title="GitHub"
        aria-label="GitHub"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a
        href="/assets/pdf/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center h-5 text-sm font-semibold leading-none text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
        title="CV"
        aria-label="CV"
      >
        CV
      </a>
    </div>
  );
}

function About() {
  const { applyFilter } = useFilter();

  const handleRQClick = (rqName) => {
    applyFilter('RQ', rqName);
  };

  const handleFactualClick = () => {
    applyFilter('RQ', 'Factuality');
  };

  return (
    <section id="about" className="mb-4">
      {/* Photo + name/first paragraph */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 sm:items-start">
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <img
            src="/assets/images/profile.png"
            alt="Nishant Balepur"
            className="w-36 h-36 sm:w-40 sm:h-40 rounded-2xl object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Nishant Balepur
              </h1>
              <p className="mt-1 text-maroon-700 dark:text-maroon-400 text-base sm:text-lg">
                NLP Research @ University of Maryland
              </p>
            </div>
            <SocialLinks />
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            I'm a fourth-year Ph.D. candidate at the <Org orgKey="umd" /> working with Professors{' '}
            <a href="https://users.umiacs.umd.edu/~ying/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Jordan Boyd-Graber</a>
            {' '}and{' '}
            <a href="https://rudinger.github.io/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Rachel Rudinger</a>
            . I&apos;m grateful to have also worked closely and published with researchers at <Org orgKey="microsoft" />, <Org orgKey="ai2" />, <Org orgKey="cohere" />, <Org orgKey="scale" />, <Org orgKey="adobe" />, and <Org orgKey="nyu" />. I mostly work on NLP, but steal ideas from HCI, Education, and ML.
          </p>
        </div>
      </div>

      {/* Rest of bio — full width below the photo */}
      <div className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <p>
          Language models are often correct and generate responses humans prefer, but that doesn&apos;t mean they are helpful. I work on evaluations, feedback collection, and human-AI collaboration to help users achieve their goals, mainly by:
        </p>

        <ol className="list-decimal list-outside space-y-2 ml-6">
          <li className="pl-2">
            <button onClick={() => handleRQClick('Helpfulness')} className="text-left hover:underline cursor-pointer bg-transparent border-none p-0 m-0 block">Learning from <strong>user feedback</strong> in AI interactions</button>
          </li>
          <li className="pl-2">
            <button onClick={() => handleRQClick('Benchmarking')} className="text-left hover:underline cursor-pointer bg-transparent border-none p-0 m-0 block">Rigorously <strong>evaluating</strong> AI systems</button>
          </li>
          <li className="pl-2">
            <button onClick={() => handleRQClick('Personalization')} className="text-left hover:underline cursor-pointer bg-transparent border-none p-0 m-0 block">Testing how AI should <strong>personalize</strong> to users</button>
          </li>
        </ol>

        <p>
          The old Nishant worked on making NLP systems <button onClick={handleFactualClick} className="hover:underline cursor-pointer bg-transparent border-none p-0 m-0">more factual</button>, but I&apos;m now more interested in research that helps humans and is fun to read. If you&apos;re interested in similar problems, don&apos;t hesitate to <a href="mailto:nbalepur@umd.edu" className="text-maroon-700 dark:text-maroon-400 hover:underline">reach out</a>!
        </p>

        <p>
          And if you&apos;re searching for the office hours of &quot;Professor Balepur&quot;, you probably want <a href="https://nainasb.github.io/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">my sister</a> 😉
        </p>
      </div>
    </section>
  );
}

export default About;

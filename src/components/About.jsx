import React from 'react';
import { useFilter } from '../contexts/FilterContext';

function About({ title }) {
  const { applyFilter } = useFilter();

  const handleRQClick = (rqName) => {
    applyFilter('RQ', rqName);
  };

  const handleFactualClick = () => {
    applyFilter('RQ', 'Factuality');
  };

  return (
    <section id="about" className="mb-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="paper-card text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <p>
          Nishant (that's me!) is a fourth-year Ph.D. candidate at the University of Maryland working with Professors <a href="https://users.umiacs.umd.edu/~ying/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Jordan Boyd-Graber</a> and <a href="https://rudinger.github.io/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Rachel Rudinger</a>. I'm grateful to have also worked closely with Microsoft Research on the <a href="https://www.microsoft.com/en-us/research/group/ai-interaction-and-learning/" className="text-maroon-700 dark:text-maroon-400 hover:underline">AI Interaction and Learning Team</a>, the Asta team <a href="https://allenai.org/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Ai2</a>, and <a href="https://eunsol.github.io/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">Eunsol Choi</a> at NYU. I mostly work on NLP, but often steal ideas from HCI, Education, and ML.
        </p>
        
        <p>
        Language models are often correct and generate responses humans prefer, but that doesn't mean they are helpful. I deploy evaluations, feedback collection, and AI systems that help users achieve their goals, mainly by:
        </p>
        
        <ol className="list-decimal list-outside space-y-2 ml-6">
          <li className="pl-2">
            <button onClick={() => handleRQClick('Helpfulness')} className="text-left hover:underline cursor-pointer bg-transparent border-none p-0 m-0 block">Learning from <strong>feedback</strong> in human-AI interactions</button>
          </li>
          <li className="pl-2">
            <button onClick={() => handleRQClick('Benchmarking')} className="text-left hover:underline cursor-pointer bg-transparent border-none p-0 m-0 block">Rigorously <strong>evaluating</strong> AI systems</button>
          </li>
          <li className="pl-2">
            <button onClick={() => handleRQClick('Personalization')} className="text-left hover:underline cursor-pointer bg-transparent border-none p-0 m-0 block">Testing how AI should <strong>personalize</strong> to users</button>
          </li>
        </ol>
        
        <p>
          The old Nishant worked on making NLP systems <button onClick={handleFactualClick} className="hover:underline cursor-pointer bg-transparent border-none p-0 m-0">more factual</button>, but I'm now more interested in research that helps humans and is fun to read. If you're interested in similar problems, don't hesitate to <a href="mailto:nbalepur@umd.edu" className="text-maroon-700 dark:text-maroon-400 hover:underline">reach out</a>!
        </p>
        
        <p>
          And if you're searching for the office hours of "Professor Balepur", you probably want <a href="https://nainasb.github.io/" target="_blank" rel="noopener noreferrer" className="text-maroon-700 dark:text-maroon-400 hover:underline">my sister</a> 😉
        </p>
      </div>
    </section>
  );
}

export default About;

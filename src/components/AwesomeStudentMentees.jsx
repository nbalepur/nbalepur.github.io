import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useFilter } from '../contexts/FilterContext';

function AwesomeStudentMentees({ title }) {
  const { filterByAuthor } = useFilter();

  const handleAuthorClick = (authorName, e) => {
    e.preventDefault();
    filterByAuthor(authorName);
  };

  const students = [
    {
      name: 'Michael Xie',
      displayName: 'Michael Xie',
      degree: ['M.S. UMD', 'Ph.D. JHU'],
      period: '2025-Present',
      research: 'Personalized LLMs for Education, LLM Evaluation',
      publications: 'One paper at ACL 2026',
      link: 'https://www.linkedin.com/in/michael-xie-29139b220/'
    },
    {
      name: 'Jane Oh',
      displayName: 'Jane Oh',
      degree: 'B.S. UMD',
      period: '2025-Present',
      research: 'LLM Evaluation',
      publications: 'One paper at ACL 2026',
      link: 'https://www.linkedin.com/in/jane-hj-oh/'
    },
    {
      name: 'Bhavya Rajasekaran',
      displayName: 'Bhavya Rajasekaran',
      degree: 'B.S. UMD',
      period: '2025',
      research: 'LLM Evaluation',
      publications: 'One paper at ACL 2026',
      link: 'https://www.linkedin.com/in/bhavya-rajasekaran-475bbb202/'
    },
    {
      name: 'Atrey Desai',
      displayName: 'Atrey Desai',
      degree: 'B.S. UMD',
      period: '2024-Present',
      research: 'LLM Evaluation',
      publications: 'One paper at MASC-SLL 2025 Workshop, Two papers at ACL 2026',
      link: 'https://atreydesai.com/'
    },
    {
      name: 'Matthew Shu',
      displayName: 'Matthew Shu',
      degree: ['B.S. Yale', 'M.S. Yale', 'ML @ Brain Co.'],
      period: '2023-2025',
      research: 'LLMs for Education, Alignment',
      publications: 'Two papers at EMNLP 2024 (long, main); one paper at EMNLP 2025 (long, main)',
      link: 'https://www.linkedin.com/in/mattshu/'
    },
    {
      name: 'Jerry He',
      displayName: 'Jerry He',
      degree: ['HS Student', 'B.S. Georgia Tech'],
      period: '2024-2025',
      research: 'LLMs for Education',
      publications: 'Submitted Project on LLMs+Education for Marriott\'s Ridge High School Gifted and Talented Research Program',
      link: 'https://www.linkedin.com/in/jerryjhe/'
    }
  ];

  return (
    <section id="awesome-student-mentees" className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {students.map((student, index) => (
          <div key={index} className="py-3 first:pt-0">
            <div className="flex items-baseline justify-between gap-x-4 gap-y-0.5 flex-wrap">
              <h4 className="text-[16px] font-bold text-gray-900 dark:text-white leading-snug">
                {student.link ? (
                  <a 
                    href={student.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-maroon-600 dark:text-maroon-400 hover:underline"
                  >
                    {student.displayName}
                  </a>
                ) : (
                  <span>{student.displayName}</span>
                )}
              </h4>
              <span className="text-[13.5px] text-gray-500 dark:text-gray-400 tabular-nums whitespace-nowrap">{student.period}</span>
            </div>
            <div className="text-[15px] leading-[1.48] text-gray-700 dark:text-gray-300">
              <p className="mt-0.5">
                {Array.isArray(student.degree) ? (
                  <span className="inline-flex items-center flex-wrap gap-1">
                    {student.degree.map((part, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && (
                          <ArrowRight className="inline-block w-3 h-3 mx-0.5 text-gray-500 dark:text-gray-400" />
                        )}
                        <span>{part}</span>
                      </React.Fragment>
                    ))}
                  </span>
                ) : (
                  student.degree
                )}
              </p>
              <p className="mt-0.5 text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Research:</span> {student.research}
              </p>
              <p className="mt-0.5 text-gray-500 dark:text-gray-400">
                {student.name === 'Jerry He' ? (
                  <>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">Publications:</span> {student.publications}
                  </>
                ) : (
                  <>
                    <a 
                      href="#"
                      onClick={(e) => handleAuthorClick(student.name, e)}
                      className="font-semibold text-maroon-600 dark:text-maroon-400 hover:underline"
                    >
                      Publications:
                    </a>{' '}
                    {student.publications}
                  </>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AwesomeStudentMentees;

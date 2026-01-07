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
      degree: 'M.S. UMD',
      period: '2025-Present',
      research: 'Personalized LLMs for Education, LLM Evaluation',
      publications: 'One paper under review at ARR',
      link: 'https://www.linkedin.com/in/michael-xie-29139b220/'
    },
    {
      name: 'Jane Oh',
      displayName: 'Jane Oh',
      degree: 'B.S. UMD',
      period: '2025-Present',
      research: 'LLM Evaluation',
      publications: 'One paper under review at ARR',
      link: 'https://www.linkedin.com/in/jane-hj-oh/'
    },
    {
      name: 'Bhavya Rajasekaran',
      displayName: 'Bhavya Rajasekaran',
      degree: 'B.S. UMD',
      period: '2025-Present',
      research: 'LLM Evaluation',
      publications: 'One paper under review at ARR',
      link: 'https://www.linkedin.com/in/bhavya-rajasekaran-475bbb202/'
    },
    {
      name: 'Atrey Desai',
      displayName: 'Atrey Desai',
      degree: 'B.S. UMD',
      period: '2024-Present',
      research: 'LLM Evaluation',
      publications: 'One paper at MASC-SLL 2025 Workshop, Two papers under review at ARR',
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
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {students.map((student, index) => (
          <div 
            key={index}
            className="paper-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {student.link ? (
                  <a 
                    href={student.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-maroon-700 dark:text-maroon-400 hover:underline"
                  >
                    {student.displayName}
                  </a>
                ) : (
                  <span>{student.displayName}</span>
                )}
              </h4>
              <span className="text-gray-600 dark:text-gray-400 text-sm">{student.period}</span>
            </div>
            <div className="space-y-1 text-sm">
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">
                  {Array.isArray(student.degree) ? (
                    <span className="flex items-center flex-wrap gap-1">
                      {student.degree.map((part, idx) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && (
                            <ArrowRight className="inline-block w-3 h-3 mx-1 text-gray-600 dark:text-gray-400" />
                          )}
                          <span>{part}</span>
                        </React.Fragment>
                      ))}
                    </span>
                  ) : (
                    student.degree
                  )}
                </span>
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <span className="font-semibold">Research:</span> {student.research}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {student.name === 'Jerry He' ? (
                  <>
                    <span className="font-semibold">Publications:</span> {student.publications}
                  </>
                ) : (
                  <>
                    <a 
                      href="#"
                      onClick={(e) => handleAuthorClick(student.name, e)}
                      className="font-semibold text-maroon-700 dark:text-maroon-400 hover:text-maroon-800 dark:hover:text-maroon-300 hover:underline"
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

/**
 * Orgs shown inline in About.
 * Publications are resolved from papers.jsonl by matching mentor co-authors.
 */
export const collaborations = {
  umd: {
    name: 'University of Maryland',
    icon: 'umd.png',
    tip: 'Go Terps! 🐢',
    mentors: [],
  },
  microsoft: {
    name: 'Microsoft Research',
    icon: 'microsoft.png',
    mentors: [
      { name: 'Tobias Schnabel', url: 'https://www.microsoft.com/en-us/research/people/toschnab/' },
      { name: 'Kiran Tomlinson', url: 'https://www.kirantomlinson.com/' },
    ],
  },
  ai2: {
    name: 'Ai2',
    icon: 'ai2.png',
    mentors: [{ name: 'Aakanksha Naik', url: 'https://www.cs.cmu.edu/~anaik/' }],
  },
  cohere: {
    name: 'Cohere',
    icon: 'cohere.png',
    mentors: [{ name: 'Seraphina Goldfarb-Tarrant', url: 'https://seraphinatarrant.github.io/' }],
  },
  scale: {
    name: 'Scale AI',
    icon: 'scale.png',
    mentors: [{ name: 'Vipul Gupta', url: 'https://vipulgupta1011.github.io/' }],
  },
  adobe: {
    name: 'Adobe',
    icon: 'adobe.png',
    mentors: [
      { name: 'Puneet Mathur', url: 'https://themadaiguy.github.io/' },
      { name: 'Tong Sun', url: 'https://research.adobe.com/person/tong-sun/' },
    ],
  },
  nyu: {
    name: 'NYU',
    icon: 'nyu.png',
    mentors: [{ name: 'Eunsol Choi', url: 'https://eunsol.github.io/' }],
  },
};

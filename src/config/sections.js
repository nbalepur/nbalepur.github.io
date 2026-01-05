import About from '../components/About';
import News from '../components/News';
import Research from '../components/Research';
import Experience from '../components/Experience';
import ServiceAndAwards from '../components/ServiceAndAwards';
import AwesomeStudentMentees from '../components/AwesomeStudentMentees';
import Tips from '../components/Tips';

export const sections = [
  {
    id: 'about',
    label: 'About',
    component: About,
  },
  {
    id: 'news',
    label: 'Updates',
    component: News,
  },
  {
    id: 'research',
    label: 'Research',
    component: Research,
  },
  {
    id: 'experience',
    label: 'Experience',
    component: Experience,
  },
  {
    id: 'service-and-awards',
    label: 'Service + Awards',
    component: ServiceAndAwards,
  },
  {
    id: 'awesome-student-mentees',
    label: 'Awesome Mentees',
    component: AwesomeStudentMentees,
  },
  {
    id: 'tips',
    label: 'Style',
    component: Tips,
  },
];


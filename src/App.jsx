import { useState, useEffect, useRef } from 'react';
import VSCodeLayout from './components/VSCodeLayout';
import Hero        from './sections/Hero';
import About       from './sections/About';
import Skills      from './sections/Skills';
import Experience  from './sections/Experience';
import Projects    from './sections/Projects';
import Education   from './sections/Education';
import Contact     from './sections/Contact';

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'education', 'contact'];

const SECTION_COMPONENTS = {
  home:       Hero,
  about:      About,
  skills:     Skills,
  experience: Experience,
  projects:   Projects,
  education:  Education,
  contact:    Contact,
};

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const editorRef = useRef(null);

  /* Navigate to a section: update state and scroll editor to top */
  const navigate = (id) => {
    setActiveSection(id);
    const el = document.getElementById('main-editor');
    if (el) el.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* Allow internal section links (buttons inside sections) */
  useEffect(() => {
    const handler = (e) => {
      const link = e.target.closest('[data-navigate]');
      if (link) {
        e.preventDefault();
        navigate(link.dataset.navigate);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const ActiveComponent = SECTION_COMPONENTS[activeSection] || Hero;

  return (
    <VSCodeLayout activeSection={activeSection} onNavigate={navigate}>
      <ActiveComponent onNavigate={navigate} />
    </VSCodeLayout>
  );
}

export default App;

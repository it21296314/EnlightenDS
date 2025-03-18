import React from 'react';
// import './homepage.sass';
import Banner  from '../../components/Banner/Banner';
import Skills from '../../components/Skills/Skills';
import Projects from '../../components/Projects/Projects';




const Homepage = () => {
  return (
    <div className="homepage">
      <header>
     </header>
      <main>
      <Banner/>
      <Skills/>
      <Projects/>

      </main>
      <footer>
        <p>&copy; 2024 EnglishEase</p>
      </footer>
    </div>
  );
};

export default Homepage;

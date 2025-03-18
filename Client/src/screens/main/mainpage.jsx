// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const MainPage = () => {
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate('/LevelSelection'); // Adjust the path to match your route for the Level Selection Page
//   };

//   return (
//     <div className="main-page">
//       <h1 className="main-title">Welcome to EnlightenDS</h1>
//       <button className="start-button" onClick={handleNavigate}>
//         Maths
//       </button>
//       <button className="start-button" >
//         SADEE
//       </button>
//       <button className="start-button" >
//         SENU
//       </button>
//       <button className="start-button" >
//         DILSHI
//       </button>
//     </div>
//   );
// };

// export default MainPage;























// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './mainpage.css';

// const MainPage = () => {
//   const navigate = useNavigate();
//   const [activeCard, setActiveCard] = useState(null);
//   const [animateIn, setAnimateIn] = useState(false);

//   useEffect(() => {
//     // Trigger animation after component mounts
//     setTimeout(() => {
//       setAnimateIn(true);
//     }, 300);
//   }, []);

//   const handleNavigate = (path) => {
//     navigate(path);
//   };

//   const handleCardHover = (index) => {
//     setActiveCard(index);
//   };

//   const cards = [
//     {
//       title: "Down Syndrome Detection",
//       description: "Detect Down syndrome and assess probability using image upload or real-time webcam.",
//       icon: "🔍",
//       bgImage: "url('/images/detection-bg.jpg')", // Add placeholder images
//       color: "#4b76e5",
//       path: "/detection",
//       features: ["Image Upload", "Real-time Webcam", "Detailed Results"]
//     },
//     {
//       title: "Pronunciation Enhancement",
//       description: "Interactive speech exercises and games with progress tracking for parents and teachers.",
//       icon: "🗣️",
//       bgImage: "url('/images/pronunciation-bg.jpg')",
//       color: "#e5574b",
//       path: "/pronunciation",
//       features: ["Interactive Quizzes", "Learning Games", "Progress Reports"]
//     },
//     {
//       title: "Mathematical Skills",
//       description: "Adaptive learning system with beginner, intermediate, and advanced levels.",
//       icon: "🧮",
//       bgImage: "url('/images/math-bg.jpg')",
//       color: "#45c496",
//       path: "/math",
//       features: ["Adaptive Difficulty", "Interactive Problems", "Visual Learning"]
//     },
//     {
//       title: "Talent Recognition",
//       description: "Discover and nurture talents in learning, drawing, and musical abilities.",
//       icon: "✨",
//       bgImage: "url('/images/talent-bg.jpg')",
//       color: "#f7b731",
//       path: "/talents",
//       features: ["Learning Assessment", "Drawing Analysis", "Musical Skills"]
//     }
//   ];

//   return (
//     <div className="main-container">
//       <div className="background-shapes">
//         <div className="shape shape-1"></div>
//         <div className="shape shape-2"></div>
//         <div className="shape shape-3"></div>
//         <div className="shape shape-4"></div>
//       </div>
      
//       <div className="header">
//         <div className="logo-container">
//           <div className="logo">
//             <span className="logo-icon">✦</span>
//             <span className="logo-text">EnlightenDS</span>
//           </div>
//           <div className="subtitle">Advanced Technologies for Children with Down Syndrome</div>
//         </div>
//       </div>

//       <div className={`welcome-section ${animateIn ? 'animate-in' : ''}`}>
//         <h1>Welcome to EnlightenDS</h1>
//         <div className="tagline">
//           <span className="highlight">Detect</span> • 
//           <span className="highlight">Enhance</span> • 
//           <span className="highlight">Discover</span> • 
//           <span className="highlight">Empower</span>
//         </div>
//         <p>Helping children with Down syndrome unlock their full potential through innovative technology</p>
//       </div>

//       <div className="cards-container">
//         {cards.map((card, index) => (
//           <div
//             key={index}
//             className={`card ${activeCard === index ? 'active' : ''} ${animateIn ? 'animate-in' : ''}`}
//             style={{ 
//               borderTop: `5px solid ${card.color}`,
//               animationDelay: `${index * 0.15 + 0.3}s`
//             }}
//             onClick={() => handleNavigate(card.path)}
//             onMouseEnter={() => handleCardHover(index)}
//             onMouseLeave={() => handleCardHover(null)}
//           >
//             <div className="card-color-bar" style={{ backgroundColor: card.color }}></div>
//             <div 
//               className="card-background" 
//               style={{ backgroundImage: card.bgImage }}
//             ></div>
//             <div className="card-content">
//               <div className="card-icon" style={{ backgroundColor: card.color }}>{card.icon}</div>
//               <h2 className="card-title">{card.title}</h2>
//               <p className="card-description">{card.description}</p>
              
//               <div className="card-features">
//                 {card.features.map((feature, idx) => (
//                   <div key={idx} className="feature-tag">{feature}</div>
//                 ))}
//               </div>
              
//               <button className="explore-button" style={{ backgroundColor: card.color }}>
//                 <span>Explore</span>
//                 <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="how-it-works">
//         <h2>How EnlightenDS Works</h2>
//         <div className="steps-container">
//           <div className="step">
//             <div className="step-number">1</div>
//             <div className="step-content">
//               <h3>Assessment</h3>
//               <p>Our system evaluates abilities and identifies areas for growth</p>
//             </div>
//           </div>
//           <div className="step">
//             <div className="step-number">2</div>
//             <div className="step-content">
//               <h3>Personalization</h3>
//               <p>Activities adapt to each child's unique needs and abilities</p>
//             </div>
//           </div>
//           <div className="step">
//             <div className="step-number">3</div>
//             <div className="step-content">
//               <h3>Enhancement</h3>
//               <p>Interactive exercises build skills through engaging activities</p>
//             </div>
//           </div>
//           <div className="step">
//             <div className="step-number">4</div>
//             <div className="step-content">
//               <h3>Progress Tracking</h3>
//               <p>Detailed reports help parents and teachers monitor improvement</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="footer">
//         <div className="footer-content">
//           <div className="footer-logo">EnlightenDS</div>
//           <p>Empowering Special Abilities Through Technology</p>
//           <div className="footer-links">
//             <a href="#">About Us</a>
//             <a href="#">Resources</a>
//             <a href="#">Support</a>
//             <a href="#">Contact</a>
//           </div>
//         </div>
//         <div className="copyright">© 2025 EnlightenDS - All Rights Reserved</div>
//       </div>
//     </div>
//   );
// };

// export default MainPage;













import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainpage.css';

const MainPage = () => {
  const navigate = useNavigate();
  const [activeCard, setActiveCard] = useState(null);
  const [animateIn, setAnimateIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setTimeout(() => {
      setAnimateIn(true);
    }, 300);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleCardHover = (index) => {
    setActiveCard(index);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const cards = [
    {
      title: "Down Syndrome Detection",
      description: "Detect Down syndrome and assess probability using image upload or real-time webcam.",
      icon: "🔍",
      bgImage: "url('/images/detection-bg.jpg')", // Add placeholder images
      color: "#4b76e5",
      path: "/detection",
      features: ["Image Upload", "Real-time Webcam", "Detailed Results"]
    },
    {
      title: "Pronunciation Enhancement",
      description: "Interactive speech exercises and games with progress tracking for parents and teachers.",
      icon: "🗣️",
      bgImage: "url('/images/pronunciation-bg.jpg')",
      color: "#e5574b",
      path: "/pronunciation",
      features: ["Interactive Quizzes", "Learning Games", "Progress Reports"]
    },
    {
      title: "Mathematical Skills",
      description: "Adaptive learning system with beginner, intermediate, and advanced levels.",
      icon: "🧮",
      bgImage: "url('/images/math-bg.jpg')",
      color: "#45c496",
      path: "/math",
      features: ["Adaptive Difficulty", "Interactive Problems", "Visual Learning"]
    },
    {
      title: "Talent Recognition",
      description: "Discover and nurture talents in learning, drawing, and musical abilities.",
      icon: "✨",
      bgImage: "url('/images/talent-bg.jpg')",
      color: "#f7b731",
      path: "/talents",
      features: ["Learning Assessment", "Drawing Analysis", "Musical Skills"]
    }
  ];

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Detection", path: "/detection" },
    { label: "Pronunciation", path: "/pronunciation" },
    { label: "Mathematics", path: "/math" },
    { label: "Talents", path: "/talents" },
    { label: "About Us", path: "/about" },
    { label: "Contact", path: "/contact" }
  ];

  return (
    <div className="main-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>
      
      <div className="header">
        <div className="header-content">
          <div className="logo-container">
            <div className="logo">
              <span className="logo-icon">✦</span>
              <span className="logo-text">EnlightenDS</span>
            </div>
            <div className="subtitle">Advanced Technologies for Children with Down Syndrome</div>
          </div>
          
          {/* Navigation Menu */}
          <div className="nav-container">
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              <div className={`hamburger ${menuOpen ? 'active' : ''}`}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            
            <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
              <ul>
                {navItems.map((item, index) => (
                  <li key={index}>
                    <a href={item.path} onClick={(e) => {
                      e.preventDefault();
                      handleNavigate(item.path);
                    }}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <div className={`welcome-section ${animateIn ? 'animate-in' : ''}`}>
        <h1>Welcome to EnlightenDS</h1>
        <div className="tagline">
          <span className="highlight">Detect</span> • 
          <span className="highlight">Enhance</span> • 
          <span className="highlight">Discover</span> • 
          <span className="highlight">Empower</span>
        </div>
        <p>Helping children with Down syndrome unlock their full potential through innovative technology</p>
      </div>

      {/* Who We Are Section */}
      <div className="who-we-are-section">
        <div className="section-container">
          <h2>Who We Are</h2>
          <div className="who-we-are-content">
            <div className="who-we-are-text">
              <p>EnlightenDS is a pioneering platform dedicated to enhancing the lives of children with Down syndrome through cutting-edge technology. Our interdisciplinary team of medical experts, educators, and technologists works together to provide accessible tools that support cognitive development, communication skills, and talent discovery.</p>
              <p>Founded in 2023, our mission is to create a world where every child with Down syndrome can access personalized learning tools that adapt to their unique abilities and challenges, helping them reach their full potential.</p>
              <div className="values-grid">
                <div className="value-item">
                  <div className="value-icon">🧠</div>
                  <h3>Innovation</h3>
                  <p>Constantly evolving our technology to better serve children's needs</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🤝</div>
                  <h3>Inclusivity</h3>
                  <p>Creating tools that are accessible to all families regardless of background</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">📊</div>
                  <h3>Evidence-Based</h3>
                  <p>All our approaches are grounded in scientific research and best practices</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">💪</div>
                  <h3>Empowerment</h3>
                  <p>Focusing on abilities and potential rather than limitations</p>
                </div>
              </div>
            </div>
            <div className="who-we-are-image">
              <div className="team-image-placeholder">
                <div className="image-overlay">Our Team</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${activeCard === index ? 'active' : ''} ${animateIn ? 'animate-in' : ''}`}
            style={{ 
              borderTop: `5px solid ${card.color}`,
              animationDelay: `${index * 0.15 + 0.3}s`
            }}
            onClick={() => handleNavigate(card.path)}
            onMouseEnter={() => handleCardHover(index)}
            onMouseLeave={() => handleCardHover(null)}
          >
            <div className="card-color-bar" style={{ backgroundColor: card.color }}></div>
            <div 
              className="card-background" 
              style={{ backgroundImage: card.bgImage }}
            ></div>
            <div className="card-content">
              <div className="card-icon" style={{ backgroundColor: card.color }}>{card.icon}</div>
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
              
              <div className="card-features">
                {card.features.map((feature, idx) => (
                  <div key={idx} className="feature-tag">{feature}</div>
                ))}
              </div>
              
              <button className="explore-button" style={{ backgroundColor: card.color }}>
                <span>Explore</span>
                <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="system-features">
        <h2>Core System Features</h2>
        <div className="features-grid">
          <div className="feature-box">
            <div className="feature-icon" style={{ backgroundColor: "#4b76e5" }}>🔄</div>
            <h3>Real-time Feedback</h3>
            <p>Immediate, adaptive responses to help children learn at their own pace</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon" style={{ backgroundColor: "#e5574b" }}>📱</div>
            <h3>Multi-device Support</h3>
            <p>Access from any device - desktop, tablet, or mobile phone</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon" style={{ backgroundColor: "#45c496" }}>🔒</div>
            <h3>Privacy Focus</h3>
            <p>Secure data handling with full compliance to child protection regulations</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon" style={{ backgroundColor: "#f7b731" }}>📈</div>
            <h3>Progress Analytics</h3>
            <p>Detailed insights and tracking for parents and educators</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon" style={{ backgroundColor: "#4b76e5" }}>🎮</div>
            <h3>Gamification</h3>
            <p>Learning through play with rewards and achievements</p>
          </div>
          <div className="feature-box">
            <div className="feature-icon" style={{ backgroundColor: "#e5574b" }}>👨‍👩‍👧‍👦</div>
            <h3>Family Integration</h3>
            <p>Tools for parents to participate in the learning journey</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>How EnlightenDS Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Assessment</h3>
              <p>Our system evaluates abilities and identifies areas for growth</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Personalization</h3>
              <p>Activities adapt to each child's unique needs and abilities</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Enhancement</h3>
              <p>Interactive exercises build skills through engaging activities</p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <h3>Progress Tracking</h3>
              <p>Detailed reports help parents and teachers monitor improvement</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-content">
          <div className="footer-logo">EnlightenDS</div>
          <p>Empowering Special Abilities Through Technology</p>
          <div className="footer-links">
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('/about')}}>About Us</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('/resources')}}>Resources</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('/support')}}>Support</a>
            <a href="#" onClick={(e) => {e.preventDefault(); handleNavigate('/contact')}}>Contact</a>
          </div>
        </div>
        <div className="copyright">© 2025 EnlightenDS - All Rights Reserved</div>
      </div>
    </div>
  );
};

export default MainPage;
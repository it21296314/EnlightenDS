
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LevelSelection.css'; // Include custom CSS for animations
import Navbar from '../../components/Header';
const LevelSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const categories = ['addition', 'subtraction', 'multiplication', 'division'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];
  const location = useLocation();
  const childId = location.state?.childId;
  
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!childId) {
        console.warn("No childId found in state.");
        return;
      }
  
      try {
        
        const response = await fetch(`http://localhost:3001/api/child/profile`, {
          method: "GET",
          credentials: "include", // Ensures session cookies are sent
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        setProgress(data.progress);
      } catch (err) {
        console.error("Error fetching progress:", err);
      }
    };
  
    fetchProgress();
  }, [childId]); // Depend on childId so it refetches if it changes
  
  


  const handleCategorySelection = (category) => {
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleDifficultySelection = (difficulty) => {
    navigate(`/questions/${selectedCategory}/${difficulty}`, { state: { childId } });

  };

  return (
    
    <div className='levelselection' >
      
    <div className="container text-center mt-5">
      {/* <h1 className="mb-4">Select Category and Difficulty</h1> */}

      {!selectedCategory ? (
        <div className="category-buttons fade-in">
          {categories.map((cat) => (
            <div key={cat} className="category-container">
              <button
                className={`btn btn-primary mb-2 categor-btn ${selectedCategory === cat ? 'selected' : ''}`}
                onClick={() => handleCategorySelection(cat)}
                style={{fontSize:'40px'}}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="difficulty-selection">
          <h2
            className="selected-category-title"
            onClick={() => setSelectedCategory('')} // Clickable title to go back to category selection
          >
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          <div className="difficulty-buttons fade-in">
            {difficulties.map((diff) => (
              <button
  key={diff}
  className="btn btn-success mt-3 difficulty-btn"
  onClick={() => handleDifficultySelection(diff)}
  style={{ fontSize: '40px' }}
  disabled={!progress?.[selectedCategory]?.[diff]} // Disable if level is locked
>
  {diff.charAt(0).toUpperCase() + diff.slice(1)}
</button>

            ))}
          </div>
        </div>
      )}
    </div></div>
  );
};

export default LevelSelection;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './LevelSelection.css'; // Include custom CSS for animations

// const LevelSelection = () => {
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const navigate = useNavigate();

//   const categories = ['addition', 'subtraction', 'multiplication', 'division'];
//   const difficulties = ['beginner', 'intermediate', 'advanced'];

//   // Function to render text with different colors for each letter
//   const renderColoredText = (text) => {
//     const colors = ['#FF0000', '#1cba29', '#FFFF00', '#0000FF', '#FF00FF', '#00FFFF', '#FFA500']; // Add as many colors as needed
//     return text.split('').map((char, index) => (
//       <span key={index} style={{ color: colors[index % colors.length] }}>
//         {char}
//       </span>
//     ));
//   };

//   const handleCategorySelection = (category) => {
//     setSelectedCategory(selectedCategory === category ? '' : category);
//   };

//   const handleDifficultySelection = (difficulty) => {
//     navigate(`/questions/${selectedCategory}/${difficulty}`);
//   };

//   return (
    
//     <div className="container text-center mt-5">
//       {/* <h1 className="mb-4">{renderColoredText('Select Category and Difficulty')}</h1> */}

//       {!selectedCategory ? (
//         <div className="category-buttons fade-in">
//           {categories.map((cat) => (
//             <div key={cat} className="category-container">
//               <button
//                 className={`btn btn-primary mb-2 category-btn ${selectedCategory === cat ? 'selected' : ''}`}
//                 onClick={() => handleCategorySelection(cat)}
//               >
//                 {renderColoredText(cat.charAt(0).toUpperCase() + cat.slice(1))}
//               </button>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="difficulty-selection">
//           <h2
//             className="selected-category-title"
//             onClick={() => setSelectedCategory('')} // Clickable title to go back to category selection
//           >
//             {renderColoredText(selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1))}
//           </h2>
//           <div className="difficulty-buttons fade-in">
//             {difficulties.map((diff) => (
//               <button
//                 key={diff}
//                 className="btn btn-success mt-3 difficulty-btn"
//                 onClick={() => handleDifficultySelection(diff)}
//               >
//                 {renderColoredText(diff.charAt(0).toUpperCase() + diff.slice(1))}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LevelSelection;

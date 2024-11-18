import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LevelSelection.css'; // Include custom CSS for animations

const LevelSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const categories = ['addition', 'subtraction', 'multiplication', 'division'];
  const difficulties = ['beginner', 'intermediate', 'advanced'];

  const handleCategorySelection = (category) => {
    // Toggle the visibility of the selected category's difficulty levels
    setSelectedCategory(selectedCategory === category ? '' : category);
  };

  const handleDifficultySelection = (difficulty) => {
    navigate(`/questions/${selectedCategory}/${difficulty}`); // Navigate to the Question Display page
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Select Category and Difficulty</h1>

      <div className="category-buttons">
        {categories.map((cat) => (
          <div key={cat} className="category-container">
            <button
              className={`btn btn-primary mb-2 category-btn ${selectedCategory === cat ? 'selected' : ''}`}
              onClick={() => handleCategorySelection(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>

            {/* Show difficulty levels only for the selected category */}
            {selectedCategory === cat && (
              <div className="difficulty-buttons">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    className="btn btn-success mt-3 difficulty-btn"
                    onClick={() => handleDifficultySelection(diff)}
                  >
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;

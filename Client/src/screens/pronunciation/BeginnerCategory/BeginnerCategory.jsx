import React from "react";
import { useNavigate } from "react-router-dom";
import "./BeginnerCategory.css";

const BeginnerCategory = () => {
  const navigate = useNavigate();

  const categories = [
    { name: "Family", route: "family" },
    { name: "Animals", route: "animals" },
    { name: "Fruits", route: "fruits" },
    { name: "Objects", route: "objects" },
    { name: "Colors", route: "colors" },
    { name: "Actions", route: "actions" },
  ];

  return (
    <div className="beginner-category-container">
      <h1 className="beginner-category-title">Select Category</h1>
      <div className="beginner-category-buttons">
        {categories.map((category) => (
          <button
            key={category.route}
            className="beginner-category-button"
            onClick={() => navigate(`/pronunciation/checker/${category.route}`)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BeginnerCategory;
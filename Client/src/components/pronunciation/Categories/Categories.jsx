import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Categories.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/categories")
      .then((response) => {
        setCategories(response.data.categories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="categories-container"><div className="content-wrapper">Loading categories...</div></div>;
  if (error) return <div className="categories-container"><div className="content-wrapper">{error}</div></div>;

  return (
    
    <div className="categories-container">
       {/* <h1>Quiz Category</h1> */}
      <div className="content-wrapper">
      <h1>Quiz Category</h1>
        <ul className="categories-list">
          {categories.map((category) => (
            <li key={category} className="category-item">
              <Link 
                to={`/quiz/${category}`} 
                className="category-link"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
// src/Categories.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/categories")
      .then((response) => setCategories(response.data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <div>
      <h1>Select a Category</h1>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/quiz/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

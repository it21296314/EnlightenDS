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
    <div className="beginner-category"> 
      <h1>Select Category</h1> 
      <div className="category-buttons_2129"> 
        {categories.map((category) => ( 
          <button 
            key={category.route} 
            className="big-button" 
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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const [child, setChild] = useState(null); // Manages child profile state
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/LevelSelection'); // Adjust the path to match your route for the Level Selection Page
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("http://localhost:3001/api/child/profile", {
          withCredentials: true, // Include cookies for authentication
        });
        setChild(data); // Set the child's profile data
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/signin"); // Redirect to sign-in if not authenticated
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!child) {
    return <p>Loading profile...</p>;
  }

  return (

    <div className="home" style={{ backgroundColor: "lightblue" }}>
  <div style={{ textAlign: 'center' }}>
    <h1 style={{ fontSize: '80px', fontWeight: 'bold', marginTop: '30px' }}>Welcome {child.name} !!</h1>
  </div>

  <div className="main-page">
      <h1 className="main-title">Welcome to EnlightenDS</h1>
      <button className="start-button" onClick={handleNavigate}>
        Maths
      </button>
      <button className="start-button" >
        SADEE
      </button>
      <button className="start-button" >
        SENU
      </button>
      <button className="start-button" >
        DILSHI
      </button>
    </div>
</div>



  );
};

export default Home;
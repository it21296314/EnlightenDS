import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./quiz.css";

const QuestionCollectionsComponent = () => {
  const userId = localStorage.getItem("userId");

  console.log("hello world");

  const [questionCollections, setQuestionCollections] = useState([]);
  console.log(questionCollections);

  useEffect(() => {
    const fetchQuestionCollections = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/mycollections/${userId}`
        );
        setQuestionCollections(response.data);
      } catch (error) {
        console.error("Error fetching questionCollections:", error);
      }
    };

    if (userId) {
      fetchQuestionCollections();
    }
  }, [userId]);

  return (
    //<body style={{ backgroundImage: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fiscclimatecollaborative.org%2Fsearch%2Fmarch-18-2023-lcbo-vintages-release-wine-picks-pinot-dd-%2F%3Fs%3Dbackgrounds-12310000%2B-background-images-wallpaper-poster-banners-for-free-dd-N1wWpmu5&psig=AOvVaw2wEcaC3mlikNVPuFgT4G6z&ust=1711892202805000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNiSqseNnIUDFQAAAAAdAAAAABAg" }}>
    <body>
    <div className="bodyq">
      
      <div>
      <h2 className="nn">My Question Collections</h2>
      </div>
      <div>
      
      <ul className="list">
        {questionCollections.map((questionCollection) => (
          <Link
            to={`/quiz/${questionCollection._id}`}
            key={questionCollection._id}
          >
            <ol >
            <h3 className="kk">
              {`${questionCollection.category} ${questionCollection.subcategory} `}
            </h3>
            </ol>
          </Link>
        ))}
      </ul>
      </div>
     
    </div>
    </body>
  );
};

export default QuestionCollectionsComponent;

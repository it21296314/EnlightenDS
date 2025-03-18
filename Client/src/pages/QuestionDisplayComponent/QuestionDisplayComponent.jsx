import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Quiz from "./RenderQuestions";

function QuestionDisplayComponent() {
  const { questionCollectionId } = useParams();
  const [questions, setQuestions] = React.useState([]);
  const [childUserId, setChildUserId] = React.useState("Sadeeka");

  useEffect(() => {
    // Get childUserId from localStorage
    const currentChild = JSON.parse(localStorage.getItem('currentChild'));
    if (currentChild) {
      setChildUserId(currentChild._id);
    }

    const fetchQuestionCollections = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/quizzes/quiz/${questionCollectionId}`
        );
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching questionCollections:", error);
      }
    };

    fetchQuestionCollections();
  }, [questionCollectionId]);

  console.log("hellow world");
  console.log({ questions });

  return (
    <>
      <div className="xx">QuestionDisplayComponent</div>
      <div>
        <Quiz 
          questions={questions} 
          userId={childUserId}
          questionCollectionId={questionCollectionId}
        />
      </div>
    </>
  );
}

export default QuestionDisplayComponent;

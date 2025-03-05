import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Quiz from "./RenderQuestions";


function QuestionDisplayComponent() {
  const { questionCollectionId } = useParams();
  const [questions, setQuestions] = React.useState([]);

  useEffect(() => {
    const fetchQuestionCollections = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8070/quiz/${questionCollectionId}`
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
      <div >
      <Quiz questions={questions} />
      </div>
    </>
  );
}

export default QuestionDisplayComponent;

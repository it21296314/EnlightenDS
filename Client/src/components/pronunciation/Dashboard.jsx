import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizTrends from "./QuizTrends"; // Ensure correct path

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null); // Define selectedUserId

  useEffect(() => {
    axios.get("http://localhost:5000/analytics")
      .then((response) => {
        setData(response.data);
        if (response.data.length > 0) {
          setSelectedUserId(response.data[0].user_id); // Automatically select the first user
        }
      })
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  const handleGenerateFeedback = async (userId) => {
    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const response = await axios.get(`http://localhost:5000/generate-report?user_id=${userId}`);
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error generating feedback:", error);
      setError("Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/generate-report?user_id=${userId}&format=pdf`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Feedback_Report_${userId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating PDF:", error);
      setError("Failed to download PDF. Please try again.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <h1>Analytics Dashboard</h1>
        <table border="1">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Category</th>
              <th>Correct</th>
              <th>Incorrect</th>
              <th>Total Attempts</th>
              <th>Accuracy (%)</th>
              <th>AI Feedback</th>
              <th>PDF Report</th>
            </tr>
          </thead>
          <tbody>
            {data.map((record, index) => (
              <tr key={index}>
                <td>{record.user_id}</td>
                <td>{record.category}</td>
                <td>{record.correct_count}</td>
                <td>{record.incorrect_count}</td>
                <td>{record.correct_count + record.incorrect_count}</td>
                <td>
                  {record.correct_count + record.incorrect_count > 0
                    ? ((record.correct_count / (record.correct_count + record.incorrect_count)) * 100).toFixed(2) + "%"
                    : "0%"}
                </td>
                <td>
                  <button onClick={() => handleGenerateFeedback(record.user_id)}>
                    {loading ? "Generating..." : "Get AI Feedback"}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDownloadPDF(record.user_id)}>Download PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {feedback && (
          <div>
            <h2>AI Feedback Report</h2>
            <p>{feedback}</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;

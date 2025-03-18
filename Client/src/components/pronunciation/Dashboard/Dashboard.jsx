import React, { useState, useEffect } from "react";
import axios from "axios";
import QuizTrends from "../QuizTrends"; // Ensure correct path
import ReportViewer from "../../../components/pronunciation/Dashboard/ReportViewer";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showReport, setShowReport] = useState(false);

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
      setSelectedUserId(userId);
    } catch (error) {
      console.error("Error generating feedback:", error);
      setError("Failed to generate feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (userId) => {
    setSelectedUserId(userId);
    setShowReport(true);
  };

  const handleCloseReport = () => {
    setShowReport(false);
  };

  const getAccuracyClass = (accuracy) => {
    if (accuracy >= 70) return "analytics-dashboard__accuracy--high";
    if (accuracy >= 40) return "analytics-dashboard__accuracy--medium";
    return "analytics-dashboard__accuracy--low";
  };

  return (
    <div className="analytics-dashboard">
      {showReport ? (
        <div className="analytics-dashboard__report-overlay">
          <div className="analytics-dashboard__report-modal">
            <button className="analytics-dashboard__close-button" onClick={handleCloseReport}>×</button>
            <ReportViewer userId={selectedUserId} />
          </div>
        </div>
      ) : (
        <div>
          <h1 className="analytics-dashboard__title">Analytics Dashboard</h1>
          <table className="analytics-dashboard__table">
            <thead>
              <tr>
                
                <th className="analytics-dashboard__table-header">Category</th>
                <th className="analytics-dashboard__table-header">Correct</th>
                <th className="analytics-dashboard__table-header">Incorrect</th>
                <th className="analytics-dashboard__table-header">Total Attempts</th>
                <th className="analytics-dashboard__table-header">Accuracy (%)</th>
                <th className="analytics-dashboard__table-header">Report</th>
              </tr>
            </thead>
            <tbody>
              {data.map((record, index) => {
                const accuracy = record.correct_count + record.incorrect_count > 0
                  ? ((record.correct_count / (record.correct_count + record.incorrect_count)) * 100)
                  : 0;
                
                return (
                  <tr 
                    key={index} 
                    className={`analytics-dashboard__table-row ${
                      index % 2 === 0 ? 'analytics-dashboard__table-row--even' : 'analytics-dashboard__table-row--odd'
                    }`}
                  >
                    
                    <td className="analytics-dashboard__table-cell">{record.category}</td>
                    <td className="analytics-dashboard__table-cell">{record.correct_count}</td>
                    <td className="analytics-dashboard__table-cell">{record.incorrect_count}</td>
                    <td className="analytics-dashboard__table-cell">{record.correct_count + record.incorrect_count}</td>
                    <td className={`analytics-dashboard__table-cell analytics-dashboard__accuracy ${getAccuracyClass(accuracy)}`}>
                      {accuracy.toFixed(2)}%
                    </td>
                    <td className="analytics-dashboard__table-cell">
                      <button 
                        onClick={() => handleViewReport(record.user_id)} 
                        className="analytics-dashboard__button analytics-dashboard__button--blue"
                      >
                        View Report
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {error && <p className="analytics-dashboard__error-message">{error}</p>}
          {feedback && (
            <div className="analytics-dashboard__feedback-container">
              <h2>AI Feedback Report</h2>
              <p>{feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
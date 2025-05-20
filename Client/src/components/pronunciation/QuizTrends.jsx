import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const QuizTrends = () => {
  const [trendData, setTrendData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/charts/quiz-trends")
      .then(response => {
        console.log("Raw Data:", response.data);
  
        // Transform data into required format
        const formattedData = response.data.map(item => ({
          date: item.date || "2024-03-01", // Ensure 'date' field exists
          accuracy: parseFloat(item.marks_percentage) || 0 // Convert to number
        }));
  
        console.log("Formatted Data:", formattedData);
        setTrendData(formattedData);
      })
      .catch(error => console.error("Error fetching quiz trends:", error));
  }, []);
  

  return (
    <div>
      <h2>Overall Quiz Performance Trends</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="accuracy" fill="#FF0000" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuizTrends;

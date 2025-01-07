// src/Dashboard.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/analytics")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching analytics:", error));
  }, []);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Correct</th>
            <th>Incorrect</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index}>
              <td>{record.category}</td>
              <td>{record.correct}</td>
              <td>{record.incorrect}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;

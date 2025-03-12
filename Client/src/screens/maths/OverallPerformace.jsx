// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";

// const PerformanceDashboard = ({ childId }) => {
//   const [performance, setPerformance] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [recommendations, setRecommendations] = useState([]); 

//   useEffect(() => {
//     axios.get(`http://localhost:3001/api/overall/performance/${childId}`)
//       .then((response) => {
//         setPerformance(response.data.performance);
//         setComments(response.data.comments);
//         setRecommendations(response.data.recommendations);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [childId]);

//   if (!performance) return <p>Loading...</p>;

//   const categories = Object.keys(performance);
//   const levels = ["beginner", "intermediate", "advanced"];

//   const chartData = {
//     labels: categories,
//     datasets: levels.map((level, index) => ({
//       label: `Correct Answers (${level})`,
//       data: categories.map((category) => performance[category][level]?.correct || 0),
//       backgroundColor: ["#4CAF50", "#FF9800", "#F44336"][index], // Green, Orange, Red
//     })),
//   };

//   return (
//     <div>
//       <h2>Child Performance Dashboard</h2>
//       <Bar data={chartData} />
//       <h3>Comments & Insights</h3>
//       <ul>
//         {comments.map((comment, index) => (
//           <li key={index}>{comment}</li>
//         ))}
//       </ul>
//       <h3>Recommended Actions</h3>
// <ul>
//   {recommendations.map((rec, index) => (
//     <li key={index}>{rec}</li>
//   ))}
// </ul>
//     </div>
//   );
// };

// export default PerformanceDashboard;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// // Register required Chart.js components
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const PerformanceDashboard = ({ childId }) => {
//   const [performance, setPerformance] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [recommendations, setRecommendations] = useState([]); // Missing state added

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/api/overall/performance/${childId}`)
//       .then((response) => {
//         setPerformance(response.data.performance);
//         setComments(response.data.comments);
//         setRecommendations(response.data.recommendations);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [childId]);

//   if (!performance) return <p>Loading...</p>;

//   const categories = Object.keys(performance);
//   const levels = ["beginner", "intermediate", "advanced"];

//   const chartData = {
//     labels: categories,
//     datasets: levels.map((level, index) => ({
//       label: `Correct Answers (${level})`,
//       data: categories.map((category) => performance[category][level]?.correct || 0),
//       backgroundColor: ["#4CAF50", "#FF9800", "#F44336"][index], // Green, Orange, Red
//     })),
//   };

//   return (
//     <div>
//       <h2>Child Performance Dashboard</h2>
//       <Bar data={chartData} />
//       <h3>Comments & Insights</h3>
//       <ul>
//         {comments.map((comment, index) => (
//           <li key={index}>{comment}</li>
//         ))}
//       </ul>
//       <h3>Recommended Actions</h3>
//       <ul>
//         {recommendations.map((rec, index) => (
//           <li key={index}>{rec}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PerformanceDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PerformanceDashboard = ({ childId }) => {
  const [performance, setPerformance] = useState(null);
  const [comments, setComments] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [activeTab, setActiveTab] = useState("chart");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3001/api/overall/performance/${childId}`)
      .then((response) => {
        setPerformance(response.data.performance);
        setComments(response.data.comments);
        setRecommendations(response.data.recommendations);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Oops! Something went wrong loading your progress.");
        setIsLoading(false);
      });
  }, [childId]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-4">
        <div className="text-4xl animate-bounce mb-2">🚀</div>
        <p className="text-xl font-bold text-center">Loading your awesome progress...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 p-4">
        <div className="text-4xl mb-2">😕</div>
        <p className="text-xl font-bold text-center">{error}</p>
        <button 
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => window.location.reload()}
        >
          Try Again 🔄
        </button>
      </div>
    );
  }

  if (!performance) return null;

  const categories = Object.keys(performance);
  const levels = ["beginner", "intermediate", "advanced"];
  const levelEmojis = ["🌱", "🌿", "🌳"];
  const levelColors = ["#8BE08D", "#FFB74D", "#64B5F6"]; // Soft green, orange, blue

  // Category emojis mapping
  const categoryEmojis = {
    math: "🔢",
    reading: "📚",
    science: "🔬",
    writing: "✏️",
    art: "🎨",
    music: "🎵",
    history: "🏛️",
    geography: "🌍",
    coding: "💻",
    languages: "🗣️",
    // Add more categories as needed
  };

  // Get emoji for each category or default to star
  const getCategoryEmoji = (category) => {
    return categoryEmojis[category.toLowerCase()] || "⭐";
  };

  const chartData = {
    labels: categories.map(category => `${getCategoryEmoji(category)} ${category}`),
    datasets: levels.map((level, index) => ({
      label: `${levelEmojis[index]} ${level.charAt(0).toUpperCase() + level.slice(1)}`,
      data: categories.map((category) => performance[category][level]?.correct || 0),
      backgroundColor: levelColors[index],
      borderRadius: 8,
      borderWidth: 0,
      maxBarThickness: 50,
    })),
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Comic Sans MS, sans-serif',
            size: 14
          },
          usePointStyle: true,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#333',
        titleFont: {
          family: 'Comic Sans MS, sans-serif',
          size: 14
        },
        bodyFont: {
          family: 'Comic Sans MS, sans-serif',
          size: 12
        },
        padding: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          title: (tooltipItems) => {
            return `${tooltipItems[0].label} Progress`;
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.raw} stars earned!`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: 'Comic Sans MS, sans-serif',
            size: 12
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
          font: {
            family: 'Comic Sans MS, sans-serif',
            size: 12
          },
          callback: function(value) {
            return value + ' ⭐';
          }
        },
        title: {
          display: true,
          text: 'Stars Earned',
          font: {
            family: 'Comic Sans MS, sans-serif',
            size: 14
          }
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutBounce'
    }
  };

  // Recommendation emojis based on type
  const getRecommendationEmoji = (rec) => {
    if (rec.toLowerCase().includes("practice")) return "🎯";
    if (rec.toLowerCase().includes("try")) return "🚀";
    if (rec.toLowerCase().includes("review")) return "📝";
    if (rec.toLowerCase().includes("watch")) return "📺";
    if (rec.toLowerCase().includes("read")) return "📚";
    if (rec.toLowerCase().includes("play")) return "🎮";
    return "💡";
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-purple-600">
          Your Amazing Learning Journey! 🚀
        </h2>
        <div className="flex bg-white rounded-full p-1 shadow-md">
          <button
            className={`px-3 py-2 rounded-full text-sm font-bold ${
              activeTab === "chart" ? "bg-blue-500 text-white" : "text-blue-500"
            }`}
            onClick={() => setActiveTab("chart")}
          >
            📊 Progress
          </button>
          <button
            className={`px-3 py-2 rounded-full text-sm font-bold ${
              activeTab === "insights" ? "bg-blue-500 text-white" : "text-blue-500"
            }`}
            onClick={() => setActiveTab("insights")}
          >
            🧠 Insights
          </button>
          <button
            className={`px-3 py-2 rounded-full text-sm font-bold ${
              activeTab === "next" ? "bg-blue-500 text-white" : "text-blue-500"
            }`}
            onClick={() => setActiveTab("next")}
          >
            ⭐ Next Steps
          </button>
        </div>
      </div>

      {activeTab === "chart" && (
        <div className="bg-white rounded-2xl p-4 shadow-md mb-6">
          <div className="h-64 md:h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {categories.map((category, index) => {
              const total = levels.reduce(
                (sum, level) => sum + (performance[category][level]?.correct || 0),
                0
              );
              const max = levels.reduce(
                (sum, level) => sum + (performance[category][level]?.total || 0),
                0
              );
              const percentage = Math.round((total / max) * 100) || 0;
              
              return (
                <div key={index} className="bg-blue-50 rounded-xl p-3 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{getCategoryEmoji(category)} {category}</span>
                    <span className="text-sm font-medium">{percentage}% mastered</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-500 rounded-full h-4"
                      style={{ width: `${percentage}%`, transition: "width 1s ease-in-out" }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === "insights" && (
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="text-xl font-bold text-blue-600 mb-4">
            Amazing Things We've Noticed 🔍
          </h3>
          <div className="space-y-3">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg">
                <div className="text-xl mr-3">✨</div>
                <p>{comment}</p>
              </div>
            ))}
            {comments.length === 0 && (
              <div className="p-6 text-center">
                <div className="text-4xl mb-2">🌈</div>
                <p>Keep going! Insights will appear as you learn more.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "next" && (
        <div className="bg-white rounded-2xl p-4 shadow-md">
          <h3 className="text-xl font-bold text-green-600 mb-4">
            Your Next Adventures! 🚀
          </h3>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-start p-3 bg-green-50 rounded-lg">
                <div className="text-xl mr-3">{getRecommendationEmoji(rec)}</div>
                <p>{rec}</p>
              </div>
            ))}
            {recommendations.length === 0 && (
              <div className="p-6 text-center">
                <div className="text-4xl mb-2">🔮</div>
                <p>Exciting recommendations are coming soon!</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition hover:scale-105"
          onClick={() => alert("Great job today! 🌟")}
        >
          Celebrate Your Progress! 🎉
        </button>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
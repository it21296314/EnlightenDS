// // // // import { useEffect, useState } from "react";
// // // // import { Card, CardContent } from "../../components/UI/card";
// // // // import { Button } from "../../components/UI/button";
// // // // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// // // // const Dashboard = ({ childId }) => {
// // // //   const [prediction, setPrediction] = useState(null);
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     if (!childId) return;
    
// // // //     const fetchData = async () => {
// // // //       setLoading(true);
// // // //       try {
// // // //         const response = await fetch(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
// // // //         const data = await response.json();
        
// // // //         const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
// // // //           method: "POST",
// // // //           headers: { "Content-Type": "application/json" },
// // // //           body: JSON.stringify(data)
// // // //         });
        
// // // //         const predictionResult = await predictionResponse.json();
// // // //         setPrediction(predictionResult);
// // // //       } catch (err) {
// // // //         setError("Failed to fetch prediction data");
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchData();
// // // //   }, [childId]);

// // // //   return (
// // // //     <div className="p-4 md:p-8">
// // // //       <h2 className="text-2xl font-bold mb-4">Analyzis</h2>
// // // //       {loading && <p>Loading data...</p>}
// // // //       {error && <p className="text-red-500">{error}</p>}
// // // //       {prediction && (
// // // //         <Card className="p-4">
// // // //           <CardContent>
// // // //             <h3 className="text-xl font-semibold mb-2">Prediction Result</h3>
// // // //             <p className="mb-4">{prediction.message || "Analysis complete."}</p>
// // // //             <ResponsiveContainer width="100%" height={300}>
// // // //               <BarChart data={prediction.chartData}>
// // // //                 <XAxis dataKey="label" />
// // // //                 <YAxis />
// // // //                 <Tooltip />
// // // //                 <Bar dataKey="value" fill="#4A90E2" />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </CardContent>
// // // //         </Card>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Dashboard;
// // // import { useEffect, useState } from "react";
// // // import { Card, CardContent } from "../../components/UI/card";
// // // import { Button } from "../../components/UI/button";
// // // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// // // const Dashboard = ({ childId }) => {
// // //   const [prediction, setPrediction] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     if (!childId) return;
    
// // //     const fetchData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const response = await fetch(`http://127.0.0.1:5000/predict`, {
// // //           method: "POST",
// // //           headers: { "Content-Type": "application/json" },
// // //           body: JSON.stringify({ childId }) // Adjust if necessary based on what your model expects
// // //         });
        
// // //         const predictionResult = await response.json();
// // //         setPrediction(predictionResult);
// // //       } catch (err) {
// // //         setError("Failed to fetch prediction data");
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [childId]);

// // //   return (
// // //     <div className="p-4 md:p-8">
// // //       <h2 className="text-2xl font-bold mb-4">Analysis</h2>
// // //       {loading && <p>Loading data...</p>}
// // //       {error && <p className="text-red-500">{error}</p>}
// // //       {prediction && (
// // //         <Card className="p-4">
// // //           <CardContent>
// // //             <h3 className="text-xl font-semibold mb-2">Prediction Result</h3>
// // //             <p className="mb-4">Readiness: {prediction.readiness}</p>
// // //             <p>Probability of being ready: {prediction.probability.ready}</p>
// // //             <p>Probability of not being ready: {prediction.probability.not_ready}</p>
// // //             <h4 className="text-lg font-medium mt-4">Feature Contributions (SHAP Values)</h4>
// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <BarChart data={Object.keys(prediction.explainability.shap_values).map((key) => ({
// // //                 feature: key,
// // //                 value: prediction.explainability.shap_values[key]
// // //               }))}>
// // //                 <XAxis dataKey="feature" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Bar dataKey="value" fill="#4A90E2" />
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //             <h4 className="text-lg font-medium mt-4">Feature Importance</h4>
// // //             <ResponsiveContainer width="100%" height={300}>
// // //               <BarChart data={Object.keys(prediction.explainability.feature_importance).map((key) => ({
// // //                 feature: key,
// // //                 value: prediction.explainability.feature_importance[key]
// // //               }))}>
// // //                 <XAxis dataKey="feature" />
// // //                 <YAxis />
// // //                 <Tooltip />
// // //                 <Bar dataKey="value" fill="#F39C12" />
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </CardContent>
// // //         </Card>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;
// // import { useEffect, useState } from "react";
// // import { Card, CardContent } from "../../components/UI/card";
// // import { Button } from "../../components/UI/button";
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// // import { useLocation } from "react-router-dom";

// // const Dashboard = () => {
// //   const [prediction, setPrediction] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   //const [error, setError] = useState(null);

// //   const location = useLocation();
// //   const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");


// //   useEffect(() => {
// //     if (!childId) return;
  
// //     const fetchData = async () => {
// //       setLoading(true);
// //       //setError(null);
// //       try {
// //         console.log("Fetching model data...");
// //         const response = await fetch(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
// //         if (!response.ok) throw new Error("Failed to fetch model data");
  
// //         const data = await response.json();
// //         console.log("Model Data:", data);
  
// //         console.log("Sending data for prediction...");
// //         const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify(data),
// //         });
  
// //         if (!predictionResponse.ok) throw new Error("Failed to fetch prediction");
  
// //         const predictionResult = await predictionResponse.json();
// //         console.log("Prediction Result:", predictionResult);
  
// //         setPrediction(predictionResult);
// //       } catch (err) {
// //         console.error(err);
// //         //setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
  
// //     fetchData();
// //   }, [childId]);
  

// //   return (
// //     <div className="p-4 md:p-8">
// //       <h2 className="text-2xl font-bold mb-4">Analysis</h2>
// //       {loading && <p>Loading data...</p>}
// //       {/* {error && <p className="text-red-500">{error}</p>} */}
// //       {prediction && (
// //         <Card className="p-4">
// //           <CardContent>
// //             <h3 className="text-xl font-semibold mb-2">Prediction Result</h3>
// //             <p className="mb-4">Readiness: {prediction.readiness}</p>
// //             <p>Probability of being ready: {prediction.probability.ready}</p>
// //             <p>Probability of not being ready: {prediction.probability.not_ready}</p>
// //             <h4 className="text-lg font-medium mt-4">Feature Contributions (SHAP Values)</h4>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={Object.keys(prediction.explainability.shap_values).map((key) => ({
// //                 feature: key,
// //                 value: prediction.explainability.shap_values[key]
// //               }))}>
// //                 <XAxis dataKey="feature" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="value" fill="#4A90E2" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //             <h4 className="text-lg font-medium mt-4">Feature Importance</h4>
// //             <ResponsiveContainer width="100%" height={300}>
// //               <BarChart data={Object.keys(prediction.explainability.feature_importance).map((key) => ({
// //                 feature: key,
// //                 value: prediction.explainability.feature_importance[key]
// //               }))}>
// //                 <XAxis dataKey="feature" />
// //                 <YAxis />
// //                 <Tooltip />
// //                 <Bar dataKey="value" fill="#F39C12" />
// //               </BarChart>
// //             </ResponsiveContainer>
// //           </CardContent>
// //         </Card>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { Card, CardContent } from "../../components/UI/card";
// import { Button } from "../../components/UI/button";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import { RotateCcw } from "lucide-react"; // Refresh Icon
// import QuizProgressChart from '../maths/QuizProgressChart'
// import PerformanceDashboard from "./OverallPerformace";
// import { Chart as ChartJS, CategoryScale, LinearScale } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale);

// const Dashboard = () => {
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const location = useLocation();
//   // const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");
//   const { childId, difficulty, category } = location.state || {};

//   useEffect(() => {
//     // ✅ Add Tailwind CSS dynamically
//     const link = document.createElement("link");
//     link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);

//     // ✅ Log received data
//     console.log("Received Data in Dashboard:", { prediction, childId, difficulty, category });

//     // ✅ Cleanup function to remove Tailwind when the component unmounts
//     return () => {
//       document.head.removeChild(link);
//     };
//   }, [prediction, childId, difficulty, category]);  // ✅ Dependencies added

//   const fetchData = async () => {
//     if (!childId) return;
//     setLoading(true);
//     setError(null);

//     try {
//       console.log("Fetching model data...");
//       const response = await fetch(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
//       if (!response.ok) throw new Error("Failed to fetch model data");

//       const data = await response.json();
//       console.log("Model Data:", data);

//       console.log("Sending data for prediction...");
//       const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!predictionResponse.ok) throw new Error("Failed to fetch prediction");

//       const predictionResult = await predictionResponse.json();
//       console.log("Prediction Result:", predictionResult);

//       setPrediction(predictionResult);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [childId]);

//   return (
//     <div className="p-4 md:p-8 space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Analysis</h2>
//         <Button variant="outline" onClick={fetchData} className="flex items-center gap-2">
//           <RotateCcw size={18} /> Refresh
//         </Button>
//       </div>

//       <div className="grid gap-4 p-6">
//             <QuizProgressChart childId={childId} difficulty={difficulty} category={category} />
//         </div>
//         <div className="grid gap-4 p-6">
//             <PerformanceDashboard childId={childId} />
//         </div>

//       {loading && (
//         <div className="flex justify-center items-center">
//           <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
//         </div>
//       )}

//       {error && (
//         <div className="bg-red-100 text-red-600 p-3 rounded-lg flex justify-between items-center">
//           <span>{error}</span>
//           <Button variant="ghost" onClick={() => setError(null)}>✖</Button>
//         </div>
//       )}

//       {prediction && (
//         <Card className="p-4">
//           <CardContent>
//             <h3 className="text-xl font-semibold mb-2">Prediction Result</h3>
//             <p className="mb-4"><span className="font-semibold">Readiness:</span> {prediction.readiness}</p>
//             <p><span className="font-semibold">Probability of being ready:</span> {prediction.probability.ready}</p>
//             <p><span className="font-semibold">Probability of not being ready:</span> {prediction.probability.not_ready}</p>


//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

// // import { useEffect, useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { Card } from "../../components/UI/card";
// // import { Button } from "../../components/UI/button";

// // import { RotateCcw } from "lucide-react"; // Refresh Icon
// // import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from "recharts";

// // const Dashboard = () => {
// //   const [prediction, setPrediction] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);
  
// //   const location = useLocation();
// //   const childId = location.state?.childId || localStorage.getItem("childId") || sessionStorage.getItem("childId");

// //   const fetchData = async () => {
// //     if (!childId) return;
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       console.log("Fetching model data...");
// //       const response = await fetch(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
// //       if (!response.ok) throw new Error("Failed to fetch model data");

// //       const data = await response.json();
// //       console.log("Model Data:", data);

// //       console.log("Sending data for prediction...");
// //       const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       });

// //       if (!predictionResponse.ok) throw new Error("Failed to fetch prediction");

// //       const predictionResult = await predictionResponse.json();
// //       console.log("Prediction Result:", predictionResult);

// //       setPrediction(predictionResult);
// //     } catch (err) {
// //       console.error(err);
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [childId]);

// //   // Dummy Data for Charts
// //   const barData = [
// //     { name: "Jan", 2019: 30, 2020: 10 },
// //     { name: "Feb", 2019: 40, 2020: 20 },
// //     { name: "Mar", 2019: 35, 2020: 25 },
// //     { name: "Apr", 2019: 50, 2020: 30 },
// //     { name: "May", 2019: 20, 2020: 15 },
// //     { name: "Jun", 2019: 48, 2020: 28 },
// //   ];

// //   const areaData = [
// //     { name: "Jan", value1: 30, value2: 20 },
// //     { name: "Feb", value1: 50, value2: 30 },
// //     { name: "Mar", value1: 40, value2: 25 },
// //     { name: "Apr", value1: 60, value2: 35 },
// //     { name: "May", value1: 45, value2: 28 },
// //     { name: "Jun", value1: 70, value2: 40 },
// //   ];

// //   const pieData = [
// //     { name: "Completed", value: 45 },
// //     { name: "Remaining", value: 55 },
// //   ];
// //   const COLORS = ["#FFA500", "#4A90E2"];

// //   return (
// //     <div className="p-4 md:p-8 space-y-6 bg-gray-100 min-h-screen">
// //       {/* Header */}
// //       <div className="flex justify-between items-center">
// //         <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
// //         <Button variant="outline" onClick={fetchData} className="flex items-center gap-2">
// //           <RotateCcw size={18} /> Refresh
// //         </Button>
// //       </div>

// //       {/* Statistics Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
// //         <Card className="bg-blue-600 text-white p-5">
// //           <h3 className="text-lg font-semibold">Earning</h3>
// //           <p className="text-3xl font-bold">$628</p>
// //         </Card>
// //         <Card className="p-5">
// //           <h3 className="text-lg font-semibold">Shares</h3>
// //           <p className="text-3xl font-bold text-blue-500">2434</p>
// //         </Card>
// //         <Card className="p-5">
// //           <h3 className="text-lg font-semibold">Likes</h3>
// //           <p className="text-3xl font-bold text-yellow-500">1259</p>
// //         </Card>
// //         <Card className="p-5">
// //           <h3 className="text-lg font-semibold">Rating</h3>
// //           <p className="text-3xl font-bold text-green-500">8.5</p>
// //         </Card>
// //       </div>

// //       {/* Charts Section */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* Bar Chart */}
// //         <Card className="p-5">
// //           <h3 className="text-lg font-semibold mb-4">Result Overview</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={barData}>
// //               <XAxis dataKey="name" tick={{ fontSize: 12 }} />
// //               <YAxis />
// //               <Tooltip />
// //               <Bar dataKey="2019" fill="#FFA500" />
// //               <Bar dataKey="2020" fill="#4A90E2" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Pie Chart */}
// //         <Card className="p-5">
// //           <h3 className="text-lg font-semibold mb-4">Progress</h3>
// //           <ResponsiveContainer width="100%" height={300}>
// //             <PieChart>
// //               <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} fill="#8884d8" dataKey="value">
// //                 {pieData.map((entry, index) => (
// //                   <Cell key={`cell-${index}`} fill={COLORS[index]} />
// //                 ))}
// //               </Pie>
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </Card>
// //       </div>

// //       {/* Area Chart & Calendar */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* Area Chart */}
// //         <Card className="p-5">
// //           <h3 className="text-lg font-semibold mb-4">Performance Trends</h3>
// //           <ResponsiveContainer width="100%" height={250}>
// //             <AreaChart data={areaData}>
// //               <XAxis dataKey="name" tick={{ fontSize: 12 }} />
// //               <YAxis />
// //               <Tooltip />
// //               <Area type="monotone" dataKey="value1" stroke="#FFA500" fill="#FFA500" />
// //               <Area type="monotone" dataKey="value2" stroke="#4A90E2" fill="#4A90E2" />
// //             </AreaChart>
// //           </ResponsiveContainer>
// //         </Card>

// //         {/* Calendar Placeholder */}
// //         <Card className="p-5 flex flex-col items-center justify-center">
// //           <h3 className="text-lg font-semibold mb-4">Calendar</h3>
// //           <p className="text-gray-500">📅 Calendar Widget Placeholder</p>
// //         </Card>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent } from "../../components/UI/card";
import { Button } from "../../components/UI/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { RotateCcw, Award, Star, ArrowRight, ChevronUp } from "lucide-react"; // Icons
import QuizProgressChart from '../maths/QuizProgressChart';
import PerformanceDashboard from "./OverallPerformace";
import { Chart as ChartJS, CategoryScale, LinearScale } from "chart.js";
import confetti from 'canvas-confetti';

ChartJS.register(CategoryScale, LinearScale);

const Dashboard = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const location = useLocation();
  const { childId, difficulty, category } = location.state || {};

  useEffect(() => {
    // Add Tailwind CSS dynamically
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    // Log received data
    console.log("Received Data in Dashboard:", { prediction, childId, difficulty, category });

    // Cleanup function to remove Tailwind when the component unmounts
    return () => {
      document.head.removeChild(link);
    };
  }, [prediction, childId, difficulty, category]);

  // Trigger confetti effect when prediction shows ready
  useEffect(() => {
    if (prediction && prediction.probability.ready >= 0.7 && !showConfetti) {
      setShowConfetti(true);
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      
      const randomInRange = (min, max) => Math.random() * (max - min) + min;
      
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        
        const particleCount = 50 * (timeLeft / duration);
        
        // Launch confetti from both sides
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);
    }
  }, [prediction, showConfetti]);

  const fetchData = async () => {
    if (!childId) return;
    setLoading(true);
    setError(null);
    setShowConfetti(false);

    try {
      console.log("Fetching model data...");
      const response = await fetch(`http://localhost:3001/api/datapipeline/getModelData?childId=${childId}`);
      if (!response.ok) throw new Error("Failed to fetch model data");

      const data = await response.json();
      console.log("Model Data:", data);

      console.log("Sending data for prediction...");
      const predictionResponse = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!predictionResponse.ok) throw new Error("Failed to fetch prediction");

      const predictionResult = await predictionResponse.json();
      console.log("Prediction Result:", predictionResult);

      setPrediction(predictionResult);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [childId]);

  // Get message and animation based on readiness level
  const getReadinessInfo = () => {
    if (!prediction) return { message: "", animation: "", color: "" };
    
    const readyProb = prediction.probability.ready;
    
    if (readyProb >= 0.9) {
      return {
        message: "You're super ready for the next level! Amazing job! 🎓",
        animation: "https://i.giphy.com/media/LCdPNT81vlv3y/giphy.gif",
        color: "bg-green-100 border-green-500"
      };
    } else if (readyProb >= 0.7) {
      return {
        message: "You're ready to level up! Keep going! 🚀",
        animation: "https://i.giphy.com/media/l4JySAWfMaY7w88sU/giphy.gif",
        color: "bg-blue-100 border-blue-500"
      };
    } else if (readyProb >= 0.5) {
      return {
        message: "You're getting closer to the next level! A bit more practice will help! 💪",
        animation: "https://i.giphy.com/media/xUPGcjUQcWclgK94ti/giphy.gif",
        color: "bg-yellow-100 border-yellow-500"
      };
    } else {
      return {
        message: "Keep practicing! You're making progress! 🌱",
        animation: "https://i.giphy.com/media/3oEduVGyuRGuT6h0sM/giphy.gif",
        color: "bg-orange-100 border-orange-500"
      };
    }
  };

  const { message, animation, color } = getReadinessInfo();

  return (
    <div className="p-4 md:p-6 space-y-8 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 flex items-center">
          <Award className="mr-2" size={28} color="#3B82F6" />
          Your Learning Adventure
        </h2>
        <Button 
          variant="outline" 
          onClick={fetchData} 
          className="flex items-center gap-2 bg-white hover:bg-blue-50 border-2 border-blue-300 text-blue-700 rounded-full py-2 px-4 shadow-md transition-all hover:shadow-lg"
        >
          <RotateCcw size={18} /> Refresh
        </Button>
      </div>

      {/* Prediction Result Card - Positioned at the top */}
      {prediction && (
        <Card className={`p-0 overflow-hidden rounded-2xl shadow-lg border-2 ${color}`}>
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-6 flex flex-col justify-center">
                <div className="flex items-center mb-2">
                  <Star className="mr-2" fill="#FFD700" color="#FFD700" />
                  <h3 className="text-xl md:text-2xl font-bold">Your Progress Report</h3>
                </div>
                
                <div className="text-lg md:text-xl font-medium mb-4">{message}</div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white bg-opacity-70 p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Ready Score</div>
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round(prediction.probability.ready * 100)}%
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                      <div 
                        className="bg-green-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${prediction.probability.ready * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-70 p-4 rounded-xl shadow-sm">
                    <div className="text-sm text-gray-600 mb-1">Practice Needed</div>
                    <div className="text-2xl font-bold text-orange-500">
                      {Math.round(prediction.probability.not_ready * 100)}%
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
                      <div 
                        className="bg-orange-500 h-3 rounded-full transition-all duration-1000 ease-out" 
                        style={{ width: `${prediction.probability.not_ready * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  {prediction.probability.ready >= 0.7 ? (
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-full py-3 flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-lg">
                      Move to Next Level <ArrowRight size={18} />
                    </Button>
                  ) : (
                    <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full py-3 flex items-center justify-center gap-2 shadow-md transition-all hover:shadow-lg">
                      Keep Practicing <ChevronUp size={18} />
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center bg-white p-4">
                <img 
                  src={animation} 
                  alt="Celebration animation" 
                  className="max-h-60 object-contain"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {loading && (
        <div className="flex flex-col justify-center items-center p-10 bg-white rounded-2xl shadow-md">
          <div className="animate-bounce text-5xl mb-4">🚀</div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
          <p className="text-lg font-medium text-blue-700">Loading your awesome results...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-6 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-md border border-red-200">
          <div className="flex items-center mb-4 md:mb-0">
            <span className="text-4xl mr-4">😕</span>
            <span className="text-lg">{error}</span>
          </div>
          <Button 
            onClick={() => setError(null)} 
            className="bg-red-500 hover:bg-red-600 text-white rounded-full py-2 px-4"
          >
            Dismiss
          </Button>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
        <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center">
          <Star className="mr-2" fill="#FFD700" color="#FFD700" />
          Your Progress Charts
        </h3>
        <div className="grid gap-6">
          <div className="bg-blue-50 p-4 rounded-xl">
            <QuizProgressChart childId={childId} difficulty={difficulty} category={category} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
        <h3 className="text-xl font-bold mb-4 text-purple-700 flex items-center">
          <Star className="mr-2" fill="#9333EA" color="#9333EA" />
          Your Performance Dashboard
        </h3>
        <div className="grid gap-6">
          <div className="bg-purple-50 p-4 rounded-xl">
            <PerformanceDashboard childId={childId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
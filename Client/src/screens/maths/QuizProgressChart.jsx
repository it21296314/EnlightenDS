// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const QuizProgressChart = ({ childId }) => {
//     const [progressData, setProgressData] = useState([]);

//     useEffect(() => {
//         const fetchProgress = async () => {
//             try {
//                 const response = await axios.get(`'http://localhost:3001/api/quizs/progress/${childId}`);
//                 setProgressData(response.data);
//             } catch (error) {
//                 console.error("Error fetching progress data:", error);
//             }
//         };
//         fetchProgress();
//     }, [childId]);

//     return (
//         <div className="p-4 bg-white shadow-lg rounded-lg">
//             <h3 className="text-xl font-semibold mb-4">Quiz Progress</h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={progressData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
//                     <YAxis domain={[0, 100]} />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="quizMark" stroke="#4CAF50" strokeWidth={2} />
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default QuizProgressChart;

// import React, { useEffect, useState } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import axios from "axios";

// const QuizProgressChart = ({ childId, difficulty, category }) => {
//     const [progressData, setProgressData] = useState([]);

//     useEffect(() => {
//         console.log("Received in QuizProgressChart:", { childId, difficulty, category });
//         const fetchProgress = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3001/api/quizs/progress/${childId}`, {
//                     params: {
//                       difficulty: difficulty,
//                       category: category
//                     }
//                   });
//                    // ✅ Fixed URL
//                 setProgressData(response.data);
//             } catch (error) {
//                 console.error("Error fetching progress data:", error);
//             }
//         };
//         fetchProgress();
//     }, [childId, difficulty, category]);

//     return (
//         <div className="p-4 bg-white shadow-lg rounded-lg">
//             <h3 className="text-xl font-semibold mb-4">Quiz Progress Over the Time</h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={progressData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="date" tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
//                     <YAxis domain={[0, 100]} />
//                     <Tooltip />
//                     <Line type="monotone" dataKey="score" stroke="#4CAF50" strokeWidth={2} /> {/* ✅ Updated key */}
//                 </LineChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default QuizProgressChart;

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, ReferenceLine } from "recharts";
import axios from "axios";
import { Star, Award, TrendingUp, PieChart } from "lucide-react";

const QuizProgressChart = ({ childId, difficulty, category }) => {
    const [progressData, setProgressData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [averageScore, setAverageScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [improvement, setImprovement] = useState(0);

    // Define cheerful colors
    const chartColors = {
        easy: "#4CAF50",    // Green
        medium: "#FF9800",  // Orange
        hard: "#9C27B0",    // Purple
        default: "#2196F3"  // Blue
    };

    // Get color based on difficulty
    const getColor = () => {
        if (!difficulty) return chartColors.default;
        const level = difficulty.toLowerCase();
        return chartColors[level] || chartColors.default;
    };

    // Calculate stats from progress data
    const calculateStats = (data) => {
        if (data.length === 0) return;
        
        // Calculate average
        const sum = data.reduce((acc, item) => acc + item.score, 0);
        const avg = Math.round(sum / data.length);
        setAverageScore(avg);
        
        // Find best score
        const best = Math.max(...data.map(item => item.score));
        setBestScore(best);
        
        // Calculate improvement (difference between first and last score)
        if (data.length >= 2) {
            const firstScore = data[0].score;
            const lastScore = data[data.length - 1].score;
            setImprovement(lastScore - firstScore);
        }
    };

    useEffect(() => {
        console.log("Received in QuizProgressChart:", { childId, difficulty, category });
        const fetchProgress = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3001/api/quizs/progress/${childId}`, {
                    params: {
                      difficulty: difficulty,
                      category: category
                    }
                });
                   
                // Format dates and ensure scores are numbers
                const formattedData = response.data.map(item => ({
                    ...item,
                    score: Number(item.score),
                    date: new Date(item.date).toLocaleDateString()
                }));
                
                setProgressData(formattedData);
                calculateStats(formattedData);
            } catch (error) {
                console.error("Error fetching progress data:", error);
                setError("Oops! We couldn't load your amazing progress right now.");
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, [childId, difficulty, category]);

    // Custom tooltip component
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-blue-200">
                    <p className="font-bold text-sm">{label}</p>
                    <p className="text-lg">
                        <span role="img" aria-label="star">⭐</span> Score: {payload[0].value}
                    </p>
                    <p className="text-xs mt-1 text-blue-600">
                        {payload[0].value >= 8 ? "Excellent!" : 
                         payload[0].value >= 6 ? "Good job!" : 
                         payload[0].value >= 4 ? "Nice work!" : "Keep going!"}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Animation for the chart
    const gradientId = `colorScore${difficulty || 'default'}`;
    const chartColor = getColor();

    return (
        <div className="p-4 bg-white shadow-lg rounded-xl border-2 border-blue-100">
            <div className="flex items-center mb-4">
                <Star className="mr-2" fill="#FFD700" color="#FFD700" />
                <h3 className="text-xl font-bold">Your Quiz Adventure</h3>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-bounce text-5xl mb-4">🚀</div>
                    <p className="text-lg font-medium text-blue-600">Loading your amazing progress...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-5xl mb-4">😕</div>
                    <p className="text-lg font-medium text-red-500">{error}</p>
                    <button 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            ) : progressData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                    <div className="text-5xl mb-4">🌱</div>
                    <p className="text-lg font-medium text-blue-600">
                        You're just starting your journey!
                    </p>
                    <p className="mt-2 text-gray-600">
                        Take your first quiz to see your progress here.
                    </p>
                </div>
            ) : (
                <>
                    {/* Stats cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-3 rounded-xl shadow-sm flex items-center">
                            <Award className="mr-3" size={36} color="#2196F3" />
                            <div>
                                <div className="text-sm text-gray-600">Your Best Score</div>
                                <div className="text-2xl font-bold text-blue-700">{bestScore}/10</div>
                            </div>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded-xl shadow-sm flex items-center">
                            <PieChart className="mr-3" size={36} color="#9C27B0" />
                            <div>
                                <div className="text-sm text-gray-600">Average Score</div>
                                <div className="text-2xl font-bold text-purple-700">{averageScore}/10</div>
                            </div>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded-xl shadow-sm flex items-center">
                            <TrendingUp className="mr-3" size={36} color={improvement >= 0 ? "#4CAF50" : "#F44336"} />
                            <div>
                                <div className="text-sm text-gray-600">Improvement</div>
                                <div className="text-2xl font-bold" style={{ color: improvement >= 0 ? "#4CAF50" : "#F44336" }}>
                                    {improvement > 0 ? "+" : ""}{improvement*10}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The chart */}
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={progressData}>
                                <defs>
                                    <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor={chartColor} stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                                <XAxis 
                                    dataKey="date" 
                                    stroke="#666"
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                />
                                <YAxis 
                                    domain={[0, 10]} 
                                    stroke="#666"
                                    tick={{ fontSize: 12 }}
                                    tickMargin={10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <ReferenceLine y={80} stroke="#4CAF50" strokeDasharray="5 5" label={{ value: "Great!", position: "insideTopRight", fill: "#4CAF50" }} />
                                <ReferenceLine y={50} stroke="#FF9800" strokeDasharray="5 5" label={{ value: "Keep Going!", position: "insideBottomRight", fill: "#FF9800" }} />
                                <Line 
                                    type="monotone" 
                                    dataKey="score" 
                                    stroke={chartColor} 
                                    strokeWidth={3}
                                    dot={{ stroke: chartColor, strokeWidth: 2, r: 6, fill: "white" }}
                                    activeDot={{ stroke: chartColor, strokeWidth: 2, r: 8, fill: "white" }}
                                    fill={`url(#${gradientId})`}
                                    isAnimationActive={true}
                                    animationDuration={1500}
                                    animationEasing="ease-in-out"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                    {/* Motivational message */}
                    <div className="mt-4 text-center">
                        <p className="text-lg font-medium">
                            {bestScore >= 90 ? "🌟 You're a superstar! Keep shining bright!" : 
                             bestScore >= 75 ? "🚀 You're soaring high! Amazing progress!" : 
                             bestScore >= 50 ? "💪 You're getting stronger every day! Keep it up!" : 
                             "🌱 You're growing and learning! Every quiz helps you improve!"}
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default QuizProgressChart;


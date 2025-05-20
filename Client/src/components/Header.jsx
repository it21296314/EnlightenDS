// // import React, { useState } from "react";
// // import { Home, User, VolumeUp, Calculator, Star } from "lucide-react";

// // const Navbar = () => {
// //   const [activeTab, setActiveTab] = useState("home");

// //   // Navigation items with simple icons and bright colors
// //   const navItems = [
// //     { id: "home", label: "Home", icon: <Home size={32} />, color: "#FF9900" },
// //     { id: "profile", label: "My Profile", icon: <User size={32} />, color: "#66BB6A" },
// //     { id: "speech", label: "Speech", icon: <VolumeUp size={32} />, color: "#42A5F5" },
// //     { id: "math", label: "Math", icon: <Calculator size={32} />, color: "#EC407A" },
// //     { id: "talents", label: "Talents", icon: <Star size={32} />, color: "#AB47BC" },
// //   ];

// //   return (
// //     <div className="w-full bg-white rounded-lg shadow-md p-2">
// //       {/* Mobile navigation (bottom bar) */}
// //       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-lg p-2">
// //         <div className="flex justify-around items-center">
// //           {navItems.map((item) => (
// //             <button
// //               key={item.id}
// //               className="flex flex-col items-center p-2 rounded-lg transition-all duration-300"
// //               style={{
// //                 backgroundColor: activeTab === item.id ? `${item.color}30` : "transparent", // Light background when active
// //                 transform: activeTab === item.id ? "scale(1.1)" : "scale(1)",
// //               }}
// //               onClick={() => setActiveTab(item.id)}
// //             >
// //               <div 
// //                 className="p-2 rounded-full mb-1" 
// //                 style={{ backgroundColor: item.color }}
// //               >
// //                 {React.cloneElement(item.icon, { color: "white" })}
// //               </div>
// //               <span className="text-sm font-bold" style={{ color: item.color }}>
// //                 {item.label}
// //               </span>
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Desktop navigation (side bar) */}
// //       <div className="hidden lg:flex flex-col fixed left-0 top-0 h-full bg-white shadow-lg p-4 w-64">
// //         <div className="flex items-center justify-center mb-8 mt-4">
// //           <div className="bg-blue-500 text-white p-3 rounded-full">
// //             <span className="text-3xl font-bold">DS</span>
// //           </div>
// //           <h1 className="text-2xl font-bold ml-2 text-blue-500">Happy Steps</h1>
// //         </div>
        
// //         <div className="flex flex-col space-y-4">
// //           {navItems.map((item) => (
// //             <button
// //               key={item.id}
// //               className="flex items-center p-4 rounded-xl transition-all duration-300"
// //               style={{
// //                 backgroundColor: activeTab === item.id ? `${item.color}20` : "transparent",
// //                 borderLeft: activeTab === item.id ? `6px solid ${item.color}` : "6px solid transparent",
// //               }}
// //               onClick={() => setActiveTab(item.id)}
// //             >
// //               <div 
// //                 className="p-2 rounded-full mr-3" 
// //                 style={{ backgroundColor: item.color }}
// //               >
// //                 {React.cloneElement(item.icon, { color: "white" })}
// //               </div>
// //               <span 
// //                 className="text-lg font-bold" 
// //                 style={{ color: activeTab === item.id ? item.color : "#666" }}
// //               >
// //                 {item.label}
// //               </span>
// //             </button>
// //           ))}
// //         </div>
        
// //         {/* Friendly character at bottom of sidebar */}
// //         <div className="mt-auto mb-4 flex justify-center">
// //           <div className="bg-yellow-100 p-4 rounded-lg">
// //             <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center">
// //               <div className="text-4xl">😊</div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
      
// //       {/* Main content area - just a placeholder */}
// //       <div className="lg:ml-64 p-4 min-h-screen">
// //         {/* Your app content goes here */}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// const Navbar = () => {
//   const location = useLocation();
//   const [currentSection, setCurrentSection] = useState("");
//   const [characterMood, setCharacterMood] = useState("happy");

//   useEffect(() => {
//     const path = location.pathname;
//     if (path.includes("detection")) {
//       setCurrentSection("detection");
//       setCharacterMood("curious");
//     } else if (path.includes("pronunciation")) {
//       setCurrentSection("pronunciation");
//       setCharacterMood("talking");
//     } else if (path.includes("math")) {
//       setCurrentSection("math");
//       setCharacterMood("thinking");
//     } else if (path.includes("objects")) {
//       setCurrentSection("objects");
//       setCharacterMood("searching");
//     } else {
//       setCurrentSection("home");
//       setCharacterMood("happy");
//     }
//   }, [location]);

//   const getSectionColor = (section) => {
//     switch (section) {
//       case "detection": return "#FF9E80"; 
//       case "pronunciation": return "#80D8FF";
//       case "math": return "#B9F6CA"; 
//       case "objects": return "#EA80FC"; 
//       default: return "#FFFF8D"; 
//     }
//   };

//   return (
//     <header className="sticky top-0 z-10 w-full bg-white shadow-md rounded-b-lg">
//       <div className="container mx-auto p-2">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center">
//             <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mr-2">
//               <img 
//                 src={`/api/placeholder/100/100`} 
//                 alt={`Friendly character feeling ${characterMood}`} 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-indigo-600">FriendlyLearn</h1>
//               <p className="text-sm md:text-base text-gray-600 hidden sm:block">Let's learn together!</p>
//             </div>
//           </div>
//           <Link to="/profile" className="flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-yellow-100 rounded-full">
//             <span className="text-lg md:text-xl">👤</span>
//           </Link>
//         </div>

//         <nav className="mt-3 grid grid-cols-4 gap-1 md:gap-3">
//           {["detection", "pronunciation", "math", "objects"].map((section) => (
//             <Link 
//               key={section}
//               to={`/${section}`}
//               style={{ backgroundColor: getSectionColor(section) }}
//               className={`
//                 py-2 px-1 md:py-3 md:px-4 
//                 rounded-lg flex flex-col items-center justify-center
//                 transition-all duration-300 hover:brightness-110
//                 ${currentSection === section ? "ring-4 ring-blue-400 transform scale-105" : ""}
//               `}
//             >
//               <span className="text-xl md:text-2xl">
//                 {section === "detection" && "🔍"}
//                 {section === "pronunciation" && "🗣️"}
//                 {section === "math" && "🔢"}
//                 {section === "objects" && "🧩"}
//               </span>
//               <span className="text-xs md:text-sm font-bold mt-1 capitalize">
//                 {section}
//               </span>
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState("");
  const [characterMood, setCharacterMood] = useState("happy");

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("detection")) {
      setCurrentSection("detection");
      setCharacterMood("curious");
    } else if (path.includes("pronunciation")) {
      setCurrentSection("pronunciation");
      setCharacterMood("talking");
    } else if (path.includes("math")) {
      setCurrentSection("math");
      setCharacterMood("thinking");
    } else if (path.includes("objects")) {
      setCurrentSection("objects");
      setCharacterMood("searching");
    } else {
      setCurrentSection("home");
      setCharacterMood("happy");
    }
  }, [location]);

  const getSectionColor = (section) => {
    switch (section) {
      case "detection": return "#FF9E80"; // Warm coral
      case "pronunciation": return "#80D8FF"; // Bright sky blue
      case "math": return "#B9F6CA"; // Mint green
      case "objects": return "#EA80FC"; // Soft purple
      default: return "#FFFF8D"; // Cheerful yellow
    }
  };

  // Fun labels for kids
  const getSectionLabel = (section) => {
    switch (section) {
      case "detection": return "Spy Time";
      case "pronunciation": return "Talk Fun";
      case "math": return "Number Magic";
      case "objects": return "Find It";
      default: return "Home";
    }
  };

  // Emojis for navigation
  const getSectionEmoji = (section) => {
    switch (section) {
      case "detection": return "🔎";
      case "pronunciation": return "🎤";
      case "math": return "🧮";
      case "objects": return "🧸";
      default: return "🏠";
    }
  };

  return (
    <header className="sticky top-0 z-10 w-full bg-gradient-to-r from-blue-100 to-indigo-50 shadow-md rounded-b-xl">
      <div className="container mx-auto px-2 py-2">
        <div className="flex items-center justify-between">
          {/* Logo and Title Section */}
          <div className="flex items-center">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-yellow-300 shadow-sm">
              <img 
                src={`/api/placeholder/100/100`} 
                alt={`Character feeling ${characterMood}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-lg md:text-xl font-bold text-indigo-600 ml-2 hidden sm:block">FriendlyLearn</h1>
          </div>
          
          {/* Navigation Section */}
          <nav className="flex space-x-1 md:space-x-3">
            {["detection", "pronunciation", "math", "objects"].map((section) => (
              <Link 
                key={section}
                to={`/${section}`}
                style={{ backgroundColor: getSectionColor(section) }}
                className={`
                  py-1 px-2 md:px-3
                  rounded-lg flex items-center justify-center
                  transition-all duration-200 hover:brightness-110
                  border-2 border-white shadow-sm
                  ${currentSection === section ? "ring-2 ring-blue-400" : ""}
                `}
              >
                <span className="text-lg md:text-xl mr-1">{getSectionEmoji(section)}</span>
                <span className="text-xs font-bold hidden md:block">{getSectionLabel(section)}</span>
              </Link>
            ))}
          </nav>
          
          {/* Profile Section */}
          <Link to="/profile" className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-yellow-200 rounded-full border-2 border-yellow-300 hover:bg-yellow-100 transition-colors duration-200">
            <span className="text-sm md:text-lg">👤</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
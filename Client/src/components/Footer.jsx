import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    if (location.pathname !== "/" && location.pathname !== "/profile") {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 20;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [location]);

  return (
    <footer className="fixed bottom-0 w-full bg-white shadow-lg rounded-t-lg">
      <div className="container mx-auto">
        {location.pathname !== "/" && location.pathname !== "/profile" && (
          <div className="px-4 pt-2">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-400 rounded-full transition-all duration-500 flex items-center justify-end px-2"
                style={{ width: `${progress}%` }}
              >
                {progress >= 20 && (
                  <span className="text-xs transform scale-75 origin-center">
                    🚶‍♂️
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Start</span>
              <span>Progress</span>
              <span>Finish</span>
            </div>
          </div>
        )}

        <div className="flex justify-around p-2 md:p-4">
          <Link to="/" className="flex flex-col items-center p-2 md:p-3 rounded-full hover:bg-yellow-100">
            <span className="text-2xl md:text-3xl">🏠</span>
            <span className="text-xs md:text-sm mt-1">Home</span>
          </Link>

          <button 
            onClick={() => window.history.back()} 
            className="flex flex-col items-center p-2 md:p-3 rounded-full hover:bg-blue-100"
          >
            <span className="text-2xl md:text-3xl">⬅️</span>
            <span className="text-xs md:text-sm mt-1">Back</span>
          </button>

          <Link to="/help" className="flex flex-col items-center p-2 md:p-3 rounded-full hover:bg-purple-100">
            <span className="text-2xl md:text-3xl">❓</span>
            <span className="text-xs md:text-sm mt-1">Help</span>
          </Link>

          {progress === 100 && (
            <button 
              className="flex flex-col items-center p-2 md:p-3 rounded-full bg-yellow-100 animate-pulse"
              onClick={() => alert("Great job! You completed this activity!")}
            >
              <span className="text-2xl md:text-3xl">🎉</span>
              <span className="text-xs md:text-sm mt-1">Great Job!</span>
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

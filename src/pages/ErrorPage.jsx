import React, { useState, useEffect } from "react";
import { Home, ArrowLeft, RefreshCw, Search, MapPin, Mail, Phone } from "lucide-react";

const ErrorPage = () => {
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);


  const errorCode = "404";
  const errorMessage = "Page Not Found";

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsRedirecting(true);
          clearInterval(timer);
          setTimeout(() => {
            window.location.href = "/";
          }, 500);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const stopRedirect = () => {
    setCountdown(-1);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          <div className="p-8 md:p-12">
            {/* Error Code Animation */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-12 h-12 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
                </svg>
              </div>

              {/* Error Code */}
              <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 mb-4 tracking-tight">
                {errorCode}
              </h1>

              {/* Error Message */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Oops! {errorMessage}
              </h2>

              <p className="text-lg text-gray-600 max-w-md mx-auto leading-relaxed">
                The page you're looking for seems to have taken an unexpected detour. 
                Don't worry, we'll help you get back on track!
              </p>
            </div>

            {/* Auto-redirect Notice */}
            {countdown > 0 && !isRedirecting && (
              <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
                <p className="text-sm text-blue-800">
                  Redirecting to homepage in{" "}
                  <span className="font-bold text-blue-600 text-lg">{countdown}</span> seconds...
                </p>
                <button
                  onClick={stopRedirect}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline transition-colors"
                >
                  Cancel auto-redirect
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleGoHome}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
              >
                <Home size={20} className="group-hover:rotate-12 transition-transform" />
                Take Me Home
              </button>

              <button
                onClick={handleGoBack}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                Go Back
              </button>

              <button
                onClick={handleRefresh}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-full hover:bg-gray-50 hover:border-gray-400 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                Refresh
              </button>
            </div>

            {/* Error Code Reference */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-400">
                Error Code: {errorCode} | Timestamp: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Fun Illustration */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 italic">
            "Not all who wander are lost... but this page definitely is!" 🧭
          </p>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
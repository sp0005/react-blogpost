import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-white p-6 font-sans text-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-semibold text-gray-100 mb-6 tracking-wide animate__animated animate__fadeIn animate__delay-1s">
          Welcome to Our App
        </h1>
        <p className="text-xl text-gray-300 mb-8 animate__animated animate__fadeIn animate__delay-2s">
          Please log in or register to continue
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-64 py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transform hover:scale-105 transition-all duration-300">
              Login
            </button>
          </Link>
          
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-64 py-3 px-6 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transform hover:scale-105 transition-all duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
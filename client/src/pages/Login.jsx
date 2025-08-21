import { useState, useEffect } from 'react';
import {
  LucideBuilding,
  LucideUser,
  LucideMail,
  LucideUnlock,
  LucideHandshake,
  LucideStar,
  LucideHeart,
} from 'lucide-react';
import {Link} from "react-router-dom";

// Main App component for the combined entry page
export default function Login() {
  const [isNgo, setIsNgo] = useState(true);
  const [isBlueTheme, setIsBlueTheme] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlueTheme(prevTheme => !prevTheme);
    }, 1000); // Change color every 1 second
    return () => clearInterval(interval);
  }, []);

  const ngoColorClass = isBlueTheme ? 'text-indigo-600' : 'text-pink-600';
  const buttonNgoBgColor = isBlueTheme ? 'bg-indigo-600' : 'bg-pink-600';
  const buttonNgoHoverColor = isBlueTheme ? 'hover:bg-indigo-700' : 'hover:bg-pink-700';
  const focusNgoRingColor = isBlueTheme ? 'focus:ring-indigo-500' : 'focus:ring-pink-500';
  const linkNgoColor = isBlueTheme ? 'text-indigo-600' : 'text-pink-600';
  const linkDonorColor = isBlueTheme ? 'text-indigo-600' : 'text-pink-600';
  const logoFillColor = isBlueTheme ? '#4f46e5' : '#db2777';

  return (
    <div className="bg-white min-h-screen w-screen font-sans antialiased text-gray-900 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-3xl p-8 sm:p-12 w-full max-w-7xl flex flex-col md:flex-row shadow-2xl">
        {/* Left Section: Intro */}
        <div className="flex flex-col items-center justify-center p-4 md:p-8 md:w-1/2 text-center md:text-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 40 40" className="mb-4">
            <circle cx="20" cy="20" r="20" fill={logoFillColor} />
            <path d="M10 20L15 25L30 10L25 15L10 20Z" fill="#ffffff" />
          </svg>
          <h1 className="text-5xl font-extrabold text-gray-800 leading-tight">Collab for Good</h1>
          <p className="text-gray-600 mt-4 text-xl font-medium">Empowering connections for a better world.</p>
          <div className="mt-8 space-y-4 text-left w-full max-w-xs">
            <div className={`flex items-center space-x-3 ${ngoColorClass}`}>
              <LucideHandshake size={24} />
              <span className="text-lg font-medium">Seamless Resource Sharing</span>
            </div>
            <div className="flex items-center space-x-3 text-green-500">
              <LucideStar size={24} />
              <span className="text-lg font-medium">Recognize Top Collaborators</span>
            </div>
            <div className="flex items-center space-x-3 text-yellow-500">
              <LucideHeart size={24} />
              <span className="text-lg font-medium">Make an Impact</span>
            </div>
          </div>
        </div>

        {/* Right Section: Login Form */}
        <div className="md:w-1/2 p-4 md:p-8 mt-8 md:mt-0 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Your Dashboard</h2>
          
          {/* User Type Tabs */}
          <div className="flex justify-center space-x-2 bg-gray-100 p-1 rounded-full mb-8">
            <button
              onClick={() => setIsNgo(true)}
              className={`flex-1 py-3 px-6 rounded-full font-bold text-sm sm:text-base transition-colors duration-200 ${isNgo ? buttonNgoBgColor + ' text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <LucideBuilding size={20} />
                <span className={isNgo ? 'text-white' : 'text-gray-600'}>NGO</span>
              </div>
            </button>
            <button
              onClick={() => setIsNgo(false)}
              className={`flex-1 py-3 px-6 rounded-full font-bold text-sm sm:text-base transition-colors duration-200 ${!isNgo ? 'bg-gray-100 text-gray-600' : 'hover:bg-gray-200'}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <LucideUser size={20} />
                <span className={isNgo ? 'text-gray-600' : 'text-white'}>Donor</span>
              </div>
            </button>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div className="relative">
              <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="email" placeholder="Email Address" className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${isNgo ? focusNgoRingColor : 'focus:ring-green-500'} transition-colors duration-200`} />
            </div>
            <div className="relative">
              <LucideUnlock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="password" placeholder="Password" className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${isNgo ? focusNgoRingColor : 'focus:ring-green-500'} transition-colors duration-200`} />
            </div>
            <button 
              className={`w-full py-4 px-6 text-white font-bold rounded-full text-lg ${isNgo ? buttonNgoBgColor + ' ' + buttonNgoHoverColor : 'bg-green-500 hover:bg-green-600'} transition-colors duration-200 shadow-md`}>
              Login as {isNgo ? 'NGO' : 'Donor'}
            </button>
            <p className="mt-4 text-gray-600">
              New to our platform? <Link 
              to="/" 
              className={(isNgo ? linkNgoColor : linkDonorColor) + " font-semibold hover:underline"}
            >
              Sign up here
            </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
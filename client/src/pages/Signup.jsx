import { useState, useEffect } from 'react';
import {
  LucideBuilding,
  LucideUser,
  LucideMail,
  LucideUnlock,
  LucideMapPin,
  LucidePhone,
  LucideUsers,
  LucideHandshake,
  LucideStar,
} from 'lucide-react';
import { Link } from "react-router-dom";

// Main App component for the combined sign-up page
export default function App() {
  const [isNgo, setIsNgo] = useState(true);
  const [isPinkTheme, setIsPinkTheme] = useState(true);
  
  // State for NGO form fields
  const [ngoName, setNgoName] = useState('');
  const [ngoEmail, setNgoEmail] = useState('');
  const [ngoPassword, setNgoPassword] = useState('');
  const [orgType, setOrgType] = useState('');
  const [ngoLocation, setNgoLocation] = useState('');
  const [ngoPhoneNumber, setNgoPhoneNumber] = useState('');

  // State for Donor form fields
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPassword, setDonorPassword] = useState('');

  const orgTypes = [
    'Select Organization Type',
    'Humanitarian Aid',
    'Environmental Conservation',
    'Education & Literacy',
    'Health & Medical',
    'Animal Welfare',
    'Community Development',
    'Other'
  ];

  // Effect to change theme color every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsPinkTheme(prevTheme => !prevTheme);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNgoSubmit =  async (e) => {
    e.preventDefault();
    // Handle NGO sign-up logic here
    try {
    const response = await fetch("http://localhost:5000/api/auth/ngo-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: ngoName,
        email: ngoEmail,
        password: ngoPassword,
        orgType,
        location: ngoLocation,
        phoneNumber: ngoPhoneNumber,
      }),
    });

    const data = await response.json();
    console.log(data);
    alert("NGO registered successfully!");
  } catch (error) {
    console.error(error);
    alert("NGO signup failed.");
  }
};

  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    // Handle Donor sign-up logic here
    try {
    const response = await fetch("http://localhost:5000/api/auth/donor-signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: donorName,
        email: donorEmail,
        password: donorPassword,
      }),
    });

    const data = await response.json();
    console.log(data);
    alert("Donor registered successfully!");
  } catch (error) {
    console.error(error);
    alert("Donor signup failed.");
  }
};

  const ngoColor = isPinkTheme ? 'pink' : 'green';
  const donorColor = isPinkTheme ? 'fuchsia' : 'indigo';
  const buttonNgoBgColor = isPinkTheme ? 'bg-pink-600' : 'bg-green-600';
  const buttonNgoHoverColor = isPinkTheme ? 'hover:bg-pink-700' : 'hover:bg-green-700';
  const buttonDonorBgColor = isPinkTheme ? 'bg-fuchsia-500' : 'bg-indigo-500';
  const buttonDonorHoverColor = isPinkTheme ? 'hover:bg-fuchsia-600' : 'hover:bg-indigo-600';
  const focusNgoRingColor = isPinkTheme ? 'focus:ring-pink-600' : 'focus:ring-green-600';
  const focusDonorRingColor = isPinkTheme ? 'focus:ring-fuchsia-500' : 'focus:ring-indigo-500';
  const linkNgoColor = isPinkTheme ? 'text-pink-600' : 'text-green-600';
  const linkDonorColor = isPinkTheme ? 'text-fuchsia-500' : 'text-indigo-500';
  const logoFillColor = isPinkTheme ? '#db2777' : '#22c55e';
  const quoteTextColor = isPinkTheme ? 'text-pink-600' : 'text-green-600';

  return (
    <div className="bg-[#e4e4e7] min-h-screen w-screen font-sans antialiased text-gray-900 flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-12 w-full max-w-7xl flex flex-col md:flex-row">
        {/* Left Section: Quotes and Info */}
        <div className="flex flex-col items-center justify-center p-4 md:p-8 md:w-1/2 text-center md:text-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 40 40" className="mb-4">
            <circle cx="20" cy="20" r="20" fill={logoFillColor} />
            <path d="M10 20L15 25L30 10L25 15L10 20Z" fill="#ffffff" />
          </svg>
          <div className="text-3xl text-gray-800 leading-snug font-bold">
            We believe that by fostering a community of collaboration and resource sharing, we can help these organizations achieve their goals more efficiently and effectively.
          </div>
          <p className="text-gray-600 mt-4 text-xl">
            - The Collab for Good Team
          </p>
          <div className="mt-8 space-y-4 text-left w-full max-w-xs">
            <div className={`flex items-center space-x-3 ${quoteTextColor}`}>
              <LucideHandshake size={24} />
              <span className="text-lg font-medium">Seamless Resource Sharing</span>
            </div>
            <div className={`flex items-center space-x-3 ${isPinkTheme ? 'text-fuchsia-500' : 'text-indigo-500'}`}>
              <LucideStar size={24} />
              <span className="text-lg font-medium">Recognize Top Collaborators</span>
            </div>
          </div>
        </div>

        {/* Right Section: Forms */}
        <div className="md:w-1/2 p-4 md:p-8 mt-8 md:mt-0 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Sign Up</h2>
          
          {/* User Type Tabs */}
          <div className="flex justify-center space-x-2 bg-gray-100 p-2 rounded-full mb-8">
            <button
              onClick={() => setIsNgo(true)}
              className={`flex-1 py-3 px-6 rounded-full font-bold text-sm sm:text-base transition-colors duration-200 ${isNgo ? buttonNgoBgColor + ' text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <LucideBuilding size={20} />
                <span className="hidden sm:inline">NGO</span>
              </div>
            </button>
            <button
              onClick={() => setIsNgo(false)}
              className={`flex-1 py-3 px-6 rounded-full font-bold text-sm sm:text-base transition-colors duration-200 ${!isNgo ? buttonDonorBgColor + ' text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
            >
              <div className="flex items-center justify-center space-x-2">
                <LucideUser size={20} />
                <span className="hidden sm:inline">Donor</span>
              </div>
            </button>
          </div>

          {/* Forms based on selection */}
          {isNgo ? (
            // NGO Sign-Up Form
            <form onSubmit={handleNgoSubmit} className="space-y-6">
              <div className="relative">
                <LucideBuilding className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="NGO Name"
                  value={ngoName}
                  onChange={(e) => setNgoName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusNgoRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <div className="relative">
                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={ngoEmail}
                  onChange={(e) => setNgoEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusNgoRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <div className="relative">
                <LucideUnlock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={ngoPassword}
                  onChange={(e) => setNgoPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusNgoRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <div className="relative">
                <LucideUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  className={`w-full pl-12 pr-10 py-4 rounded-full border-2 border-gray-200 appearance-none focus:outline-none focus:ring-2 ${focusNgoRingColor} transition-colors duration-200 text-gray-600`}
                  required
                >
                  {orgTypes.map((type, index) => (
                    <option key={index} value={type} disabled={index === 0}>{type}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <div className="relative">
                <LucideMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Location"
                  value={ngoLocation}
                  onChange={(e) => setNgoLocation(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusNgoRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <div className="relative">
                <LucidePhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={ngoPhoneNumber}
                  onChange={(e) => setNgoPhoneNumber(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusNgoRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <button type="submit" className={`w-full py-4 px-6 text-white font-bold rounded-full text-lg ${buttonNgoBgColor} ${buttonNgoHoverColor} transition-colors duration-200 shadow-md`}>
                Register NGO
              </button>
            </form>
          ) : (
            // Donor Sign-Up Form
            <form onSubmit={handleDonorSubmit} className="space-y-6">
              <div className="relative">
                <LucideUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusDonorRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <div className="relative">
                <LucideMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusDonorRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <div className="relative">
                <LucideUnlock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={donorPassword}
                  onChange={(e) => setDonorPassword(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 ${focusDonorRingColor} transition-colors duration-200`}
                  required
                />
              </div>
              <button type="submit" className={`w-full py-4 px-6 text-white font-bold rounded-full text-lg ${buttonDonorBgColor} ${buttonDonorHoverColor} transition-colors duration-200 shadow-md`}>
                Create Donor Account
              </button>
            </form>
          )}
          <p className="mt-8 text-gray-600">
            Already have an account? 
            <Link 
              to="/login" 
              className={(isNgo ? linkNgoColor : linkDonorColor) + " font-semibold hover:underline"}
            >
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
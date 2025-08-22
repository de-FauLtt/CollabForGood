import { useState } from 'react';
import {
  LucideLayoutDashboard,
  LucideTrophy,
  LucideStar,
  LucideSearch,
  LucideFilter,
  LucideGlobe,
  LucideBadgeDollarSign,
  LucideUser,
  LucideBuilding,
  LucideHeart,
  LucideCreditCard
} from 'lucide-react';

// Main App component for the Donor Dashboard
export default function NgoDashboard() {
  // State to manage the current view
  const [currentView, setCurrentView] = useState('dashboard');
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data for NGOs, including credits
  const ngosData = [
    { id: 1, name: 'Global Aid Alliance', website: 'https://globalaid.org', credits: 25000, isFavorite: true },
    { id: 2, name: 'Unity Foundation', website: 'https://unityfoundation.org', credits: 18750, isFavorite: true },
    { id: 3, name: 'Community Care Network', website: 'https://communitycare.org', credits: 15400, isFavorite: false },
    { id: 4, name: 'Hope & Humanity', website: 'https://hopehumanity.org', credits: 12100, isFavorite: false },
    { id: 5, name: 'Eco Warriors', website: 'https://ecowarriors.org', credits: 9800, isFavorite: false },
    { id: 6, name: 'Future Forward', website: 'https://futureforward.org', credits: 7500, isFavorite: true },
    { id: 7, name: 'Healthy Hearts', website: 'https://healthyhearts.org', credits: 5200, isFavorite: false },
  ];

  // Mock data for the leaderboard
  const leaderboardData = {
    topDonors: [
      { id: 1, name: 'John Smith', donations: 5000 },
      { id: 2, name: 'Jane Doe', donations: 3200 },
      { id: 3, name: 'Alex Johnson', donations: 1800 },
      { id: 4, name: 'Maria Garcia', donations: 1500 },
      { id: 5, name: 'David Wilson', donations: 1200 },
    ],
    topNgos: [
      { id: 1, name: 'Global Aid Alliance', credits: 25000 },
      { id: 2, name: 'Unity Foundation', credits: 18750 },
      { id: 3, name: 'Community Care Network', credits: 15400 },
      { id: 4, name: 'Hope & Humanity', credits: 12100 },
      { id: 5, name: 'Eco Warriors', credits: 9800 },
    ],
  };

  // Filter NGOs based on search term
  const filteredNgos = ngosData.filter(ngo =>
    ngo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Component for the top navigation bar
  const Navbar = () => (
    <nav className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm rounded-b-xl">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        {/* Logo and App Name */}
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#4f46e5" />
            <path d="M10 20L15 25L30 10L25 15L10 20Z" fill="#ffffff" />
          </svg>
          <span className="text-xl font-bold text-gray-800">Collab for Good</span>
        </div>
        {/* Search and Filter */}
        <div className="flex items-center space-x-2">
          <button className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200">
            <LucideFilter size={20} />
          </button>
          <div className="relative w-full sm:w-64">
            <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search NGOs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        {/* Navigation buttons */}
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => setCurrentView('favorites')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${currentView === 'favorites' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'}`}
          >
            <LucideStar size={18} />
            <span className="font-medium">Favorites</span>
          </button>
          <button
            onClick={() => setCurrentView('leaderboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${currentView === 'leaderboard' ? 'bg-indigo-500 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-indigo-600'}`}
          >
            <LucideTrophy size={18} />
            <span className="font-medium">Leaderboard</span>
          </button>
        </div>
      </div>
    </nav>
  );

  // Component for the main dashboard (list of NGOs)
  const Dashboard = () => (
    <div className="p-8 min-h-screen w-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore NGOs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNgos.map(ngo => (
          <div key={ngo.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold mb-4">
              {ngo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h3 className="text-xl font-semibold text-gray-800">{ngo.name}</h3>
            <div className="flex items-center space-x-1 text-yellow-600 mt-2">
              <LucideBadgeDollarSign size={16} />
              <span className="font-medium">{ngo.credits.toLocaleString()} Credits</span>
            </div>
            <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center space-x-2 w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors duration-200">
              <LucideGlobe size={18} />
              <span>Website</span>
            </a>
            <div className="flex items-center justify-between w-full mt-4 space-x-2">
              <button className="flex-1 py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200">
                Donate
              </button>
              <button className="p-3 text-yellow-500 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors duration-200">
                <LucideStar size={20} fill={ngo.isFavorite ? 'currentColor' : 'none'} strokeWidth={ngo.isFavorite ? 0 : 2} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Component to render the leaderboard
  const Leaderboard = () => (
    <div className="p-8 min-h-screen w-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Leaderboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top NGOs Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <LucideBuilding size={20} className="text-purple-500" />
            <span>Top NGOs by Credits</span>
          </h3>
          <ul className="divide-y divide-gray-200">
            {leaderboardData.topNgos.map((ngo, index) => (
              <li key={ngo.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-600 w-6 text-center">{index + 1}</span>
                  <span className="font-medium text-gray-800">{ngo.name}</span>
                </div>
                <span className="text-yellow-600 font-semibold flex items-center space-x-1">
                  <LucideBadgeDollarSign size={16} />
                  <span>{ngo.credits.toLocaleString()} credits</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Top Donors Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <LucideUser size={20} className="text-blue-500" />
            <span>Top Donors</span>
          </h3>
          <ul className="divide-y divide-gray-200">
            {leaderboardData.topDonors.map((donor, index) => (
              <li key={donor.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-bold text-gray-600 w-6 text-center">{index + 1}</span>
                  <span className="font-medium text-gray-800">{donor.name}</span>
                </div>
                <span className="text-green-600 font-semibold">${donor.donations.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Component for the Favorite NGOs list
  const Favorites = () => {
    const favoriteNgos = ngosData.filter(ngo => ngo.isFavorite);
    return (
      <div className="p-8 min-h-screen w-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Favorite NGOs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteNgos.length > 0 ? (
            favoriteNgos.map(ngo => (
              <div key={ngo.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold mb-4">
                  {ngo.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{ngo.name}</h3>
                <div className="flex items-center space-x-1 text-yellow-600 mt-2">
                  <LucideBadgeDollarSign size={16} />
                  <span className="font-medium">{ngo.credits.toLocaleString()} Credits</span>
                </div>
                <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center space-x-2 w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors duration-200">
                  <LucideGlobe size={18} />
                  <span>Website</span>
                </a>
                <div className="flex items-center justify-between w-full mt-4 space-x-2">
                  <button className="flex-1 py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200">
                    Donate
                  </button>
                  <button className="p-3 text-yellow-500 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors duration-200">
                    <LucideStar size={20} fill={'currentColor'} strokeWidth={0} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">You haven't favorited any NGOs yet.</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-900">
      <Navbar />
      <div className="container mx-auto">
        {(() => {
          switch (currentView) {
            case 'dashboard':
              return <Dashboard />;
            case 'leaderboard':
              return <Leaderboard />;
            case 'favorites':
              return <Favorites />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
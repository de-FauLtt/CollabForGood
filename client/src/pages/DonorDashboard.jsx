// import { useState, useEffect, useRef } from 'react';
// import {
//   LucideTrophy,
//   LucideStar,
//   LucideSearch,
//   LucideFilter,
//   LucideGlobe,
//   LucideBadgeDollarSign,
//   LucideUser,
//   LucideBuilding,
//   LucideX,
//   LucideLoader2,
// } from 'lucide-react';
// import LogoutButton from '../components/LogoutButton';

// // Main App component for the Collab for Good platform
// export default function App() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
//   const [selectedNgoName, setSelectedNgoName] = useState('');
//   const [activeSection, setActiveSection] = useState('explore');
//   const [filterOptions, setFilterOptions] = useState({
//     showFavorites: false,
//     minCredits: 0,
//     name: '',
//     resources: [],
//     id: '',
//   });

//   // Initial data is now managed locally in the component's state, with added resource types
//   const [ngosData, setNgosData] = useState([
//     { id: '1', name: 'Global Aid Alliance', website: 'https://globalaid.org', credits: 25000, isFavorite: false, resources: ['Education', 'Health'] },
//     { id: '2', name: 'Unity Foundation', website: 'https://unityfoundation.org', credits: 18750, isFavorite: false, resources: ['Poverty', 'Community'] },
//     { id: '3', name: 'Community Care Network', website: 'https://communitycare.org', credits: 15400, isFavorite: false, resources: ['Health', 'Community'] },
//     { id: '4', name: 'Hope & Humanity', website: 'https://hopehumanity.org', credits: 12100, isFavorite: false, resources: ['Poverty', 'Education'] },
//     { id: '5', name: 'Eco Warriors', website: 'https://ecowarriors.org', credits: 9800, isFavorite: false, resources: ['Environment'] },
//     { id: '6', name: 'Future Forward', website: 'https://futureforward.org', credits: 7500, isFavorite: false, resources: ['Education', 'Technology'] },
//     { id: '7', name: 'Healthy Hearts', website: 'https://healthyhearts.org', credits: 5200, isFavorite: false, resources: ['Health'] },
//   ]);

//   const [leaderboardData, setLeaderboardData] = useState({
//     topDonors: [
//       { id: 1, name: 'John Smith', donations: 5000 },
//       { id: 2, name: 'Jane Doe', donations: 3200 },
//       { id: 3, name: 'Alex Johnson', donations: 1800 },
//       { id: 4, name: 'Maria Garcia', donations: 1500 },
//       { id: 5, name: 'David Wilson', donations: 1200 },
//     ],
//   });

//   // Refs for scrolling to different sections
//   const dashboardRef = useRef(null);
//   const favoritesRef = useRef(null);
//   const leaderboardRef = useRef(null);

//   // --- Scroll-based active section tracking ---
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = [
//         { name: 'explore', ref: dashboardRef },
//         { name: 'favorites', ref: favoritesRef },
//         { name: 'leaderboard', ref: leaderboardRef },
//       ];

//       const offset = 100; // Offset to activate the button a little before the section hits the top
//       const currentScrollPos = window.scrollY;

//       for (const section of sections) {
//         if (section.ref.current) {
//           const rect = section.ref.current.getBoundingClientRect();
//           if (rect.top <= offset && rect.bottom >= offset) {
//             setActiveSection(section.name);
//             break;
//           }
//         }
//       }
//     };
    
//     // Add event listener on mount
//     window.addEventListener('scroll', handleScroll);
//     // Clean up event listener on unmount
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Function to smoothly scroll to a section
//   const scrollToSection = (ref, sectionName) => {
//     if (ref.current) {
//       ref.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   // Function to toggle a favorite state locally
//   const toggleFavorite = (id) => {
//     setNgosData(prevNgos => 
//       prevNgos.map(ngo => 
//         ngo.id === id ? { ...ngo, isFavorite: !ngo.isFavorite } : ngo
//       )
//     );
//   };

//   // Function to simulate a donation and update credits locally
//   const handleDonate = (ngoId, ngoName) => {
//     setNgosData(prevNgos =>
//       prevNgos.map(ngo =>
//         ngo.id === ngoId ? { ...ngo, credits: ngo.credits + 1000 } : ngo
//       )
//     );
//     setSelectedNgoName(ngoName);
//     setIsModalOpen(true);
//   };

//   // Function to apply filters
//   const handleFilterChange = (key, value) => {
//     setFilterOptions(prevOptions => {
//       // Handle resources filter as an array of selected values
//       if (key === 'resources') {
//         const newResources = prevOptions.resources.includes(value)
//           ? prevOptions.resources.filter(resource => resource !== value)
//           : [...prevOptions.resources, value];
//         return { ...prevOptions, resources: newResources };
//       }
//       return { ...prevOptions, [key]: value };
//     });
//   };

//   // Filtered list of NGOs based on all filter options
//   const sortedNgos = ngosData.sort((a, b) => b.credits - a.credits);
//   const filteredNgos = sortedNgos.filter(ngo => {
//     const matchesSearchTerm = ngo.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFavorites = !filterOptions.showFavorites || ngo.isFavorite;
//     const matchesMinCredits = ngo.credits >= filterOptions.minCredits;
//     const matchesNameFilter = filterOptions.name === '' || ngo.name.toLowerCase().includes(filterOptions.name.toLowerCase());
//     const matchesIdFilter = filterOptions.id === '' || ngo.id === filterOptions.id;
    
//     const matchesResources = filterOptions.resources.length === 0 ||
//       filterOptions.resources.some(resource => ngo.resources.includes(resource));

//     return matchesSearchTerm && matchesFavorites && matchesMinCredits && matchesNameFilter && matchesIdFilter && matchesResources;
//   });

//   // Navbar component
//   const Navbar = () => (
//     <nav className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm rounded-b-xl">
//       <div className="container mx-auto flex flex-wrap justify-between items-center">
//         <div className="flex items-center space-x-2">
//           <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
//             <circle cx="20" cy="20" r="20" fill="#4f46e5" />
//             <path d="M10 20L15 25L30 10L25 15L10 20Z" fill="#ffffff" />
//           </svg>
//           <span className="text-xl font-bold text-gray-800">Collab for Good</span>
//         </div>

//         <div className="flex items-center space-x-2 mt-4 sm:mt-0">
//           <button
//             onClick={() => setIsFilterModalOpen(true)}
//             className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200"
//           >
//             <LucideFilter size={20} />
//           </button>
//           <div className="relative w-full sm:w-64">
//             <LucideSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search NGOs..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//           </div>
//         </div>

//         <div className="flex space-x-4 mt-4 sm:mt-0">
//           <button
//               onClick={() => scrollToSection(dashboardRef, 'explore')}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${
//                 activeSection === 'explore'
//                   ? 'bg-indigo-500 text-white shadow-md'
//                   : 'bg-indigo-500 text-white hover:bg-indigo-600'
//               }`}
//             >
//               <LucideBuilding size={18} />
//               <span className="font-medium">Explore</span>
//             </button>

//             <button
//               onClick={() => scrollToSection(favoritesRef, 'favorites')}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${
//                 activeSection === 'favorites'
//                   ? 'bg-indigo-500 text-white shadow-md'
//                   : 'bg-indigo-500 text-white hover:bg-indigo-600'
//               }`}
//             >
//               <LucideStar size={18} />
//               <span className="font-medium">Favorites</span>
//             </button>

//             <button
//               onClick={() => scrollToSection(leaderboardRef, 'leaderboard')}
//               className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${
//                 activeSection === 'leaderboard'
//                   ? 'bg-indigo-500 text-white shadow-md'
//                   : 'bg-indigo-500 text-white hover:bg-indigo-600'
//               }`}
//             >
//               <LucideTrophy size={18} />
//               <span className="font-medium">Leaderboard</span>
//         </button>
//         </div>
//       </div>
//     </nav>
//   );

//   // Dashboard view component
//   const Dashboard = () => (
//     <div className="p-8 w-screen">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore NGOs</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredNgos.length > 0 ? (
//           filteredNgos.map(ngo => (
//             <div key={ngo.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
//               <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold mb-4">
//                 {ngo.name.split(' ').map(n => n[0]).join('')}
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800">{ngo.name}</h3>
//               <div className="flex items-center space-x-1 text-yellow-600 mt-2">
//                 <LucideBadgeDollarSign size={16} />
//                 <span className="font-medium">{ngo.credits.toLocaleString()} Credits</span>
//               </div>
//               <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center space-x-2 w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors duration-200">
//                 <LucideGlobe size={18} />
//                 <span>Website</span>
//               </a>
//               <div className="flex items-center justify-between w-full mt-4 space-x-2">
//                 <button
//                   onClick={() => handleDonate(ngo.id, ngo.name)}
//                   className="flex-1 py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
//                 >
//                   Donate
//                 </button>
//                 <button
//                   onClick={() => toggleFavorite(ngo.id)}
//                   className="p-3 text-yellow-500 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors duration-200"
//                 >
//                   <LucideStar size={20} fill={ngo.isFavorite ? 'currentColor' : 'none'} strokeWidth={ngo.isFavorite ? 0 : 2} />
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500 text-center col-span-full">No NGOs found matching your criteria.</p>
//         )}
//       </div>
//     </div>
//   );

//   // Leaderboard view component
//   const Leaderboard = () => (
//     <div className="p-8 w-screen">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6">Leaderboard</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
//             <LucideBuilding size={20} className="text-purple-500" />
//             <span>Top NGOs by Credits</span>
//           </h3>
//           <ul className="divide-y divide-gray-200">
//             {ngosData.slice(0, 5).map((ngo, index) => (
//               <li key={ngo.id} className="py-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <span className="text-lg font-bold text-gray-600 w-6 text-center">{index + 1}</span>
//                   <span className="font-medium text-gray-800">{ngo.name}</span>
//                 </div>
//                 <span className="text-yellow-600 font-semibold flex items-center space-x-1">
//                   <LucideBadgeDollarSign size={16} />
//                   <span>{ngo.credits.toLocaleString()} credits</span>
//                 </span>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="bg-white rounded-2xl shadow-md p-6">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
//             <LucideUser size={20} className="text-blue-500" />
//             <span>Top Donors</span>
//           </h3>
//           <ul className="divide-y divide-gray-200">
//             {leaderboardData?.topDonors.map((donor, index) => (
//               <li key={donor.id} className="py-4 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <span className="text-lg font-bold text-gray-600 w-6 text-center">{index + 1}</span>
//                   <span className="font-medium text-gray-800">{donor.name}</span>
//                 </div>
//                 <span className="text-green-600 font-semibold">${donor.donations.toLocaleString()}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   // Favorites view component
//   const Favorites = () => {
//     const favoriteNgos = filteredNgos.filter(ngo => ngo.isFavorite);
//     return (
//       <div className="p-8 w-screen">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Favorite NGOs</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {favoriteNgos.length > 0 ? (
//             favoriteNgos.map(ngo => (
//               <div key={ngo.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center">
//                 <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold mb-4">
//                   {ngo.name.split(' ').map(n => n[0]).join('')}
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-800">{ngo.name}</h3>
//                 <div className="flex items-center space-x-1 text-yellow-600 mt-2">
//                   <LucideBadgeDollarSign size={16} />
//                   <span className="font-medium">{ngo.credits.toLocaleString()} Credits</span>
//                 </div>
//                 <a href={ngo.website} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center justify-center space-x-2 w-full py-2 px-4 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors duration-200">
//                   <LucideGlobe size={18} />
//                   <span>Website</span>
//                 </a>
//                 <div className="flex items-center justify-between w-full mt-4 space-x-2">
//                   <button
//                     onClick={() => handleDonate(ngo.id, ngo.name)}
//                     className="flex-1 py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
//                   >
//                     Donate
//                   </button>
//                   <button
//                     onClick={() => toggleFavorite(ngo.id)}
//                     className="p-3 text-yellow-500 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors duration-200"
//                   >
//                     <LucideStar size={20} fill={'currentColor'} strokeWidth={0} />
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 col-span-full text-center">You haven't favorited any NGOs yet.</p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Modal component for donation
//   const DonationModal = ({ isOpen, onClose, ngoName }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
//         <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm mx-auto text-center">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <LucideX size={24} />
//           </button>
//           <h3 className="text-2xl font-bold text-indigo-600 mb-4">Thank You!</h3>
//           <p className="text-gray-700 mb-6">
//             Your donation to <span className="font-semibold">{ngoName}</span> has been processed. Your support makes a difference!
//           </p>
//           <button
//             onClick={onClose}
//             className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
//           >
//             Awesome!
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Filter Modal component
//   const FilterModal = ({ isOpen, onClose, filterOptions, onFilterChange }) => {
//     if (!isOpen) return null;

//     const allResources = ['Education', 'Health', 'Poverty', 'Environment', 'Technology', 'Community'];

//     const handleClearFilters = () => {
//       onFilterChange('showFavorites', false);
//       onFilterChange('minCredits', 0);
//       onFilterChange('name', '');
//       onFilterChange('resources', []);
//       onFilterChange('id', '');
//     };

//     return (
//       <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
//         <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm mx-auto">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <LucideX size={24} />
//           </button>
//           <h3 className="text-2xl font-bold text-gray-800 mb-6">Filter Options</h3>
          
//           <div className="space-y-4">
//             <div>
//               <label htmlFor="nameFilter" className="block text-gray-700 font-medium mb-2">Filter by Name</label>
//               <input
//                 type="text"
//                 id="nameFilter"
//                 value={filterOptions.name}
//                 onChange={(e) => onFilterChange('name', e.target.value)}
//                 className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="e.g., Global Aid"
//               />
//             </div>
            
//             <div>
//               <label htmlFor="idFilter" className="block text-gray-700 font-medium mb-2">Filter by ID</label>
//               <input
//                 type="text"
//                 id="idFilter"
//                 value={filterOptions.id}
//                 onChange={(e) => onFilterChange('id', e.target.value)}
//                 className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="e.g., 1, 2, 3"
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-medium mb-2">Filter by Resources</label>
//               <div className="flex flex-wrap gap-2">
//                 {allResources.map(resource => (
//                   <label key={resource} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors">
//                     <input
//                       type="checkbox"
//                       checked={filterOptions.resources.includes(resource)}
//                       onChange={() => onFilterChange('resources', resource)}
//                       className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-500"
//                     />
//                     <span>{resource}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 id="showFavorites"
//                 checked={filterOptions.showFavorites}
//                 onChange={(e) => onFilterChange('showFavorites', e.target.checked)}
//                 className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded-md focus:ring-indigo-500"
//               />
//               <label htmlFor="showFavorites" className="text-gray-700 font-medium">Show Favorites Only</label>
//             </div>

//             <div>
//               <label htmlFor="minCredits" className="block text-gray-700 font-medium mb-2">Minimum Credits</label>
//               <input
//                 type="number"
//                 id="minCredits"
//                 value={filterOptions.minCredits}
//                 onChange={(e) => onFilterChange('minCredits', parseInt(e.target.value, 10) || 0)}
//                 className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 min="0"
//               />
//             </div>
//           </div>
          
//           <div className="flex justify-between mt-8 space-x-2">
//             <button
//               onClick={onClose}
//               className="flex-1 py-3 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
//             >
//               Apply
//             </button>
//             <button
//               onClick={handleClearFilters}
//               className="flex-1 py-3 px-4 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors duration-200"
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };
  
//   // Main return statement for the App component
//   return (
//     <div className="bg-gray-50 min-h-screen w-screen font-sans antialiased text-gray-900">
//       <Navbar />
//       <div className="container mx-auto">
//         <>
//           <div ref={dashboardRef}>
//             <Dashboard />
//           </div>
//           <div ref={favoritesRef}>
//             <Favorites />
//           </div>
//           <div ref={leaderboardRef}>
//             <Leaderboard />
//           </div>
//         </>
//       </div>

//       <DonationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         ngoName={selectedNgoName}
//       />
      
//       <FilterModal
//         isOpen={isFilterModalOpen}
//         onClose={() => setIsFilterModalOpen(false)}
//         filterOptions={filterOptions}
//         onFilterChange={handleFilterChange}
//       />
//     </div>
//   );
// }
import { useState, useEffect, useRef } from 'react';
import {
  LucideTrophy,
  LucideStar,
  LucideSearch,
  LucideFilter,
  LucideGlobe,
  LucideBadgeDollarSign,
  LucideUser,
  LucideBuilding,
  LucideX,
  LucideLoader2,
} from 'lucide-react';

import LogoutButton from '../components/LogoutButton'; // Import the LogoutButton component

// Main App component for the Collab for Good platform
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedNgoName, setSelectedNgoName] = useState('');
  const [activeSection, setActiveSection] = useState('explore');
  const [filterOptions, setFilterOptions] = useState({
    showFavorites: false,
    minCredits: 0,
    name: '',
    resources: [],
    id: '',
  });

  // Initial data is now managed locally in the component's state, with added resource types
  const [ngosData, setNgosData] = useState([
    { id: '1', name: 'Global Aid Alliance', website: 'https://globalaid.org', credits: 25000, isFavorite: false, resources: ['Education', 'Health'] },
    { id: '2', name: 'Unity Foundation', website: 'https://unityfoundation.org', credits: 18750, isFavorite: false, resources: ['Poverty', 'Community'] },
    { id: '3', name: 'Community Care Network', website: 'https://communitycare.org', credits: 15400, isFavorite: false, resources: ['Health', 'Community'] },
    { id: '4', name: 'Hope & Humanity', website: 'https://hopehumanity.org', credits: 12100, isFavorite: false, resources: ['Poverty', 'Education'] },
    { id: '5', name: 'Eco Warriors', website: 'https://ecowarriors.org', credits: 9800, isFavorite: false, resources: ['Environment'] },
    { id: '6', name: 'Future Forward', website: 'https://futureforward.org', credits: 7500, isFavorite: false, resources: ['Education', 'Technology'] },
    { id: '7', name: 'Healthy Hearts', website: 'https://healthyhearts.org', credits: 5200, isFavorite: false, resources: ['Health'] },
  ]);

  const [leaderboardData, setLeaderboardData] = useState({
    topDonors: [
      { id: 1, name: 'John Smith', donations: 5000 },
      { id: 2, name: 'Jane Doe', donations: 3200 },
      { id: 3, name: 'Alex Johnson', donations: 1800 },
      { id: 4, name: 'Maria Garcia', donations: 1500 },
      { id: 5, name: 'David Wilson', donations: 1200 },
    ],
  });

  // Refs for scrolling to different sections
  const dashboardRef = useRef(null);
  const favoritesRef = useRef(null);
  const leaderboardRef = useRef(null);

  // --- Scroll-based active section tracking ---
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { name: 'explore', ref: dashboardRef },
        { name: 'favorites', ref: favoritesRef },
        { name: 'leaderboard', ref: leaderboardRef },
      ];

      const offset = 100; // Offset to activate the button a little before the section hits the top
      const currentScrollPos = window.scrollY;

      for (const section of sections) {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };
    
    // Add event listener on mount
    window.addEventListener('scroll', handleScroll);
    // Clean up event listener on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to smoothly scroll to a section
  const scrollToSection = (ref, sectionName) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to toggle a favorite state locally
  const toggleFavorite = (id) => {
    setNgosData(prevNgos => 
      prevNgos.map(ngo => 
        ngo.id === id ? { ...ngo, isFavorite: !ngo.isFavorite } : ngo
      )
    );
  };

  // Function to simulate a donation and update credits locally
  const handleDonate = (ngoId, ngoName) => {
    setNgosData(prevNgos =>
      prevNgos.map(ngo =>
        ngo.id === ngoId ? { ...ngo, credits: ngo.credits + 1000 } : ngo
      )
    );
    setSelectedNgoName(ngoName);
    setIsModalOpen(true);
  };

  // Function to apply filters
  const handleFilterChange = (key, value) => {
    setFilterOptions(prevOptions => {
      // Handle resources filter as an array of selected values
      if (key === 'resources') {
        const newResources = prevOptions.resources.includes(value)
          ? prevOptions.resources.filter(resource => resource !== value)
          : [...prevOptions.resources, value];
        return { ...prevOptions, resources: newResources };
      }
      return { ...prevOptions, [key]: value };
    });
  };

  // Filtered list of NGOs based on all filter options
  const sortedNgos = ngosData.sort((a, b) => b.credits - a.credits);
  const filteredNgos = sortedNgos.filter(ngo => {
    const matchesSearchTerm = ngo.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFavorites = !filterOptions.showFavorites || ngo.isFavorite;
    const matchesMinCredits = ngo.credits >= filterOptions.minCredits;
    const matchesNameFilter = filterOptions.name === '' || ngo.name.toLowerCase().includes(filterOptions.name.toLowerCase());
    const matchesIdFilter = filterOptions.id === '' || ngo.id === filterOptions.id;
    
    const matchesResources = filterOptions.resources.length === 0 ||
      filterOptions.resources.some(resource => ngo.resources.includes(resource));

    return matchesSearchTerm && matchesFavorites && matchesMinCredits && matchesNameFilter && matchesIdFilter && matchesResources;
  });

  // Navbar component
  const Navbar = () => (
    <nav className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm rounded-b-xl">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="20" fill="#4f46e5" />
            <path d="M10 20L15 25L30 10L25 15L10 20Z" fill="#ffffff" />
          </svg>
          <span className="text-xl font-bold text-gray-800">Collab for Good</span>
        </div>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors duration-200"
          >
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
          <LogoutButton />
        </div>

        <div className="flex space-x-4 mt-4 sm:mt-0">
          <button
            onClick={() => scrollToSection(dashboardRef, 'explore')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${
              activeSection === 'explore'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            <LucideBuilding size={18} />
            <span className="font-medium">Explore</span>
          </button>

          <button
            onClick={() => scrollToSection(favoritesRef, 'favorites')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${
              activeSection === 'favorites'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            <LucideStar size={18} />
            <span className="font-medium">Favorites</span>
          </button>

          <button
            onClick={() => scrollToSection(leaderboardRef, 'leaderboard')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors duration-200 ease-in-out ${
              activeSection === 'leaderboard'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-indigo-500 text-white hover:bg-indigo-600'
            }`}
          >
            <LucideTrophy size={18} />
            <span className="font-medium">Leaderboard</span>
          </button>
        </div>
      </div>
    </nav>
  );

  // Dashboard view component
  const Dashboard = () => (
    <div className="p-8 w-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Explore NGOs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNgos.length > 0 ? (
          filteredNgos.map(ngo => (
            <div key={ngo.id} className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
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
                <button
                  onClick={() => handleDonate(ngo.id, ngo.name)}
                  className="flex-1 py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
                >
                  Donate
                </button>
                <button
                  onClick={() => toggleFavorite(ngo.id)}
                  className="p-3 text-yellow-500 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors duration-200"
                >
                  <LucideStar size={20} fill={ngo.isFavorite ? 'currentColor' : 'none'} strokeWidth={ngo.isFavorite ? 0 : 2} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No NGOs found matching your criteria.</p>
        )}
      </div>
    </div>
  );

  // Leaderboard view component
  const Leaderboard = () => (
    <div className="p-8 w-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Leaderboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <LucideBuilding size={20} className="text-purple-500" />
            <span>Top NGOs by Credits</span>
          </h3>
          <ul className="divide-y divide-gray-200">
            {ngosData.slice(0, 5).map((ngo, index) => (
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
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
            <LucideUser size={20} className="text-blue-500" />
            <span>Top Donors</span>
          </h3>
          <ul className="divide-y divide-gray-200">
            {leaderboardData?.topDonors.map((donor, index) => (
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

  // Favorites view component
  const Favorites = () => {
    const favoriteNgos = filteredNgos.filter(ngo => ngo.isFavorite);
    return (
      <div className="p-8 w-screen">
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
                  <button
                    onClick={() => handleDonate(ngo.id, ngo.name)}
                    className="flex-1 py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
                  >
                    Donate
                  </button>
                  <button
                    onClick={() => toggleFavorite(ngo.id)}
                    className="p-3 text-yellow-500 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors duration-200"
                  >
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

  // Modal component for donation
  const DonationModal = ({ isOpen, onClose, ngoName }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm mx-auto text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LucideX size={24} />
          </button>
          <h3 className="text-2xl font-bold text-indigo-600 mb-4">Thank You!</h3>
          <p className="text-gray-700 mb-6">
            Your donation to <span className="font-semibold">{ngoName}</span> has been processed. Your support makes a difference!
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
          >
            Awesome!
          </button>
        </div>
      </div>
    );
  };

  // Filter Modal component
  const FilterModal = ({ isOpen, onClose, filterOptions, onFilterChange }) => {
    if (!isOpen) return null;

    const allResources = ['Education', 'Health', 'Poverty', 'Environment', 'Technology', 'Community'];

    const handleClearFilters = () => {
      onFilterChange('showFavorites', false);
      onFilterChange('minCredits', 0);
      onFilterChange('name', '');
      onFilterChange('resources', []);
      onFilterChange('id', '');
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
        <div className="relative bg-white p-8 rounded-xl shadow-2xl max-w-sm mx-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <LucideX size={24} />
          </button>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Filter Options</h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="nameFilter" className="block text-gray-700 font-medium mb-2">Filter by Name</label>
              <input
                type="text"
                id="nameFilter"
                value={filterOptions.name}
                onChange={(e) => onFilterChange('name', e.target.value)}
                className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Global Aid"
              />
            </div>
            
            <div>
              <label htmlFor="idFilter" className="block text-gray-700 font-medium mb-2">Filter by ID</label>
              <input
                type="text"
                id="idFilter"
                value={filterOptions.id}
                onChange={(e) => onFilterChange('id', e.target.value)}
                className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., 1, 2, 3"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Filter by Resources</label>
              <div className="flex flex-wrap gap-2">
                {allResources.map(resource => (
                  <label key={resource} className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200 transition-colors">
                    <input
                      type="checkbox"
                      checked={filterOptions.resources.includes(resource)}
                      onChange={() => onFilterChange('resources', resource)}
                      className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-indigo-500"
                    />
                    <span>{resource}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="showFavorites"
                checked={filterOptions.showFavorites}
                onChange={(e) => onFilterChange('showFavorites', e.target.checked)}
                className="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded-md focus:ring-indigo-500"
              />
              <label htmlFor="showFavorites" className="text-gray-700 font-medium">Show Favorites Only</label>
            </div>

            <div>
              <label htmlFor="minCredits" className="block text-gray-700 font-medium mb-2">Minimum Credits</label>
              <input
                type="number"
                id="minCredits"
                value={filterOptions.minCredits}
                onChange={(e) => onFilterChange('minCredits', parseInt(e.target.value, 10) || 0)}
                className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="0"
              />
            </div>
          </div>
          
          <div className="flex justify-between mt-8 space-x-2">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200"
            >
              Apply
            </button>
            <button
              onClick={handleClearFilters}
              className="flex-1 py-3 px-4 bg-red-500 text-white font-bold rounded-full hover:bg-red-600 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Main return statement for the App component
  return (
    <div className="bg-gray-50 min-h-screen w-screen font-sans antialiased text-gray-900">
      <Navbar />
      <div className="container mx-auto">
        <>
          <div ref={dashboardRef}>
            <Dashboard />
          </div>
          <div ref={favoritesRef}>
            <Favorites />
          </div>
          <div ref={leaderboardRef}>
            <Leaderboard />
          </div>
        </>
      </div>

      <DonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ngoName={selectedNgoName}
      />
      
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
}

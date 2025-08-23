import { useState } from 'react';
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
  LucideLayoutDashboard,
  LucideTrophy,
  LucideCreditCard,
  LucideBox,
  LucideHeart,
  LucideBadgeDollarSign,
  LucideUpload,
  LucideDownload,
  LucideGlobe,
  LucideSearch,
  LucideFilter,
  LucideEdit,
  LucideInfo
} from 'lucide-react';
import C from '../C.png';
import Unity from '../unity.jpg'
import LogoutButton from '../components/LogoutButton';

// =======================================
// Main App Component
// This component manages the state and renders the correct page.
// =======================================

// --- MOCK DATA (Consolidated for all pages) ---
const ngoData = {
  name: 'Unity Foundation',
  totalCredits: 1250,
  resourcesListed: 45,
  resourcesClaimed: 28,
};

const myResources = [
  { id: 1, name: '100 Medical Masks', category: 'Medical Supplies', status: 'Available', credits: 50 },
  { id: 2, name: 'Office Desk', category: 'Office Equipment', status: 'Claimed', credits: 20 },
  { id: 3, name: 'Volunteer Hours (20)', category: 'Services', status: 'Available', credits: 100 },
  { id: 4, name: 'Laptop', category: 'Electronics', status: 'Claimed', credits: 150 },
];

const leaderboardData = {
  topDonors: [
    { id: 1, name: 'John Smith', donations: 5000 },
    { id: 2, name: 'Jane Doe', donations: 3200 },
    { id: 3, name: 'Alex Johnson', donations: 1800 },
  ],
  topNgos: [
    { id: 1, name: 'Global Aid Alliance', credits: 25000 },
    { id: 2, name: 'Unity Foundation', credits: 18750 },
    { id: 3, name: 'Community Care Network', credits: 15400 },
    { id: 4, name: 'Hope & Humanity', credits: 12100 },
    { id: 5, name: 'Eco Warriors', credits: 9800 },
  ],
};

const availableResources = [
  { id: 1, ngo: 'Community Care Network', name: '45 Blankets', category: 'Shelter', location: 'New York, NY', credits: 75, availability: 'Available', country: 'USA' },
  { id: 2, ngo: 'Hope & Humanity', name: 'Water Filters (10)', category: 'Medical Supplies', location: 'Chicago, IL', credits: 120, availability: 'Available', country: 'USA' },
  { id: 3, ngo: 'Eco Warriors', name: 'Solar Panels', category: 'Equipment', location: 'Los Angeles, CA', credits: 200, availability: 'Available', country: 'USA' },
  { id: 4, ngo: 'Global Health NGO', name: 'First Aid Kits', category: 'Medical Supplies', location: 'London, UK', credits: 100, availability: 'Available', country: 'UK' },
  { id: 5, ngo: 'Aidez la France', name: 'Warm Clothing', category: 'Shelter', location: 'Paris, France', credits: 50, availability: 'Available', country: 'France' },
  { id: 6, ngo: 'Aid for All', name: 'School Supplies', category: 'Education', location: 'Berlin, Germany', credits: 80, availability: 'Available', country: 'Germany' },
];

const incomingRequests = [
  { id: 1, resourceName: 'Laptop', requestedBy: 'Community First', status: 'Pending', quantity: 1 },
  { id: 2, resourceName: 'Office Desk', requestedBy: 'Green Earth Foundation', status: 'Pending', quantity: 2 },
  { id: 3, resourceName: '100 Medical Masks', requestedBy: 'Health United', status: 'Approved', quantity: 100 },
];

const myOutboundRequests = [
  { id: 1, resourceName: '45 Blankets', requestedFrom: 'Community Care Network', status: 'Pending' },
  { id: 2, resourceName: 'Water Filters (10)', requestedFrom: 'Hope & Humanity', status: 'Approved' },
  { id: 3, resourceName: 'Laptop', requestedFrom: 'Tech Aid', status: 'Pending' },
];

const allRequests = [
  ...incomingRequests.map(req => ({ ...req, key: `incoming-${req.id}` })),
  ...myOutboundRequests.map(req => ({ ...req, key: `outbound-${req.id}`, requestedBy: 'You' }))
];

const donorData = {
  name: 'John Smith',
  totalDonations: 5000,
  favoriteNgos: 3,
};

const donationHistory = [
  { id: 1, ngo: 'Unity Foundation', amount: 1000, date: '2023-01-15' },
  { id: 2, ngo: 'Global Aid Alliance', amount: 2500, date: '2023-03-22' },
  { id: 3, ngo: 'Community Care Network', amount: 500, date: '2023-05-10' },
];

const ngosForDonor = [
  { id: 1, name: 'Global Aid Alliance', website: 'https://globalaid.org', credits: 25000, isFavorite: true },
  { id: 2, name: 'Unity Foundation', website: 'https://unityfoundation.org', credits: 18750, isFavorite: true },
  { id: 3, name: 'Community Care Network', website: 'https://communitycare.org', credits: 15400, isFavorite: false },
  { id: 4, name: 'Hope & Humanity', website: 'https://hopehumanity.org', credits: 12100, isFavorite: false },
  { id: 5, name: 'Eco Warriors', website: 'https://ecowarriors.org', credits: 9800, isFavorite: false },
  { id: 6, name: 'Future Forward', website: 'https://futureforward.org', credits: 7500, isFavorite: true },
  { id: 7, name: 'Healthy Hearts', website: 'https://healthyhearts.org', credits: 5200, isFavorite: false },
];

// --- Sub-Component Definitions ---
const SidebarItem = ({ icon: Icon, text, view, currentView, onClick }) => (
  <li>
    <button
      onClick={() => onClick(view)}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentView === view ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
    >
      <Icon size={20} />
      <span>{text}</span>
    </button>
  </li>
);

  // --- NGO Dashboard Pages ---
  const NgoDashboardPage = ({ setNgoDashboardView }) => (
    <div className="p-8 flex-1 min-h-screen w-screen">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">NGO Dashboard</h2>
        <div className="flex items-center space-x-2">
          <img src={C} alt="NGO Logo" className="w-10 h-10 rounded-full border-2 border-indigo-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4">
          <div className="p-3 bg-indigo-100 text-indigo-500 rounded-full">
            <LucideBox size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Resources</p>
            <p className="text-2xl font-bold text-gray-800">{ngoData.resourcesListed}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4">
          <div className="p-3 bg-indigo-100 text-indigo-500 rounded-full">
            <LucideHeart size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Requests</p>
            <p className="text-2xl font-bold text-gray-800">{ngoData.resourcesClaimed}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center space-x-4">
          <div className="p-3 bg-indigo-100 text-indigo-500 rounded-full">
            <LucideBuilding size={24} />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Collaborations</p>
            <p className="text-2xl font-bold text-gray-800">123</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Share a Resource</h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Resource Title</label>
              <input type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="" />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Quantity</label>
              <input type="number" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g., 50" min="1" />
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200">
              Share Resource
            </button>
          </form>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">&bull;</span>
              <span>New resource "Laptop Donation" uploaded</span>
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">&bull;</span>
              <span>Requested 5 units of "Office Supplies"</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const NgoLeaderboardPage = ({ leaderboardData }) => (
    <div className="p-8 flex-1 min-h-screen w-screen">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Leaderboard</h2>
        <p className="text-gray-600 mt-2">See how you and other organizations rank!</p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col border-t-8 border-indigo-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center space-x-2">
            <LucideBuilding size={24} className="text-indigo-500" />
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
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col border-t-8 border-green-500">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center space-x-2">
            <LucideUser size={24} className="text-green-500" />
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

  const AvailableResourcesPage = ({ setNgoDashboardView }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');
    const countries = ['All', ...new Set(availableResources.map(resource => resource.country))];

    const filteredResources = availableResources.filter(resource =>
      (selectedCountry === 'All' || resource.country === selectedCountry) &&
      (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="p-8 flex-1 min-h-screen w-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse Available Resources</h2>
        <p className="text-gray-600 mb-6">Find resources shared by other NGOs in the network.</p>
        
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setNgoDashboardView('dashboard')}
            className="py-2 px-6 rounded-full font-semibold transition-colors duration-200 bg-indigo-600 text-white shadow-md"
          >
            My Idle Resources
          </button>
        </div>

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1">
            <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search resources by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800">{resource.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{resource.category}</p>
              <p className="text-gray-600 mt-4">{resource.ngo}</p>
              <div className="flex items-center space-x-2 text-gray-500 mt-2">
                <LucideMapPin size={16} />
                <span>{resource.location}</span>
              </div>
              <button className="mt-4 w-full py-2 px-4 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors duration-200">
                Request Resource
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RequestsPage = ({ allRequests }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const statuses = ['All', ...new Set(allRequests.map(request => request.status))];

    const filteredRequests = allRequests.filter(request =>
      (selectedStatus === 'All' || request.status === selectedStatus) &&
      (request.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (request.requestedBy && request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    const getStatusClass = (status) => {
      switch (status) {
        case 'Pending':
          return 'bg-yellow-100 text-yellow-800';
        case 'Approved':
          return 'bg-green-100 text-green-800';
        case 'Rejected':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <div className="p-8 flex-1 min-h-screen w-screen">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Requests</h2>
        <p className="text-gray-600 mb-6">Manage all requests from and to other NGOs.</p>
        
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="relative flex-1">
            <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search requests by name or NGO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-300 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                    Resource Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requested By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map(request => (
                  <tr key={request.key} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.resourceName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestedBy || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const NgoProfilePage = () => {
    const profileData = [
      { id: 1, label: 'NGO Name', value: 'Unity Foundation', type: 'text' },
      { id: 2, label: 'Location', value: 'San Francisco, CA', type: 'text' },
      { id: 3, label: 'Contact Email', value: 'contact@unityfoundation.org', type: 'email' },
      { id: 4, label: 'Resources Listed', value: '45', type: 'info' },
      { id: 5, label: 'Collaborations', value: '123', type: 'info' },
    ];
    
    return (
      <div className="p-8 flex-1 min-h-screen w-screen overflow-x-hidden">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
          <p className="text-gray-600 mt-2">Edit your NGO's information and details.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-6">
            <img src={Unity} alt="NGO Logo" className="w-20 h-20 rounded-full border-2 border-indigo-500 mb-2" />
            <h3 className="text-xl font-semibold text-gray-800">Unity Foundation</h3>
            <p className="text-gray-500 text-sm">San Francisco, CA</p>
          </div>
          <form className="space-y-4">
            {profileData.map(item => (
              <div key={item.id}>
                <label className="block text-gray-700 font-medium mb-1">{item.label}</label>
                {item.type === 'info' ? (
                  <p className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 text-gray-600">{item.value}</p>
                ) : (
                  <input
                    type={item.type}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    defaultValue={item.value}
                  />
                )}
              </div>
            ))}
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-700 transition-colors duration-200">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  };

const NgoApp = ({ setCurrentView }) => {
  const [ngoDashboardView, setNgoDashboardView] = useState('dashboard');
  const Sidebar = ({ currentView, onClick }) => (
    <nav className="bg-white p-4 w-64 min-h-screen border-r border-gray-200">
      <div className="flex items-center space-x-2 mb-8">
        <img src={C} alt="Collab for Good Logo" className="w-10 h-10 rounded-full" />
        <span className="text-xl font-bold text-gray-800">Collab4Good</span>
      </div>
      <ul className="space-y-2">
        <SidebarItem icon={LucideLayoutDashboard} text="Dashboard" view="dashboard" currentView={currentView} onClick={onClick} />
        <SidebarItem icon={LucideTrophy} text="Leaderboard" view="leaderboard" currentView={currentView} onClick={onClick} />
        <SidebarItem icon={LucideBox} text="Available Resources" view="available-resources" currentView={currentView} onClick={onClick} />
        <SidebarItem icon={LucideDownload} text="Requests" view="requests" currentView={currentView} onClick={onClick} />
        <SidebarItem icon={LucideUser} text="Profile" view="profile" currentView={currentView} onClick={onClick} />
      </ul>
      <div className="mt-auto pt-8 border-t border-gray-200">
        <LogoutButton/>
      </div>
    </nav>
  );

  return (
    <div className="bg-gray-50 min-h-screen font-sans antialiased text-gray-900 flex">
      <Sidebar currentView={ngoDashboardView} onClick={setNgoDashboardView} />
      <div className="flex-1">
        {(() => {
          switch (ngoDashboardView) {
            case 'dashboard':
              return <NgoDashboardPage setNgoDashboardView={setNgoDashboardView} />;
            case 'leaderboard':
              return <NgoLeaderboardPage leaderboardData={leaderboardData} />;
            case 'available-resources':
              return <AvailableResourcesPage setNgoDashboardView={setNgoDashboardView} />;
            case 'requests':
              return <RequestsPage allRequests={allRequests} />;
            case 'profile':
              return <NgoProfilePage />;
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentView, setCurrentView] = useState('ngo-dashboard');

  // --- Main App Rendering Logic ---
  const renderApp = () => {
    switch (currentView) {
      case 'homepage':
        return <Homepage setCurrentView={setCurrentView} />;
        return null;
      case 'ngo-dashboard':
        return <NgoApp setCurrentView={setCurrentView} />;
      case 'donor-dashboard':
        return <DonorApp setCurrentView={setCurrentView} />;
        return null;
      default:
        return <Homepage setCurrentView={setCurrentView} />;
        return null;
    }
  };

  return renderApp();
}

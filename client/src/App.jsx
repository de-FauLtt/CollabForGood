// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import NgoDashboard from './pages/NgoDashboard';
// import DonorDashboard from './pages/DonorDashboard';

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/ngo-dashboard" element={<NgoDashboard />} />
//         <Route path="/donor-dashboard" element={<DonorDashboard />} />
//         {/* other routes like /login, /dashboard */}
//       </Routes>
//     </Router>
//   );
// }
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthWrapper from "./components/AuthWrapper"; // Assuming you place AuthWrapper in a 'components' folder

// Import your pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NgoDashboard from "./pages/NgoDashboard";
import DonorDashboard from "./pages/DonorDashboard";

/**
 * A private route component that redirects unauthenticated users to the login page.
 */
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');
  
  // If no token or role, or if the role doesn't match, redirect to login
  if (!token || !userRole || userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};


export default function App() {
  return (
    <BrowserRouter>
      {/* AuthWrapper will check for a session and redirect on initial load */}
      <AuthWrapper>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route 
            path="/ngo-dashboard" 
            element={
              <PrivateRoute role="ngo">
                <NgoDashboard />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/donor-dashboard" 
            element={
              <PrivateRoute role="donor">
                <DonorDashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </AuthWrapper>
    </BrowserRouter>
  );
}

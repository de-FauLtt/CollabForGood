import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        {/* other routes like /login, /dashboard */}
      </Routes>
    </Router>
  );
}
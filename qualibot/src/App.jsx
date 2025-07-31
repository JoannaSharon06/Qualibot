import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import RCA from './components/RCA'
import AnomalyDashboard from './components/AnomalyDashboard'
import About from './components/About';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Solution from './components/Solution';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Land from './components/Land';
import AdminLogin from './components/AdminLogin';
import SolutionPage from './components/SolutionPage';
import ProfilePage from './components/ProfilePage';
import AdminDashboard from './components/AdminDashboard';
import { useEffect, useState } from 'react';


function AppWrapper() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on every location change (you can optimize this later)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  // Define paths where you don't want Navbar to appear
  const noNavbarPaths = ['/', '/signup','/login','/adminlogin','/admindash', '/solutionpage', '/profilepage'];

  return (
    <>
      {!noNavbarPaths.includes(location.pathname) && isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dash" element={<AnomalyDashboard />} />
        <Route path="/rca" element={<RCA />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/solution" element={<Solution />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/solutionpage" element={<SolutionPage />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/admindash" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;

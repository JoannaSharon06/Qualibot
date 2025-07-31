import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '/logoq.png'; // adjust path based on your file structure

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Qualibot Logo" className="logo-image" />
        <span>QUALIBOT</span>
      </div>
      <div className="navbar-right">
        <Link to="/dash">Home</Link>
        <Link to="/rca">RCA</Link>
        <Link to="/about">About</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Logo from '../../assets/nccLogo.png';  // Path to your logo image
import './Navbar.css'; // Import the custom CSS file

const Navbars = () => {
  const [bgColor, setBgColor] = useState('#ffffff'); // Navbar bg color is white always
  const [textColor, setTextColor] = useState('black'); // Text color is black
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the menu
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  // Function to handle logout and redirect to home
  const clearUser = () => {
    localStorage.removeItem('token');
    navigate('/'); // Navigate to home after logout
  };

  // Toggle the menu on hamburger click
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <AppBar 
        position="fixed" 
        sx={{
          backgroundColor: bgColor, // Navbar bg is always white
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
          transition: 'background-color 0.5s ease',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo and Website Name as an anchor link to Home */}
          <div className="navbar-logo">
            <Link to="/Home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
              <div className="navbar-logo">
                <img src={Logo} alt="Logo" style={{ height: '40px', marginRight: '8px' }} /> {/* Logo image */}
                <div>
                  <Typography variant="h6" sx={{ fontFamily: '"Varela", sans-serif', color: textColor }}>
                    NCC Directorate
                  </Typography>
                  <Typography variant="body2" sx={{ fontFamily: '"Varela", sans-serif', color: textColor, fontSize: '0.8em' }}>
                    Kerala and Lakshadweep
                  </Typography>
                </div>
              </div>
            </Link>
          </div>

          {/* Hamburger Icon for mobile view */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleMenu}
            sx={{ display: { xs: 'block', md: 'none' } }} // Only show on small screens
          >
            <span className="hamburger">&#9776;</span> {/* Unicode for hamburger menu */}
          </IconButton>

          {/* Navigation Links */}
          <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
            <Link to="/Home">
              <Button color="inherit" sx={{ fontFamily: '"Varela", sans-serif', color: textColor }}>
                Home
              </Button>
            </Link>
            <a href="#aboutus">
              <Button color="inherit" sx={{ fontFamily: '"Varela", sans-serif', color: textColor }}>
                About Us
              </Button>
            </a>
            <Link to="/Home">
              <Button color="inherit" sx={{ fontFamily: '"Varela", sans-serif', color: textColor }}>
                Cadet Statistics
              </Button>
            </Link>
            <a href="#employee-corner">
              <Button color="inherit" sx={{ fontFamily: '"Varela", sans-serif', color: textColor }}>
                Employee Corner
              </Button>
            </a>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbars;

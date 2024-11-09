import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate to handle logout and navigation
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
  const navigate = useNavigate(); // useNavigate for programmatic navigation

  // Function to handle logout and redirect to home
  const clearUser = () => {
    localStorage.removeItem('token');
    navigate('/'); // Navigate to home after logout
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
                <Typography variant="h6" sx={{ fontFamily: '"Varela", sans-serif', color: textColor,}}>
                  NCC Directorate
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: '"Varela", sans-serif', color: textColor, fontSize: '0.8em' }}>
                  Kerala and Lakshadweep
                </Typography>
              </div>
            </div>
          </Link>

          </div>

          {/* Navigation Links */}
          <div className="navbar-links">
            <Link to="/Home">
              <Button color="inherit" sx={{ fontFamily: '"Varela", sans-serif', color: textColor }}>
                Home
              </Button>
            </Link>
            <Link to="/">
              <Button color="inherit" sx={{ color: textColor }} onClick={clearUser}>
                Logout
              </Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbars;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import 'boxicons';

import LatestNews from '../LatestNews/LatestNews';
import Footer from '../Footer/Footer';
import EmployeeCorner from '../EmployeeCorner/EmployeeCorner';
import AdminCarousel from './AdminCarousel';
import AdminLstNws from './AdminLstNws';
import AdminEmpCnr from './AdminEmpCnr';
import AdminFooter from './AdminFooter';

const Admin = () => {
  const [activeLink, setActiveLink] = useState('Dashboard');
  const navigate = useNavigate();

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token or any user-related data
    navigate('/'); // Redirect to the home page after logout
  };

  return (
    <div>
      {/* SIDEBAR */}
      <section id="sidebar">
        <div className="brand">
          <i className='bx bxs-smile'></i>
          <span className="text">KeralaNCC Dashboard</span>
        </div>
        <ul className="side-menu top">
          <li className={activeLink === 'Dashboard' ? 'active' : ''}>
            <a href="#" onClick={() => handleSetActiveLink('Dashboard')}>
              <i className='bx bxs-dashboard'></i>
              <span className="text">Carousel</span>
            </a>
          </li>
          <li className={activeLink === 'My Store' ? 'active' : ''}>
            <a href="#" onClick={() => handleSetActiveLink('My Store')}>
              <i className='bx bxs-shopping-bag-alt'></i>
              <span className="text">Latest News</span>
            </a>
          </li>
          <li className={activeLink === 'Message' ? 'active' : ''}>
            <a href="#" onClick={() => handleSetActiveLink('Message')}>
              <i className='bx bxs-message-dots'></i>
              <span className="text">Employee Corner</span>
            </a>
          </li>
          <li className={activeLink === 'Team' ? 'active' : ''}>
            <a href="#" onClick={() => handleSetActiveLink('Team')}>
              <i className='bx bxs-group'></i>
              <span className="text">Footer</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout" onClick={handleLogout}>
              <i className='bx bxs-log-out-circle'></i>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>

      {/* MAIN CONTENT */}
      <div className="content">
        {activeLink === 'Dashboard' && <AdminCarousel/>}
        {activeLink === 'My Store' && <AdminLstNws/>}
        {activeLink === 'Message' && <AdminEmpCnr/>}
        {activeLink === 'Team' && <AdminFooter/>}
      </div>
    </div>
  );
};

export default Admin;

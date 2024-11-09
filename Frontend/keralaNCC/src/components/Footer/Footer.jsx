import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      {/* Footer Logo */}
      <div className="footer-logo">
        <img src="nccLogo.png" alt="Logo" />
      </div>

      {/* Footer Content */}
      <div className="footer-content">
        <p className="footer-description">Unity and Discipline</p>
        
        {/* Social Icons */}
        <div className="footer-social-icons">
          <a href="#" className="social-icon"><i className="fa-brands fa-facebook"></i></a>
          <a href="#" className="social-icon"><i className="fa-brands fa-twitter"></i></a>
          <a href="#" className="social-icon"><i className="fa-brands fa-instagram"></i></a>
          <a href="#" className="social-icon"><i className="fa-brands fa-linkedin"></i></a>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="footer-grid">
        <div className="footer-column">
          <h2>Related Links</h2>
          <ul>
            <li><a href="https://www.nccindia.nic.in" target="_blank" rel="noopener noreferrer">NCC India</a></li>
            <li><a href="https://www.kerala.gov.in" target="_blank" rel="noopener noreferrer">Kerala Govt</a></li>
            <li><a href="https://www.education.kerala.gov.in" target="_blank" rel="noopener noreferrer">Education Kerala</a></li>
            <li><a href="https://www.highereducation.kerala.gov.in" target="_blank" rel="noopener noreferrer">Higher Education Kerala</a></li>
            <li><a href="https://www.indianarmy.nic.in" target="_blank" rel="noopener noreferrer">Indian Army</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h2>Support</h2>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Community</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h2>Quick Link</h2>
          <ul>
            <li><a href="#">How to Apply</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 , All rights reserved.</p>
        
        {/* Policy Links */}
        <div className="footer-policy-links">
          <a href="#">Terms of service</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;

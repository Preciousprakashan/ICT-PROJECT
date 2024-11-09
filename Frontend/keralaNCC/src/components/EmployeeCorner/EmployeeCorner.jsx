import React from 'react';
import './EmployeeCorner.css';

function EmployeeCorner() {
  return (
    <div className="employee-corner">
      <h2 className="fas fa employee-title">Employee Corner</h2>
      <div className="employee-grid">
        
        {/* First Column */}
        <a href="#" className="employee-item">
          <div className="employee-icon-container">
            <span className="material-symbols-outlined employee-icon">swap_horiz</span>
          </div>
          <h3 className="employee-heading">Transfer and Posting</h3>
        </a>
        
        {/* Second Column */}
        <a href="#" className="employee-item">
          <div className="employee-icon-container">
            <span className="material-symbols-outlined employee-icon">format_list_bulleted</span>
          </div>
          <h3 className="employee-heading">Seniority List</h3>
        </a>
        
        {/* Third Column */}
        <a href="#" className="employee-item">
          <div className="employee-icon-container">
            <span className="material-symbols-outlined employee-icon">trending_up</span>
          </div>
          <h3 className="employee-heading">Promotion</h3>
        </a>

        {/* Fourth Column */}
        <a href="#" className="employee-item">
          <div className="employee-icon-container">
            <span className="material-symbols-outlined employee-icon">person_add</span>
          </div>
          <h3 className="employee-heading">Appointment</h3>
        </a>

        {/* Fifth Column */}
        <a href="#" className="employee-item">
          <div className="employee-icon-container">
            <span className="material-symbols-outlined employee-icon">gavel</span>
          </div>
          <h3 className="employee-heading">Discipline</h3>
        </a>

        {/* Sixth Column */}
        <a href="#" className="employee-item">
          <div className="employee-icon-container">
            <span className="material-symbols-outlined employee-icon">change_circle</span>
          </div>
          <h3 className="employee-heading">Category Change</h3>
        </a>
        
        {/* Seventh Column */}
        <a href="#" className="employee-item">
          <div className="employee-icon-container">
            <span className="material-symbols-outlined employee-icon">verified</span>
          </div>
          <h3 className="employee-heading">Confirmation</h3>
        </a>
        
      </div>
    </div>
  );
}

export default EmployeeCorner;

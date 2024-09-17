// src/components/SideDrawer.js
import React from 'react';
import './SideDrawer.css'; // You should add styles for the drawer

const SideDrawer = ({ isOpen, onClose, children }) => {
  return (
    <div className={`side-drawer ${isOpen ? 'open' : ''}`}>
      <button className="close-btn" onClick={onClose}>Close</button>
      <div className="drawer-content">
        {children}
      </div>
    </div>
  );
};

export default SideDrawer;

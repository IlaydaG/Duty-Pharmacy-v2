import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">💊 Nöbetçi Eczane </div>
      <ul className="navbar-links">
        <li><a href="#home">Ana Sayfa</a></li>
        <li><a href="#map">Hakkımızda</a></li>
        <li><a href="#contact">İletişim</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;

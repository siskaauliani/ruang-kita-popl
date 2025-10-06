// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // <-- IMPORT useAuth
import './Navbar.css';

const Navbar = () => {
  const { currentUser, logout } = useAuth(); // <-- Ambil data user & fungsi logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Arahkan ke halaman login setelah logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">RuangKita</Link>
      </div>
      <ul className="navbar-links">
        {/* Tampilkan link ini jika user sudah login */}
        {currentUser && (
          <>
            <li><Link to="/ruangan">Info Ruang</Link></li>
            <li><Link to="/reservasi">Jadwal Reservasi</Link></li>
            <li><Link to="/buat-reservasi">Buat Reservasi</Link></li>
            
            {/* Tampilkan Admin Panel HANYA JIKA role user adalah 'admin' */}
            {currentUser.role === 'admin' && (
              <li><Link to="/admin">Admin Panel</Link></li>
            )}
          </>
        )}
      </ul>
      <div className="navbar-auth">
        {currentUser ? (
          // Jika ada user login, tampilkan nama dan tombol logout
          <div className='user-info'>
            <span>Halo, {currentUser.name}</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          // Jika tidak ada, tampilkan tombol login
          <Link to="/login" className="login-button">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
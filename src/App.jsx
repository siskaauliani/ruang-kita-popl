// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <-- IMPORT
import { ReservationProvider } from './context/ReservationContext'; // <-- IMPORT
// Import semua halaman
import LoginPage from './pages/LoginPage';
import RoomInfoPage from './pages/RoomInfoPage';
import ReservationListPage from './pages/ReservationListPage';
import CreateReservationPage from './pages/CreateReservationPage';
import AdminPanelPage from './pages/AdminPanelPage';

function App() {
  return (
    // Bungkus semua dengan AuthProvider
    <AuthProvider>
           <ReservationProvider> {/* <-- BUNGKUS DI SINI */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ruangan" element={<RoomInfoPage />} />
          <Route path="/reservasi" element={<ReservationListPage />} />
          <Route path="/buat-reservasi" element={<CreateReservationPage />} />
          <Route path="/admin" element={<AdminPanelPage />} />
          <Route path="/" element={<RoomInfoPage />} />
        </Routes>
      </Router>
       </ReservationProvider> {/* <-- TUTUP DI SINI */}
    </AuthProvider>
  );
}

export default App;
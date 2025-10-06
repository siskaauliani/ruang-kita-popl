// src/pages/CreateReservationPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { rooms } from '../data/mockData';
import { useAuth } from '../context/AuthContext'; // <-- Import Auth Context
import { useReservations } from '../context/ReservationContext'; // <-- Import Reservation Context
import './CreateReservationPage.css';

const CreateReservationPage = () => {
  const { currentUser } = useAuth(); // Ambil data user yang login
  const { addReservation } = useReservations(); // Ambil fungsi addReservation
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomId: '',
    purpose: '',
    date: '',
    startTime: '',
    endTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi: Pastikan user sudah login
    if (!currentUser) {
      alert('Anda harus login terlebih dahulu untuk membuat reservasi!');
      navigate('/login');
      return;
    }

    // Validasi: Pastikan semua field terisi
    if (!formData.roomId || !formData.date || !formData.startTime || !formData.endTime || !formData.purpose) {
      alert('Semua field wajib diisi!');
      return;
    }

    // Panggil fungsi addReservation dari context
    addReservation({
      ...formData,
      userId: currentUser.id, // Tambahkan ID user yang sedang login
    });

    alert('Permintaan reservasi berhasil dikirim!');
    navigate('/reservasi'); // Langsung arahkan ke halaman list reservasi
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="form-card">
          <h2>Formulir Reservasi Ruang</h2>
          <form onSubmit={handleSubmit}>
            {/* ... (isi form tidak berubah) ... */}
            <div className="input-group">
              <label htmlFor="roomId">Pilih Ruang</label>
              <select name="roomId" id="roomId" value={formData.roomId} onChange={handleChange} required>
                <option value="" disabled>-- Pilih Ruangan --</option>
                {rooms.map(room => (
                  <option key={room.id} value={room.id}>{room.name}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="date">Tanggal</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="time-group">
              <div className="input-group">
                <label htmlFor="startTime">Jam Mulai</label>
                <input type="time" name="startTime" id="startTime" value={formData.startTime} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label htmlFor="endTime">Jam Selesai</label>
                <input type="time" name="endTime" id="endTime" value={formData.endTime} onChange={handleChange} required />
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="purpose">Tujuan</label>
              <textarea name="purpose" id="purpose" rows="3" value={formData.purpose} onChange={handleChange} required></textarea>
            </div>
            <button type="submit" className="submit-button">Kirim Permintaan</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReservationPage;
// src/pages/AdminPanelPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useReservations } from '../context/ReservationContext'; // <-- Import Context
import { users, rooms } from '../data/mockData';
import './AdminPanelPage.css';

const AdminPanelPage = () => {
  // Ambil data dan fungsi update dari Context
  const { reservations, updateReservationStatus } = useReservations();

  const handleAction = (id, newStatus) => {
    const confirmed = window.confirm(`Apakah Anda yakin ingin ${newStatus === 'Disetujui' ? 'menyetujui' : 'menolak'} reservasi ini?`);
    if (confirmed) {
      // Panggil fungsi update dari context
      updateReservationStatus(id, newStatus);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <h1>Admin Panel: Persetujuan Reservasi</h1>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tanggal & Waktu</th>
                <th>Ruang</th>
                <th>Pemesan</th>
                <th>Tujuan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reservations
                .filter(res => res.status === 'Menunggu')
                .map(res => {
                  const user = users.find(u => u.id === res.userId);
                  const room = rooms.find(r => r.id === res.roomId);
                  return (
                    <tr key={res.id}>
                      <td>{res.date}, {res.startTime}-{res.endTime}</td>
                      <td>{room?.name}</td>
                      <td>{user?.name}</td>
                      <td>{res.purpose}</td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-approve" onClick={() => handleAction(res.id, 'Disetujui')}>Setujui</button>
                          <button className="btn-reject" onClick={() => handleAction(res.id, 'Ditolak')}>Tolak</button>
                        </div>
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelPage;
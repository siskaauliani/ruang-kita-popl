// src/pages/ReservationListPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import { useReservations } from '../context/ReservationContext'; // <-- IMPORT DARI CONTEXT
import { users, rooms } from '../data/mockData'; // users dan rooms tetap dari mockData
import './ReservationListPage.css';

const ReservationListPage = () => {
  const { reservations } = useReservations(); // <-- AMBIL DATA DARI CONTEXT

  const getStatusClass = (status) => {
    if (status === 'Disetujui') return 'status-approved';
    if (status === 'Ditolak') return 'status-rejected';
    return 'status-pending';
  };

  return (
    <div>
      <Navbar />
      <div className="page-content">
        <h1>Jadwal Reservasi Ruang Rapat</h1>
        <div className="table-container">
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Waktu</th>
                <th>Ruang</th>
                <th>Tujuan</th>
                <th>Pemesan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Data 'reservations' sekarang adalah data live dari context */}
              {reservations.map(res => {
                const user = users.find(u => u.id === res.userId);
                const room = rooms.find(r => r.id === res.roomId);
                return (
                  <tr key={res.id}>
                    <td>{res.date}</td>
                    <td>{res.startTime} - {res.endTime}</td>
                    <td>{room ? room.name : 'N/A'}</td>
                    <td>{res.purpose}</td>
                    <td>{user ? user.name : 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${getStatusClass(res.status)}`}>
                        {res.status}
                      </span>
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

export default ReservationListPage;
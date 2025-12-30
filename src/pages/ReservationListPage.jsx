// src/pages/ReservationListPage.jsx
import React from "react";
import Navbar from "../components/Navbar";
import { useReservations } from "../context/ReservationContext";
import { useAuth } from "../context/AuthContext";
import { users, rooms } from "../data/mockData";
import "./ReservationListPage.css";
import { useContext } from "react";

const ReservationListPage = () => {
  const { reservations } = useReservations(); // dari ReservationContext
const { user } = useAuth();


  // Filter: admin lihat semua, user lihat punya sendiri
  const filteredReservations =
    user?.role === "admin"
      ? reservations
      : reservations.filter(
          (r) => r.userEmail === user?.email
        );

  const getStatusClass = (status) => {
    if (status === "Disetujui") return "status-approved";
    if (status === "Ditolak") return "status-rejected";
    return "status-pending";
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
              {filteredReservations.map((res) => {
                const userData = users.find(
                  (u) => u.id === res.userId
                );
                const room = rooms.find(
                  (r) => r.id === res.roomId
                );

                return (
                  <tr key={res.id}>
                    <td>{res.date}</td>
                    <td>
                      {res.startTime} - {res.endTime}
                    </td>
                    <td>{room?.name || "N/A"}</td>
                    <td>{res.purpose}</td>
                    <td>{userData?.name || "N/A"}</td>
                    <td>
                      <span
                        className={`status-badge ${getStatusClass(
                          res.status
                        )}`}
                      >
                        {res.status}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    Belum ada reservasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReservationListPage;

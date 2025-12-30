// src/pages/CreateReservationPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { rooms } from "../data/mockData";
import { useAuth } from "../context/AuthContext";
import { useReservations } from "../context/ReservationContext";
import "./CreateReservationPage.css";

const CreateReservationPage = () => {
  const { currentUser } = useAuth();
  const { reservations, addReservation } = useReservations();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    roomId: "",
    purpose: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1️⃣ Cek login
    if (!currentUser) {
      alert("Anda harus login terlebih dahulu!");
      navigate("/login");
      return;
    }

    // 2️⃣ Cek field wajib
    const { roomId, date, startTime, endTime, purpose } = formData;
    if (!roomId || !date || !startTime || !endTime || !purpose) {
      alert("Semua field wajib diisi!");
      return;
    }

    // 3️⃣ CEK JADWAL BENTROK
    const isConflict = reservations.some(
      (r) =>
        String(r.roomId) === String(roomId) &&
        r.date === date &&
        r.status !== "Ditolak" &&
        !(
          endTime <= r.startTime ||
          startTime >= r.endTime
        )
    );

    if (isConflict) {
      alert("Jadwal bentrok! Silakan pilih waktu lain.");
      return;
    }

    // 4️⃣ Tambah reservasi
    addReservation({
      ...formData,
      userId: currentUser.id,
      status: "Menunggu",
    });

    alert("Permintaan reservasi berhasil dikirim!");
    navigate("/reservasi");
  };

  return (
    <div>
      <Navbar />
      <div className="page-container">
        <div className="form-card">
          <h2>Formulir Reservasi Ruang</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Pilih Ruang</label>
              <select
                name="roomId"
                value={formData.roomId}
                onChange={handleChange}
                required
              >
                <option value="">-- Pilih Ruangan --</option>
                {rooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label>Tanggal</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="time-group">
              <div className="input-group">
                <label>Jam Mulai</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="input-group">
                <label>Jam Selesai</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Tujuan</label>
              <textarea
                name="purpose"
                rows="3"
                value={formData.purpose}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Kirim Permintaan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateReservationPage;

import React from "react";
import Navbar from "../components/Navbar";
import "./RoomInfoPage.css";
import { rooms } from "../data/mockData";

const RoomInfoPage = () => {
  return (
    <div>
      <Navbar />
      <div className="page-content">
        <h1>Informasi Ruangan Tersedia</h1>

        <div className="room-list">
          {rooms.map((room) => (
            <div key={room.id} className="room-card">
              <img
                src={room.image}
                alt={room.name}
                className="room-image"
              />

              <h3>{room.name}</h3>
              <p>
                <strong>Kapasitas:</strong> {room.capacity} orang
              </p>
              <p>
                <strong>Fasilitas:</strong> {room.facilities}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomInfoPage;

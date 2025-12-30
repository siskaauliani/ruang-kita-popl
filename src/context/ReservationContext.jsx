// src/context/ReservationContext.js
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import { reservations as initialReservations } from "../data/mockData";

// Logger sederhana
const logActivity = (msg, data) => {
  console.log(`[RUANGKITA LOG] ${msg}`, data);
};

// 1. Membuat Context
const ReservationContext = createContext();

// 2. Provider
export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState(() => {
    const stored = localStorage.getItem("reservations");
    return stored ? JSON.parse(stored) : initialReservations;
  });

  // Simpan ke localStorage
  useEffect(() => {
    localStorage.setItem("reservations", JSON.stringify(reservations));
  }, [reservations]);

  // Tambah reservasi
  const addReservation = (newReservationData) => {
    const newReservation = {
      ...newReservationData,
      id: Date.now(),
      status: "Menunggu",
    };

    setReservations((prev) => [...prev, newReservation]);

    // ✅ LOG DITARUH DI SINI
    logActivity("Reservasi dibuat", {
      userId: newReservation.userId,
      roomId: newReservation.roomId,
      date: newReservation.date,
      startTime: newReservation.startTime,
      endTime: newReservation.endTime,
      status: newReservation.status,
    });
  };

  // Update status (Admin)
  const updateReservationStatus = (reservationId, newStatus) => {
    setReservations((prev) =>
      prev.map((res) =>
        res.id === reservationId
          ? { ...res, status: newStatus }
          : res
      )
    );

    logActivity("Status reservasi diubah", {
      reservationId,
      newStatus,
    });
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        addReservation,
        updateReservationStatus,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};

// 3. Custom Hook
export const useReservations = () => {
  return useContext(ReservationContext);
};

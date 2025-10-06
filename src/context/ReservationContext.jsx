// src/context/ReservationContext.js
import React, { createContext, useState, useContext } from 'react';
import { reservations as initialReservations } from '../data/mockData';

// 1. Membuat Context
const ReservationContext = createContext();

// 2. Membuat Provider
export const ReservationProvider = ({ children }) => {
  // State untuk menyimpan daftar reservasi. Diisi dengan data awal dari mockData.
  const [reservations, setReservations] = useState(initialReservations);

  // Fungsi untuk menambah reservasi baru
  const addReservation = (newReservationData) => {
    // Membuat objek reservasi baru yang lengkap
    const newReservation = {
      ...newReservationData,
      id: reservations.length + 1, // Buat ID baru yang simpel
      status: 'Menunggu', // Status default untuk reservasi baru
    };
    
    // Update state dengan menambahkan reservasi baru ke daftar yang sudah ada
    setReservations(prevReservations => [...prevReservations, newReservation]);
  };

  // Fungsi untuk update status (dipakai di Admin Panel)
  const updateReservationStatus = (reservationId, newStatus) => {
    setReservations(prevReservations =>
      prevReservations.map(res =>
        res.id === reservationId ? { ...res, status: newStatus } : res
      )
    );
  };
  
  // Data yang akan dibagikan
  const value = {
    reservations,
    addReservation,
    updateReservationStatus,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
};

// 3. Custom Hook
export const useReservations = () => {
  return useContext(ReservationContext);
};
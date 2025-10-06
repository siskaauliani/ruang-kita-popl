// src/data/mockData.js

// PENTING: Gunakan 'let' untuk users dan reservations agar bisa diubah (misal: saat register atau update status)
export let users = [
  { id: 1, name: 'Admin RuangKita', email: 'admin@ruangkita.com', password: 'admin', role: 'admin' },
  { id: 2, name: 'Budi Santoso', email: 'budi@gmail.com', password: 'password123', role: 'user' },
  { id: 3, name: 'Novi Indah', email: 'novi@gmail.com', password: 'passwordnovi', role: 'user' },
];

export const rooms = [
  { id: 'R01', name: 'Ruang Rencong', capacity: 50, facilities: 'AC, Proyektor, Papan Tulis, Sound System' },
  { id: 'R02', name: 'Ruang Seulawah', capacity: 20, facilities: 'AC, TV LED 50 inch' },
  { id: 'R03', name: 'Ruang Diskusi Cempaka', capacity: 10, facilities: 'AC, Meja Bundar, Whiteboard' },
];

export let reservations = [
  { id: 1, userId: 2, roomId: 'R01', purpose: 'Rapat Kick-off Proyek A', date: '2025-10-27', startTime: '09:00', endTime: '11:00', status: 'Disetujui' },
  { id: 2, userId: 3, roomId: 'R02', purpose: 'Diskusi Tim Internal', date: '2025-10-27', startTime: '14:00', endTime: '15:00', status: 'Menunggu' },
  { id: 3, userId: 2, roomId: 'R03', purpose: 'Wawancara Kandidat', date: '2025-10-28', startTime: '10:00', endTime: '11:00', status: 'Ditolak' },
];
# RuangKita: Sistem Informasi Reservasi Ruang Rapat

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

Proyek ini merupakan aplikasi web untuk Ujian Tengah Semester (UTS) mata kuliah Praktikum POPL. **RuangKita** adalah solusi digital untuk menyederhanakan proses pemesanan ruang rapat, mengatasi masalah jadwal bentrok dan kurangnya transparansi yang sering terjadi pada sistem manual.

## 🖼️ Tampilan Aplikasi (Screenshot)

*(Tips: Ambil screenshot aplikasi Anda yang paling bagus, upload ke folder proyek, lalu ganti `link-ke-screenshot-anda.png` di bawah ini dengan nama file screenshot tersebut. Contoh: `./screenshot-login.png`)*

![Tampilan RuangKita](link-ke-screenshot-anda.png)

## ✨ Fitur Utama

Aplikasi ini memiliki dua peran utama dengan fitur yang berbeda:

#### Untuk Pengguna (User):
* 👤 **Autentikasi Pengguna:** Sistem login dan registrasi yang aman.
* 🏢 **Informasi Ruangan:** Melihat daftar semua ruang yang tersedia lengkap dengan detail kapasitas dan fasilitas.
* 📅 **Jadwal Terpusat:** Melihat seluruh jadwal reservasi untuk menghindari jadwal bentrok.
* 📝 **Formulir Reservasi:** Membuat permintaan reservasi baru melalui formulir online yang intuitif.
* 📊 **Status Reservasi:** Memantau status permintaan reservasi secara *real-time* (Menunggu, Disetujui, Ditolak).

#### Untuk Administrator:
* ⚙️ **Dasbor Admin:** Halaman khusus untuk mengelola semua permintaan reservasi yang masuk.
* ✅ **Persetujuan Reservasi:** Fitur untuk menyetujui atau menolak permintaan reservasi dari pengguna dengan satu klik.

## 💻 Teknologi yang Digunakan

| Kategori              | Teknologi                                    |
| :-------------------- | :------------------------------------------- |
| **Frontend** | React.js, Vite.js                            |
| **Styling** | CSS Murni (Tanpa Framework)                  |
| **Manajemen State** | React Context API                            |
| **Version Control** | Git & GitHub                                 |
| **Containerization** | Docker & Docker Hub                          |
| **Project Management**| Jira Software                                |

## 🚀 Cara Menjalankan Proyek

Proyek ini dapat dijalankan dengan dua cara: secara lokal untuk development atau menggunakan Docker untuk demo.

### Kebutuhan Sistem
* Node.js (v18 atau lebih tinggi)
* npm / yarn
* Docker Desktop

### 1. Menjalankan Secara Lokal (Development)

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/NAMA_USER_GITHUB_ANDA/NAMA_REPO_ANDA.git](https://github.com/NAMA_USER_GITHUB_ANDA/NAMA_REPO_ANDA.git)
    ```
2.  **Masuk ke direktori proyek:**
    ```bash
    cd NAMA_REPO_ANDA
    ```
3.  **Install semua dependencies:**
    ```bash
    npm install
    ```
4.  **Jalankan development server:**
    ```bash
    npm run dev
    ```
5.  Buka browser dan akses `http://localhost:5173`.

### 2. Menjalankan Menggunakan Docker (Production/Demo)

1.  **Pastikan Docker Desktop sedang berjalan.**
2.  **Pull image dari Docker Hub:**
    ```bash
    docker pull siskaauliani29/ruang-kita-popl
    ```
3.  **Jalankan container dari image tersebut:**
    ```bash
    docker run -d -p 8080:80 siskaauliani29/ruang-kita-popl
    ```
4.  Buka browser dan akses `http://localhost:8080`.

## 📁 Struktur Proyek

Struktur folder proyek ini diorganisir untuk skalabilitas dan kemudahan maintenance.
/src
├── /components     # Komponen React yang bisa dipakai ulang (e.g., Navbar)
├── /context        # React Context untuk manajemen state global (Auth & Reservations)
├── /data           # Mock data sebagai simulasi database
├── /pages          # Komponen utama untuk setiap halaman (e.g., LoginPage, AdminPanelPage)
├── App.jsx         # Konfigurasi routing utama aplikasi
└── main.jsx        # Entry point aplikasi React
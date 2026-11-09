# 🏨 The Wild Oasis

### Hotel Management Made Simple.

A modern hotel management dashboard built to simplify cabin management, bookings, guest information, and daily hotel operations.

<p align="center">
  <img src="https://img.shields.io/badge/React-2026-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-Backend-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-Styling-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

<p align="center">
  <a href="YOUR_VERCEL_URL">🌐 Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a>
</p>

---

## 📸 Application Preview

<!-- Add your actual application screenshots here -->

| Dashboard | Cabin Management |
|:---:|:---:|
| ![Dashboard](screenshots/dashboard.png) | ![Cabins](screenshots/cabins.png) |

| Booking Management | Settings |
|:---:|:---:|
| ![Bookings](screenshots/bookings.png) | ![Settings](screenshots/settings.png) |

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 Dashboard | Visual overview of hotel performance and statistics |
| 🏡 Cabin Management | Create, edit, delete and manage cabins |
| 📅 Booking Management | Manage reservations and booking details |
| 👥 Guest Management | Access guest information |
| 🔍 Filtering | Filter records based on different criteria |
| ↕️ Sorting | Server-side sorting |
| 📄 Pagination | Efficient server-side pagination |
| 🔐 Authentication | Secure staff authentication |
| ⚙️ Settings | Configure hotel operational settings |
| 📱 Responsive UI | Responsive layouts for different screen sizes |

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- React Hook Form
- Recharts
- Lucide React

### Backend & State Management
- Supabase
- PostgreSQL
- TanStack React Query
- Supabase Authentication
- Supabase Storage

### Utilities & Tools
- Vite
- date-fns
- React Hot Toast
- Git & GitHub
- Vercel

---

## 🚀 Installation

### Prerequisites
- Node.js
- npm
- Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/the-wild-oasis.git
```

### 2. Navigate to the project

```bash
cd the-wild-oasis
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

### 5. Start development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

---

## 🔒 Security

- Supabase Row Level Security (RLS).
- Authenticated access to protected resources.
- Public publishable key for frontend initialization.
- No service role keys exposed in the frontend.

---

## 🌐 Deployment

Deployed using **Vercel**.

Add the required environment variables in your Vercel project settings before deployment.

**Live Application:** [Visit The Wild Oasis](YOUR_VERCEL_URL)

---

## 👨‍💻 Author

**YOUR NAME**

GitHub: [YOUR_USERNAME](https://github.com/YOUR_USERNAME)

---

<p align="center">
  Made with ❤️ using React and Supabase.
</p>

<p align="center">
  ⭐ If you like this project, consider giving it a star!
</p>

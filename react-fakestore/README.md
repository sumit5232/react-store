# 🛍️ Store Inventory Management System

A high-performance React application built to demonstrate advanced state management, caching strategies, and optimistic UI updates using **Redux Toolkit** and **RTK Query**.

🚀 **Live Demo:** [Insert Your Vercel Link Here]

---

## 🎯 Objective
To build a scalable, responsive, and efficient inventory dashboard that handles CRUD operations (Create, Read, Update, Delete) with seamless user experience, handling network states and caching effectively.

## 🛠️ Tech Stack
- **Frontend Framework:** React.js (Vite)
- **State Management:** Redux Toolkit (RTK)
- **Data Fetching & Caching:** RTK Query
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Routing:** React Router DOM

---

## ✨ Key Features

### 1. 🔐 Authentication System
- Secure login interface with visual polish (Glassmorphism).
- **Redux-based Auth Slice** for global session management.
- Protected Routes (Dashboard is inaccessible without login).
- Persist Login functionality using LocalStorage.

### 2. ⚡ Efficient Data Handling (RTK Query)
- **Automatic Caching:** Prevents redundant network requests.
- **Refetch on Focus:** Data automatically refreshes when the user returns to the tab.
- **Optimistic Updates:** UI updates instantly for "Edit" and "Delete" actions without waiting for the server response, providing a snappy experience.

### 3. 🎨 Modern UI/UX
- Responsive Grid Layout.
- **Glassmorphism** effects on search bars and login forms.
- Interactive hover states and loading skeletons/spinners.
- Modal-based detailed view and editing.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/react-fakestore.git](https://github.com/your-username/react-fakestore.git)
   cd react-fakestore
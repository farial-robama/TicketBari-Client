<div align="center">

# TicketBari – Modern Online Ticket Booking Platform

**A comprehensive MERN stack platform for seamless travel ticket booking**

</div>

---

## ⚡ Quick Start

```bash
# 1. Clone the repositories
git clone https://github.com/farial-robama/TicketBari-Client.git
git clone https://github.com/farial-robama/TicketBari-Server.git

# 2. Setup Frontend
cd TicketBari-Client
npm install
# Create .env.local with your Firebase & API keys
npm run dev

# 3. Setup Backend (in new terminal)
cd TicketBari-Server
npm install
# Create .env with your MongoDB & Stripe keys
npm start
```

**Repositories:**
- 📦 Frontend: [TicketBari-Client](https://github.com/farial-robama/TicketBari-Client)
- 🔧 Backend: [TicketBari-Server](https://github.com/farial-robama/TicketBari-Server)

---

## 📖 Overview

**TicketBari** is a full-stack ticket booking platform that revolutionizes the way travelers book transportation. Built with modern web technologies, it provides a seamless experience for users to discover and book tickets for Bus, Train, Launch, and Flight services across Bangladesh.

### 🎯 Purpose

TicketBari aims to:
- **Simplify Travel Booking**: Provide a centralized platform for all travel tickets
- **Empower Vendors**: Give transport operators tools to manage inventory and track revenue
- **Ensure Quality**: Enable administrators to maintain platform standards through verification
- **Secure Transactions**: Implement industry-standard payment processing

### 🌟 Key Highlights

- 🔐 **Multi-Role System** - Customer, Vendor, and Admin roles with distinct dashboards
- 💳 **Secure Payments** - Stripe integration for safe transactions
- 📊 **Analytics Dashboard** - Real-time revenue tracking and insights
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark mode
- ⚡ **Real-time Updates** - Live countdown timers and booking status
- 🔍 **Advanced Search** - Multi-filter search with sorting and pagination

---

## ✨ Features

### 🔐 Authentication & Security
- **Firebase Authentication**
  - Email/Password registration with validation
  - Google OAuth single sign-on
  - Password requirements (uppercase, lowercase, 6+ chars)
  - Secure JWT token-based API protection
  - Protected routes and role-based access control

### 👤 Customer Features
- **Profile Management**
  - View and edit personal information
  - Upload and update profile picture
  - Track account activity and login history

- **Ticket Booking**
  - Browse available tickets with filters
  - Search by origin/destination
  - Real-time seat availability
  - Book multiple tickets in one transaction
  - Live countdown to departure

- **Booking Management**
  - View all bookings with status tracking
  - Status indicators: Pending, Accepted, Rejected, Paid
  - Secure payment processing via Stripe
  - Digital ticket confirmation

- **Transaction History**
  - Complete payment records
  - Transaction details with timestamps
  - Download/print receipts

### 🏪 Vendor Features
- **Ticket Management**
  - Add new tickets with rich details
  - Image upload via ImgBB API
  - Edit and delete existing tickets
  - Track verification status (Pending, Approved, Rejected)

- **Booking Requests**
  - View incoming booking requests
  - Accept or reject requests
  - Manage seat inventory automatically

- **Revenue Analytics**
  - Interactive charts with Recharts
  - Total revenue tracking
  - Tickets sold statistics
  - Performance insights

### 👨‍💼 Admin Features
- **Ticket Verification**
  - Review vendor-submitted tickets
  - Approve or reject listings
  - Maintain platform quality standards

- **User Management**
  - View all registered users
  - Assign roles (Customer, Vendor, Admin)
  - Mark fraudulent vendors
  - Suspend accounts

- **Advertisement Control**
  - Feature up to 6 tickets on homepage
  - Manage promotional content
  - Boost ticket visibility

### 🏠 Public Pages
- **Homepage**
  - Dynamic hero slider (Swiper.js)
  - Featured tickets section (6 admin-selected)
  - Latest tickets (8 most recent)
  - Popular routes showcase
  - "Why Choose Us" section
  - Customer testimonials

- **All Tickets Page**
  - Advanced filtering system
    - Search by From/To location
    - Filter by transport type (Bus, Train, Flight, Ferry)
    - Sort by price (ascending/descending)
  - Pagination (9 tickets per page)
  - Grid/List view toggle
  - Only shows approved tickets

- **Ticket Details Page**
  - Comprehensive ticket information
  - High-quality images
  - Live departure countdown
  - Route information with map
  - Vendor details
  - Booking interface with quantity selector
  - Smart restrictions (past departure, sold out)

### 🎨 UI/UX Features
- **Modern Design**
  - Purple-blue gradient theme
  - Smooth animations with Framer Motion
  - Glassmorphism effects
  - Card-based layouts

- **Dark/Light Mode**
  - System preference detection
  - Persistent theme storage
  - Smooth transitions

- **Responsive Design**
  - Mobile-first approach
  - Tablet optimization
  - Desktop layouts
  - Touch-friendly interfaces

- **User Feedback**
  - Toast notifications (React Hot Toast)
  - Loading spinners
  - Error handling
  - Success confirmations

---

### Live Demo

🌐 **Website**: [https://ticketbari-client.web.app/](https://ticketbari-client.web.app/)

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework |
| **DaisyUI** | Tailwind component library |
| **React Router v6** | Client-side routing |
| **TanStack Query** | Server state management |
| **Framer Motion** | Animation library |
| **Firebase Auth** | User authentication |
| **Stripe.js** | Payment processing |
| **Axios** | HTTP client |
| **React Hook Form** | Form validation |
| **Recharts** | Data visualization |
| **Swiper** | Touch slider |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **Firebase Admin** | Server-side auth verification |
| **Stripe API** | Payment gateway |
| **Multer** | File upload handling |
| **JWT** | Token-based auth |
| **CORS** | Cross-origin requests |

### Services & APIs
- **Firebase**: Authentication and hosting
- **MongoDB Atlas**: Cloud database
- **Stripe**: Payment processing
- **ImgBB**: Image hosting
- **Vercel**: Backend deployment

---


## 🔒 Security Features

- **Authentication**: Firebase Authentication with JWT tokens
- **Authorization**: Role-based access control (RBAC)
- **Data Validation**: Input sanitization and validation
- **Secure Payments**: PCI-compliant Stripe integration
- **HTTPS**: SSL encryption for all communications
- **Environment Variables**: Sensitive data protection
- **CORS**: Configured origin restrictions
- **Rate Limiting**: API request throttling
- **XSS Protection**: Input escaping and sanitization
- **SQL Injection**: MongoDB parameterized queries

---

## 📊 Performance Optimization

- **Code Splitting**: React lazy loading
- **Image Optimization**: WebP format, lazy loading
- **Caching**: React Query cache management
- **Minification**: Production build optimization
- **CDN**: Firebase hosting with CDN
- **Database Indexing**: MongoDB performance indexes
- **API Response**: Compression middleware

---

## 👥 Authors

**Farial Robama**
- GitHub: [@farial-robama](https://github.com/farial-robama)
- Frontend Repo: [TicketBari-Client](https://github.com/farial-robama/TicketBari-Client)
- Backend Repo: [TicketBari-Server](https://github.com/farial-robama/TicketBari-Server)
- Email: [Connect with me](mailto:farialrobama15@gmail.com)
- LinkedIn: [Connect with me](https://linkedin.com/in/farial-robama)

---


<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ in Bangladesh

[Report Bug](https://github.com/farial-robama/TicketBari-Client/issues) • [Request Feature](https://github.com/farial-robama/TicketBari-Client/issues)

</div>

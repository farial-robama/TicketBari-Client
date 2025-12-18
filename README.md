# TicketBari - Online Ticket Booking Platform

TicketBari is a comprehensive MERN stack ticket booking platform where users can discover and book travel tickets for Bus, Train, Launch, and Flight. The platform features three user roles (User, Vendor, Admin) with secure authentication, real-time booking management, Stripe payment integration, and interactive dashboards.

**Purpose:** The purpose of this project is to provide a centralized platform for travel ticket management. It simplifies the booking process for customers, provides vendors with tools to manage their inventory and track revenue, and gives administrators full control over platform quality and user verification.

**Live Website:** https://ticketbari-client.web.app/

## Features

### **User Authentication (Firebase)**
- Email/Password registration & login
- Google OAuth authentication
- Password validation (uppercase, lowercase, 6+ characters)
- Secure logout functionality
- Protected routes for authenticated users

### **User Dashboard**
- **User Profile**: View and manage profile information
- **My Booked Tickets**: View all bookings with status tracking (Pending, Accepted, Rejected, Paid)
- **Transaction History**: Complete payment history with transaction details
- **Real-time Countdown**: Shows time until departure for each booking
- **Stripe Payment Integration**: Secure payment processing for accepted bookings

### **Vendor Dashboard**
- **Vendor Profile**: Manage vendor information
- **Add Ticket**: Create new tickets with image upload (ImgBB)
- **My Added Tickets**: View, update, and delete tickets with verification status
- **Requested Bookings**: Accept or reject booking requests from users
- **Revenue Overview**: Interactive charts displaying total revenue, tickets sold, and tickets added

### **Admin Dashboard**
- **Admin Profile**: View admin information
- **Manage Tickets**: Approve or reject vendor-submitted tickets
- **Manage Users**: Assign roles (Admin, Vendor, Customer) and mark vendors as fraud
- **Advertise Tickets**: Feature up to 6 tickets on the homepage advertisement section

### **Home Page**
- Hero banner/slider with Swiper.js
- Advertisement section with 6 admin-selected tickets
- Latest tickets section (6-8 recently added tickets)
- Two additional custom sections (Popular Routes, Why Choose Us)

### **All Tickets Page**
- Search by From/To location
- Filter by transport type (Bus, Train, Flight, Ferry)
- Sort by price (Low to High / High to Low)
- Pagination (6 tickets per page)
- Display only admin-approved tickets

### **Ticket Details Page**
- Complete ticket information with countdown timer
- Book Now functionality with quantity selection
- Booking restrictions (departure time passed, out of stock)
- Role-based access (only customers can book)

### **Additional Features**
- **Dark/Light Mode Toggle**: Theme customization
- **Responsive Design**: Fully mobile, tablet, and desktop friendly
- **Loading States**: Spinners for data fetching
- **Error Handling**: Custom 404 page and error messages
- **Toast Notifications**: Real-time feedback for user actions
- **JWT/Firebase Token**: Secure API protection

## Technologies Used

### **Frontend**
- React.js with Vite
- JavaScript (ES6+)
- Tailwind CSS & DaisyUI
- React Router DOM
- React Query (TanStack Query)
- Framer Motion
- Firebase Authentication
- Stripe.js & React Stripe.js
- React Hook Form
- Swiper.js
- Recharts
- React Hot Toast
- Lucide React Icons
- React Icons
- Axios

### **Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- Stripe Payment Gateway
- Firebase Admin SDK
- ImgBB API (Image Upload)
- CORS & dotenv
- JWT Token Authentication

### **Deployment**
- Frontend: Firebase Hosting 
- Backend: Vercel
- Database: MongoDB Atlas

## NPM Packages Used

### Frontend
- react-router-dom: Routing and navigation.

- axios: Handling API communication.

- recharts: Mandatory interactive charts for revenue data.

- framer-motion: Smooth UI animations.

- swiper: Dynamic homepage hero sliders.

- react-hook-form: Optimized form handling.

- react-hot-toast: Real-time user notifications.

- lucide-react & react-icons: Modern iconography (including the X logo).

### Backend
- jsonwebtoken: API security and token-based auth.

- dotenv: Management of environment variables (Firebase/MongoDB keys).

- cors: Handling Cross-Origin requests.

- stripe: Server-side payment intent creation.

- mongodb: Database connectivity.

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Firebase project
- Stripe account
- ImgBB API key


## Key Features Implementation

### 1. Search & Filter (Challenge #1)
- Location-based search (From/To)
- Transport type filtering
- Real-time results update

### 2. Price Sorting (Challenge #2)
- Low to High sorting
- High to Low sorting
- Maintains filter state

### 3. JWT/Firebase Token Security (Challenge #3)
- Protected API endpoints
- Token verification middleware
- Secure user sessions

### 4. Pagination (Challenge #4)
- 6 tickets per page
- Previous/Next navigation
- Page number buttons
- Auto-reset on filter change

### 5. Dark/Light Mode (Challenge #5)
- Toggle switch in navbar
- Persistent theme storage
- Smooth transitions


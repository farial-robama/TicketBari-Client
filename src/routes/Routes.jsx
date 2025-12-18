import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import TicketsDetails from "../pages/TicketsDetails/TicketsDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/Dashboard/User/UserProfile";
import MyBookedTickets from "../pages/Dashboard/User/MyBookedTickets";
import TransactionHistory from "../pages/Dashboard/User/TransactionHistory";
import AddTicket from "../pages/Dashboard/Vendor/AddTicket";
import MyAddedTickets from "../pages/Dashboard/Vendor/MyAddedTickets";
import RequestedBookings from "../pages/Dashboard/Vendor/RequestedBookings";
import RevenueOverview from "../pages/Dashboard/Vendor/RevenueOverview";
import ManageTickets from "../pages/Dashboard/Admin/ManageTickets";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AdvertiseTickets from "../pages/Dashboard/Admin/AdvertiseTickets";
import MyProfile from "../pages/Profile/MyProfile";
import AllTickets from "../pages/AllTickets/AllTickets";
import VendorRoute from "./VendorRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
        index: true,
        element: <Home></Home>,
        },
        {
        path: 'tickets',
        element: (<PrivateRoute><AllTickets></AllTickets></PrivateRoute>)
      },
        {
        path: 'ticket/:id',
        element: (<PrivateRoute><TicketsDetails></TicketsDetails></PrivateRoute>)
      },
      { path: 'login', element: <Login /> },
  { path: 'signup', element: <SignUp /> },
   {
          path: 'profile',
          element: <MyProfile></MyProfile>
      }
     
    ]
    },

    {
      path: 'dashboard',
      element: (
         <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
      ),

      children: [
        {
          index: true,
        element: <Navigate to='profile' replace></Navigate>
        },

        // User
        {
          path: 'profile',
          element: <MyProfile></MyProfile>
      },
        {
          path: 'my-bookings',
          element: <MyBookedTickets></MyBookedTickets>
        },
        
        {
          path: 'transactions',
          element: <TransactionHistory></TransactionHistory>
        },

        // Vendor
        {
          path: 'add-tickets',
          element: <VendorRoute><AddTicket></AddTicket></VendorRoute>
        },
        {
          path: 'my-tickets',
          element: <VendorRoute><MyAddedTickets></MyAddedTickets></VendorRoute>
        },
        {
          path: 'requested-bookings',
          element: <VendorRoute><RequestedBookings></RequestedBookings></VendorRoute>
        },
        {
          path: 'revenue',
          element: <VendorRoute><RevenueOverview></RevenueOverview></VendorRoute>
        },

        // Admin
        {
          path: 'manage-tickets',
          element: <AdminRoute><ManageTickets></ManageTickets></AdminRoute>
        },
        {
          path: 'manage-users',
          element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
        },
        {
          path: 'advertise-tickets',
          element: <AdminRoute><AdvertiseTickets></AdvertiseTickets></AdminRoute>
        }
      ]
    }
    
   
])
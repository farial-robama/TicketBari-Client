import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
        {
            path: '/',
        element: <Home></Home>,
        },
         {
        path: '/plant/:id',
        element: <TicketsDetails></TicketsDetails>,
      },
        
    ]
    },
    { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
    {
      path: '/dashboard',
      element: (
         <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
      ),

      children: [
        {
          index: true,
        element: <h1>Statistiec- coming soon.</h1>
        },
        {
          path: 'profile',
          element: <UserProfile></UserProfile>
        },
        {
          path: 'my-bookings',
          element: <MyBookedTickets></MyBookedTickets>
        },
        {
          path: 'transactions',
          element: <TransactionHistory></TransactionHistory>
        },
        {
          path: 'add-tickets',
          element: <AddTicket></AddTicket>
        },
        {
          path: 'my-tickets',
          element: <MyAddedTickets></MyAddedTickets>
        },
        {
          path: 'requested-bookings',
          element: <RequestedBookings></RequestedBookings>
        },
        {
          path: 'revenue',
          element: <RevenueOverview></RevenueOverview>
        },
        {
          path: 'manage-bookings',
          element: <ManageTickets></ManageTickets>
        },
        {
          path: 'manage-users',
          element: <ManageUsers></ManageUsers>
        },
        {
          path: 'advertise-tickets',
          element: <AdvertiseTickets></AdvertiseTickets>
        }
      ]
    }
])
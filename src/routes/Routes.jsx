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
        }
      ]

    }
])
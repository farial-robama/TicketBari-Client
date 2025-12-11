import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import TicketsDetails from "../pages/TicketsDetails/TicketsDetails";
import DashboardLayout from "../layouts/DashboardLayout";

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
      path: '/',
      element: <DashboardLayout></DashboardLayout>,

    }
])
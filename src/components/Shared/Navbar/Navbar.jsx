import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import toast from "react-hot-toast";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const navLinkClass = ({ isActive }) =>
    `px-8 py-2 rounded-md font-semibold transition ${
      isActive
        ? "text-primary border-b-2 border-primary"
        : "text-gray-600 hover:text-primary"
    }`;

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("You logged out successfully!");
    } catch (err) {
      console.log("Logout failed!", err);
    }
  };

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm ">
      <div className="py-4 ">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <div className="flex">
              <img src="/logo.png" className="w-10 hidden md:block" />
              <a className="btn btn-ghost text-xl text-gray-900">TicketBari</a>
            </div>

            {/* Middle */}
            <div className="hidden md:block">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/tickets" className={navLinkClass}>
                All Tickets
              </NavLink>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </div>

            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition text-gray-900"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={
                        user && user.photoURL
                          ? user.photoURL
                          : "/placeholder.jpg"
                      }
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm text-gray-900 py-5">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>
                    <Link
                      to="/tickets"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      All Tickets
                    </Link>
                    <Link
                      to="/dashboard"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Dashboard
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          My Profile
                        </Link>
                        <div
                          onClick={handleLogout}
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </div>

                        <button
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                          className=" toggle  px-4 rounded-4xl bg-[#6E8CFB] dark:bg-[#B7E5CD] ml-3"
                        >
                          {theme === "dark" ? (
                            <FaSun></FaSun>
                          ) : (
                            <FaMoon></FaMoon>
                          )}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                        <button
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                          className=" toggle  p-2 rounded-4xl bg-[#6E8CFB] dark:bg-[#B7E5CD] ml-3"
                        >
                          {theme === "dark" ? (
                            <FaSun></FaSun>
                          ) : (
                            <FaMoon></FaMoon>
                          )}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

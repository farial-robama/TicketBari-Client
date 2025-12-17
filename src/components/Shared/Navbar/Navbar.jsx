import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Container from '../Container';
import { AiOutlineMenu } from 'react-icons/ai';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navLinkClass = ({ isActive }) => `px-3 py-2 rounded-md font-semibold transition ${isActive ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'}`

  const handleLogout = async () => {
    try {
      await logOut()
      toast.success("You logged out successfully!")
    }
    catch(err) {
      console.log("Logout failed!", err);
      
    }
  }

  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 '>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <div className='flex'>
                <img src="/logo.png" className="w-10 hidden md:block" />
                <a className="btn btn-ghost text-xl">TicketBari</a>
            </div>

            {/* Middle */}
            <div>
              <NavLink to='/' className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to='/tickets' className={navLinkClass}>
                All Tickets
              </NavLink>
              <NavLink to='/dashboard' className={navLinkClass}>
                Dashboard
              </NavLink>
            </div>

            
            {/* Dropdown Menu */}
            <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <div className='hidden md:block'>
                    {/* Avatar */}
                    <img
                      className='rounded-full'
                      referrerPolicy='no-referrer'
                      src={user && user.photoURL ? user.photoURL : '/placeholder.jpg'}
                      alt='profile'
                      height='30'
                      width='30'
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/profile'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          My Profile
                        </Link>
                        <div
                          onClick={handleLogout}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
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
  )
}

export default Navbar

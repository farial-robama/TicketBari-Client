import React, { useEffect } from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const MyProfile = () => {
    const [user, setUser] = useState(null)
    const[isLoading, setIsLoading] = useState(true)
    const axiosSecure = useAxiosSecure()
console.log('user',user)
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axiosSecure.get('/user/profile');
                console.log('profile.', data)
                setUser(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching profile:', error)
                setIsLoading(false)
            }
        }
        fetchProfile();
    }, [axiosSecure]);

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    const getRoleConfig = (role) => {
        const configs = {
            admin: {
                title: 'Admin Profile',
                badgeColor: 'bg-purple-200 text-purple-800',
                headerColor: 'text-purple-600'
            },
            vendor: {
                title: 'Vendor Profile',
                badgeColor: 'bg-green-200 text-green-800',
                headerColor: 'text-green-600'
            },
            user: {
                title: 'User Profile',
                badgeColor: 'bg-blue-200 text-blue-800',
                headerColor: 'text-blue-400'
            }
        }
        return configs[role] || configs.user;
        
    }

    const roleConfig = getRoleConfig(user?.role);

    return (
         <div className='max-w-2xl mx-auto my-15 text-gray-800'>
            <h1 className={`text-2xl font-bold mb-6 text-center ${roleConfig.headerColor}`}>{roleConfig.title}</h1>

            <div className='bg-white shadow-lg rounded-lg p-8'>
                <div className='flex flex-col items-center mb-6'>
                    <img src={user?.image || "/default-profile.png"} 
                    alt="Profile" 
                    className='w-32 h-32 rounded-full object-cover' />
                    <h2 className='text-2xl font-semibold'>{user?.name || "User"}</h2>
                    <span className={`${roleConfig.badgeColor} px-3 py-1 rounded-full text-sm font-semibold mt-2`}>{user?.role?.toUpperCase()}</span>
                </div>

                <div className='space-y-4'>
                    <div className='border-b pb-3'>
                        <label className='text-gray-600 font-medium text-sm'>Email:</label>
                        <p className='text-lg'>{user?.email}</p>
                    </div>
                    <div className='border-b pb-3'>
                        <label className='text-gray-600 font-medium text-sm'>Role:</label>
                        <p className='text-lg'>{user?.role}</p>
                    </div>
                    <div className='border-b pb-3'>
                        <label className='text-gray-600 font-medium text-sm'>Member Since:</label>
                        <p className='text-lg'>
                            {new Date(user?.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                            </p>
                    </div>
                    <div className='border-b pb-3'>
                        <label className='text-gray-600 font-medium text-sm'>Last Login:</label>
                        <p className='text-lg'>
                            {new Date(user?.last_loggedIn).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                            </p>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default MyProfile;
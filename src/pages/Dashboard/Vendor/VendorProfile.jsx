import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const VendorProfile = () => {
     const axiosSecure = useAxiosSecure()

    const { data: user, isLoading } = useQuery({
        queryKey: ['verdor-profile'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/user/profile')
            return data
        }
    })

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
       <div className='max-w-2xl mx-auto'>
            <h1>Vendor Profile</h1>

            <div className='bg-white shadow-lg rounded-lg p-8'>
                <div className='flex flex-col items-center mb-6'>
                    <img src={user?.photoURL || "/default-profile.png"} 
                    alt="Profile" 
                    className='w-32 h-32 rounded-full object-cover' />
                    <h2 className='text-2xl font-semibold'>{user?.name || "Vendor"}</h2>
                    <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mt-2'>{user?.role?.toUpperCase()}</span>
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

export default VendorProfile;
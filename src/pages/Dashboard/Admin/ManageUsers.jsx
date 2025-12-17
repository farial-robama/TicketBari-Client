import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [processing, setProcessing] = useState(null)
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin/users')
      return data
    }
  })
  
  const handleRoleChange = async (email, role) => {
    if(!window.confirm(`Change user role to ${role}?`)) return;

            try {
                setProcessing(email)
            await axiosSecure.patch(`/admin/users/${email}/role`, { role })
            toast.success(`User role changed to ${role}`)
            refetch()
            } catch (error) {
            console.error(error)
            toast.error('Failed to change user role')
        } finally {
            setProcessing(null)
        }
        }

         const handleMarkFraud = async (email) => {
    if(!window.confirm('Mark this vendor as fraud? All their tickets will be hidden.')) return;

            try {
                setProcessing(email)
            await axiosSecure.patch(`/admin/users/${email}/fraud`)
            toast.success('Vendor marked as fraud')
            refetch()
            } catch (error) {
            console.error(error)
            toast.error('Failed to mark as fraud')
        } finally {
            setProcessing(null)
        }
        }

  if (isLoading) return <LoadingSpinner></LoadingSpinner>

  return (
    <div>
            <h1 className='text-3xl font-bold mb-8'>Manage Users</h1>

            {user.length === 0 ? (
                <div className='text-center py-12'>
                    <p className='text-xl text-gray-500'>No users found</p>
                </div>
            ) : (
                <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gradient-to-r from-green-600 to-green-700'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Name
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Email
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Role
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Status
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-300'>
                                {users.map((user, index) => (
                                    <tr key={user._id} className={`hover:bg-green-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {user.name}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {user.email}
                                        </td>
                                        
                                        <td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                              user.role === 'admin' ? 'bg-red-100 text-red-800' : 
                                              user.role === 'vendor' ? 'bg-green-100 text-green-800' : 
                                              'bg-blue-100 text-blue-800'
                                            }`}>
                                              {user.role}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {
                                                user.isFraud ? (
                                                  <span className='bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase'>
                                                    FRAUD
                                                  </span>
                                                ) : (
                                                  <span className='text-green-600 font-semibold'>Active</span>
                                                )
                                            }
                                                                             
                                        </td>
                                        <td className='px-6 py-4 text-sm'>
                                            
                                                <div className='flex flex-col gap-2'>
                                                  <div className='flex gap-2'>
                                                  {user.role !== 'admin' && (
                                                    <button
                                                    onClick={() => handleRoleChange(user.email, 'admin')}
                                                    disabled={processing === user.email}
                                                    className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                                                    >
                                                        Make Admin
                                                    </button>
                                                  )}

                                                  {user.role !== 'vendor' && (
                                                    <button
                                                    onClick={() => handleRoleChange(user.email, 'vendor')}
                                                    disabled={processing === user.email}
                                                    className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                                                    >
                                                        Make Vendor
                                                    </button>
                                                  )}
                                                </div>

                                                {user.role !== 'vendor' && !user.isFraud && (
                                                    <button
                                                    onClick={() => handleMarkFraud(user.email)}
                                                    disabled={processing === user.email}
                                                    className='bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                                                    >
                                                        Make as Fraud
                                                    </button>
                                                  )}
                                                </div>                                              
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
   
  )
}

export default ManageUsers;

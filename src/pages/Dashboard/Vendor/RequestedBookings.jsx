import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';

const RequestedBookings = () => {

    const axiosSecure = useAxiosSecure()
    const[processing, setProcessing] = useState(null)

     const { data: bookings = [], isLoading, refetch } = useQuery({
        queryKey: ['vendor-bookings'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/vendor/bookings')
            return data
        }
    })

    const handleStatusUpdate = async (bookingId, status) => {
        try {
            setProcessing(bookingId)
            await axiosSecure.patch(`/bookings/${bookingId}/status`, { status })
            toast.success(`Booking ${status} successfully`)
            refetch()
        } catch (error) {
            console.error(error)
            toast.error('Failed to update booking status')
        } finally {
            setProcessing(null)
        }
    }

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <h1 className='text-3xl font-bold mb-8'>Requested Bookings</h1>

            {bookings.length === 0 ? (
                <div className='text-center py-12'>
                    <p className='text-xl text-gray-500'>No booking requests yet</p>
                </div>
            ) : (
                <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gradient-to-r from-green-600 to-green-700'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        User Email
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Ticket Title
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Quantity
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Total Price
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Status
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={booking._id} className={`hover:bg-green-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {booking.userEmail}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {booking.ticketTitle}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {booking.quantity}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {booking.totalPrice}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                                                booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                               'bg-blue-100 text-blue-800'
                                            }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td>
                                            {booking.status === 'pending' ? (
                                                <div>
                                                    <button
                                                    onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                                                    disabled={processing === booking._id}
                                                    className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                                                    >
                                                        Accept
                                                    </button>
                                                    <button
                                                    onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                                                    disabled={processing === booking._id}
                                                    className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className='text-gray-500 italic'>No action needed</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestedBookings;
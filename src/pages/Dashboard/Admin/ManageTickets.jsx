
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';

const ManageTickets = () => {
     const axiosSecure = useAxiosSecure()
     const [processing, setProcessing] = useState(null)
    
         const { data: tickets = [], isLoading, refetch } = useQuery({
            queryKey: ['admin-tickets'],
            queryFn: async () => {
                const { data } = await axiosSecure.get('/admin/tickets')
                return data
            }
        })

        const handleVerification = async (ticketId, status) => {
            try {
                setProcessing(ticketId)
            await axiosSecure.patch(`/admin/tickets/${ticketId}/verify`, { 
                verificationStatus: status 
            })
            toast.success(`Ticket ${status} successfully`)
            refetch()
            } catch (error) {
            console.error(error)
            toast.error('Failed to update ticket status')
        } finally {
            setProcessing(null)
        }
        }

        if(isLoading) return <LoadingSpinner></LoadingSpinner>
    
    return (
        <div className='text-gray-800 my-15'>
            <h1 className='text-3xl font-bold mb-8'>Manage Tickets</h1>

            {tickets.length === 0 ? (
                <div className='text-center py-12'>
                    <p className='text-xl text-gray-500'>No tickets to manage</p>
                </div>
            ) : (
                <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gradient-to-r from-green-600 to-green-700'>
                                <tr>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Title
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Vendor
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Route
                                    </th>
                                    <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                        Price
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
                                {tickets.map((ticket, index) => (
                                    <tr key={ticket._id} className={`hover:bg-green-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {ticket.title}
                                        </td>
                                        
                                        <td className='px-6 py-4  text-sm text-gray-900'>
                                            <div>
                                                <p className='font-medium'>{ticket.vendorName}</p>
                                                <p className='text-xs text-gray-500'>{ticket.vendorEmail}</p>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4  text-sm text-gray-900'>
                                            {ticket.from} - {ticket.to}
                                        </td>
                                        <td className='px-6 py-4  text-sm font-bold text-green-600'>
                                            {ticket.price}
                                        </td>
                                        <td className='px-6 py-4 '>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                                ticket.verificationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                ticket.verificationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                                                'bg-red-100 text-red-800'
                                            }`}
                                            >
                                                {ticket.verificationStatus}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4  text-sm'>
                                            {ticket.verificationStatus === 'pending' ? (
                                                <div className='flex gap-2'>
                                                    <button
                                                    onClick={() => handleVerification(ticket._id, 'approved')}
                                                    disabled={processing === ticket._id}
                                                    className='bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                                                    >
                                                        Approved
                                                    </button>
                                                    <button
                                                    onClick={() => handleVerification(ticket._id, 'rejected')}
                                                    disabled={processing === ticket._id}
                                                    className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed'
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className='text-gray-500 italic'>
                                                    {ticket.verificationStatus === 'approved' ? 'Approved' : 'Rejected'}
                                                </span>
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

export default ManageTickets;
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const AdvertiseTickets = () => {
    const axiosSecure = useAxiosSecure()
    const [processing, setProcessing] = useState(null)
    
         const { data: tickets = [], isLoading, refetch } = useQuery({
            queryKey: ['appoved-tickets'],
            queryFn: async () => {
                const { data } = await axiosSecure.get('/admin/tickets')
                return data.filter(ticket => ticket.verificationStatus === 'approved')
            }
        })

        const handleToggleAdvertise = async (ticketId, currentStatus) => {
            try {
                setProcessing(ticketId)
                const { data } = await axiosSecure.patch(`/admin/tickets/advertise/${ticketId}`)
                if (data.message === 'Max 6 advertised') {
                    toast.error('Cannot advertise more than 6 tickets at a time')
                } else {
                   toast.success(data.isAdvertised ? 'Ticket advertised' : 'Ticket unadvertised')
                   refetch() 
                }
            } catch (error) {
                console.error(error)
                if (error.response?.data?.message === 'Max 6 advertised') {
                    toast.error('Cannot advertise more than 6 tickets')
                } else {
                    toast.error('Failed to toggle advertise status')
                }
            } finally {
                setProcessing(null)
            }
        }

        const advertisedCount = tickets.filter(t => t.isAdvertised).length

        if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <div className='flex justify-between items-center mb-8'>
                <h1 className='text-3xl font-bold'>Advertise Tickets</h1>
                <div className='text-right'>
                    <p className='text-sm text-gray-600'>Advertise Tickets</p>
                    <p className='text-3xl font-bold text-blue-600'>{advertisedCount}/6</p>
                </div>

                {tickets.length === 0 ? (
                    <div className='text-center py-12'>
                        <p className='text-xl text-gray-500'>No approved tickets available</p>
                    </div>

                ) : (
                    <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                        <div className='overflow-auto'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gradient-to-r from-blue-600 to-blue-700'>
                                    <tr>
                                        <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                            Title
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                            Route
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                            Price
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                            Vendor
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                            Advertise
                                        </th>
                                        <th className='px-6 py-4 text-left text-xs font-bold text-white uppercase'>
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tickets.map((ticket, index) => (
                                        <tr
                                        key={ticket._id}
                                        className={`hover:bg-blue-50 transition-colors ${
                                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                        }`}
                                        >
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {ticket.title}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {ticket.from} - {ticket.to}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {ticket.price}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                                {ticket.vendorName}
                                            </td>
                                            <td>
                                                {ticket.isAdvertised ? (
                                                    <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold'>
                                                        YES
                                                    </span>
                                                ) : (
                                                    <span className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-bold'>
                                                        NO
                                                    </span>
                                                )}
                                            </td>
                                            <td className='px-6 py-4 whitespace-nowrap text-sm'>
                                                <button
                                                onClick={() => handleToggleAdvertise(ticket._id, ticket.isAdvertised)}
                                                disabled={processing === ticket._id}
                                                className={`px-4 py-2 rounded font-semibold transition disabled:bg-gray-400 ${ticket.isAdvertised ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                                                >
                                                    {ticket.isAdvertised ? 'Unadvertise' : 'Advertise'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvertiseTickets;
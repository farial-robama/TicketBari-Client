import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';

const AllTickets = () => {
     const { data: tickets = [], isLoading } = useQuery({
        queryKey: ['all-tickets'],
        queryFn: async () => {
            const { data } = await useAxiosSecure.get('/user/transactions')
            return data
        }
    })

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className='container mx-auto px-4 py-16'>
            <div className='text-center mb-12'>
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>All Available Tickets</h1>
                <p className='text-gray-600 text-lg'>Browse through {tickets.length} available tickets</p>
            </div>

            {tickets.length === 0 ? (
                <div className='text-center py-12'>
                    <p className='text-center text-gray-500'>No tickets available at the moment.</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {tickets.map((ticket) => (
                        <TicketCard key={ticket._id} ticket={ticket}></TicketCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AllTickets;
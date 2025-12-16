import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { useQuery } from '@tanstack/react-query';

const MyAddedTickets = () => {
    const axiosSecure = useAxiosSecure()

     const { data: tickets = [], isLoading, refetch } = useQuery({
        queryKey: ['vendor-tickets'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/vendor/tickets')
            return data
        }
    })

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold'>My Added Tickets</h1>
            <div className='text-right'>
                <p className='text-sm text-gray-600'>Total Tickets</p>
                <p className='text-3xl font-bold text-green-600'>{tickets.length}</p>
            </div>
        </div>

        {tickets.length === 0 ? (
            <div className='text-center py-12'>
                <p className='text-xl text-gray-500'>No tickets added</p>
                <p className='text-gray-400 mt-2'>Start by adding your first ticket!</p>
            </div>
        ) : (
            <div>
                {tickets.map((ticket) => (
                    <TicketCard key={ticket._id} ticket={ticket} refetch={refetch}></TicketCard>
                ))}
            </div>
        )}
        </div>
    );
};

export default MyAddedTickets;
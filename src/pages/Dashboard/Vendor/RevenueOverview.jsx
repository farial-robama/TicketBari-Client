import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { FaChartLine, FaDollarSign, FaTicketAlt } from 'react-icons/fa';

const RevenueOverview = () => {
    const axiosSecure = useAxiosSecure()
    
         const { data: stats, isLoading } = useQuery({
            queryKey: ['vendor-revenue'],
            queryFn: async () => {
                const { data } = await axiosSecure.get('/vendor/revenue')
                return data
            }
        })

        if(isLoading) return <LoadingSpinner></LoadingSpinner>
    
    return (
        <div className='my-12 text-gray-900'>
            <h1 className='text-3xl font-bold mb-8'>Revenue Overview</h1>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {/* Total Revenue */}
                <div className='bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-green-100 text-sm uppercase tracking-wide'>Total Revenue</p>
                            <p className='text-4xl font-bold mt-2'>${stats?.totalRevenue || 0}</p>
                        </div>
                        <div className='bg-white bg-opacity-20 p-4 rounded-full'>
                            <FaDollarSign className='text-4xl'></FaDollarSign>
                        </div>
                    </div>
                    <p className='text-green-100 text-xs mt-4'>From all paid bookings</p>
                </div>

                {/* Total Tickets Sold */}
                <div className='bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-blue-100 text-sm uppercase tracking-wide'>tickets Sold</p>
                            <p className='text-4xl font-bold mt-2'>${stats?.totalTicketsSold || 0}</p>
                        </div>
                        <div className='bg-white bg-opacity-20 p-4 rounded-full'>
                            <FaTicketAlt className='text-4xl'></FaTicketAlt>
                        </div>
                    </div>
                    <p className='text-blue-100 text-sm mt-4'>Total units sold</p>
                </div>
                {/* Total Tickets Added */}
                <div className='bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-blue-100 text-sm uppercase tracking-wide'>Tickets Added</p>
                            <p className='text-4xl font-bold mt-2'>${stats?.totalTicketsAdded || 0}</p>
                        </div>
                        <div className='bg-white bg-opacity-20 p-4 rounded-full'>
                            <FaChartLine className='text-4xl'></FaChartLine>
                        </div>
                    </div>
                    <p className='text-blue-100 text-sm mt-4'>Total tickets created</p>
                </div>
            </div>

           {/* Additional Info */}
           <div className='mt-8 bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>Quick Stats</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='border-l-4 border-green-500 pl-4'>
                    <p></p>
                    <p> 
                       ${stats?.totalTicketsSold > 0 ? (stats.totalRevenue / stats.totalTicketsSold).toFixed(2) : '0.00'}
                    </p>
                </div>
        
            <div className='border-l-4 bordr-blue-500 pl-4'>
                <p className='text-gray-600 text-sm'>Average Units Sold per Ticket</p>
                <p className='text-2xl font-bold text-blue-600'>
                    {stats?.totalTicketsAdded > 0 ? (stats.totalTicketsSold / stats.totalTicketsAdded).toFixed(2) : '0.00'}
                </p>
            </div>
           </div>
        </div>
     </div>
    );
};

export default RevenueOverview;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TransactionHistory = () => {
    const axiosSecure = useAxiosSecure()

    const { data: transactions = [], isLoading } = useQuery({
        queryKey: ['user-transactions'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/user/transactions')
            return data
        }
    })

    if(isLoading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div>
            <h1 className='text-3xl font-bold mb-8 text-gray-800'>Transaction History</h1>

            {transactions.length === 0 ? (
                <div className='text-center py-12 bg-gray-50 rounded-lg'>
                    <svg></svg>
                    <p className='text-xl text-gray-500 mt-4'>No transaction yet</p>
                    <p className='text-gray-400 mt-2'>Your payment history will appear here</p>
                </div>
            ) : (
                <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
                    <div className='overflow-x-auto'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gradient-to-r from-blue-600 to-blue-700'>
                                <tr>
                                    <th className='px-6 text-left text-xs font-bold text-white uppercase tracking-wider'>
                                        Transaction ID
                                    </th>
                                     <th className='px-6 text-left text-xs font-bold text-white uppercase tracking-wider'>
                                        Ticket Title
                                    </th>
                                     <th className='px-6 text-left text-xs font-bold text-white uppercase tracking-wider'>
                                        Amount
                                    </th>
                                     <th className='px-6 text-left text-xs font-bold text-white uppercase tracking-wider'>
                                        Payment Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {transactions.map((transactions, index) => (
                                    <tr
                                    key={transactions._id}
                                    className={`hover:bg-blue-100 transition-colors ${
                                        index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                                    }`}
                                    >
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded'>
                                                {transactions.transactionId.substring(0,20)}...
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className='text-sm text-gray-900 font-medium'>
                                                {transactions.ticketTitle}
                                            </div>
                                        </td>
                                         <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='text-sm font-mono text-green-600 bg-green-100 px-3 py-1 rounded-full inline-block'>
                                                {transactions.amount}
                                            </div>
                                        </td>
                                        <td>
                                            {new Date(transactions.paymentDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                            <br />
                                            <span>
                                                {new Date(transaction.paymentDate).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Summary */}
                    <div className='bg-gray-50 px-6 py-4 border-t border-gray-200'>
                        <div className='flex justify-between items-center'>
                            <span className='text-sm text-gray-600'>
                                Total Transactios: <span className='font-bold text-gray-800'>{transactions.length}</span>
                            </span>
                            <span className='text-sm text-gray-600'>
                                Total Spent: <span className='font-bold text-green-600 text-lg'>
                                    ${transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default TransactionHistory;
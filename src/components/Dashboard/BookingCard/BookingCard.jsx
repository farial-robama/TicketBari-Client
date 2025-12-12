import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const BookingCard = ( {booking, refetch} ) => {
    const axiosSecure = useAxiosSecure()
    const [countdown, setCountdown] = useState('')
    const [showPayment, setShowPayment] = useState(false)
    const [clientSecret, setClientSecret] = useState('')
    const [isExpired, setIsExpired] = useState(false)

    useEffect(() => {
        if(booking.status === 'rejected') return

        const departureDateTime = new Date(`${booking.departureDate} ${booking.departureTime
        }`)
        const timer = setInterval(() => {
            const now = new Date()
            const diff = departureDateTime - now

            if (diff <= 0) {
                setIsExpired(true)
                setCountdown('Departed')
                clearInterval(timer)
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                const seconds = Math.floor((diff % (1000 * 60)) / 1000)

                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`)
            }
        }, 1000)
        return () => clearInterval(timer)
    }, [booking.departureDate, booking.departureTime, booking.status])

    const handlePayNow = async () => {
        try {
            const { data } = await axiosSecure.post('/create-payment-intent', {
                amount: booking.totalPrice
            })
            setClientSecret(data.clientSecret)
            setShowPayment(true)
        } catch (error) {
            console.error(error)
            toast.error('Failed to initialize payment')
        }
    }

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
            paid: 'bg-blue-100 text-blue-800'
        }
        return badges[status] || 'bg-gray-100 text-gray-800'
    }
    
    return (
        <>
            <div>
            <img src={booking.ticketImage} alt={booking.ticketTitle} className='w-full h-48 object-cover'/>

            <div className='p-4'>
                <h3 className='text-xl font-bold mb-3 text-gray-800 line-clamp-2'>
                    {booking.ticketTitle}
                </h3>
                <div className='space-y-2 mb-4 text-sm'>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Quantity:</span>
                        <span className='font-semibold text-gray-600'>{booking.quantity}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Unit Price:</span>
                        <span className='font-semibold text-gray-600'>{booking.unitPrice}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Route:</span>
                        <span className='font-semibold text-gray-600'>{booking.from} - {booking.to}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-600'>Departure:</span>
                        <div className='text-right'>
                            <p className='font-semibold text-gray-800'>
                                {new Date(booking.departureDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </p>
                            <p className='text-xs text-gray-500'>{booking.departureTime}</p>
                        </div>
                    </div>
                    <div className='flex justify-between items-center pt-2'>
                        <span className='text-gray-600'>Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusBadge(booking.status)}`}>{booking.status}</span>
                    </div>
                </div>
                {/* Countdowh */}
                {booking.status !== 'rejected' && booking.status !== 'paid' && !isExpired && !isExpired && (
                    <div className='bg-linear-to-r from-blue-50 to-purple-50 p-3 rounded-lg mb-4 border border-blue-200'>
                        <p className='text-center font-semibold text-gray-700 text-sm'>Departure in: <span className='text-blue-600 font-bold'>{countdown}</span></p>
                    </div>
                )}

                {isExpired && booking.status !== 'rejected' && booking.status !== 'paid' && (
                    <div className='bg-red-100 p-3 rounded-lg mb-4 border border-red-300'>
                        <p className='text-center font-semibold text-red-600 text-sm'>
                            This ticket has departed
                        </p>
                    </div>
                )}

                {/* Pay Now Button */}
                {booking.status === 'accepted' && !isExpired && (
                    <button
                    onClick={handlePayNow}
                    className='w-full py-3'>
                        Pay Now - ${booking.totalPrice}
                    </button>
                )}

                {booking.status === 'accepted' && isExpired && (
                    <button
                    disabled
                    className='w-full py-3'>
                        Payment Expired
                    </button>
                )}

                {booking.status === 'pending' && (
                    <div className=''>
                        <p className='text-yellow-800 font-semibold text-sm'>
                            Waiting for vendor approval...
                        </p>
                    </div>
                )}

                {booking.status === 'paid' && (
                   <div>
                    <p className='text-green-800 font-semibold text-sm'>
                        Payment Complete - Ticket Confirmed!
                    </p>
                   </div>
                )}

                {booking.status === 'rejected' && (
                   <div>
                    <p className='text-red-800 font-semibold text-sm'>
                        Booking Rejected by Vendor
                    </p>
                   </div>
                )}
            </div> 
            </div>

            {/* Payment Modal */}
            {showPayment && clientSecret && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto'>
                        <div className='sticky top-0 bg-white border-b p-6 flex justify-between items-center'>
                            <h2 className='text-2xl font-bold text-gray-800'>Complete Payment</h2>
                            <button
                            onClick={() => setShowPayment(false)}
                            className='text-gray-500 hover:text-gray-700 text-3xl font-light leading-none hover:bg-gray-200 w-10 h-10 rounded-full flex items-center justify-center transition'>
                                Cancel
                            </button>
                        </div>

                        <div className='p-6'>
                            <div className='mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200'>
                                <p className='text-gray-600 text-sm mb-1'>Amount to pay:</p>
                                <p className='text-4xl font-bold text-blue-600'>${booking.totalPrice}
                                </p>
                                <p className='text-xs text-gray-500 mt-2'>
                                    For: {booking.ticketTitle}
                                </p>
                            </div>

                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <CheckoutForm
                                booking={booking}
                                clientSecret={clientSecret}
                                setShowPayment={setShowPayment}
                                refetch={refetch}></CheckoutForm>
                            </Elements>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BookingCard;
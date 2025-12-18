import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddTicket = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const [uploading, setUploading] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const onSubmit = async (data) => {
        try {
            setUploading(true)

            // Upload image to imgbb
            const formData = new FormData()
            formData.append('image', data.image[0])

            const imgbbResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                formData
            )
            const imageURL = imgbbResponse.data.data.display_url
            
            // Prepare ticket data
            const ticketData = {
                title: data.title,
                from: data.from,
                to: data.to,
                transportType: data.transportType,
                price: parseFloat(data.price),
                quantity: parseInt(data.quantity),
                departureDate: data.departureDate,
                departureTime: data.departureTime,
                perks: data.perks || [],
                image: imageURL,
                vendorName: user?.displayName || user?.name,
                vendorEmail: user?.email
            }
            // Save to database
            await axiosSecure.post('/tickets', ticketData)
            toast.success('Ticket added successfully! Waiting for admin approval.')
            reset()
            navigate('/dashboard/my-tickets')

        } catch (error) {
            console.error(error)
            toast.error('Failed to add ticket')
        } finally {
            setUploading(false)
        }
    }


    return (
        <div className='max-w-4xl mx-auto my-12 bg-white p-8 rounded-md shadow-2xl text-gray-900'>
            <h1 className='text-center text-3xl font-bold mb-8'>Add New Ticket</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                {/* Ticet Title */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Ticket Title *
                    </label>
                    <input type="text"
                    {...register('title', { required: 'Title is required' })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='e.g., Dhaka to Chittagong Bus'
                    />
                    {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>}
                </div>
                {/* From & To */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        From (Location) *
                    </label>
                    <input type="text"
                    {...register('from', { required: 'From location is required' })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='e.g., Dhaka'
                    />
                    {errors.from && <p className='text-red-500 text-sm mt-1'>{errors.from.message}</p>}
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        To (Location) *
                    </label>
                    <input type="text"
                    {...register('to', { required: 'To location is required' })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='e.g., Chittagong'
                    />
                    {errors.to && <p className='text-red-500 text-sm mt-1'>{errors.to.message}</p>}
                </div>
                </div>

                {/* Transport Type */}    
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Transport Type *
                    </label>
                   <select 
                   {...register('transportType', { required: 'Transport typ is required' })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'>
                        <option value="">Select transport type</option>
                        <option value="Bus">Bus</option>
                        <option value="Train">Train</option>
                        <option value="Flight">Flight</option>
                        <option value="Launch">Launch</option>
                    </select>
                    {errors.transportType && <p className='text-red-500 text-sm mt-1'>{errors.transportType.message}</p>}
                </div>

                 {/* Price & Quantity */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Price (per unit) *
                    </label>
                    <input type="number" step="0.01"
                    {...register('price', { required: 'Price is required', min: 1 })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='e.g., 100.00'
                    />
                    {errors.price && <p className='text-red-500 text-sm mt-1'>{errors.price.message}</p>}
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Ticket Quantity *
                    </label>
                    <input type="number"
                    {...register('quantity', { required: 'Quantity is required', min: 1 })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='e.g., 50'
                    />
                    {errors.quantity && <p className='text-red-500 text-sm mt-1'>{errors.quantity.message}</p>}
                </div>
                </div>

                 {/* Departure Date & Time */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Departure Date *
                    </label>
                    <input type="date"
                    {...register('departureDate', { required: 'Departure Date is required', min: 1 })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'/>
                    {errors.departureDate && <p className='text-red-500 text-sm mt-1'>{errors.departureDate.message}</p>}
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Departure Time *
                    </label>
                    <input type="time"
                    {...register('departureTime', { required: 'Departure Time is required', min: 1 })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent'
                    placeholder='e.g., 50'
                    />
                    {errors.departureTime && <p className='text-red-500 text-sm mt-1'>{errors.departureTime.message}</p>}
                </div>
                </div>

                {/* Perks (Checkboxes) */}
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Perks (Optional) 
                    </label>
                    <div >
                        <label className='flex items-center space-x-2'>
                            <input type="checkbox" {...register('perks')} value='AC' className='w-4 h-4' />
                            <span>AC</span>
                        </label>
                        <label className='flex items-center space-x-2'>
                            <input type="checkbox" {...register('perks')} value='Breakfast' className='w-4 h-4' />
                            <span>Breakfast</span>
                        </label>
                        <label className='flex items-center space-x-2'>
                            <input type="checkbox" {...register('perks')} value='Wifi' className='w-4 h-4' />
                            <span>Wifi</span>
                        </label>
                        <label className='flex items-center space-x-2'>
                            <input type="checkbox" {...register('perks')} value='Lunch' className='w-4 h-4' />
                            <span>Lunch</span>
                        </label>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Ticket Image *
                    </label>
                    <input type="file"
                    accept='image/*'
                    {...register('image', { required: 'Image is required' })}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500
                    block 
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-[#3B9797]
      hover:file:bg-lime-100
      bg-gray-100 bcursor-pointer
      focus:outline-none'
                    />
                    {errors.image && <p className='text-red-500 text-sm mt-1'>{errors.image.message}</p>}
                </div>

                {/* Vendor Name & Email (Read-only) */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Vendor Name
                    </label>
                    <input type="text"
                    value={user?.displayName || user?.name || ''}
                    readOnly
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100'/>
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Vendor Email
                    </label>
                    <input type="email"
                    value={user?.email || ''}
                    readOnly
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100'/>
                </div>
                </div>

                {/* Submit Button */}
                <button
                type='submit' disabled={uploading} className='w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed mt-5'>
                    {uploading ? 'Adding Ticket...' : 'Add Ticket'}
                </button>
        
            </form>
            
        </div>
    );
};

export default AddTicket;
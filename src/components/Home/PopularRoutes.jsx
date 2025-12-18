import React from 'react';

const PopularRoutes = () => {
    const routes = [
        { from: 'Dhaka', to: "Cox's Bazar", trips: 150, image: '/Dhaka-CoxsBazar.png'},
        { from: 'Sylhet', to: 'Chittagong', trips: 120, image: '/Sylhet-Chittagong.png'},
        { from: 'Dhaka', to: 'Chittagong', trips: 200, image: '/Dhaka-Chittagong.png'},
    ]
    return (
        <section className='py-10 my-10 bg-gradient-to-b from-white to-gray-100 rounded-2xl'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-12'>
                    <h2 className='text-4xl font-bold text-gray-800 mb-4'>
                        Popular Routes
                    </h2>
                    <p className='text-gray-600 text-lg'>
                        Most traveled destinations by our customers
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {routes.map((route,index) => (
                        <div key={index} className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition group cursor-pointer'>
                            <img src={route.image} alt={`${route.from} to ${route.to}`}
                            className='w-full h-64 object-cover group-hover:scale-110 transition duration-500' />
                            <div className='absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent flex flex-col justify-end p-6 text-white'>
                                <h3 className='text-2xl font-bold mb-2'>{route.from}-{route.to}</h3>
                                <p className='text-sm opacity-90'>{route.trips}+ trips available</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularRoutes;
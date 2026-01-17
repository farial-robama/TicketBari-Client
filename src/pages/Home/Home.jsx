import React from 'react';
import LatestTickets from '../../components/Home/LatestTickets';
import PopularRoutes from '../../components/Home/PopularRoutes';
import Banner from '../../components/Home/Banner';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import AdvertisedTicketsHome from '../../components/Home/AdvertisedTicketsHome';
import Features from '../../components/Home/Features';
import Statistics from '../../components/Home/Statistics';
import Testimonials from '../../components/Home/Testimonials';
import Newsletter from '../../components/Home/Newsletter';


const Home = () => {
    return (
        <div>
             <Banner></Banner>
             <AdvertisedTicketsHome></AdvertisedTicketsHome>
             <LatestTickets></LatestTickets>
             <PopularRoutes></PopularRoutes>
             <Features></Features>
             <Statistics></Statistics>
             <WhyChooseUs></WhyChooseUs>
             <Testimonials></Testimonials>
             <Newsletter></Newsletter>
        </div>
    );
};

export default Home;
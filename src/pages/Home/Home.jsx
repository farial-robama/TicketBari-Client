import React from 'react';
import LatestTickets from '../../components/Home/LatestTickets';
import PopularRoutes from '../../components/Home/PopularRoutes';
import Banner from '../../components/Home/Banner';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import AdvertisedTicketsHome from '../../components/Home/AdvertisedTicketsHome';


const Home = () => {
    return (
        <div>
             <Banner></Banner>
             <AdvertisedTicketsHome></AdvertisedTicketsHome>
             <LatestTickets></LatestTickets>
             <PopularRoutes></PopularRoutes>
             <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;
import React from 'react';
import Banner from '../../components/Shared/Banner/Banner';
import AdvertisedTickets from '../../components/Home/AdvertisedTickets';
import LatestTickets from '../../components/Home/LatestTickets';
import PopularRoutes from '../../components/Home/PopularRoutes';


const Home = () => {
    return (
        <div>
             <Banner></Banner>
             <AdvertisedTickets></AdvertisedTickets>
             <LatestTickets></LatestTickets>
             <PopularRoutes></PopularRoutes>
        </div>
    );
};

export default Home;
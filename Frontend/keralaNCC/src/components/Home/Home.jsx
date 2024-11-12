import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LatestNews from '../LatestNews/LatestNews'; // Adjust the path to where LatestNews is located
import Navbar from '../Navbar/Navbar';
import CarouselCard from '../Carousel/Carousel';
import AboutUs from '../AboutUs/AboutUs';
import Footer from '../Footer/Footer';
import EmployeeCorner from '../EmployeeCorner/EmployeeCorner';
import Admin from '../Admin/Admin';

const Home = () => {

    return (
        <>
            <Navbar />
            <CarouselCard />
            <LatestNews />
            <div id="aboutus">
            <AboutUs />
            </div>
            <div id="employee-corner">
                <EmployeeCorner />
            </div>
            <Footer />
        </>
    );
};

export default Home;

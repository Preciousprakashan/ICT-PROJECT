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
    const [data, setData] = useState([]);
    
    useEffect(() => {
        // Fetch data from the backend API
        axios.get('http://localhost:4000/data')
            .then(response => {
                console.log(response.data); // Log the data for verification
                setData(response.data); // Set the fetched data to the state
            })
            .catch(error => {
                console.error('Error fetching data:', error); // Log any errors
            });
    }, []);

    return (
        <>
            <Admin/>
            {/* <Navbar />
            <CarouselCard/>
            <LatestNews /> 
            <AboutUs /> 
            <EmployeeCorner/> 
            <Footer />   */}

            <br />


        </>
    );
};

export default Home;

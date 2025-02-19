import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";
import VisitingHoursCard from '../components/VisitingHoursCard.js';
import TicketPricesCard from '../components/TicketPricesCard.js';
import MapCard from '../components/MapCard.js';
import Navbar from '../components/Navbar.js';
import NewsCard from '../components/NewsCard.js';

function HomePage() {
    const navigate = useNavigate();
    const newsClick = () => {
        navigate('/news');
    };

    return (
        <div className="home-page">
            <Navbar/>
            <div className="home-banner"/>
            <div className="home-content">
                <div className="infoCards">
                    <VisitingHoursCard/>
                    <MapCard/>
                    <TicketPricesCard/>
                </div>
                <div className="home-welcome">
                    <h1>Welcome to Timisoara Zoological Garden!</h1>
                    <p>One of the most visited places in the city and the only one in the whole county. If you want to see everything from simple parrots to giraffes and penguins, this is the place for you.</p>
                </div>
                <div className="newsCards">
                    <div className="newsCards-header">
                        <h2>News</h2>
                        <button onClick={newsClick}>All News →</button>
                    </div>
                    <div className="newsCards-content">
                        <NewsCard title="The zoo is closed" subtitle="Sorry, covid and Fritz had other plans" date="10/03/2020"/>
                        <NewsCard title="Bee Movie is Out" subtitle="Despite its aerodynamics a bee should not be able to fly ..." date="02/11/2007"/>
                        <NewsCard title="The site is now live!" subtitle="This is a string for testing subtitle" date="19/02/2025"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
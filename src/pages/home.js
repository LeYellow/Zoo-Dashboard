import React from 'react';
import "./home.css";
import VisitingHoursCard from '../components/VisitingHoursCard.js';
import TicketPricesCard from '../components/TicketPricesCard.js';
import MapCard from '../components/MapCard.js';
import Navbar from '../components/Navbar';

function HomePage() {

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
                <p>HEllow</p>
                <p>HEllow</p>
                <p>HEllow</p>
                <p>HEllow</p>
                <p>HEllow</p>
                <p>HEllow</p>
                <p>HEllow</p>
                <p>HEllow</p>
            </div>
        </div>
    );
}

export default HomePage;
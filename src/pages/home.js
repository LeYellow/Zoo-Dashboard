import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./home.css";
import "./shared.css";
import axios from "axios";
import VisitingHoursCard from '../components/VisitingHoursCard.js';
import TicketPricesCard from '../components/TicketPricesCard.js';
import MapCard from '../components/MapCard.js';
import Navbar from '../components/Navbar.js';
import NewsCard from '../components/NewsCard.js';
import Footer from '../components/Footer.js';
import ScrollTopButton from "../components/ScrollTopButton";

function HomePage() {
    const navigate = useNavigate();
    const newsClick = () => {navigate('/news')};
    const [ cardDetails, setCardDetails ] = useState([]);

    const fetchNewsCards = async () => {
        try {
            const response = await axios.get("http://localhost/ZooDashboard/zoo_dashboard/src/backend/getNewsCardsLast.php");
            //console.log(response);    //debug
            if(Array.isArray(response.data)){
                if(response.data.length>0 && typeof response.data[0] === 'object'){
                    setCardDetails(response.data);
                }
            } else {
                console.error('News Cards: expected array but received: ', response.data);
            }
        } catch (error) {
            console.error('Error fetching Cards: ', error);
        }
    };

    useEffect(() => {
        fetchNewsCards();
        window.scrollTo({top: 0});
    }, []);

    return (
        <div className="page">
            <Navbar/>
            <div className="banner home-banner"/>
            <div className="content">
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
                        {cardDetails.slice(0).reverse().map((card,index) => (
                            <NewsCard key={index} id={card.ID} title={card.Title} subtitle={card.SubTitle} date={card.Date} img={card.Img}/>
                        ))}
                    </div>
                </div>
            </div>
            <Footer/>
            <ScrollTopButton/>
        </div>
    );
}

export default HomePage;
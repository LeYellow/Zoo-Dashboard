import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./home.css";
import axios from "axios";
import TimetableCard from '../components/InfoCardTimetable.js';
import TicketPricesCard from '../components/InfoCardTickets.js';
import ZooMapCard from '../components/InfoCardMap.js';
import LocationCard from "../components/InfoCardLocation.js";
import Navbar from '../components/Navbar.js';
import NewsCard from '../components/NewsCard.js';
import Footer from '../components/Footer.js';
import ScrollTopButton from "../components/ScrollTopButton";

function HomePage() {
    const navigate = useNavigate();
    const newsClick = () => {navigate('/news')};
    const [ cardDetails, setCardDetails ] = useState([]);
    const [phrase, setPhrase] = useState("");
    const phrases = [
            "Where Wildlife Meets Wonder!",
        "Grow Wild. Explore Together.",
        "Nature's Playground, Animal's Paradise!",
        "From Petals to Paws!",
        "A Living Tapestry of Flora and Fauna",
        "Where Nature Blooms and Wildlife Roams",
        "Discover, Learn, and Grow Wild",
        "Bringing Nature's Lessons to Life"
    ];

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
        
        let index = Math.floor(Math.random() * phrases.length);
        setPhrase(phrases[index]);
    }, []);

    return (
        <div className="home-page">
            <Navbar/>
            <div className="home-banner">
                <div className="home-banner-content">
                    <h1>{phrase}</h1>
                </div>
            </div>
            <div className="home-content">
                <div className="infoCards">
                    <div className="cards-group">
                        <TimetableCard/>
                        <TicketPricesCard/>
                    </div>
                    <div className="cards-group">
                        <ZooMapCard/>
                        <LocationCard/>
                    </div>
                </div>
                <div className="home-welcome">
                    <h1>Welcome to Timisoara Zoological Garden!</h1>
                    <p>One of the most visited places in the city and the only one in the whole country. If you want to see everything from simple parrots to giraffes and penguins, this is the place for you. We have a lot of animals, including rare ones, that are waiting for your visit. Come visit us today!</p>
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
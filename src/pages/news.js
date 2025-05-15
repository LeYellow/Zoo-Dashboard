import React, { useEffect, useState } from "react";
import "./news.css";
import "./shared.css";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollTopButton from "../components/ScrollTopButton";
import AddArticleButton from "../components/AddArticleButton";

function NewsPage() {
    const [ cardDetails, setCardDetails ] = useState([]);

    const fetchNewsCards = async () => {
        try {
            const response = await axios.get("http://localhost/ZooDashboard/zoo_dashboard/src/backend/getNewsCards.php");
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
            <div className="banner news-banner">
                <h1>Zoo News</h1>
            </div>
            <div className="content">
                <AddArticleButton/>
                <div className="news-grid">
                    {cardDetails.slice(0).reverse().map((card,index) => (
                        <NewsCard key={index} id={card.ID} title={card.Title} subtitle={card.SubTitle} date={card.Date} img={card.Img}/>
                    ))}
                </div>
            </div>
            <Footer/>
            <ScrollTopButton/>
        </div>
    );

}

export default NewsPage;
import React from "react";
import "./news.css";
import Navbar from "../components/Navbar";
import NewsCard from "../components/NewsCard";

function NewsPage() {

    return (
        <div className="news-page">
            <Navbar/>
            <div className="news-banner">
                <h1>Zoo News</h1>
            </div>
            <div className="news-content">
                <NewsCard title="The zoo is closed" subtitle="Sorry, covid and Fritz had other plans" date="10/03/2020"/>
                <NewsCard title="Bee Movie is Out" subtitle="Despite its aerodynamics a bee should not be able to fly ..." date="02/11/2007"/>
                <NewsCard title="The site is now live!" subtitle="This is a string for testing subtitle" date="19/02/2025"/>
                <NewsCard title="The site is now live!" subtitle="This is a string for testing subtitle" date="19/02/2025"/>
                <NewsCard title="The site is now live!" subtitle="This is a string for testing subtitle" date="19/02/2025"/>
            </div>
        </div>
    );

}

export default NewsPage;
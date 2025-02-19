import React from "react";
import "./NewsCard.css";

function NewsCard({title, subtitle, date}) {

    return (
        <div className="news">
            <div className="news-photo">
                <p className="news-date">{date}</p>
            </div>
            <h1 className="news-title">{title}</h1>
            <p className="news-subtitle">{subtitle}</p>
            <h6 className="news-button">Read More</h6>
        </div>
    );

}

export default NewsCard;
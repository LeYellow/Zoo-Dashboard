import React from 'react';
import './about.css';
import { useNavigate } from 'react-router-dom';

function AboutPage() {
    const navigate = useNavigate();
    const homeClick = () => {
        navigate('/home');
    };

    return (
        <div className="about-page">
            <div className="about-content">
                <div className="navbar">
                    <button className="home-btn" onClick={homeClick}>
                        Our Animals
                    </button>
                    <button className="about-btn">
                        About Us
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
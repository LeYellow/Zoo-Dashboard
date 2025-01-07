import React from 'react';
import './welcome.css';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();
    const welcomeClick = () => {
        navigate('/home');
    };

    return (
        <div className="welcome-page">
            <div className="welcome-content">
                <h1>Welcome to Timisoara's Zoo garden!</h1>
                <p>
                    We have a lot of animals, including rare ones, that are waiting for your visit. Here on this site you can view each one of them along with every information about us. Come visit us today!
                </p>
                <button className="welcome-btn" onClick={welcomeClick}>
                    Welcome
                </button>
                <button className="sign-btn">
                    continue as admin
                </button>
            </div>
        </div>
    );
}

export default WelcomePage;

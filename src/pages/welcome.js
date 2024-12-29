import React from 'react';
import './welcome.css';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/home');
        console.log('Button was clicked!');
    };

    return (
        <div className="home-container">
            <div className="content">
                <h1>Welcome to the jungle</h1>
                <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
                    Welcome
                </button>
            </div>
        </div>
    );
}

export default WelcomePage;

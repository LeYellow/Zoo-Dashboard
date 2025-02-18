import React from 'react';
import './welcome.css';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
    const navigate = useNavigate();
    const welcomeClick = () => {
        navigate('/home');
    };

    return (
        <div className="welcome-page">
            <div className="welcome-content">
                <h1>Welcome to Timisoara's Zoological Garden!</h1>
                <p>
                    We have a lot of animals, including rare ones, that are waiting for your visit. Here on this site you can view each one of them along with every information about us. Come visit us today!
                </p>
                <TrendingFlatIcon className="welcome-btn" onClick={welcomeClick}
                    sx = {{
                        width: '70px', 
                        marginTop: '10px', 
                        fontSize: '30px', 
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': { 
                            color: '#1B4D3E',
                            backgroundColor: 'white', 
                            cursor: 'pointer', 
                            fontSize: '40px', 
                            borderRadius: '10px'
                        } 
                    }}
                />
            </div>
            <button className="login-btn">
                admin
            </button>
        </div>
    );
}

export default WelcomePage;

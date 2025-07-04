import React from 'react';
import "./InfoCards.css";
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';

function ZooMapCard() {
    const navigate = useNavigate();
    const mapClick = () => {
        navigate('/map');
    };

    return (
        <div className="card-body">
            <h2 className="card-title"><PetsIcon/> Zoo layout</h2>
            <div className="card-content">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6H12.01M9 20L3 17V4L5 5M9 20L15 17M9 20V14M15 17L21 20V7L19 6M15 17V14M15 6.2C15 7.96731 13.5 9.4 12 11C10.5 9.4 9 7.96731 9 6.2C9 4.43269 10.3431 3 12 3C13.6569 3 15 4.43269 15 6.2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            <p className="card-redirect" onClick={mapClick}>Zoo Map →</p>
        </div>
    );
}

export default ZooMapCard;
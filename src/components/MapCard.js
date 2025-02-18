import React from 'react';
import "./MapCard.css";
import map from "../resources/map.png";
import { useNavigate } from 'react-router-dom';

function MapCard() {
    const navigate = useNavigate();
    const mapClick = () => {
        navigate('/map');
    };

    return (
        <div className="map">
            <img src={map} alt="map"/>
            <p onClick={mapClick}>Find Us →</p>
        </div>
    );
}

export default MapCard;
import React from 'react';
import "./map.css";
import "./shared.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ZooMap from '../components/ZooMap';

function MapPage() {
    
    return (
        <div className="page">
            <Navbar/>
                <div className="banner location-banner">
                    <h1>Zoo Map</h1>
                </div>
                <div className="content">
                    <ZooMap/>
                </div>
            <Footer/>
        </div>
    );
}

export default MapPage;
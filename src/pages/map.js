import React, { useState} from 'react';
import "./map.css";
import "./shared.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ZooMap from '../components/ZooMap';
import PinInfo from '../components/PinInfo';

function MapPage() {
    const [selectedPin, setSelectedPin] = useState(null);

    const extractPinID = (id) => {
        console.log("pin id from map", id);    //debug
        setSelectedPin(id);
    }

    return (
        <div className="page">
            <Navbar/>
                <div className="banner location-banner">
                    <h1>Zoo Map</h1>
                </div>
                <div className="content">
                    <ZooMap onPinClick={extractPinID}/>
                    <PinInfo pinId={selectedPin}/>
                </div>
            <Footer/>
        </div>
    );
}

export default MapPage;
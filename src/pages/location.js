import React, {useEffect} from 'react';
import './location.css';
import "./shared.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollTopButton from "../components/ScrollTopButton";
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';

function LocationPage() {

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <div className="page">
            <Navbar/>
            <div className="banner location-banner"/>
            <div className="content location-content">
                <h1 className="divider">How to get here</h1>
                <iframe className="location-map" title="map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1715.5107150342203!2d21.2669931!3d45.7812742!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745671c762e0969%3A0x4f2b7c28aeecc23b!2sTimi%C8%99oara%20Zoo!5e1!3m2!1sro!2sro!4v1747658628938!5m2!1sro!2sro"  
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade"/>
                <h1 className="divider">Visit by Car</h1>
                <p className="text-block-location">
                    Accesul Gradinii Zoo se face prin intrarea localizata pe strada Avram Imbroane. Parcarea este gratuita realizandu-se prin parcarea de a lungul strazii Avram Imbroane, sau in putinele locuri amenajate in fata intrarii. 
                </p>
                <h1 className="divider">Visit by Public Transit</h1>
                <p className="text-block-location">
                    Accesul cu transportul comun se face prin mediile de transport STPT oferite de Primaria Timisoara. Pretul unui bilet este 4 lei. Urmatoarele linii sunt disponibile:
                </p>
                <p className="transport-line"><b>E4</b> - statia Muzeul Satului Banatean</p>
                <p className="transport-line"><b>15</b> - statia Strada Macin</p>
                <p className="transport-line"><b>S10</b> - statia Gradina Zoo Timisoara</p>
                <h1 className="divider">Contact Us</h1>
                <div className="contact-block">
                    <div className="contact-details">
                        <p>Call us for more:</p>
                        <h2><CallIcon/>0356004152</h2>
                    </div>
                    <h3>or</h3>
                    <div className="contact-details">
                        <p>Email us for more:</p>
                        <h2><MailIcon/>ZooTimisoara@gmail.com</h2>
                    </div>
                </div>
            </div>
            <Footer/>
            <ScrollTopButton/>
        </div>
    );
}

export default LocationPage;
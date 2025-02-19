import React from 'react';
import "./Navbar.css";
import logo from "../resources/logo.png";
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const homeClick = () => {
        navigate('/home');
    };
    const animalsClick = () => {
        navigate('/animals');
    };
    const aboutClick = () => {
        navigate('/about');
    };

    return (
        <div className="navbar-body">
            <img src={logo} alt="zoo" onClick={homeClick}/>
            <p>Timisoara Zoological Garden</p>
            <div className="nav-buttons">
                <button className="home-btn" onClick={homeClick}>
                    Home
                </button>
                <button className="animals-btn" onClick={animalsClick}>
                    Our Animals
                </button>
                <button className="about-btn" onClick={aboutClick}>
                    About Us
                </button>
            </div>
        </div>
    );
}

export default Navbar;
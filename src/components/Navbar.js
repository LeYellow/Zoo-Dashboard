import React, { useContext } from 'react';
import "./Navbar.css";
import logo from "../resources/logo.png";
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';

function Navbar() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const homeClick = () => {
        navigate('/');
    };
    const animalsClick = () => {
        navigate('/animals');
    };
    const aboutClick = () => {
        navigate('/about');
    };
    const logoutClick = () => {
        setAuth("");
    }

    return (
        <div className="navbar-body" style={auth?.Username ? {backgroundColor: 'red'} : {}}>
            <img src={logo} alt="zoo" onClick={homeClick}/>
            {auth?.Username ? (
                <p>Keeper mode : {auth?.Username}</p>
            ) : (
                <p>Timisoara Zoological Garden</p>
            )}
            <div className="navbar-buttons">
                <button className="navbar-buttons-element home-btn" onClick={homeClick}>
                    Home
                </button>
                <button className="navbar-buttons-element animals-btn" onClick={animalsClick}>
                    Our Animals
                </button>
                <button className="navbar-buttons-element about-btn" onClick={aboutClick}>
                    About Us
                </button>
                {auth?.Username && (
                    <button className="navbar-buttons-element logout-btn" onClick={logoutClick}>
                        Log Out
                    </button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
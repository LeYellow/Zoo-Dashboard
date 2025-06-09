import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Footer.css";
import logo from "../resources/logo.png";
import ptm from "../resources/primariaTM.jpg";
import upt from "../resources/upt.jpg";
import CallIcon from '@mui/icons-material/Call';
import MailIcon from '@mui/icons-material/Mail';
import PlaceIcon from '@mui/icons-material/Place';
import Login from "./Login";

function Footer() {
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
    const mapClick = () => {
        navigate('/map');
    };
    const newsClick = () => {
        navigate('/news');
    };
    
    return(
        <div className="footer-body">
            <div className="col1">
                <img src={logo} alt="zoo"/>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1536" width='1em' height='1em'>
                        <path fill="currentColor" d="M1248 0q119 0 203.5 84.5T1536 288v960q0 119-84.5 203.5T1248 1536h-188V941h199l30-232h-229V561q0-56 23.5-84t91.5-28l122-1V241q-63-9-178-9q-136 0-217.5 80T820 538v171H620v232h200v595H288q-119 0-203.5-84.5T0 1248V288Q0 169 84.5 84.5T288 0z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width='1em' height='1em'>
                        <path fill="currentColor" d="M16 12a4 4 0 1 0-1.172 2.829A3.84 3.84 0 0 0 16 12.06l-.001-.063zm2.16 0a6.135 6.135 0 1 1-1.797-4.359a5.92 5.92 0 0 1 1.798 4.256l-.001.109zm1.687-6.406v.002a1.44 1.44 0 1 1-.422-1.018c.256.251.415.601.415.988v.029v-.001zm-7.84-3.44l-1.195-.008q-1.086-.008-1.649 0t-1.508.047c-.585.02-1.14.078-1.683.17l.073-.01c-.425.07-.802.17-1.163.303l.043-.014a4.12 4.12 0 0 0-2.272 2.254l-.01.027a6 6 0 0 0-.284 1.083l-.005.037a12 12 0 0 0-.159 1.589l-.001.021q-.039.946-.047 1.508t0 1.649t.008 1.195t-.008 1.195t0 1.649t.047 1.508c.02.585.078 1.14.17 1.683l-.01-.073c.07.425.17.802.303 1.163l-.014-.043a4.12 4.12 0 0 0 2.254 2.272l.027.01c.318.119.695.219 1.083.284l.037.005c.469.082 1.024.14 1.588.159l.021.001q.946.039 1.508.047t1.649 0l1.188-.024l1.195.008q1.086.008 1.649 0t1.508-.047c.585-.02 1.14-.078 1.683-.17l-.073.01c.425-.07.802-.17 1.163-.303l-.043.014a4.12 4.12 0 0 0 2.272-2.254l.01-.027c.119-.318.219-.695.284-1.083l.005-.037c.082-.469.14-1.024.159-1.588l.001-.021q.039-.946.047-1.508t0-1.649t-.008-1.195t.008-1.195t0-1.649t-.047-1.508c-.02-.585-.078-1.14-.17-1.683l.01.073a6.3 6.3 0 0 0-.303-1.163l.014.043a4.12 4.12 0 0 0-2.254-2.272l-.027-.01a6 6 0 0 0-1.083-.284l-.037-.005a12 12 0 0 0-1.588-.159l-.021-.001q-.946-.039-1.508-.047t-1.649 0zM24 12q0 3.578-.08 4.953a6.64 6.64 0 0 1-6.985 6.968l.016.001q-1.375.08-4.953.08t-4.953-.08a6.64 6.64 0 0 1-6.968-6.985l-.001.016q-.08-1.375-.08-4.953t.08-4.953A6.64 6.64 0 0 1 7.061.079L7.045.078q1.375-.08 4.953-.08t4.953.08a6.64 6.64 0 0 1 6.968 6.985l.001-.016Q24 8.421 24 12"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width='1em' height='1em'>
                        <path fill="currentColor" d="M196.064.25C88.347.25.187 88.408.187 196.127v607.841c0 107.717 88.158 195.845 195.877 195.845h607.841c107.718 0 195.845-88.127 195.845-195.845V196.127C999.75 88.41 911.623.25 803.905.25zm49.266 164.948c51.648 0 83.461 33.906 84.443 78.475c0 43.585-32.797 78.444-85.442 78.444h-.969c-50.665 0-83.412-34.857-83.412-78.444c0-44.568 33.738-78.475 85.379-78.475zm445.08 208.31c99.329 0 173.79 64.922 173.79 204.436v260.449H713.247V595.406c0-61.06-21.847-102.718-76.476-102.718c-41.704 0-66.562 28.078-77.476 55.202c-3.987 9.704-4.967 23.257-4.967 36.832v253.671H403.375s1.981-411.613 0-454.233h150.984v64.324c20.06-30.95 55.942-74.977 136.051-74.977zm-521.556 10.685h150.953v454.202H168.854z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1536 1536" width='1em' height='1em'>
                        <path fill="currentColor" d="M919 1175v-157q0-50-29-50q-17 0-33 16v224q16 16 33 16q29 0 29-49m184-122h66v-34q0-51-33-51t-33 51zM532 787v70h-80v423h-74V857h-78v-70zm201 126v367h-67v-40q-39 45-76 45q-33 0-42-28q-6-17-6-54V913h66v270q0 24 1 26q1 15 15 15q20 0 42-31V913zm252 111v146q0 52-7 73q-12 42-53 42q-35 0-68-41v36h-67V787h67v161q32-40 68-40q41 0 53 42q7 21 7 74m251 129v9q0 29-2 43q-3 22-15 40q-27 40-80 40q-52 0-81-38q-21-27-21-86v-129q0-59 20-86q29-38 80-38t78 38q21 29 21 86v76h-133v65q0 51 34 51q24 0 30-26q0-1 .5-7t.5-16.5V1153zM785 329v156q0 51-32 51t-32-51V329q0-52 32-52t32 52m533 713q0-177-19-260q-10-44-43-73.5t-76-34.5q-136-15-412-15q-275 0-411 15q-44 5-76.5 34.5T238 782q-20 87-20 260q0 176 20 260q10 43 42.5 73t75.5 35q137 15 412 15t412-15q43-5 75.5-35t42.5-73q20-84 20-260M563 391l90-296h-75l-51 195l-53-195h-78q7 23 23 69l24 69q35 103 46 158v201h74zm289 81V342q0-58-21-87q-29-38-78-38q-51 0-78 38q-21 29-21 87v130q0 58 21 87q27 38 78 38q49 0 78-38q21-27 21-87m181 120h67V222h-67v283q-22 31-42 31q-15 0-16-16q-1-2-1-26V222h-67v293q0 37 6 55q11 27 43 27q36 0 77-45zm503-304v960q0 119-84.5 203.5T1248 1536H288q-119 0-203.5-84.5T0 1248V288Q0 169 84.5 84.5T288 0h960q119 0 203.5 84.5T1536 288"/>
                    </svg>
                </div>
            </div>
            <div className="col2">
                <h1>Menu</h1>
                <h6 onClick={homeClick}>Home</h6>
                <h6 onClick={animalsClick}>Our Animals</h6>
                <h6 onClick={aboutClick}>About Us</h6>
                <h6 onClick={mapClick}>Map</h6>
                <h6 onClick={newsClick}>News</h6>
            </div>
            <div className="col3">
                <h1>Contact</h1>
                <h5><CallIcon/> 0356004152</h5>
                <h5><MailIcon/> ZooTimisoara@gmail.com</h5>
                <a href="https://maps.app.goo.gl/hytATxoV9uvW5euC7" target="_blank" rel="noreferrer">
                    <PlaceIcon/> Strada Avram Imbroane
                </a>
            </div>
            <div className="col4">
                <h1>Policies</h1>
                <h6>Cookies</h6>
                <h6>Legal Notice</h6>
                <h6>Privacy Policy</h6>
                <h6>Terms and Conditions</h6>
                <Login/>
            </div>
            <div className="col5">
                <h1>Partners</h1>
                <img src={ptm} alt="primaria Timisoara"/>
                <img src={upt} alt="Univesitatea Politehnica Timisoara"/>
            </div>
        </div>
    );
}

export default Footer;
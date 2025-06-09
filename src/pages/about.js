import React, {useEffect} from 'react';
import './about.css';
import "./shared.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollTopButton from "../components/ScrollTopButton";

function AboutPage() {

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <div className="page">
            <Navbar/>
            <div className="banner about-banner"/>
            <div className="content about-content">
                <h1 className="divider">Our Zoo's History</h1>
                <div className="text-block-about">
                    <p>Grădina Zoologică din Timișoara, situată în inima Pădurii Verzi, a fost inaugurată în 1986 ca un spațiu dedicat faunei locale. În perioada 2004-2007, prin proiectul „CarpatZoo” în parteneriat cu grădina zoologică din Szeged și cu sprijinul fondurilor europene, grădina a fost modernizată conform standardelor UE. Au fost amenajate 16 habitate care adăposteau 29 de specii și 144 de animale, inclusiv specii exotice precum lei, canguri și zebre.</p>
                    <p>În noiembrie 2020, grădina a fost închisă din cauza condițiilor necorespunzătoare pentru animale, culminând cu moartea unui pui de cerb bolnav. Peste 260 de animale au fost relocate, iar autoritățile au anunțat intenția de a redeschide grădina ca un spațiu dedicat exclusiv faunei autohtone, fără animale exotice .</p>
                </div>
                <div className="timeline">
                    <div className="timeline-p">
                        <b><i>1986</i></b>
                        <p>Inaugurarea grădinii zoologice în Pădurea Verde, cu 30 de specii autohtone</p>
                    </div>
                    <div className="timeline-p">
                        <b><i>2004-2007</i></b>
                        <p>Modernizare prin proiectul „CarpatZoo”, introducerea de specii exotice și amenajarea a 16 habitate</p>
                    </div>
                    <div className="timeline-p">
                        <b><i>2007</i></b>
                        <p>Includerea a 29 de specii, printre care lei, canguri, zebre și cerbi.</p>
                    </div>
                    <div className="timeline-p">
                        <b><i>2010</i></b>
                        <p>An record de vizitatori: peste 150.000 de persoane într-un singur an.</p>
                    </div>
                    <div className="timeline-p">
                        <b><i>2012</i></b>
                        <p>Lansarea programelor educaționale pentru școli și grădinițe.</p>
                    </div>
                    <div className="timeline-p">
                        <b><i>2015</i></b>
                        <p>Modernizarea aleilor, zonelor de relaxare și spațiilor pentru familii.</p>
                    </div>
                    <div className="timeline-p">
                        <b><i>2020</i></b>
                        <p>Închiderea oficială a grădinii din cauza condițiilor necorespunzătoare pentru animale.</p>
                    </div>
                    <div className="timeline-p">
                        <b><i>2021-2024</i></b>
                        <p>Planuri pentru redeschiderea grădinii ca spațiu dedicat faunei autohtone, fără animale exotice.</p>
                    </div>
                </div>
            </div>
            <Footer/>
            <ScrollTopButton/>
        </div>
    );
}

export default AboutPage;
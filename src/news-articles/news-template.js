import React, { useEffect, useState } from 'react';
import './news-style.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollTopButton from '../components/ScrollTopButton';
import placePic from "../resources/ph-img-wide.png";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function NewsTemplate() {
    const { artID } = useParams();
    const navigate = useNavigate();
    const handleRedirect = () => {navigate("/news")}
    const [ articleText, setArticleText ] = useState('');
    const [ articleDetails, setArticleDetails ] = useState({
        Title: '',
        SubTitle: '',
        Date: '',
        Img: '',
        Txt:'',
    });

    const fetchNewsArticle = async () => {
        try {
            const response = await axios.get(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/getNewsArticle.php?ID=${artID}`);
            //console.log(response);    //debug
            if(Array.isArray(response.data)){
                if(response.data.length>0 && typeof response.data[0] === 'object'){
                    setArticleDetails(response.data[0]);
                    fetchText(response.data[0]);
                }
            } else {
                console.error('News: expected array but received: ', response.data);
            }
        } catch (error) {
            console.error('Error fetching Article: ', error);
        }
    };

    const fetchText = (res) => {
        if(res.Txt) {
            fetch(`/News/${res.Txt}`)
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Failed to fetch content");
                }
                return response.text();
            })
            .then((text) => setArticleText(text))
            .catch((error) => {
                console.error("err loading text: ", error);
            });
        } else setArticleText('This article has no text');
    }

    useEffect(() => {
        fetchNewsArticle();
        window.scrollTo({top: 0});
    }, []);
    

    return (
        <div className="news-art-page">
            <Navbar/>
            <div className="news-art-content">
                <div className="news-art-header">
                    <button className="back-btn" onClick={handleRedirect}><KeyboardBackspaceIcon/>Back to News</button>
                    <h1>{articleDetails.Title}</h1>
                    <h6>{articleDetails.Date}</h6>
                </div>
                <div className="news-art-img">
                    {articleDetails.Img ? (
                        <img src={`http://localhost/ZooDashboard/extResources/News/${articleDetails.Img}`} alt="article-pic"/>
                    ) : (
                        <img src={placePic} alt="news-pic"/>
                    )}
                </div>
                <div className="news-art-text">
                    <p><b>{articleDetails.SubTitle}</b></p>
                    <p>{articleText}</p>
                </div>
            </div>
            <Footer/>
            <ScrollTopButton/>
        </div>
    );
}

export default NewsTemplate;
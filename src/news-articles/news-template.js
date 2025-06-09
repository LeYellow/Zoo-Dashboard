import React, { useEffect, useState, useContext } from 'react';
import './news-style.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Dialog, Tooltip, Button, DialogTitle, DialogActions } from '@mui/material';
import AuthContext from '../context/AuthProvider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollTopButton from '../components/ScrollTopButton';
import placePic from "../resources/ph-img-wide.png";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteArticleButton from '../components/DeleteArticleButton';

function NewsTemplate() {
    const { auth } = useContext(AuthContext);
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
    const [artData, setArtData] = useState({
            Img: '',
            Txt:'',
    });
    const [openMenu, setOpenMenu] = useState(false);
    const [isPhotoMode, setIsPhotoMode] = useState(false);
    const [artImage, setArtImage] = useState('');
    const [artText, setArtText] = useState('');

    const addArticlePhoto = async() => {
        await axios.post(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/addNewsArticleImgOrTxt.php?ID=${artID}`, artData)
        .then(response => {
            //console.log(response.data);   //debug
            handleClose();
        })
        .catch(error => {
            console.error('There was an error adding the Article!', error);
        });

        const imageData = new FormData();
        imageData.append('image', artImage);
        await axios.post("http://localhost/ZooDashboard/zoo_dashboard/src/backend/addNewsArticleImage.php", imageData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });

        setOpenMenu(false);
    }

    const addArticleText = async() => {
        await axios.post(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/addNewsArticleImgOrTxt.php?ID=${artID}`, artData)
        .then(response => {
            //console.log(response.data);   //debug
            handleClose();
        })
        .catch(error => {
            console.error('There was an error adding the Article!', error);
        });

        const textData = new FormData();
        textData.append('file', artText);
        await axios.post("http://localhost/ZooDashboard/zoo_dashboard/src/backend/addNewsArticleText.php", textData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });

        setOpenMenu(false);
    }

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

    const handlePhotoChange = (e) => {
		if (e.target.files.length > 0) {
            setArtData({ ...artData, [e.target.name]: e.target.files[0].name })
		}
        setArtImage(e.target.files[0]);
	};

    const handleTextChange = (e) => {
		if (e.target.files.length > 0) {
            setArtData({ ...artData, [e.target.name]: e.target.files[0].name })
		}
        setArtText(e.target.files[0]);
	};

    const handleAddPhotoClick = () => {
        setOpenMenu(true);
        setIsPhotoMode(true);
        setArtData({
            Img: '',
            Txt: '',
        });
    }
    
    const handleAddTextClick = () => {
        setOpenMenu(true);
        setIsPhotoMode(false);
        setArtData({
            Img: '',
            Txt: '',
        });
    }
    
    const handleClose = () => {
        setOpenMenu(false);
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
                    <div className="news-art-header-btns">
                        <button className="back-btn" onClick={handleRedirect}><KeyboardBackspaceIcon/>Back to News</button>
                        {auth?.Username && ( 
                            <div className="admin-btns">
                                <Tooltip title="Add/Edit Article Photo" arrow placement="top" size="md" variant="soft">
                                    <AddPhotoAlternateIcon className='addPhoto' onClick={handleAddPhotoClick}/>
                                </Tooltip>
                                <Tooltip title="Add/Edit Article Text" arrow placement="top" size="md" variant="soft">
                                    <PostAddIcon className='addText'  onClick={handleAddTextClick}/>
                                </Tooltip>
                            </div>
                        )}
                    </div>
                    {auth?.Username && ( <DeleteArticleButton ID={artID}/> )}
                    <h1>{articleDetails.Title}</h1>
                    <h5>{articleDetails.Date}</h5>
                </div>
                <div className="news-art-img">
                    {articleDetails.Img ? (
                        <img src={`http://localhost/ZooDashboard/extResources/News/${articleDetails.Img}`} alt="article-pic"/>
                    ) : (
                        <img src={placePic} alt="news-pic"/>
                    )}
                </div>
                <div className="news-art-text">
                    <p className="art-subtitle"><b>{articleDetails.SubTitle}</b></p>
                    <p>{articleText}</p>
                </div>
            </div>
            <Footer/>
            <ScrollTopButton/>

            <Dialog open={openMenu} onClose={handleClose}>
                <form onSubmit={isPhotoMode ? addArticlePhoto : addArticleText}>
                    {isPhotoMode ? <DialogTitle>Add/Edit Photo</DialogTitle> : <DialogTitle>Add/Edit Text</DialogTitle>}
                    {isPhotoMode ? (
                        <div className="add-file-btn">
                            <input type="file" accept="image/*" id="add-photo" name="Img" onChange={handlePhotoChange} style={{ display: 'none' }}/>
                            <label htmlFor="add-photo">
                                <Button variant="contained" color="primary" component="span">Upload Picture</Button>
                            </label>
                            <p>Selected File: {artData.Img ? artData.Img : 'none'}</p>
                        </div>
                    ) : (
                        <div className="add-file-btn">
                            <input type="file" accept=".txt" id="add-text" name="Txt" onChange={handleTextChange} style={{ display: 'none' }}/>
                            <label htmlFor="add-text">
                                <Button variant="contained" color="primary" component="span">Upload Content</Button>
                            </label>
                            <p>Selected File: {artData.Txt ? artData.Txt : 'none'}</p>
                        </div>
                    )}
                    <DialogActions>
                        <Button onClick={handleClose} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>Close</Button>
                        <Button type="submit" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>Submit</Button>
                    </DialogActions>
                </form>    
            </Dialog>
        </div>
    );
}

export default NewsTemplate;
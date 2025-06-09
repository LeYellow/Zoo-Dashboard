import React, { useState, useContext } from "react";
import "./AddArticleButton.css";
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button, TextField, DialogTitle } from '@mui/material';
import AuthContext from '../context/AuthProvider';

function AddArticleButton () {
    const { auth } = useContext(AuthContext);
    const [openMenu, setOpenMenu] = useState(false);
    const [artImage, setArtImage] = useState('');
    const [artText, setArtText] = useState('');
    const [artData, setArtData] = useState({
        Title: '',
        SubTitle: '',
        Img: '',
        Txt:'',
    });
    
    const handleAddArt = async () => {
        //console.log("add submit pressed");    //debug

        await axios.post("http://localhost/ZooDashboard/zoo_dashboard/src/backend/addNewsArticle.php", artData)
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

        const textData = new FormData();
        textData.append('file', artText);
        await axios.post("http://localhost/ZooDashboard/zoo_dashboard/src/backend/addNewsArticleText.php", textData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        });
        //console.log(artData); //debug
    };

    const handleChange = (e) => {
        setArtData({ ...artData, [e.target.name]: e.target.value });
    };

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

    const handleAddClick = () => {
        setOpenMenu(true);
        setArtData({
            Title: '',
            SubTitle: '',
            Sources: '',
        });
    }

    const handleClose = () => {
        setOpenMenu(false);
    }

    return(
        <div>
            { auth?.Username && (
                <button className="add-btn" onClick={handleAddClick}>Add Article</button>
            )}

            <Dialog open={openMenu} onClose={handleClose}>
                <form onSubmit={handleAddArt}>
                    <DialogTitle>Add Article</DialogTitle>
                    <DialogContent>
                        <TextField label="Title" name="Title" margin="normal" value={artData.Title} onChange={handleChange} fullWidth required/>
                        <TextField label="Subtitle" name="SubTitle" margin="normal" value={artData.SubTitle} onChange={handleChange} fullWidth multiline rows={2}/>
                        
                        <div className="add-file-btn">
                            <input type="file" accept="image/*" id="add-photo" name="Img" onChange={handlePhotoChange} style={{ display: 'none' }}/>
                            <label htmlFor="add-photo">
                                <Button variant="contained" color="primary" component="span">Upload Picture</Button>
                            </label>
                            <p>Selected File: {artData.Img ? artData.Img : 'none'}</p>
                        </div>

                        <div className="add-file-btn">
                            <input type="file" accept=".txt" id="add-text" name="Txt" onChange={handleTextChange} style={{ display: 'none' }}/>
                            <label htmlFor="add-text">
                                <Button variant="contained" color="primary" component="span">Upload Content</Button>
                            </label>
                            <p>Selected File: {artData.Txt ? artData.Txt : 'none'}</p>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>Close</Button>
                        <Button type="submit" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default AddArticleButton;
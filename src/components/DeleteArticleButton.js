import React, { useState, useContext } from "react";
import "./DeleteArticleButton.css";
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button, DialogContentText, DialogTitle } from '@mui/material';
import AuthContext from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function DeleteArticleButton ({ID}) {
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);
    const [openMenu, setOpenMenu] = useState(false);
    
    const handleDeleteArt = async (event) => {
        event.preventDefault();

        await axios.delete(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/deleteNewsArticle.php?ID=${ID}`)
        .then(response => {
            //console.log(response.data);     //debug
        })
        .catch(error => {
            console.error('There was an error deleting the article!', error);
        });

        navigate('/news');
    };

    const handleDeleteClick = () => {
        setOpenMenu(true);
    }

    const handleClose = () => {
        setOpenMenu(false);
    }

    return(
        <div>
            { auth?.Username && (
                <button className="delete-btn" onClick={handleDeleteClick}>Delete Article</button>
            )}

            <Dialog open={openMenu} onClose={handleClose}>
                <form  onSubmit={handleDeleteArt}>
                <DialogTitle> Delete Article </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color:'black'}}> Are you sure you want to delete this article? </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>No</Button>
                    <Button type="submit" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>Yes</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default DeleteArticleButton;
import React, { useState, useEffect, useContext } from 'react';
import "./ZooMap.css";
import axios from 'axios';
import { Dialog, DialogContent, DialogActions, Button, TextField, DialogTitle, Tooltip, DialogContentText } from '@mui/material';
import AuthContext from '../context/AuthProvider';
import zoomap from "../resources/zoomap.png";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocationOffIcon from '@mui/icons-material/LocationOff';

function ZooMap({onPinClick}) {
    const { auth } = useContext(AuthContext);
    const [pins, setPins] = useState([]);
    const [openMenu, setOpenMenu] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [selectedPinID, setSelectedPinID] = useState(null);
    const [isAddingPin, setIsAddingPin] = useState(false);
    const [pinData, setPinData] = useState({
        X: '',
        Y: '',
        Title: '',
        Descr: '',
    });

    const fetchPinsCoords = async () => {
        try {
            const response = await axios.get(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/getMapPins.php`);
            //console.log(response);    //debug
            if(Array.isArray(response.data)){
                if(response.data.length>0 && typeof response.data[0] === 'object'){
                    setPins(response.data);
                }
            } else {
                console.error('Pins: expected array but received: ', response.data);
            }
        } catch (error) {
            console.error('Error fetching pins: ', error);
        }
    };

    const handleAddPin = async (event) => {
        console.log("add submit pressed");
        event.preventDefault();

        await axios.post("http://localhost/ZooDashboard/zoo_dashboard/src/backend/addPin.php", pinData)
        .then(response => {
            //console.log(response.data);   //debug
            handleClose();
            fetchPinsCoords();
        })
        .catch(error => {
            console.error('There was an error adding the pin!', error);
        });
        console.log(pinData);
    };

    const handleAddClick = () => {
        setIsAddingPin(true);
        setPinData({
            X: '',
            Y: '',
            Title: '',
            Descr: '',
        });
        console.log("Enter pin placement mode");    //debug
    };

    const handleChange = (e) => {
        setPinData({ ...pinData, [e.target.name]: e.target.value });
    };

    const handleClose = () => {
        setIsAddingPin(false);
        setOpenMenu(false);
        setOpenDelete(false);
        console.log("Closed menu");     //debug
    };

    const handleMapClick = (e) => {
        if (!isAddingPin) return;
    
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPinData({ X: Math.round(x)-20, Y: Math.round(y)-5 });
    
        setOpenMenu(true);
    };

    const handleDeleteEntry = async () => {
        await axios.delete(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/deletePin.php?ID=${selectedPinID}`)
        .then(response => {
            //console.log(response.data);     //debug
        })
        .catch(error => {
            console.error('There was an error deleting the pin!', error);
        });
        handleClose();
        setSelectedPinID(1);    //<----rework this
        fetchPinsCoords();
    }
    
    const handleDeleteClick = (ID) => {
        console.log("Deleting for ID:", ID); // Debugging
        setOpenDelete(true);
    };

    useEffect(() => {
        fetchPinsCoords();
    }, []);

    return (
        <div>
            <div className="zoo-map">
                <img src={zoomap} alt='map' onClick={handleMapClick} style={{ cursor: isAddingPin ? 'crosshair' : 'default' }} />
                {pins.map((pin,index) => {
                    const pinClick = () => {
                        console.log("s-a apasat ", pin.X,"," , pin.Y);  //debug
                        if(onPinClick) onPinClick(pin.ID);
                        setSelectedPinID(pin.ID);
                    };
                
                    return (
                        <svg key={index} className="pin" 
                            onClick={pinClick} 
                            style={{
                                left: pin.X,
                                top: pin.Y
                            }}
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="#000000" stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round" fill="currentColor"/>
                            <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="#000000" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"  fill="#ffffff"/>
                        </svg>
                    )    
                })}
                {auth?.Username ? (
                    <div>
                        <Tooltip title="Add Pin" arrow placement="bottom" size="md" variant="soft">
                            <AddLocationAltIcon className="pin-buttons add-pin" onClick={handleAddClick}/>
                        </Tooltip>
                        <Tooltip title="Delete Pin" arrow placement="bottom" size="md" variant="soft">
                            <LocationOffIcon className="pin-buttons delete-pin" onClick={() => handleDeleteClick(selectedPinID)}/>
                        </Tooltip>
                    </div>
                ):(<p></p>)}
            </div>
            <Dialog open={openMenu} onClose={handleClose}>
                <form onSubmit={handleAddPin}>
                    <DialogTitle>Add New Pin</DialogTitle>
                    <DialogContent>
                        <TextField label="X" name="X" margin="normal" disabled value={pinData.X} onChange={handleChange} style={{width: 80}} />
                        <TextField label="Y" name="Y" margin="normal" disabled value={pinData.Y} onChange={handleChange} style={{width: 80, marginLeft: 20}} />
                        <TextField label="Title" name="Title" margin="normal" value={pinData.Title} onChange={handleChange} style={{width: 350, marginLeft: 20}} />
                        <TextField label="Description" name="Descr" margin="normal" value={pinData.Descr} onChange={handleChange} fullWidth multiline rows={2}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>Close</Button>
                        <Button type="submit" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>Submit</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={openDelete} onClose={handleClose} >
                <form>
                <DialogTitle> Delete Pin </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color:'black'}}> Are you sure you want to delete this pin? </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>No</Button>
                    <Button onClick={handleDeleteEntry} type="button" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>Yes</Button>
                </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default ZooMap;
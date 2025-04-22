import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogContent, DialogActions, Button, TextField, DialogTitle, DialogContentText, MenuItem, Select, InputLabel, FormControl, Tooltip } from '@mui/material';
import "./animals.css";
import "./shared.css";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import BorderColorRoundedIcon from '@mui/icons-material/BorderColorRounded';
import namesvg from '../resources/name-badge.svg';

function AnimalsPage() {
    const loggedUser = 1;   //trigger login
    const [error, setError] = useState("");
    const [openMenu, setOpenMenu] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedID, setselectedID] = useState(null);
    const [notes, setNotes] = useState({
        ID: '',
        Name: '',
        Characteristics: '',
        Food: '',
        Status: '',
        About: '',
        Age: '',
    });
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        Name: '',
        Species: '',
        Breed: '',
        Enclosure: '',
        WasFeed: '',
        Responsible: '',
        Characteristics: '',
        Food: '',
        Status: '',
        About: '',
        Age: '',
    });
    const columnsTicket = [
        ...(loggedUser ? [{ field: 'ID', headerName: 'ID', maxWidth: 20, headerAlign: 'center', headerClassName: 'TableHeader' }] : []),
        { field: 'Name', headerName: 'Name', minWidth: 80, flex: 1, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'Species', headerName: 'Species', minWidth: 80, flex: 1, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'Breed', headerName: 'Breed', minWidth: 100, flex: 1, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'Enclosure', headerName: 'Enclosure', minWidth: 100, flex: 0.3, headerAlign: 'center', headerClassName: 'TableHeader'  },
        ...(loggedUser ? [{ field: 'WasFeed', headerName: 'Has Eat', minWidth: 80, flex: 0.3, headerAlign: 'center', headerClassName: 'TableHeader'  }] : []),
        ...(loggedUser ? [{ field: 'Responsible', headerName: 'Responsible', minWidth: 110, flex: 1, headerAlign: 'center', headerClassName: 'TableHeader'  }] : []),
        ...(loggedUser ? [{ field: 'Functions', headerName: 'Functions', minWidth: 130, flex: 1, headerAlign: 'center', headerClassName: 'TableHeader',
            renderCell: (params) => (
                <div>
                    <Tooltip title="Edit" arrow placement="top" size="md" variant="soft">
                        <BorderColorRoundedIcon onClick={() => handleEditClick(params.row)}
                            sx={{ marginTop:'8px', padding:'5px', borderRadius:'5px', marginRight: 1, backgroundColor: '#006A4E', color: 'white', '&:hover': { backgroundColor: '#1B4D3E' , cursor: 'pointer' } }}
                        >Edit</BorderColorRoundedIcon>
                    </Tooltip>
                    <Tooltip title="Delete" arrow placement="top" size="md" variant="soft">
                        <DeleteForeverRoundedIcon onClick={() => handleDeleteClick(params.row.ID)}
                            sx={{ padding:'5px', borderRadius:'5px', backgroundColor: '#CF352E', color: 'white', '&:hover': { backgroundColor: 'darkred' , cursor: 'pointer' } }}
                        >Delete</DeleteForeverRoundedIcon>
                    </Tooltip>
                </div>
            ),
        }] : []),
    ]

    //-----------Fetch Animals
    const fetchTickets = async () => {
        try {
            const response = await axios.get("http://localhost/ZooDashboard/zoo_dashboard/src/backend/getAnimals.php")
            console.log(response);    //debug
            if(Array.isArray(response.data)){
                if(response.data.length>0 && typeof response.data[0] === 'object'){
                setData(response.data);
                } else {
                console.error('Ticket List: Received data is not an array of objects:', response.data);
                }
            } else {
                console.error('Ticket List: expected array but received: ', response.data);
            }
        } catch (error) {
        console.error('Error fetching Ticket data:', error);
        }
    }

    const fetchTicketNotes = async (ID) => {
        try {
          const response = await axios.get(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/getDescription.php?ID=${ID}`);
          //console.log(response);    //debug
          if(Array.isArray(response.data)){
            if(response.data.length>0 && typeof response.data[0] === 'object'){
              setNotes(response.data[0]);
            } else {
              setNotes({
                Description: 'No description available.',
                Requestor: 'N/A',
                Team: 'N/A',
                ProjectName: 'N/A'
              });
            }
          } else {
            console.error('Ticket Description: expected array but received: ', response.data);
          }
        } catch (error) {
          console.error('Error fetching Ticket data:', error);
        }
    };

    //-----------Add Animal
    const handleAddEntry = async (event) => {
        console.log("add submit pressed");
        event.preventDefault();

        if (!formData.Name.trim()) {
            setError("Please enter the animal's name.");
            return;
        }
        setError("");

        await axios.post("http://localhost/ZooDashboard/zoo_dashboard/src/backend/addAnimal.php", formData)
        .then(response => {
            //console.log(response.data);   //debug
            handleClose();
            fetchTickets();
        })
        .catch(error => {
            console.error('There was an error adding the animal!', error);
        });
        console.log(formData);
    };

    const handleAddClick = () => {
        setFormData({
            Name: '',
            Species: '',
            Breed: '',
            Enclosure: '',
            WasFeed: '',
            Responsible: '',
            Characteristics: '',
            Food: '',
            Status: '',
            About: '',
            Age: ''
        });
        setIsEditMode(false);
        setOpenMenu(true);
        console.log("opened menu");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
      
    const handleClose = () => {
        setOpenMenu(false);
        console.log("Closed menu");
        setOpenDelete(false);
    };

    //-----------Edit Entry
    const[editData, setEditData] = useState({
        ID: '',
        Name: '',
        Species: '',
        Breed: '',
        Enclosure: '',
        WasFeed: '',
        Responsible: '',
        Characteristics: '',
        Food: '',
        Status: '',
        About: '',
        Age: '',
    });

    const handleEditEntry = async (event) => {
        event.preventDefault();

        if (!editData.ID) {
            console.error("Edit failed: No ID found.");
            return;
        }

        console.log("Sending editData:", editData); //debug

        await axios.put(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/editAnimal.php`, editData)
        .then(response => {
            //console.log(response.data);     //debug
            handleClose();
            fetchTickets();
        })
        .catch(error => {
            console.error('There was an error editing the animal!', error);
        });
        await fetchTicketNotes(editData.ID);
    }

    const handleEditClick = async (row) => {    //changes only if row clicked
        setEditData({
            ID: row.ID,
            Name: row.Name,
            Species: row.Species,
            Breed: row.Breed,
            Enclosure: row.Enclosure,
            WasFeed: row.WasFeed === "Yes" ? 1 : 0,
            Responsible: row.Responsible,
            Characteristics: notes.Characteristics,
            Food: notes.Food,
            Status: notes.Status === "Healthy" ? 1 : 0,
            About: notes.About,
            Age: notes.Age,
        });
        setIsEditMode(true);
        setOpenMenu(true);
      };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    //-----------Delete
    const handleDeleteEntry = async () => {
        await axios.delete(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/deleteAnimal.php?ID=${selectedID}`)
        .then(response => {
            //console.log(response.data);     //debug
        })
        .catch(error => {
            console.error('There was an error deleting the animal!', error);
        });
        handleClose();
        setSelectedRow(null);
        fetchTickets();
    }
    
    const handleDeleteClick = (ID) => {
        console.log("Delete clicked for ID:", ID); // Debugging
        setselectedID(ID);
        setOpenDelete(true);
    };

    //-----------Misc
    const handleFeedClick= async () => {
        axios.put(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/feedAnimal.php`, { ID: selectedRow.ID}).then(fetchTickets);
    }
    
    useEffect(() => {
        fetchTickets();
    }, []);

    //-----------Row click & description
    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        fetchTicketNotes(params.row.ID);
        console.log("Clicked row ", params.row.ID)  //debug
    };

    return (
        <div className="page">
            <Navbar/>
            <div className="banner animals-banner"/>
            <div className="content">
                <h1 className="title">Select an animal to see its details!</h1>
                <div className="animal-list">
                    <DataGrid
                        rows={data}
                        columns={columnsTicket}
                        getRowId={(row) => row.ID}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        onRowClick={handleRowClick}
                        localeText={{
                            noRowsLabel: "Loading data..." 
                        }}
                    />
                </div>
                <div className="animal-desc">
                    {selectedRow ? (
                        <div>
                            {selectedRow.WasFeed==="No" ? (
                                <button className='AddButton' onClick={handleFeedClick}>Animal has eaten</button>
                            ):(<p></p>)}
                            {loggedUser ? (<p><b>ID: </b>{selectedRow.ID}</p>):(<p></p>)}
                            <div className="details-grid">    
                                <div className="grid-element">
                                    <h5>Name</h5>
                                    <h4>{notes.Name}</h4>
                                </div>
                                <div className="grid-element">
                                    <h5>Age</h5>
                                    <h4>{notes.Age}</h4>
                                </div>
                                <div className="grid-element">
                                    <h5>Favorite Food</h5>
                                    <h4>{notes.Food}</h4>
                                </div>
                                <div className="grid-element">
                                    <h5>Status</h5>
                                    <h4>{notes.Status}</h4>
                                </div>
                            </div>
                            <p><b>Unique Traits: </b>{notes.Characteristics}</p>
                            <p><b>About: </b>{notes.About}</p>
                        </div>
                    ) : (
                        <h6>Please select an animal</h6>
                    )}  
                </div>
                {loggedUser ? (
                    <button className='AddButton' onClick={handleAddClick}>Add Animal</button>
                ):(<p></p>)}
            </div>

            <Dialog open={openMenu} onClose={handleClose}>
                <form>
                    <DialogTitle>{isEditMode ? 'Edit Animal' : 'Add New Animal'}</DialogTitle>
                    <DialogContent>
                        <TextField label="Name" name="Name" margin="normal" required onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.Name : formData.Name} disabled={isEditMode} style={{width: 260}} error={!!error} helperText={error}/>
                        <TextField label="Age" name="Age" margin="normal" onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.Age : formData.Age} style={{width: 260, marginLeft: 30}}/>
                        <TextField label="Breed" name="Breed" margin="normal" onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.Breed : formData.Breed} disabled={isEditMode} style={{width: 260}}/>
                        <TextField label="Species" name="Species" type="normal" margin="normal" onChange={isEditMode ? handleEditChange : handleChange}  value={isEditMode ? editData.Species : formData.Species} disabled={isEditMode} style={{width: 260, marginLeft: 30}}/>
                        <TextField label="Enclosure" name="Enclosure" margin="normal" onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.Enclosure : formData.Enclosure} style={{width: 260}}/>
                        <TextField label="Responsible" name="Responsible" type="normal" margin="normal" onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.Responsible : formData.Responsible} style={{width: 260, marginLeft: 30}}/>
                        <FormControl margin="normal" style={{width: 260}}>
                            <InputLabel>WasFeed</InputLabel>
                            <Select name="WasFeed" value={isEditMode ? editData.WasFeed : formData.WasFeed} onChange={isEditMode ? handleEditChange : handleChange}>
                                <MenuItem value={1}>Yes</MenuItem>
                                <MenuItem value={0}>No</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl margin="normal" style={{width: 260, marginLeft: 30}}>
                            <InputLabel>Status</InputLabel>
                            <Select name="Health Status" value={isEditMode ? editData.Status : formData.Status} onChange={isEditMode ? handleEditChange : handleChange}>
                                <MenuItem value={1}>Sick</MenuItem>
                                <MenuItem value={0}>Healthy</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField label="Favorite Food" name="Food" fullWidth margin="normal" onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.Food : formData.Food}/>
                        <TextField label="Unique Traits" name="Characteristics" fullWidth type="normal" margin="normal" onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.Characteristics : formData.Characteristics} multiline rows={2}/>
                        <TextField label="About" name="About" fullWidth margin="normal" onChange={isEditMode ? handleEditChange : handleChange} value={isEditMode ? editData.About : formData.About}  multiline rows={4}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>Close</Button>
                        <Button onClick={isEditMode ? handleEditEntry : handleAddEntry} type="submit" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>{isEditMode ? 'Edit' : 'Submit'}</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Dialog open={openDelete} onClose={handleClose} >
                <form>
                <DialogTitle> Delete ticket </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color:'black'}}> Are you sure you want to delete this entry? </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} sx={{backgroundColor: 'red', color: 'white', '&:hover': {backgroundColor: 'darkred'}}}>No</Button>
                    <Button onClick={handleDeleteEntry} type="button" sx={{ backgroundColor: 'green', color: "white", '&:hover': {backgroundColor: 'darkgreen'}}}>Yes</Button>
                </DialogActions>
                </form>
            </Dialog>

            <Footer/>
        </div>
    );
}

export default AnimalsPage;

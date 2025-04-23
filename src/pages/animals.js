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
                            <div className="profile-grid">    
                                <ul className="profile-element">
                                    <li className="profile-pic">
                                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 1C8.96243 1 6.5 3.46243 6.5 6.5C6.5 9.53757 8.96243 12 12 12C15.0376 12 17.5 9.53757 17.5 6.5C17.5 3.46243 15.0376 1 12 1Z" fill="currentColor"/>
                                            <path d="M7 14C4.23858 14 2 16.2386 2 19V22C2 22.5523 2.44772 23 3 23H21C21.5523 23 22 22.5523 22 22V19C22 16.2386 19.7614 14 17 14H7Z" fill="currentColor"/>
                                        </svg>
                                    </li>
                                    <li className="profile-info">
                                        <h5>Name</h5>
                                        <h4>{notes.Name}</h4>
                                    </li>
                                </ul>
                                <ul className="profile-element">
                                    <li className="profile-pic">
                                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 6c1.11 0 2-.9 2-2 0-.38-.1-.73-.29-1.03L12 0l-1.71 2.97c-.19.3-.29.65-.29 1.03 0 1.1.9 2 2 2zm4.6 9.99l-1.07-1.07-1.08 1.07c-1.3 1.3-3.58 1.31-4.89 0l-1.07-1.07-1.09 1.07C6.75 16.64 5.88 17 4.96 17c-.73 0-1.4-.23-1.96-.61V21c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-4.61c-.56.38-1.23.61-1.96.61-.92 0-1.79-.36-2.44-1.01zM18 9h-5V7h-2v2H6c-1.66 0-3 1.34-3 3v1.54c0 1.08.88 1.96 1.96 1.96.52 0 1.02-.2 1.38-.57l2.14-2.13 2.13 2.13c.74.74 2.03.74 2.77 0l2.14-2.13 2.13 2.13c.37.37.86.57 1.38.57 1.08 0 1.96-.88 1.96-1.96V12C21 10.34 19.66 9 18 9z" fill="currentColor"/>
                                        </svg>
                                    </li>
                                    <li className="profile-info">
                                        <h5>Age</h5>
                                        <h4>{notes.Age}</h4>
                                    </li>
                                </ul>
                                <ul className="profile-element">
                                    <li className="profile-pic">
                                        <svg viewBox="0 -3.84 122.88 122.88" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M29.03,100.46l20.79-25.21l9.51,12.13L41,110.69C33.98,119.61,20.99,110.21,29.03,100.46L29.03,100.46z M53.31,43.05 c1.98-6.46,1.07-11.98-6.37-20.18L28.76,1c-2.58-3.03-8.66,1.42-6.12,5.09L37.18,24c2.75,3.34-2.36,7.76-5.2,4.32L16.94,9.8 c-2.8-3.21-8.59,1.03-5.66,4.7c4.24,5.1,10.8,13.43,15.04,18.53c2.94,2.99-1.53,7.42-4.43,3.69L6.96,18.32 c-2.19-2.38-5.77-0.9-6.72,1.88c-1.02,2.97,1.49,5.14,3.2,7.34L20.1,49.06c5.17,5.99,10.95,9.54,17.67,7.53 c1.03-0.31,2.29-0.94,3.64-1.77l44.76,57.78c2.41,3.11,7.06,3.44,10.08,0.93l0.69-0.57c3.4-2.83,3.95-8,1.04-11.34L50.58,47.16 C51.96,45.62,52.97,44.16,53.31,43.05L53.31,43.05z M65.98,55.65l7.37-8.94C63.87,23.21,99-8.11,116.03,6.29 C136.72,23.8,105.97,66,84.36,55.57l-8.73,11.09L65.98,55.65L65.98,55.65z" fill="currentColor"/>
                                        </svg>
                                    </li>
                                    <li className="profile-info">
                                        <h5>Favorite Food</h5>
                                        <h4>{notes.Food}</h4>
                                    </li>
                                </ul>
                                <ul className="profile-element">
                                    <li className="profile-pic">
                                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" fill="currentColor"/>
                                        </svg>
                                    </li>
                                    <li className="profile-info">
                                        <h5>Status</h5>
                                        <h4>{notes.Status}</h4>
                                    </li>
                                </ul>
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

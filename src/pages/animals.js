import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./animals.css";
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AnimalsPage() {
    const [selectedRow, setSelectedRow] = useState(null);
    const [notes, setNotes] = useState({
        ID: '',
        Name: '',
        Characteristics: '',
        Food: '',
        Status: '',
        About: '',
    });
    const[data, setData] = useState([]);
    const columnsTicket = [
        { field: 'ID', headerName: 'ID', width: 20, headerAlign: 'center', headerClassName: 'TableHeader' },
        { field: 'Name', headerName: 'Name', width: 80, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'Species', headerName: 'Species', width: 80, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'Breed', headerName: 'Breed', width: 100, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'Enclosure', headerName: 'Enclosure', width: 100, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'WasFeed', headerName: 'Has Eat', width: 80, headerAlign: 'center', headerClassName: 'TableHeader'  },
        { field: 'Responsible', headerName: 'Responsible', width: 110, headerAlign: 'center', headerClassName: 'TableHeader'  },
    ]

    //-----------Fetch Data
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

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleRowClick = (params) => {
        setSelectedRow(params.row);
        fetchTicketNotes(params.row.ID);
    };

    return (
        <div className="animals-page">
            <Navbar/>
            <div className="animals-banner"/>
            <div className="animals-content">
                <h1>Select an animal to see its details!</h1>
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
                        sx={{
                            '& .MuiDataGrid-cell': {
                            borderRight: '1px solid black',
                            borderLeft: '1px solid black',
                        },
                            border: 0,
                        }}
                    />
                </div>
                <div className="animal-desc">
                    {selectedRow ? (
                        <div>
                            <p><b>ID: </b>{selectedRow.ID}</p>
                            <p><b>Name: </b>{notes.Name}</p>
                            <p><b>Unique Traits: </b>{notes.Characteristics}</p>
                            <p><b>Favorite Food: </b>{notes.Food}</p>
                            <p><b>Description: </b>{notes.About}</p>
                            <p><b>Status: </b>{notes.Status}</p>
                        </div>
                    ) : (
                        <h3>Please select an animal</h3>
                    )}  
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default AnimalsPage;

import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import axios from 'axios';
import "./InfoCards.css";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CloseIcon from '@mui/icons-material/Close';

function TicketPricesCard() {
    const[open, setOpen] = useState(false);
    const[tickets, setTickets] = useState([]);

    const fetchTicketPrices = async () => {
        try {
          const response = await axios.get(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/getPrices.php`);
          //console.log(response);    //debug
          if(Array.isArray(response.data)){
            if(response.data.length>0 && typeof response.data[0] === 'object'){
              setTickets(response.data);
            }
          } else {
            console.error('Tickets: expected array but received: ', response.data);
          }
        } catch (error) {
          console.error('Error fetching tickets: ', error);
        }
    };

    const handleOpenMenu = () => {
        setOpen(true);
    }

    const handleCloseMenu = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchTicketPrices();
    }, []);

    return (
        <div>
            <div className="card-body">
                <h2 className="card-title"><ConfirmationNumberIcon/> Ticket Prices</h2>
                <div className="card-content tickets-ex">
                    {tickets.slice(0, 2).map((ticket, index) => (
                        <p key={index} className="ticketPreview">
                        {ticket.tier} - {ticket.price} Lei
                        </p>
                    ))}
                </div>
                <p className='card-redirect' onClick={handleOpenMenu}>All prices →</p>
            </div>

            <Dialog open={open} onClose={handleCloseMenu}>
                <div className="ticketMenu">
                    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <CloseIcon onClick={handleCloseMenu} sx={{ cursor: 'pointer'}}/>
                    </div>
                    <DialogTitle sx={{ textAlign: 'center', paddingBottom: 3, fontSize: 40, fontWeight: 'bold' }}>Prices</DialogTitle>
                    {tickets.map((ticket, index) => (
                        <div key={index} className="ticketList">
                            <span className="ticketTier">{ticket.tier}</span>
                            <span className="dotLine"></span>
                            <span className="ticketPrice">{ticket.price} Lei</span>
                        </div>
                    ))}
                </div>
            </Dialog>
        </div>
    );
}

export default TicketPricesCard;
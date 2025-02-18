import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle } from '@mui/material';
import axios from 'axios';
import "./TicketPricesCard.css";
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
            <div className="prices">
                <h1><ConfirmationNumberIcon/> Ticket Prices</h1>
                {tickets.slice(0, 2).map((ticket, index) => (
                    <p key={index} className="ticketPreview">
                    {ticket.tier} - {ticket.price} Lei
                    </p>
                ))}
                <h2 onClick={handleOpenMenu}>All prices →</h2>
            </div>
            <Dialog open={open} onClose={handleCloseMenu} className="ticketMenu">
                <CloseIcon onClick={handleCloseMenu}/>
                <DialogTitle>Tickets</DialogTitle>
                {tickets.map((ticket, index) => (
                    <div key={index} className="ticketInfo">
                        <span className="ticketTier">{ticket.tier}</span>
                        <span className="dotLine"></span>
                        <span className="ticketPrice">{ticket.price} Lei</span>
                    </div>
                ))}
            </Dialog>
        </div>
    );
}

export default TicketPricesCard;
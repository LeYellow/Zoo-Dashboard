import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./VisitingHoursCard.css";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

function VisitingHoursCard() {
    const[hours, setHours] = useState({
        open_time: '',
        close_time: '',
    });

    const fetchVisitingHours = async () => {
        try {
          const response = await axios.get(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/getHours.php`);
          //console.log(response);    //debug
          if(Array.isArray(response.data)){
            if(response.data.length>0 && typeof response.data[0] === 'object'){
              setHours(response.data[0]);
            }
          } else {
            console.error('Hours: expected array but received: ', response.data);
          }
        } catch (error) {
          console.error('Error fetching hours:', error);
        }
    };

    useEffect(() => {
        fetchVisitingHours();
    }, []);

    return (
        <div className="hours">
            <h1><AccessTimeIcon/> Visiting Hours</h1>
            <p>{hours.open_time} - {hours.close_time}</p>
        </div>
    );
}

export default VisitingHoursCard;
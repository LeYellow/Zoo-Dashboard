import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./InfoCards.css";
import { Dialog, DialogTitle } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

function TimetableCard() {
  const[hours, setHours] = useState({
    open_time: '',
    close_time: '',
  });
  const[schedule, setSchedule] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const handleShowMenu = () => setOpenMenu((openMenu) => !openMenu);

  const fetchVisitingHoursToday = async () => {
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

  const fetchVisitingHoursAll = async () => {
    try {
      const response = await axios.get(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/getHoursAll.php`);
      //console.log(response);    //debug
      if(Array.isArray(response.data)){
        if(response.data.length>0 && typeof response.data[0] === 'object'){
          setSchedule(response.data);
        }
      } else {
        console.error('Hours: expected array but received: ', response.data);
      }
    } catch (error) {
      console.error('Error fetching hours:', error);
    }
  };

  const handleOpenMenu = () => {
    handleShowMenu();
    fetchVisitingHoursAll();
  }

  useEffect(() => {
    fetchVisitingHoursToday();
  }, []);

  return (
    <div>
      <div className="card-body">
        <h2 className="card-title"><AccessTimeIcon/> Visiting Hours</h2>
        <div className="card-content current-day">
          <p>{hours.open_time} - {hours.close_time}</p>
        </div>
        <p className="card-redirect" onClick={handleOpenMenu}>All days →</p>
      </div>

      <Dialog open={openMenu} onClose={handleShowMenu} disableScrollLock>
        <div className="hoursMenu">
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <CloseIcon onClick={handleShowMenu} sx={{ cursor: 'pointer'}}/>
            </div>
            <DialogTitle sx={{ textAlign: 'center', marginBottom: 3, padding: 0, fontSize: 30, fontWeight: 'bold' }}>Weekly Program</DialogTitle>
            {schedule.map((s, index) => (
              <div key={index} className="hoursList">
                  <span>{s.day}: </span>
                  <span>{s.open_time} - {s.close_time}</span>
              </div>
            ))}
            <p style={{ color: "darkred", textAlign: "justify", fontWeight: 600 }}>Closed on national holidays, check news for special occasions.</p>
        </div>
      </Dialog>
    </div>
  );
}

export default TimetableCard;
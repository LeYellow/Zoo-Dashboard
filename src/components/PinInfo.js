import React, { useState, useEffect } from 'react';
import "./PinInfo.css";
import axios from 'axios';

function PinInfo({pinId}) {
    const[info, setInfo] = useState([]);

    const fetchPinsInfo = async (ID) => {
        try {
            const response = await axios.get(`http://localhost/ZooDashboard/zoo_dashboard/src/backend/getMapPinsInfo.php?ID=${ID}`);
            //console.log(response);    //debug
            if(Array.isArray(response.data)){
                if(response.data.length>0 && typeof response.data[0] === 'object'){
                    setInfo(response.data[0]);
                } else {
                    setInfo({
                        Title: 'No Title Available',
                        Descr: 'No description available.'
                    });
                }
            } else {
                console.error('Pins Info: expected array but received: ', response.data);
            }
        } catch (error) {
            console.error('Error fetching Pins data:', error);
        }
    };

    useEffect(() => {
        if(!pinId) return;
        fetchPinsInfo(pinId);
    }, [pinId]);
        
    return (
        <div className="pin-note">
            {pinId ? (
                <div>
                    <b>{info.Title}</b>
                    <p>{info.Descr}</p>
                </div>
            ) : (
                <h6>Please select a point of interest to see it's description</h6>
            )}
        </div>
    );
}

export default PinInfo;
import React, { useState, useEffect } from 'react';
import "./PinInfo.css";
import axios from 'axios';
import placePic from "../resources/ph-img-wide.png";

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
                <div className="pin-content">
                    <div className="pin-photo">
                        {info.Img ? (
                            <img src={`http://localhost/ZooDashboard/extResources/Pins/${info.Img}`} alt="place-pic"/>
                        ) : (
                            <img src={placePic} alt="place-pic"/>
                        )}
                    </div>
                    <div className="pin-text">
                        <h2>{info.Title}</h2>
                        <p>{info.Descr}</p>
                    </div>
                </div>
            ) : (
                <h6>Please select a point of interest to see it's description</h6>
            )}
        </div>
    );
}

export default PinInfo;
import React, { useState, useEffect } from 'react';
import "./ZooMapLegend.css";
import axios from 'axios';

function ZooMapLegend() {
    const [legend, setLegend] = useState([]);
    const [zoom, setZoom] = useState(false);

    const fetchLegend = async () => {
        try {
            const response = await axios.get("http://localhost/ZooDashboard/zoo_dashboard/src/backend/getMapLegend.php");
            //console.log(response);    //debug
            if(Array.isArray(response.data)){
                if(response.data.length>0 && typeof response.data[0] === 'object'){
                setLegend(response.data);
                }
            } else {
                console.error('Legend: expected array but received: ', response.data);
            }
        } catch (error) {
            console.error('Error fetching legend:', error);
        }
    };

    useEffect(() => {        
        fetchLegend();
    }, []);
        
    return (
        <div className="legend-body">
            <h3>Animal Enclosures Legend</h3>
            <div className="legend-content">
                {legend.map((l, index) => (
                    <div key={index} className="legend-item">
                        <p><b>{l.Enclosure}</b> - {l.Breed}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ZooMapLegend;
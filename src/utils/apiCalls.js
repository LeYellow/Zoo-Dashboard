import axios from 'axios';  //testing a feature

const URL = "http://localhost/ZooDashboard/zoo_dashboard/src/backend/";

export const fetchDataArray = async (setState, file, label = '') => {
    try {
        const response = await axios.get(`${URL}${file}`);
        //console.log(response);    //debug
        if(Array.isArray(response.data)){
            if(response.data.length>0 && typeof response.data[0] === 'object'){
                setState(response.data);
            }
        } else {
            console.error(`${label}: expected array but received: `, response.data);
        }
    } catch (error) {
        console.error(`Error fetching ${label}: `, error);
    }
}

//for zooMap.js fetchDataArray(setPins, 'getMapPins.php', 'Pins Fetch');
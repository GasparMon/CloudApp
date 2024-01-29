import axios from "axios";
const URL = import.meta.env.VITE_URL_HOST;

const AppForecast = async ({ lat, lon}) => {

  try {
    const response = await axios.post(`${URL}/cloudapp/forecast`, {
      lat: lat,
      lon: lon,
    });
    
    if (response.data) {
   
        return response.data;
   
    }
  } catch (error) {
    return error.message;
  }
};

export default AppForecast;

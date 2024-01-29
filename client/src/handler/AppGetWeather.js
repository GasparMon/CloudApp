import axios from "axios";
const URL = import.meta.env.VITE_URL_HOST;

const AppGetWeather = async ({ lat, lon, title }) => {

  try {
    const response = await axios.post(`${URL}/cloudapp/weather`, {
      lat: lat,
      lon: lon,
    });
    
    if (response.data) {
      if(title){
       
        response.data.named = title
      
        return response.data;
      } else {
        return response.data;
      }
    }
  } catch (error) {
    return error.message;
  }
};

export default AppGetWeather;

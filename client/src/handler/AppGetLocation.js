import axios from "axios";
import App from "../App";
const URL = import.meta.env.VITE_URL_HOST;

const AppGetLocation = async (city) => {
  try {
    const response = await axios.get(`${URL}/cloudapp/location/${city}`);

    if (response.data) {
      return(response.data);
    }
  } catch (error) {
    return error.message;
  }
};

export default AppGetLocation;

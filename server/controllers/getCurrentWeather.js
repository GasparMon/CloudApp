const { default: axios } = require("axios");

require("dotenv").config();

const URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const getCurrentWeather = async (req, res) => {

    try {
        const { lat, lon } = req.body;
    
        const response = await axios.post(`${URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        if (response.data) {
          return res.status(200).json(response.data);
        } else {
          return res.status(400).send("Error to get Information");
        }
      } catch (error) {
        return res.status(500).send("Internal Server Error");
      }


}

module.exports = getCurrentWeather;
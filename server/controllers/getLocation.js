const { default: axios } = require("axios");

require("dotenv").config();

const URL = process.env.API_GEO_URL;
const API_KEY = process.env.API_KEY;

const getLocation = async (req, res) => {

    try {
        const { city } = req.params;
    
        const response = await axios.get(`${URL}/direct?q=${city}&limit=4&appid=${API_KEY}`)
     
        if (response.data) {

          const results = response.data.map((element) => {
           return {name: element.name,
            lat: element.lat,
            lon: element.lon,
            state: element.state ?? "",
            country: element.country}

          })

          return res.status(200).json(results);
        } else {
          return res.status(400).send("Error to get Information");
        }
      } catch (error) {
        return res.status(500).send("Internal Server Error");
      }


}

module.exports = getLocation;
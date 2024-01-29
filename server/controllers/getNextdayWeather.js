const { default: axios } = require("axios");

require("dotenv").config();

const URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const getNextdayWeather = async (req, res) => {

    try {
        const { lat, lon } = req.body;
    
        const response = await axios.post(`${URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        if (response.data) {
          
          const newData = response.data.list.map((item) => ({
            main: {
              temp_min: item.main.temp_min,
              temp_max: item.main.temp_max,
            },
            weather: item.weather,
            dt_txt: item.dt_txt,
          }));


          const day_forecast = newData.reduce((result, item) => {
            const date = item.dt_txt.split(' ')[0];
            if (!result[date]) {
              result[date] = [];
            }
            result[date].push(item);
            return result;
          }, {});

          return res.status(200).json(day_forecast);
        } else {
          return res.status(400).send("Error to get Information");
        }
      } catch (error) {
        return res.status(500).send("Internal Server Error");
      }


}

module.exports = getNextdayWeather ;
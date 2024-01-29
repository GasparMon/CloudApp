const getCurrentWeather = require('../controllers/getCurrentWeather');
const getLocation = require('../controllers/getLocation');
const getNextdayWeather = require('../controllers/getNextdayWeather');

const routes = require('express').Router();

routes.get("/location/:city", getLocation);
routes.post("/weather", getCurrentWeather);
routes.post("/forecast", getNextdayWeather);

module.exports = routes
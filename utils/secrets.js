const dotenv = require('dotenv');
dotenv.config();

const weatherKey = process.env.WEATHER_KEY
const geoKey = process.env.GEO_KEY

module.exports = {
    weatherKey: weatherKey,
    geoKey: geoKey

}
const request = require("request");
const secrets = require("../utils/secrets");

const weatherKey = secrets.weatherKey;
const weatherUrl =
    "http://api.weatherstack.com/current?access_key=" + weatherKey + "&query=";

const forecast = (latitude, longitude, callback) => {
    const finalURL = weatherUrl + latitude + "," + longitude
    request({ url: finalURL, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the weather API..", undefined);
        } else if (response.body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike,
                weather_description: response.body.current.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast;

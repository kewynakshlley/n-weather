const request = require("request");
const secrets = require("../utils/secrets");

const weatherKey = "f2e46a8dba3fed054932ea8ed3c52f58"
const weatherUrl =
    "http://api.weatherstack.com/current?access_key=" + weatherKey + "&query=";

const forecast = (latitude, longitude, callback) => {
    const finalURL = weatherUrl + latitude + "," + longitude
    request({ url: finalURL, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather API..", undefined);
        } else if (body.error) {
            callback("Unable to find location.", undefined);
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                weather_description: body.current.weather_descriptions[0],
            })
        }
    })
}

module.exports = forecast;

const geocode = require("./services/geocode");
const forecast = require("./services/forecast");

const address = process.argv[2]

if (address) {
    geocode(address, (error, data) => {
        if(error){
            return console.log(error);
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }

            console.log(data.location);
            console.log("Temperature of " + forecastData.temperature +" Cº.")
            console.log("Feelslike " + forecastData.feelslike + " Cº.")
            console.log(forecastData.weather_description)

        })
    })
} else {
    console.log('Location not provided. (node app.js "LOCATION")')
}



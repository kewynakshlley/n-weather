const geocode = require("./services/geocode");
const forecast = require("./services/forecast");

const address = process.argv[2]

if (address) {
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return console.log(error);
        }

        forecast(latitude, longitude, (error, {temperature, feelslike, weather_description} = {}) => {
            if (error) {
                return console.log(error);
            }

            console.log(location);
            console.log("Temperature of " + temperature +" Cº.")
            console.log("Feelslike " + feelslike + " Cº.")
            console.log(weather_description)

        })
    })
} else {
    console.log('Location not provided. (node app.js "LOCATION")')
}



const geocode = require("./services/geocode");
const forecast = require("./services/forecast");

geocode("João Pessoa", (error, data) => {
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

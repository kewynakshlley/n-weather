const request = require('request')
const dotenv = require('dotenv');

dotenv.config();

const weatherKey = process.env.WEATHER_KEY
const geoKey = process.env.GEO_KEY


const weatherUrl = "http://api.weatherstack.com/current?access_key=" + weatherKey + "&query=-6.806900,-35.077759"
const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Rio%20Tinto.json?access_token=" + geoKey

// request({ url: weatherUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to the weather API..')
//     } else if (response.body.error) {
//         console.log("Unable to find location.")
//     } else {
//         console.log("It's currently " + response.body.current.temperature + " degrees. It feels like " + response.body.current.feelslike)
//         console.log(response.body.current.weather_descriptions[0])
//     }
// })

request({ url: geoUrl, json: true }, (error, response) => {
    if (error) {
        console.log('Unable to connect to the geo API..')
    }else if(response.body.features.length === 0){
        console.log('Unable to find coordinates.')
    }else {
        const center = response.body.features[0].center
        console.log("latitude: " + center[0] + "\nlongitude: " + center[1])
    }

})

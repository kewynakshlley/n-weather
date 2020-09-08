const request = require('request')
const dotenv = require('dotenv');

dotenv.config();

const weatherKey = process.env.WEATHER_KEY
const geoKey = process.env.GEO_KEY


const weatherUrl = "http://api.weatherstack.com/current?access_key="+weatherKey+"&query=-6.806900,-35.077759"
const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token="+geoKey

request({url: weatherUrl, json: true}, (error, response) => {
    if(error){
        console.log('Unable to connect to the weather API..')
    }
    console.log("It's currently " + response.body.current.temperature + " degrees. It feels like "+response.body.current.feelslike)
    console.log(response.body.current.weather_descriptions[0])
})

request({url: geoUrl, json: true}, (error, response) => {
    const center = response.body.features[0].center
    console.log("latitude: "+center[0]+"\nlongitude: "+center[1])
})

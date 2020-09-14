
const request = require('request')
const secrets = require("../utils/secrets.js");

const geoKey = "pk.eyJ1Ijoia2V3eW5ha3NobGxleSIsImEiOiJja2V0bXNocm8yaHJoMzJvNWRneXJ2OHdlIn0.3JAQYBF680MY65UF3iKmNg"
const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

const geocode = (city, callback) => {
    const finalURL = geoUrl + encodeURIComponent(city) + ".json?access_token=" + geoKey
    request({ url: finalURL, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to the geo API..', undefined)
        }else if (body.features.length === 0) {
            callback('Unable to find coordinates.', undefined)
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
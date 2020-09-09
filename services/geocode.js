const request = require('request')
const secrets = require("../utils/secrets");

const geoKey = secrets.geoKey
const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

const geocode = (address, callback) => {
    const finalURL = geoUrl + encodeURIComponent(address) + ".json?access_token=" + geoKey

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
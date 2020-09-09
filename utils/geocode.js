const request = require('request')
const secrets = require('./secrets')

const geoKey = secrets.geoKey
const geoUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/"

const geocode = (address, callback) => {
    const finalURL = geoUrl + encodeURIComponent(address) + ".json?access_token=" + geoKey

    request({ url: finalURL, json: true}, (error, response) => {
        if (error){
            callback('Unable to connect to the geo API..', undefined)
        }else if (response.body.features.length === 0) {
            callback('Unable to find coordinates.', undefined)
        }else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
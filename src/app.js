const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require("./services/geocode");
const forecast = require("./services/forecast");

const app = express()

// Define paths for Express config
const pathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pathDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Kewyn'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'kewyn'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Do you need some help?',
        title: 'Help',
        name: 'kewyn'
    })
})

app.get('/weather', (req, res) => {
    const city = req.query.city;
    if(!city) {
        return res.send({
            error: 'You must provide a city.'
        })
    }

    geocode(city, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, {temperature, feelslike, weather_description} = {}) =>{
            if(error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                city: location,
                temperature,
                feelslike,
                weather_description
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('help-error', {
        title: '404',
        name: 'kewyn',
        message: 'Help article not found.'
    })
})


app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'kewyn',
        message: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server running on port 3000.')
})


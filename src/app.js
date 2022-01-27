const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { title } = require('process')
const { clear } = require('console')
const geocode = require('./utils/geocode')
const currentWeather = require('./utils/currentWeather')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectory))
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title: "Weather",
        name : "Abhishek"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        name : "Abhishek"
    })
})

app.get('/help', (req,res) => {
    res.render("help", {
        title: "Help",
        name : "Abhishek"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send("Provide address")
    } else {
        geocode(req.query.address, (error,response) => {
            if(error){
                return res.send({
                    error
                })
            }else{
                currentWeather(response.longitude,response.latitude,(error,weatherResponse) => {
                    if(error){
                        return res.send({
                            error
                        })
                    } else {
                        var weatherDetails = weatherResponse.weatherDescription
                        weatherDetails = weatherDetails + ". It is currently " + weatherResponse.currentTemperature
                        weatherDetails = weatherDetails + ". It feels like " + weatherResponse.feelsLike
                        res.send({
                            placeName: response.placeName,
                            weatherDetails: weatherDetails
                        })
                    }
                })
            }
        })
    }
})

app.get('*', (req, res) => {
    res.render("404", {
        errorMessage: "Page Not found",
        title: "404"
    })
})

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})
const express = require('express'); // express is a function . it is used to create web-server with node
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

console.log(path.join(__dirname, '../public'))

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//setup handelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew mead'

    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Andrew Mead'
        })
})


app.get('/weather', (req, res) => { 
    if(!req.query.address){
        return res.send({
            error: 'you must provide the adrress'
        })

    }
    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        console.log(latitude, longitude, location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide search term'
        })
    }
    res.send({
       products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew',
        errorMessage: 'Help Article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        errorMessage: 'Page not found',
        title: '404',
        name: 'Andrew'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})
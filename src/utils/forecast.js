const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = "http://api.weatherstack.com/current?access_key=2d72460a5003626ceb82b2fa0813696b&query=" + latitude + "," + longitude + "&units=f"

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("unable to connect with weather service!", undefined)
        }else if(body.error){
            callback("unable to find the location", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degree out. It feels like " + body.current.feelslike + " degree out. Humidity is " + body.current.humidity + " .")
        }
    })
}



module.exports = forecast



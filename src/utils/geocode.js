const request = require('request');
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?limit=1&access_token=pk.eyJ1IjoicmFodWwtYmxvY2siLCJhIjoiY2tqZWJiYzJqNDNzejJybGcyaWN0Nmp5cyJ9.PWpaVeFl2ZgIYtvE6S219Q"
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("unable to connect to location service!", undefined)
        }else if (body.features.length === 0){
            callback("unable to find location. Try another search!", undefined)
        }else {
            const latitude =  body.features[0].center[1];
            const longitude = body.features[0].center[0];
            
            callback(undefined,{ 
                latitude,
                longitude,
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
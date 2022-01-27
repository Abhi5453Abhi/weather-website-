const request = require('postman-request')

const geocode = (address,callback) => {
    const location_url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoiYWJoaXNoZWthcm9yYSIsImEiOiJja3lzZjVmc2IxMzkxMnVudTE2ZngwMnVmIn0.CYrvpVvo0Ev493McpzOHXw&limit=1'

    request({ url: location_url, json: true }, (error, response) => {
        console.log(response.body)
        if(error){
            callback("Unable to connect",undefined)
        } else if(response.body.features.length === 0){
            callback("Unable to find the location",undefined)
        } else{
             callback(undefined,{
                 longitude : response.body.features[0].center[0],
                 latitude : response.body.features[0].center[1],
                 placeName : response.body.features[0].place_name
             })
        }
    } )
} 

module.exports = geocode
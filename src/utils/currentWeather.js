const request = require('postman-request')

const currentWeather = (longitude,latitude,callback) => {
    const weather_url = 'http://api.weatherstack.com/current?access_key=7fdb9924a49a5b5582f2fe7834ebe23f&query='+ latitude + ',' + longitude + '&units=m'
    request({url: weather_url, json: true}, (error,response) => {
        if(error){
            callback("Unable to connect to weather",undefined)
        } else if(response.body.error){
            callback("Unable to find the weather",undefined)
        } else{
             callback(undefined,{
                 weatherDescription : response.body.current.weather_descriptions[0] ,
                 currentTemperature : response.body.current.temperature,
                 feelsLike : response.body.current.feelslike
             })
        }
    } )
}

module.exports = currentWeather
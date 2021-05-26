const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ed98150651a860eb7e63c4b1a474c6a2&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out')
        }
    })
}

module.exports = forecast
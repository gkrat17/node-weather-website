const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ2tyYXQxNyIsImEiOiJja291MHMxZzQwYzM2MnhtcTdmc3dsM2UyIn0.Fcm8zeYqlJIZqwaqj0sqHw&limit=1'
    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect location service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const location  = body.features[0].center
            const longitude = location[0]
            const latitude  = location[1]
            const placeName = body.features[0].place_name
            callback(undefined, {
                longitude: longitude,
                latitude: latitude,
                placeName: placeName
            })
        }
    })
}

module.exports = geocode
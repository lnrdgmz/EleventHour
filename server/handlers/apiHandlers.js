const request = require('request');


module.exports = {


  getGeocode: (req, res) => {
    const location = req.url.split('=')[1];
    console.log('Request:', location);
    const options = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyC7BW4cQF75tCJ2G_5mdNXi2ETJiMHXxNY`,
    method: 'POST',
}
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        // console.log(body.geometry.location.lat)
        // console.log(body.geometry.location.lng)
        console.log('Body:', body);
        res.send(body)
    }
   
    })
  }
}


const request = require('request');


module.exports = {


  getGeocode: (req, res) => {
    const location = req.url.split('=')[1];
    const options = {
       url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyC7BW4cQF75tCJ2G_5mdNXi2ETJiMHXxNY`,
       method: 'POST',
     }

    request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) res.send(body);
    })
  },

  getWeather: (req,res) => {
    // const geoLocationData = req.url.split('=')[1];
    // const lat_lng = JSON.parse(geoLocationData);
    // const lat = lat_lng.lat;
    // const lng = lat_lng.lng;
    // console.log(req.url);
    let copy = req.url.split('').slice(0)
    let test = copy.splice(14,10).join('');
    
   console.log("test",test);
  
   const data = req.url.split('').slice();
   
    const options = {
      url: `https://api.darksky.net/forecast/8f37d60066cc485c1ed202b331586416/42.3601,-71.0589,${test}?exclude=currently,flags`,
      method: 'GET'
    }
    request(options,function(error,response,body) {
      if(!error && response.statusCode === 200){
       
      }
        res.send(body);
    })
  }
}


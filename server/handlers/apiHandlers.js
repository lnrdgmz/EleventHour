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
    // const time= req.url.split('=')[1];
   
    let arr = req.url.split('=');
    console.log('arr',arr);
    const time = arr[1].slice(0,9);
    let geoData = arr[2];
    console.log('t',time);
    console.log('gd', geoData);
    const options = {
      url: `https://api.darksky.net/forecast/8f37d60066cc485c1ed202b331586416/${geoData},${time}?exclude=currently,flags`,
      method: 'GET'
    }
    request(options,function(error,response,body) {
      if(!error && response.statusCode === 200){
       
      }
        res.send(body);
    })
  }
}


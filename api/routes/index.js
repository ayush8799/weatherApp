var express= require("express");
var router = express.Router();
var axios = require("axios")
var fetch = require("node-fetch");

router.get("/",function(req,res){    
    res.render("home");    
})


router.get('/geocode/:location', async function(req, res){
    
    const location = req.params.location
    var encodedAddress = encodeURIComponent(location);
    var apikey = "3d32eb4039df48a182f1754bf7d4239d"

    var apiURL = "https://api.opencagedata.com/geocode/v1/json"
    var reqURL = apiURL 
                + "?"
                + "q=" + encodedAddress
                + "&key=" + apikey
                + '&pretty=1'
                + '&no_annotations=1';

    await axios.get(reqURL)
          .then( async function(response){
              const a= response.data.results[0].geometry   

              reqWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + a.lat + '&lon=' + a.lng  + '&units=' + 'metric'+ '&appid=48516b3194818adf1866aed6a6d2c48b'
              const data = await fetch(reqWeatherUrl);
              const json = await data.json()

              const NewObj = {
                  CurrentData : json.current,
                  ForecastData : json.daily
              }
              res.json(NewObj)

          })
          .catch( (error) =>{
            //   console.log(error)
                var obj={
                    err : "Enter a Valid Location"
                }
                res.json(obj)
          }) 
})



module.exports= router;
var express= require("express");
var router = express.Router();
var axios = require("axios")
var fetch = require("node-fetch");
var secret = require("../../secret/secretFile")

router.get("/",function(req,res){    
    res.render("home");    
})


router.get('/geocode/:location', async function(req, res){
    
    const location = req.params.location
    var encodedAddress = encodeURIComponent(location);
    var apikey1 = secret.openCageData 

    var apiURL = "https://api.opencagedata.com/geocode/v1/json"
    var reqURL = apiURL 
                + "?"
                + "q=" + encodedAddress
                + "&key=" + apikey1
                + '&pretty=1'
                + '&no_annotations=1';

    await axios.get(reqURL)
          .then( async function(response){
              const a= response.data.results[0].geometry
              const apikey2 = secret.openWeatherMap   

              reqWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + a.lat + '&lon=' + a.lng  + '&units=' + 'metric'+ '&appid=' + apikey2
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
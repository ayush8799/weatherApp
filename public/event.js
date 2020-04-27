

var button = document.querySelector('.button')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var currentWeather = document.querySelector('.currentWeather')
var forecastWeather =document.querySelector('.forecastWeather')
var i= document.querySelector('.input')

button.addEventListener('click',async function(){
      
    const cityName = city.value
    const countryName = country.value

    const location = cityName + ','+ countryName
    const geoCordURL = `/geocode/${location}`
    
    await axios.get(geoCordURL)
            .then(function(response){
    
                //console.log(response.data)
                if(response.data.err === "Enter a Valid Location") alert(response.data.err)
                else{
                    //console.log(response.data)
                    i.classList.remove('marg')
                    currentWeather.classList.remove('hide')
                    currentWeather.classList.add('show')
                    forecastWeather.classList.remove('hide')
                    forecastWeather.classList.add('show')
                    Display(response.data.CurrentData)
                    displayForecast(response.data.ForecastData)
                }
            })
            .catch((error)=>{
                //console.log(error)
            })

})

function Display(response){

    var temp = document.querySelector('.temp')
    var humidity = document.querySelector('.humidity')
    var precipitation = document.querySelector('.precipitation')
    var desc = document.querySelector('.desc')
    var date = document.querySelector('.Date')

    temp.textContent = response.temp
    humidity.textContent = response.humidity
    precipitation.textContent = response.clouds
    desc.textContent = response.weather[0].description
    date.textContent =changeTimeStamp(response.dt)

}

function changeTimeStamp(timeStamp){
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var localDate = new Date( timeStamp*1000);
    var year = localDate.getFullYear()
    var month = months_arr[localDate.getMonth()];
    var day = localDate.getDate()

    var convdataTime = day+' '+month+', '+year
    return convdataTime
}

function displayForecast(response){

var Day = document.getElementsByClassName('Day')

    for(var i=0;i<4;i++){
        var d = Day[i].querySelector('.DayF')
        var t = Day[i].querySelector('.TemperatureF')
        var h = Day[i].querySelector('.humidityF')
        var p = Day[i].querySelector('.precipitationF')
        
        d.textContent = changeTimeStamp(response[i+1].dt)
        t.textContent = response[i+1].temp.day
        h.textContent = response[i+1].humidity
        p.textContent = response[i+1].clouds
        
    }
}
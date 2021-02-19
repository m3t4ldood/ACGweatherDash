/* ADD API KEY HERE*/
// APP CONSTANTS AND VARS
const KELVIN = 273;
// API KEY
const key = "0e1fdd775b88f31c074e92ab421cc3df"

function getWeather(cityName){
    let city = cityName
    // if(!city){
        city = document.getElementById("searchval").value
    // }
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
    fetch(api) 
    .then( function(response){
        let data = response.json();
        return data;
    })

    .then( function(data){
        var forecast = document.getElementById("forecast")
        var card = document.createElement("div")
        card.classList.add("card")
        var cardBody = document.createElement("div")
        cardBody.classList.add("card-body")
        var title = document.createElement("h3")
        title.classList.add("card-title")
        title.textContent = data.name
        var temp = document.createElement("p")
        temp.classList.add("card-text")
        temp.textContent = "temp: "+Math.floor(data.main.temp - KELVIN);
        var image = document.createElement("img")
        image.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`)

        title.appendChild(image)
        cardBody.appendChild(title)
        cardBody.appendChild(temp)
        card.appendChild(cardBody)
        forecast.appendChild(card)
    })
}
const notificationElement = document.querySelector(".notification");
const iconElement = document.querySelector(".weatherIcon");
const tempElement = document.querySelector(".temperatureValue p");
const descElement = document.querySelector(".temperatureDescription");
const locationElement = document.querySelector(".location p");
/*const weather = {
   temperature : {
       value : 18,
       unit : "celsius"
   },
   description : "few clouds",
   iconId : "01d",
   city : "London",
   country : "GB"
};*/
//  getCurrentPosition(setPosition, error );
//  setPosition( position )
//     position.coords.latitude
//     position.coords.longitude
    
//  error(error)
//  error.message
    
// if("geolocation" in navigator){
//     navigator.geolocation.getCurrentPosition( setPosition, showError );
// }else{
//     notificationElement.style.display = "block";
//     notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>"
// }

function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML=`<p> ${error.message} </p>`;
}

// tempElement.addEventListener("click", function(){
//     if (weather.temperature.value === undefined) return;
//     if (weather.temperature.unit === "celsius" ){
//        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
//        fahrenheit = Math.floor(fahrenheit);
//        tempElement.innerHTML = `${fahrenheit}° <span>F</span>`;
//        weather.temperature.unit = "fahrenheit";
       
//     }else{
//         tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
//         weather.temperature.unit = "celsius";
//     }
// });

function celsiusToFahrenheit( temperature ){
    /* google how to convert celsius to fahrenheit */
    return ( temperature * 9/5 ) + 32;
}

// function displayWeather(weather){
// iconElement.innerHTML = 
//  `<img src="icons/${weather.iconId}.png"/>`;
 
// tempElement.innerHTML = 
//  `${weather.temperature.value} ° <span>C</span>`;
 
// descElement.innerHTML =
//  `weather.description`;
 
// locationElement.innerHTML = 
// `${weather.city}, ${weather.country}`;
// }
document.getElementById("searchbtn").onclick=getWeather
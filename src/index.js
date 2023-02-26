/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80,
  },
  tokyo: {
    temp: 17.3,
    humidity: 50,
  },
  lisbon: {
    temp: 30.2,
    humidity: 20,
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100,
  },
  oslo: {
    temp: -5,
    humidity: 20,
  },
};

function degreesF(degreesC) {
  let tempF = (degreesC * 9) / 5 + 32;
  return Math.ceil(tempF);
}

let enteredCity = prompt("Enter a city");
let city = enteredCity.toLowerCase().trim();
//console.log(weather[city]);

if (weather[city]) {
  alert(
    `It is currently ${Math.ceil(weather[city].temp)}℃ (${degreesF(
      weather[city].temp
    )} ℉) in ${city} with a humidity of ${weather[city].humidity}%`
  );
} else {
  alert(
    "Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" +
      enteredCity
  );
}*/

let now = new Date();
let dayNumber = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dayNumber];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentDate = document.querySelector("#current-date");

function showDayAndTime(day, hours, minutes) {
  currentDate.innerHTML = `${day} ${hours}:${minutes}`;
}
showDayAndTime(day, hours, minutes);

function showSearchedCity(event) {
  event.preventDefault();
  let enteredCity = document.querySelector("#search-input");
  console.log(`Entered value is ${enteredCity.value}`);
  let city = document.querySelector(".searched-city h2");
  city.innerHTML = `${enteredCity.value}`;
}

let searchTrigger = document.querySelector("#search-button");
searchTrigger.addEventListener("click", showSearchedCity);

//current weather for searched city
function showTemperature(event) {
  event.preventDefault();
  let apiKey = "32af3cb3257ed5619525cccb786ab31a";
  let enteredCity = document.querySelector("#search-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showActualParameters);
}

searchTrigger.addEventListener("click", showTemperature);

function showActualParameters(response) {
  console.log(response);

  let mainIconElement = document.querySelector("#main-icon");
  let iconCode = response.data.weather[0].icon;
  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );
  /*let currentDayIconElement = document.querySelector(".chosen-weather img");
  currentDayIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );*/

  let temperatureElement = document.querySelector("#degree");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  /*let currentDegreeDay = document.querySelector(".chosen-weather h5");
  currentDegreeDay.innerHTML = ` ${Math.round(response.data.main.temp)} ℃`;*/

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let humidityParameter = document.querySelector("#humidity");
  humidityParameter.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windParameter = document.querySelector("#wind");
  windParameter.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

function displayDefaultCityParam(city) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
  let apiKey = "32af3cb3257ed5619525cccb786ab31a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showActualParameters);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempFahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = tempFahrenheit;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector(".fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayDefaultCityParam("Warsaw");

//
//
//temperature for current location
function showGeolocation(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "32af3cb3257ed5619525cccb786ab31a";
  let apiUrlWithGeolocationParam = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlWithGeolocationParam).then(showCurrentCityAndTemp);
}
function showCurrentCityAndTemp(response) {
  console.log(response);
  let cityByGeolocation = document.querySelector(".searched-city h2");
  cityByGeolocation.innerHTML = `${response.data.name}`;
  let currentCityTemp = document.querySelector("#degree");
  currentCityTemp.innerHTML = Math.round(response.data.main.temp);
}

function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showGeolocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", showCurrentCity);

//forecast
function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = ``;
  forecastHtml = `<div class="row">`;

  let days = ["Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
            <div class="col-2">
              <div>
                <h5>${day}</h5>
                <div class="daily-forecast">
                  <img src="images/snow_light.png"/>
                </div>
              <div class="weather-forecast-temp">  
                <span class="weather-forecast-temp-max"> 18°</span> 
                <span class="weather-forecast-temp-min">12°</span>
              </div>
              </div>
              </div>`;
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

showForecast();

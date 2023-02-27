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

//
//
//current weather for searched city
function showTemperature(event) {
  event.preventDefault();
  let apiKey = "32af3cb3257ed5619525cccb786ab31a";
  let enteredCity = document.querySelector("#search-input");
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${enteredCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showActualParameters);
}

searchTrigger.addEventListener("click", showTemperature);

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2ff29bed3181c3526c35cc5408037f85";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
  console.log(apiUrl);
}

function showActualParameters(response) {
  console.log(response);

  let mainIconElement = document.querySelector("#main-icon");
  let iconCode = response.data.weather[0].icon;
  mainIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );

  let temperatureElement = document.querySelector("#degree");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].description}`;

  let humidityParameter = document.querySelector("#humidity");
  humidityParameter.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windParameter = document.querySelector("#wind");
  windParameter.innerHTML = `Wind: ${response.data.wind.speed} km/h`;

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  getForecast(response.data.coord);
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

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  console.log(days[day]);
  return days[day];
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = ``;
  forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      console.log(forecastDay.dt);
      let day = formatDay(forecastDay.dt);
      forecastHtml =
        forecastHtml +
        `
            <div class="col">
              <div>
                <h5>${day}</h5>
                <div class="forecast-icon">
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"/>
                </div>
                <div class="weather-forecast-temp">  
                  <span class="weather-forecast-temp-max"> ${Math.round(
                    forecastDay.temp.max
                  )}°</span> 
                  <span class="weather-forecast-temp-min">${Math.round(
                    forecastDay.temp.min
                  )}°</span>
                </div>
              </div>
            </div>`;
    }
  });

  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

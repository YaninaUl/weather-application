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
let minutes = now.getMinutes();
let currentDate = document.querySelector("#current-date");

function showDayAndTime(day, hours, minutes) {
  if (minutes < 10) {
    currentDate.innerHTML = `${day} ${hours}:0${minutes}`;
  } else {
    currentDate.innerHTML = `${day} ${hours}:${minutes}`;
  }
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

/*let degreesC = 17;
function fahrenheitCalculation(event) {
  event.preventDefault();
  let tempF = Math.round((degreesC * 9) / 5 + 32);
  let degree = document.querySelector("#degree");
  degree.innerHTML = tempF;
}

function celsiusCalculation(event) {
  event.preventDefault();
  let degree = document.querySelector("#degree");
  degree.innerHTML = degreesC;
}

let fahrenheitMeasure = document.querySelector(".fahrenheit");
fahrenheitMeasure.addEventListener("click", fahrenheitCalculation);

let celsiusMeasure = document.querySelector(".celsius");
celsiusMeasure.addEventListener("click", celsiusCalculation);*/

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

  let currentDegree = document.querySelector("#degree");
  currentDegree.innerHTML = Math.round(response.data.main.temp);

  let currentDegreeDay = document.querySelector(".chosen-weather h5");
  currentDegreeDay.innerHTML = ` ${Math.round(response.data.main.temp)} ℃`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${response.data.weather[0].main}`;

  let humidityParameter = document.querySelector("#humidity");
  humidityParameter.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let windParameter = document.querySelector("#wind");
  windParameter.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
}

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

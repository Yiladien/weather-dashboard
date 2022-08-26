const apiKey = "b52fe77bfab081f7e17c056abfa18bdc";

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var cityTempEl = document.querySelector("#city-temp");
var cityWindEl = document.querySelector("#city-wind");
var cityHumidityEl = document.querySelector("#city-humidity");
var cityUviEl = document.querySelector("#city-uvi");

var getWeather = function (cityname) {
  var apiCoordsUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=" +
    apiKey;

  //   console.log(apiCoordsUrl);

  // make a request to the url
  fetch(apiCoordsUrl)
    .then(function (response) {
      // request was successful
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data[0]);
          lon = data[0].lon;
          lat = data[0].lat;

          var apiWeatherUrl =
            "https://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=" +
            apiKey;
          console.log(apiWeatherUrl);

          fetch(apiWeatherUrl).then(function (response) {
            // request was successful
            if (response.ok) {
              response.json().then(function (data) {
                console.log(data);
                var temp = data.temp;
                var wind = data.wind_speed;
                var humidity = data.humidity;
                var uvi = data.uvi;

                console.log(data.temp);

                displayWeather(temp, wind, humidity, uvi);
              });
            } else {
              alert("Error: City not found");
            }
          });
        });
      } else {
        alert("Error: City not found");
      }
    })
    .catch(function (error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to Weather Data");
    });
};

var displayWeather = function (temp, wind, humidity, uvi) {
  cityTempEl.textContent = temp;
  cityWindEl.textContent = wind;
  cityHumidityEl.textContent = humidity;
  cityUviEl.textContent = uvi;
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  // get value from input element
  var cityname = cityInputEl.value.trim();

  if (cityname) {
    getWeather(cityname);
    cityInputEl.value = "";
  } else {
    alert("Please enter a City");
  }
};

userFormEl.addEventListener("submit", formSubmitHandler);

// getWeather();

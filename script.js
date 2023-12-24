const apiKey = "5fd751f40c1b3bbb7e2357e28efa52e1"; // Replace with your API key
const searchButton = document.getElementById("search-btn");
const locationInput = document.getElementById("location");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherImage = document.getElementById("weather-img");

searchButton.addEventListener("click", () => {
  const city = locationInput.value;
  if (city) {
    fetchWeather(city);
  }
});

function fetchWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      cityName.textContent = data.name;
      wind.textContent = `${data.wind.speed} km/h`;
      humidity.textContent = `${data.main.humidity} %`;
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      if (data.weather[0].main == "Clear") {
        weatherImage.src = "./images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherImage.src = "./images/rain.png";
      } else if (data.weather[0].main == "Clouds") {
        weatherImage.src = "./images/clouds.png";
      } else if (data.weather[0].main == "Snow") {
        weatherImage.src = "./images/snow.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherImage.src = "./images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherImage.src = "./images/mist.png";
      }
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      cityName.textContent = "City not found";
      temperature.textContent = "";
    });
}

window.addEventListener("load", () => {
  const defaultCity = "Rabat";
  locationInput.value = defaultCity; // Set the input field to "Rabat"
  fetchWeather(defaultCity); // Fetch weather data for Rabat
});

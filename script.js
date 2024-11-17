const apiKey = "0e1fdd775b88f31c074e92ab421cc3df";

// DOM Elements
const searchInput = document.getElementById("searchval");
const searchButton = document.getElementById("searchbtn");
const forecastContainer = document.getElementById("forecast");
const fiveDayContainer = document.getElementById("5day");
const oldSearchList = document.getElementById("old-search");

// Event Listeners
searchButton.addEventListener("click", handleSearch);

// Search button handler
function handleSearch() {
  const city = searchInput.value.trim();
  if (!city) return;

  fetchWeather(city);
  saveSearch(city);
  renderSearchHistory();
}

// Fetch weather data
async function fetchWeather(city) {
  try {
    const [weatherData, forecastData] = await Promise.all([
      fetchData(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      ),
      fetchData(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      ),
    ]);

    displayCurrentWeather(weatherData);
    displayFiveDayForecast(forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Could not retrieve weather data. Please check the city name.");
  }
}

// Fetch helper function
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return response.json();
}

// Display current weather
function displayCurrentWeather({ name, weather, main, wind }) {
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const date = new Date().toLocaleDateString();

  forecastContainer.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">${name} (${date})</h3>
        <img src="${weatherIcon}" alt="${weather[0].description}" />
        <p>Temperature: ${main.temp}°C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
      </div>
    </div>
  `;
}

// Display 5-day forecast
function displayFiveDayForecast({ list }) {
  const dailyForecasts = list.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  fiveDayContainer.innerHTML = dailyForecasts
    .map(({ dt_txt, weather, main }) => {
      const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      return `
        <div class="col-md-2 card text-center m-2 p-2">
          <p><strong>${new Date(dt_txt).toLocaleDateString()}</strong></p>
          <img src="${weatherIcon}" alt="${weather[0].description}" />
          <p>Temp: ${main.temp}°C</p>
          <p>Humidity: ${main.humidity}%</p>
        </div>
      `;
    })
    .join("");
}

// Save city to local storage
function saveSearch(city) {
  const searches = getSearchHistory();
  if (!searches.includes(city)) {
    searches.push(city);
    localStorage.setItem("weatherSearches", JSON.stringify(searches));
  }
}

// Render search history
function renderSearchHistory() {
  const searches = getSearchHistory();
  oldSearchList.innerHTML = searches
    .map(
      (city) => `
        <li class="list-group-item" onclick="fetchWeather('${city}')">
          ${city}
        </li>
      `
    )
    .join("");
}

// Helper to get search history from localStorage
function getSearchHistory() {
  return JSON.parse(localStorage.getItem("weatherSearches")) || [];
}

// Initialize search history on page load
renderSearchHistory();

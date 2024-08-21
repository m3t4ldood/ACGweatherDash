document.getElementById('searchbtn').addEventListener('click', function() {
    const city = document.getElementById('searchval').value.trim();
    if (city) {
        getWeather(city);
        saveSearch(city);
    }
});

function getWeather(city) {
    const apiKey = '0e1fdd775b88f31c074e92ab421cc3df'; // Replace with your OpenWeatherMap API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayCurrentWeather(data);
                getFiveDayForecast(city, apiKey);
            } else {
                alert('City not found! Please try again.');
            }
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function getFiveDayForecast(city, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => displayFiveDayForecast(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

function displayCurrentWeather(data) {
    const forecastDiv = document.getElementById('forecast');
    forecastDiv.innerHTML = `
        <h3>${data.name} (${new Date().toLocaleDateString()})</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayFiveDayForecast(data) {
    const fiveDayDiv = document.getElementById('5day');
    fiveDayDiv.innerHTML = '';

    // Filter and display the forecast data for 12:00 PM each day
    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00'));
    forecast.forEach(day => {
        const date = new Date(day.dt_txt).toLocaleDateString();
        fiveDayDiv.innerHTML += `
            <div class="col-md-2 card text-white bg-primary mb-3">
                <div class="card-body">
                    <h6 class="card-title">${date}</h6>
                    <p class="card-text">Temp: ${day.main.temp} °C</p>
                    <p class="card-text">Humidity: ${day.main.humidity}%</p>
                </div>
            </div>
        `;
    });
}

function saveSearch(city) {
    let oldSearch = JSON.parse(localStorage.getItem('cities')) || [];
    if (!oldSearch.includes(city)) {
        oldSearch.push(city);
        localStorage.setItem('cities', JSON.stringify(oldSearch));
        updateSearchHistory();
    }
}

function updateSearchHistory() {
    const oldSearchList = document.getElementById('old-search');
    oldSearchList.innerHTML = '';
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(city => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = city;
        li.addEventListener('click', function() {
            getWeather(city);
        });
        oldSearchList.appendChild(li);
    });
}

// Initialize search history on page load
updateSearchHistory();

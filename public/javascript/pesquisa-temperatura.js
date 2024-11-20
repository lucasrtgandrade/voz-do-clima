const apiKey = "73cedfc0d014fb215c0555e777330150";
const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector("#search");
const locationButton = document.querySelector(".location-btn");
const currentWeatherDiv = document.querySelector(".current-weather");
const weatherCardsDiv = document.querySelector(".weather-cards");


const createWeatherCard = (cityName, weatherItem, index, minTemp = null, maxTemp = null) => {
    if (index === 0) {
        return `<div class="details">
                        <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                        <h4>Temperature: ${(weatherItem.main.temp - 273.15).toFixed(0)}ºC</h4>
                        <h4>Vento: ${weatherItem.wind.speed} M/S</h4>
                        <h4>Umidade: ${weatherItem.main.humidity}%</h4>
                    </div>
                    <div class="icon">
                        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@4x.png" alt="weather-icon">
                        <h4>${weatherItem.weather[0].description}</h4>
                    </div>`;
    } else {
        // Previsão
        return `<li class="cards">
                        <h2>(${weatherItem.dt_txt.split(" ")[0]})</h2>
                        <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" alt="weather-icon">
                        <h4>Max: ${maxTemp.toFixed(2)}ºC</h4><h4>Min: ${minTemp.toFixed(0)}ºC</h4>
                    </li>`;
    }
}

const getWeatherDetails = (cityName, lat, lon) => {
    const CURRENT_WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt`;
    const FORECAST_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=pt`;

    // Clima atual
    fetch(CURRENT_WEATHER_API_URL)
        .then(res => res.json())
        .then(currentData => {
            const tempNow = (currentData.main.temp - 273.15).toFixed(0);
            const windNow = currentData.wind.speed;
            const humidityNow = currentData.main.humidity;
            const descriptionNow = currentData.weather[0].description;
            const iconNow = currentData.weather[0].icon;

            currentWeatherDiv.innerHTML = `
                    <div class="details">
                        <h2>${cityName}</h2>
                        <h4 class="card__text" >Temperatura: ${tempNow}ºC</h4>
                        <h4 class="card__text" >Vento: ${windNow} M/S</h4>
                        <h4 class="card__text" >Umidade: ${humidityNow}%</h4>
                        <h4 class="card__text">${descriptionNow}</h4>
                    </div>
                    <div class="icon">
                        <img src="https://openweathermap.org/img/wn/${iconNow}@4x.png" alt="weather-icon">
                    </div>`;
        })
        .catch(() => {
            alert("An error occurred while fetching the current weather!");
        });

    // Previsão dos próximos 5 dias
    fetch(FORECAST_API_URL)
        .then(res => res.json())
        .then(data => {
            console.log("Previsão dos Próximos 5 Dias:", data);
            const forecastByDate = {};

            data.list.forEach(forecast => {
                const forecastDate = forecast.dt_txt.split(" ")[0];

                // Verifica se o dia já foi adicionado e atualiza mínimas e máximas
                if (!forecastByDate[forecastDate]) {
                    forecastByDate[forecastDate] = {
                        min: forecast.main.temp,
                        max: forecast.main.temp,
                        icon: forecast.weather[0].icon,
                        description: forecast.weather[0].description,
                        wind: forecast.wind.speed,
                        humidity: forecast.main.humidity
                    };
                } else {
                    forecastByDate[forecastDate].min = Math.min(forecastByDate[forecastDate].min, forecast.main.temp);
                    forecastByDate[forecastDate].max = Math.max(forecastByDate[forecastDate].max, forecast.main.temp);
                }
            });


            weatherCardsDiv.innerHTML = "";
            const dates = Object.keys(forecastByDate).slice(1, 4);

            dates.forEach(date => {
                const forecast = forecastByDate[date];
                const minTemp = (forecast.min - 273.15).toFixed(1);
                const maxTemp = (forecast.max - 273.15).toFixed(0);
                const dayOfWeek = new Date(date).toLocaleDateString('pt-BR', { weekday: 'short' });

                weatherCardsDiv.insertAdjacentHTML("beforeend", `
                        <li class="cards">
                            <h2 class="card__text">${dayOfWeek}</h2>
                            <img src="https://openweathermap.org/img/wn/${forecast.icon}@2x.png" alt="weather-icon">
                            <div class="min-max__container">
                                <p class="card__text">${maxTemp}ºC</p>
                                <p class="card__text--min">${minTemp}ºC</p>
                            </div>

                        </li>`);
            });
        })
        .catch((error) => {
            console.error("Forecast error:", error);
            alert("An error occurred while fetching the forecast!");
        });
};

// Funções

const getCityCoordinates = async (city) => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    const GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=&appid=${apiKey}`;

    fetch(GEOCODING_API_URL)
        .then(res => res.json())
        .then(data => {
            if (!data.length) return alert(`No coordinates found for ${cityName}`);
            const { name, lat, lon } = data[0];
            getWeatherDetails(name, lat, lon);
        })
        .catch(() => {
            alert("An error occurred while fetching the coordinates!");
        });
};

// Eventos

const getUserCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            const REVERSE_GEOCODING_URL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=&appid=${apiKey}`;

            fetch(REVERSE_GEOCODING_URL)
                .then(res => res.json())
                .then(data => {
                    const { name } = data[0];
                    getWeatherDetails(name, latitude, longitude);
                })
                .catch(() => {
                    alert("An error occurred while fetching the coordinates!");
                });

        },

        error => {
            if (error.code === error.PERMISSION_DENIED) {
                alert("Geolocation request denied.")
            }
        }
    );
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getCityCoordinates(cityInput.value);
});

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        getCityCoordinates(e.target.value);
    }
});

locationButton.addEventListener("click", getUserCoordinates);

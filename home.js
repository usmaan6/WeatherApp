function getWeather() {
    // Get user input
    const zipcode = document.getElementById("zipcode").value;
    const units = document.getElementById("units").value;

    // Reset validation styles
    document.getElementById("zipcode").classList.remove("is-invalid");

    // Validate zipcode
    if (!/^\d{5}$/.test(zipcode)) {
        // Display validation error
        document.getElementById("zipcode").classList.add("is-invalid");
        return;
    }

    // Replace with your Open Weather Map API key
    const apiKey = "b226485852a5f62eaf5047e78b108f19";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=${units}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&units=${units}&appid=${apiKey}`;

    // Make API call
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Update Current Conditions
            const currentConditions = document.getElementById("currentConditions");
            currentConditions.innerHTML = `
                <div class="col-md-12 text-center">
                    <h3>Current Conditions in ${data.name}</h3>
                </div>
                <div class="col-md-6">
                    <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
                    <p>${data.weather[0].description}</p>
                </div>
                <div class="col-md-6">
                    <p>Temperature: ${data.main.temp}°${units === 'metric' ? 'C' : 'F'}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind: ${data.wind.speed} ${units === 'metric' ? 'm/s' : 'mph'}</p>
                </div>
            `;

            // Example: Display result
            currentConditions.style.display = "block";
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            // Handle errors and display appropriate messages
        });

    // TODO: Implement logic to fetch 5-day forecast and update the fiveDayForecast div


    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            // Update Five Day Forecast
            const fiveDayForecast = document.getElementById("fiveDayForecast");
            fiveDayForecast.innerHTML = `<div class="col-md-12 text-center"><h3>Five Day Forecast</h3></div>`;

            // Iterate through the forecast data and display each day
            for (let i = 0; i < data.list.length; i += 8) {
                const forecast = data.list[i];
                const date = new Date(forecast.dt * 1000);
                const formattedDate = `${date.getDate()} ${date.toLocaleString('en-us', { month: 'long' })}`;

                fiveDayForecast.innerHTML += `
                    <div class="col-md-2">
                        <p>${formattedDate}</p>
                        <img src="http://openweathermap.org/img/w/${forecast.weather[0].icon}.png" alt="${forecast.weather[0].description}">
                        <p>High: ${forecast.main.temp_max}°${units === 'metric' ? 'C' : 'F'}</p>
                        <p>Low: ${forecast.main.temp_min}°${units === 'metric' ? 'C' : 'F'}</p>
                    </div>
                `;
            }

            // Display Five Day Forecast
            fiveDayForecast.style.display = "flex";
        })
        .catch(error => {
            console.error("Error fetching forecast:", error);
            // Handle errors and display appropriate messages
        });

}

// Add an event listener for form submission
document.getElementById("weatherForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    getWeather();
});

document.addEventListener('DOMContentLoaded', () => {
    // Default location (Tokyo)
    getWeatherData(35.6895, 139.6917, 'Tokyo');
});

// Function to get weather data based on latitude, longitude, and city name
function getWeatherData(lat, lon, city) {
    const weatherDataDiv = document.getElementById('weather-data');
    weatherDataDiv.innerHTML = 'Loading weather data...';

    // Fetch weather data from the Open-Meteo API
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
        .then(response => response.json())
        .then(data => {
            const temperature = data.current_weather.temperature;
            const windspeed = data.current_weather.windspeed;

            // Display the data for the selected city
            weatherDataDiv.innerHTML = `
                <h2>Current Weather in ${city}:</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windspeed} km/h</p>
            `;
        })
        .catch(error => {
            weatherDataDiv.innerHTML = 'Error fetching weather data.';
            console.error('Error:', error);
        });
}

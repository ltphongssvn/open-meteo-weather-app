document.addEventListener('DOMContentLoaded', () => {
    // Default location (Tokyo)
    getWeatherForCity('Tokyo');
});

// Function to fetch geolocation data from OpenCage API
async function getCoordinates(city) {
    try {
        // Fetch data from OpenCage API using the city name
        const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`);
        const data = await response.json();

        if (data.results.length === 0) {
            throw new Error('No results found for the provided city');
        }

        // Extract latitude and longitude from the API response
        const latitude = data.results[0].geometry.lat;
        const longitude = data.results[0].geometry.lng;

        // Return the coordinates
        return { latitude, longitude };
    } catch (error) {
        console.error('Error fetching geolocation data:', error);
        return null; // Return null in case of an error
    }
}

// Function to get weather data for a city
async function getWeatherForCity(city) {
    const weatherDataDiv = document.getElementById('weather-data');
    weatherDataDiv.innerHTML = 'Fetching geolocation data...';

    // Get the coordinates for the city using the geocoding API
    const coordinates = await getCoordinates(city);

    if (!coordinates) {
        weatherDataDiv.innerHTML = 'Unable to fetch geolocation data.';
        return;
    }

    const { latitude, longitude } = coordinates;

    // Fetch weather data from Open-Meteo API
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await response.json();

        const temperature = weatherData.current_weather.temperature;
        const windspeed = weatherData.current_weather.windspeed;

        // Display the weather data
        weatherDataDiv.innerHTML = `
            <h2>Current Weather in ${city}:</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Wind Speed: ${windspeed} km/h</p>
        `;
    } catch (error) {
        weatherDataDiv.innerHTML = 'Error fetching weather data.';
        console.error('Error:', error);
    }
}

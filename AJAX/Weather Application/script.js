document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const cityName = document.getElementById('cityName');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const conditions = document.getElementById('conditions');

    searchBtn.addEventListener('click', () => {
        const city = cityInput.value.trim().toLowerCase();
        if (city) {
            fetchWeatherData(city);
        } else {
            alert('Please enter a city name');
        }
    });

    function fetchWeatherData(city) {
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();
        
        // Configure the request
        xhr.open('GET', 'weatherData.json', true);
        
        // Set up the callback function
        xhr.onload = function() {
            if (xhr.status === 200) {
                try {
                    const weatherData = JSON.parse(xhr.responseText);
                    
                    if (weatherData[city]) {
                        // Update the UI with the weather data
                        cityName.textContent = city.charAt(0).toUpperCase() + city.slice(1);
                        temperature.textContent = weatherData[city].temperature;
                        humidity.textContent = weatherData[city].humidity;
                        conditions.textContent = weatherData[city].conditions;
                    } else {
                        alert('City not found in our database');
                        resetWeatherDisplay();
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    alert('Error processing weather data');
                    resetWeatherDisplay();
                }
            } else {
                console.error('Error fetching weather data:', xhr.status);
                alert('Error fetching weather data');
                resetWeatherDisplay();
            }
        };
        
        // Handle network errors
        xhr.onerror = function() {
            console.error('Network error occurred');
            alert('Network error occurred');
            resetWeatherDisplay();
        };
        
        // Send the request
        xhr.send();
    }

    function resetWeatherDisplay() {
        cityName.textContent = '-';
        temperature.textContent = '-';
        humidity.textContent = '-';
        conditions.textContent = '-';
    }
}); 
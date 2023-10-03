const apiKey = "d4034aaf0055f7c6f88af58b17c65c9e";
let unit = "imperial"; // default unit
const cities = ["New York", "Los Angeles", "Houston", "Phoenix"]

function autocomplete() {
    const input = document.getElementById("cityInput").value;
    let suggestions = [];

    // Filter the cities array based on the input 
    if (input.length > 0) {
        suggestions = cities.filter(city => city.toLowerCase().startsWith(input.toLowerCase()));
    }

    // Generate the HTML for the suggestions 
    let suggestionHTML = '';
    suggestions.forEach(city => {
        suggestionHTML += `<div onclick="selectCity('${city}')">${city}</div>`;
    })

    // Display the suggestions
    document.getElementById("autocompleteList").innerHTML = suggestionHTML;
}

function selectCity(city) {
    document.getElementById("cityInput").value = city; 
    document.getElementById("autocompleteList").innerHTML = '';

    // Optionally, fetch the weather for the selected city 
    fetchWeather(); 
}


function fetchWeather(unit = "imperial") {
    const city = document.getElementById("cityInput").value || "Phoenix";

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
    
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // Extract and display data here
        document.getElementById("city").innerText = data.name;

        const unitSymbol = unit === "metric" ? "°C" : "°F";
        
        const roundedTemp = Math.round(data.main.temp)
        document.getElementById("temperature").innerText = `${roundedTemp}${unitSymbol}`;
        document.getElementById("condition").innerText = data.weather[0].description;
        document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    })
  
    .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById("city").innerText = "Error";
        document.getElementById("temperature").innerText = "";
        document.getElementById("condition").innerText = "Invalid city name or network error.";
        document.getElementById("icon").src = "";      
    });

}

    // add a listener event for the unit dropdown 
    document.getElementById("tempUnit").addEventListener("change", function() {
        
        const unit = this.value;
        fetchWeather(unit);
        fetchForecast(unit); 
})

function fetchForecast(unit = "imperial") {
    const city = document.getElementById("cityInput").value || "Phoenix";

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            // Handle forecast data here
            let forecastHTML = '';

            data.list.forEach((forecast,index) => {
                if (index % 8 === 0) {
                    // Only take on reading per day
                    const date = new Date(forecast.dt * 1000);
                    const day = date.toLocaleString('en-US', {weekday: 'long'});
                    const temperature = Math.round(forecast.main.temp); 
                    const unitSymbol = unit === "metric" ? "°C" : "°F";
                    const icon = forecast.weather[0].icon;
                    forecastHTML += 
                        `<div class="forecastItem">
                            <span class="forecastDay">${day}</span>
                            <img src="http://openweathermap.org/img/wn/${icon}.png" class="forecastIcon">
                            <span class="forecastTemp">${temperature}${unitSymbol}</span>
                        </div>`;
                }
            });
            document.getElementById("forecastContainer").innerHTML = forecastHTML;
        })

        //         new Date(forecast.dt * 1000): This converts the timestamp from seconds to milliseconds and creates a JavaScript Date object.
        // toLocaleString: This method converts the date to a string, and we specify that we want the weekday in long format (e.g., "Monday").

        .catch(error => {
            console.error("error fetching forecast data:", error)
        });
}

// add event listener for the auto complete
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("cityInput").addEventListener("input", autocomplete);
    console.log("event listener added")
})


// Initial fetch
fetchWeather(); 
fetchForecast();
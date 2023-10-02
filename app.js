const apiKey = "d4034aaf0055f7c6f88af58b17c65c9e";
let unit = "imperial"; // default unit



function fetchWeather(unit = "imperial") {
    const city = document.getElementById("cityInput").value || "Phoenix";

    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
    
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // Extract and display data here
        document.getElementById("city").innerText = data.name;

        const unitSymbol = unit === "metric" ? "°C" : "°F";
        
        document.getElementById("temperature").innerText = `${data.main.temp}${unitSymbol}`;
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
                    const temperature = forecast.main.temp; 
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

        .catch(error => {
            console.error("error fetching forecast data:", error)
        });
}



// Initial fetch
fetchWeather(); 
fetchForecast();
const apiKey = "d4034aaf0055f7c6f88af58b17c65c9e";
const city = "New York"; // We will change this later 
let unit = "imperial";



fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // Extract and display data here
        document.getElementById("city").innerText = data.name;
        document.getElementById("temperature").innerText = `${data.main.temp}°F`;
        document.getElementById("condition").innerText = data.weather[0].description;
        document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    })

    .catch(error => {
        console.error("Error fetching data:", error);
    });

function fetchWeather(unit = "imperial") {
    const city = document.getElementById("cityInput").value || "New York";

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

    // add a listener event for the dropdown 
    document.getElementById("tempUnit").addEventListener("change", function() {
        console.log("change");
        const unit = this.value;
        fetchWeather(unit);
})

// Initial fetchfetchWeather(); 
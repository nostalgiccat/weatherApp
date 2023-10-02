const apiKey = "d4034aaf0055f7c6f88af58b17c65c9e";
const city = "New York"; // We will change this later

fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        // Extract and display data here
        document.getElementById("city").innerText = data.name;
        document.getElementById("temperature").innerText = `${data.main.temp}°C`;
        document.getElementById("condition").innetText = data.weather[0].description;
        document.getElementById("icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    })

    .catch(error => {
        console.error("Error fetching data:", error);
    });


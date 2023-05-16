let weather = {
    apiKey: "92d81dd7891d2ea10cb124720c8f5a39",
    fetchWeather: function(city) {
        fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found for entered City.");
                    throw new Error("No weather found for entered City.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const da = new Date();
        const m = new Date();
        const d = new Date();
        const y = new Date();
        let day = days[da.getDay()];
        let month = months[m.getMonth()];
        document.getElementById("demoday").innerHTML = day;
        document.getElementById("demomonth").innerHTML = month;
        document.getElementById("demodate").innerHTML = d.getDate();
        document.getElementById("demoyear").innerHTML = y.getFullYear();
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        const { pressure } = data.main;

        document.querySelector(".city").innerText = name;

        const iconurl = document.querySelector(".iconurl");
        let url = "http://openweathermap.org/img/w/" + icon + ".png";
        iconurl.src = url
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".pressure").innerText = pressure + "    mbar";
        document.querySelector(".humidity").innerText = humidity + "    %";
        document.querySelector(".wind").innerText = speed + "    km/h";
        document.querySelector(".weather").classList.remove("loading");


    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);

    },
};
document.querySelector(".search button").addEventListener("click", function() {
    weather.search();

});
document
    .querySelector(".search-bar")
    .addEventListener("keyup", function(event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Kathmandu");

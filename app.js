function getWeather() {
  let lat;
  let long;
  let colors = {
    "01d": "lightred",
    "02d": "lightsalmon",
    "03d": "whitesmoke",
    "04d": "whitesmoke",
    "09d": "cadetblue",
    "10d": "cadetblue",
    "11d": "skyblue",
    "13d": "azure",
    "50d": "azure",

    "01n": "#9e6c83",
    "02n": "#9e6c83",
    "03n": "darkslategray",
    "04n": "darkslategray",
    "09n": "darkslategray",
    "10n": "darkslategray",
    "11n": "darkslategray",
    "13n": "darkslategray",
    "50n": "darkslategray"
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      let key = "6e2638f1219b34dd58ddc1ad96e458fa";
      let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { main } = data.weather[0];
          const { temp } = data.main;
          const { humidity } = data.main;
          const { speed } = data.wind;
          document.querySelector(".temp").innerHTML =
            (temp - 273.15).toFixed(1) + "°C";
          document.querySelector(".weather").innerHTML = main;
          document.querySelector(".place").innerHTML = data.name;
          document.querySelector(".humidity").innerHTML =
            "<img src = 'humidity.png' class = 'humid-icon'/>" + humidity + "%";
          document.querySelector(".windspeed").innerHTML =
            "<img src = 'wind-speed.png' class = 'humid-icon'/>" +
            speed +
            "m/s";
          document.querySelector(".icon").src =
            "http://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png";
          document
            .querySelector(":root")
            .style.setProperty(
              "--bg-color",
              colors[String(data.weather[0].icon)]
            );
          if (data.weather[0].icon.includes("n")) {
            document
              .querySelector(":root")
              .style.setProperty("--text-color", "white");
          }
        });
    }, showError);
  } else {
    document.querySelector(".place").innerHTML =
      "Location is not supported in this browser";
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.querySelector(".place").innerHTML =
        "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.querySelector(".place").innerHTML =
        "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.querySelector(".place").innerHTML =
        "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.querySelector(".place").innerHTML = "An unknown error occurred.";
      break;
    default:
      document.querySelector(".place").innerHTML = "An unknown error occurred.";
  }
}

getWeather();

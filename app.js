function getWeather() {
  let lat;
  let long;
  // let today = Date();
  // document.querySelector(".time").innerHTML = today.getTime();
  // document.querySelector(".day").innerHTML = today.getDay();
  // document.querySelector(".date").innerHTML = today.getDate();
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
          const { pressure } = data.main;
          const { speed } = data.wind;
          document.querySelector(".temp").innerHTML =
            (temp - 273.15).toFixed(1) + "°C";
          document.querySelector(".weather").innerHTML = main;
          document.querySelector(".place").innerHTML = data.name;
          document.querySelector(".humidity").innerHTML = humidity + "%";
          document.querySelector(".pressure").innerHTML = pressure + "Pa";
          document.querySelector(".windspeed").innerHTML = speed + "m/s";
          document.querySelector(".icon").src =
            "http://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png";
        });
    });
  }
}

getWeather();

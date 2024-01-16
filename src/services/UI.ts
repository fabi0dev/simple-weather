const getColorLinearBg = (main:string) => {
  if (main) {
    const d = new Date();

    switch (main) {
      case "Clear":
        if (d.getHours() >= 18 || d.getHours() < 6) {
          return ["#007bc5", "#004066"];
        } else {
          return ["#1baaff", "#0089d9"];
        }
      case "Thunderstorm" || "Rain":
        return ["#395aa7", "#2a3b64"];
      case "Drizzle":
        return ["#39728d", "#1f4a5e"];
      case "Clouds":
        return ["#6198fd", "#1a3870"];
      default:
        return ["#26a5d3", "#0f3c78"];
    }

  } else {
    return ["#26d3ba", "#0f5c78"];
  }
};

const getImgWeather = (main:string) => {
  let date = new Date();

  if (!main) {
    return require("@assets/images/cloudy.png");
  } else {
    switch (main) {
      case "Clear":
        if (date.getHours() >= 18 || date.getHours() <= 6) {
          return require("@assets/images/moon.png");
        } else {
          return require("@assets/images/daylight.png");
        }
      case "Thunderstorm":
        return require("@assets/images/ranny_thunderstorm.png");
      case "Drizzle":
        if (date.getHours() >= 18 || date.getHours() <= 6) {
          return require("@assets/images/couldy_rainy.png");
        } else {
          return require("@assets/images/couldy_rainy_light.png");
        }
      case "Rain":
        return require("@assets/images/cloudy_havyrain.png");
      case "Clouds":
        return require("@assets/images/cloudy.png");
    }
  }
};


const getImgWeatherAnimation = (wheather, wheatherCurrent) => {
  let date = new Date();
  let main = wheather.weather[0].main;

  if (wheatherCurrent == null) {
    return require("@assets/animations/weather-windy.json");
  } else {
    switch (main) {
      case "Clear":
        if (date.getHours() >= 18 || date.getHours() <= 6) {
          return require("@assets/animations/weather-night.json");
        } else {
          return require("@assets/animations/weather-sunny.json");
        }
      case "Thunderstorm":
        return require("@assets/animations/weather-storm.json");
      case "Drizzle":
        if (date.getHours() >= 18 || date.getHours() <= 6) {
          return require("@assets/animations/weather-rainynight.json");
        } else {
          return require("@assets/animations/weather-partly-shower.json");
        }
      case "Rain":
        return require("@assets/animations/weather-storm-rainy.json");
      case "Clouds":
        return require("@assets/animations/weather-windy.json");
      case "Snow":
        return require("@assets/animations/weather-snow.json");
      default:
        return require("@assets/animations/weather-windy.json");
    }
  }
};

export {
  getColorLinearBg,
  getImgWeather,
  getImgWeatherAnimation
}
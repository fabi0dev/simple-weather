const getColorLinearBg = (main) => {
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

const getImgWeather = (main) => {
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

export {
  getColorLinearBg,
  getImgWeather
}
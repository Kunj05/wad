function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");

  if (!city) return (result.innerHTML = "Please select a city!");
  result.innerHTML = "Fetching data...";

  fetch("data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const weather = data[city];
      result.innerHTML = weather
        ? `<b>Temperature:</b> ${weather.temp}<br><b>Humidity:</b> ${weather.humidity}<br><b>Condition:</b> ${weather.condition}`
        : "City data not found!";
    })
    .catch(() => {
      result.innerHTML = "Error fetching data.";
    });
}

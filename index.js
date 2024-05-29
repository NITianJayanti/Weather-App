const temperateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".search");
const form = document.querySelector("form");
let target = "Dhanbad";

const fetchData = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=15e509698f9847c491e84055242805&q=${target}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    const {
      current: {
        temp_c,
        condition: { text, icon },
      },
      location: { name, localtime },
    } = data;

    updateDom(temp_c, name, localtime, icon, text);
  } catch (error) {
    alert("Location not found");
  }
};

function updateDom(temperature, city, time, emoji, text) {
  temperateField.innerText = `${temperature}°C`;
  cityField.innerText = city;

  const [exactDate, exactTime] = time.split(" ");
  const dateTimeString = `${exactDate}T${exactTime}:00`; // Creating a valid ISO format
  const date = new Date(dateTimeString);
  const exactDay = date.getDay();

  dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} ${exactDate}`;
  emojiField.src = `https:${emoji}`;
  weatherField.innerText = text;
}

function getDayFullName(num) {
  switch (num) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Unknown";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  target = searchField.value;
  fetchData(target);
});

fetchData(target);

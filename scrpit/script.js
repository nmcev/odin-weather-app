const apiKey = 'ae39ae6f7f6d49bfbfa202043230607'
// getting all html element for content 
const mainTemperature = document.querySelector('.temp');
const cityName = document.querySelector('.cityName');
const countryName = document.querySelector('.small');
const weatherStatus = document.querySelector('.weather-status');
const weatherImage = document.querySelector('.weather-image');
const temperatures = document.querySelectorAll('.degree');
const time = document.querySelector('.time');

//getting user input value
const input = document.querySelector('input')
const submitBtn = document.querySelector('.submitBtn')

submitBtn.addEventListener('click', function () {
    let searchCity = input.value; //get the entered text from user
    if (searchCity == "mosul" || searchCity == "Mosul") {
        searchCity = "iraq mosul";
        getWeatherData(searchCity);
    } else if (searchCity == "erbil" || searchCity == "Erbil") {
        searchCity = "arbil"
        getWeatherData(searchCity);
    }
    else if (searchCity != '') {
        getWeatherData(searchCity)
    }
    input.value = ''
})

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`, { mode: "cors" })
        const data = await response.json();
        const cityTemp = data.current.temp_c
        const _cityName = data.location.name
        const _countryName = data.location.country
        const _imageSrc = data.current.condition.icon
        const _weatherStatus = data.current.condition.text
        const _time = data.location.localtime;
        const _feelLike = data.current.feelslike_c;
        const _windKph = data.current.wind_kph;
        const _pressure = data.current.pressure_in


        displayCityNameAndCountry(_cityName, _countryName)
        displayTemperatureInC(cityTemp);
        displayTime(_time);
        displayFeelLike(_feelLike);
        displayWeatherIcon(_imageSrc);
        displayWeatherStatus(_weatherStatus);
        displayWindKph(_windKph);
        displayPressure(_pressure);
        console.log(data);
    }
    catch (error) {
        alert('Error fetching data, please check your internet connection and API key.');
        console.error(error)

    }
}


// make a function for each one of element for UI using 
function displayCityNameAndCountry(_cityName, _countryName) {
    const small = document.createElement('small');
    small.textContent = _countryName;
    small.classList.add('small'); // Use classList.add to add the 'small' class
    cityName.textContent = ''; // Clear the existing content of cityName

    cityName.appendChild(document.createTextNode(_cityName + ", "));
    cityName.appendChild(small);
}


function displayTemperatureInC(_temp) {
    mainTemperature.textContent = `${_temp}°C`
}
function displayTime(_time) {
    time.style.fontWeight = "bold";
    time.textContent = 'Current Time: ' + _time
}

function displayFeelLike(_feelLike) {
    temperatures[0].textContent = "Feel like: " + _feelLike
}

function displayWeatherIcon(_imageSrc) {
    weatherImage.classList.add("weatherIcon")
    weatherImage.src = _imageSrc
}

function displayWeatherStatus(_weatherStatus) {
    weatherStatus.textContent = _weatherStatus
};
function displayWindKph(_windKph) {
    const windIcon = document.createElement('img');
    windIcon.src = "assets/weather-status/windy.svg";
    temperatures[1].innerHTML = '';
    temperatures[1].appendChild(windIcon);
    const windSpeedText = document.createElement('span');
    windSpeedText.classList.add('weather-span')
    windSpeedText.textContent = _windKph;
    temperatures[1].appendChild(windSpeedText);
}

function displayPressure(_pressure) {

    temperatures[2].textContent = `Pressure : ${_pressure}`;
}

function setInitialCity() {
    getWeatherData("moscow")
}
setInitialCity()
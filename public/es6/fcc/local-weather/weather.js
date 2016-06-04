$(document).ready(function () {
    ipFindMe();
});

let weatherCondition = {};
let ipLocation = {};
let tempKelvin;
let tempCelsius;
let tempFahrenheit;
let sunrise;
let sunset;
const currentTime = new Date();
const outputLocation = document.getElementsByClassName('location');
const outputCondition = document.getElementsByClassName('condition');
const outputTemp = document.getElementsByClassName('temp');

function weatherIcon() {
    sunrise = new Date(weatherCondition.sys.sunrise * 1000);
    sunset = new Date(weatherCondition.sys.sunset * 1000);

    if (currentTime >= sunrise && currentTime <= sunset) {
        $('i').removeClass().addClass(`wi wi-owm-day-${weatherCondition.weather[0].id}`);
    } else {
        $('i').removeClass().addClass(`wi wi-owm-night-${weatherCondition.weather[0].id}`);
    }
}

function getWeather(latitude, longitude) {
    const appid = '6284267c31e047d6c3e598d2db2566dd';
    const myXMLHttpRequest = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}`;

    myXMLHttpRequest.onreadystatechange = function () {
        if (myXMLHttpRequest.readyState === 4 && myXMLHttpRequest.status === 200) {
            weatherCondition = JSON.parse(myXMLHttpRequest.responseText);

            tempKelvin = weatherCondition.main.temp;
            tempCelsius = `${Math.round(tempKelvin - 273.15)} °C`;
            tempFahrenheit = `${Math.round((tempKelvin - 273.15) * 9 / 5 + 32)} °F`;

            weatherIcon();

            outputCondition[0].innerHTML = `<p>${weatherCondition.weather[0].description}</p>`;
            outputTemp[0].innerHTML = `<p>${tempCelsius}</p>`;
        }
    };

    myXMLHttpRequest.open('GET', url, true);
    myXMLHttpRequest.send();
}

function ipFindMe() {
    const myXMLHttpRequest = new XMLHttpRequest();
    const url = 'http://ip-api.com/json';

    myXMLHttpRequest.onreadystatechange = function () {
        if (myXMLHttpRequest.readyState === 4 && myXMLHttpRequest.status === 200) {
            ipLocation = JSON.parse(myXMLHttpRequest.responseText);

            outputLocation[0].innerHTML = `${ipLocation.city}, ${ipLocation.region}`;

            getWeather(ipLocation.lat, ipLocation.lon);
        }
    };

    myXMLHttpRequest.open('GET', url, true);
    myXMLHttpRequest.send();
}

let showFahrenheit = false;

function toggleTemp() {
    showFahrenheit = !showFahrenheit;
    if (showFahrenheit) {
        outputTemp[0].innerHTML = `<p>${tempFahrenheit}</p>`;
    } else {
        outputTemp[0].innerHTML = `<p>${tempCelsius}</p>`;
    }
}

$(document).ready(function() {
    console.log('ready!');
    ipFindMe();
    //geoFindMe();
});

//var x = document.getElementById("weather");
var weatherCondition = {};
    // {"coord": {"lon":-115.24,"lat":36.03},
    // "weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],
    // "base":"cmc stations",
    // "main":{"temp":52.22,"pressure":914.23,"humidity":78,"temp_min":52.22,"temp_max":52.22,"sea_level":1024.69,"grnd_level":914.23},
    // "wind":{"speed":3.4,"deg":309.006},
    // "clouds":{"all":32},
    // "dt":1462720231,
    // "sys":{"message":0.0045,"country":"US","sunrise":1462711203,"sunset":1462761313},
    // "id":5503766,
    // "name":"Enterprise",
    // "cod":200};

var ipLocation = {};
    // {"as":"AS22773 Cox Communications Inc.","city":"Las Vegas",
    // "country":"United States","countryCode":"US","isp":"Cox Communications",
    // "lat":32.0625,"lon":-114.3192,"org":"Cox Communications",
    // "query":"68.96.103.175","region":"NV","regionName":"Nevada",
    // "status":"success","timezone":"America/Los_Angeles","zip":"89148"};

// var weatherClass
//var weatherDescription //= weatherCondition.weather[0].description;
//var weatherIcon //= weatherCondition.weather[0].icon;
var weatherLocation;
var tempKelvin;
var tempCelsius;
var tempFahrenheit;
var sunrise;
var sunset;
var currentTime = new Date();
var outputLocation = document.getElementsByClassName("location");
var outputTemp = document.getElementsByClassName("temp");

// function geoFindMe() {
//     var output = document.getElementById("location");
    
//     if (!navigator.geolocation) {
//         output.innerHTML = "<p>Geolocation is not supported by your browser.</p>"
//         return;
//     }
    
//     function success(position) {
//         var latitude = position.coords.latitude;
//         var longitude = position.coords.longitude;
        
//         output.innerHTML = '<p>Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '° </p>';
        
//         // var img = new Image();
//         // img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        
//         output.appendChild(img);
        
//         getWeather(latitude, longitude);
//     }
    
//     function error() {
//         output.innerHTML = "Unable to retrieve your location";
//     }
    
//     output.innerHTML = "<p>Locating...</p>";
    
//     navigator.geolocation.getCurrentPosition(success, error);
    
// }

function ipFindMe() {
    // var latitude; //= ipLocation.lat;
    // var longitude; //= ipLocation.lon;
    //var output = document.getElementById("location");
    //var outputLocation = document.getElementsByClassName("location");
    var myXMLHttpRequest = new XMLHttpRequest();
    var url = 'http://ip-api.com/json';
    
    myXMLHttpRequest.onreadystatechange = function() {
        if (myXMLHttpRequest.readyState === 4 && myXMLHttpRequest.status === 200) {
            ipLocation = JSON.parse(myXMLHttpRequest.responseText);
            //var myIpJSON = JSON.stringify(myIpObject);
            // latitude = ipLocation.lat;
            // longitude = ipLocation.lon;
            weatherLocation = ipLocation.city + ", " + ipLocation.region;
            
            console.log(ipLocation);
            //console.log(myIpJSON);
            
            //output.innerHTML = '<p>Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '° </p>';
            outputLocation[0].innerHTML = weatherLocation;
            // $(".location").html(function() {
            //     return weatherLocation;
            // });
            //$(".location").html("<p>" + weatherLocation + "</p>");
            //$(".location").append(document.createTextNode(weatherLocation));
            
            //console.log(getWeather(latitude, longitude));
            //console.log(ipLocation.lat, ipLocation.lon);
            getWeather(ipLocation.lat, ipLocation.lon);
        }
    }
    
    myXMLHttpRequest.open("GET", url, true);
    myXMLHttpRequest.send();

}

function getWeather(latitude, longitude) {
    var appid = '6284267c31e047d6c3e598d2db2566dd';
    var myXMLHttpRequest = new XMLHttpRequest();
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + appid; //'&units=imperial' + 
    //var output = document.getElementById("weather");
    var outputCondition = document.getElementsByClassName("condition");
    //var outputTemp = document.getElementsByClassName("temp");
    //var weatherId;
    
    myXMLHttpRequest.onreadystatechange = function() {
        if (myXMLHttpRequest.readyState === 4 && myXMLHttpRequest.status === 200) {
            //var myObject = JSON.parse(myXMLHttpRequest.responseText);
            //var myJSON = JSON.stringify(myObject);
            //console.log(myObject);
            //console.log(myJSON);
            
            weatherCondition = JSON.parse(myXMLHttpRequest.responseText);
            // console.log(weatherCondition);
            
            // weatherId = weatherCondition.weather[0].id;
            // weatherClass = "wi wi-owm-" + weatherId;
            //weatherDescription = weatherCondition.weather[0].description;
            //weatherIcon = weatherCondition.weather[0].icon;
            tempKelvin = weatherCondition.main.temp;
            tempCelsius = Math.round(tempKelvin - 273.15) + " °C";
            tempFahrenheit = Math.round((tempKelvin - 273.15) * 9/5 + 32) + " °F";
            // sunrise = new Date(weatherCondition.sys.sunrise * 1000);
            // sunset = new Date(weatherCondition.sys.sunset * 1000);
            //output.innerHTML = '<p>Kelvin is ' + tempKelvin + '°<br>Celsius is ' + tempCelsius + '°<br>Fahrenheit is ' + tempFahrenheit + '°</p>';
            // $("i").removeClass().addClass("wi wi-owm-" + weatherCondition.weather[0].id);
            weatherIcon();
            outputCondition[0].innerHTML = "<p>" + weatherCondition.weather[0].description + "</p>";
            outputTemp[0].innerHTML = "<p>" + tempCelsius + "</p>";
            //console.log(weatherId, weatherDescription, weatherClass);
            // console.log(sunrise, sunset, currentTime);
        }
    }
    
    myXMLHttpRequest.open("GET", url, true);
    myXMLHttpRequest.send();
    
    //return myObject;
    //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a
}

var showFahrenheit = false;

function toggleTemp() {
    showFahrenheit = !showFahrenheit;
    if (showFahrenheit) {
        outputTemp[0].innerHTML = "<p>" + tempFahrenheit + "</p>";
    } else {
        outputTemp[0].innerHTML = "<p>" + tempCelsius + "</p>";
    }
}

function weatherIcon() {
    sunrise = new Date(weatherCondition.sys.sunrise * 1000);
    sunset = new Date(weatherCondition.sys.sunset * 1000);
    // $("i").removeClass().addClass("wi wi-owm-" + weatherCondition.weather[0].id);
    // $("i").removeClass().addClass("wi wi-owm-night-" + weatherCondition.weather[0].id);
    if (currentTime >= sunrise && currentTime <= sunset) {
        $("i").removeClass().addClass("wi wi-owm-day-" + weatherCondition.weather[0].id);
    } else {
        $("i").removeClass().addClass("wi wi-owm-night-" + weatherCondition.weather[0].id);
    }
    // console.log(sunrise.getHours(), sunset.getHours(), currentTime.getHours());
    console.log(sunrise, sunset, currentTime)
}

// function getWeather() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//         x.innerHTML = 'Geolocation is not supported by this browser.';
//     }
// }

// function showPosition(position) {
//     x.innerHTML = "Latitude: " + position.coords.latitude + "<br> Longitude: " +
//     position.coords.longitude;
// }

$(document).ready(function() {
    console.log('ready!');
});

//var x = document.getElementById("weather");
var weatherCondition = {"coord": {"lon":-115.24,"lat":36.03},
    "weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03d"}],
    "base":"cmc stations",
    "main":{"temp":52.22,"pressure":914.23,"humidity":78,"temp_min":52.22,"temp_max":52.22,"sea_level":1024.69,"grnd_level":914.23},
    "wind":{"speed":3.4,"deg":309.006},
    "clouds":{"all":32},
    "dt":1462720231,
    "sys":{"message":0.0045,"country":"US","sunrise":1462711203,"sunset":1462761313},
    "id":5503766,
    "name":"Enterprise",
    "cod":200};

var ipLocation = {"as":"AS22773 Cox Communications Inc.","city":"Las Vegas","country":"United States","countryCode":"US","isp":"Cox Communications","lat":36.0625,"lon":-115.3192,"org":"Cox Communications","query":"68.96.103.175","region":"NV","regionName":"Nevada","status":"success","timezone":"America/Los_Angeles","zip":"89148"};

var weatherId //= weatherCondition.weather[0].id;
var weatherDescription //= weatherCondition.weather[0].description;
var weatherIcon //= weatherCondition.weather[0].icon;
var tempKelvin
var tempCelsius
var tempFahrenheit

function geoFindMe() {
    var output = document.getElementById("location");
    
    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser.</p>"
        return;
    }
    
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        
        output.innerHTML = '<p>Latitude is ' + latitude + '° <br> Longitude is ' + longitude + '° </p>';
        
        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";
        
        output.appendChild(img);
        
        console.log(getWeather(latitude, longitude));
    }
    
    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }
    
    output.innerHTML = "<p>Locating...</p>";
    
    navigator.geolocation.getCurrentPosition(success, error);
    
}

function ipFindMe() {
    var latitude = ipLocation.lat;
    var longitude = ipLocation.lon;
    var output = document.getElementById("location");
    var myXMLHttpRequest = new XMLHttpRequest();
    var url = 'http://ip-api.com/json'
    
    myXMLHttpRequest.onreadystatechange = function() {
        if (myXMLHttpRequest.readyState === 4 && myXMLHttpRequest.status === 200) {
            var ipLocation = JSON.parse(myXMLHttpRequest.responseText);
            //var myIpJSON = JSON.stringify(myIpObject);
            
            console.log(ipLocation);
            //console.log(myIpJSON);
            //output.innerHTML = myIpJSON;
        }
    }
    
    myXMLHttpRequest.open("GET", url, true);
    myXMLHttpRequest.send();
    console.log(getWeather(latitude, longitude));
}

function getWeather(latitude, longitude) {
    var appid = '6284267c31e047d6c3e598d2db2566dd';
    var myXMLHttpRequest = new XMLHttpRequest();
    var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=' + appid; //'&units=imperial' + 
    
    myXMLHttpRequest.onreadystatechange = function() {
        if (myXMLHttpRequest.readyState === 4 && myXMLHttpRequest.status === 200) {
            var myObject = JSON.parse(myXMLHttpRequest.responseText);
            var myJSON = JSON.stringify(myObject);
            console.log(myObject);
            console.log(myJSON);
            
            weatherCondition = JSON.parse(myXMLHttpRequest.responseText);
            console.log(weatherCondition);
            
            weatherId = weatherCondition.weather[0].id;
            weatherDescription = weatherCondition.weather[0].description;
            weatherIcon = weatherCondition.weather[0].icon;
            console.log(weatherId, weatherDescription, weatherIcon);
        }
    }
    
    myXMLHttpRequest.open("GET", url, true);
    myXMLHttpRequest.send();
    
    //return myObject;
    //http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b1b15e88fa797225412429c1c50c122a
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

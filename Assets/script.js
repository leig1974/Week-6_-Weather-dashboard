    var apiKey = "41efa49b5c3d44802e760cf096eb6503";
    var nameofCity = document.getElementById("city_name");
    var todayTemperature = document.getElementById("temptoday");
    var todayWind = document.getElementById("windtoday");
    var todayHumidity = document.getElementById("humiditytoday");
    var singleday = document.getElementsByClassName("singleday");
    var cityUl = document.getElementById("savedcitieslist");
//     var inputValue=document.getElementById("city");
//     var searchButton=document.getElementById("search");
//     searchButton.addEventListener("click", (event)=>{
//         event.preventDefault();
//         var val=inputValue.value;
//         console.log(val)
//         var storageItem=JSON.parse(window.localStorage.getItem("savedCities")) || [];
//         storageItem.push(val);
//         window.localStorage.setItem("savedCities", JSON.stringify(storageItem))
//     })
//     var storageItems=JSON.parse(window.localStorage.getItem("savedCities"))
//     for (let i = 0; i < storageItems.length; i++) {
//         const element = storageItems[i];
//         var storageButton=document.createElement("button");
//         storageButton.textContent=element;
// document.getElementById("storagebuttonscontainer").append(storageButton)
//     }

function getCoordinate(cityName) {
        fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=3&appid=" + apiKey)
        .then(
            function (response) {
                if (response.status !== 200){
                    console.log("error");
                    return;
                }

                response.json().then(function(data){
                    if(data.length != 0){
                        latitude = data[0].lat;
                        longitude = data[0].lon;
                        latitude = latitude.toString();
                        longitude = longitude.toString();

                        getWeather(latitude, longitude, cityName);
                        saveCities(cityName);
                        
                    }
                })
            }
        )
}

function getWeather(lat, lon, cityName){
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey)
    .then(function(response){
        if(response.status !== 200){
            console.log("Error")
        }
        return response.json()
    })
    .then(function(data){
        // console.log(data.list[0].main)
        for(i = 0; i < 6; i++){
            var temp = data.list[i].main.temp;
            var wind = data.list[i].wind.speed;
            var humidity = data.list[i].main.humidity;
            var utcdate = data.list[i].dt;
            var date = new Date(utcdate * 1000);
	        var day = date.getDate();
	        var month = date.getMonth() + 1;
	        var year = date.getFullYear();
            var dateFormatted = month.toString() + '/' + day.toString() + '/' + year.toString();
            // console.log(wind)
            
            if (i === 0){
                nameofCity.innerText = cityName + "  (" + dateFormatted + ")";
                todayTemperature.innerText = "Temp: " + temp.toString() + "F";
                todayWind.innerText = "Wind: " + wind.toString() + "MPH";
                todayHumidity.innerText = "Humidity:" + humidity.toString() + "%";
            }else{
                var index = i-1;
                singleday[index].innerHTML = "<h6>" + dateFormatted + "</h6><p>Temp: " + temp.toString() + "</p><p>Wind: " + wind.toString() + " MPH</p> <p>Humidity: " + humidity.toString() + "%</p>"
            }

        }
    })
}

function setWeather() {
    var cityName = document.getElementById("search").value;
    getCoordinate(cityName);
}

function saveCities(searchvalue) {
    if (localStorage.savedCity == undefined) {
        var savedCity = [searchvalue];
        localStorage.savedCity = JSON.stringify(savedCity);
    };

    var newSearch = [searchvalue];
    var currentList = localStorage.savedCity;
    var savedCity = JSON.parse(currentList);
    if (!savedCity.includes(searchvalue)) {
        savedCity = savedCity.concat(newSearch);
        localStorage.savedCity = JSON.stringify(savedCity);
    }
    getCities();

}

function getCities() {
    var currentList = localStorage.savedCity;
    var savedCity = JSON.parse(currentList);
    var newCityList = [];
    for (var i = 0; i < savedCity.length; i ++) {
        newCityList +='<li onclick=getCoordinate("'+ savedCity[i] +'") value="' + savedCity[i] + '">' + savedCity[i] + '</li>';
    }

    cityUl.innerHTML = newCityList;

}

getCities();


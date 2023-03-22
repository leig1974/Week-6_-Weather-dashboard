    var apiKey = "41efa49b5c3d44802e760cf096eb6503";
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
        fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=3&appid=" + apiKey)
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
        console.log(data.list)
        // for(i = 0; i < 6; i++){
        //     var temp = data.list[i].temp.day;
        //     console.log(temp)
        //     // if (i === 0){

        //     // }
        // }
    })
}


getCoordinate("Atlanta")
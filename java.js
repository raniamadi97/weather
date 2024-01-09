

let temperaturField  = document.querySelector(".temp");
let locationField = document.querySelector(".location");
let dataField = document.querySelector(".dataText");
let iconField = document.querySelector(".forecast-icon img");
let iconField1 = document.querySelector("#iconsMax img")
let dateField = document.querySelector(".date")
let dayField = document.querySelectorAll(".day")
let dayField2 = document.querySelector(".day2")

let feelsLikeField = document.querySelector("#feelsLike")
let windMpfField = document.querySelector("#wind");  
let windDirField = document.querySelector("#windDir")
let iconFieldMin = document.querySelector("#iconsMin img");
// let iconFieldMax = document.querySelector("#iconsMax img");




console.log(dateField)


let searchButton = document.querySelector("#submit");
let  searchValue = document.getElementById('search');


searchButton.addEventListener('click',searchLocation);




// weather info function and API
async function getWeather(targetLocation){
var response =  await fetch(`https://api.weatherapi.com/v1/current.json?key=e082b2a74c404d67b6d31642232912&q=${targetLocation}=no`)
var data =  await response.json()

// Fetch weather forecast data for the next day
let forecastResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=e082b2a74c404d67b6d31642232912&q=${targetLocation}=no&days=2`);
let forecastData = await forecastResponse.json();

console.log(forecastData);
console.log(data);






let locationName = data.location.name;
let time = data.location.localtime;
let temp = data.current.temp_c;
let conditionData = data.current.condition.text;
let icon = data.current.condition.icon;
let windMpf = data.current.wind_mph;


let forecastDate = forecastData.forecast.forecastday[1].date;
let forecastTempMin = forecastData.forecast.forecastday[1].day.mintemp_c;
let forecastTempMax = forecastData.forecast.forecastday[1].day.maxtemp_c;

let forecastIconMin = forecastData.forecast.forecastday[1].day.condition.icon;
let forecastIconMax = forecastData.forecast.forecastday[1].night ? forecastData.forecast.forecastday[1].night.condition.icon : '';






updateHtml(locationName, temp, conditionData, icon,windMpf,time,forecastDate, forecastTempMin, forecastIconMin,forecastIconMax, forecastTempMax)

}

function updateHtml(locationName, temp, conditionData, icon,windMpf,time,forecastDate, forecastTempMin, forecastIconMin,forecastIconMax, forecastTempMax){

    temperaturField.innerText = temp;
    // feelsLikeField.innerText= feelsLike;
    locationField.innerText =locationName;
    dataField.innerText= conditionData;
    const iconUrl = `https:${icon}`;
    iconField.src = iconUrl;

    const iconUrl2 = `https:${icon}`;
    iconField1.src = iconUrl2;

    windMpfField.innerText = `${windMpf} km/h`;

    
    let splitDate = time.split(' ')[0];
    let splitTime = time.split(' ')[1];


    let currentDay = getDayName(new Date(splitDate).getDay());

    dateField.innerText = `${splitDate}`;
    // dayField.innerText = `${currentDay}`;

     // Update all elements with class "day"
     dayField.forEach((dayElement) => {
        dayElement.innerText = `${currentDay}`;
    });

 

     // Extract day for the next day from forecast data
     let nextDayDate = new Date(forecastDate);
     nextDayDate.setDate(nextDayDate.getDate() + 1);
     let nextDay = nextDayDate.getDay();
 
     // Ensure that nextDay is within the valid range (0-6)
     nextDay = nextDay % 7; 
 
     let nextDayName = getDayName(nextDay);
 
     // Update the element with class "day2"
     dayField2.innerText = nextDayName;

 
      // Display min and max temperatures for the next day
      const minTempHtml = `Min: ${forecastTempMin}°C`;
      const maxTempHtml = `Max: ${forecastTempMax}°C`;
  
      document.getElementById('minTemp').innerText = minTempHtml;
      document.getElementById('maxTemp').innerText = maxTempHtml;


   
    const iconUrlMin = `https:${forecastIconMin}`;
    iconFieldMin.src = iconUrlMin;

    // const iconUrlMax = `https:${forecastIconMax}`;
    // iconFieldMax.src = iconUrlMax;



    


    
}



function searchLocation(e){

e.preventDefault()

let  target = searchValue.value

getWeather(target)
console.log(target)


}



function getDayName(dayNumber) {
    switch(dayNumber){
        case 0:  return 'Sunday';
        case 1:  return 'Monday';
        case 2:  return 'Tuesday';
        case 3:  return 'Wednesday';
        case 4:  return 'Thursday';
        case 5:  return 'Friday';
        case 6:  return 'Saturday';
        default: return 'Invalid Day';
    }
}





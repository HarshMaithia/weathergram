const searchValue = document.querySelector(".search-box");
let searchBtn = document.querySelector(".search-btn");
let cityName = document.querySelector(".city");
let currentCity = document.querySelector(".city");
let temperature = document.querySelector(".temp-degree");
let tempSection = document.querySelector(".temp");
let tempUnit = document.querySelector(".t-unit");
let tempLevel = document.querySelector(".hi-low");
let weatherType = document.querySelector(".weather");
let iconLink = document.querySelector('.icon');
let iconCode;
let iconData;
let fahrenheit;
let humid=document.querySelector(".details-humid");
let wind=document.querySelector(".details-wind");
let pressure=document.querySelector(".details-pressure");
let d = new Date();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[d.getDay()]; 
let dateValue = d.getDate();
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = months[d.getMonth()];
let year = d.getFullYear();
let currenDate = document.querySelector(".date");
currenDate.textContent=day+" "+dateValue+" "+month+" "+year;

window.addEventListener('load',()=>{                                      // weather based on longitude and latitude
    let long;
    let lat;
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=7b41d1377c8761ab50944cccc8c36d9d`

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    console.log(data)
                    temperature.textContent=data.main.temp;
                    currentCity.textContent=data.name+", "+data.sys.country;
                    weatherType.textContent=data.weather[0].description;
                    tempLevel.textContent=Math.round(data.main.temp_min)+"°C"+" / "+Math.round(data.main.temp_max)+"°C";
                    fahrenheit = (temperature.textContent * 1.8) + 32;
                    tempSection.addEventListener("click",() => {
                            if(tempUnit.textContent === "°C")
                            {
                                tempUnit.textContent="F";
                                temperature.textContent=Math.round(fahrenheit);
                            }else{
                                tempUnit.textContent="°C";
                                temperature.textContent=data.main.temp;
                            } 
                    });
                    iconCode = data.weather[0].icon;
                    iconData = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
                    iconLink.innerHTML="<img src='"+iconData+"' height=180px width=180px>";
                    humid.textContent=data.main.humidity+"%";
                    wind.textContent=data.wind.speed+"m/s";
                    pressure.textContent=data.main.pressure+"hPa";
                    let wType = data.weather[0].main;
                    bgChanger(wType);
                })

})  
}
else
    {
        alert("Allow Location Permission to get the Weather Forcast.");
    }
})  
searchValue.addEventListener("keypress",function(event){              // weather when searched a city and enter key
    if(event.keyCode == 13)
    {
        gotClicked();            
    }
})

function gotClicked()                                               // weather when searched a city and pressed search button
{
    const cityValue = searchValue.value;
    console.log(cityValue);

        const api = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${cityValue}&units=metric&appid=7b41d1377c8761ab50944cccc8c36d9d`

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data =>{
                    console.log(data)
                    temperature.textContent=data.main.temp;
                    currentCity.textContent=data.name+", "+data.sys.country;
                    weatherType.textContent=data.weather[0].description;
                    tempLevel.textContent=Math.round(data.main.temp_min)+"°C"+" / "+Math.round(data.main.temp_max)+"°C";
                    fahrenheit = (temperature.textContent * 1.8) + 32;
                    tempSection.addEventListener("click",() => {
                            if(tempUnit.textContent === "°C")
                            {
                                tempUnit.textContent="F";
                                temperature.textContent=Math.round(fahrenheit);
                            }else{
                                tempUnit.textContent="°C";
                                temperature.textContent=data.main.temp;
                            } 
                    });
                    iconCode = data.weather[0].icon;
                    iconData = "http://openweathermap.org/img/wn/"+iconCode+"@2x.png";
                    iconLink.innerHTML="<img src='"+iconData+"' height=180px width=180px>";
                    humid.textContent=data.main.humidity+"%";
                    wind.textContent=data.wind.speed+"m/s";
                    pressure.textContent=data.main.pressure+"hPa";
                    let wType1 = data.weather[0].main;
                    bgChanger(wType1);
                })
}

function bgChanger(wt)
{
    if(wt == "Rain" || wt == "Thunderstorm")
    {
        document.getElementById("theme").className="rain";
    }
    else if( wt == "Clear")
    {
        document.getElementById("theme").className="#";
    }
    else if(wt == "Drizzle")
    {
        document.getElementById("theme").className="drizzle";
    }
    else if(wt == "Clouds")
    {
        document.getElementById("theme").className="clouds";
    }
    else
    {
        document.getElementById("theme").className="rain";  
    }
}


    
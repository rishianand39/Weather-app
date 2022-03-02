let key = "7ee8191af8a55b7c086266e3567a76ca";

var container = document.querySelector("#container");
var sevendayweather = document.querySelector("#seven");
var iframe = document.querySelector("#gmap_canvas");

async function getWeatherData() {
    var city = document.querySelector("#city").value;
    try {
        var res1 = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=7&appid=${key}&units=metric`
        );
        var data1 = await res1.json();
        // console.log(data1);

        var res2 = await fetch(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data1.city.coord.lat}&lon=${data1.city.coord.lon}&appid=${key}&units=metric`
        );
        var data2 = await res2.json();
        showWeather(data2);
        dayWeather(data2.daily);
    } catch (err) {
        console.log("err:", err);
    }
}

function showWeather(data2) {
    container.textContent = null;

    var div = document.createElement("div");

    var link = `http://openweathermap.org/img/wn/${data2.current.weather[0].icon}.png`;
    var img = document.createElement("img");
    img.src = link;

    var tem = document.createElement("h3");
    tem.textContent = `Temp: ${data2.current.temp}°C`;

    var feellike = document.createElement("h5");
    feellike.textContent = `Feel Like: ${data2.current.feels_like}°C`;

    var wind = document.createElement("h4");
    wind.textContent = `Wind Speed: ${data2.current.wind_speed}km/h`;

    var humidity = document.createElement("h5");
    humidity.textContent = `Humidity: ${data2.current.humidity}%`;

    var press = document.createElement("h5");
    press.textContent = ` Pressure: ${data2.current.pressure}mb`;

    var visibility = document.createElement("h5");
    visibility.textContent = `Visibility: ${data2.current.visibility}`;

    var city = document.querySelector("#city").value;

    iframe.src = `https://maps.google.com/maps?q=${city}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    div.append(img, tem, feellike, wind, humidity, press, visibility);
    container.append(div);
}

function dayWeather(singledata) {
    sevendayweather.textContent = null;

    singledata.map(function(ele) {
        var div = document.createElement("div");
        // console.log(ele);

        const milliseconds = ele.dt * 1000;

        const dateObject = new Date(milliseconds);

        const humanDateFormat = dateObject.toLocaleString();

        var day = dateObject.toLocaleString("en-US", { weekday: "long" });
        console.log(day);

        var title = document.createElement("h3");
        title.textContent = day;

        var link2 = `http://openweathermap.org/img/wn/${ele.weather[0].icon}.png`;
        var img2 = document.createElement("img");
        img2.src = link2;

        var maxtem2 = document.createElement("h3");
        maxtem2.textContent = "Max: " + ele.temp.max + "°C";

        var mintem2 = document.createElement("h3");
        mintem2.textContent = "Min: " + ele.temp.min + "°C";

        div.append(title, img2, maxtem2, mintem2);
        sevendayweather.append(div);
    });
}
// Input and buttons
const cityInput = document.getElementById("city");
const searchButton = document.getElementById("searchbtn");
const locationButton = document.getElementById("geolocation");
const currentSection = document.getElementById("curcont");
const searchSection = document.getElementById("searchcont");
const msg = document.getElementById("message");
const close = document.getElementById("close");
const windIcon = document.getElementById("windDirection");
const heading = document.getElementById("heading");
const loaderSection = document.getElementById("loadercont");
const placeholder = document.getElementById("placeholder");
// Weather information elements
const temperature = document.getElementById("temp");
const apparentTemperature = document.getElementById("Atemp");
const humidity = document.getElementById("humi");
const windSpeed = document.getElementById("wind");
const windDirection = document.getElementById("wDirect");
const clouds = document.getElementById("clouds");
const pressure = document.getElementById("pressure");
// Navigation and status icons
const backButton = document.getElementById("back");
const statusIcon = document.getElementById("statusICON");
const statusText = document.getElementById("statustext");
const navitems = document.getElementsByClassName("items");
searchButton.onclick = () => {

    if (cityInput.value == "") {
        msg.innerText = "City required, enter the city!";
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.bottom = "15%";
        }, 20);
        setTimeout(() => {
            msg.style.bottom = 0;
            msg.style.display = "none";
        }, 2000);

        return;
    }
    loaderSection.style.display = "flex";
    searchSection.style.display = "none";
    let response = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=2705e079be66e01f67039230d17bef68&units=metric`
    );
    response
        .then((x) => {
            return x.json();
        })
        .then((data) => {
            loaderSection.style.display = "none";
            searchSection.style.display = "flex";
            if (data.cod == 404) {
                msg.innerText = "Invalid city, unable to found!";
                msg.style.display = "block";
                setTimeout(() => {
                    msg.style.bottom = "15%";
                }, 20);
                setTimeout(() => {
                    msg.style.bottom = 0;
                    msg.style.display = "none";
                }, 2000);
                return;
            }
            searchSection.style.display = "none";
            currentSection.style.display = "flex";
            currentSection.style.transition = "1s ease-in-out";
            humidity.innerText = data.main.humidity + "%";
            windDirection.innerText = data.wind.deg + "° Degree";
            windIcon.style.transform = `rotate(${90 - data.wind.deg}deg)`;
            statusText.innerText = data.weather[0].description;
            const iconCode = data.weather[0].icon;
            statusIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            pressure.innerText = data.main.pressure + " hpa";
            clouds.innerText = data.clouds.all + "%";
            windSpeed.innerText =`${(data.wind.speed * 3.6).toFixed(2)}` + "kmph";
            temperature.innerText = data.main.temp + "°C";
            apparentTemperature.innerText = data.main.feels_like + "°C";
        })
        .catch(() => {
            loaderSection.style.display = "none";
            searchSection.style.display = "flex";
            msg.innerText = "Warning: Network Failure!";
            msg.style.display = "block";
            setTimeout(() => {
                msg.style.bottom = "15%";
            }, 20);
            setTimeout(() => {
                msg.style.bottom = 0;
                msg.style.display = "none";
            }, 2000);
        });
    };
backButton.onclick = () => {
    currentSection.style.display = "none";
    searchSection.style.display = "flex";
    searchSection.style.transition = "1s ease-in-out";
};
locationButton.onclick = () => {
    if (navigator.onLine == false) {
        msg.innerText = "Warning: Network Failure!";
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.bottom = "15%";
        }, 20);
        setTimeout(() => {
            msg.style.bottom = 0;
            msg.style.display = "none";
        }, 2000);
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // Get the latitude and longitude
            const userLatitude = position.coords.latitude;
            const userLongitude = position.coords.longitude;
            loaderSection.style.display = "flex";
            searchSection.style.display = "none";
            let server = fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${userLatitude}&lon=${userLongitude}&appid=2705e079be66e01f67039230d17bef68&units=metric`
            );
            server
                .then((response) => response.json())
                .then((data) => {
                    loaderSection.style.display = "none";
                    searchSection.style.display = "none";
                    currentSection.style.display = "flex";
                    currentSection.style.transition = "1s ease-in-out";
                    humidity.innerText = data.main.humidity + "%";
                    windDirection.innerText = data.wind.deg + "° Degree";
                    windIcon.style.transform = `rotate(${
                        90 - data.wind.deg
                    }deg)`;
                    statusText.innerText = data.weather[0].description;
                    const iconCode = data.weather[0].icon;
                    statusIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    clouds.innerText = data.clouds.all + "%";
                    pressure.innerText = data.main.pressure + " hpa";
                    windSpeed.innerText =
                        `${(data.wind.speed * 3.6).toFixed(2)}` + "kmph";
                    temperature.innerText = data.main.temp + "°C";
                    apparentTemperature.innerText = data.main.feels_like + "°C";
                });
        });
    } else {
        msg.innerText = "Sorry, Geolocation Not Supported";
        msg.style.display = "block";
        setTimeout(() => {
            msg.style.bottom = "15%";
        }, 20);
        setTimeout(() => {
            msg.style.bottom = 0;
            msg.style.display = "none";
        }, 2000);
    }
};

cityInput.onfocus = () => {
    placeholder.style.bottom = "35px";
    placeholder.style.fontSize = "10px";
    cityInput.style.borderBottom = "1px solid #f36841";
    placeholder.style.color = "#f36841";
    cityInput.style.caretColor = "#f36841";
    placeholder.innerText = "Enter City";
};
cityInput.onblur = () => {
    placeholder.style.bottom = "10px";
    placeholder.style.fontSize = "14px";
    cityInput.style.borderBottom = "1px solid #0B192C";
    placeholder.style.color = "#0B192C";
    cityInput.style.caretColor = "#0B192C";
    placeholder.innerText = "Enter City...";
    if (cityInput.value  != "") {
        searchButton.click();
        cityInput.value = "";
    }
   
};
heading.onmouseover = () => {
    heading.innerText = "WELCOME HERE";
    heading.style.padding = "10px 32.5px";
};
heading.onmouseout = () => {
    heading.innerText = "WEATHER MASTERS";
    heading.style.padding = "10px 19px";
};

placeholder.onclick = () => {
    cityInput.focus();
};

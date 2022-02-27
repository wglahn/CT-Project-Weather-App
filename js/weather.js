submitButton()

function handleSubmit(event){
    event.stopPropagation();
    event.preventDefault();

    cityText = document.getElementById("city");
    zipText = document.getElementById("zip");

    if (cityText.value == "" && zipText.value == ""){
        alert('You must enter a city or zip!', 'danger');
    } else {
        doAPICall(cityText.value,zipText.value);
    }

};

function submitButton(){
    let button = document.getElementById("button");
    button.addEventListener('click', (e)=>handleSubmit(e));
};

function convertToFarenheit(kel){
    return Math.round(((kel - 273.15)* 1.8000 + 32.00));
};

async function doAPICall(city,zip){
    const appid = ""

    if (city) {
        result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`);
        document.getElementById("zip").value = ""
    } else {
        result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${appid}`);
        document.getElementById("city").value = ""
    }

    console.log(result.data)

    title = document.getElementById('title')
    title.innerText=`${result.data.weather[0].main} - ${result.data.weather[0].description}`

    // desc = document.getElementById('desc')
    // desc.innerText=result.data.weather[0].description

    high = document.getElementById('high')
    high.innerText=`High: ${convertToFarenheit(result.data.main.temp_max)}`

    low = document.getElementById('low')
    low.innerText=`Low: ${convertToFarenheit(result.data.main.temp_min)}`

    humidity = document.getElementById('humidity')
    humidity.innerText=`Humidity: ${result.data.main.humidity}`

    icon = document.getElementById('icon')
    icon.src = `http://openweathermap.org/img/wn/${result.data.weather[0].icon}@2x.png`
};

var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div style="width: 20rem;" class="alert alert-' + type + ' alert-dismissible mx-5 mt-3" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('Nice, you triggered this alert message!', 'success')
  })
}

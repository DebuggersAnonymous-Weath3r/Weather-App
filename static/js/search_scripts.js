

const weatherDataLocation = document.getElementById('json-location').innerText

fetch(weatherDataLocation)
    .then(response => response.json())
    .then(data => {
        let weatherData = data

        function convertFromEpochToHumanReadable(epoch) {
            let date = new Date (epoch * 1000)
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            let day = days[date.getDay()]

            // console.log(day)
            return day
        }
        console.log(weatherData['timezone'])
        for (let index=0; index < 7; ++index) {

            const cardTitle = document.getElementById('card-title'+index)
            const modalTitle = document.getElementById('modal-title'+index)
            const temperature = document.getElementById('temperature'+index)
            const precipitationIntensity = document.getElementById('precipitation-intensity'+index)
            const precipitationIntensityModal = document.getElementById('precipitation-intensity-modal'+index)
            const humidity = document.getElementById('humidity'+index)
            const humidityModal = document.getElementById('humidity-modal'+index)
            const windSpeed = document.getElementById('wind-speed'+index)
            const windSpeedModal = document.getElementById('wind-speed-modal'+index)
            const highTemperature = document.getElementById('high-temp'+index)
            const lowTemperature = document.getElementById('low-temp'+index)
            const currentTemperature = document.getElementById('current-temperature'+index)
            const uvIndex = document.getElementById('uv-index'+index)
            const precipitationProbability = document.getElementById('precipitation'+index)
            const pressure = document.getElementById('pressure'+index)
            const dewPoint = document.getElementById('dew-point'+index)
            const visibility = document.getElementById('visibility'+index)



            cardTitle.innerText = convertFromEpochToHumanReadable(weatherData['daily']['data'][index]['time'])
            modalTitle.innerText = convertFromEpochToHumanReadable(weatherData['daily']['data'][index]['time']) + ' - ' + weatherData['daily']['data'][index]['summary']
            temperature.innerText = Math.round((weatherData['daily']['data'][index]['temperatureHigh'] + weatherData['daily']['data'][1]['temperatureLow']) / 2)
            precipitationIntensity.innerText = Math.round(weatherData['daily']['data'][index]['precipIntensity'] * 100).toFixed(2)
            precipitationIntensityModal.innerText = Math.round(weatherData['daily']['data'][index]['precipIntensity'] * 100).toFixed(2)
            humidity.innerText = Math.round(weatherData['daily']['data'][index]['humidity'] * 100)
            humidityModal.innerText = Math.round(weatherData['daily']['data'][index]['humidity'] * 100)
            windSpeed.innerText = Math.round(weatherData['daily']['data'][index]['windSpeed'])
            windSpeedModal.innerText = weatherData['daily']['data'][index]['windSpeed']
            highTemperature.innerText = Math.round(weatherData['daily']['data'][index]['temperatureHigh'])
            lowTemperature.innerText = Math.round(weatherData['daily']['data'][index]['temperatureLow'])
            currentTemperature.innerText = Math.round(weatherData['currently']['temperature'])
            uvIndex.innerText = weatherData['daily']['data'][index]['uvIndex']
            precipitationProbability.innerText = weatherData['daily']['data'][index]['precipProbability']
            pressure.innerText = Math.round(weatherData['daily']['data'][index]['pressure'])
            dewPoint.innerText = weatherData['daily']['data'][index]['dewPoint']
            visibility.innerText = weatherData['daily']['data'][index]['visibility']
        }
    })
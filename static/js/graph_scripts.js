// Getting all the elements
const highTemperature = document.getElementById('high-temp')
const lowTemperature = document.getElementById('low-temp')
const timeRise = document.getElementById('time-rise')
const timeSet = document.getElementById('time-set')
const precipitationIntensity = document.getElementById('precipitation-intensity')
const currentTemperature = document.getElementById('current-temperature')
const windSpeed = document.getElementById('wind-speed')
const humidity = document.getElementById('humidity')
const uvIndex = document.getElementById('uv-index')
const precipitationProbability = document.getElementById('precipitation')
const pressure = document.getElementById('pressure')
const dewPoint = document.getElementById('dew-point')
const visibility = document.getElementById('visibility')
const containerForAllGraphs = document.getElementById('container-for-all-graphs')
const weatherDataLocation = document.getElementById('json-location').innerText
const dayID = document.getElementById('day_id').innerText

fetch(weatherDataLocation)
    .then(response => response.json())
    .then(data => {
        let weatherData = data

        // This is the information that will be display in the Details section on the graphs template.
        function convertFromEpochToHumanReadable(epoch) {
            let date = new Date(epoch * 1000)
            let time = date.getHours() + ":" + date.getMinutes()
            return time
        }

        highTemperature.innerText = Math.round(weatherData['daily']['data'][dayID]['temperatureHigh'])
        lowTemperature.innerText = Math.round(weatherData['daily']['data'][dayID]['temperatureLow'])
        timeRise.innerText = convertFromEpochToHumanReadable(weatherData['daily']['data'][dayID]['sunriseTime'])
        timeSet.innerText = convertFromEpochToHumanReadable(weatherData['daily']['data'][dayID]['sunsetTime'])
        precipitationIntensity.innerText = (weatherData['daily']['data'][dayID]['precipIntensity'] * 100).toFixed(2)
        currentTemperature.innerText = Math.round(weatherData['currently']['temperature'])
        windSpeed.innerText = weatherData['daily']['data'][dayID]['windSpeed']
        humidity.innerText = weatherData['daily']['data'][dayID]['humidity'] * 100
        uvIndex.innerText = weatherData['daily']['data'][dayID]['uvIndex']
        precipitationProbability.innerText = weatherData['daily']['data'][dayID]['precipProbability']
        pressure.innerText = Math.round(weatherData['daily']['data'][dayID]['pressure'])
        dewPoint.innerText = weatherData['daily']['data'][dayID]['dewPoint']
        visibility.innerText = weatherData['daily']['data'][dayID]['visibility']


        
        
        // Everything related to the graphs is below.
        function getTimeFor24Hours() {
            let resultsEpock = []
            let results = []
            for (let index=0; index < 24; ++index) {
                resultsEpock.push(weatherData['hourly']['data'][index]['time']) 
                let date = new Date(resultsEpock[index] * 1000) // Multiplying by 1000 to convert an epoch to human-readable date.
                results.push(date.getHours())
            }
            
            // console.log(results)
            return results
        }

        function getDataForTheNext24Hours(key, data) {
            let results = []
            for (let index = 0; index < 24; ++index) {
                results.push(data['hourly']['data'][index][key])
            }

            console.log(results)
            return results
        }
        
        let graphTitles = ['Temperature', 'Humidity', 'Wind Speed', 'Atmospheric Presure', 'Visibility']
        let keysToDisplayFromJSON = ['temperature', 'humidity', 'windSpeed', 'pressure', 'visibility']

        for (let index=0; index < graphTitles.length; ++index) {
            // creating an div element for the graph container and appending it to the container that will hold all graphs.
            let graphContainer = document.createElement('div')
            graphContainer.className = 'graph-container bg-light p-5 my-5 rounded-3 text-center'
            // graphContainer.id = >>> graphs name <<<
            graphContainer.style.marginTop = '50px'
            graphContainer.style.marginBottom = '50px'
            containerForAllGraphs.appendChild(graphContainer)

            // creating an h2 element for the heading and appending it to the graph container.
            let graphHeading = document.createElement('h2')
            graphHeading.className = 'graph-heading'
            graphHeading.innerText = graphTitles[index]
            graphHeading.style.color = 'Black'
            graphContainer.appendChild(graphHeading)

            // creating an canvas element for the actual graph and appending it to the graph container.
            let graphCanvas = document.createElement('canvas')
            graphCanvas.className = 'graph'
            graphCanvas.id = index
            graphContainer.appendChild(graphCanvas)

            // THIS WILL NEED TO CHANGE, ACCORDING TO THE INFORMATION IN THE JSON FILE
            let customGraph = document.getElementById(index)
            let chart = new Chart(customGraph, {
                type: "line",
                data: {
                    labels: getTimeFor24Hours(),
                    datasets: [
                        {
                            label: graphTitles[index],
                            data: getDataForTheNext24Hours(keysToDisplayFromJSON[index], weatherData),
                            backgroundColor: "rgba(0, 176, 255, 0.6)",
                            borderColor: "rgba(0, 176, 255, 1)",
                            fill: false, 
                            showLine: false,
                            pointRadius: 5,
                        },
                    ],
                },
                options: {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    // beginAtZero: true,
                                }
                            }
                        ]
                    }
                }
            });
        }

    })
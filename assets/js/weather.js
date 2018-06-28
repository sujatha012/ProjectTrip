/*
 * Configuration for Aeris weather js.
 * Requires subscription to developer api(FREE)
 */
aeris.config.set({
    apiId: 'NsPuRu3InFgIvvtiBFlOY',
    apiSecret: 'z2ZzlPeWZ3UeARqpU89f1mFpbr0qUoWbW5PbzTcI'
});

/*
 * Get Current weather condition by providing Latitude Longitude of any place
 * returns Object which holds the required value "current Temp, FeelsLike, Weather"
 */
function getCurrentWeather(latlong) {
    var currentWeatherData = [];
    if (latlong.trim() === "") return "Please provide latitude and longitude OR zipCode OR City, State";
    var ob = new aeris.api.models.Observation({
        id: latlong
    });
    ob.fetch().done(function (response) {
    console.log(response);
        currentWeatherData.push({
            status: 'success',
            currentTemp: response.response.ob.tempF,
            feelsLike: response.response.ob.feelslikeF,
            weather: response.response.ob.weather
        });

    }).fail(function (err) {

        console.log(JSON.stringify(err).toString());
        currentWeatherData.push({
            status: 'error',
            error_code: err.code,
            error_mesage: err.message

        });
        return currentWeatherData;
    });

    return currentWeatherData;

}

$(document).ready(function () {
    var latlong = '44.86,-93.03';
    var result =  getCurrentWeather(latlong);
    console.log(result);

    latlong = 'Eagan, MN';
    result = getCurrentWeather(latlong);
    console.log(result);

    latlong = '55123';
    result = getCurrentWeather(latlong);
    console.log(result);

    latlong = "";
    result = getCurrentWeather(latlong);
    console.log(result);

    latlong = "552";
    result = getCurrentWeather(latlong);
    console.log(result);

});
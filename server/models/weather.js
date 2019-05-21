
class Weather {

    /* New weather object is created every time game is updated
        - each time the type of weather is randomized
        - type is equivalent to number
               - if (number == x)
                    - set healthChange
                    - set mileChange

     */

    constructor() {
        this.weatherArray = ['Warm', 'Warm', 'Warm', 'Warm', 'Very Hot', 'Very Hot', 'Hot', 'Hot', 'Cool', 'Cool', 'Cold', 'Cold', 'Very Cold', 'Very Cold', 'Rain', 'Rain', 'Heavy Rain', 'Snow', 'Blizzard', 'Heavy Fog'];
        this.healthChange = 0;
        this.mileChange = 0;

        this.weatherName = this.getRandomWeather();
        this.assignValues()



    }

    getRandomWeather() {
        var i = Math.floor(Math.random() * this.weatherArray.length);
        return this.weatherArray[i];
    }


    assignValues() {

        if (this.weatherName == "Warm") {
            this.healthChange = -8;
            this.mileChange = .7;
        } else if (this.weatherName == "Hot") {
            this.healthChange = -3;
            this.mileChange = .9;
        } else if (this.weatherName == "Warm") {
            this.healthChange = 1;
            this.mileChange = 1;
        } else if (this.weatherName == "Cool") {
            this.healthChange = 1;
            this.mileChange = .95;
        } else if (this.weatherName == "Cold") {
            this.healthChange = -5;
            this.mileChange = .8;
        } else if (this.weatherName == "Very Cold") {
            this.healthChange = -12;
            this.mileChange = .7;
        } else if (this.weatherName == "Rain") {
            this.healthChange = -4;
            this.mileChange = .6;
        } else if (this.weatherName == "Heavy Rain") {
            this.healthChange = -8;
            this.mileChange = .4;
        } else if (this.weatherName == "Snow") {
            this.healthChange = -15;
            this.mileChange = .3;
        } else if (this.weatherName == "Blizzard") {
            this.healthChange = -30;
            this.mileChange = .1;
        } else if (this.weatherName == "Heavy Fog") {
            this.healthChange = -3;
            this.mileChange = .5;
        }

    }


}


exports.Weather = Weather;

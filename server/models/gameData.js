const pace = require("../models/pace.js");
const weather = require("../models/weather.js");
const terrain = require("../models/terrain.js");

class gameData {

    constructor(username, playerNames, startMonth, playerProfession, gameSessionID) {
        console.log(username);

        this.username = username;
        this.playerNames = playerNames;
        this.startMonth = startMonth;
        this.playerProfession = playerProfession;
        this.playerMoney = 0;
        this.playerStatus = 'All Alive';
        this.gameSessionID = gameSessionID;
        this.groupHealth = 100;
        this.milesTraveled = 0
        this.groupHealth = 100;
        this.currentPace = new pace.Pace("Resting");
        this.daysOnTrail = 0;

        this.currentWeather = new weather.Weather();

        this.currentTerrain = new terrain.Terrain(this.currentWeather.weatherName);
        this.messages = '';

    }


};



exports.gameData = gameData;
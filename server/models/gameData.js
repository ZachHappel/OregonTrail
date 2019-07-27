const pace = require("../models/pace.js");
const weather = require("../models/weather.js");
const terrain = require("../models/terrain.js");

class gameData {

    constructor(username, playerNames, wagonLeader, startMonth, startDate, playerProfession, gameSessionID) {
        console.log(username);

        this.username = username;
        this.playerNames = playerNames;
        this.startMonth = startMonth;
        this.startDate = startDate;
        this.playerProfession = playerProfession;
        this.playerMoney = 0;
        this.playerStatus = 'All Alive';
        this.gameSessionID = gameSessionID;
        this.groupHealth = 100;
        this.milesTraveled = 0
        this.groupHealth = 100;
        this.currentPace = new pace.Pace("Resting");
        this.daysOnTrail = 0;
        this.wagonLeader = '';

        this.currentWeather = new weather.Weather().getRandomWeather();

        this.currentTerrain = new terrain.Terrain(this.currentWeather.weatherName);
        this.messages = '';

        console.log('Pace Name: ' + this.currentPace.paceName);
    }


};



exports.gameData = gameData;
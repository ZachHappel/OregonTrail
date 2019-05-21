const pace = require("../models/pace.js");
const weather = require("../models/weather.js");
const terrain = require("../models/terrain.js");
var setupController = require('../controllers/setupController.js');
var gameModel = require('../models/gameData.js'); /* imported here because it is only used within this function */

var localCopyOfGameInstance;

/*
Local copy of the selected game instance is created. Modifications are made to it instead of the of the original
that is maintained within setupController. The modified version then replaces the original.
 */

var changePace = function (paceName) {
    /* Optional user-invoked function */
    /* New Pace object is created and assigned to the game instances currentPace variable */
    getGameData();
    /* Create new Pace object with the specified pace to the local copy of the game instance */
    localCopyOfGameInstance.currentPace = new pace.Pace(paceName);
    setGameData();
};



var updateGame = function () {  /* Increment day */

    getGameData();

    weatherHealthChange = localCopyOfGameInstance.currentWeather.healthChange; /* -n < - > n    e.g (-)30 < - > (+)1  */
    weatherMileChange = localCopyOfGameInstance.currentWeather.mileChange;    /*  .n < - > n    e.g  0.1  < - >  1.0  */
    paceHealthChange = localCopyOfGameInstance.currentPace.healthChange;     /* -n < - > n      e.g  (-)8 < - > (+)5  */
    paceMilesPerDay = localCopyOfGameInstance.currentPace.milesPerDay;       /* 0 < - > 35   */

    localCopyOfGameInstance.groupHealth = calculateCurrentHealth(weatherHealthChange, paceHealthChange);
    localCopyOfGameInstance.milesTraveled = localCopyOfGameInstance.milesTraveled + calculateDailyPace(weatherMileChange, paceMilesPerDay);

    /*Generate message corresponding to group health */
    determineGroupHealthStatus();

    /* Assign new weather */
    localCopyOfGameInstance.currentWeather = new weather.Weather();

    /* Assign name of newly obtained weather to a variable */
    let currentWeatherName = localCopyOfGameInstance.currentWeather.weatherName;

    /* Pass along weather name to terrain */
    localCopyOfGameInstance.currentTerrain = new terrain.Terrain(currentWeatherName);

    /* Increment day counter by one */
    localCopyOfGameInstance.daysOnTrail = localCopyOfGameInstance.daysOnTrail + 1;
    setGameData(localCopyOfGameInstance);

};



var calculateCurrentHealth = function (weatherHealthChange, paceHealthChange) {
    let resultantHealth = localCopyOfGameInstance.groupHealth + weatherHealthChange + paceHealthChange;
    if (resultantHealth >= 100) {
        resultantHealth = 100;
    } return resultantHealth;
};



var calculateDailyPace= function (weatherMileChange, paceMilesPerDay) {
    let resultantPace = paceMilesPerDay * weatherMileChange;   /* weatherMileChange acts as a modifier */
    return resultantPace;
};



var determineGroupHealthStatus = function (groupHealth) {
    if (groupHealth >= 80){
        localCopyOfGameInstance.messages = 'Good';
    } else if (groupHealth <= 79 && groupHealth >= 50) {
        localCopyOfGameInstance.messages = 'Fair';
    } else if (groupHealth <= 49 && groupHealth >= 20) {
        localCopyOfGameInstance.messages = 'Poor';
    } else if (groupHealth <= 19 && groupHealth >= 1) {
        localCopyOfGameInstance.messages = 'Very Poor';
    } else if (groupHealth == 0 ) {
        localCopyOfGameInstance.messages = 'Your journey is over. You have died.';
    }

};



var resetGame = function () {
    getGameData();
    console.log('UUh fuckign here');
    this.resetGameInstance =  new gameModel.gameData(localCopyOfGameInstance.username, localCopyOfGameInstance.playerNames, localCopyOfGameInstance.startMonth, localCopyOfGameInstance.playerProfession, localCopyOfGameInstance.gameSessionID);  /* Create game instance from username, group members, and start month */
    localCopyOfGameInstance = this.resetGameInstance;
    console.log('Here');
    setGameData();
};



/* Obtain latest gameData of selected session/instance */
var getGameData = function () {
    localCopyOfGameInstance = setupController.get_selectedGameInstance();
};



/* Update setupController.js with latest gameData */
var setGameData = function () {
    setupController.set_selectedGameInstance(localCopyOfGameInstance);
};



/* Exports */

exports.changePace = function(req, res) {
    this.paceName = req.body.paceName;
    changePace(this.paceName);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send('New, changed, pace: ' + localCopyOfGameInstance.currentPace.paceName);
};



exports.updateGame = function (req, res) {
    updateGame();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(JSON.stringify(localCopyOfGameInstance));   /* JSON of game data returned as response */
    setupController.local_getSessionInfo();             /* Game data also logged within the console */
};



exports.resetGame = function (req, res) {
    resetGame();
    setupController.local_getSessionInfo();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send('[Game Session ID: ' + localCopyOfGameInstance.gameSessionID + '] Reset Successful.');
};




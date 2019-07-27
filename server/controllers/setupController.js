/* Create game and adjust the settings/preferences per game session */

/* - Create new game using gameInstance() within gameData.js
        - gameInstance creates a new gameData object and returns it
        - gameSessionID is the current length of gameSessions

 * - Assign the newly created game instance as that which is selected
 *
 * - Add gameInstance to gameSessions
 */


/*  Imports   */
const terrain = require("../models/terrain.js");
const weather = require("../models/weather.js");
const pace = require("../models/pace.js");
var gameModel = require('../models/gameData.js');

/* Variable Declaration */
var existingPlayers= new Array();
var gameSessions = new Array();   /* All game sessions */

var selectedGameInstance;



var createNewGame = function (username, playerNames, wagonLeader, startMonth, startDate, playerProfession) {
    var gameInstance = new gameModel.gameData(username, playerNames, wagonLeader, startMonth, startDate, playerProfession, gameSessions.length);  /* Create game instance from username, group members, and start month *//* ID is assigned as well */
    selectedGameInstance = gameInstance;
    gameSessions.push(selectedGameInstance);  /* Add to gameSessions list */
    //getSessionInfo();
};



var updateProfession = function (profession) {
    console.log("Previous Profession: " +String(selectedGameInstance.playerProfession));
    console.log("Attempting to update profession to..." +String(profession));
    selectedGameInstance.playerProfession = profession;
};



var updatePlayerName = function (username) {
    selectedGameInstance.username = username;
};


var updateStartMonth = function (startMonth) {
    console.log("Previous Start Month: " +String(selectedGameInstance.startMonth));
    console.log("Setting Start Month As: " +String(startMonth));
    selectedGameInstance.startMonth = startMonth;
};



var getSessionInfo = function() {
    console.log(" -------------------------------------");

    console.log("----- Game Session Information-----");

    console.log("Game Session ID: " + selectedGameInstance.gameSessionID);
    console.log("Username: " +selectedGameInstance.username);
    console.log("Profession: " + selectedGameInstance.playerProfession);

    console.log("-----       Game Stats      -----");
    console.log("Start Month: " + selectedGameInstance.startMonth);
    console.log("Start Date: " + selectedGameInstance.startDate);
    console.log("Days on Trail: " + selectedGameInstance.daysOnTrail);
    console.log("Miles Traveled: " + selectedGameInstance.milesTraveled);
    console.log("($) Money: " + selectedGameInstance.playerMoney);

    console.log("- Pace - ");
    console.log("Pace: " + selectedGameInstance.currentPace.paceName);
    console.log("Pace - Health Change: " + selectedGameInstance.currentPace.healthChange);
    console.log("Pace - Miles Per Day: " + selectedGameInstance.currentPace.milesPerDay);

    console.log("- Weather & Terrain - ");
    console.log("Weather Name: " + selectedGameInstance.currentWeather.weatherName);
    console.log("Weather - Health Change: " + selectedGameInstance.currentWeather.healthChange);
    console.log("Weather - Mile Change: " + selectedGameInstance.currentWeather.mileChange);
    console.log("-")
    console.log("Terrain Name: " + selectedGameInstance.currentTerrain.terrainName);
    console.log("Terrain Image URL: " + selectedGameInstance.currentTerrain.imageURL);

    console.log("-----   Group Information   -----");
    console.log("Group Members: " + selectedGameInstance.playerNames);
    console.log("Group Health: " + selectedGameInstance.groupHealth);
    console.log("Player Status: " + selectedGameInstance.playerStatus);
    console.log("Messages: " + selectedGameInstance.messages);

    console.log(" -------------------------------------");
};


/* Used to call function from external .js function without the having to have been called via POST */
var local_getSessionInfo = function () {
    getSessionInfo();
};


var local_createNewGame = function (username, playerNames, startMonth, playerProfession) {
    selectedGameInstance = createNewGame(username, playerNames, startMonth, playerProfession);
    return selectedGameInstance;
}


/* Returns gameData object */
var get_selectedGameInstance = function () {
    return selectedGameInstance;
}

/* Sets gameData object to that which is passed as a parameter*/
var set_selectedGameInstance = function (selectedGameInstance) {
    this.selectedGameInstance = selectedGameInstance;
}


var getGameScreen = function () {

};


var acceptRequest = function (req, res) {
    this.username = req.body.username;
    this.playerNames = req.body.playerNames;
    this.startMonth = req.body.startMonth;
    this.wagonLeader = req.body.wagonLeader;
    this.playerProfession = req.body.playerProfession;

    console.log(this.username)
    console.log(this.playerNames)
    console.log(this.startMonth)
    console.log(this.wagonLeader)
    console.log(this.playerProfession)

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send('received');

}





async function instantiateNewGame(req, res) {
    //username, playerNames, wagonLeader, startMonth, playerProfession
    /* Example Request Body: {'username': 'ZachHappel', 'groupMemberNames': ['BaileyV', 'ChrisB'], 'startMonth': 'July'} */
    this.username = req.body.username;
    this.playerNames = req.body.playerNames;
    this.startMonth = req.body.startMonth;
    this.wagonLeader = req.body.wagonLeader;
    this.playerProfession = req.body.playerProfession;
    //this.gameSessionID  gets automatically assigned within the function itself
    try {
        let newGameInstance = await createNewGame(this.username, this.playerNames, this.wagonLeader, this.startMonth, this.playerProfession);  /*Send username, group members, and month to starts */
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.statusCode = '200';
        res.send(JSON.stringify(req.body));
        console.log(JSON.stringify(req.body));
    } catch (err) {
        next(err);
        //res.status(res.statusCode)
    }};
/*
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(JSON.parse(req.body));
// res.send('New Game.   Owner: ' + this.username + " Members: " + this.groupMemberNames + " Start Month: " + this.startMonth + " Profession: "+String(this.playerProfession));
// getSessionInfo();





/* Exports */




exports.instantiateNewGame = instantiateNewGame;


exports.createNewGame1 = function(req, res) {

    /* Example Request Body: {'username': 'ZachHappel', 'groupMemberNames': ['BaileyV', 'ChrisB'], 'startMonth': 'July'} */
    this.username = req.body.username;
    this.playerNames = req.body.playerNames;
    this.startMonth = req.body.startMonth;
    this.wagonLeader = req.body.wagonLeader;
    this.playerProfession = req.body.playerProfession;
    //this.gameSessionID  gets automatically assigned within the function itself

    createNewGame(this.username, this.playerNames, this.startMonth, this.playerProfession);  /*Send username, group members, and month to starts */

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(JSON.parse(req.body));
   // res.send('New Game.   Owner: ' + this.username + " Members: " + this.groupMemberNames + " Start Month: " + this.startMonth + " Profession: "+String(this.playerProfession));
   // getSessionInfo();
};






exports.updateProfession = function(req, res) {
    this.profession = req.body.profession;
    console.log("JSON Profession: "+String(this.profession));
    updateProfession(this.profession);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send('Profession Updated; New Profession: ' + String(this.profession));
    /* getSessionInfo(); */
};


exports.updatePlayerName = function(req, res) {
    this.username = req.body.username;
    updatePlayerName(this.username);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(JSON.stringify(selectedGameInstance.username));
    /* getSessionInfo(); */
};



exports.updateStartMonth = function(req, res) {
    this.startMonth = req.body.startMonth;
    updatePlayerName(this.startMonth);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    getSessionInfo();
};



exports.amountOfPlayersInSystem = function(req, res){
    let currentAmount = returnAmountOfPlayersInSystem();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(currentAmount);
};



exports.getGameData = function(req, res) {
// return json of the game data
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(JSON.stringify(selectedGameInstance));
};

/* I think that removing req, res would allow for me to remove the local adaptation of this function */
exports.getSessionInfo = function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    getSessionInfo();                                       /* Console logging */
    res.send(getSessionInfo());
}


exports.local_getSessionInfo = local_getSessionInfo;
exports.local_createNewGame = local_createNewGame;
exports.set_selectedGameInstance = set_selectedGameInstance;
exports.get_selectedGameInstance = get_selectedGameInstance;



exports.selectedGameInstance = this.selectedGameInstance;
exports.gameSessions = this.gameSessions;


/* New */
module.exports.createNewGame  = createNewGame;


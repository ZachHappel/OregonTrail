/* Create game and adjust the settings/preferences per game session */
const pace = require("../models/pace.js");
var gameModel = require('../models/gameData.js');


var existingPlayers= new Array();
var gameSessions = new Array();   /* All game sessions */

var selectedGameInstance;



/* - Create new game using gameInstance() within gameData.js
        - gameInstance creates a new gameData object and returns it
        - gameSessionID is the current length of gameSessions

 * - Assign the newly created game instance as that which is selected
 *
 * - Add gameInstance to gameSessions
 */
var createNewGame = function (username, playerNames, startMonth) {
    var gameInstance = gameModel.createGameInstance(username, playerNames, startMonth, gameSessions.length); /* Create game instance from username, group members, and start month */
    /* ID is assigned as well */
    var selectedGameInstance = gameInstance;
    gameSessions.push(selectedGameInstance);  /* Add to gameSessions list */

};


var updateProfession = function (profession) {
    console.log("Attempting to update profession to..." +String(profession));
    selectedGameInstance.playerProfession = profession;
};



var updatePlayerName = function (username) {
    selectedGameInstance.username = username;
};


var updateStartMonth = function (startMonth) {
    selectedGameInstance.startMonth = startMonth;
    saveGame(selectedGameInstance.gameSessionID);
};




var getGameScreen = function () {

};



class Player {

    constructor(username, groupMemberNames, startMonth){

        this.username = username;
        this.groupMemberNames = groupMemberNames;
        this.startMonth = startMonth;
    };

};



function initNewPlayer(username, groupMemberNames, startMonth) {
    /* Create new Player and add to list */
    /* And combining names of group members into a String */

    var newPlayer = new Player(username, groupMemberNames, startMonth);
    existingPlayers.push(newPlayer);
    console.log('Existing Player Count: '+String(existingPlayers.length));

    var groupMemberNamesString = '';

    for (x = 0; x <= groupMemberNames.length - 1; x++ ){
        if (x != groupMemberNames.length -1) {
            groupMemberNamesString = groupMemberNamesString + String(groupMemberNames[x]) + ',';
        } else {
            groupMemberNamesString = groupMemberNamesString + String(groupMemberNames[x]);
        }
    }
    return "[Player Added]  Username: "+String(username) + " [Group Member Names]: " + groupMemberNamesString + "[Month Started]: "+String(startMonth);
};



function returnAmountOfPlayersInSystem(){
    return "Existing Player Count: " + String(existingPlayers.length);
};



/* Exports */

exports.createNewGame = function(req, res) {
    /* Example Request Body: {'username': 'ZachHappel', 'groupMemberNames': ['BaileyV', 'ChrisB'], 'startMonth': 'July'} */
    this.username = req.body.username;
    this.groupMemberNames = req.body.groupMemberNames;
    this.startMonth = req.body.startMonth;
    /*
    this.gameSessionID = req.body.gameSessionID;
    */

    createNewGame(this.username, this.groupMemberNames, this.startMonth);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send('Game created');
};

exports.updateProfession = function(req, res) {

    this.profession = req.body.profession;
    Console.log("JSON Profession: "+String(this.profession));
    updateProfession(this.profession);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send('Profession Updated; New Profession...' + String(this.profession));
};









exports.createNewPlayer = function(req, res) {
    this.username = req.body.username;
    this.groupMemberNames = req.body.groupMemberNames;
    this.startMonth = req.body.startMonth;

    initNewPlayer(this.username, this.groupMemberNames, this.startMonth);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send('Player Added');

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
    res.send(gameData);
};





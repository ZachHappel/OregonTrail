const topTenModel = require("../models/topTen.js");

/** Initialize object containing the two arrays: AllScores, and TopScoreArray */
var OregonTopTen = new topTenModel.TopTen();


/* OregonTopTen is the instantiation of the TopTen Class within the topten.js model
   Contains two arrays: AllScores, TopScoreArray
   Takes scores within AllScores, sorts them, and then takes the top 10 and saves them to variable TopScoreArray
*/


var sortTopTen = function () {
    /* Sort scores within AllScores*/
    OregonTopTen.AllScores = OregonTopTen.AllScores.sort((a, b) => (a.score > b.score) ? 1: -1);

    for (var i = OregonTopTen.AllScores.length; i >= OregonTopTen.AllScores.length - 10; i--) {

        if(OregonTopTen.AllScores[i] == null) {
            /* Not enough scores to populate the entire top ten */
        } else {
            OregonTopTen.TopScoreArray.push(OregonTopTen.AllScores[i]);
            console.log('Adding to list');
        }

    }

};

/* Push new score to the AllScores array */
var saveTopScore = function (username, score, dateOfScore) {
    /** Create new TopScore object and push it to AllScores **/
    let newScore =  new topTenModel.TopScore(username, score, dateOfScore);
    OregonTopTen.AllScores.push(newScore);
};


/* Example TopScores for the purpose of displaying the scoreboards functionality */
var initializeScores = function(){
    saveTopScore("Prof. Gormanly", 100, "03-21-2019");
    saveTopScore("Zach Happel", 97, "03-21-2019");
    saveTopScore("Megan Happel", 94, "03-14-2019");
    saveTopScore("Bailey Villipart", 91, "03-21-2019");
    saveTopScore("Joe Esperanzo", 95, "12-01-2018");
    saveTopScore("Emily Valencia", 67, "05-24-2016");
    saveTopScore("Hailey Lendau", 89, "08-17-2018");
    saveTopScore("Francis Alturo", 82, "05-12-2018");
    saveTopScore("Mason Dixon", 74, "01-16-2018");
    saveTopScore("Alan Turing", 100, "11-12-1936");
    saveTopScore("Alfred Hitchcock", 98, "06-16-1960");
    saveTopScore("Natalie Frangione", 99, "08-21-1998");

    sortTopTen();
    /* Including twelve in order to spice things up */

};


/* Initializes the examples' scores and returns -- via JSON -- the leaderboard */
exports.displayExample = function (req, res) {
    initializeScores();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(OregonTopTen.TopScoreArray);
}

exports.displayTopTen = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send(OregonTopTen.TopScoreArray);
}


exports.saveTopScore = function(req, res) {
    this.username = req.body.username;
    this.score = req.body.score;
    this.dateOfScore = req.body.dateOfScore;
    saveTopScore(this.username, this.score, this.dateOfScore);
    sortTopTen();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.send("Top Score submitted successfully");

}
const express = require('express');
const app = express(), bodyParser = require('body-parser')
app.use(express.static('client/public'));
const port = 1337


app.use(bodyParser.json());


var setupController = require('./controllers/setupController.js');


app.get('/', function (req, res) {
    res.sendFile('index.html', {root: './client/views' })
})

app.get('/mainmenu.html', function (req, res) {
    res.sendFile('mainmenu.html', {root: './client/views' })
})

app.post('/setup.html', function (req, res) {

    body = req.body;
    console.log(body);
    /*
    var UserClass = require('./models/user.js');
    var user1 = new UserClass("Zach");
    user1.changeName("Harry");
    console.log(user1.returnName());
    */

})

app.get('/setup.html', function (req, res) {

    res.sendFile('setup.html', {root: './client/views' });
    console.log("GET req made");

    /*
    var UserClass = require('./models/user.js');
    var user1 = new UserClass("Zach");
    user1.changeName("Harry");
    console.log(user1.returnName());
    */

})


app.get('/topten.html', function (req, res) {
    res.sendFile('topten.html', {root: './client/views' })
})

app.get('/trail.html', function (req, res) {
    res.sendFile('trail.html', {root: './client/views' })
})


/*app.use('/scripts', express.static(__dirname + './client/public/js')); */


app.listen(port, () => console.log(`Example app listening on port ${port}!`));



exports.createNewGameAsync1 = function(req, res) {

    /* Example Request Body: {'username': 'ZachHappel', 'groupMemberNames': ['BaileyV', 'ChrisB'], 'startMonth': 'July'} */
    this.username = req.body.username;
    this.playerNames = req.body.playerNames;
    this.startMonth = req.body.startMonth;
    this.wagonLeader = req.body.wagonLeader;
    this.playerProfession = req.body.playerProfession;
    //this.gameSessionID  gets automatically assigned within the function itself
    try {
        let newGameInstance = await createNewGame(this.username, this.playerNames, this.startMonth, this.playerProfession);  /*Send username, group members, and month to starts */
        res.status(201).gameData(newGameInstance);
    } catch (err) { res.status(res.statusCode)}};



res.setHeader('Content-Type', 'application/json');
res.setHeader('Access-Control-Allow-Origin', "*");
res.send(JSON.parse(req.body));
// res.send('New Game.   Owner: ' + this.username + " Members: " + this.groupMemberNames + " Start Month: " + this.startMonth + " Profession: "+String(this.playerProfession));
// getSessionInfo();
};

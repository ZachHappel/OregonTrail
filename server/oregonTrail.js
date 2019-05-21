const express = require('express');
const app = express()
const router = express.Router();
const port = 1337;

const bodyParser = require('body-parser');

app.use(express.static('client/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/* Importing Controllers */
const gameController = require('./controllers/gameController.js');
var setupController = require('./controllers/setupController.js');
var topTenController = require('./controllers/topTenController.js');

/* --------------------- */



/* Directories */

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: './client/views' })
});


app.get('/mainmenu.html', function (req, res) {
    res.sendFile('mainmenu.html', {root: './client/views' })
});


app.get('/setup.html', function (req, res) {
    res.sendFile('setup.html', {root: './client/views' });
});


app.get('/topten.html', function (req, res) {
    res.sendFile('topten.html', {root: './client/views' })
})


app.get('/trail.html', function (req, res) {
    res.sendFile('trail.html', {root: './client/views' })
})



/* API calls */


/* Setup Controller */


app.route('/api/setup/create') /* Creates new game */
    .post(setupController.createNewGame);

app.route('/api/setup/update_profession')
    .post(setupController.updateProfession);

app.route('/api/setup/update_username')
    .post(setupController.updatePlayerName)
    .get(setupController.updatePlayerName);

app.route('/api/setup/update_month')
    .post(setupController.updateStartMonth);

app.route('/api/setup/game_data')
    .get(setupController.getGameData);


/* Game Controller */

app.route('/api/game/change_pace')
    .post(gameController.changePace);

app.route('/api/game/update')
    .get(gameController.updateGame);

app.route('/api/game/reset')
    .post(gameController.resetGame);


/* Top Ten Controller */

app.route('/api/scoreboard/example')
    .get(topTenController.displayExample);

app.route('/api/scoreboard/save_score')
    .post(topTenController.saveTopScore);

app.route('/api/scoreboard/view')
    .get(topTenController.displayTopTen);



app.listen(port, () => console.log(`Example app listening on port ${port}!`));





/*
.post(function(req, res) {
    console.log(req.body);
})
*/

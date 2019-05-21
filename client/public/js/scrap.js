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


var isLoaded = false;


/** View-related variables **/
var menuContainer = document.getElementById('menuContainer');

var selection_newGame = false;

var occupationScreen = false;   // Screen has been displayed or not
var occupationChosen = false;   // Chosen or not
var declaredOccupation;         // Occupation name

var usernameScreen = false;      // Screen has been displayed or not
var usernameSelected = false;  // Has username been selected
var declaredUsername;            // Username

var additionalInformationScreen = false;
var informationChosen = false;

var summaryScreen = false;

var sessionCreated;
var receivedSessionData;


/* Representative of keyCodes 1 - 4, which are used for deducing the users choice of occupation */
var optionKeys = ['49', '50', '51', '52'];

var session_data = {
    'username' : '',
    'playerNames': '',
    'wagonLeader': '',
    'startMonth' : '',
    'playerProfession' : ''
};





// All user input is done via keyboard-keystrokes, this EventListener is responsible for all set-up user input


window.onkeydown = function(key) {

    submittedKey = String(key.keyCode);
    keyboardButton_Enter = '13';
    console.log(key.keyCode);
    console.log(optionKeys.includes(submittedKey));
    console.log('Occupation Screen Status: ' + occupationScreen);

    // If user hits '1' --> screen progresses
    if (selection_newGame == false && submittedKey == '49') {
        selection_newGame = true;                                                   // newGame is true
        hideInitialGameChoiceButtons();
        displayOccupations(); // Shows occupations and makes bool. true
    }

    // Acquires the occupation name associated with the option values (within array) dynamically
    else if (occupationScreen == true && optionKeys.includes(submittedKey)) {
        console.log(document.getElementById("menuItem_" +
            (String(optionKeys.indexOf(submittedKey) + 1))));
        declaredOccupation = document.getElementById("menuItem_" +
            (String(optionKeys.indexOf(submittedKey) + 1))).getAttribute("value");
        session_data['playerProfession'] = declaredOccupation;
        console.log("Declared Occupation: " + String(declaredOccupation));
        occupationChosen = true;
        hideOccupationDOMs();
        loadUsernameInputIO();

    } else if (usernameScreen == true && usernameSelected == false && submittedKey == keyboardButton_Enter) {
        declaredUsername = document.getElementById('usernameInput').value;
        session_data['username'] = declaredUsername;
        console.log('Declared Username: ' + declaredUsername);
        usernameSelected = true;
        loadAdditionalInformation(); // Input I/O gets replaced, so need to hide

    } else if (additionalInformationScreen == true && informationChosen == false && submittedKey == keyboardButton_Enter) {
        informationChosen = true;
        initializeSessionData();
    } else if (informationChosen == true && sessionCreated == true && submittedKey == keyboardButton_Enter) {
        console.log('Getting game data and loading summary...')
        getGameSessionData();
    }


}







 /* ASYNC or Non-ASYNC XMLHttpRequest */

// Response status code: GET = 304, informational = 1xx, 204 = No Content success
function makeRequest(url, method, headers, asyncBool, data){
    console.log('Here')
    console.log(data);

    var req_options = {
        url: url,
        method: method,
        body: JSON.stringify(session_data),
        async: asyncBool,
        headers: headers, //If these params were directly attached to the req, headers would be in brackets
    };

    function createAndSendRequest() {

        var req = new XMLHttpRequest();
        req.open(req_options.method, req_options.url, req_options.async);

        if (req_options.method == 'GET') {
            req.responseType = 'text';
            req.onload = function (){
                let responseJSON = JSON.parse(req.responseText);
                console.log('GET Response: ');
                console.log(responseJSON);
                return responseJSON;
            };

            req.send();

        } else {
            req.setRequestHeader(req_options.headers[0], req_options.headers[1]);
            req.send(req_options.body)
        }
    }

    createAndSendRequest();
}



function finalKeyValueUpdateToSessionData(){
    let startDate = document.getElementById('startDate');
    session_data['playerNames'] = document.getElementById('playerNames').value;
    session_data['wagonLeader'] = document.getElementById('wagonLeader').value;
    session_data['startMonth'] = startDate.options[startDate.selectedIndex].value;
    let now_time = new Date();
    session_data['startDate'] = String(now_time);
}



/* The Promise was initially created because session_data was declared as null, to later be populated
   This was changed and session_data gets updated as the user inputs information

   I, however, decided to keep the Promise because it displays my knowledge of them
           ( This is why the if-clause checks such a silly condition )
 */
function getUserInputPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            finalKeyValueUpdateToSessionData()
            if (session_data['startDate'] == null){
                console.log('Data not loaded into memory as of this instant');
                reject();
            } else {
                console.log('Data loaded into session_data');
                resolve();
            }
        }, 1000);

    })
}

function makeGameSessionRequest(){
    makeRequest('/api/setup/instantiate_game', 'POST', ['Content-type', 'application/json'], false, session_data);
    sessionCreated = true;
    console.log("Session Created: " + sessionCreated);
}


function initializeSessionData() {
    getUserInputPromise()                              // Gather user I/O
        .then(makeGameSessionRequest)                  // Send POST request to server
        .catch(err =>console.log('Error: ' + err));
}





function getGameSessionDataPromise(){
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            receivedSessionData = makeRequest('/api/game/game_data', 'GET', ['Content-type', 'application/json'], true, 'Not sending data');
            if (receivedSessionData == null) {
                console.log('Received session data is null');
                reject();
            } else {
                console.log('Game session data received from server');
                resolve();
            }
        }, 1000);
    })
}



//Calls the Promise which makes the request to server
function getGameSessionData(){
    getGameSessionDataPromise()
        .then(populateSummary)
        .catch(err =>console.log('Error getting game session from server: ' + err));
}






function displayOccupations(){
    var parentElement = menuContainer;

    occupation_1 = document.createElement('h3');
    occupation_1.setAttribute("id", "menuItem_1");
    occupation_1.setAttribute("value", "Banker");
    occupation_1.innerHTML = "1. Be a banker from Boston";

    occupation_2 = document.createElement('h3');
    occupation_2.setAttribute("id", "menuItem_2");
    occupation_2.setAttribute("value", "Carpenter");
    occupation_2.innerHTML = "2. Be a carpenter from Ohio";

    occupation_3 = document.createElement('h3');
    occupation_3.setAttribute("id", "menuItem_3");
    occupation_3.setAttribute("value", "Farmer");
    occupation_3.innerHTML = "3. Be a farmer from Illinois";

    occupation_4 = document.createElement('h3');
    occupation_4.setAttribute("id", "menuItem_4");
    occupation_4.setAttribute("value", "InformationRequest");
    occupation_4.innerHTML = "4. Find out the differences between the choices";

    parentElement.append(occupation_1);
    parentElement.append(occupation_2);
    parentElement.append(occupation_3);
    parentElement.append(occupation_4);

    occupationScreen = true;             // Parameter which allows user to make a seelction
}



function hideInitialGameChoiceButtons(){
    document.getElementById('menuItem_01').style.display = 'none';
    document.getElementById('menuItem_00').style.display = 'none';
}



function hideOccupationDOMs() {
    document.getElementById('menuItem_1').style.display = 'none';
    document.getElementById('menuItem_2').style.display = 'none';
    document.getElementById('menuItem_3').style.display = 'none';
    document.getElementById('menuItem_4').style.display = 'none';
}



function loadUsernameInputIO(){
    var parentElement = menuContainer;

    var linebreak = document.createElement('br');

    var inputLable = document.createElement('label');
    inputLable.setAttribute("for", "UsernameEntry"); /* "for" assigns label to UsernameEntry */
    inputLable.setAttribute("id", "inputLabel");
    inputLable.innerHTML = "Enter Username & Press Enter ";


    /*Username input */
    var usernameInput = document.createElement('input');
    usernameInput.setAttribute("id", "usernameInput");
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("name", "UsernameEntry");
;

    parentElement.append(inputLable);
    parentElement.append(linebreak);
    parentElement.append(usernameInput);

    usernameScreen = true;
}



                                 /**--------------------------------------------------/
                                /** loadSummary replaces loadAdditionalInformation **/
                               /**                                                **/


function loadAdditionalInformation() {
    console.log('loadAdditionalInformation');
    var tobeReplacedDOMContainer = document.getElementById('navWrapper');
    tobeReplacedDOMContainer.innerHTML = "<label for='playerNames' id='inputLabel'>Enter Names: </label>\n" +
        "<br>\n" +
        "<input id='playerNames' type='text' name='playerNames'>\n" +
        "<br>\n" +
        "\n" +
        "<label for='wagonLeader' id='wagonLeaderInput'>Enter Wagon Leader Name: </label>\n" +
        "<br>\n" +
        "<input id='wagonLeader' type='text' name='wagonLeader'>\n" +
        "<br>\n" +
        "\n" +
        "<label for='startDate'>Enter Wagon Leader Name: </label>\n" +
        "<select id='startDate'>\n" +
        "    <option value='Mar'>March</option>\n" +
        "    <option value='Apr'>April</option>\n" +
        "    <option value='May'>May</option>\n" +
        "    <option value='Jun'>June</option>\n" +
        "    <option value='Jul'>July</option>\n" +
        "</select>\n";

    additionalInformationScreen = true;
}

//Replace additionalInformation screen
function loadSummary() {
    console.log('loadSummary');
    var tobeReplacedDOMContainer = document.getElementById('navWrapper');
    tobeReplacedDOMContainer.innerHTML = "<label id='usernameLabel'> Username: </label>\n" +
        "<br>\n" +
        "<br>\n" +
        "<label id='wagonLeaderLabel'> Wagon Leader: </label>\n" +
        "<br>\n" +
        "<br>\n" +
        "<label id='occupationLabel'> Occupation: </label>\n" +
        "<br>\n" +
        "<br>\n" +
        "<label id='startMonthLabel'> Starting Month: </label>\n" +
        "<br>\n" +
        "<br>\n" +
        "<label id='startDateLabel'>Date Game Was Created: </label>\n" +
        "<br>\n" +
        "<br>\n" +
        "<label id='groupHealthLabel'>Group Health: </label>\n" +
        "<br>\n" +
        "<br>\n";
    summaryScreen = true;
}



function populateSummary(){
    loadSummary();
    var usernameLabel = document.getElementById('usernameLabel');
    var wagonLeaderLabel = document.getElementById('wagonLeaderLabel');
    var occupationLabel = document.getElementById('occupationLabel');
    var startMonthLabel = document.getElementById('startMonthLabel');
    var startDateLabel = document.getElementById('startDateLabel');
    var groupHealthLabel = document.getElementById('groupHealthLabel');

    if (groupHealthLabel) {

    }


}



window.addEventListener('load',
    function() {
        console.log('Loaded');
        isLoaded = true;
        playAudio();

    }, true);





//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////
// Information that is user submitted is then compiled ont
/*
function initFileBuilder (username, playerNames, wagonLeader, startMonth) {
    this.playerNamesArr = playerNames.split(" ");
    console.log(this.playerNamesArr);
    this.playerNamesJSONObject = ' "playerNames" : {';
    for (var plyr = 0; plyr <= playerNamesArr.length - 1; plyr++) {
        if (plyr != this.playerNamesArr.length -1) {
            console.log(this.playerNamesArr[plyr]);
            this.playerNamesJSONObject += '"' + this.playerNamesArr[plyr] + '" , ';
        } else {
            console.log(this.playerNamesArr[plyr]);
            this.playerNamesJSONObject += '"' +  this.playerNamesArr[plyr] + '" }, '
        };
    }


    this.initUserSesionInformation = '{"username" : "' + username + '" , '+ this.playerNamesJSONObject +
                                        '"wagonLeader":  "'+ wagonLeader +'", "startMonth" : "'+ startMonth +'" }';

    return this.initUserSesionInformation;
}

*/

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////




//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
///////////////////////////////////////////////////////////////////////////////
/*
function initDataPOST() {
    var userInputGeneratedDat = compiledJSONFormattedData;
    var XMLRequest = new XMLHttpRequest();
    XMLRequest.open("POST", '/api/setup/create_game_async', false);
    XMLRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    return new Promise(function(resolve, reject){


    });
}


 */

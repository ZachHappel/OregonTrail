var isLoaded = false;
var selection_NewOrPreviousGame = false; /* Triggered when the first option is made */
var selection_PreviousGame = false;


var menuContainerElement = document.getElementById("menuContainer");

var beginButton = document.getElementById("menuItem_01");
var continueButton = document.getElementById("menuItem_00");

var bankerButton = document.getElementById("menuItem_1");
var carpenterButton = document.getElementById("menuItem_2");
var farmerButton = document.getElementById("menuItem_3");
var otherButton = document.getElementById("menuItem_4");


var declaredUsername;


var menuContainer = document.getElementById('menuContainer');








window.onkeydown = function(key) {


    if (selection_NewOrPreviousGame == false) {

        var parentElement = menuContainer;

        if (key.keyCode == '49') {   /* New Game */



            beginButton.style.display = 'none';
            continueButton.style.display = 'none';


            var occupation_1 = document.createElement('h3');
            occupation_1.setAttribute("id", "menuItem_1");
            occupation_1.innerHTML = "1. Be a banker from Boston";

            var occupation_2 = document.createElement('h3');
            occupation_2.setAttribute("id", "menuItem_2");
            occupation_2.innerHTML = "2. Be a carpenter from Ohio";

            var occupation_3 = document.createElement('h3');
            occupation_3.setAttribute("id", "menuItem_3");
            occupation_3.innerHTML = "3. Be a farmer from Illinois";

            var occupation_4 = document.createElement('h3');
            occupation_4.setAttribute("id", "menuItem_4");
            occupation_4.innerHTML = "4. Find out the differences between the choices";

            parentElement.append(occupation_1);
            parentElement.append(occupation_2);
            parentElement.append(occupation_3);
            parentElement.append(occupation_4);

            selection_NewOrPreviousGame = true;





        } else if (key.keyCode == '50') {   /* Continue previous game */

            beginButton.style.display = 'none';
            continueButton.style.display = 'none';

            var linebreak = document.createElement('br');

            var inputLable = document.createElement('label');
            inputLable.setAttribute("for", "UsernameEntry");
            inputLable.setAttribute("id", "inputLabel");
            inputLable.innerHTML = "Enter Username & Press Enter ";

            var usernameInput = document.createElement('input');
            usernameInput.setAttribute("id", "usernameInput");
            usernameInput.setAttribute("type", "text");
            usernameInput.setAttribute("name", "UsernameEntry");
            usernameInput.setAttribute("name", "submittedUsername");

            parentElement.append(inputLable);
            parentElement.append(linebreak);
            parentElement.append(usernameInput);

            selection_NewOrPreviousGame = true;
            selection_PreviousGame = true;
            console.log('Now waiting for "Enter"... ');


            /* Do something for continue *
            /  Have user enter  Username
             */

        }
    }

    if (selection_NewOrPreviousGame == true && selection_PreviousGame == true) {
        /* If user hits 'Enter' after being asked to provide username */

        if (key.keyCode == '13') {    /* 'Enter  */
            console.log('Enter');
            declaredUsername = document.getElementById("usernameInput").value;
            console.log('Declared Username: ' + declaredUsername);


        }

    }






    
    if (key.keyCode == '32'){
        pauseAudio();
        window.location = 'http://localhost:1337/mainmenu.html';
    }
    

};



window.addEventListener('load', 
    function() {
        console.log('Loaded');
        isLoaded = true;
        playAudio();

    }, true);
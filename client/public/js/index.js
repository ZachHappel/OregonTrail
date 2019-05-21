var startingOpacity = 1.00;
var textElement = document.getElementById("startText");

var ascending = false;


function callForTheAssignmentOfChanging(percentage){
    window.setTimeout(setOpacityPercentage, 10, percentage);
}


function setOpacityPercentage(percentage){
    textElement.style.opacity = percentage;
    window.setTimeout(waitAndAssignNextPercentage, 10, percentage);
}

function waitAndAssignNextPercentage(percentage){
    
    if (percentage <= 0.25) {
        percentage = percentage + 0.01;
        ascending = true;
    } else if (percentage >= 1.00) {
        percentage = percentage - 0.01;
        ascending = false;
    }
    
    if (ascending == true) {
        percentage = percentage + 0.01;
    } else {
        percentage = percentage - 0.01;
    }
    
    window.setTimeout(callForTheAssignmentOfChanging, 10, percentage);
}



window.addEventListener('load', 
    function() {
        console.log('Loaded');
        callForTheAssignmentOfChanging(startingOpacity);
        enableAudio(); /* Allows audio to play */
        playAudio();
    }, true);


window.onkeydown = function(key) {
    if (key.keyCode == '32'){
        pauseAudio();
        window.location = 'http://localhost:1337/mainmenu.html';        
    }


};

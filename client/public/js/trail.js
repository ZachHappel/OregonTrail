var isLoaded = false;
var timeWhenAccessing_Trail;




window.onkeydown = function(key) {
    if (key.keyCode == '32'){
        pauseAudio();
        window.location = 'http://localhost:1337/mainmenu.html';
    }
};


window.addEventListener('load', 
    function() {
        playAudio();
        
    }, true);



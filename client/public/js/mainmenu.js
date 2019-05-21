var isLoaded = false;



window.onkeydown = function(key) {
    if (key.keyCode == '49'){
        pauseAudio();
        window.location = 'http://localhost:1337/trail.html';
        
    } else if (key.keyCode == '50') {
        pauseAudio();
        window.location = 'http://localhost:1337/setup.html';
        
    } else if (key.keyCode == '51') {

        window.location = 'http://localhost:1337/topten.html';
        playPauseSwitchResume(audio, 'topten.html');
        
    } else if (key.keyCode == '52') {  /* 4. Enable/Disable audio */
        /* Check current status of the audio */
        if (window.localStorage.audioState == 'enabled') {
            pauseAudio();
            disableAudio();
        } else {
            enableAudio();
            playAudio();
        }
    
    } else if (key.keyCode == '187') {
        increaseVolume();
    } else if (key.keyCode == '189') {
        decreaseVolume();
    }

    else {};
    

};



window.addEventListener('load', 
    function() {
        console.log('Loaded');
        isLoaded = true; 
        playAudio();
        
    }, true);
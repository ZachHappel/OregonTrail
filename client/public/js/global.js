var audioCurrentTime;

audio = new Audio();

audio.src = "./music/oregonTrailMusic.mp3";
audio.loop = true;




function saveCurrentTime() {

    if (localStorage.getItem("currentTimeLS") === null) {
        window.localStorage.setItem("currentTimeLS", audio.currentTime);
      } else {
          window.localStorage.currentTimeLS = audio.currentTime;
      }
}


function pauseAudio() {

    audio.pause();
    saveCurrentTime();
    
    console.log("------------");
    console.log("Paused...");
    console.log("Time: "+ audio.currentTime);
    console.log("------------");
};


function playAudio(){

    /* First check audio state status */
    if (window.localStorage.audioState == 'enabled') {

        if (typeof window.localStorage.currentTimeLS !== 'undefined') {
            console.log("CurrentTimeLS: " + parseFloat(window.localStorage.currentTimeLS));
            
            if (isFinite(window.localStorage.currentTimeLS)) {
                console.log("Current Time Main Menu: "+window.localStorage.currentTimeLS);
                audio.currentTime = parseFloat(window.localStorage.currentTimeLS);
                audio.play();
                console.log('Play2');   
            } else {
                audio.play();
                console.log('PlayNonFinite');
            }
                 
        } else {
            audio.play();
            console.log('Play1');
        }
    
    } else {
        console.log('Audio Status: Disabled')
    }

    
}


function disableAudio(){
    window.localStorage.setItem("audioState", "disabled");
}

function enableAudio(){
    window.localStorage.setItem("audioState", "enabled");
}


function decreaseVolume(){
    if (typeof window.localStorage.volumeState == 'undefined') {
        window.localStorage.setItem("volumeState", "0.9");
        console.log("Defining Volume in decreaseVolume");
        console.log(parseFloat(window.localStorage.volumeState));
    } else {
        var currentVolume = parseFloat(window.localStorage.volumeState);
        
        if (currentVolume >= 0.1) {
            window.localStorage.volumeState = parseFloat(window.localStorage.volumeState) - 0.1;
            console.log(parseFloat(window.localStorage.volumeState));
        } else {
            alert("Volume at Minimum");
        }
    }

    audio.volume = parseFloat(window.localStorage.volumeState);

}

function increaseVolume(){
    /* If volume does not already exist within local storage, create
       it and assign value of 1.0 */

    if (typeof window.localStorage.volumeState == 'undefined') {
        window.localStorage.setItem("volumeState", "1.0");
        console.log("Defining Volume in decreaseVolume");
        console.log(parseFloat(window.localStorage.volumeState));
        
    } else {
        /*If it does exist, and does not exceed 1.0, increase
         the volume by 0.1 */
         
        var currentVolume = parseFloat(window.localStorage.volumeState);
        if (currentVolume == 1.0) {
            console.log(parseFloat(window.localStorage.volumeState));
            alert('Volume at Maximum');
        } else {
            window.localStorage.volumeState = currentVolume + 0.1;
            console.log(parseFloat(window.localStorage.volumeState));
        }
        
    }

    audio.volume = parseFloat(window.localStorage.volumeState);

}



function createDOMElement(newElementID, type, parentElement) {

}

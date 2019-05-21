var SortedTopScoreArray = new Array(10);


/** Define constructor for object TopScore **/
function TopScore(fullName, score, dateOfScore){
    this.fullName = fullName;
    this.score = score;
    this.dateOfScore = dateOfScore;
}


/** Each player is an instance of the object TopScore **/
var player0 = new TopScore("Prof. Gormanly", 100, "03-21-2019");
var player1 = new TopScore("Zach Happel", 97, "03-21-2019");
var player2 = new TopScore("Megan Happel", 94, "03-14-2019");
var player3 = new TopScore("Bailey Villipart", 91, "03-21-2019");
var player4 = new TopScore("Joe Esperanzo", 95, "12-01-2018");
var player5 = new TopScore("Emily Valencia", 67, "05-24-2016");
var player6 = new TopScore("Hailey Lendau", 89, "08-17-2018");
var player7 = new TopScore("Francis Alturo", 82, "05-12-2018");
var player8 = new TopScore("Mason Dixon", 74, "01-16-2018");
var player9 = new TopScore("Alan Turing", 100, "11-12-1936");
var player10 = new TopScore("Alfred Hitchcock", 98, "06-16-1960");
var player10 = new TopScore("Natalie Frangione", 99, "08-21-1998");
/** Including twelve in order to spice things up **/


/* Define TopScoreArray with players (11 of them) that have recorded      scores */
var TopScoreArray = [player0, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10]; 




/*Sort the entire array, and return a new array in which the order is   maintained */
function sortArray(){
    
    /* Comparing score number variables */ 
    SortedTopScoreArray = TopScoreArray.sort((a, b) => (a.score > b.score) ? 1: -1);
    
    console.log(SortedTopScoreArray);
    console.log('A');
    return SortedTopScoreArray;
}



function createElementsAndPublishRankings(allSortedScores){
    
    var h3TagToBeReplaced = document.getElementById('rankings');
    
    var combinedElementsToBeReturned;

    var leaderboardPosition = 1;
    var domElementBegin = "<h3>";
    var domElementEnd = "</h3>";
    var valueSpacer = '                     ';
    
    stopIndex = allSortedScores.length - 10;
    
    for (var y = allSortedScores.length - 1; y >= stopIndex; y-- ) {
        currentPersonObject = allSortedScores[y];
        
        singleH3Element = domElementBegin + leaderboardPosition + ". "+ valueSpacer + currentPersonObject.fullName + valueSpacer + currentPersonObject.score + valueSpacer + currentPersonObject.dateOfScore + domElementEnd;
        combinedElementsToBeReturned = combinedElementsToBeReturned + singleH3Element;
        leaderboardPosition++; 
        
    }
    h3TagToBeReplaced.innerHTML = combinedElementsToBeReturned;
}



function createElementsAndPublishRankings0(allSortedScores){
    var h3TagToBeReplaced = document.getElementById('rankings');
    
    var allLeaderboardEntries;

    var leaderboardPosition = 1;
    var domRowElementBegin = "<section class = 'lb-row'>";
    var domColumnElementBegin = "<section class = 'lb-column'>";
    var domColumnElementEnd = "</section>";
    var domRowElementEnd = "</seciton>";
    

    stopIndex = allSortedScores.length - 10;
    
    for (var y = allSortedScores.length - 1; y >= stopIndex; y-- ) {
        currentPersonObject = allSortedScores[y];

        leaderboardEntry = domRowElementBegin + domColumnElementBegin + leaderboardPosition + domColumnElementEnd + domColumnElementBegin + currentPersonObject.fullName + domColumnElementEnd + domColumnElementBegin + currentPersonObject.score + domColumnElementEnd + domColumnElementBegin + currentPersonObject.dateOfScore + domColumnElementEnd + domRowElementEnd;
        
        allLeaderboardEntries = allLeaderboardEntries + leaderboardEntry;
        leaderboardPosition++; 
        
    }
    h3TagToBeReplaced.innerHTML = allLeaderboardEntries;


}




/* Once the page is loaded, the players are sorted and the array returned from the function sortArray() is declared as a new array. 

*/

window.addEventListener('load', 
    function() {
        console.log('Loaded');
        sortedPlayerArray = sortArray();  /* All eleven persons */ 
        elementsForInsertionIntoHTML = createElementsAndPublishRankings0(sortedPlayerArray) ;
        playAudio();
    
    }, true);




    window.onkeydown = function(key) {

        if (key.keyCode == '32'){
            pauseAudio();
            document.location.href = 'http://localhost:1337/mainmenu.html';
        }
        
    
    };

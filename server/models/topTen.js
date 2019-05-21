class TopScore {

    constructor(username, score, dateOfScore) {
        this.username = username;
        this.score = score;
        this.dateOfScore = dateOfScore;
    }

}


class TopTen {

    constructor () {
        this.AllScores = [];
        this.TopScoreArray = [];

    }
}



exports.TopScore = TopScore;
exports.TopTen = TopTen;
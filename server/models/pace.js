
class Pace {

    constructor(paceName) {
        this.paceName = paceName;
        this.healthChange;
        this.milesPerDay;

        this.assignPace(paceName);

    }

    assignPace(paceName) {

        if (paceName == "Resting" || paceName == null) {
            this.paceName = paceName;
            this.healthChange = 5;
            this.milesPerDay = 0;
        } else if (paceName == "Steady") {
            this.paceName = paceName;
            this.healthChange = 0;
            this.milesPerDay = 20;
        } else if (paceName == "Strenuous") {
            this.paceName = paceName;
            this.healthChange = -3;
            this.milesPerDay = 30;
        } else if (paceName == "Grueling") {
            this.paceName = paceName;
            this.healthChange = -8;
            this.milesPerDay = 35;
        }

    }


}







/* Elaborate on these so that they can send JSON */
exports.Pace = Pace;

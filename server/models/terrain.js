
class Terrain {

    constructor (weatherName) {
        this.snowyTerrain = ['Snow', 'Blizzard'];
        this.overcastTerrain = ['Cool', 'Cold', 'Very Cold', 'Heavy Fog'];
        this.warmTerrain = ['Very Hot', 'Hot', 'Warm'];
        this.rainyTerrain = ['Rain', 'Heavy Rain'];


        this.imageURL = '';
        this.terrainName = this.getTerrain(weatherName);
    }

    /* Assigns file location to imageURL in addition to providing name to terrain */

    getTerrain(weatherName) {

        if (this.snowyTerrain.includes(weatherName)){
            this.imageURL = '';
            return 'Snowy Terrain';
        } else if (this.overcastTerrain.includes(weatherName)) {
            this.imageURL = '';
            return 'Snowy Terrain';
        } else if (this.warmTerrain.includes(weatherName)) {
            this.imageURL = '';
            return 'Warm Terrain';
        } else if (this.rainyTerrain.includes(weatherName)) {
            this.imageURL = '';
            return 'Rainy Terrain';
        } else {
            this.imageURL = '';
            return 'Unresolved Terrain';
        }

    }

}



exports.Terrain = Terrain;
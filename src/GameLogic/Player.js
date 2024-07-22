class Player {
    /**
     * @param {BlackJack} game Game that player is part of
     * @param {String} name Name of player
     */
    constructor(game, name) {
        /**
         * Game that player is part of
         * @type {BlackJack}
         */
        this.game = game;
        /**
         * Name of player
         * @type {String}
         */
        this.name = name;
        /**
         * Player's current bet
         * @type {Number}
         */
        this.bet = 0;
        /**
         * Player's hand of cards
         * @type {Array<Card>}
         */
        this.cards = [];
    }
    
    // function for if player hits
    hit() {
        
    }

    // function for if the player stands
    stay(){

    }

    // function for if player busts
    bust(){

    }
}
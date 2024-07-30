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
         * Player's current score
         * @type {Number}
         */
        this.score = 0;
        /**
         * Player's hand of cards
         * @type {Array<Card>}
         */
        this.cards = [];
        /**
         * Check for if player has busted
         * @type {Boolean}
         */
        this.isBusted = false;
        /**
         * Check for if player is standing
         * @type {Boolean}
         */
        this.isStanding = false;
    }

    reset() {
        this.score = 0;
        this.cards = [];
        this.isBusted = false;
    }
    
    // function for if player hits
    hit() {
        // Deal card to player
        const card = this.game.deck.pop();
        this.cards.push(card);
        // Calculate player score
        this.score = this.game.getTotal(player, this.cards);
        // If score > 21, bust
        if (this.score > 21)
            this.isBusted = true;
    }

    // function for if the player stands
    stay(){
        this.isStanding = true;
    }
}
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
         * Player's current score
         * @type {Number}
         */
        this.score = 0;
        /**
         * Player's hand of cards
         * @type {Array<Card>}
         */
        this.cards = [];
    }
    
    // function for if player hits
    hit() {
        // Deal card to player
        const card = this.game.deck.pop();
        this.cards.push(card);
        // Calculate player score
        this.score = this.game.getTotal(this.cards);
        // If score > 21, bust
        if (this.score > 21)
            this.bust()
    }

    // function for if the player stands
    stay(){

    }

    // function for if player busts
    bust(){

    }
}
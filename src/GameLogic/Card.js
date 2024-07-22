class Card {
    /**
     * @param {String} suit Card's suit (either "clubs", "diamonds", "hearts" or "spades")
     * @param {Number} value Card's pip value (1-13)
     */
    constructor(suit, value) {
        /**
         * Card's suit (either "clubs", "diamonds", "hearts" or "spades")
         * @type {String}
         */
        this.suit = suit;
        /**
         * Card's pip value (1-13)
         * @type {Number}
         */
        this.value = value;
    }
}
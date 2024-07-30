class CardSprite extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene Sprite context
     * @param {Number} x Horizontal position of sprite in scene
     * @param {Number} y Vertical position of sprite in scene
     * @param {String} suit Card's suit (either "clubs", "diamonds", "hearts" or "spades")
     * @param {Number} value Card's pip value (1-13)
     */
    constructor(scene, x, y, suit, value) {
        super(scene, x, y, `${suit}-${value}`);
        scene.add.existing(this);

        // Set object fields
        this.suit = suit;
        this.value = value;
    }

    /**
     * Flips the card over, swapping the texture between the front and back of the card.
     * Useful in case we want to do any animations when drawing from the deck
     */
    flip() {
        // If facing downwards, change texture to front of card
        if (this.texture.key === 'deck')
            this.setTexture(`${this.suit}-${this.value}`);
        // Otherwise, change texture to back of card
        else
            this.setTexture('deck');
    }
}
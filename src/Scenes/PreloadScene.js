class PreloadScene extends Phaser.Scene {
    // ===== Constructors =====

    constructor() {
        super("PreloadScene");
    }

    // ===== Phaser.Scene Overrides =====

    preload(){
        this.load.image('deck', '/Assets/card-back1.png');
    
        // Load cards
        const suits = [ 'clubs', 'diamonds', 'hearts', 'spades' ];
        suits.forEach(suit => {
            for (let i = 1; i <= 13; i++)
                this.load.image(`${suit}-${i}`, `/Assets/card-${suit}-${i}.png`);
        });
    }

    create() {
        // Create animations, if necessary

        // Start next scene
        this.scene.start("BlackJackScene");
    }
}
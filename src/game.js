const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 600,
    scene: {
        preload,
        create,
        update,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: false,
        }
    }
};

const game = new Phaser.Game(config);

function preload(){
 this.load.image('deck', '../Assets/card-back1.png');
 //clubs
 this.load.image('clubs-1', '../Assets/card-clubs-1.png');
 this.load.image('clubs-2', '../Assets/card-clubs-2.png');
 this.load.image('clubs-3', '../Assets/card-clubs-3.png');
 this.load.image('clubs-4', '../Assets/card-clubs-4.png');
 this.load.image('clubs-5', '../Assets/card-clubs-5.png');
 this.load.image('clubs-6', '../Assets/card-clubs-6.png');
 this.load.image('clubs-7', '../Assets/card-clubs-7.png');
 this.load.image('clubs-8', '../Assets/card-clubs-8.png');
 this.load.image('clubs-9', '../Assets/card-clubs-9.png');
 this.load.image('clubs-10', '../Assets/card-clubs-10.png');
 this.load.image('clubs-11', '../Assets/card-clubs-11.png');
 this.load.image('clubs-12', '../Assets/card-clubs-12.png');
 this.load.image('clubs-13', '../Assets/card-clubs-13.png');
 //diamonds
 this.load.image('diamonds-1', '../Assets/card-diamonds-1.png');
 this.load.image('diamonds-2', '../Assets/card-diamonds-2.png');
 this.load.image('diamonds-3', '../Assets/card-diamonds-3.png');
 this.load.image('diamonds-4', '../Assets/card-diamonds-4.png');
 this.load.image('diamonds-5', '../Assets/card-diamonds-5.png');
 this.load.image('diamonds-6', '../Assets/card-diamonds-6.png');
 this.load.image('diamonds-7', '../Assets/card-diamonds-7.png');
 this.load.image('diamonds-8', '../Assets/card-diamonds-8.png');
 this.load.image('diamonds-9', '../Assets/card-diamonds-9.png');
 this.load.image('diamonds-10', '../Assets/card-diamonds-10.png');
 this.load.image('diamonds-11', '../Assets/card-diamonds-11.png');
 this.load.image('diamonds-12', '../Assets/card-diamonds-12.png');
 this.load.image('diamonds-13', '../Assets/card-diamonds-13.png');
 //hearts
 this.load.image('hearts-1', '../Assets/card-hearts-1.png');
 this.load.image('hearts-2', '../Assets/card-hearts-2.png');
 this.load.image('hearts-3', '../Assets/card-hearts-3.png');
 this.load.image('hearts-4', '../Assets/card-hearts-4.png');
 this.load.image('hearts-5', '../Assets/card-hearts-5.png');
 this.load.image('hearts-6', '../Assets/card-hearts-6.png');
 this.load.image('hearts-7', '../Assets/card-hearts-7.png');
 this.load.image('hearts-8', '../Assets/card-hearts-8.png');
 this.load.image('hearts-9', '../Assets/card-hearts-9.png');
 this.load.image('hearts-10', '../Assets/card-hearts-10.png');
 this.load.image('hearts-11', '../Assets/card-hearts-11.png');
 this.load.image('hearts-12', '../Assets/card-hearts-12.png');
 this.load.image('hearts-13', '../Assets/card-hearts-13.png');
 //spades
 this.load.image('spades-1', '../Assets/card-spades-1.png');
 this.load.image('spades-2', '../Assets/card-spades-2.png');
 this.load.image('spades-3', '../Assets/card-spades-3.png');
 this.load.image('spades-4', '../Assets/card-spades-4.png');
 this.load.image('spades-5', '../Assets/card-spades-5.png');
 this.load.image('spades-6', '../Assets/card-spades-6.png');
 this.load.image('spades-7', '../Assets/card-spades-7.png');
 this.load.image('spades-8', '../Assets/card-spades-8.png');
 this.load.image('spades-9', '../Assets/card-spades-9.png');
 this.load.image('spades-10', '../Assets/card-spades-10.png');
 this.load.image('spades-11', '../Assets/card-spades-11.png');
 this.load.image('spades-12', '../Assets/card-spades-12.png');
 this.load.image('spades-13', '../Assets/card-spades-13.png');
}

function create(){
    deck = this.physics.add.image(
        this.physics.world.bounds.width / 2, // x position
        this.physics.world.bounds.height / 2, // y position
        'deck'
    );
}

function update(){

}
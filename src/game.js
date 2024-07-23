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
    },
    backgroundColor: '#133926'
};

const game = new Phaser.Game(config);

function preload(){
    this.load.image('deck', '../Assets/card-back1.png');

    // Load cards
    const suits = [ 'clubs', 'diamonds', 'hearts', 'spades' ];
    suits.forEach(suit => {
        for (let i = 1; i <= 13; i++)
            this.load.image(`${suit}-${i}`, `../Assets/card-${suit}-${i}.png`);
    });
}

function create(){
    deck = this.physics.add.image(
        this.physics.world.bounds.width / 2, // x position
        this.physics.world.bounds.height / 2, // y position
        'deck'
    );

    dealerText = this.add.text(
        (this.physics.world.bounds.width / 6) * 4 + 20,
        this.physics.world.bounds.height - 570,
        'dealer: 0',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '30px',
            fill: '#fff'
        }
    );

    playerText = this.add.text(
        (this.physics.world.bounds.width / 8) - 20,
        this.physics.world.bounds.height - 570,
        'player: 0',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '30px',
            fill: '#fff'
        }
    );

    balanceBetText = this.add.text(
        (this.physics.world.bounds.width / 6) * 2 + 60,
        this.physics.world.bounds.height - 570,
        'balance: 10 \nbet: 0',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '20px',
            fill: '#fff',
            align: 'center'
        }
    );

    //buttons
     hitBtn = this.add.text(
        (this.physics.world.bounds.width / 8) ,
        this.physics.world.bounds.height - 30,
        'HIT',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '30px',
            fill: '#fff',
            align: 'center'
        }
    );
    hitBtn.setInteractive()
    .on('pointerover', () => hitBtn.setTint('0x0099cc'))
    .on('pointerout', () => hitBtn.clearTint() )
    .on('pointerdown', () => hitBtnPressed() )  //on button press
    .on('pointerup', () => hitBtn.setTint('0x0099cc') )
    ; 

    standBtn = this.add.text(
        (this.physics.world.bounds.width / 6) * 4 + 20,
        this.physics.world.bounds.height - 30,
        'STAND',
        {
            fontFamily: 'Monaco, Courier, monospace',
            fontSize: '30px',
            fill: '#fff',
            align: 'center'
        }
    )
    .setInteractive()
    .on('pointerover', () => standBtn.setTint('0x0099cc'))
    .on('pointerout', () => standBtn.clearTint() )
    .on('pointerdown', () => standBtnPressed() )  //on button press
    .on('pointerup', () => standBtn.setTint('0x0099cc') )
    ;
   
}

function update(){
    

}

function standBtnPressed(){
    standBtn.setTint('0x006800')
    player = new Player;
}

function hitBtnPressed(){
    hitBtn.setTint('0x006800')
}

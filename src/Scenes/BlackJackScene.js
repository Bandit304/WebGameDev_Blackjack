class BlackJackScene extends Phaser.Scene {
    // ===== Constructor =====

    constructor() {
        super("BlackJackScene");
    }

    // ===== Phaser.Scene Overrides =====

    create(){
        this.deck = this.physics.add.image(
            this.physics.world.bounds.width / 2, // x position
            this.physics.world.bounds.height / 2, // y position
            'deck'
        );
    
        this.dealerText = this.add.text(
            (this.physics.world.bounds.width / 6) * 4 + 20,
            this.physics.world.bounds.height - 570,
            'dealer: 0',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff'
            }
        );
    
        this.playerText = this.add.text(
            (this.physics.world.bounds.width / 8) - 20,
            this.physics.world.bounds.height - 570,
            'player: 0',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff'
            }
        );
    
        this.balanceBetText = this.add.text(
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
        this.hitBtn = this.add.text(
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
        this.hitBtn.setInteractive()
            .on('pointerover', () => this.hitBtn.setTint('0x0099cc'))
            .on('pointerout', () => this.hitBtn.clearTint() )
            .on('pointerdown', () => this.hitBtnPressed() )  //on button press
            .on('pointerup', () => this.hitBtn.setTint('0x0099cc') ); 
    
        this.standBtn = this.add.text(
            (this.physics.world.bounds.width / 6) * 4 + 20,
            this.physics.world.bounds.height - 30,
            'STAND',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff',
                align: 'center'
            }
        );
        this.standBtn.setInteractive()
            .on('pointerover', () => this.standBtn.setTint('0x0099cc'))
            .on('pointerout', () => this.standBtn.clearTint() )
            .on('pointerdown', () => this.standBtnPressed() )  //on button press
            .on('pointerup', () => this.standBtn.setTint('0x0099cc') );
       
    }
    
    update(){
        
    }

    // ===== Methods =====

    standBtnPressed(){
        this.standBtn.setTint('0x006800')
        this.player = new Player;
    }
    
    hitBtnPressed(){
        this.hitBtn.setTint('0x006800')
    }
}
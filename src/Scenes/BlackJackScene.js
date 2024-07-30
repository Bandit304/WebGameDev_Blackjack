class BlackJackScene extends Phaser.Scene {
    // ===== Constructor =====

    constructor() {
        super("BlackJackScene");
    }

    preload() {        
        this.load.image('deck', 'Assets/card-back1.png');

        // Load cards
        const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
        suits.forEach(suit => {
            for (let i = 1; i <= 13; i++) {
                this.load.image(`${suit}-${i}`, `Assets/card-${suit}-${i}.png`);
            }
        });
    }

    // ===== Phaser.Scene Overrides =====

    create() {
        this.blackJackGame = new BlackJack('Player');

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
        //bet buttons
        this.betIncraseBtn = this.add.text(
            (this.physics.world.bounds.width / 6) * 2 + 175,
            this.physics.world.bounds.height - 540,
            'MORE',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '12px',
                fill: '#fff',
                align: 'center'
            }
        );
        this.betIncraseBtn.setInteractive()
            .on('pointerover', () => this.betIncraseBtn.setTint('0x0099cc'))
            .on('pointerout', () => this.betIncraseBtn.clearTint() )
            .on('pointerdown', () => this.betIncreaseBtnPressed() )  //on button press
            .on('pointerup', () => this.betIncraseBtn.setTint('0x0099cc') );

        this.betDecreaseBtn = this.add.text(
            (this.physics.world.bounds.width / 6) * 2 + 55,
            this.physics.world.bounds.height - 540,
            'LESS',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '12px',
                fill: '#fff',
                align: 'center'
            }
        );
        this.betDecreaseBtn.setInteractive()
            .on('pointerover', () => this.betDecreaseBtn.setTint('0x0099cc'))
            .on('pointerout', () => this.betDecreaseBtn.clearTint() )
            .on('pointerdown', () => this.betDecreaseBtnPressed() )  //on button press
            .on('pointerup', () => this.betDecreaseBtn.setTint('0x0099cc') );
    
            this.betSetBtn = this.add.text(
                (this.physics.world.bounds.width / 6) * 2 + 100,
                this.physics.world.bounds.height - 520,
                'SET BET',
                {
                    fontFamily: 'Monaco, Courier, monospace',
                    fontSize: '12px',
                    fill: '#fff',
                    align: 'center'
                }
            );
            this.betSetBtn.setInteractive()
                .on('pointerover', () => this.betSetBtn.setTint('0x0099cc'))
                .on('pointerout', () => this.betSetBtn.clearTint() )
                .on('pointerdown', () => this.betSetBtnPressed() )  //on button press
                .on('pointerup', () => this.betSetBtn.setTint('0x0099cc') );


        //buttons
        const sceneWidth = this.physics.world.bounds.width;

        this.hitBtn = this.add.text(
            (sceneWidth / 8),
            this.physics.world.bounds.height - 30,
            'HIT',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff',
                align: 'center'
            }
        );
        this.hitBtn.setOrigin(0.5, 0.5);
        this.hitBtn.setInteractive()
            .on('pointerover', () => this.hitBtn.setTint('0x0099cc'))
            .on('pointerout', () => this.hitBtn.clearTint() )
            .on('pointerdown', () => this.hitBtnPressed() )  //on button press
            .on('pointerup', () => this.hitBtn.setTint('0x0099cc') ); 


        this.standBtn = this.add.text(
            sceneWidth * (7 / 8),
            this.physics.world.bounds.height - 30,
            'STAND',
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff',
                align: 'center'
            }
        );
        this.standBtn.setOrigin(0.5, 0.5);
        this.standBtn.setInteractive()
            .on('pointerover', () => this.standBtn.setTint('0x0099cc'))
            .on('pointerout', () => this.standBtn.clearTint() )
            .on('pointerdown', () => this.standBtnPressed() )  //on button press
            .on('pointerup', () => this.standBtn.setTint('0x0099cc') );

        this.resetBtn = this.add.text(
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height - 30,
            "RESET",
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff',
                align: 'center'
            }
        );
        this.resetBtn.setOrigin(0.5, 0.5);
        this.resetBtn.setInteractive()
            .on('pointerover', () => this.resetBtn.setTint('0x0099cc'))
            .on('pointerout', () => this.resetBtn.clearTint() )
            .on('pointerdown', () => this.resetBtnPressed() )  //on button press
            .on('pointerup', () => this.resetBtn.setTint('0x0099cc') );
    
        // Start a new game
        this.blackJackGame.resetGame();
    }
    
    update(){
        //update text
        this.playerText.setText(`player: ${this.blackJackGame.players.user.score}`);
        this.dealerText.setText(`dealer: ${this.blackJackGame.players.cpu.score}`);
        this.balanceBetText.setText(`balance: ${this.blackJackGame.balance}\nbet: ${this.blackJackGame.bet}`);
        
    }

    // ===== Methods =====

    standBtnPressed() {
        this.standBtn.setTint('0x006800');
        //this.player = new Player;

        const Player = this.blackJackGame.players.user;
        Player.stay();
        
        this.blackJackGame.dealerChoice();
        
        // Check results
        this.blackJackGame.checkForWin();
        this.blackJackGame.payBet();
    }

    hitBtnPressed() {
        this.hitBtn.setTint('0x006800');

        const player = this.blackJackGame.players.user;
        player.hit();

        if (player.score >= 21)
            this.standBtnPressed();
        
    }

    resetBtnPressed() {
        this.resetBtn.setTint('0x006800');
        this.blackJackGame.resetGame();
    }

    betSetBtnPressed() {
        this.betSetBtn.setTint('0x006800');
        this.blackJackGame.placeBet(this.blackJackGame.bet);
    }
    betIncreaseBtnPressed(){
        this.betIncraseBtn.setTint('0x006800');
        if(this.blackJackGame.bet>= 0){this.blackJackGame.bet += 1;}
        
        
    }

    betDecreaseBtnPressed(){
        this.betDecreaseBtn.setTint('0x006800');
        if(this.blackJackGame.bet> 0){
            this.blackJackGame.bet -= 1;
        }
        
    }
}
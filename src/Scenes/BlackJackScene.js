class BlackJackScene extends Phaser.Scene {
    // ===== Constructor =====

    constructor() {
        super("BlackJackScene");
    }

    // ===== Phaser.Scene Overrides =====

    create() {
        this.blackJackGame = new BlackJack('Player');
        this.player = this.blackJackGame.players.user;
        this.dealer = this.blackJackGame.players.cpu;
        this.playerHand = [];
        this.dealerHand = [];

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
            .on('pointerdown', () => {  //on button press
                this.hitBtn.setTint('0x006800');
                this.hitBtnPressed();
            })
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
            .on('pointerdown', () => {  //on button press
                this.standBtn.setTint('0x006800');
                this.standBtnPressed();
            })
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
            .on('pointerdown', () => {  //on button press
                this.resetBtn.setTint('0x006800');
                this.resetBtnPressed();
            })
            .on('pointerup', () => this.resetBtn.setTint('0x0099cc') );
    
        // Start a new game
        this.blackJackGame.resetGame();
    }
    
    update(){
        //update text
        this.playerText.setText(`player: ${this.player.score}`);
        this.dealerText.setText(`dealer: ${this.dealer.score}`);
        this.balanceBetText.setText(`balance: ${this.blackJackGame.balance}\nbet: ${this.blackJackGame.bet}`);
        
    }

    // ===== Methods =====

    standBtnPressed() {
        this.player.stay();
        
        this.blackJackGame.dealerChoice();

        this.dealer.cards.forEach(card => {
            const cardSprite = new CardSprite(this, 0, 0, card.suit, card.value);
            this.dealerHand.push(cardSprite)
            const cardWidth = 96;
            const cardHeight = 144;
            const x = ((this.dealerHand.length - 1) % 3) * (cardWidth + 10);
            const y = Math.floor((this.dealerHand.length - 1) / 3) * (cardHeight + 10);
            const sceneWidth = this.physics.world.bounds.width;
            cardSprite.x = sceneWidth - (cardWidth / 2 + 20 + x);
            cardSprite.y = 200 + y;
        });
        
        // Check results
        this.blackJackGame.checkForWin();
        this.blackJackGame.payBet();
    }

    hitBtnPressed() {
        // Hit
        const card = this.player.hit();
        // Display drawn card
        const cardSprite = new CardSprite(this, 0, 0, card.suit, card.value);
        this.playerHand.push(cardSprite)
        const cardWidth = 96;
        const cardHeight = 144;
        const x = ((this.playerHand.length - 1) % 3) * (cardWidth + 10);
        const y = Math.floor((this.playerHand.length - 1) / 3) * (cardHeight + 10);
        cardSprite.x = cardWidth / 2 + 20 + x;
        cardSprite.y = 200 + y;
        // If player score can't get higher, stand
        if (this.player.score >= 21)
            this.standBtnPressed();
        
    }

    resetBtnPressed() {
        this.blackJackGame.resetGame();
        const playerHandLength = this.playerHand.length;
        const dealerHandLength = this.dealerHand.length;

        for (let i = 0; i < playerHandLength; i++) {
            const card = this.playerHand.pop();
            card.destroy()
        }

        for (let i = 0; i < dealerHandLength; i++) {
            const card = this.dealerHand.pop();
            card.destroy()
        }
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
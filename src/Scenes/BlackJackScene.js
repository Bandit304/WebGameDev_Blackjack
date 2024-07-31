class BlackJackScene extends Phaser.Scene {
    // ===== Constructor =====

    constructor() {
        super("BlackJackScene");
    }

    // ===== Phaser.Scene Overrides =====

    init(data) {
        // Receive BlackJack object from betting scene
        this.blackJackGame = data.blackJackGame;
    }

    create() {
        this.player = this.blackJackGame.players.user;
        this.dealer = this.blackJackGame.players.cpu;
        this.playerHand = [];
        this.dealerHand = [];
        this.isDealerTurn = false;

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
        const sceneWidth = this.physics.world.bounds.width;

        this.hitBtn = new TextButton(
            this,
            (sceneWidth / 8),
            this.physics.world.bounds.height - 30,
            'HIT',
            () => {  //on button press
                this.hitBtn.setTint('0x006800');
                this.hitBtnPressed();
            }
        );

        this.standBtn = new TextButton(
            this,
            sceneWidth * (7 / 8),
            this.physics.world.bounds.height - 30,
            'STAND',
            () => {  //on button press
                this.standBtn.setTint('0x006800');
                this.standBtnPressed();
            }
        );

        this.resetBtn = new TextButton(
            this,
            this.physics.world.bounds.width / 2,
            this.physics.world.bounds.height - 30,
            "RESET",
            () => {  //on button press
                this.resetBtn.setTint('0x006800');
                this.scene.start("BettingScene", { blackJackGame: this.blackJackGame });
            }
        );
        // Hide reset button initially
        this.resetBtn.visible = false;
    
        // Start a new game
        this.resetGame();
    }
    
    update(){
        //update text
        this.playerText.setText(`player: ${this.player.score}`);
        if (this.isDealerTurn)
            this.dealerText.setText(`dealer: ${this.dealer.score}`);
        else
            this.dealerText.setText(`dealer: ???`);
        this.balanceBetText.setText(`balance: ${this.blackJackGame.balance}\nbet: ${this.blackJackGame.bet}`);
        
    }

    // ===== Methods =====

    standBtnPressed() {
        this.isDealerTurn = true;

        this.player.stay();
        
        this.blackJackGame.dealerChoice();

        this.displayDealerHand();
        
        // Check results
        this.blackJackGame.checkForWin();
        this.blackJackGame.payBet();
        
        if (this.blackJackGame.isOver && this.blackJackGame.didWin)
            this.displayNotification("You Win!");
        else if (this.blackJackGame.isOver && !this.blackJackGame.didWin)
            this.displayNotification("You Lose!");

        // Hide hit/stand buttons
        this.hitBtn.visible = false;
        this.standBtn.visible = false;
        // Display reset button
        this.resetBtn.visible = true;
    }

    hitBtnPressed() {
        // Hit
        this.player.hit();
        // Display drawn card
        this.displayPlayerHand();
        // If player score can't get higher, stand
        if (this.player.score >= 21)
            this.standBtnPressed();
        
    }

    resetGame() {
        // Reset game logic
        this.blackJackGame.resetGame();
        this.isDealerTurn = false;

        // Display Initial Hands
        this.displayPlayerHand();
        this.displayDealerHand();

        if (this.player.score >= 21)
            this.standBtnPressed();
    }

    displayPlayerHand() {
        // === Reset player hand ===
        const playerHandLength = this.playerHand.length;
        for (let i = 0; i < playerHandLength; i++) {
            const cardSprite = this.playerHand.pop();
            cardSprite.destroy()
        }

        // === Display player hand ===
        for (let i = 0; i < this.player.cards.length; i++) {
            // Get card
            const card = this.player.cards[i];
            // Create card sprite
            const cardSprite = new CardSprite(this, 0, 0, card.suit, card.value);
            // Add cardsprite to hand
            this.playerHand.push(cardSprite);
            // Calculate relative position of card sprite
            const cardWidth = 96;
            const cardHeight = 144;
            const x = (i % 3) * (cardWidth + 10);
            const y = Math.floor(i / 3) * (cardHeight + 10);
            // Calculate position of cardsprite relative to scene
            cardSprite.x = cardWidth / 2 + 20 + x;
            cardSprite.y = 200 + y;
        }
    }

    displayDealerHand() {
        // === Reset dealer hand ===
        const dealerHandLength = this.dealerHand.length;
        for (let i = 0; i < dealerHandLength; i++) {
            const cardSprite = this.dealerHand.pop();
            cardSprite.destroy()
        }

        // === Display dealer hand ===
        for (let i = 0; i < this.dealer.cards.length; i++) {
            // Get card
            const card = this.dealer.cards[i];
            // Create card sprite
            const cardSprite = new CardSprite(this, 0, 0, card.suit, card.value);
            if (i === 0 && !this.isDealerTurn)
                cardSprite.flip();
            // Add cardsprite to hand
            this.dealerHand.push(cardSprite);
            // Calculate relative position of card sprite
            const cardWidth = 96;
            const cardHeight = 144;
            const x = (i % 3) * (cardWidth + 10);
            const y = Math.floor(i / 3) * (cardHeight + 10);
            // Calculate position of cardsprite relative to scene
            const sceneWidth = this.physics.world.bounds.width;
            cardSprite.x = sceneWidth - (cardWidth / 2 + 20 + x);
            cardSprite.y = 200 + y;
        }
    }

    async displayNotification(message) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            const notification = new Notification(message);
            setTimeout(() => notification.close(), 10000);
        }
    }
}
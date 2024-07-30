class BettingScene extends Phaser.Scene {
    // ===== Constructors =====
    constructor() {
        super("BettingScene");
    }

    // ===== Phaser.Scene Overrides =====
    create() {
        // Create game
        this.blackJackGame = new BlackJack('Player');

        // Create fields
        this.sceneWidth = this.physics.world.bounds.width;
        this.sceneHeight = this.physics.world.bounds.height;
        this.tempBet = 0;

        // Create text displays
        this.balanceDisplay = this.add.text(
            this.sceneWidth / 2,
            50,
            `Balance: ${this.blackJackGame.balance}`,
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff',
            },
        );
        this.balanceDisplay.setOrigin(0.5, 0.5);

        this.betDisplay = this.add.text(
            this.sceneWidth / 2,
            100,
            `Bet: ${this.tempBet}`,
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff',
            },
        );
        this.betDisplay.setOrigin(0.5, 0.5);

        // === Buttons ===

        // Button to start game
        this.startGameButton = new TextButton(
            this,
            this.sceneWidth - 20,
            this.sceneHeight - 20,
            "START GAME",
            () => this.startBtnPressed(),
        );
        this.startGameButton.setOrigin(1, 1);

        // Buttons to modify bet
        this.modifyBetButtons = {
            plusOne: new TextButton(
                this,
                20,
                150,
                "ADD 1 TO BET",
                () => this.increaseBet(1),
            ),
            plusTen: new TextButton(
                this,
                20,
                200,
                "ADD 10 TO BET",
                () => this.increaseBet(10),
            ),
            plusOneHundred: new TextButton(
                this,
                20,
                250,
                "ADD 100 TO BET",
                () => this.increaseBet(100),
            ),
            minusOne: new TextButton(
                this,
                20,
                300,
                "SUBTRACT 1 FROM BET",
                () => this.decreaseBet(1),
            ),
            minusTen: new TextButton(
                this,
                20,
                350,
                "SUBTRACT 10 FROM BET",
                () => this.decreaseBet(10),
            ),
            minusOneHundred: new TextButton(
                this,
                20,
                400,
                "SUBTRACT 100 FROM BET",
                () => this.decreaseBet(100),
            ),
        };
        // Set origin of modifyBetButtons
        this.modifyBetButtons.plusOne.setOrigin(0, 0);
        this.modifyBetButtons.plusOneHundred.setOrigin(0, 0);
        this.modifyBetButtons.plusTen.setOrigin(0, 0);
        this.modifyBetButtons.minusOne.setOrigin(0, 0);
        this.modifyBetButtons.minusTen.setOrigin(0, 0);
        this.modifyBetButtons.minusOneHundred.setOrigin(0, 0);
    }

    update() {
        this.balanceDisplay.text = `Balance: ${this.blackJackGame.balance}`;
        this.betDisplay.text = `Bet: ${this.tempBet}`;
    }

    // ===== Methods =====

    increaseBet(amount) {
        if (this.tempBet + amount <= this.blackJackGame.balance)
            this.tempBet += amount;
    }

    decreaseBet(amount) {
        if (this.tempBet - amount >= 0)
            this.tempBet -= amount;
    }

    startBtnPressed() {
        this.blackJackGame.placeBet(this.tempBet);
        this.scene.start("BlackJackScene", { blackJackGame: this.blackJackGame });
    }
}
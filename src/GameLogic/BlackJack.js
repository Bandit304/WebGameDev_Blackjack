class BlackJack{
    constructor(username) {
        this.players = {
          user: new Player(this, username),
          cpu: new Player(this, "Dealer"),
        },
        this.isOver = false;
        this.didWin = false;
        this.balance = 100;
        this.bet = 0;
        this.gameHistoryLog = [];
        this.deck = [];
    }

    // ===== Static Fields =====

    // List of all 52 playing cards
    // Each list item is an object with 2 fields, suit and value
    // The suit field is a string representing the card's suit ("clubs", "diamonds", "hearts", or "spades")
    // The value field is a number representing the card's pip value (1-13)
    static allCard = BlackJack.generateCards();

    // ===== Field-Related Methods =====

    // Generates list of card objects, including suit and value
    static generateCards() {
        const cards = [];
        // Suits written to match card image file format
        const suits = [ 'clubs', 'diamonds', 'hearts', 'spades' ];
        suits.forEach(suit => {
            for (let value = 1; value <= 13; value++)
                cards.push(new Card(suit, value));
        });
        return cards;
    }

    // Returns randomized deck of 52 cards
    shuffleDeck() {
        // Get deck information
        const _allCardCopy = [...BlackJack.allCard];
        const cardsInDeck = BlackJack.allCard.length;
        const shuffledCards = [];

        for (let i = 0; i < cardsInDeck; i++) {
            // Get random index in _allCardCopy
            const index = Math.floor(Math.random() * _allCardCopy.length);
            // Remove random card from _allCardCopy, store in card
            const card = _allCardCopy.splice(index, 1);
            // Add removed card to shuffledCards
            shuffledCards.push(...card);
        }

        // Return shuffled deck of cards
        return shuffledCards;
    }

    // ===== Game-Related Fields =====

    resetGame() {
        // Reset game end flags
        this.isOver = false;
        this.didWin = false;
        // Reset bet
        this.bet = 0;
        // Shuffle deck
        this.deck = this.shuffleDeck();
        // Reset players
        this.players.cpu.reset();
        this.players.user.reset();
    }

    // Places a bet for the user
    placeBet(bet) {
        if (bet <= this.balance) {
            this.balance -= bet;
            this.bet = bet;
        }
    }

    // Attempts to double the user's bet
    doubleDown() {
        this.placeBet(this.bet);
    }

    checkForWin() {
        // If user has busted, game ends and user loses
        if (this.players.user.isBusted) {
            this.isOver = true;
            this.didWin = false;
        }
        // Else, if dealer has busted, game ends and user wins
        else if (this.players.cpu.isBusted) {
            this.isOver = true;
            this.didWin = true;
        }
        // Else, if all players are standing, game ends and compare scores for victor
        else if (this.players.user.isStanding && this.players.cpu.isStanding) {
            this.isOver = true;
            // Player wins only if user score is greater than dealer score
            this.didWin = this.players.user.score > this.players.cpu.score;
        }
    }

    // Handles paying back bets at the end of the game
    payBet() {
        if (this.isOver){
            if (this.didWin){
                this.balance += this.bet * 2;
            }
            this.bet = 0;
        }
           
    }

    // function that makes sure the player or cpu has not busted
    getTotal(userCards){
        // Make copy of userCards so original array is not affected by sorting
        const _userCards = [...userCards];
        // Sort userCards from greates value to lowest so aces are processed last
        _userCards.sort((card1, card2) => card2.value - card1.value);

        // do math to determine that the values in the list do not add up over 21
        let totalValue = 0;
        _userCards.forEach(card => {
            totalValue += this.getCardValue(card, totalValue);
        });

        return totalValue;
    }

    getCardValue(card, totalValue){
        // Aces can be worth either 1 or 11 points, depending on the situation
        if (card.value === 1 && totalValue < 11)
            return 11;
        // Face cards are worth 10 points
        else if (card.value > 10)
            return 10;
        // All other cards are worth their pip value
        return card.value;
    }

    // dealer logic guidelines: 
    // researching learned that dealer logic is different than player
    // if dealer is 16 or lower, they are required to hit
    // 17 or higher means they need to stay. Easy logic
    dealerChoice(){
        const dealer = this.players.cpu;
        while (dealer.score <= 17) {     
            this.players.cpu.hit();
        }
        this.players.cpu.stay();
    }

}
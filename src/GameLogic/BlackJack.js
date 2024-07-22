class BlackJack{
    constructor(username) {
        this.username = username;
        this.bet = {
          user: 0,
          cpu:0 
        },
        this.gameHistoryLog = [];
    }

    // List of all 52 playing cards
    // Each list item is an object with 2 fields, suit and value
    // The suit field is a string representing the card's suit ("clubs", "diamonds", "hearts", or "spades")
    // The value field is a number representing the card's pip value (1-13)
    static allCard = generateCards();

    // Generates list of card objects, including suit and value
    generateCards() {
        const cards = [];
        // Suits written to match card image file format
        const suits = [ 'clubs', 'diamonds', 'hearts', 'spades' ];
        suits.forEach(suit => {
            for (let i = 1; i <= 13; i++)
                cards.push({ suit, value: i });
        });
        return cards;
    }
    
    // function for if player hits
    hit(userCards) {
        
        
    }

    // function for if the player stands
    stay(){

    }

    // function for if player busts
    bust(){

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
        
        if(totalValue>21){
            this.bust();
        }
        
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
    dealerChoice(userCards){
        const dealerTotal = this.getTotal(userCards);
        if(dealerTotal >= 17){
            this.stay();
        }else{
            this.hit();
        }
    }

}
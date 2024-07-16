class BlackJack{
    constructor(username) {
        this.username = username;
        this.bet = {
          user: 0,
          cpu:0 
        },
        this.gameHistoryLog = [];
    }

    // overarching card list. I specified number and suite and then it will determine the value based on the name
    // specified suite so that it is easier to link values in player hand to visual card references in the actual phaser game
    static allCard = ["aceSpade", 
        "aceHeart",
        "aceClub",
        "aceDiamond",
        "2Spade",
        "2Heart",
        "2Club",
        "2Diamond",
        "3Spade",
        "3Heart",
        "3Club",
        "3Diamond",
        "4Spade",
        "4Heart",
        "4Club",
        "4Diamond",
        "5Spade",
        "5Heart",
        "5Club",
        "5Diamond",
        "6Spade",
        "6Heart",
        "6Club",
        "6Diamond",
        "7Spade",
        "7Heart",
        "7Club",
        "7Diamond",
        "8Spade",
        "8Heart",
        "8Club",
        "8Diamond",
        "9Spade",
        "9Heart",
        "9Club",
        "9Diamond",
        "jackSpade",
        "jackHeart",
        "jackClub",
        "jackDiamond",
        "queenSpade",
        "queenHeart",
        "queenClub",
        "queenDiamond",
        "kingSpade",
        "kingHeart",
        "kingClub",
        "kingDiamond"];
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
        // do math to determine that the values in the list do not add up over 21
        const totalValue = 0;
        for (let i = 0; i < userCards.length; i++) {
            totalValue = totalValue + this.getCardValue(userCards[i], userCards);
        }
        
        if(totalValue>21){
            this.bust();
        }
        
        return totalValue;
    }

    // might be a better way to do this but I've hard coded it basically
    getCardValue(card, userCards){
        var value = 0;
        //converts card names to numbers aka 4 of spades is now just a 4
        
        if(card == "2Heart" || card == "2Spade" || card == "2Diamond" || card == "2Club"){
            value = 2;
        }

        if(card == "3Heart" || card == "3Spade" || card == "3Diamond" || card == "3Club"){
            value = 1;
        }

        if(card == "4Heart" || card == "4Spade" || card == "4Diamond" || card == "4Club"){
            value = 1;
        }

        if(card == "5Heart" || card == "5Spade" || card == "5Diamond" || card == "5Club"){
            value = 1;
        }

        if(card == "6Heart" || card == "6Spade" || card == "6Diamond" || card == "6Club"){
            value = 1;
        }

        if(card == "7Heart" || card == "7Spade" || card == "7Diamond" || card == "7Club"){
            value = 1;
        }

        if(card == "8Heart" || card == "8Spade" || card == "8Diamond" || card == "8Club"){
            value = 1;
        }

        if(card == "9Heart" || card == "9Spade" || card == "9Diamond" || card == "9Club"){
            value = 1;
        }

        if(card == "jackHeart" || card == "jackSpade" || card == "jackDiamond" || card == "jackClub" || card == "queenHeart" || card == "queenSpade" || card == "queenDiamond" || card == "queenClub" || card == "kingHeart" || card == "kingSpade" || card == "kingDiamond" || card == "kingClub"){
            value = 10;
        }
        //do math for the ace card. Ace card can be 1 or 11 so this needs extra function determining what the value is
        //if the rest of the hands value is <11, the value is 11
        //if the rest of the hands value is >=11, the value is 1
        if (card == "aceHeart" || card == "aceSpade" || card == "aceDiamond" || card == "aceClub"){
            if(this.getTotal(userCards) >= 11){
                value = 1;
            }else{
                value = 11;
            }
        }
        return value;
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
window.onload = () => {
    const config = {
        type: Phaser.AUTO,
        parent: 'game',
        width: 800,
        height: 600,
        scene: [ PreloadScene, BettingScene, BlackJackScene ],
        physics: {
            default: 'arcade',
            arcade: {
                gravity: false,
            }
        },
        backgroundColor: '#133926'
    };

    const game = new Phaser.Game(config);
}
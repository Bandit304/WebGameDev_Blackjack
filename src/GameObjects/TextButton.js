class TextButton extends Phaser.GameObjects.Text {
    // ===== Constructors =====
    constructor(scene, x, y, text, onPress) {
        super(
            scene,
            x,
            y,
            text,
            {
                fontFamily: 'Monaco, Courier, monospace',
                fontSize: '30px',
                fill: '#fff',
                align: 'center',
            },
        );

        // Add button to scene
        this.scene = scene;
        this.scene.add.existing(this);

        // Save onPress callback to field
        this.onPress = onPress;

        // Set origin to center of button
        this.setOrigin(0.5, 0.5);

        // Set interactivity
        this.setInteractive()
            .on('pointerover', () => this.setTint('0x0099cc'))
            .on('pointerout', () => this.clearTint() )
            .on('pointerdown', () => {  //on button press
                this.setTint('0x006800');
                this.onPress();
            })
            .on('pointerup', () => this.setTint('0x0099cc') ); 
    }
}
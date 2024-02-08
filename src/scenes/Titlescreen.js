import Phaser from 'phaser'

export default class TitleScreen extends Phaser.Scene
{
    
    preload()
    {
        
    }

    create()
    {
        let text = this.add.text(1440 / 2, 848 / 2, 'hello world', {
            fontSize: '16px',
            fill: '#fff'
        });
        text.setOrigin(0.5);

    }
}
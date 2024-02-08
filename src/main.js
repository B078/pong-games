import Phaser from 'phaser'

import TitleScreen from './scenes/Titlescreen'
import Game from './scenes/game'

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor:'#747575',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add("titlescreen", TitleScreen)
game.scene.add('game', Game)

//game.scene.start('titlescreen')
game.scene.start('game')
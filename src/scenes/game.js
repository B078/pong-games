import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
    init() {
        this.paddelrightVelocity = new Phaser.Math.Vector2(0, 0);

        this.LeftScore = 0 
        this.RightScore = 0 
    }

    preload() {}

    create() {
        this.physics.world.setBounds(-100, 0, 1000, 500);

        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setCircle(10)
        this.ball.body.setBounce(1, 1);
        this.ball.body.setCollideWorldBounds(true, 1, 1);

        this.ResetBall();

        this.paddelleft = this.add.rectangle(50, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddelleft, true);

        this.paddelright = this.add.rectangle(750, 250, 30, 100, 0xffffff, 1);
        this.physics.add.existing(this.paddelright, true);

        this.physics.add.collider(this.paddelleft, this.ball);
        this.physics.add.collider(this.paddelright, this.ball);

        const ScoreStyle = {
            fontSize: 48
        }
        this.LeftScoreLabel = this.add.text(300, 125, '0', ScoreStyle)
        .setOrigin(0.5, 0.5)

        this.RightScoreLabel = this.add.text(500, 125, '0', ScoreStyle)
        .setOrigin(0.5 , 0.5)

        this.cursors = this.input.keyboard.createCursorKeys();


    }

    update() {
        
        /** @type {Phaser.Physics.Arcade.StaticBody} */
        const body = this.paddelleft.body;
        
        if (this.cursors.up.isDown && this.paddelleft.y > 5) {
            this.paddelleft.y -= 10;
            body.updateFromGameObject();
        } else if (this.cursors.down.isDown && this.paddelleft.y < 500) {
            this.paddelleft.y += 10;
            body.updateFromGameObject();
        }
        if(this.cursors.space.isDown){
            this.ResetBall()
            this.ResetScore()
        }
        
        const diff = this.ball.y - this.paddelright.y;
        if (Math.abs(diff) < 10) {
            return;
        }
        const aiSpeed = 8
        if (diff < 0) {
            // ball is above the paddle
            this.paddelrightVelocity.y = -aiSpeed;
            if (this.paddelrightVelocity.y < -10) {
                this.paddelrightVelocity.y = -10;
            }
        } else if (diff > 0) {
            // ball is under the paddle
            this.paddelrightVelocity.y = aiSpeed;
            if (this.paddelrightVelocity.y > 10) {
                this.paddelrightVelocity.y = 10;
            }
        }

        this.paddelright.y += this.paddelrightVelocity.y;
        this.paddelright.body.updateFromGameObject();

        if (this.ball.x < -30) {
            // scored left side
            this.ResetBall();
            this.incrementLeftScore()

        } else if (this.ball.x > 830) {
            // scored right side
            this.ResetBall();
            this.incrementRightScore()
        }
    }
    
    incrementLeftScore()
    {
        this.LeftScore += 1
        this.RightScoreLabel.text = this.LeftScore
    }

    incrementRightScore()
    {
        this.RightScore += 1
        this.LeftScoreLabel.text = this.RightScore
    }

    ResetScore(){
        this.LeftScore = 0
        this.RightScore = 0
        this.LeftScoreLabel.text = this.LeftScore 
        this.RightScoreLabel.text = this.RightScore
    }
    
    ResetBall() {
        this.ball.setPosition(400, 250);
        const angle = Phaser.Math.Between(0, 360);
        const speed = 600
        const vec = this.physics.velocityFromAngle(angle, speed);

        this.ball.body.setVelocity(vec.x, vec.y);
    }
}

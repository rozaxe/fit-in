
module Toffee {

	export class Trans extends Phaser.Sprite {

		playMe: Play
		rect: Phaser.Graphics
		text: Phaser.Text

		constructor(game: Phaser.Game, play: Play, color: number) {

			super(game, 0, 0, null)

			this.playMe = play

			// Create background
			this.rect = this.game.add.graphics(0, 0)

			this.rect.beginFill(color)
			this.rect.drawRect(0, 0, Data.getWidth(), Data.getHeight())

			this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.game.rnd.pick(Data.cool), Data.cool_style)
			this.text.x = this.game.world.centerX - this.text.width / 2

			this.addChild(this.rect)
			this.addChild(this.text)
			this.game.add.existing(this)

			this.alpha = 0

			var tween = this.game.add.tween(this).to({alpha: 1}, 200)
			tween.onComplete.add(this.waitMe, this)

			tween.start()

		}

		waitMe() {
			this.playMe.appear()

			var tween = this.game.add.tween(this).to({alpha: 0}, 100)
			tween.delay(800)
			tween.onComplete.add(this.killMe, this)
			tween.start()
		}

		killMe() {
			this.rect.destroy()
			this.destroy()
		}


	}

}

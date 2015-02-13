
module Toffee {

	export class Trans extends Phaser.Sprite {

		playMe: Play
		rect: Phaser.Graphics
		text: Phaser.Text

		constructor(game: Phaser.Game, play: Play, color: number, done?: boolean) {

			super(game, 0, 0, null)

			this.playMe = play

			// Create background
			this.rect = this.game.add.graphics(0, 0)

			this.rect.beginFill(color)
			this.rect.drawRect(0, 0, Data.getWidth(), Data.getHeight())

			if (done == true) {
				this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Thank you.", Data.thanks_style)
			} else {
				this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, this.game.rnd.pick(Data.cool), Data.cool_style)
			}
			this.text.x = this.game.world.centerX - this.text.width / 2


			this.addChild(this.rect)
			this.addChild(this.text)
			this.game.add.existing(this)

			this.alpha = 0

			var tween = this.game.add.tween(this).to({alpha: 1}, 200)
			tween.onComplete.add(done ? this.nextMe : this.waitMe, this)

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

		nextMe() {
			this.toText("Never let someone choose who you are...", this.preEnding)
		}

		preEnding() {
			// no matter what
			this.toText("...no matter what...", this.ending)
		}

		ending() {
			// just be yourself
			this.toText("... just be yourself.", null)
		}

		toText(mess: string, after: Function) {

			var tween = this.game.add.tween(this.text).to({alpha: 0}, 100)
			tween.delay(3000)
			tween.onComplete.add(() => {
					this.text.text = mess
					this.text.x = this.game.world.centerX - this.text.width / 2
					var ano = this.game.add.tween(this.text).to({alpha: 1}, 100)
					ano.onComplete.add(() => {
							if (after) {
								after.call(this)

							}
						}, this)
					ano.start()
				}, 	this)
			tween.start()

		}


	}

}

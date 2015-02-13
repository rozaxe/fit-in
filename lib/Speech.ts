
module Toffee {

	export class Speech extends Phaser.Sprite {

		bubble: Phaser.Graphics
		messages: Phaser.Text[]

		constructor(game: Phaser.Game) {
			super(game, 0, 0, null)

			this.bubble = this.game.add.graphics(0, 0)
			this.bubble.beginFill(0x000000, 0.5)
			this.bubble.drawRect(0, 0, 600, 96)

			this.messages = []
			var t = this.game.add.text(0, 0, "Test", Data.regular_style)
			this.messages.push(t)

			this.addChild(this.bubble)
			this.addChild(t)

			this.anchor.setTo(0.5, 0)
			this.x = this.game.world.centerX - this.bubble.width / 2
			this.y = 0

			this.game.add.existing(this)

		}

		clear() {
			// Clear text
			for (var i in this.messages) {
				this.removeChild(this.messages[i])
				this.messages[i].destroy()
			}
		}

		write(message: string) {

			this.game.add.tween(this).to({alpha: 1}, 200).start()
			this.clear()

			var parsed = message.split(' ')

			// Write text
			var x = 16
			var y = 0
			for (var j in parsed) {
				// Create a tempory text
				var txt = parsed[j]
				var style: any = Data.regular_style

				if (txt[0] == '_') {
					txt = txt.substr(1)
					style = Data.eurk_style
				} else if (txt[0] == '%') {
					txt = txt.substr(1)
					style = Data.nooo_style
				} else if (txt[0] == 'ù') {
					txt = txt.substr(1)
					style = Data.blue_style
				} else if (txt[0] == '@') {
					txt = txt.substr(1)
					style = Data.clue_style
				}

				var t = this.game.add.text(0, 0, txt, style)

				// Check where to put it
				if (x + t.width > 584) {
					if (y == 0) {
						y = 42
						x = 16
					} else {
						// buffered text
					}
				}

				// Postionne it where it belong
				t.position.setTo(x, y + 10 + (style.minusY ? -4 : 0) )

				if (style.anim) {
					var ax = t.x
					var ay = t.y
					this.game.add.tween(t).to({x: ax + 2}, 10).to({y: ay + 2}, 10).to({x: ax}, 10).to({y: ay}, 10).loop().start()
				}

				if (style.bounce) {
					t.angle = - 5
					this.game.add.tween(t).to({angle: 5}, 900).to({angle: -5}, 900).loop().start()
					//this.game.add.tween(t).to({alpha: 0.2}, 100).to({alpha: 1}, 100).loop().start()
				}

				this.addChild(t)
				this.messages.push(t)

				// Add a space after
				x += t.width + 12
			}

		}

		autoClose() {

			function fadeOut() {
				var tween = this.game.add.tween(this)
				tween.to({alpha: 0}, 200)
				tween.onComplete.add(() => {
						this.clear()
					}, this)
				tween.start()
			}

			this.game.time.events.add(Phaser.Timer.SECOND * 4, fadeOut, this);
		}

	}

}

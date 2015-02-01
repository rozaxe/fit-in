
module Toffee {

	export class Background extends Phaser.Sprite {

		shape: Shape
		mold: Mold
		pressed: boolean = false

		constructor(game: Phaser.Game) {

			super(game, 0, 0, 'tile')

			this.inputEnabled = true
			this.scale.setTo(Data.getWidth(), Data.getHeight())

			this.events.onInputDown.add(this.onDown, this)
			this.events.onInputUp.add(this.onUp, this)

			game.add.existing(this)

		}

		onDown() {
			this.shape.pressed = true
			this.mold.pressed = true
		}

		onUp() {
			this.shape.pressed = false
			this.mold.pressed = false
		}

	}

}

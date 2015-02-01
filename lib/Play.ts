
module Toffee {

	export class Play extends Phaser.State {

		create() {

			var background = new Background(this.game)
			var mold = new Mold(this.game)
			var shape = new Shape(this.game)
			background.shape = shape
			background.mold = mold

		}

	}

}


module Toffee {

	export class Wailings extends Phaser.Group {

		constructor(game: Phaser.Game) {
			super(game)
		}

		newOne() {
			var x = this.game.rnd.integerInRange(Data.shapeX, Data.shapeX + 300)
			var y = this.game.rnd.integerInRange(100, 400)
			var text = this.game.add.text(x, y, this.game.rnd.pick(Data.wailings), Data.wailing_style)
			this.game.add.tween(text).to({alpha: 0}, 1000).delay(2000).start()
		}

	}

}

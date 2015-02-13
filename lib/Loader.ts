
module Toffee {

	export class Loader extends Phaser.State {

		preload() {

			// Game's assets
			this.load.image('tile', 'assets/tile.png')
			this.load.image('pointer', 'assets/pointer.png')
			this.load.text('shapes', 'assets/shapes.txt')

		}

		create() {

			Data.parseDataShapes(this.game.cache.getText('shapes'))

			// Create dump text
			var dd = [Data.regular_style, Data.eurk_style, Data.wailing_style]
			for (var i in dd) {
				var txt = new Phaser.Text(this.game, 0, 0, "dd", dd[i])
				txt.destroy()
			}

			this.game.time.events.add(Phaser.Timer.SECOND, this.nextState, this)


		}

		nextState() {
			this.game.state.start('Play')
		}

	}

}

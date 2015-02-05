
module Toffee {

	export class Loader extends Phaser.State {

		preload() {

			// Game's assets
			this.load.image('tile', 'assets/tile.png')
			this.load.text('shapes', 'assets/shapes.txt')

		}

		create() {

			Data.parseDataShapes(this.game.cache.getText('shapes'))
			this.game.state.start('Play')

		}

	}

}

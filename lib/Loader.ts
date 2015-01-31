
module Toffee {

	export class Loader extends Phaser.State {

		preload() {

			// Game's assets
			this.load.image('tile', 'assets/tile.png')

		}

		create() {

			this.game.state.start('Play')

		}

	}

}

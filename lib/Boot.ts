
module Toffee {

	export class Boot extends Phaser.State {

		preload() {

			this.stage.backgroundColor = 0xEEEEEE

			// Loader assets

		}

		create() {

			// How many max fingers into the making
			this.input.maxPointers = 1;

			// Run game even if not focus
			this.stage.disableVisibilityChange = true

			this.game.state.start('Loader')

		}

	}

}

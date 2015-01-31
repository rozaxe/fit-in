
module Toffee {

	export class Game extends Phaser.Game {

		constructor() {

			// width, height, renderer, parent, state, transparent, antialias, physicsConfig
			super(800, 600, Phaser.AUTO, 'game', null, false, false, null)

			this.state.add('Boot', Boot, false)
			this.state.add('Loader', Loader, false)
			this.state.add('Play', Play, false)

			this.state.start('Boot')

		}

	}

}

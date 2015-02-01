
module Toffee {

	export class Entity extends Phaser.Group {

		// Track tile's reference in a grid
		grid: Array<Array<Tile>>

		// Check if background is pressed
		pressed: boolean = false

		constructor(game: Phaser.Game) {

			super(game)

			game.add.existing(this)

		}

		forEach(callback: Function, context: any, ...args: any[]) {
			for (var i = 0 ; i < Data.accumulation ; ++i) {
				for (var j = 0 ; j < Data.accumulation ; ++j) {
					if (this.grid[i][j]) {
						if (args.length > 0) {
							var tmp = args.slice()
							tmp.unshift(this.grid[i][j])
							callback.apply(context, tmp)
						} else {
							callback.call(context, this.grid[i][j])
						}
					}
				}
			}
		}

		// Check for isolate tile
		clean() {
			// TODO
		}

		kill(tile: Tile) {
			delete this.grid[tile.gridX][tile.gridY]
			tile.destroy()
			this.clean()
		}

		snap(...a) {
			return null
		}

		follow(...a) {
			return null
		}

	}

}


module Toffee {

	export class Entity extends Phaser.Group {

		// Track tile's reference in a grid
		grid: Array<Array<Tile>>

		// Check if background is pressed
		pressed: boolean = false

		// Color
		bin: number
		rainbow: number

		constructor(game: Phaser.Game) {

			super(game)

			game.add.existing(this)

		}

		forEach(callback: Function, context: any, ...args: any[]) {
			for (var i = 0 ; i < this.grid.length ; ++i) {
				for (var j = 0 ; j < this.grid.length ; ++j) {
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

		// Color the entity !
		setColor(color: number) {
			this.forEach((child: Tile) => {
					child.tint = color
			}, this)
		}

		// Check for isolate tile
		clean() {
			// TODO
		}

		empty() {
			this.forEach((child: Tile) => {
				this.kill(child)
			}, this)
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

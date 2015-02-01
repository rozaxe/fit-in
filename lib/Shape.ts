
module Toffee {

	export class Shape extends Phaser.Group {

		// Margin from surface shape
		margin: number = 3

		// Number of breakable tile
		coat: number = 2

		// Number of unbreakble tile
		core: number = 2

		// Total size
		accumulation: number = this.margin * 2 + this.coat * 2 + this.core

		// Track tile's reference in a grid
		grid: Array<Array<Tile>>

		constructor(game: Phaser.Game) {

			super(game)

			this.grid = new Array(this.accumulation)

			for (var i = 0 ; i < this.accumulation ; ++i) {
				this.grid[i] = new Array(this.accumulation)
			}

			// Create coat
			for (var i = this.margin ; i < this.accumulation - this.margin ; ++i) {

				for (var j = this.margin ; j < this.accumulation - this.margin ; ++j) {

					this.grid[i][j] = new Tile(game, i, j, this)

				}

			}

			// Create core
			for (var i = this.margin + this.coat ; i < this.accumulation - this.margin - this.coat ; ++i) {

				for (var j = this.margin + this.coat ; j < this.accumulation - this.margin - this.coat ; ++j) {

					this.grid[i][j].destroy()
					this.grid[i][j] = new Core(game, i, j, this)

				}

			}

			// Create protrusion


			game.add.existing(this)

		}

		forEach(callback: Function, context: any, ...args: any[]) {
			for (var i = 0 ; i < this.accumulation ; ++i) {
				for (var j = 0 ; j < this.accumulation ; ++j) {
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

		snap() {

			this.forEach((child: Tile) => {
					child.snapPosition()
				}, this)

		}

		follow(tile: Tile) {

			this.forEach((child: Tile, dragged: Tile) => {

					// Get other than clicked one
					if (child != dragged) {
						child.x = child.snapX + dragged.distX
						child.y = child.snapY + dragged.distY
					}

				}, this, tile)

		}

	}

}

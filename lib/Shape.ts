/// <reference path="Entity" />

module Toffee {

	export class Shape extends Entity {

		grid: Array<Array<Movable>>

		constructor(game: Phaser.Game) {

			super(game)

			this.grid = new Array(Data.accumulation)

			for (var i = 0 ; i < Data.accumulation ; ++i) {
				this.grid[i] = new Array(Data.accumulation)
			}

			// Create coat
			for (var i = Data.margin ; i < Data.accumulation - Data.margin ; ++i) {

				for (var j = Data.margin ; j < Data.accumulation - Data.margin ; ++j) {

					this.grid[i][j] = new Movable(game, i, j, this)

				}

			}

			// Create core

			for (var i = Data.margin + Data.coat ; i < Data.accumulation - Data.margin - Data.coat ; ++i) {

				for (var j = Data.margin + Data.coat ; j < Data.accumulation - Data.margin - Data.coat ; ++j) {

					this.grid[i][j].destroy()
					this.grid[i][j] = new Core(game, i, j, this)

				}

			}

			// Create protrusion

			//Move it to the left
			this.forEach((child: Tile) => {
					child.x += Data.shapeX
					child.y += Data.shapeY
				}, this)


			//game.add.existing(this)

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

		snap() {

			this.forEach((child: Movable) => {
					child.snapPosition()
				}, this)

		}

		follow(tile: Tile) {

			this.forEach((child: Movable, dragged: Movable) => {

					// Get other than clicked one
					if (child != dragged) {
						child.x = child.snapX + dragged.distX
						child.y = child.snapY + dragged.distY
					}

				}, this, tile)

		}

	}

}

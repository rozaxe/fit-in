/// <reference path="Entity" />

module Toffee {

	export class Shape extends Entity {

		mold: Mold
		grid: Array<Array<Movable>>
		fit: boolean = false

		constructor(game: Phaser.Game) {

			super(game)

			this.grid = new Array(Data.accumulation)

			for (var i = 0 ; i < Data.accumulation ; ++i) {
				this.grid[i] = new Array(Data.accumulation)
			}

			var shape = this.game.rnd.pick(Data.shapes)

			for (var x = 0 ; x < shape.length ; ++x) {
				for (var y = 0 ; y < shape.length ; ++y) {
					switch (shape[x][y]) {
						case 1:
							this.grid[y][x] = new Movable(game, y, x, this)
							break
						case 2:
							this.grid[y][x] = new Core(game, y, x, this)
							break
					}
				}
			}

			/* Old version
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
			this.protrusionBigTop(3)
			this.protrusionBigDown(2)
			//*/


			//Move it to the left half
			this.forEach((child: Tile) => {
					child.x += Data.shapeX
					child.y += Data.shapeY
				}, this)


			//game.add.existing(this)

		}

		// Shape realised
		onRelease() {

			if (this.fitting()) {
				console.log("vii !")
			} else {
				console.log("nop")
			}

		}

		// Return if shape fit in mold
		fitting(): boolean {

			var origin = this.mold.grid[0][0].position
			var center = this.grid[Data.margin + Data.coat][Data.margin + Data.coat]
			var dist = {x: center.x - origin.x, y: center.y - origin.y}
			dist.x /= Data.size
			dist.y /= Data.size
			this.fit = true

			this.forEach((child: Movable, d: any) => {

					var relative = {x: d.x + (child.gridX - Data.margin - Data.coat), y: d.y + (child.gridY - Data.margin - Data.coat)}
					if (!this.mold.isEmpty(relative.x, relative.y)) {
						this.fit = false
					}

				}, this, dist)

			return this.fit

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

		//
		protrusionBigTop(distX: number) {

			var count = 1

			for (var y = 0 ; y < 3 ; ++y) {
				for (var x = 0 ; x < count ; ++x) {
					this.grid[distX + x][y] = new Movable(this.game, distX + x, y, this)
				}
				++count
			}

		}

		protrusionBigDown(distX: number) {

			var count = 3
			var distY = Data.margin + Data.coat * 2 + Data.core

			for (var y = distY ; y < distY + 3 ; ++y) {
				for (var x = count ; x > 0 ; --x) {
					this.grid[distX + x][y] = new Movable(this.game, distX + x, y, this)
				}
				--count
			}

		}

	}

}

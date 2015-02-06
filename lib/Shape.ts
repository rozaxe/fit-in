/// <reference path="Entity" />

module Toffee {

	export class Shape extends Entity {

		mold: Mold
		grid: Array<Array<Movable>>
		fit: boolean = false
		current: Play
		first_diff: number

		constructor(game: Phaser.Game) {

			super(game)

		}

		// Populate
		populate(shape: any) {

			this.grid = new Array(Data.accumulation)

			for (var i = 0 ; i < Data.accumulation ; ++i) {
				this.grid[i] = new Array(Data.accumulation)
			}

			for (var x = 0 ; x < shape.length ; ++x) {
				for (var y = 0 ; y < shape.length ; ++y) {
					switch (shape[x][y]) {
						case 1:
							this.grid[y][x] = new Movable(this.game, y, x, this)
							break
						case 2:
							this.grid[y][x] = new Core(this.game, y, x, this)
							break
					}
				}
			}

			//Move it to the left half
			this.forEach((child: Tile) => {
					child.x += Data.shapeX
					child.y += Data.shapeY
				}, this)

			// how many diff
			this.first_diff = this.diff()

		}

		onCatch() {

			this.current.catched()

		}

		// Shape realised
		onRelease() {

			if (this.fitting()) {
				console.log("vii !")
				this.current.fitting()
			} else {
				console.log("nop")
				this.current.notFitting()
			}

		}

		diff(): number {
			var diff = 0

			for (var y = 0 ; y < this.grid.length ; ++y) {
				for (var x = 0 ; x < this.grid.length ; ++x) {
					if (Data.base[x][y] == 0 && this.grid[x][y] != null) {
						++diff
					}
				}
			}
			return diff
		}

		empty() {
			this.forEach((child: Tile) => {
				this.kill(child)
			}, this)
		}

		kill(tile: Tile) {
			super.kill(tile)

			this.current.cutted(this.diff() / this.first_diff)
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

	}

}

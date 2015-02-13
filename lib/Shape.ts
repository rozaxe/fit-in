/// <reference path="Entity" />

module Toffee {

	export class Shape extends Entity {

		mold: Mold
		grid: Array<Array<Movable>>
		fit: boolean = false
		delta: number
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
			this.diff()
			this.first_diff = this.delta

			this.bin = this.game.rnd.pick(Data.binaire)
			this.rainbow = this.game.rnd.pick(Data.rainbow)

			this.setColor(this.rainbow)

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

		diff() {
			var diff = 0

			for (var y = 0 ; y < this.grid.length ; ++y) {
				for (var x = 0 ; x < this.grid.length ; ++x) {
					if (Data.base[x][y] == 0 && this.grid[x][y] != null) {
						++diff
					}
				}
			}
			this.delta = diff
			//return diff
		}

		kill(tile: Tile) {
			super.kill(tile)

			this.diff()

			this.setColor(Phaser.Color.interpolateColor(this.bin, this.rainbow, this.first_diff, this.delta, 1))

			this.current.cutted(this.delta / this.first_diff)
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

/// <reference path="Entity" />

module Toffee {

	export class Mold extends Entity {

		counter = 0

		constructor(game: Phaser.Game) {
			super (game)
		}

		populate() {

			this.grid = new Array(Data.half)
			for (var i = 0 ; i < Data.half ; ++i) {
				this.grid[i] = new Array(Data.half)
			}

			// Create tile
			for (var i = 0 ; i < Data.half ; ++i) {
				for (var j = 0 ; j < Data.half ; ++j) {
					this.grid[i][j] = new Tile(this.game, i, j, this)
				}
			}

			// Remove square
			for (var i = Data.border + Data.margin ; i < Data.border + Data.margin + Data.coat * 2 + Data.core ; ++i) {
				for (var j = Data.border + Data.margin ; j < Data.border + Data.margin + Data.coat * 2 + Data.core ; ++j) {
					this.kill(this.grid[i][j])
				}
			}

		}

		kill(tile: Tile) {
			super.kill(tile)
			if (this.pressed) {
				this.current.breakingMold(++this.counter)
			}
		}

		// Check if there is void at the coordonate
		isEmpty(x: number, y: number) {
			if (Data.border <= x && x <= Data.border + Data.accumulation &&
				Data.border <= y && y <= Data.border + Data.accumulation) {
				if (!this.grid[x][y]) {
					return true
				}
			}
			return false
		}

	}

}

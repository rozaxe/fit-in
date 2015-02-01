/// <reference path="Entity" />

module Toffee {

	export class Mold extends Entity {

		constructor(game: Phaser.Game) {
			super (game)

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


			//game.add.existing(this)
		}

	}

}

/// <reference path="Entity" />


module Toffee {

	export class Border extends Entity {

		constructor(game: Phaser.Game) {

			super(game)

			this.grid = new Array(Data.half)
			for (var i = 0 ; i < Data.half ; ++i) {
				this.grid[i] = new Array(1)
			}

			// Create tile
			for (var i = 0 ; i < Data.half ; ++i) {
				this.grid[i][0] = new Core(this.game, 0, i, this)
			}

			this.setColor(0xdddddd)

			this.forEach((child: Core) => {
					child.x += (Data.half) * Data.size
				}, this)

		}

	}

}

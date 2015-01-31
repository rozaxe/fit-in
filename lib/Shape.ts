
module Toffee {

	export class Shape extends Phaser.Group {

		constructor(game: Phaser.Game) {

			super(game)

			for (var i = 0 ; i < 4 ; ++i) {
				this.add(new Tile(game, i*64, 64, this))
			}

			game.add.existing(this)

		}

		snap() {

			this.forEach((child: Tile) => {

					child.snapPosition()

				}, this, true)
		}

		follow(tile: Tile) {

			this.forEach((child: Tile, dragged: Tile) => {

					// Get other than clicked one
					if (child != dragged) {

						child.x = child.snapX + dragged.distX
						child.y = child.snapY + dragged.distY

					}

				}, this, true, tile)

		}

	}

}

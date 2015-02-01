
module Toffee {

	export class Tile extends Phaser.Sprite {

		// Tile position into the entity grid
		gridX: number
		gridY: number

		// Tile position snapped
		snapX: number
		snapY: number

		// Delta position while dragging
		distX: number
		distY: number

		entity: Entity

		constructor(game: Phaser.Game, x: number, y: number, entity: Entity) {

			super(game, 0, 0, 'tile', 0)

			this.entity = entity
			this.gridX = x
			this.gridY = y

			// Scale in pixel
			this.position.setTo(x * Data.size, y * Data.size)
			this.scale.setTo(Data.size)

			this.tint = 0xff0000

			// Hover
			this.inputEnabled = true
			this.events.onInputOver.add(this.over, this)
			//this.events.onInputOut.add(out, this)

			game.add.existing(this)

		}


		over() {
			if (this.entity.pressed) {
				this.entity.kill(this)
			}
		}


	}

}

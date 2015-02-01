
module Toffee {

	export class Tile extends Phaser.Sprite {

		size: number = 32

		// Tile position snapped
		snapX: number
		snapY: number

		// Delta position while dragging
		distX: number
		distY: number

		shape: Shape

		constructor(game: Phaser.Game, x: number, y: number, shape: Shape) {

			super(game, 0, 0, 'tile', 0)

			this.shape = shape

			// Scale in pixel
			this.position.setTo(x * this.size, y * this.size)
			this.scale.setTo(this.size)

			this.tint = 0xff0000

			this.inputEnabled = true
			this.input.enableDrag()

			// Snap on release
			this.events.onDragStart.add(this.startSnapDrag, this)
			this.events.onDragStop.add(this.stopSnapDrag, this)
			this.input.enableSnap(this.size, this.size, false, true)

			game.add.existing(this)

		}

		startSnapDrag() {
			this.shape.snap()
		}

		stopSnapDrag() {
			this.updateDist()
			this.shape.follow(this)
		}

		snapPosition() {
			this.snapX = this.x
			this.snapY = this.y
		}

		updateDist() {
			this.distX = this.x - this.snapX
			this.distY = this.y - this.snapY
		}

		update() {

			if (this.input.isDragged) {
				this.updateDist()
				this.shape.follow(this)
			}

		}

	}

}

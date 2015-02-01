/// <reference path="Tile" />

module Toffee {

	export class Movable extends Tile {

		entity: Shape

		constructor(game: Phaser.Game, x: number, y: number, entity: Shape) {

			super(game, x, y, entity)

			// Drag & Drop
			this.input.enableDrag()
			this.events.onDragStart.add(this.startSnapDrag, this)
			this.events.onDragStop.add(this.stopSnapDrag, this)
			this.input.enableSnap(Data.size, Data.size, false, true)

		}

		startSnapDrag() {
			this.entity.snap()
		}

		stopSnapDrag() {
			this.updateDist()
			this.entity.follow(this)
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
				this.entity.follow(this)
			}

		}

	}

}

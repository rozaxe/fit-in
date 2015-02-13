/// <reference path="Movable" />

module Toffee {

	export class Core extends Movable {

		constructor(game: Phaser.Game, x: number, y: number, shape: any) {

			super(game, x, y, shape)

			//this.tint = 0x0000ff

		}

		// Can't destroy core tile
		over() {
			return null
		}

	}

}

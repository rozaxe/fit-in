/// <reference path="Tile" />

module Toffee {

	export class Core extends Tile {

		constructor(game: Phaser.Game, x: number, y: number, shape: Shape) {

			super(game, x, y, shape)

			this.tint = 0x0000ff

		}

	}

}

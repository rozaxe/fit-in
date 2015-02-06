
module Toffee {

	export class Tuto extends Phaser.Sprite {

        tween: Phaser.Tween

		constructor(game: Phaser.Game) {
			super(game, 0, 0, "pointer")
			this.anchor.setTo(0.5)
			this.alpha = 0

			this.game.add.existing(this)

		}

		// Info for drag in to the mold
		// TODO Another curve ?
		dragIt() {

            var x = Data.getWidth() / 2 + Data.getWidth() / 4

            this.fromTo(x, Data.getWidth() / 4)

		}

		fromTo(from: number, to:number) {
            var y = Data.getHeight() / 2

		    this.position.setTo(from, y)
		    this.tween = this.game.add.tween(this)
		    this.tween.to({alpha: 1}, 200)
		        .to({x: to}, 1000)
		        .to({alpha: 0}, 200)
		        .to({x: from}, 1000)
            this.tween.loop()
	        this.tween.start()
		}

		stopIt() {
		    this.tween.stop()
		    this.alpha = 0
		}

		// Info for dragging back
		dragBack() {

		    this.tween.stop()
		    this.alpha = 0

		    var x = Data.getWidth() / 2 + Data.getWidth() / 4

            this.fromTo(Data.getWidth() / 4, x)

		}

	}

}
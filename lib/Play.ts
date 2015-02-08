
module Toffee {

	export class Play extends Phaser.State {

		shape: Shape
		speech: Speech
		tuto: Tuto
		tutoNumber = 0

		create() {

			var background = new Background(this.game)
			var mold = new Mold(this.game)
			this.shape = new Shape(this.game)
			this.speech = new Speech(this.game)
			this.tuto = new Tuto(this.game)

			background.shape = this.shape
			background.mold = mold
			this.shape.mold = mold
			this.shape.current = this

			this.firstWave()

		}

		firstWave() {
			this.shape.populate(Data.shapes[0])

			this.speech.write("First, drag it to the mold.")
			this.tuto.dragIt()

			// Bring to top
			this.game.world.bringToTop(this.speech)
			this.game.world.bringToTop(this.tuto)
		}

		cutted(percent: number) {
			if (this.tutoNumber == 2) {
				if (percent == 0) {
					this.speech.write("Great ! Put him into the mold.")
				}
			}
		}

		catched() {
			if (this.tutoNumber == 2) {

			}
		}

		notFitting() {
			if (this.tutoNumber == 0) {
				++this.tutoNumber

				this.speech.write("See, _it_ doesn't fit. Drag it back were it was.")
				this.tuto.dragBack()

			} else if (this.tutoNumber == 1) {
				++this.tutoNumber

				this.speech.write("Now, cut the excedant !")
				this.tuto.stopIt()

			}
		}

		fitting() {
			if (this.tutoNumber == 2) {
				++this.tutoNumber
				this.speech.write("He's fitting perfectly ! Let's do it with another.")
				this.speech.autoClose()

			}

			// New shape
			this.shape.empty()
			this.shape.populate(this.game.rnd.pick(Data.shapes))

		}

	}

}

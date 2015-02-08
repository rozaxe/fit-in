
module Toffee {

	export class Play extends Phaser.State {

		mold: Mold
		shape: Shape
		speech: Speech
		tuto: Tuto
		tutoNumber = 0

		create() {

			var background = new Background(this.game)
			this.mold = new Mold(this.game)
			this.shape = new Shape(this.game)
			this.speech = new Speech(this.game)
			this.tuto = new Tuto(this.game)

			background.shape = this.shape
			background.mold = this.mold
			this.shape.mold = this.mold
			this.shape.current = this

			this.firstWave()

		}

		firstWave() {
			this.mold.populate()
			this.shape.populate(Data.shapes[0])
			this.shape.bin = Data.binaire[0]
			this.mold.setColor(this.shape.bin)
			this.mold.rainbow = this.shape.rainbow

			this.speech.write("First, drag it to the mold.")
			this.tuto.dragIt()

			// Bring to top
			this.game.world.bringToTop(this.speech)
			this.game.world.bringToTop(this.tuto)
		}

		newWave() {
			// New shape
			this.shape.empty()
			this.mold.empty()
			this.mold.populate()
			this.shape.populate(this.game.rnd.pick(Data.shapes))

			this.mold.setColor(this.shape.bin)
			this.mold.rainbow = this.shape.rainbow

			this.game.world.bringToTop(this.speech)
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
			if (this.shape.first_diff == this.shape.delta) {

				console.log("victory !")
				alert("Perfect ! Don't let anyone choose who you are. Be yourself !")
				alert("The end ! =3")

			} else if (this.tutoNumber == 2) {
				++this.tutoNumber
				this.speech.write("He's fitting perfectly ! Let's do it with another.")
				this.speech.autoClose()

			}

			this.newWave()

		}

	}

}

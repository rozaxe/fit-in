
module Toffee {

	export class Play extends Phaser.State {

		mold: Mold
		shape: Shape
		speech: Speech
		wailings: Wailings
		tuto: Tuto
		tutoNumber = 0
		breaked = false
		counter = 0

		create() {

			var background = new Background(this.game)
			var border = new Border(this.game)
			this.mold = new Mold(this.game)
			this.shape = new Shape(this.game)
			this.speech = new Speech(this.game)
			this.tuto = new Tuto(this.game)
			this.wailings = new Wailings(this.game)

			background.shape = this.shape
			background.mold = this.mold
			this.shape.mold = this.mold
			this.shape.current = this
			this.mold.current = this

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
			//this.mold.empty()
			//this.mold.populate()
			this.shape.populate(this.game.rnd.pick(Data.shapes))
			++this.counter

			this.game.world.bringToTop(this.speech)
		}

		breakingMold(nb: number) {
			this.closeTuto()
			this.breaked = true
			if (nb == 1) {
				this.speech.write("%WATCH %OUT %! Don't break the mold again !")
			} else if (nb == 4) {
				this.speech.write("%Why did you do that ! %What about the norm ! %Stop %it %!")
			} else if (nb > 8) {
				this.speech.write("%STOP %! %STOP %NOW %! %LEAVE %IT %!")
			} else if (nb > 12) {
				this.speech.write("%STOP %! Seriously ! You %can't do that %!")
			}

		}

		closeTuto() {
			this.tutoNumber = 500
			this.tuto.stopIt()
		}

		cutted(percent: number) {
			if (this.tutoNumber == 2) {
				if (percent == 0) {
					this.speech.write("Great ! Put ùhim into the mold.")
				}
			} else if (this.tutoNumber >= 2) {
				if (0.4 <= percent && percent <= 0.6) {
					this.wailings.newOne()
				}
			}
		}

		catched() {
			if (this.tutoNumber == 2) {

			}
			if (this.breaked) {
				this.speech.write("%NO ! Don't put _that inside !")
			}
		}

		notFitting() {
			if (this.tutoNumber == 0) {
				++this.tutoNumber

				this.speech.write("See, _it doesn't fit. Drag it back were it was.")
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

			}

			var old = this.shape.bin

			this.newWave()
			this.shape.forEach((child: Tile) => {
					child.alpha = 0
				}, this)
			var trans = new Trans(this.game, this, old)

		}

		appear() {
			this.shape.forEach((child: Tile) => {
					child.alpha = 1
				}, this)

			this.mold.setColor(this.shape.bin)
			this.mold.rainbow = this.shape.rainbow

			if (this.tutoNumber == 3) {
				++this.tutoNumber
				this.speech.write("ùHe's fitting perfectly ! Let's do it with another.")
				this.speech.autoClose()
			}

			if (this.counter > 3) {
				this.speech.write(this.game.rnd.pick(Data.clue))
				this.speech.autoClose()
			}

		}

	}

}

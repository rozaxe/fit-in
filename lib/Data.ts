
module Toffee {

	export class Data {

		// Message style
		static regular_style = { font: "32px Arial", fill: "#ffffff", align: "left" }

		// Color
		static binaire = [0x00c0fc, 0xfc0080]
		static rainbow = [0x00fc5f, 0xfc9400, 0xb513af, 0xbf0531]

		// Tile width / height
		static size =  32

		// Margin from surface shape
		static margin = 3

		// Number of breakable tile
		static coat = 2

		// Number of unbreakble tile
		static core = 2

		// Number of unbreakle mold tile
		static border = 2

		// Number of splited tile
		static split = 1

		// Total shape size
		static accumulation = Data.margin * 2 + Data.coat * 2 + Data.core

		// Half part
		static half = Data.accumulation + Data.border * 2

		// Mold Dist
		static moldX = 0

		// Shape Dist
		static shapeX = (Data.half + Data.border + Data.split) * Data.size
		static shapeY = Data.border * Data.size

		// All shapes
		static base = []
		static shapes = []

		// Game's min size
		static getWidth(): number {
			return (Data.half * 2 + Data.border) * Data.size
		}
		static getHeight(): number {
			return Data.half * Data.size
		}

		static parseDataShapes(file: string) {

			var lines = file.split("\n")
			var current = -1

			for (var i = 0 ; i < lines.length ; ++i) {
				var line = lines[i]

				// Ignore commentary
				if (line[0] == "#") {
					continue
				}

				// Empty line
				if (line.length == 0) {
					if (Data.shapes[current] && Data.shapes[current].length != Data.accumulation) {
						console.log("Warning shape number " + current + 1 + "\n")
					}
					++current
					Data.shapes[current] = []
					continue
				}

				// Warning if not good size
				if (line.length != Data.accumulation) {
					console.log("Warning at line " + i + "\n")
				}

				// File line shape with data
				var tmp = []
				for (var j = 0 ; j < line.length ; ++j) {
					tmp.push(parseInt(line[j]))
				}
				Data.shapes[current].push(tmp)

			}

			Data.base = Data.shapes.shift()

			Data.shapes.pop() // Remove last black ending

		}

	}

}

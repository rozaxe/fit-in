
module Toffee {

	export class Data {

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

		// Game's min size
		static getWidth(): number {
			return (Data.half * 2 + Data.border) * Data.size
		}
		static getHeight(): number {
			return Data.half * Data.size
		}

	}

}

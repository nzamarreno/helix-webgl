import { IColorRGBA } from "../Helix";

export class Color {
    static convertHexToRGB(hex: string): IColorRGBA {
        const hexValue = hex.replace("#", "");

        let colorConverted: IColorRGBA = { r: 0, g: 0, b: 0, a: 1 };
        let size = hexValue.length;

        if (size === 3) {
            // #ff0
            colorConverted.r =
                parseInt(hexValue.charAt(0) + hexValue.charAt(0), 16) / 255;
            colorConverted.g =
                parseInt(hexValue.charAt(1) + hexValue.charAt(1), 16) / 255;
            colorConverted.b =
                parseInt(hexValue.charAt(2) + hexValue.charAt(2), 16) / 255;

            return colorConverted;
        } else if (size === 6) {
            // #ff0000
            colorConverted.r =
                parseInt(hexValue.charAt(0) + hexValue.charAt(1), 16) / 255;
            colorConverted.g =
                parseInt(hexValue.charAt(2) + hexValue.charAt(3), 16) / 255;
            colorConverted.b =
                parseInt(hexValue.charAt(4) + hexValue.charAt(5), 16) / 255;

            return colorConverted;
        }

        return colorConverted;
    }
}

export default new Color();

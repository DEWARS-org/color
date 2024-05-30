# Color Library

The Color Library was developed at the
[National Geospatial-Intelligence Agency (NGA)](http://www.nga.mil/) in
collaboration with [BIT Systems](https://www.caci.com/bit-systems/). The
government has "unlimited rights" and is releasing this software to increase the
impact of government investments by providing developers with the opportunity to
take things in new directions.

Software source code previously released under an open source license and then
modified by NGA staff is considered a "joint work" (see 17 USC § 101); it is
partially copyrighted, partially public domain, and as a whole is protected by
the copyrights of the non-government authors and must be released according to
the terms of the original open source license.

### About

Color is a library providing color representation with support for hex, RBG,
arithmetic RBG, HSL, and integer colors.

### Usage

```javascript
import { Color } from "@dewars/color";

const rgb: Color = new Color();
rgb.setRGB(154, 205, 50);
const rgba: Color = new Color();
rgba.setRGB(255, 165, 0);
rgba.setAlpha(64);
const rgbOpacity: Color = new Color();
rgbOpacity.setRGB(255, 165, 0);
rgbOpacity.setOpacity(0.25);
const arithmeticRGB: Color = new Color();
arithmeticRGB.setRGB(1.0, 0.64705882352, 0.0);
const arithmeticRGBOpacity: Color = new Color();
arithmeticRGBOpacity.setRGB(1.0, 0.64705882352, 0.0);
arithmeticRGBOpacity.setOpacity(0.25098039215);
const hex: Color = Color.color("#BA55D3");
const hexAlpha: Color = Color.color("#D9FFFF00");
const hexInteger: Color = new Color();
hexInteger.setColor(0xFFC000);
const hexIntegerAlpha: Color = new Color();
hexIntegerAlpha.setColor(0x40FFA500);
const integer: Color = new Color();
integer.setColor(16711680);
const integerAlpha: Color = new Color();
integerAlpha.setColor(-12303292);
const hexSingles: Color = new Color();
hexSingles.setRGB("FF", "C0", "CB");
const hexSinglesAlpha: Color = new Color();
hexSinglesAlpha.setRGB("00", "00", "00", "80")
const hexSinglesOpacity: Color = new Color();
hexSinglesOpacity.setRGB("FF", "A5", "00");
hexSinglesOpacity.setOpacity(0.25);
const hsl: Color = new Color();
hsl.setColorByHSL(300.0, 1.0, 0.2509804);
const hsla: Color = new Color();
hsla.setColorByHSL(60.0, 1.0, 0.5, 0.85098039215);
const orangeAlpha: Color = Color.color(ColorConstants.ORANGE);
orangeAlpha.setAlpha(120);
const orangeOpacity: Color = Color.color(ColorConstants.ORANGE);
orangeOpacity.setOpacity(0.25);

const color = Color.blue();
color.setAlpha(56);
const hexValue: string = color.getColorHex();
const hexShorthand: string = color.getColorHexShorthand();
const hexWithAlpha: string = color.getColorHexWithAlpha();
const hexShorthandWithAlpha: string = color.getColorHexShorthandWithAlpha();
const integerValue: number = color.getColor();
const integerAlphaValue: number = color.getColorWithAlpha();
const red: number = color.getRed();
const greenArithmetic: number = color.getGreenArithmetic();
const blueHex: string = color.getBlueHex();
const alphaHexShorthand: string = color.getAlphaHexShorthand();
const opacity: number = color.getOpacity();
const hslValue: number[] = color.getHSL();
const hue: number = color.getHue();
const saturation: number = color.getSaturation();
const lightness: number = color.getLightness();
```

/**
 * Color utilities with support for hex, RBG, arithmetic RBG, HSL, and integer
 * colors
 */
export class ColorUtils {
  /**
   * Hex color pattern
   */
  private static readonly hexColorPattern = new RegExp(
    "^#?(([0-9a-fA-F]{3}){1,2}|([0-9a-fA-F]{4}){1,2})$",
  );

  /**
   * Hex single color pattern
   */
  private static readonly hexSingleColorPattern = new RegExp(
    "^[0-9a-fA-F]{1,2}$",
  );

  /**
   * Convert the hex color values to a hex color, shorthanded when possible
   *
   * @param red red hex color in format RR or R
   * @param green green hex color in format GG or G
   * @param blue blue hex color in format BB or B
   *
   * @return hex color in format #RGB or #RRGGBB
   */
  public static toColorShorthand(
    red: string,
    green: string,
    blue: string,
  ): string {
    return ColorUtils.shorthandHex(
      ColorUtils.toColor(red, green, blue) as string,
    );
  }

  /**
   * Convert the hex color values to a hex color including an opaque alpha
   * value of FF or F, shorthanded when possible
   *
   * @param red red hex color in format RR or R
   * @param green green hex color in format GG or G
   * @param blue blue hex color in format BB or B
   *
   * @return hex color in format #ARGB or #AARRGGBB
   */
  public static toColorShorthandWithDefaultAlpha(
    red: string,
    green: string,
    blue: string,
  ): string {
    return ColorUtils.shorthandHex(
      ColorUtils.toColorWithDefaultAlpha(red, green, blue) as string,
    );
  }

  /**
   * Convert the hex color values to a hex color, shorthanded when possible
   *
   * @param red red hex color in format RR or R
   * @param green green hex color in format GG or G
   * @param blue blue hex color in format BB or B
   * @param alpha alpha hex color in format AA or A, undefined to not include alpha
   *
   * @return hex color in format #ARGB, #RGB, #AARRGGBB, or #RRGGBB
   */
  public static toColorShorthandWithAlpha(
    red: string,
    green: string,
    blue: string,
    alpha: string,
  ): string {
    return ColorUtils.shorthandHex(
      ColorUtils.toColorWithAlpha(red, green, blue, alpha) as string,
    );
  }

  /**
   * Convert the RBG values to a color integer or hex color values to a hex color
   *
   * @param red red integer color inclusively between 0 and 255 or red hex color in format RR or R
   * @param green green integer color inclusively between 0 and 255 or green hex color in format GG or G
   * @param blue blue integer color inclusively between 0 and 255 or blue hex color in format BB or B
   *
   * @return integer color or hex color in format #RRGGBB
   */
  public static toColor(
    red: string | number,
    green: string | number,
    blue: string | number,
  ): string | number {
    let color: string | number;
    if (typeof red === "number") {
      color = ColorUtils.toColorWithAlpha(red, green, blue, -1);
    } else {
      color = ColorUtils.toColorWithAlpha(red, green, blue);
    }
    return color;
  }

  /**
   * Convert the RBG values to a color integer including an opaque alpha value
   * of 255 or Convert the hex color values to a hex color including an opaque alpha
   * value of FF
   *
   * @param red red integer color inclusively between 0 and 255 or red hex color in format RR or R
   * @param green green integer color inclusively between 0 and 255 or green hex color in format GG or G
   * @param blue blue integer color inclusively between 0 and 255 or blue hex color in format BB or B
   *
   * @return integer color or hex color in format #AARRGGBB
   */
  public static toColorWithDefaultAlpha(
    red: string | number,
    green: string | number,
    blue: string | number,
  ): string | number {
    let color: string | number;
    if (typeof red === "number") {
      color = ColorUtils.toColorWithAlpha(red, green, blue, 255);
    } else {
      let defaultAlpha = "FF";
      if (
        red.length > 0 &&
        red.charAt(0).toLowerCase() === red.charAt(0)
      ) {
        defaultAlpha = defaultAlpha.toLowerCase();
      }
      color = ColorUtils.toColorWithAlpha(red, green, blue, defaultAlpha);
    }
    return color;
  }

  /**
   * Convert the RBGA values to a color integer or Convert the hex color values to a hex color
   *
   * @param red red integer color inclusively between 0 and 255 or red hex color in format RR or R
   * @param green green integer color inclusively between 0 and 255 or  green hex color in format GG or G
   * @param blue blue integer color inclusively between 0 and 255 or blue hex color in format BB or B
   * @param alpha alpha integer color inclusively between 0 and 255, undefined to not include alpha
   *
   * @return integer color or hex color in format #AARRGGBB or #RRGGBB
   */
  public static toColorWithAlpha(
    red: string | number,
    green: string | number,
    blue: string | number,
    alpha?: string | number,
  ): string | number {
    let color: string | number = "";
    if (
      typeof red === "number" && typeof green === "number" &&
      typeof blue === "number"
    ) {
      ColorUtils.validateRGB(red);
      ColorUtils.validateRGB(green);
      ColorUtils.validateRGB(blue);
      color = ((red & 0xff) << 16) | ((green & 0xff) << 8) | (blue & 0xff);
      if (typeof alpha === "number" && alpha !== -1) {
        ColorUtils.validateRGB(alpha);
        color = ((alpha & 0xff) << 24) | color;
      }
    } else if (
      typeof red === "string" && typeof green === "string" &&
      typeof blue === "string"
    ) {
      ColorUtils.validateHexSingle(red);
      ColorUtils.validateHexSingle(green);
      ColorUtils.validateHexSingle(blue);
      color = "#";
      if (typeof alpha === "string") {
        color += ColorUtils.expandShorthandHexSingle(alpha);
      }
      color += ColorUtils.expandShorthandHexSingle(red);
      color += ColorUtils.expandShorthandHexSingle(green);
      color += ColorUtils.expandShorthandHexSingle(blue);
    }
    return color;
  }

  /**
   * Convert the RGB integer to a hex single color
   *
   * @param color integer color inclusively between 0 and 255 or float color inclusively between 0.0 and 1.0
   * @return hex single color in format FF
   */
  public static toHex(color: number): string {
    let hex: string;
    if (!Number.isInteger(color) || color === 1 || color === 0) {
      color = ColorUtils.toRGB(color);
    }
    ColorUtils.validateRGB(color);
    hex = color.toString(16).toUpperCase();
    if (hex.length === 1) {
      hex = "0" + hex;
    }
    return hex;
  }

  /**
   * Convert red, green, and blue arithmetic values to HSL (hue, saturation,
   * lightness) values
   *
   * @param red red color inclusively between 0.0 and 1.0 or between 0 and 255
   * @param green green color inclusively between 0.0 and 1.0 or between 0 and 255
   * @param blue blue color inclusively between 0.0 and 1.0 or between 0 and 255
   * @return HSL array where: 0 = hue, 1 = saturation, 2 = lightness
   */
  public static toHSL(red: number, green: number, blue: number): number[] {
    if (Number.isInteger(red) && red !== 0 && red !== 1) {
      red = ColorUtils.toArithmeticRGB(red);
    }
    if (Number.isInteger(green) && green !== 0 && green !== 1) {
      green = ColorUtils.toArithmeticRGB(green);
    }
    if (Number.isInteger(blue) && blue !== 0 && blue !== 1) {
      blue = ColorUtils.toArithmeticRGB(blue);
    }

    ColorUtils.validateArithmeticRGB(red);
    ColorUtils.validateArithmeticRGB(green);
    ColorUtils.validateArithmeticRGB(blue);

    const min = Math.min(Math.min(red, green), blue);
    const max = Math.max(Math.max(red, green), blue);

    const range = max - min;

    let hue = 0.0;
    if (range > 0.0) {
      if (red >= green && red >= blue) {
        hue = (green - blue) / range;
      } else if (green >= blue) {
        hue = 2 + (blue - red) / range;
      } else {
        hue = 4 + (red - green) / range;
      }
    }

    hue *= 60.0;
    if (hue < 0) {
      hue += 360.0;
    }

    const sum = min + max;

    const lightness = sum / 2.0;

    let saturation: number;
    if (min === max) {
      saturation = 0.0;
    } else {
      if (lightness < 0.5) {
        saturation = range / sum;
      } else {
        saturation = range / (2.0 - max - min);
      }
    }

    return [hue, saturation, lightness];
  }

  /**
   * Convert the RGB integer to an arithmetic RBG float or Convert the hex single color to an arithmetic RBG float
   *
   * @param color integer color inclusively between 0 and 255 or hex single color in format FF or F
   * @return float color inclusively between 0.0 and 1.0
   */
  public static toArithmeticRGB(color: string | number): number {
    if (typeof color === "string") {
      color = ColorUtils.toRGB(color);
    }

    if (Number.isInteger(color) && color !== 0 && color !== 1) {
      ColorUtils.validateRGB(color);
      color = color / 255.0;
    }

    return color;
  }

  /**
   * Convert HSL (hue, saturation, and lightness) values to RGB arithmetic
   * values
   *
   * @param hue hue value inclusively between 0.0 and 360.0
   * @param saturation saturation inclusively between 0.0 and 1.0
   * @param lightness lightness inclusively between 0.0 and 1.0
   * @return arithmetic RGB array where: 0 = red, 1 = green, 2 = blue
   */
  public static toArithmeticRGBFromHSL(
    hue: number,
    saturation: number,
    lightness: number,
  ): number[] {
    ColorUtils.validateHue(hue);
    ColorUtils.validateSaturation(saturation);
    ColorUtils.validateLightness(lightness);

    hue /= 60.0;
    let t2: number;
    if (lightness <= 0.5) {
      t2 = lightness * (saturation + 1);
    } else {
      t2 = lightness + saturation - lightness * saturation;
    }
    const t1 = lightness * 2.0 - t2;

    const red = ColorUtils.hslConvert(t1, t2, hue + 2);
    const green = ColorUtils.hslConvert(t1, t2, hue);
    const blue = ColorUtils.hslConvert(t1, t2, hue - 2);

    return [red, green, blue];
  }

  /**
   * Convert the arithmetic RGB float to a RBG integer or Convert the hex single color to a RBG integer
   *
   * @param color float color inclusively between 0.0 and 1.0 or hex single color in format FF or F
   *
   * @return integer color inclusively between 0 and 255
   */
  public static toRGB(color: string | number): number {
    let colorNumber: number;

    if (typeof color === "number") {
      ColorUtils.validateArithmeticRGB(color);
      colorNumber = Math.round(255 * color);
    } else {
      ColorUtils.validateHexSingle(color);
      if (color.length === 1) {
        color += color;
      }
      colorNumber = parseInt(color, 16);
    }

    return colorNumber;
  }

  /**
   * Convert HSL (hue, saturation, and lightness) values to RGB integer values
   *
   * @param hue hue value inclusively between 0.0 and 360.0
   * @param saturation saturation inclusively between 0.0 and 1.0
   * @param lightness lightness inclusively between 0.0 and 1.0
   * @return RGB integer array where: 0 = red, 1 = green, 2 = blue
   */
  public static toRGBFromHSL(
    hue: number,
    saturation: number,
    lightness: number,
  ): number[] {
    const arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(
      hue,
      saturation,
      lightness,
    );
    const rgb = [
      ColorUtils.toRGB(arithmeticRGB[0]),
      ColorUtils.toRGB(arithmeticRGB[1]),
      ColorUtils.toRGB(arithmeticRGB[2]),
    ];
    return rgb;
  }

  /**
   * HSL convert helper method
   *
   * @param t1 t1
   * @param t2 t2
   * @param hue hue
   * @return arithmetic RBG value
   */
  private static hslConvert(t1: number, t2: number, hue: number): number {
    let value: number;
    if (hue < 0) {
      hue += 6;
    }
    if (hue >= 6) {
      hue -= 6;
    }
    if (hue < 1) {
      value = (t2 - t1) * hue + t1;
    } else if (hue < 3) {
      value = t2;
    } else if (hue < 4) {
      value = (t2 - t1) * (4 - hue) + t1;
    } else {
      value = t1;
    }
    return value;
  }

  /**
   * Get the hex single color
   *
   * @param hex hex color
   * @param colorIndex red=0, green=1, blue=2, alpha=-1
   * @return hex single color in format FF or undefined
   */
  private static getHexSingle(
    hex: string,
    colorIndex: number,
  ): string | undefined {
    ColorUtils.validateHex(hex);

    if (hex.startsWith("#")) {
      hex = hex.substring(1);
    }

    let colorCharacters = 1;
    let numColors = hex.length;
    if (numColors > 4) {
      colorCharacters++;
      numColors /= 2;
    }

    let color: string | undefined;
    if (colorIndex >= 0 || numColors > 3) {
      if (numColors > 3) {
        colorIndex++;
      }
      let startIndex = colorIndex;
      if (colorCharacters > 1) {
        startIndex *= 2;
      }
      color = hex.substring(startIndex, startIndex + colorCharacters);
      color = ColorUtils.expandShorthandHexSingle(color);
    }
    return color;
  }

  /**
   * Get the red color from color integer or Get the hex red color from the hex string
   *
   * @param color color integer or hex color
   * @return red color or hex red color in format RR
   */
  public static getRed(color: string | number): string | number | undefined {
    let red: string | number | undefined;
    if (typeof color === "number") {
      red = (color >> 16) & 0xff;
    } else {
      red = ColorUtils.getHexSingle(color, 0);
    }

    return red;
  }

  /**
   * Get the green color from color integer or Get the hex green color from the hex string
   *
   * @param color color integer or hex color
   * @return green color or hex green color in format GG
   */
  public static getGreen(color: string | number): string | number | undefined {
    let green: string | number | undefined;
    if (typeof color === "number") {
      green = (color >> 8) & 0xff;
    } else {
      green = ColorUtils.getHexSingle(color, 1);
    }

    return green;
  }

  /**
   * Get the blue color from color integer or Get the hex blue color from the hex string
   *
   * @param color color integer or hex color
   * @return blue color or hex blue color in format BB
   */
  public static getBlue(color: string | number): string | number | undefined {
    let blue: string | number | undefined;
    if (typeof color === "number") {
      blue = color & 0xff;
    } else {
      blue = ColorUtils.getHexSingle(color, 2);
    }

    return blue;
  }

  /**
   * Get the alpha color from color integer or Get the hex alpha color from the hex string if it exists
   *
   * @param color color integer or hex color
   * @return alpha color or hex alpha color in format AA or undefined
   */
  public static getAlpha(color: string | number): string | number | undefined {
    let alpha: string | number | undefined;
    if (typeof color === "number") {
      alpha = (color >> 24) & 0xff;
    } else {
      alpha = ColorUtils.getHexSingle(color, -1);
    }

    return alpha;
  }

  /**
   * Shorthand the hex color if possible
   *
   * @param color hex color
   * @return shorthand hex color or original value
   */
  public static shorthandHex(color: string): string {
    ColorUtils.validateHex(color);
    if (color.length > 5) {
      let shorthandColor: string = "";
      let startIndex = 0;
      if (color.startsWith("#")) {
        shorthandColor += "#";
        startIndex++;
      }
      for (; startIndex < color.length; startIndex += 2) {
        const shorthand = ColorUtils.shorthandHexSingle(
          color.substring(startIndex, startIndex + 2),
        );
        if (shorthand.length > 1) {
          shorthandColor = "";
          break;
        }
        shorthandColor += shorthand;
      }
      if (shorthandColor.length) {
        color = shorthandColor.toString();
      }
    }

    return color;
  }

  /**
   * Expand the hex if it is in shorthand
   *
   * @param color hex color
   * @return expanded hex color or original value
   */
  public static expandShorthandHex(color: string): string {
    ColorUtils.validateHex(color);
    if (color.length < 6) {
      let expandColor = "";
      let startIndex = 0;
      if (color.startsWith("#")) {
        expandColor += "#";
        startIndex++;
      }
      for (; startIndex < color.length; startIndex++) {
        const expand = ColorUtils.expandShorthandHexSingle(
          color.substring(startIndex, startIndex + 1),
        );
        expandColor += expand;
      }
      color = expandColor.toString();
    }
    return color;
  }

  /**
   * Shorthand the hex single color if possible
   *
   * @param color hex single color
   * @return shorthand hex color or original value
   */
  public static shorthandHexSingle(color: string): string {
    ColorUtils.validateHexSingle(color);
    if (
      color.length > 1 &&
      color.charAt(0).toUpperCase() === color.charAt(1).toUpperCase()
    ) {
      color = color.substring(0, 1);
    }
    return color;
  }

  /**
   * Expand the hex single if it is in shorthand
   *
   * @param color hex single color
   * @return expanded hex color or original value
   */
  public static expandShorthandHexSingle(color: string): string {
    ColorUtils.validateHexSingle(color);
    if (color.length === 1) {
      color += color;
    }
    return color;
  }

  /**
   * Check if the hex color value is valid
   *
   * @param color hex color
   * @return true if valid
   */
  public static isValidHex(color: string | undefined): boolean {
    return color !== undefined && ColorUtils.hexColorPattern.test(color);
  }

  /**
   * Validate the hex color value
   *
   * @param color hex color
   */
  public static validateHex(color: string) {
    if (!ColorUtils.isValidHex(color)) {
      throw new Error(
        "Hex color must be in format #RRGGBB, #RGB, #AARRGGBB, #ARGB, RRGGBB, RGB, AARRGGBB, or ARGB, invalid value: " +
          color,
      );
    }
  }

  /**
   * Check if the hex single color value is valid
   *
   * @param color hex single color
   * @return true if valid
   */
  public static isValidHexSingle(color: string | undefined): boolean {
    return color !== undefined && ColorUtils.hexSingleColorPattern.test(color);
  }

  /**
   * Validate the hex single color value
   *
   * @param color hex single color
   */
  public static validateHexSingle(color: string) {
    if (!ColorUtils.isValidHexSingle(color)) {
      throw new Error("Must be in format FF or F, invalid value: " + color);
    }
  }

  /**
   * Check if the RBG integer color is valid, inclusively between 0 and 255
   *
   * @param color decimal color
   * @return true if valid
   */
  public static isValidRGB(color: number): boolean {
    return color >= 0 && color <= 255;
  }

  /**
   * Validate the RBG integer color is inclusively between 0 and 255
   *
   * @param color decimal color
   */
  public static validateRGB(color: number) {
    if (!ColorUtils.isValidRGB(color)) {
      throw new Error(
        "Must be inclusively between 0 and 255, invalid value: " + color,
      );
    }
  }

  /**
   * Check if the arithmetic RGB float color is valid, inclusively between 0.0
   * and 1.0
   *
   * @param color decimal color
   * @return true if valid
   */
  public static isValidArithmeticRGB(color: number): boolean {
    return color >= 0.0 && color <= 1.0;
  }

  /**
   * Validate the arithmetic RGB float color is inclusively between 0.0 and
   * 1.0
   *
   * @param color decimal color
   */
  public static validateArithmeticRGB(color: number) {
    if (!ColorUtils.isValidArithmeticRGB(color)) {
      throw new Error(
        "Must be inclusively between 0.0 and 1.0, invalid value: " + color,
      );
    }
  }

  /**
   * Check if the HSL hue float value is valid, inclusively between 0.0 and
   * 360.0
   *
   * @param hue hue value
   * @return true if valid
   */
  public static isValidHue(hue: number): boolean {
    return hue >= 0.0 && hue <= 360.0;
  }

  /**
   * Validate the HSL hue float value is inclusively between 0.0 and 360.0
   *
   * @param hue hue value
   */
  public static validateHue(hue: number) {
    if (!ColorUtils.isValidHue(hue)) {
      throw new Error(
        "Must be inclusively between 0.0 and 360.0, invalid value: " + hue,
      );
    }
  }

  /**
   * Check if the HSL saturation float value is valid, inclusively between 0.0
   * and 1.0
   *
   * @param saturation saturation value
   * @return true if valid
   */
  public static isValidSaturation(saturation: number): boolean {
    return saturation >= 0.0 && saturation <= 1.0;
  }

  /**
   * Validate the HSL saturation float value is inclusively between 0.0 and
   * 1.0
   *
   * @param saturation saturation value
   */
  public static validateSaturation(saturation: number) {
    if (!ColorUtils.isValidSaturation(saturation)) {
      throw new Error(
        "Must be inclusively between 0.0 and 1.0, invalid value: " + saturation,
      );
    }
  }

  /**
   * Check if the HSL lightness float value is valid, inclusively between 0.0
   * and 1.0
   *
   * @param lightness lightness value
   * @return true if valid
   */
  public static isValidLightness(lightness: number): boolean {
    return lightness >= 0.0 && lightness <= 1.0;
  }

  /**
   * Validate the HSL lightness float value is inclusively between 0.0 and 1.0
   *
   * @param lightness lightness value
   */
  public static validateLightness(lightness: number) {
    if (!ColorUtils.isValidLightness(lightness)) {
      throw new Error(
        "Must be inclusively between 0.0 and 1.0, invalid value: " + lightness,
      );
    }
  }
}

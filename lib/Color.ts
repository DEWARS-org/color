import { ColorConstants } from "./ColorConstants.ts";
import { ColorUtils } from "./ColorUtils.ts";

/**
 * Color representation with support for hex, RBG, arithmetic RBG, HSL, and
 * integer colors
 */
export class Color {
  /**
   * Red arithmetic color value
   */
  private red = 0.0;

  /**
   * Green arithmetic color value
   */
  private green = 0.0;

  /**
   * Blue arithmetic color value
   */
  private blue = 0.0;

  /**
   * Opacity arithmetic value
   */
  private opacity = 1.0;

  /**
   * Create a black color
   *
   * @return color
   */
  public static black(): Color {
    return Color.color(ColorConstants.BLACK);
  }

  /**
   * Create a blue color
   *
   * @return color
   */
  public static blue(): Color {
    return Color.color(ColorConstants.BLUE);
  }

  /**
   * Create a brown color
   *
   * @return color
   */
  public static brown(): Color {
    return Color.color(ColorConstants.BROWN);
  }

  /**
   * Create a cyan color
   *
   * @return color
   */
  public static cyan(): Color {
    return Color.color(ColorConstants.CYAN);
  }

  /**
   * Create a dark gray color
   *
   * @return color
   */
  public static darkGray(): Color {
    return Color.color(ColorConstants.DKGRAY);
  }

  /**
   * Create a gray color
   *
   * @return color
   */
  public static gray(): Color {
    return Color.color(ColorConstants.GRAY);
  }

  /**
   * Create a green color
   *
   * @return color
   */
  public static green(): Color {
    return Color.color(ColorConstants.GREEN);
  }

  /**
   * Create a light gray color
   *
   * @return color
   */
  public static lightGray(): Color {
    return Color.color(ColorConstants.LTGRAY);
  }

  /**
   * Create a magenta color
   *
   * @return color
   */
  public static magenta(): Color {
    return Color.color(ColorConstants.MAGENTA);
  }

  /**
   * Create an orange color
   *
   * @return color
   */
  public static orange(): Color {
    return Color.color(ColorConstants.ORANGE);
  }

  /**
   * Create a pink color
   *
   * @return color
   */
  public static pink(): Color {
    return Color.color(ColorConstants.PINK);
  }

  /**
   * Create a purple color
   *
   * @return color
   */
  public static purple(): Color {
    return Color.color(ColorConstants.PURPLE);
  }

  /**
   * Create a red color
   *
   * @return color
   */
  public static red(): Color {
    return Color.color(ColorConstants.RED);
  }

  /**
   * Create a violet color
   *
   * @return color
   */
  public static violet(): Color {
    return Color.color(ColorConstants.VIOLET);
  }

  /**
   * Create a white color
   *
   * @return color
   */
  public static white(): Color {
    return Color.color(ColorConstants.WHITE);
  }

  /**
   * Create a yellow color
   *
   * @return color
   */
  public static yellow(): Color {
    return Color.color(ColorConstants.YELLOW);
  }

  /**
   * Create the color in hex
   *
   * @param color
   *            hex color in format #RRGGBB, RRGGBB, #RGB, RGB, #AARRGGBB,
   *            AARRGGBB, #ARGB, or ARGB
   * @return color
   */
  public static color(color: string): Color {
    const newColor = new Color();
    newColor.setColor(color);
    return newColor;
  }

  /**
   * Set the color as a single integer or Set the color in hex
   *
   * @param color
   *            color integer or hex color in format #RRGGBB, RRGGBB, #RGB, RGB, #AARRGGBB,
   *            AARRGGBB, #ARGB, or ARGB
   */
  public setColor(color: string | number | string): void {
    if (typeof color === "number") {
      this.setRed(ColorUtils.getRed(color));
      this.setGreen(ColorUtils.getGreen(color));
      this.setBlue(ColorUtils.getBlue(color));
      if (color > 16777215 || color < 0) {
        this.setAlpha(ColorUtils.getAlpha(color));
      }
    } else {
      this.setRed(ColorUtils.getRed(color));
      this.setGreen(ColorUtils.getGreen(color));
      this.setBlue(ColorUtils.getBlue(color));
      const alpha = ColorUtils.getAlpha(color);
      if (alpha != null) {
        this.setAlpha(alpha);
      }
    }
  }

  /**
   * Set the color with HSLA (hue, saturation, lightness, alpha) values
   *
   * @param hue
   *            hue value inclusively between 0.0 and 360.0
   * @param saturation
   *            saturation inclusively between 0.0 and 1.0
   * @param lightness
   *            lightness inclusively between 0.0 and 1.0
   * @param alpha
   *            alpha inclusively between 0.0 and 1.0
   */
  public setColorByHSL(
    hue: number,
    saturation: number,
    lightness: number,
    alpha?: number,
  ): void {
    const arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(
      hue,
      saturation,
      lightness,
    );
    this.setRed(arithmeticRGB[0]);
    this.setGreen(arithmeticRGB[1]);
    this.setBlue(arithmeticRGB[2]);
    if (alpha) {
      this.setAlpha(alpha);
    }
  }

  /**
   * Set the red color as an integer or hex
   *
   * @param red
   *            red integer color inclusively between 0 and 255 or red hex color in format RR or R
   */
  public setRed(red: string | number): void {
    if (typeof red === "number") {
      if (Number.isInteger(red) && red !== 0 && red !== 1) {
        red = ColorUtils.toHex(red);
      }
    }

    if (typeof red === "string") {
      red = ColorUtils.toArithmeticRGB(red);
    }
    ColorUtils.validateArithmeticRGB(red);
    this.red = red;
  }

  /**
   * Set the green color as an integer orr hex
   *
   * @param green
   *            green integer color inclusively between 0 and 255 or in format GG or G
   */
  public setGreen(green: string | number): void {
    if (typeof green === "number") {
      if (Number.isInteger(green) && green !== 0 && green !== 1) {
        green = ColorUtils.toHex(green);
      }
    }

    if (typeof green === "string") {
      green = ColorUtils.toArithmeticRGB(green);
    }
    ColorUtils.validateArithmeticRGB(green);
    this.green = green;
  }

  /**
   * Set the blue color as an integer or hex
   *
   * @param blue
   *            blue integer color inclusively between 0 and 255 or in format BB or B
   */
  public setBlue(blue: string | number): void {
    if (typeof blue === "number") {
      if (Number.isInteger(blue) && blue !== 0 && blue !== 1) {
        blue = ColorUtils.toHex(blue);
      }
    }

    if (typeof blue === "string") {
      blue = ColorUtils.toArithmeticRGB(blue);
    }
    ColorUtils.validateArithmeticRGB(blue);
    this.blue = blue;
  }

  /**
   * Set the opacity as an arithmetic float
   *
   * @param opacity
   *            opacity float color inclusively between 0.0 and 1.0
   */
  public setOpacity(opacity: number) {
    ColorUtils.validateArithmeticRGB(opacity);
    this.opacity = opacity;
  }

  /**
   * Set the alpha color as an arithmetic float or hex
   *
   * @param alpha
   *            alpha float color inclusively between 0.0 and 1.0 or hex color in format AA or A
   */
  public setAlpha(alpha: string | number): void {
    if (typeof alpha === "string") {
      alpha = ColorUtils.toArithmeticRGB(alpha);
    } else if (Number.isInteger(alpha) && alpha !== 0 && alpha !== 1) {
      alpha = ColorUtils.toArithmeticRGB(alpha);
    }

    this.setOpacity(alpha);
  }

  /**
   * Check if the color is opaque (opacity or alpha of 1.0, 255, or x00)
   *
   * @return true if opaque
   */
  public isOpaque(): boolean {
    return this.opacity === 1.0;
  }

  /**
   * Get the color as a hex string
   *
   * @return hex color in the format #RRGGBB
   */
  public getColorHex(): string {
    return ColorUtils.toColor(
      this.getRedHex(),
      this.getGreenHex(),
      this.getBlueHex(),
    ) as string;
  }

  /**
   * Get the color as a hex string with alpha
   *
   * @return hex color in the format #AARRGGBB
   */
  public getColorHexWithAlpha(): string {
    return ColorUtils.toColorWithAlpha(
      this.getRedHex(),
      this.getGreenHex(),
      this.getBlueHex(),
      this.getAlphaHex(),
    ) as string;
  }

  /**
   * Get the color as a hex string, shorthanded when possible
   *
   * @return hex color in the format #RGB or #RRGGBB
   */
  public getColorHexShorthand(): string {
    return ColorUtils.toColorShorthand(
      this.getRedHex(),
      this.getGreenHex(),
      this.getBlueHex(),
    );
  }

  /**
   * Get the color as a hex string with alpha, shorthanded when possible
   *
   * @return hex color in the format #ARGB or #AARRGGBB
   */
  public getColorHexShorthandWithAlpha(): string {
    return ColorUtils.toColorShorthandWithAlpha(
      this.getRedHex(),
      this.getGreenHex(),
      this.getBlueHex(),
      this.getAlphaHex(),
    );
  }

  /**
   * Get the color as an integer
   *
   * @return integer color
   */
  public getColor(): number {
    return ColorUtils.toColor(
      this.getRed(),
      this.getGreen(),
      this.getBlue(),
    ) as number;
  }

  /**
   * Get the color as an integer including the alpha
   *
   * @return integer color
   */
  public getColorWithAlpha(): number {
    return ColorUtils.toColorWithAlpha(
      this.getRed(),
      this.getGreen(),
      this.getBlue(),
      this.getAlpha(),
    ) as number;
  }

  /**
   * Get the red color in hex
   *
   * @return red hex color in format RR
   */
  public getRedHex(): string {
    return ColorUtils.toHex(this.red);
  }

  /**
   * Get the green color in hex
   *
   * @return green hex color in format GG
   */
  public getGreenHex(): string {
    return ColorUtils.toHex(this.green);
  }

  /**
   * Get the blue color in hex
   *
   * @return blue hex color in format BB
   */
  public getBlueHex(): string {
    return ColorUtils.toHex(this.blue);
  }

  /**
   * Get the alpha color in hex
   *
   * @return alpha hex color in format AA
   */
  public getAlphaHex(): string {
    return ColorUtils.toHex(this.opacity);
  }

  /**
   * Get the red color in hex, shorthand when possible
   *
   * @return red hex color in format R or RR
   */
  public getRedHexShorthand(): string {
    return ColorUtils.shorthandHexSingle(this.getRedHex());
  }

  /**
   * Get the green color in hex, shorthand when possible
   *
   * @return green hex color in format G or GG
   */
  public getGreenHexShorthand(): string {
    return ColorUtils.shorthandHexSingle(this.getGreenHex());
  }

  /**
   * Get the blue color in hex, shorthand when possible
   *
   * @return blue hex color in format B or BB
   */
  public getBlueHexShorthand(): string {
    return ColorUtils.shorthandHexSingle(this.getBlueHex());
  }

  /**
   * Get the alpha color in hex, shorthand when possible
   *
   * @return alpha hex color in format A or AA
   */
  public getAlphaHexShorthand(): string {
    return ColorUtils.shorthandHexSingle(this.getAlphaHex());
  }

  /**
   * Get the red color as an integer
   *
   * @return red integer color inclusively between 0 and 255
   */
  public getRed(): number {
    return ColorUtils.toRGB(this.red);
  }

  /**
   * Get the green color as an integer
   *
   * @return green integer color inclusively between 0 and 255
   */
  public getGreen(): number {
    return ColorUtils.toRGB(this.green);
  }

  /**
   * Get the blue color as an integer
   *
   * @return blue integer color inclusively between 0 and 255
   */
  public getBlue(): number {
    return ColorUtils.toRGB(this.blue);
  }

  /**
   * Get the alpha color as an integer
   *
   * @return alpha integer color inclusively between 0 and 255
   */
  public getAlpha(): number {
    return ColorUtils.toRGB(this.opacity);
  }

  /**
   * Get the red color as an arithmetic float
   *
   * @return red float color inclusively between 0.0 and 1.0
   */
  public getRedArithmetic(): number {
    return this.red;
  }

  /**
   * Get the green color as an arithmetic float
   *
   * @return green float color inclusively between 0.0 and 1.0
   */
  public getGreenArithmetic(): number {
    return this.green;
  }

  /**
   * Get the blue color as an arithmetic float
   *
   * @return blue float color inclusively between 0.0 and 1.0
   */
  public getBlueArithmetic(): number {
    return this.blue;
  }

  /**
   * Get the opacity as an arithmetic float
   *
   * @return opacity float inclusively between 0.0 and 1.0
   */
  public getOpacity(): number {
    return this.opacity;
  }

  /**
   * Get the alpha color as an arithmetic float
   *
   * @return alpha float color inclusively between 0.0 and 1.0
   */
  public getAlphaArithmetic(): number {
    return this.getOpacity();
  }

  /**
   * Get the HSL (hue, saturation, lightness) values
   *
   * @return HSL array where: 0 = hue, 1 = saturation, 2 = lightness
   */
  public getHSL(): number[] {
    return ColorUtils.toHSL(this.red, this.green, this.blue);
  }

  /**
   * Get the HSL hue value
   *
   * @return hue value
   */
  public getHue(): number {
    return this.getHSL()[0];
  }

  /**
   * Get the HSL saturation value
   *
   * @return saturation value
   */
  public getSaturation(): number {
    return this.getHSL()[1];
  }

  /**
   * Get the HSL lightness value
   *
   * @return lightness value
   */
  public getLightness(): number {
    return this.getHSL()[2];
  }

  /**
   * Copy the color
   *
   * @return color copy
   */
  public copy(): Color {
    const color = new Color();
    color.red = this.red;
    color.green = this.green;
    color.blue = this.blue;
    color.opacity = this.opacity;
    return color;
  }

  public setRGB(red: any, green: any, blue: any, alpha?: any) {
    this.setRed(red);
    this.setGreen(green);
    this.setBlue(blue);
    if (alpha) {
      this.setAlpha(alpha);
    }
  }
}

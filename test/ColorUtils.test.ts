import { ColorUtils } from "../lib/ColorUtils.ts";
import { expect } from "@std/expect";

Deno.test("test valid", () => {
  expect(ColorUtils.isValidHex("000000")).toBe(true);
  expect(ColorUtils.isValidHex("#000000")).toBe(true);
  expect(ColorUtils.isValidHex("00000000")).toBe(true);
  expect(ColorUtils.isValidHex("#00000000")).toBe(true);
  expect(ColorUtils.isValidHex("000")).toBe(true);
  expect(ColorUtils.isValidHex("#000")).toBe(true);
  expect(ColorUtils.isValidHex("0000")).toBe(true);
  expect(ColorUtils.isValidHex("#0000")).toBe(true);
  expect(ColorUtils.isValidHex("FFFFFF")).toBe(true);
  expect(ColorUtils.isValidHex("#FFFFFF")).toBe(true);
  expect(ColorUtils.isValidHex("FFFFFFFF")).toBe(true);
  expect(ColorUtils.isValidHex("#ffffffff")).toBe(true);
  expect(ColorUtils.isValidHex("FfF")).toBe(true);
  expect(ColorUtils.isValidHex("#fFf")).toBe(true);
  expect(ColorUtils.isValidHex("ffff")).toBe(true);
  expect(ColorUtils.isValidHex("#fFfF")).toBe(true);

  expect(ColorUtils.isValidHex(undefined)).toBe(false);
  expect(ColorUtils.isValidHex("")).toBe(false);

  expect(ColorUtils.isValidHex("00000")).toBe(false);
  expect(ColorUtils.isValidHex("0000000")).toBe(false);
  expect(ColorUtils.isValidHex("#00000")).toBe(false);
  expect(ColorUtils.isValidHex("#0000000")).toBe(false);
  expect(ColorUtils.isValidHex("000000000")).toBe(false);
  expect(ColorUtils.isValidHex("#000000000")).toBe(false);
  expect(ColorUtils.isValidHex("00")).toBe(false);
  expect(ColorUtils.isValidHex("#00")).toBe(false);
  expect(ColorUtils.isValidHex("FFFFF")).toBe(false);
  expect(ColorUtils.isValidHex("FFFFFFF")).toBe(false);
  expect(ColorUtils.isValidHex("#FFFFF")).toBe(false);
  expect(ColorUtils.isValidHex("#FFFFFFF")).toBe(false);
  expect(ColorUtils.isValidHex("FFFFFFFFF")).toBe(false);
  expect(ColorUtils.isValidHex("#FFFFFFFFF")).toBe(false);
  expect(ColorUtils.isValidHex("FF")).toBe(false);
  expect(ColorUtils.isValidHex("#FF")).toBe(false);

  expect(ColorUtils.isValidHex("G00000")).toBe(false);
  expect(ColorUtils.isValidHex("#00000H")).toBe(false);
  expect(ColorUtils.isValidHex("000i0000")).toBe(false);
  expect(ColorUtils.isValidHex("#0000J000")).toBe(false);
  expect(ColorUtils.isValidHex("00K")).toBe(false);
  expect(ColorUtils.isValidHex("#0l0")).toBe(false);
  expect(ColorUtils.isValidHex("0M00")).toBe(false);
  expect(ColorUtils.isValidHex("#n000")).toBe(false);
  expect(ColorUtils.isValidHex("FFGFFF")).toBe(false);
  expect(ColorUtils.isValidHex("#FFFHFF")).toBe(false);
  expect(ColorUtils.isValidHex("iFFFFFFF")).toBe(false);
  expect(ColorUtils.isValidHex("#FFFFFFFj")).toBe(false);
  expect(ColorUtils.isValidHex("FFK")).toBe(false);
  expect(ColorUtils.isValidHex("#LFF")).toBe(false);
  expect(ColorUtils.isValidHex("FFmF")).toBe(false);
  expect(ColorUtils.isValidHex("#FnFF")).toBe(false);

  expect(ColorUtils.isValidHexSingle("00")).toBe(true);
  expect(ColorUtils.isValidHexSingle("FF")).toBe(true);
  expect(ColorUtils.isValidHexSingle("ff")).toBe(true);
  expect(ColorUtils.isValidHexSingle("aB")).toBe(true);
  expect(ColorUtils.isValidHexSingle("C5")).toBe(true);
  expect(ColorUtils.isValidHexSingle("d")).toBe(true);
  expect(ColorUtils.isValidHexSingle("E")).toBe(true);
  expect(ColorUtils.isValidHexSingle("4")).toBe(true);

  expect(ColorUtils.isValidHexSingle(undefined)).toBe(false);
  expect(ColorUtils.isValidHexSingle("")).toBe(false);

  expect(ColorUtils.isValidHexSingle("000")).toBe(false);
  expect(ColorUtils.isValidHexSingle("0ff")).toBe(false);
  expect(ColorUtils.isValidHexSingle("G0")).toBe(false);
  expect(ColorUtils.isValidHexSingle("#00")).toBe(false);

  expect(ColorUtils.isValidRGB(-1)).toBe(false);
  expect(ColorUtils.isValidRGB(0)).toBe(true);
  expect(ColorUtils.isValidRGB(128)).toBe(true);
  expect(ColorUtils.isValidRGB(255)).toBe(true);
  expect(ColorUtils.isValidRGB(256)).toBe(false);

  expect(ColorUtils.isValidArithmeticRGB(0.0 - 0.0000001)).toBe(false);
  expect(ColorUtils.isValidArithmeticRGB(0.0)).toBe(true);
  expect(ColorUtils.isValidArithmeticRGB(0.5)).toBe(true);
  expect(ColorUtils.isValidArithmeticRGB(1.0)).toBe(true);
  expect(ColorUtils.isValidArithmeticRGB(1.0 + 0.0000001)).toBe(false);

  expect(ColorUtils.isValidHue(-0.0001)).toBe(false);
  expect(ColorUtils.isValidHue(0.0)).toBe(true);
  expect(ColorUtils.isValidHue(180.0)).toBe(true);
  expect(ColorUtils.isValidHue(360.0)).toBe(true);
  expect(ColorUtils.isValidHue(360.0001)).toBe(false);

  expect(ColorUtils.isValidSaturation(-0.0001)).toBe(false);
  expect(ColorUtils.isValidSaturation(0.0)).toBe(true);
  expect(ColorUtils.isValidSaturation(0.5)).toBe(true);
  expect(ColorUtils.isValidSaturation(1.0)).toBe(true);
  expect(ColorUtils.isValidSaturation(1.0001)).toBe(false);

  expect(ColorUtils.isValidLightness(-0.0001)).toBe(false);
  expect(ColorUtils.isValidLightness(0.0)).toBe(true);
  expect(ColorUtils.isValidLightness(0.5)).toBe(true);
  expect(ColorUtils.isValidLightness(1.0)).toBe(true);
  expect(ColorUtils.isValidLightness(1.0001)).toBe(false);
});

Deno.test("test utils", () => {
  expect(ColorUtils.toArithmeticRGB(95)).toBeCloseTo(
    0.37254903,
    0.0000001,
  );
  expect(ColorUtils.toRGB(ColorUtils.toArithmeticRGB(95))).toEqual(95);
  expect(ColorUtils.toRGB("5F")).toEqual(95);
  expect(ColorUtils.toArithmeticRGB("5F")).toBeCloseTo(
    0.37254903,
    0.0000001,
  );

  expect(ColorUtils.toRGB("00")).toEqual(0);
  expect(ColorUtils.toArithmeticRGB("00")).toBeCloseTo(0.0, 0.0);
  expect(ColorUtils.toRGB("80")).toEqual(128);
  expect(ColorUtils.toArithmeticRGB("80")).toBeCloseTo(
    0.5019608,
    0.0000001,
  );
  expect(ColorUtils.toRGB("FF")).toEqual(255);
  expect(ColorUtils.toArithmeticRGB("FF")).toBeCloseTo(1.0, 0.0);
  expect(ColorUtils.toRGB("ff")).toEqual(255);
  expect(ColorUtils.toArithmeticRGB("ff")).toBeCloseTo(1.0, 0.0);
  expect(ColorUtils.toRGB("f")).toEqual(255);
  expect(ColorUtils.toArithmeticRGB("f")).toBeCloseTo(1.0, 0.0);

  expect(ColorUtils.toHex(0)).toEqual("00");
  expect(ColorUtils.toHex(0.0)).toEqual("00");
  expect(ColorUtils.toHex(6)).toEqual("06");
  expect(ColorUtils.toHex(0.02352941176)).toEqual("06");
  expect(ColorUtils.toHex(128)).toEqual("80");
  expect(ColorUtils.toHex(0.5)).toEqual("80");
  expect(ColorUtils.toHex(255)).toEqual("FF");
  expect(ColorUtils.toHex(1.0)).toEqual("FF");

  expect(ColorUtils.getRed("A1B2C3")).toEqual("A1");
  expect(ColorUtils.getGreen("a1b2c3")).toEqual("b2");
  expect(ColorUtils.getBlue("a1b2C3")).toEqual("C3");
  expect(ColorUtils.getAlpha("A1B2C3")).toBeUndefined();
  expect(ColorUtils.getRed("D4A1B2C3")).toEqual("A1");
  expect(ColorUtils.getGreen("d4a1b2c3")).toEqual("b2");
  expect(ColorUtils.getBlue("d4a1b2C3")).toEqual("C3");
  expect(ColorUtils.getAlpha("DdA1B2C3")).toEqual("Dd");

  expect(ColorUtils.getRed("#A1B2C3")).toEqual("A1");
  expect(ColorUtils.getGreen("#a1b2c3")).toEqual("b2");
  expect(ColorUtils.getBlue("#a1b2C3")).toEqual("C3");
  expect(ColorUtils.getAlpha("#A1B2C3")).toBeUndefined();
  expect(ColorUtils.getRed("#D4A1B2C3")).toEqual("A1");
  expect(ColorUtils.getGreen("#d4a1b2c3")).toEqual("b2");
  expect(ColorUtils.getBlue("#d4a1b2C3")).toEqual("C3");
  expect(ColorUtils.getAlpha("#dDA1B2C3")).toEqual("dD");

  expect(ColorUtils.getRed("ABC")).toEqual("AA");
  expect(ColorUtils.getGreen("abc")).toEqual("bb");
  expect(ColorUtils.getBlue("abC")).toEqual("CC");
  expect(ColorUtils.getAlpha("ABC")).toBeUndefined();
  expect(ColorUtils.getRed("DABC")).toEqual("AA");
  expect(ColorUtils.getGreen("dabc")).toEqual("bb");
  expect(ColorUtils.getBlue("dabC")).toEqual("CC");
  expect(ColorUtils.getAlpha("DABC")).toEqual("DD");

  expect(ColorUtils.getRed("#ABC")).toEqual("AA");
  expect(ColorUtils.getGreen("#abc")).toEqual("bb");
  expect(ColorUtils.getBlue("#abC")).toEqual("CC");
  expect(ColorUtils.getAlpha("#ABC")).toBeUndefined();
  expect(ColorUtils.getRed("#DABC")).toEqual("AA");
  expect(ColorUtils.getGreen("#dabc")).toEqual("bb");
  expect(ColorUtils.getBlue("#dabC")).toEqual("CC");
  expect(ColorUtils.getAlpha("#DABC")).toEqual("DD");

  expect(ColorUtils.getRed("010203")).toEqual("01");
  expect(ColorUtils.getGreen("010203")).toEqual("02");
  expect(ColorUtils.getBlue("010203")).toEqual("03");
  expect(ColorUtils.getAlpha("010203")).toBeUndefined();
  expect(ColorUtils.getRed("04010203")).toEqual("01");
  expect(ColorUtils.getGreen("04010203")).toEqual("02");
  expect(ColorUtils.getBlue("04010203")).toEqual("03");
  expect(ColorUtils.getAlpha("04010203")).toEqual("04");

  expect(ColorUtils.getRed("#010203")).toEqual("01");
  expect(ColorUtils.getGreen("#010203")).toEqual("02");
  expect(ColorUtils.getBlue("#010203")).toEqual("03");
  expect(ColorUtils.getAlpha("#010203")).toBeUndefined();
  expect(ColorUtils.getRed("#04010203")).toEqual("01");
  expect(ColorUtils.getGreen("#04010203")).toEqual("02");
  expect(ColorUtils.getBlue("#04010203")).toEqual("03");
  expect(ColorUtils.getAlpha("#04010203")).toEqual("04");

  expect(ColorUtils.getRed("123")).toEqual("11");
  expect(ColorUtils.getGreen("123")).toEqual("22");
  expect(ColorUtils.getBlue("123")).toEqual("33");
  expect(ColorUtils.getAlpha("123")).toBeUndefined();
  expect(ColorUtils.getRed("4123")).toEqual("11");
  expect(ColorUtils.getGreen("4123")).toEqual("22");
  expect(ColorUtils.getBlue("4123")).toEqual("33");
  expect(ColorUtils.getAlpha("4123")).toEqual("44");

  expect(ColorUtils.getRed("#123")).toEqual("11");
  expect(ColorUtils.getGreen("#123")).toEqual("22");
  expect(ColorUtils.getBlue("#123")).toEqual("33");
  expect(ColorUtils.getAlpha("#123")).toBeUndefined();
  expect(ColorUtils.getRed("#4123")).toEqual("11");
  expect(ColorUtils.getGreen("#4123")).toEqual("22");
  expect(ColorUtils.getBlue("#4123")).toEqual("33");
  expect(ColorUtils.getAlpha("#4123")).toEqual("44");

  expect(ColorUtils.getRed("112233")).toEqual("11");
  expect(ColorUtils.getGreen("112233")).toEqual("22");
  expect(ColorUtils.getBlue("112233")).toEqual("33");
  expect(ColorUtils.getAlpha("112233")).toBeUndefined();
  expect(ColorUtils.getRed("44112233")).toEqual("11");
  expect(ColorUtils.getGreen("44112233")).toEqual("22");
  expect(ColorUtils.getBlue("44112233")).toEqual("33");
  expect(ColorUtils.getAlpha("44112233")).toEqual("44");

  expect(ColorUtils.getRed("#112233")).toEqual("11");
  expect(ColorUtils.getGreen("#112233")).toEqual("22");
  expect(ColorUtils.getBlue("#112233")).toEqual("33");
  expect(ColorUtils.getAlpha("#112233")).toBeUndefined();
  expect(ColorUtils.getRed("#44112233")).toEqual("11");
  expect(ColorUtils.getGreen("#44112233")).toEqual("22");
  expect(ColorUtils.getBlue("#44112233")).toEqual("33");
  expect(ColorUtils.getAlpha("#44112233")).toEqual("44");

  expect(ColorUtils.getRed(-16711936)).toEqual(0);
  expect(ColorUtils.getGreen(-16711936)).toEqual(255);
  expect(ColorUtils.getBlue(-16711936)).toEqual(0);
  expect(ColorUtils.getAlpha(-16711936)).toEqual(255);

  expect(ColorUtils.getRed(0xff00ff00)).toEqual(0);
  expect(ColorUtils.getGreen(0xff00ff00)).toEqual(255);
  expect(ColorUtils.getBlue(0xff00ff00)).toEqual(0);
  expect(ColorUtils.getAlpha(0xff00ff00)).toEqual(255);

  expect(ColorUtils.getRed(65280)).toEqual(0);
  expect(ColorUtils.getGreen(65280)).toEqual(255);
  expect(ColorUtils.getBlue(65280)).toEqual(0);
  expect(ColorUtils.getAlpha(65280)).toEqual(0);

  expect(ColorUtils.getRed(0x00ff00)).toEqual(0);
  expect(ColorUtils.getGreen(0x00ff00)).toEqual(255);
  expect(ColorUtils.getBlue(0x00ff00)).toEqual(0);
  expect(ColorUtils.getAlpha(0x00ff00)).toEqual(0);

  expect(
    ColorUtils.toColor(
      ColorUtils.toRGB("00"),
      ColorUtils.toRGB("FF"),
      ColorUtils.toRGB("00"),
    ),
  ).toEqual(65280);
  expect(
    ColorUtils.toColorWithDefaultAlpha(
      ColorUtils.toRGB("00"),
      ColorUtils.toRGB("FF"),
      ColorUtils.toRGB("00"),
    ),
  ).toEqual(-16711936);
  expect(
    ColorUtils.toColorWithAlpha(
      ColorUtils.toRGB("00"),
      ColorUtils.toRGB("ff"),
      ColorUtils.toRGB("00"),
      ColorUtils.toRGB("fF"),
    ),
  ).toEqual(-16711936);

  expect(ColorUtils.toColor("A0", "B0", "C0")).toEqual("#A0B0C0");
  expect(ColorUtils.toColorWithDefaultAlpha("A0", "B0", "C0")).toEqual(
    "#FFA0B0C0",
  );
  expect(ColorUtils.toColorShorthand("A0", "B0", "C0")).toEqual("#A0B0C0");
  expect(ColorUtils.toColorShorthand("AA", "BB", "CC")).toEqual("#ABC");
  expect(ColorUtils.toColorShorthandWithDefaultAlpha("A0", "B0", "C0")).toEqual(
    "#FFA0B0C0",
  );
  expect(ColorUtils.toColorShorthandWithDefaultAlpha("AA", "BB", "CC")).toEqual(
    "#FABC",
  );
  expect(ColorUtils.toColorWithAlpha("A0", "B0", "C0", "D0")).toEqual(
    "#D0A0B0C0",
  );
  expect(ColorUtils.toColorShorthandWithAlpha("A0", "B0", "C0", "D0")).toEqual(
    "#D0A0B0C0",
  );
  expect(ColorUtils.toColorShorthandWithAlpha("AA", "BB", "CC", "D0")).toEqual(
    "#D0AABBCC",
  );
  expect(ColorUtils.toColorShorthandWithAlpha("AA", "BB", "CC", "DD")).toEqual(
    "#DABC",
  );

  expect(ColorUtils.toColor("a0", "b0", "c0")).toEqual("#a0b0c0");
  expect(ColorUtils.toColorWithDefaultAlpha("a0", "b0", "c0")).toEqual(
    "#ffa0b0c0",
  );
  expect(ColorUtils.toColorShorthand("a0", "b0", "c0")).toEqual("#a0b0c0");
  expect(ColorUtils.toColorShorthand("aa", "bb", "cc")).toEqual("#abc");
  expect(ColorUtils.toColorShorthandWithDefaultAlpha("a0", "b0", "c0")).toEqual(
    "#ffa0b0c0",
  );
  expect(ColorUtils.toColorShorthandWithDefaultAlpha("aa", "bb", "cc")).toEqual(
    "#fabc",
  );
  expect(ColorUtils.toColorWithAlpha("a0", "b0", "c0", "d0")).toEqual(
    "#d0a0b0c0",
  );
  expect(ColorUtils.toColorShorthandWithAlpha("a0", "b0", "c0", "d0")).toEqual(
    "#d0a0b0c0",
  );
  expect(ColorUtils.toColorShorthandWithAlpha("aa", "bb", "cc", "d0")).toEqual(
    "#d0aabbcc",
  );
  expect(ColorUtils.toColorShorthandWithAlpha("aa", "bb", "cc", "dd")).toEqual(
    "#dabc",
  );

  expect(ColorUtils.shorthandHex("10a0d1")).toEqual("10a0d1");
  expect(ColorUtils.shorthandHex("#10a0d1")).toEqual("#10a0d1");
  expect(ColorUtils.shorthandHex("0D0A0B0C")).toEqual("0D0A0B0C");
  expect(ColorUtils.shorthandHex("#0D0a0B0c")).toEqual("#0D0a0B0c");
  expect(ColorUtils.shorthandHex("11aadd")).toEqual("1ad");
  expect(ColorUtils.shorthandHex("#11aADd")).toEqual("#1aD");
  expect(ColorUtils.shorthandHex("DDAABBCC")).toEqual("DABC");
  expect(ColorUtils.shorthandHex("#dDAabBCc")).toEqual("#dAbC");

  expect(ColorUtils.expandShorthandHex("10a0d1")).toEqual("10a0d1");
  expect(ColorUtils.expandShorthandHex("#10a0d1")).toEqual("#10a0d1");
  expect(ColorUtils.expandShorthandHex("0D0A0B0C")).toEqual("0D0A0B0C");
  expect(ColorUtils.expandShorthandHex("#0D0a0B0c")).toEqual("#0D0a0B0c");
  expect(ColorUtils.expandShorthandHex("1ad")).toEqual("11aadd");
  expect(ColorUtils.expandShorthandHex("#1aD")).toEqual("#11aaDD");
  expect(ColorUtils.expandShorthandHex("DABC")).toEqual("DDAABBCC");
  expect(ColorUtils.expandShorthandHex("#dAbC")).toEqual("#ddAAbbCC");

  expect(ColorUtils.shorthandHexSingle("10")).toEqual("10");
  expect(ColorUtils.shorthandHexSingle("0A")).toEqual("0A");
  expect(ColorUtils.shorthandHexSingle("dd")).toEqual("d");
  expect(ColorUtils.shorthandHexSingle("cC")).toEqual("c");
  expect(ColorUtils.shorthandHexSingle("Aa")).toEqual("A");
  expect(ColorUtils.shorthandHexSingle("BB")).toEqual("B");

  expect(ColorUtils.expandShorthandHexSingle("10")).toEqual("10");
  expect(ColorUtils.expandShorthandHexSingle("0A")).toEqual("0A");
  expect(ColorUtils.expandShorthandHexSingle("d")).toEqual("dd");
  expect(ColorUtils.expandShorthandHexSingle("C")).toEqual("CC");

  let hsl = ColorUtils.toHSL(0, 0, 0);
  expect(hsl[0]).toEqual(0.0);
  expect(hsl[1]).toEqual(0);
  expect(hsl[2]).toEqual(0.0);

  let arithmeticRGB: number[] = ColorUtils.toArithmeticRGBFromHSL(
    0.0,
    0.0,
    0.0,
  );
  expect(arithmeticRGB[0]).toEqual(ColorUtils.toArithmeticRGB(0));
  expect(arithmeticRGB[1]).toEqual(ColorUtils.toArithmeticRGB(0));
  expect(arithmeticRGB[2]).toEqual(ColorUtils.toArithmeticRGB(0));

  hsl = ColorUtils.toHSL(255, 0, 0);
  expect(hsl[0]).toEqual(0.0);
  expect(hsl[1]).toEqual(1.0);
  expect(hsl[2]).toEqual(0.5);

  arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(0.0, 1.0, 0.5);
  expect(arithmeticRGB[0]).toEqual(ColorUtils.toArithmeticRGB(255));
  expect(arithmeticRGB[1]).toEqual(ColorUtils.toArithmeticRGB(0));
  expect(arithmeticRGB[2]).toEqual(ColorUtils.toArithmeticRGB(0));

  hsl = ColorUtils.toHSL(0, 255, 0);
  expect(hsl[0]).toEqual(120.0);
  expect(hsl[1]).toEqual(1.0);
  expect(hsl[2]).toEqual(0.5);

  arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(120.0, 1.0, 0.5);
  expect(arithmeticRGB[0]).toEqual(ColorUtils.toArithmeticRGB(0));
  expect(arithmeticRGB[1]).toEqual(ColorUtils.toArithmeticRGB(255));
  expect(arithmeticRGB[2]).toEqual(ColorUtils.toArithmeticRGB(0));

  hsl = ColorUtils.toHSL(0, 0, 255);
  expect(hsl[0]).toEqual(240.0);
  expect(hsl[1]).toEqual(1.0);
  expect(hsl[2]).toEqual(0.5);

  arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(240.0, 1.0, 0.5);
  expect(arithmeticRGB[0]).toEqual(ColorUtils.toArithmeticRGB(0));
  expect(arithmeticRGB[1]).toEqual(ColorUtils.toArithmeticRGB(0));
  expect(arithmeticRGB[2]).toEqual(ColorUtils.toArithmeticRGB(255));

  hsl = ColorUtils.toHSL(255, 255, 255);
  expect(hsl[0]).toEqual(0.0);
  expect(hsl[1]).toEqual(0.0);
  expect(hsl[2]).toEqual(1.0);

  arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(0.0, 0.0, 1.0);
  expect(arithmeticRGB[0]).toEqual(ColorUtils.toArithmeticRGB(255));
  expect(arithmeticRGB[1]).toEqual(ColorUtils.toArithmeticRGB(255));
  expect(arithmeticRGB[2]).toEqual(ColorUtils.toArithmeticRGB(255));

  hsl = ColorUtils.toHSL(200, 165, 10);
  expect(hsl[0]).toBeCloseTo(48.94737, 0.00001);
  expect(hsl[1]).toBeCloseTo(0.9047619, 0.00001);
  expect(hsl[2]).toBeCloseTo(0.4117647, 0.00001);

  let rgb = ColorUtils.toRGBFromHSL(48.94737, 0.9047619, 0.4117647);
  expect(rgb[0]).toEqual(200);
  expect(rgb[1]).toEqual(165);
  expect(rgb[2]).toEqual(10);

  hsl = ColorUtils.toHSL(52, 113, 82);
  expect(hsl[0]).toBeCloseTo(149.50821, 0.001);
  expect(hsl[1]).toBeCloseTo(0.36969694, 0.00001);
  expect(hsl[2]).toBeCloseTo(0.32352942, 0.00001);

  rgb = ColorUtils.toRGBFromHSL(149.50821, 0.36969694, 0.32352942);
  expect(rgb[0]).toEqual(52);
  expect(rgb[1]).toEqual(113);
  expect(rgb[2]).toEqual(82);
});

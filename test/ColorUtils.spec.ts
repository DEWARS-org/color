import { ColorUtils } from "../lib/ColorUtils.ts";
import { expect } from "chai";

describe("ColorUtils Tests", function () {
  it("test valid", function () {
    expect(ColorUtils.isValidHex("000000")).to.be.true;
    expect(ColorUtils.isValidHex("#000000")).to.be.true;
    expect(ColorUtils.isValidHex("00000000")).to.be.true;
    expect(ColorUtils.isValidHex("#00000000")).to.be.true;
    expect(ColorUtils.isValidHex("000")).to.be.true;
    expect(ColorUtils.isValidHex("#000")).to.be.true;
    expect(ColorUtils.isValidHex("0000")).to.be.true;
    expect(ColorUtils.isValidHex("#0000")).to.be.true;
    expect(ColorUtils.isValidHex("FFFFFF")).to.be.true;
    expect(ColorUtils.isValidHex("#FFFFFF")).to.be.true;
    expect(ColorUtils.isValidHex("FFFFFFFF")).to.be.true;
    expect(ColorUtils.isValidHex("#ffffffff")).to.be.true;
    expect(ColorUtils.isValidHex("FfF")).to.be.true;
    expect(ColorUtils.isValidHex("#fFf")).to.be.true;
    expect(ColorUtils.isValidHex("ffff")).to.be.true;
    expect(ColorUtils.isValidHex("#fFfF")).to.be.true;

    expect(ColorUtils.isValidHex(null)).to.be.false;
    expect(ColorUtils.isValidHex("")).to.be.false;

    expect(ColorUtils.isValidHex("00000")).to.be.false;
    expect(ColorUtils.isValidHex("0000000")).to.be.false;
    expect(ColorUtils.isValidHex("#00000")).to.be.false;
    expect(ColorUtils.isValidHex("#0000000")).to.be.false;
    expect(ColorUtils.isValidHex("000000000")).to.be.false;
    expect(ColorUtils.isValidHex("#000000000")).to.be.false;
    expect(ColorUtils.isValidHex("00")).to.be.false;
    expect(ColorUtils.isValidHex("#00")).to.be.false;
    expect(ColorUtils.isValidHex("FFFFF")).to.be.false;
    expect(ColorUtils.isValidHex("FFFFFFF")).to.be.false;
    expect(ColorUtils.isValidHex("#FFFFF")).to.be.false;
    expect(ColorUtils.isValidHex("#FFFFFFF")).to.be.false;
    expect(ColorUtils.isValidHex("FFFFFFFFF")).to.be.false;
    expect(ColorUtils.isValidHex("#FFFFFFFFF")).to.be.false;
    expect(ColorUtils.isValidHex("FF")).to.be.false;
    expect(ColorUtils.isValidHex("#FF")).to.be.false;

    expect(ColorUtils.isValidHex("G00000")).to.be.false;
    expect(ColorUtils.isValidHex("#00000H")).to.be.false;
    expect(ColorUtils.isValidHex("000i0000")).to.be.false;
    expect(ColorUtils.isValidHex("#0000J000")).to.be.false;
    expect(ColorUtils.isValidHex("00K")).to.be.false;
    expect(ColorUtils.isValidHex("#0l0")).to.be.false;
    expect(ColorUtils.isValidHex("0M00")).to.be.false;
    expect(ColorUtils.isValidHex("#n000")).to.be.false;
    expect(ColorUtils.isValidHex("FFGFFF")).to.be.false;
    expect(ColorUtils.isValidHex("#FFFHFF")).to.be.false;
    expect(ColorUtils.isValidHex("iFFFFFFF")).to.be.false;
    expect(ColorUtils.isValidHex("#FFFFFFFj")).to.be.false;
    expect(ColorUtils.isValidHex("FFK")).to.be.false;
    expect(ColorUtils.isValidHex("#LFF")).to.be.false;
    expect(ColorUtils.isValidHex("FFmF")).to.be.false;
    expect(ColorUtils.isValidHex("#FnFF")).to.be.false;

    expect(ColorUtils.isValidHexSingle("00")).to.be.true;
    expect(ColorUtils.isValidHexSingle("FF")).to.be.true;
    expect(ColorUtils.isValidHexSingle("ff")).to.be.true;
    expect(ColorUtils.isValidHexSingle("aB")).to.be.true;
    expect(ColorUtils.isValidHexSingle("C5")).to.be.true;
    expect(ColorUtils.isValidHexSingle("d")).to.be.true;
    expect(ColorUtils.isValidHexSingle("E")).to.be.true;
    expect(ColorUtils.isValidHexSingle("4")).to.be.true;

    expect(ColorUtils.isValidHexSingle(null)).to.be.false;
    expect(ColorUtils.isValidHexSingle("")).to.be.false;

    expect(ColorUtils.isValidHexSingle("000")).to.be.false;
    expect(ColorUtils.isValidHexSingle("0ff")).to.be.false;
    expect(ColorUtils.isValidHexSingle("G0")).to.be.false;
    expect(ColorUtils.isValidHexSingle("#00")).to.be.false;

    expect(ColorUtils.isValidRGB(-1)).to.be.false;
    expect(ColorUtils.isValidRGB(0)).to.be.true;
    expect(ColorUtils.isValidRGB(128)).to.be.true;
    expect(ColorUtils.isValidRGB(255)).to.be.true;
    expect(ColorUtils.isValidRGB(256)).to.be.false;

    expect(ColorUtils.isValidArithmeticRGB(0.0 - 0.0000001)).to.be.false;
    expect(ColorUtils.isValidArithmeticRGB(0.0)).to.be.true;
    expect(ColorUtils.isValidArithmeticRGB(0.5)).to.be.true;
    expect(ColorUtils.isValidArithmeticRGB(1.0)).to.be.true;
    expect(ColorUtils.isValidArithmeticRGB(1.0 + 0.0000001)).to.be.false;

    expect(ColorUtils.isValidHue(-0.0001)).to.be.false;
    expect(ColorUtils.isValidHue(0.0)).to.be.true;
    expect(ColorUtils.isValidHue(180.0)).to.be.true;
    expect(ColorUtils.isValidHue(360.0)).to.be.true;
    expect(ColorUtils.isValidHue(360.0001)).to.be.false;

    expect(ColorUtils.isValidSaturation(-0.0001)).to.be.false;
    expect(ColorUtils.isValidSaturation(0.0)).to.be.true;
    expect(ColorUtils.isValidSaturation(0.5)).to.be.true;
    expect(ColorUtils.isValidSaturation(1.0)).to.be.true;
    expect(ColorUtils.isValidSaturation(1.0001)).to.be.false;

    expect(ColorUtils.isValidLightness(-0.0001)).to.be.false;
    expect(ColorUtils.isValidLightness(0.0)).to.be.true;
    expect(ColorUtils.isValidLightness(0.5)).to.be.true;
    expect(ColorUtils.isValidLightness(1.0)).to.be.true;
    expect(ColorUtils.isValidLightness(1.0001)).to.be.false;
  });

  it("test utils", function () {
    expect(ColorUtils.toArithmeticRGB(95)).to.be.approximately(
      0.37254903,
      0.0000001,
    );
    expect(ColorUtils.toRGB(ColorUtils.toArithmeticRGB(95))).to.equal(95);
    expect(ColorUtils.toRGB("5F")).to.equal(95);
    expect(ColorUtils.toArithmeticRGB("5F")).to.be.approximately(
      0.37254903,
      0.0000001,
    );

    expect(ColorUtils.toRGB("00")).to.equal(0);
    expect(ColorUtils.toArithmeticRGB("00")).to.be.approximately(0.0, 0.0);
    expect(ColorUtils.toRGB("80")).to.equal(128);
    expect(ColorUtils.toArithmeticRGB("80")).to.be.approximately(
      0.5019608,
      0.0000001,
    );
    expect(ColorUtils.toRGB("FF")).to.equal(255);
    expect(ColorUtils.toArithmeticRGB("FF")).to.be.approximately(1.0, 0.0);
    expect(ColorUtils.toRGB("ff")).to.equal(255);
    expect(ColorUtils.toArithmeticRGB("ff")).to.be.approximately(1.0, 0.0);
    expect(ColorUtils.toRGB("f")).to.equal(255);
    expect(ColorUtils.toArithmeticRGB("f")).to.be.approximately(1.0, 0.0);

    expect(ColorUtils.toHex(0)).to.equal("00");
    expect(ColorUtils.toHex(0.0)).to.equal("00");
    expect(ColorUtils.toHex(6)).to.equal("06");
    expect(ColorUtils.toHex(0.02352941176)).to.equal("06");
    expect(ColorUtils.toHex(128)).to.equal("80");
    expect(ColorUtils.toHex(0.5)).to.equal("80");
    expect(ColorUtils.toHex(255)).to.equal("FF");
    expect(ColorUtils.toHex(1.0)).to.equal("FF");

    expect(ColorUtils.getRed("A1B2C3")).to.equal("A1");
    expect(ColorUtils.getGreen("a1b2c3")).to.equal("b2");
    expect(ColorUtils.getBlue("a1b2C3")).to.equal("C3");
    expect(ColorUtils.getAlpha("A1B2C3")).to.be.null;
    expect(ColorUtils.getRed("D4A1B2C3")).to.equal("A1");
    expect(ColorUtils.getGreen("d4a1b2c3")).to.equal("b2");
    expect(ColorUtils.getBlue("d4a1b2C3")).to.equal("C3");
    expect(ColorUtils.getAlpha("DdA1B2C3")).to.equal("Dd");

    expect(ColorUtils.getRed("#A1B2C3")).to.equal("A1");
    expect(ColorUtils.getGreen("#a1b2c3")).to.equal("b2");
    expect(ColorUtils.getBlue("#a1b2C3")).to.equal("C3");
    expect(ColorUtils.getAlpha("#A1B2C3")).to.be.null;
    expect(ColorUtils.getRed("#D4A1B2C3")).to.equal("A1");
    expect(ColorUtils.getGreen("#d4a1b2c3")).to.equal("b2");
    expect(ColorUtils.getBlue("#d4a1b2C3")).to.equal("C3");
    expect(ColorUtils.getAlpha("#dDA1B2C3")).to.equal("dD");

    expect(ColorUtils.getRed("ABC")).to.equal("AA");
    expect(ColorUtils.getGreen("abc")).to.equal("bb");
    expect(ColorUtils.getBlue("abC")).to.equal("CC");
    expect(ColorUtils.getAlpha("ABC")).to.be.null;
    expect(ColorUtils.getRed("DABC")).to.equal("AA");
    expect(ColorUtils.getGreen("dabc")).to.equal("bb");
    expect(ColorUtils.getBlue("dabC")).to.equal("CC");
    expect(ColorUtils.getAlpha("DABC")).to.equal("DD");

    expect(ColorUtils.getRed("#ABC")).to.equal("AA");
    expect(ColorUtils.getGreen("#abc")).to.equal("bb");
    expect(ColorUtils.getBlue("#abC")).to.equal("CC");
    expect(ColorUtils.getAlpha("#ABC")).to.be.null;
    expect(ColorUtils.getRed("#DABC")).to.equal("AA");
    expect(ColorUtils.getGreen("#dabc")).to.equal("bb");
    expect(ColorUtils.getBlue("#dabC")).to.equal("CC");
    expect(ColorUtils.getAlpha("#DABC")).to.equal("DD");

    expect(ColorUtils.getRed("010203")).to.equal("01");
    expect(ColorUtils.getGreen("010203")).to.equal("02");
    expect(ColorUtils.getBlue("010203")).to.equal("03");
    expect(ColorUtils.getAlpha("010203")).to.be.null;
    expect(ColorUtils.getRed("04010203")).to.equal("01");
    expect(ColorUtils.getGreen("04010203")).to.equal("02");
    expect(ColorUtils.getBlue("04010203")).to.equal("03");
    expect(ColorUtils.getAlpha("04010203")).to.equal("04");

    expect(ColorUtils.getRed("#010203")).to.equal("01");
    expect(ColorUtils.getGreen("#010203")).to.equal("02");
    expect(ColorUtils.getBlue("#010203")).to.equal("03");
    expect(ColorUtils.getAlpha("#010203")).to.be.null;
    expect(ColorUtils.getRed("#04010203")).to.equal("01");
    expect(ColorUtils.getGreen("#04010203")).to.equal("02");
    expect(ColorUtils.getBlue("#04010203")).to.equal("03");
    expect(ColorUtils.getAlpha("#04010203")).to.equal("04");

    expect(ColorUtils.getRed("123")).to.equal("11");
    expect(ColorUtils.getGreen("123")).to.equal("22");
    expect(ColorUtils.getBlue("123")).to.equal("33");
    expect(ColorUtils.getAlpha("123")).to.be.null;
    expect(ColorUtils.getRed("4123")).to.equal("11");
    expect(ColorUtils.getGreen("4123")).to.equal("22");
    expect(ColorUtils.getBlue("4123")).to.equal("33");
    expect(ColorUtils.getAlpha("4123")).to.equal("44");

    expect(ColorUtils.getRed("#123")).to.equal("11");
    expect(ColorUtils.getGreen("#123")).to.equal("22");
    expect(ColorUtils.getBlue("#123")).to.equal("33");
    expect(ColorUtils.getAlpha("#123")).to.be.null;
    expect(ColorUtils.getRed("#4123")).to.equal("11");
    expect(ColorUtils.getGreen("#4123")).to.equal("22");
    expect(ColorUtils.getBlue("#4123")).to.equal("33");
    expect(ColorUtils.getAlpha("#4123")).to.equal("44");

    expect(ColorUtils.getRed("112233")).to.equal("11");
    expect(ColorUtils.getGreen("112233")).to.equal("22");
    expect(ColorUtils.getBlue("112233")).to.equal("33");
    expect(ColorUtils.getAlpha("112233")).to.be.null;
    expect(ColorUtils.getRed("44112233")).to.equal("11");
    expect(ColorUtils.getGreen("44112233")).to.equal("22");
    expect(ColorUtils.getBlue("44112233")).to.equal("33");
    expect(ColorUtils.getAlpha("44112233")).to.equal("44");

    expect(ColorUtils.getRed("#112233")).to.equal("11");
    expect(ColorUtils.getGreen("#112233")).to.equal("22");
    expect(ColorUtils.getBlue("#112233")).to.equal("33");
    expect(ColorUtils.getAlpha("#112233")).to.be.null;
    expect(ColorUtils.getRed("#44112233")).to.equal("11");
    expect(ColorUtils.getGreen("#44112233")).to.equal("22");
    expect(ColorUtils.getBlue("#44112233")).to.equal("33");
    expect(ColorUtils.getAlpha("#44112233")).to.equal("44");

    expect(ColorUtils.getRed(-16711936)).to.equal(0);
    expect(ColorUtils.getGreen(-16711936)).to.equal(255);
    expect(ColorUtils.getBlue(-16711936)).to.equal(0);
    expect(ColorUtils.getAlpha(-16711936)).to.equal(255);

    expect(ColorUtils.getRed(0xff00ff00)).to.equal(0);
    expect(ColorUtils.getGreen(0xff00ff00)).to.equal(255);
    expect(ColorUtils.getBlue(0xff00ff00)).to.equal(0);
    expect(ColorUtils.getAlpha(0xff00ff00)).to.equal(255);

    expect(ColorUtils.getRed(65280)).to.equal(0);
    expect(ColorUtils.getGreen(65280)).to.equal(255);
    expect(ColorUtils.getBlue(65280)).to.equal(0);
    expect(ColorUtils.getAlpha(65280)).to.equal(0);

    expect(ColorUtils.getRed(0x00ff00)).to.equal(0);
    expect(ColorUtils.getGreen(0x00ff00)).to.equal(255);
    expect(ColorUtils.getBlue(0x00ff00)).to.equal(0);
    expect(ColorUtils.getAlpha(0x00ff00)).to.equal(0);

    expect(
      ColorUtils.toColor(
        ColorUtils.toRGB("00"),
        ColorUtils.toRGB("FF"),
        ColorUtils.toRGB("00"),
      ),
    ).to.equal(65280);
    expect(
      ColorUtils.toColorWithDefaultAlpha(
        ColorUtils.toRGB("00"),
        ColorUtils.toRGB("FF"),
        ColorUtils.toRGB("00"),
      ),
    ).to.equal(-16711936);
    expect(
      ColorUtils.toColorWithAlpha(
        ColorUtils.toRGB("00"),
        ColorUtils.toRGB("ff"),
        ColorUtils.toRGB("00"),
        ColorUtils.toRGB("fF"),
      ),
    ).to.equal(-16711936);

    expect(ColorUtils.toColor("A0", "B0", "C0")).to.equal("#A0B0C0");
    expect(ColorUtils.toColorWithDefaultAlpha("A0", "B0", "C0")).to.equal(
      "#FFA0B0C0",
    );
    expect(ColorUtils.toColorShorthand("A0", "B0", "C0")).to.equal("#A0B0C0");
    expect(ColorUtils.toColorShorthand("AA", "BB", "CC")).to.equal("#ABC");
    expect(ColorUtils.toColorShorthandWithDefaultAlpha("A0", "B0", "C0")).to
      .equal("#FFA0B0C0");
    expect(ColorUtils.toColorShorthandWithDefaultAlpha("AA", "BB", "CC")).to
      .equal("#FABC");
    expect(ColorUtils.toColorWithAlpha("A0", "B0", "C0", "D0")).to.equal(
      "#D0A0B0C0",
    );
    expect(ColorUtils.toColorShorthandWithAlpha("A0", "B0", "C0", "D0")).to
      .equal("#D0A0B0C0");
    expect(ColorUtils.toColorShorthandWithAlpha("AA", "BB", "CC", "D0")).to
      .equal("#D0AABBCC");
    expect(ColorUtils.toColorShorthandWithAlpha("AA", "BB", "CC", "DD")).to
      .equal("#DABC");

    expect(ColorUtils.toColor("a0", "b0", "c0")).to.equal("#a0b0c0");
    expect(ColorUtils.toColorWithDefaultAlpha("a0", "b0", "c0")).to.equal(
      "#ffa0b0c0",
    );
    expect(ColorUtils.toColorShorthand("a0", "b0", "c0")).to.equal("#a0b0c0");
    expect(ColorUtils.toColorShorthand("aa", "bb", "cc")).to.equal("#abc");
    expect(ColorUtils.toColorShorthandWithDefaultAlpha("a0", "b0", "c0")).to
      .equal("#ffa0b0c0");
    expect(ColorUtils.toColorShorthandWithDefaultAlpha("aa", "bb", "cc")).to
      .equal("#fabc");
    expect(ColorUtils.toColorWithAlpha("a0", "b0", "c0", "d0")).to.equal(
      "#d0a0b0c0",
    );
    expect(ColorUtils.toColorShorthandWithAlpha("a0", "b0", "c0", "d0")).to
      .equal("#d0a0b0c0");
    expect(ColorUtils.toColorShorthandWithAlpha("aa", "bb", "cc", "d0")).to
      .equal("#d0aabbcc");
    expect(ColorUtils.toColorShorthandWithAlpha("aa", "bb", "cc", "dd")).to
      .equal("#dabc");

    expect(ColorUtils.shorthandHex("10a0d1")).to.equal("10a0d1");
    expect(ColorUtils.shorthandHex("#10a0d1")).to.equal("#10a0d1");
    expect(ColorUtils.shorthandHex("0D0A0B0C")).to.equal("0D0A0B0C");
    expect(ColorUtils.shorthandHex("#0D0a0B0c")).to.equal("#0D0a0B0c");
    expect(ColorUtils.shorthandHex("11aadd")).to.equal("1ad");
    expect(ColorUtils.shorthandHex("#11aADd")).to.equal("#1aD");
    expect(ColorUtils.shorthandHex("DDAABBCC")).to.equal("DABC");
    expect(ColorUtils.shorthandHex("#dDAabBCc")).to.equal("#dAbC");

    expect(ColorUtils.expandShorthandHex("10a0d1")).to.equal("10a0d1");
    expect(ColorUtils.expandShorthandHex("#10a0d1")).to.equal("#10a0d1");
    expect(ColorUtils.expandShorthandHex("0D0A0B0C")).to.equal("0D0A0B0C");
    expect(ColorUtils.expandShorthandHex("#0D0a0B0c")).to.equal("#0D0a0B0c");
    expect(ColorUtils.expandShorthandHex("1ad")).to.equal("11aadd");
    expect(ColorUtils.expandShorthandHex("#1aD")).to.equal("#11aaDD");
    expect(ColorUtils.expandShorthandHex("DABC")).to.equal("DDAABBCC");
    expect(ColorUtils.expandShorthandHex("#dAbC")).to.equal("#ddAAbbCC");

    expect(ColorUtils.shorthandHexSingle("10")).to.equal("10");
    expect(ColorUtils.shorthandHexSingle("0A")).to.equal("0A");
    expect(ColorUtils.shorthandHexSingle("dd")).to.equal("d");
    expect(ColorUtils.shorthandHexSingle("cC")).to.equal("c");
    expect(ColorUtils.shorthandHexSingle("Aa")).to.equal("A");
    expect(ColorUtils.shorthandHexSingle("BB")).to.equal("B");

    expect(ColorUtils.expandShorthandHexSingle("10")).to.equal("10");
    expect(ColorUtils.expandShorthandHexSingle("0A")).to.equal("0A");
    expect(ColorUtils.expandShorthandHexSingle("d")).to.equal("dd");
    expect(ColorUtils.expandShorthandHexSingle("C")).to.equal("CC");

    let hsl = ColorUtils.toHSL(0, 0, 0);
    expect(hsl[0]).to.equal(0.0);
    expect(hsl[1]).to.equal(0);
    expect(hsl[2]).to.equal(0.0);

    let arithmeticRGB: number[] = ColorUtils.toArithmeticRGBFromHSL(
      0.0,
      0.0,
      0.0,
    );
    expect(arithmeticRGB[0]).to.equal(ColorUtils.toArithmeticRGB(0));
    expect(arithmeticRGB[1]).to.equal(ColorUtils.toArithmeticRGB(0));
    expect(arithmeticRGB[2]).to.equal(ColorUtils.toArithmeticRGB(0));

    hsl = ColorUtils.toHSL(255, 0, 0);
    expect(hsl[0]).to.equal(0.0);
    expect(hsl[1]).to.equal(1.0);
    expect(hsl[2]).to.equal(0.5);

    arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(0.0, 1.0, 0.5);
    expect(arithmeticRGB[0]).to.equal(ColorUtils.toArithmeticRGB(255));
    expect(arithmeticRGB[1]).to.equal(ColorUtils.toArithmeticRGB(0));
    expect(arithmeticRGB[2]).to.equal(ColorUtils.toArithmeticRGB(0));

    hsl = ColorUtils.toHSL(0, 255, 0);
    expect(hsl[0]).to.equal(120.0);
    expect(hsl[1]).to.equal(1.0);
    expect(hsl[2]).to.equal(0.5);

    arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(120.0, 1.0, 0.5);
    expect(arithmeticRGB[0]).to.equal(ColorUtils.toArithmeticRGB(0));
    expect(arithmeticRGB[1]).to.equal(ColorUtils.toArithmeticRGB(255));
    expect(arithmeticRGB[2]).to.equal(ColorUtils.toArithmeticRGB(0));

    hsl = ColorUtils.toHSL(0, 0, 255);
    expect(hsl[0]).to.equal(240.0);
    expect(hsl[1]).to.equal(1.0);
    expect(hsl[2]).to.equal(0.5);

    arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(240.0, 1.0, 0.5);
    expect(arithmeticRGB[0]).to.equal(ColorUtils.toArithmeticRGB(0));
    expect(arithmeticRGB[1]).to.equal(ColorUtils.toArithmeticRGB(0));
    expect(arithmeticRGB[2]).to.equal(ColorUtils.toArithmeticRGB(255));

    hsl = ColorUtils.toHSL(255, 255, 255);
    expect(hsl[0]).to.equal(0.0);
    expect(hsl[1]).to.equal(0.0);
    expect(hsl[2]).to.equal(1.0);

    arithmeticRGB = ColorUtils.toArithmeticRGBFromHSL(0.0, 0.0, 1.0);
    expect(arithmeticRGB[0]).to.equal(ColorUtils.toArithmeticRGB(255));
    expect(arithmeticRGB[1]).to.equal(ColorUtils.toArithmeticRGB(255));
    expect(arithmeticRGB[2]).to.equal(ColorUtils.toArithmeticRGB(255));

    hsl = ColorUtils.toHSL(200, 165, 10);
    expect(hsl[0]).to.be.approximately(48.94737, 0.00001);
    expect(hsl[1]).to.be.approximately(0.9047619, 0.00001);
    expect(hsl[2]).to.be.approximately(0.4117647, 0.00001);

    let rgb = ColorUtils.toRGBFromHSL(48.94737, 0.9047619, 0.4117647);
    expect(rgb[0]).to.equal(200);
    expect(rgb[1]).to.equal(165);
    expect(rgb[2]).to.equal(10);

    hsl = ColorUtils.toHSL(52, 113, 82);
    expect(hsl[0]).to.be.approximately(149.50821, 0.001);
    expect(hsl[1]).to.be.approximately(0.36969694, 0.00001);
    expect(hsl[2]).to.be.approximately(0.32352942, 0.00001);

    rgb = ColorUtils.toRGBFromHSL(149.50821, 0.36969694, 0.32352942);
    expect(rgb[0]).to.equal(52);
    expect(rgb[1]).to.equal(113);
    expect(rgb[2]).to.equal(82);
  });
});

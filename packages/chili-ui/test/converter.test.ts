// Part of the Chili3d Project, under the AGPL-3.0 License.
// See LICENSE file in the project root for full license information.

import { IConverter, XYZ } from "chili-core";
import { NumberConverter, StringConverter, XYZConverter } from "../src/converters";

describe("converter test", () => {
    test("test type", () => {
        let converters = [new XYZConverter(), new NumberConverter()];
        expect(converters.every((x) => (x as IConverter).convert !== undefined)).toBeTruthy();
    });

    test("test XYZConverter", () => {
        let converter = new XYZConverter();
        let xyz = XYZ.unitX;
        let c = converter.convert(xyz);
        expect(c.value).toStrictEqual("1,0,0");
        expect(converter.convertBack(c.value).value.x).toBe(1);
        expect(converter.convertBack("1").isOk).toBe(false);
        expect(converter.convertBack("1, 1, 1, 1").isOk).toBe(false);
        expect(converter.convertBack("1, 1, 1").value).toStrictEqual(new XYZ(1, 1, 1));
    });

    test("test NumberConverter", () => {
        let converter = new NumberConverter();
        expect(converter.convert(Number.NaN).isOk).toBe(false);
        expect(converter.convert(-20).value).toBe("-20");
        expect(converter.convert(20).value).toBe("20");
        expect(converter.convert(1e3).value).toBe("1000");
        expect(converter.convertBack("NaN").isOk).toBeFalsy();
        expect(converter.convertBack("1a").isOk).toBeFalsy();
        expect(converter.convertBack("1E-3").value).toBe(0.001);
        expect(converter.convertBack("-3").value).toBe(-3);
    });

    test("test StringConverter", () => {
        let converter = new StringConverter();
        expect(converter.convert("").value).toBe("");
        expect(converter.convertBack("").value).toBe("");
    });
});

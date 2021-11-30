import { numberCommaFormat } from "../util";

describe("util", () => {
  describe("number comma formatting", () => {
    it("250", () => {
      expect(numberCommaFormat("250")).toBe("250");
    });

    it("2500", () => {
      expect(numberCommaFormat("2500")).toBe("2,500");
    });

    it("25000000", () => {
      expect(numberCommaFormat("25000000")).toBe("25,000,000");
    });
  });
});

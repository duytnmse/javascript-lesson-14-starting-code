import { formatCurrency } from "../scripts/utils/money.js";

describe("Test format currency", () => {
  it("Convert cents to dollars:", () => {
    expect(formatCurrency(2002)).toEqual("20.02");
  });
  it("Convert 0 cent", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  it("Round before formating:", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
});

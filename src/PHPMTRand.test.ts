import { describe, expect, it } from "vitest";
import { PHPMTRand } from "./PHPMTRand";

describe("PHPMTRand", () => {
  // it("Correctly guesses rolls", () => {
  //     const rng = new PHPMTRand(69420);
  //     expect(rng.roll(10, 20)).toBe(15);
  //     expect(rng.roll(-5, 100)).toBe(4);
  //     expect(rng.roll(0, 10000)).toBe(3567);
  // });

  it("Correctly guesses rolls where first roll is bounded with 0", () => {
    const rng = new PHPMTRand(69420);
    expect(rng.roll(2, 1000)).toBe(475);
    expect(rng.roll(10, 20)).toBe(11);
    expect(rng.roll(-5, 100)).toBe(32);
  });

  it("Correctly handles a negative seed", () => {
    const rng = new PHPMTRand(-8008135);
    expect(rng.roll(4, 20)).toBe(8);
    expect(rng.roll(247, 365)).toBe(285);
  });
});

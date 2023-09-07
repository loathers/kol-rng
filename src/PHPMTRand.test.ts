import { describe, expect, it } from "vitest";
import { PHPMTRand } from "./PHPMTRand";

describe("PHPMTRand", () => {
  it.each([
    [
      69420,
      [
        [10, 20, 15],
        [-5, 100, 4],
        [0, 10000, 3567],
      ],
    ],
    [
      31337,
      [
        [2, 1000, 276],
        [10, 20, 12],
        [-5, 100, -1],
      ],
    ],
  ])("Correctly guesses rolls", (seed, rolls) => {
    const rng = new PHPMTRand(seed);
    for (const [min, max, result] of rolls) {
      expect(rng.roll(min, max)).toBe(result);
    }
  });

  it("Correctly handles a negative seed", () => {
    const rng = new PHPMTRand(-8008135);
    expect(rng.roll(4, 20)).toBe(8);
    expect(rng.roll(247, 365)).toBe(285);
  });
});

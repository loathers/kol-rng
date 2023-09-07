import { describe, expect, it } from "vitest";
import { PHPRand } from "./PHPRand";

describe("PHPRand", () => {
  it("Correctly guesses rolls", () => {
    const rng = new PHPRand(69420);
    expect(rng.roll(0, 5)).toEqual(1);
    expect(rng.roll(10, 20)).toEqual(12);
    expect(rng.roll(-5, 100)).toEqual(79);
  });

  it.each([
    [6969, ["a", "c", "d"], ["b", "c", "e"]],
    [2147483647, ["a", "c", "d"], ["b", "d", "e"]],
    [-8008135, ["a", "c", "d"], ["a", "b", "d"]],
  ])(
    "Correctly picks items from an array with seed %i",
    (seed, firstExpected, secondExpected) => {
      const rng = new PHPRand(seed);
      expect(rng.pick(["a", "b", "c", "d", "e"], 3)).toEqual(firstExpected);
      expect(rng.pick(["a", "b", "c", "d", "e"], 3)).toEqual(secondExpected);
    },
  );

  it("Correctly shuffles an array", () => {
    const rng = new PHPRand(420);
    const array = ["a", "b", "c", "d", "e"];
    rng.shuffle(array);
    expect(array).toEqual(["b", "c", "e", "d", "a"]);
  });
});

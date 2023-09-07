import { PHPMTRand } from "./PHPMTRand";
import { PHPRand } from "./PHPRand";

export class RNG {
  readonly rand: PHPRand;
  readonly mtRand: PHPMTRand;

  constructor(seed: number) {
    this.rand = new PHPRand(seed);
    this.mtRand = new PHPMTRand(seed);
  }

  roll(max: number): number;
  roll(min: number, max: number): number;
  roll(a: number, b?: number) {
    const [min, max] = b ? [a, b] : [1, a];
    return this.mtRand.roll(min, max);
  }

  pickOne<T>(array: T[]) {
    return array[this.roll(array.length) - 1];
  }

  pick<T>(array: T[], quantity: number) {
    if (quantity == 1) return this.pickOne(array);

    return this.rand.pick(array, quantity);
  }

  shuffle<T>(array: T[]) {
    return this.rand.shuffle(array);
  }
}

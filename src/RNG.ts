import { PHPMTRand } from "./PHPMTRand";
import { PHPRand } from "./PHPRand";

export class RNG {
  readonly rand: PHPRand;
  readonly mtRand: PHPMTRand;

  constructor(seed: number) {
    this.rand = new PHPRand(seed);
    this.mtRand = new PHPMTRand(seed);
  }

  /**
   * Pick a number between 1 and max inclusive (replicating PHP 5.3's `mt_rand`)
   * @param max Maximum value
   * @returns Rolled number
   */
  roll(max: number): number;
  /**
   * Pick a number between min and max inclusive (replicating PHP 5.3's `mt_rand`)
   * @param max Minimum value
   * @param max Maximum value
   * @returns Rolled number
   */
  roll(min: number, max: number): number;
  roll(a: number, b?: number) {
    const [min, max] = b ? [a, b] : [1, a];
    return this.mtRand.roll(min, max);
  }

  /**
   * Picks a single item from an array (replicating KoL's `pickone` function, which uses PHP 5.3's `mt_rand`)
   *
   * @param array Array to pick from
   * @returns Picked item
   */
  pickOne<T>(array: T[]) {
    return array[this.roll(array.length) - 1];
  }

  /**
   * Picks n items from an array (replicating PHP 5.3 `array_rand`). If quantity is 1, shortcuts to `pickOne`.
   *
   * @param array Array to pick from
   * @param quantity Quantity to pick
   * @returns Array of picked items
   */
  pick<T>(array: T[], quantity: number) {
    if (quantity == 1) return this.pickOne(array);

    return this.rand.pick(array, quantity);
  }

  /**
   * Shuffle an array in place (replicating PHP 5.3 `shuffle`)
   * @param array Array to shuffle
   * @returns Shuffled array
   */
  shuffle<T>(array: T[]) {
    return this.rand.shuffle(array);
  }
}

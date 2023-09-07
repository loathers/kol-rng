import { INTEGER_MAX, bound } from "./util";

export class PHPRand {
  private state: number[] = [];

  constructor(seed: number) {
    this.state.push(seed);

    for (let i = 1; i < 31; i++) {
      let value = (16_807 * this.state[i - 1]) % INTEGER_MAX;
      if (value < 0) {
        value += INTEGER_MAX;
      }
      this.state.push(value);
    }

    for (let i = 31; i < 34; i++) {
      this.state.push(this.state[i - 31]);
    }

    for (let i = 34; i < 344; i++) {
      this.next();
    }
  }

  private next() {
    const i = this.state.length;
    const value = (this.state[i - 31] + this.state[i - 3]) | 0;
    this.state.push(value);
    return value >>> 1;
  }

  /**
   * @returns Random integer between 0 and integer max
   */
  private random() {
    return this.next() / (INTEGER_MAX + 1);
  }

  /**
   * @param min Minimum value
   * @param max Maximum value
   * @returns Rolled value
   */
  roll(min: number, max: number) {
    return bound(min, max, this.random());
  }

  /**
   * Picks a specified quantity of items from an array
   *
   * @param array Array from which to pick
   * @param quantity Number of items to pick
   * @returns Array of picked items
   */
  pick<T>(array: T[], quantity: number) {
    const required = Math.min(quantity, array.length);

    const chosen: T[] = [];

    for (const [i, item] of array.entries()) {
      const chance = (required - chosen.length) / (array.length - i);
      if (this.random() < chance) {
        chosen.push(item);
        if (chosen.length >= required) break;
      }
    }

    return chosen;
  }

  /**
   * Shuffles array in place
   *
   * @param array Array to shuffle
   * @returns Shuffled array
   */
  shuffle<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const r = this.roll(0, i);
      if (r === i) continue;
      const temp = array[i];
      array[i] = array[r];
      array[r] = temp;
    }

    return array;
  }
}

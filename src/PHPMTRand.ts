import MersenneTwister from "mersenne-twister";
import { INTEGER_MAX, bound } from "./util";

/**
 * Monkeypatched random_int function for MersenneTwister to replica PHP 5.3.10's bad implementation.
 *
 * The change is that during the `twist` function that is repeated 3 times here, instead of raising
 * the new state value to the power of `mag01[y & 0x1]` at the end, we raise it to `((0xFFFFFFFF * (<CURRENT ITEM IN STATE> & 0x1)) & this.MATRIX_A)`.
 *
 * Because this twist function is not implemented seperately, it is necessary to monkeypatch the entire function.
 */
MersenneTwister.prototype.random_int = function () {
  var y;
  var mag01 = new Array(0x0, this.MATRIX_A);
  /* mag01[x] = x * MATRIX_A  for x=0,1 */

  if (this.mti >= this.N) {
    /* generate N words at one time */
    var kk;

    if (this.mti == this.N + 1)
      /* if init_seed() has not been called, */
      this.init_seed(5489); /* a default initial seed is used */

    for (kk = 0; kk < this.N - this.M; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] =
        this.mt[kk + this.M] ^
        (y >>> 1) ^
        ((0xffffffff * (this.mt[kk] & 0x1)) & this.MATRIX_A);
    }
    for (; kk < this.N - 1; kk++) {
      y = (this.mt[kk] & this.UPPER_MASK) | (this.mt[kk + 1] & this.LOWER_MASK);
      this.mt[kk] =
        this.mt[kk + (this.M - this.N)] ^
        (y >>> 1) ^
        ((0xffffffff * (this.mt[kk] & 0x1)) & this.MATRIX_A);
    }
    y =
      (this.mt[this.N - 1] & this.UPPER_MASK) | (this.mt[0] & this.LOWER_MASK);
    this.mt[this.N - 1] =
      this.mt[this.M - 1] ^
      (y >>> 1) ^
      ((0xffffffff * (this.mt[this.N - 1] & 0x1)) & this.MATRIX_A);

    this.mti = 0;
  }

  y = this.mt[this.mti++];

  /* Tempering */
  y ^= y >>> 11;
  y ^= (y << 7) & 0x9d2c5680;
  y ^= (y << 15) & 0xefc60000;
  y ^= y >>> 18;

  return y >>> 0;
};

export class PHPMTRand {
  mt: MersenneTwister;

  constructor(seed: number) {
    this.mt = new MersenneTwister(seed);
  }

  /**
   * @returns Random integer between 0 and integer max
   */
  private random() {
    return this.mt.random();
  }

  /**
   * @param min Minimum value
   * @param max Maximum value
   * @returns Rolled value
   */
  roll(min: number, max: number) {
    return bound(min, max, this.random());
  }
}

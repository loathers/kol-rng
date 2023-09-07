# kol-rng

Tools to simulate the PHP 5.3.10 RNG functions and state of the Kingdom of Loathing.

The default export (the class `RNG`) should be all you need - it is a utility combination of `PHPRand` and `PHPMTRand` that represents the "classic" way Asymmetric make use of those two random number generation systems in the game. However, the separate generators are available both as separate exports and as properties on any instance of `RNG`.

Note that if you instantiate more than one class, even with the same seed, they will not share a state and thus do not expect concurrent use to yield the same results you would see in-game.

## Example

```ts
import RNG from "kol-rng";

const fruits = ["lime", "lemon", "orange"];
const adjectives = ["juicy", "delicious", "nutritious"];

const seed = 69;
const rng = new RNG(seed);

const fruit = rng.pickOne(fruits);
const description = rng.pick(adjectives, 2);

rng.shuffle(description);

console.log("A", description.join(" and "), fruit); // A delicious and nutritious orange
```

## Notes

PHP 5.3.10's `mt_rand` does differ from the classic implementation of the Mersenne Twister... but not in the way it is used here. So we just import an external implementation of that generator and slightly adjust it to our needs.

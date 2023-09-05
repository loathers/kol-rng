# kol-rng

Tools to simulate the PHP 5.3.10 RNG functions and state of the Kingdom of Loathing.

The default export (the class `RNG`) should be all you need - it is a utility combination of `PHPRand` and `PHPMTRand` that represents the "classic" way Asymmetric make use of those two random number generation systems in the game. However, the separate generators are available both as separate exports and as properties on any instance of `RNG`.

Note that if you instantiate more than one class, even with the same seed, they will not share a state and thus do not expect concurrent use to yield the same results you would see in-game.

## Notes

PHP 5.3.10's `mt_rand` does differ from the classic implementation of the Mersenne Twister... but not in the way it is used here. So we just import an external implementation of that generator and slightly adjust it to our needs.

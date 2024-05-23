// Uses a seed to restructure the order
function seededRandom(seed: number) {
  // Parameters for a Linear Congruential Generator
  const a = 1664525;
  const c = 1013904223;
  const m = 4294967296; // 2^32
  seed = (a * seed + c) % m;
  return () => {
    seed = (a * seed + c) % m;
    return seed / m;
  };
}

// Randomizes the order of an array and return and the seed used to randomize the order
export function shuffleArray<T>(
  array: T[],
  seed?: number
): { newArray: T[]; seed: number } {
  // Generate a seed if not provided
  if (!seed) {
    seed = Math.floor(Math.random() * 1000000000);
  }

  // Create a copy of the array to maintain immutability
  const newArray = array.slice();
  const random = seededRandom(seed);
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return { newArray, seed };
}

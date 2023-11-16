export {};
// number => number
function increment(x: number): number {
  return x + 1;
}
// number => number
const increment2 = (x: number): number => x + 1;

// number => number -> number
const sum = (x: number, y: number): number => x + y;

// number => number -> number
const makeSum = (x: number) => (y: number) => x + y;

sum(1, 2);
makeSum(1)(2);

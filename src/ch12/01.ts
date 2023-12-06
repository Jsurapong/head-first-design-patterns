export {};
interface Quackable {
  quack(): void;
}

class MallardDuck implements Quackable {
  quack() {
    console.log("Quack");
  }
}

class RedheadDuck implements Quackable {
  quack() {
    console.log("Quack");
  }
}

class Goose {
  honk() {
    console.log("Honk");
  }
}

class GooseAdapter implements Quackable {
  constructor(public goose: Goose) {}

  quack() {
    this.goose.honk();
  }
}

class Counter {
  constructor(public count: number = 0) {}

  incr() {
    this.count = this.count + 1;
  }

  get() {
    return this.count;
  }
}

class QuackCounter implements Quackable {
  constructor(public duck: Quackable, public counter: Counter) {}

  quack() {
    this.duck.quack();
    this.counter.incr();
  }
}
interface MyIterator {
  hasNext(): boolean;
  next(): Quackable;
}
class QuackableIterator implements MyIterator {
  position = 0;
  constructor(public quakers: Quackable[]) {}
  next(): Quackable {
    let quakers = this.quakers[this.position];
    this.position = this.position + 1;

    return quakers;
  }
  hasNext(): boolean {
    return this.position < this.quakers.length;
  }
}
class Flock implements Quackable {
  quakers: Quackable[];
  constructor() {
    this.quakers = [];
  }
  add(quaker: Quackable) {
    this.quakers.push(quaker);
  }
  quack() {
    for (let quaker of this.quakers) {
      quaker.quack();
    }
  }
}

function simulate(duck: Quackable) {
  duck.quack();
}

function main() {
  let counter = new Counter();
  let mallardDuck: Quackable = new QuackCounter(new MallardDuck(), counter);
  let redheadDuck: Quackable = new QuackCounter(new RedheadDuck(), counter);
  let gooseDuck: Quackable = new QuackCounter(
    new GooseAdapter(new Goose()),
    counter
  );

  simulate(mallardDuck);
  simulate(redheadDuck);
  simulate(gooseDuck);

  let flock = new Flock();
  flock.add(new QuackCounter(new MallardDuck(), counter));
  flock.add(new QuackCounter(new RedheadDuck(), counter));
  flock.quack();

  console.log(`Number of quacks: ${counter.get()}`);
}

main();

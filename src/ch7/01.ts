export {};

interface Duck {
  quack(): void;
  fly(): void;
}

interface Turkey {
  gobble(): void;
  fly(): void;
}

class MallardDuck implements Duck {
  quack(): void {
    console.log("quack");
  }
  fly(): void {
    console.log("fly");
  }
}

class WildTurkey implements Turkey {
  gobble(): void {
    console.log("gobble");
  }
  fly(): void {
    console.log("fly");
  }
}

class TurkeyAdapter implements Duck {
  constructor(public turkey: Turkey) {}
  quack(): void {
    this.turkey.gobble();
  }
  fly(): void {
    for (let index = 0; index < 5; index++) {
      this.turkey.fly();
    }
  }
}

function testDuck(duck: Duck) {
  duck.quack();
  duck.fly();
}

function main() {
  let duck = new MallardDuck();
  let turkey = new WildTurkey();

  let turkeyAdapter = new TurkeyAdapter(turkey);

  testDuck(duck);
  //   testDuck(turkey);
  testDuck(turkeyAdapter);
}
main();

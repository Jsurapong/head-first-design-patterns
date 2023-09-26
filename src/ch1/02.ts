interface FlyAble {
  fly: () => void;
}
interface QuackAble {
  quack: () => void;
}

class Duck {
  swim() {
    console.log("swim");
  }
  display() {
    console.log("duck");
  }
}

class MallardDuck extends Duck implements FlyAble, QuackAble {
  display() {
    console.log("MallardDuck");
  }
  quack() {
    console.log("quack");
  }
  fly() {
    console.log("fly");
  }
}

class RedheadDuck extends Duck implements FlyAble, QuackAble {
  display(): void {
    console.log("RedheadDuck");
  }
  quack() {
    console.log("quack");
  }
  fly() {
    console.log("fly");
  }
}

class RubberDuck extends Duck {
  display(): void {
    console.log("RubberDuck");
  }
  quack() {
    console.log("quack");
  }
}

class DecoyDuck extends Duck {
  display(): void {
    console.log("DecoyDuck");
  }
}

function main() {
  let mallardDuck = new MallardDuck();
  mallardDuck.display();
  mallardDuck.quack();
  mallardDuck.swim();
  mallardDuck.fly();

  let redheadDuck = new RedheadDuck();
  redheadDuck.display();
  redheadDuck.quack();
  redheadDuck.swim();
  redheadDuck.fly();

  let rubberDuck = new RubberDuck();
  rubberDuck.display();
  rubberDuck.quack();
  rubberDuck.swim();

  let decoyDuck = new DecoyDuck();
  decoyDuck.display();
  decoyDuck.swim();
}

main();
export {};

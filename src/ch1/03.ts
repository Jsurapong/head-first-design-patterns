interface FlyBehavior {
  fly: () => void;
}

class FlyWithWings implements FlyBehavior {
  fly() {
    console.log("fly");
  }
}

class FlyNoWay implements FlyBehavior {
  fly() {
    console.log("can't fly");
  }
}
class FlyRocketPowered implements FlyBehavior {
  fly() {
    console.log("fly rocket powered");
  }
}

interface QuackBehavior {
  quack: () => void;
}

class Quack implements QuackBehavior {
  quack() {
    console.log("quack");
  }
}
class Squeak implements QuackBehavior {
  quack() {
    console.log("squeak");
  }
}
class MuteQuack implements QuackBehavior {
  quack() {}
}

abstract class Duck {
  flyBehavior: FlyBehavior = new FlyWithWings();
  quackBehavior: QuackBehavior = new Quack();

  abstract display(): void;

  swim() {
    console.log("swim");
  }
  performFly() {
    this.flyBehavior.fly();
  }
  performQuack() {
    this.quackBehavior.quack();
  }
  setFlyBehavior(fb: FlyBehavior) {
    this.flyBehavior = fb;
  }
  setQuackBehavior(qb: QuackBehavior) {
    this.quackBehavior = qb;
  }
}

class MallardDuck extends Duck {
  flyBehavior: FlyBehavior = new FlyWithWings();
  quackBehavior: QuackBehavior = new Quack();

  display(): void {
    console.log("MallardDuck");
  }
}

class RubberDuck extends Duck {
  flyBehavior: FlyBehavior = new FlyNoWay();
  quackBehavior: QuackBehavior = new Quack();

  display(): void {
    console.log("RubberDuck");
  }
}

class ModelDuck extends Duck {
  flyBehavior: FlyBehavior = new FlyNoWay();
  quackBehavior: QuackBehavior = new Quack();
  display(): void {
    console.log("ModelDuck");
  }
}

function main() {
  let modelDuck = new ModelDuck();
  modelDuck.performFly();
  modelDuck.setFlyBehavior(new FlyRocketPowered());
  modelDuck.performFly();
}

main();

export {};

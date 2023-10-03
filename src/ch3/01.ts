export {};

abstract class Beverage {
  description = "Unknown Beverage";
  getDescription() {
    return this.description;
  }
  abstract cost(): number;
}

class Espresso extends Beverage {
  description = "Espresso";
  cost() {
    return 1.99;
  }
}

class HouseBlend extends Beverage {
  description = "House Blend Coffee";
  cost() {
    return 0.89;
  }
}

class DarkRoast extends Beverage {
  description = "Dark Roast Coffee";
  cost() {
    return 0.99;
  }
}

class Decaf extends Beverage {
  description = "Decaf Coffee";
  cost() {
    return 1.05;
  }
}

class NoBeverage extends Beverage {
  description = "No Beverage";
  cost() {
    return 0;
  }
}
abstract class ConditionalBeverage extends Beverage {
  beverage: Beverage = new NoBeverage();
  abstract getDescription(): string;
}

class Mocha extends ConditionalBeverage {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  cost() {
    return this.beverage.cost() + 0.2;
  }
  getDescription() {
    return this.beverage.getDescription() + ", Mocha";
  }
}

class Soy extends ConditionalBeverage {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  cost() {
    return this.beverage.cost() + 0.15;
  }
  getDescription() {
    return this.beverage.getDescription() + ", Soy";
  }
}

class Whip extends ConditionalBeverage {
  constructor(beverage: Beverage) {
    super();
    this.beverage = beverage;
  }
  cost() {
    return this.beverage.cost() + 0.1;
  }
  getDescription() {
    return this.beverage.getDescription() + ", Whip";
  }
}

function main() {
  let beverage = new Espresso();
  console.log(beverage.getDescription() + " $" + beverage.cost());

  let beverage2 = new DarkRoast();
  beverage2 = new Mocha(beverage2);
  beverage2 = new Mocha(beverage2);
  beverage2 = new Whip(beverage2);
  console.log(beverage2.getDescription() + " $" + beverage2.cost());

  let beverage3 = new HouseBlend();
  beverage3 = new Soy(beverage3);
  beverage3 = new Mocha(beverage3);
  beverage3 = new Whip(beverage3);
  console.log(beverage3.getDescription() + " $" + beverage3.cost());
}

main();

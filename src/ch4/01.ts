export {};

abstract class Pizza {
  abstract getName(): string;
  prepare(): void {
    console.log("prepare " + this.getName());
  }
  bake(): void {
    console.log("bake " + this.getName());
  }
  cut(): void {
    console.log("cut " + this.getName());
  }
  box(): void {
    console.log("box " + this.getName());
  }
}

class CheesePizza extends Pizza {
  getName(): string {
    return "CheesePizza";
  }
}
class PepperoniPizza extends Pizza {
  getName(): string {
    return "PepperoniPizza";
  }
}

class GreekPizza extends Pizza {
  getName(): string {
    return "GreekPizza";
  }
}

type PizzaType = "cheese" | "pepperoni" | "greek";

class SimplePizzaFactory {
  createPizza(pizzaType: PizzaType): Pizza {
    if (pizzaType === "cheese") {
      return new CheesePizza();
    } else if (pizzaType === "pepperoni") {
      return new PepperoniPizza();
    } else if (pizzaType === "greek") {
      return new GreekPizza();
    } else {
      return new CheesePizza();
    }
  }
}

class PizzaStore {
  constructor(public factory: SimplePizzaFactory) {}
  orderPizza(pizzaType: PizzaType): Pizza {
    let pizza = this.factory.createPizza(pizzaType);

    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }
}

function main() {
  let factory = new SimplePizzaFactory();
  let store = new PizzaStore(factory);
  store.orderPizza("cheese");
  store.orderPizza("greek");
  store.orderPizza("pepperoni");
}

main();

// abstract factory

export {};
type PizzaType = "cheese" | "pepperoni" | "greek";

interface Dough {}
class NoDough implements Dough {}
class ThinCrustDough implements Dough {}

interface Sauce {}
class NoSauce implements Sauce {}
class MarinaraSauce implements Sauce {}
class PlumTomatoSauce implements Sauce {}

interface Cheese {}
class NoCheese implements Cheese {}
class ReggianoCheese implements Cheese {}
class MozzarellaCheese implements Cheese {}

interface Veggies {}

class Garlic implements Veggies {}
class Onion implements Veggies {}
class Mushroom implements Veggies {}
class RedPepper implements Veggies {}
class BlackOlives implements Veggies {}
class Spinach implements Veggies {}
class EggPlant implements Veggies {}

interface Pepperoni {}
class NoPepperoni implements Pepperoni {}
class SlicedPepperoni implements Pepperoni {}

interface Clams {}
class NoClams implements Clams {}
class FreshClams implements Clams {}
class FrozenClams implements Clams {}

interface PizzaIngredientFactory {
  createDough(): Dough;
  createSauce(): Sauce;
  createCheese(): Cheese;
  createVeggies(): Veggies[];
  createPepperoni(): Pepperoni;
  createClam(): Clams;
}

class NYPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): Dough {
    return new ThinCrustDough();
  }
  createSauce(): Sauce {
    return new MarinaraSauce();
  }
  createCheese(): Cheese {
    return new ReggianoCheese();
  }
  createVeggies(): Veggies[] {
    return [new Garlic(), new Onion(), new Mushroom(), new RedPepper()];
  }
  createPepperoni(): Pepperoni {
    return new SlicedPepperoni();
  }
  createClam(): Clams {
    return new FreshClams();
  }
}

class ChicagoPizzaIngredientFactory implements PizzaIngredientFactory {
  createDough(): Dough {
    return new ThinCrustDough();
  }
  createSauce(): Sauce {
    return new PlumTomatoSauce();
  }
  createCheese(): Cheese {
    return new MozzarellaCheese();
  }
  createVeggies(): Veggies[] {
    return [new BlackOlives(), new Spinach(), new EggPlant()];
  }
  createPepperoni(): Pepperoni {
    return new SlicedPepperoni();
  }
  createClam(): Clams {
    return new FrozenClams();
  }
}

abstract class Pizza {
  name: string = "";
  dough: Dough = new NoDough();
  sauce: Sauce = new NoSauce();
  veggies: Veggies[] = [];
  cheese: Cheese = new NoCheese();
  pepperoni: Pepperoni = new NoPepperoni();
  clam: Clams = new NoClams();

  abstract prepare(): void;
  bake(): void {
    console.log("Bake for 25 minutes at 350");
  }
  cut(): void {
    console.log("Cutting the pizza into diagonal slices");
  }
  box(): void {
    console.log("Place pizza in official PizzaStore box");
  }
  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}

class CheesePizza extends Pizza {
  constructor(public ingredientFactory: PizzaIngredientFactory) {
    super();
  }
  prepare() {
    console.log("Prepare " + this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
  }
}

class ClamPizza extends Pizza {
  constructor(public ingredientFactory: PizzaIngredientFactory) {
    super();
  }
  prepare() {
    console.log("Prepare " + this.getName());
    this.dough = this.ingredientFactory.createDough();
    this.sauce = this.ingredientFactory.createSauce();
    this.cheese = this.ingredientFactory.createCheese();
    this.clam = this.ingredientFactory.createClam();
  }
}

abstract class PizzaStore {
  orderPizza(pizzaType: PizzaType): Pizza {
    let pizza = this.createPizza(pizzaType);
    pizza.prepare();
    pizza.bake();
    pizza.cut();
    pizza.box();
    return pizza;
  }

  abstract createPizza(pizzaType: PizzaType): Pizza;
}

class NYPizzaStore extends PizzaStore {
  createPizza(pizzaType: PizzaType): Pizza {
    let ingredientFactory = new NYPizzaIngredientFactory();
    let pizza;

    if (pizzaType === "cheese") {
      pizza = new CheesePizza(ingredientFactory);
      pizza.setName("NY Style Sauce and Cheese Pizza");
    } else {
      pizza = new ClamPizza(ingredientFactory);
      pizza.setName("NY Style Clam Pizza");
    }

    return pizza;
  }
}

class ChicagoPizzaStore extends PizzaStore {
  createPizza(pizzaType: PizzaType): Pizza {
    let ingredientFactory = new ChicagoPizzaIngredientFactory();
    let pizza;

    if (pizzaType === "cheese") {
      pizza = new CheesePizza(ingredientFactory);
      pizza.setName("Chicago Style Sauce and Cheese Pizza");
    } else {
      pizza = new ClamPizza(ingredientFactory);
      pizza.setName("Chicago Style Clam Pizza");
    }

    return pizza;
  }
}

function main() {
  let nyStore = new NYPizzaStore();
  let chicagoStore = new ChicagoPizzaStore();

  let pizza = nyStore.orderPizza("cheese");
  console.log("Ethan ordered a " + pizza.getName() + " pizza");

  let pizza2 = chicagoStore.orderPizza("cheese");
  console.log("Joel ordered a " + pizza2.getName() + " pizza");
}

main();

// example with abstract factory

interface Warranty {}

class NoWarranty implements Warranty {}
class OneYearWarranty implements Warranty {}
class ThreeYearWarranty implements Warranty {}

interface ReturnPolicy {}
class NoReturn implements ReturnPolicy {}
class SevenDayRefund implements ReturnPolicy {}
class ThirtyDayRefund implements ReturnPolicy {}

interface StoreIngredientFactory {
  createWarranty(): Warranty;
  createReturnPolicy(): ReturnPolicy;
}

class BananaIngredientFactory implements StoreIngredientFactory {
  createWarranty(): Warranty {
    return new OneYearWarranty();
  }
  createReturnPolicy(): ReturnPolicy {
    return new SevenDayRefund();
  }
}
class AppleIngredientFactory implements StoreIngredientFactory {
  createWarranty(): Warranty {
    return new ThreeYearWarranty();
  }
  createReturnPolicy(): ReturnPolicy {
    return new ThirtyDayRefund();
  }
}

class Computer {
  warranty: Warranty = new NoWarranty();
  returnPolicy: ReturnPolicy = new NoReturn();
  constructor(public ingredientFactory: StoreIngredientFactory) {}

  prepare() {
    this.warranty = this.ingredientFactory.createWarranty();
    this.returnPolicy = this.ingredientFactory.createReturnPolicy();
  }
}

class BananaComputerStore {
  orderComputer(): Computer {
    let computer = new Computer(new BananaIngredientFactory());
    computer.prepare();
    return computer;
  }
}

class AppleComputerStore {
  orderComputer(): Computer {
    let computer = new Computer(new AppleIngredientFactory());
    computer.prepare();
    return computer;
  }
}

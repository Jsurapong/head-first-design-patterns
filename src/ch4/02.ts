// factory method

export {};

class Pizza {
  name: string = "";
  dough: string = "";
  sauce: string = "";
  toppings: string[] = [];

  getName(): string {
    return this.name;
  }
  prepare(): void {
    console.log("prepare " + this.getName());
    console.log("Tossing dough ");
    console.log("Adding sauce ");
    console.log("Adding toppings ");
    for (let topping of this.toppings) {
      console.log("  " + topping);
    }
  }
  bake(): void {
    console.log("Bake for 25 minutes at 350");
  }
  cut(): void {
    console.log("Cutting the pizza into diagonal slices");
  }
  box(): void {
    console.log("Place pizza in official PizzaStore box");
  }
}

class NYStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = "NY Style Sauce and Cheese Pizza";
    this.dough = "Thin Crust Dough";
    this.sauce = "Marinara Sauce";

    this.toppings.push("Grated Reggiano Cheese");
  }
}

class ChicagoStyleCheesePizza extends Pizza {
  constructor() {
    super();
    this.name = "Chicago Style Deep Dish Cheese Pizza";
    this.dough = "Extra Thick Crust Dough";
    this.sauce = "PlumTomato Sauce";
    this.toppings.push("Shredded Mozzarella Cheese");
  }
  cut(): void {
    console.log("Cutting the pizza into square slices");
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
    if (pizzaType === "cheese") {
      return new NYStyleCheesePizza();
    } else {
      return new NYStyleCheesePizza();
    }
  }
}

class ChicagoStore extends PizzaStore {
  createPizza(pizzaType: PizzaType): Pizza {
    if (pizzaType === "cheese") {
      return new ChicagoStyleCheesePizza();
    } else {
      return new ChicagoStyleCheesePizza();
    }
  }
}

type PizzaType = "cheese" | "pepperoni" | "greek";

function main() {
  let nyStore = new NYPizzaStore();
  let chicagoStore = new ChicagoStore();

  let pizza = nyStore.orderPizza("cheese");
  console.log("Ethan ordered a " + pizza.getName() + " pizza");

  let pizza2 = chicagoStore.orderPizza("cheese");
  console.log("Joel ordered a " + pizza2.getName() + " pizza");
}

main();

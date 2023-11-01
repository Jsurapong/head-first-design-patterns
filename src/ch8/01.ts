export {};

abstract class CaffeineBeverage {
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }

  abstract brew(): void;
  abstract addCondiments(): void;

  boilWater() {
    console.log("Boiling water");
  }

  pourInCup() {
    console.log("Pouring into cup");
  }
}

class Tea extends CaffeineBeverage {
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
  }
  brew(): void {
    console.log("Steeping the tea");
  }
  addCondiments(): void {
    console.log("Adding lemon");
  }
}

class Coffee extends CaffeineBeverage {
  brew(): void {
    console.log("Dripping Coffee through filter");
  }
  addCondiments(): void {
    console.log("Adding Sugar and Milk");
  }
}

function main() {
  let tea = new Tea();
  tea.prepareRecipe();
}

main();

export {};

abstract class CaffeineBeverage {
  prepareRecipe() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
    this.hook();
  }

  abstract brew(): void;
  abstract addCondiments(): void;

  boilWater() {
    console.log("Boiling water");
  }

  pourInCup() {
    console.log("Pouring into cup");
  }

  hook() {
    console.log("Hooking up the hook");
  }
}

class Tea extends CaffeineBeverage {
  brew(): void {
    console.log("Steeping the tea");
  }
  addCondiments(): void {
    console.log("Adding lemon");
  }

  hook(): void {
    console.log("Hooking up the hook");
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

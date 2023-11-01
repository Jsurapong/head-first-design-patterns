//Composite Pattern
export {};

abstract class MenuComponent {
  public getName() {}
  public getDescription() {}
  public getPrice() {}
  public isVegetarian() {}
  public print(lvl: number = 0) {}
  public add(menuComponent: MenuComponent) {}
  public remove(menuComponent: MenuComponent) {}
  public getChild(i: number) {}
  public getSpace(i: number): string {
    let space = new Array(i + 1).join("=");
    return space;
  }
}

class Menu extends MenuComponent {
  menuComponents: MenuComponent[] = [];
  constructor(public name: string, public description: string) {
    super();
  }
  public add(menuComponent: MenuComponent): void {
    this.menuComponents.push(menuComponent);
  }
  public print(lvl: number = 0): void {
    console.log(
      `\n${this.getSpace(lvl)}${this.getName()}, ${this.getDescription()}`
    );
    console.log("---------------------");

    for (let menuComponent of this.menuComponents) {
      menuComponent.print(lvl + 1);
    }
  }
  public getName() {
    return this.name;
  }
  public getDescription() {
    return this.description;
  }
}

class MenuItem extends MenuComponent {
  constructor(
    public name: string,
    public description: string,
    public vegetarian: boolean,
    public price: number
  ) {
    super();
  }
  public getName() {
    return this.name;
  }
  public getDescription() {
    return this.description;
  }
  public getPrice() {
    return this.price;
  }
  public isVegetarian() {
    return this.vegetarian;
  }
  public print(lvl: number): void {
    console.log(
      `${this.getSpace(lvl)}${this.getName()} ${
        this.isVegetarian() ? "(v)" : ""
      }, ${this.getPrice()}\r\n   -- ${this.getDescription()}`
    );
  }
}

function main() {
  let pancakeHouseMenu = new Menu("Pancake House Menu", "Breakfast");
  let dinerMenu = new Menu("Diner Menu", "Lunch");
  let dessertMenu = new Menu("Coffee Shop Menu", "Dinner");

  let allMenus = new Menu("All Menus", "All menus combined");

  allMenus.add(pancakeHouseMenu);
  allMenus.add(dinerMenu);

  pancakeHouseMenu.add(
    new MenuItem(
      "K&B's Pancake Breakfast",
      "Pancakes with scrambled eggs, and toast",
      true,
      2.99
    )
  );

  pancakeHouseMenu.add(dessertMenu);

  dessertMenu.add(
    new MenuItem("Apple Pie", "Apple pie with a flakey crust", true, 1.59)
  );
  dinerMenu.add(
    new MenuItem("Pasta", "Spaghetti with Marinara Sauce", true, 3.89)
  );

  allMenus.print();
}

main();

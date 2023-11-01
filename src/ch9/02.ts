export {};

class MenuItem {
  constructor(
    public name: string,
    public description: string,
    public vegetarian: boolean,
    public price: number
  ) {}

  getName() {
    return this.name;
  }

  getDescription() {
    return this.description;
  }

  getPrice() {
    return this.price;
  }

  isVegetarian() {
    return this.vegetarian;
  }
}

class PancakeHouseMenu {
  public menuItems: MenuItem[] = [];
  constructor() {
    this.addItem(
      "K&B's Pancake Breakfast",
      "Pancakes with scrambled eggs, and toast",
      true,
      2.99
    );
    this.addItem(
      "Regular Pancake Breakfast",
      "Pancakes with fried eggs, sausage",
      false,
      2.99
    );

    this.addItem(
      "Blueberry Pancakes",
      "Pancakes made with fresh blueberries",
      true,
      3.49
    );
    this.addItem(
      "Waffles",
      "Waffles with your choice of blueberries or strawberries",
      true,
      3.59
    );
  }

  addItem(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number
  ) {
    let menuItem = new MenuItem(name, description, vegetarian, price);
    this.menuItems.push(menuItem);
  }
  getMenuItems() {
    return this.menuItems;
  }

  createIterator(): MyIterator {
    return new PancakeHouseMenuIterator(this.menuItems);
  }
}

class DinerMenu {
  MAX_ITEM = 6;
  numberOfItems = 0;
  menuItems: [MenuItem, MenuItem, MenuItem, MenuItem, MenuItem, MenuItem] = [
    new MenuItem("", "", false, 0),
    new MenuItem("", "", false, 0),
    new MenuItem("", "", false, 0),
    new MenuItem("", "", false, 0),
    new MenuItem("", "", false, 0),
    new MenuItem("", "", false, 0),
  ];

  constructor() {
    this.addItem(
      "Vegetarian BLT",
      "(Fakin' Bacon) with lettuce & tomato on whole wheat",
      true,
      2.99
    );
    this.addItem(
      "BLT",
      "Bacon with lettuce & tomato on whole wheat",
      false,
      2.99
    );
    this.addItem(
      "Soup of the day",
      "Soup of the day, with a side of potato salad",
      false,
      3.29
    );
    this.addItem(
      "Hotdog",
      "A hot dog, with sauerkraut, relish, onions, topped with cheese",
      false,
      3.05
    );
  }

  addItem(
    name: string,
    description: string,
    vegetarian: boolean,
    price: number
  ) {
    if (this.numberOfItems >= this.MAX_ITEM) {
      console.log("Sorry, menu is full! Can't add item to menu");
    } else {
      let menuItem = new MenuItem(name, description, vegetarian, price);
      // this.menuItems.push(menuItem);
      this.menuItems[this.numberOfItems] = menuItem;
      this.numberOfItems = this.numberOfItems + 1;
    }
  }
  getMenuItems() {
    return this.menuItems;
  }

  createIterator(): MyIterator {
    return new DinerMenuIterator(this.menuItems, this.numberOfItems);
  }
}

interface MyIterator {
  hasNext(): boolean;
  next(): MenuItem;
}

class PancakeHouseMenuIterator implements MyIterator {
  position = 0;
  constructor(public menuItems: MenuItem[]) {}
  next(): MenuItem {
    let menuItem = this.menuItems[this.position];
    this.position = this.position + 1;

    return menuItem;
  }
  hasNext(): boolean {
    return this.position < this.menuItems.length;
  }
}

class DinerMenuIterator implements MyIterator {
  position = 0;
  constructor(public menuItems: MenuItem[], public numberOfItems: number) {}
  next(): MenuItem {
    let menuItem = this.menuItems[this.position];
    this.position = this.position + 1;

    return menuItem;
  }
  hasNext(): boolean {
    return this.position < this.numberOfItems;
  }
}

function printMenu(iterator: MyIterator) {
  while (iterator.hasNext()) {
    let item = iterator.next();
    console.log(
      `${item.getName()} ${item.getPrice()} \r\n${item.getDescription()}`
    );
  }
}

function main() {
  let pancakeHouseMenu = new PancakeHouseMenu();
  let breakfastIterator = pancakeHouseMenu.createIterator();

  let dinerMenu = new DinerMenu();
  let lunchIterator = dinerMenu.createIterator();

  printMenu(breakfastIterator);
  console.log("========");
  printMenu(lunchIterator);
}

main();

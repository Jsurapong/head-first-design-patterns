class Duck {
  quack(): void {
    console.log("quack");
  }

  swim(): void {
    console.log("swim");
  }

  display(): void {
    console.log("Duck");
  }
}

class MallardDuck extends Duck {
  display(): void {
    console.log("MallardDuck");
  }
}

class RedheadDuck extends Duck {
  display(): void {
    console.log("RedheadDuck");
  }
}

let d = new Duck();
d.display();
d.quack();
d.swim();

console.log("=================");

let md = new MallardDuck();
md.display();
md.quack();
md.swim();

console.log("=================");

let rd = new RedheadDuck();
rd.display();
rd.quack();
rd.swim();

export {};

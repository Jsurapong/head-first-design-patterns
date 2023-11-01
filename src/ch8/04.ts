// The Hollywood Principle

export {};

function main() {}

// imagination number: x + yi
// (1 + 3i) + (11 + 5i) => 12 + 8i

class INumber {
  constructor(public x: number, public y: number) {}

  add_in_place(n: INumber): void {
    this.x += n.x;
    this.y += n.y;
  }

  add(n: INumber): INumber {
    return new INumber(this.x + n.x, this.y + n.y);
  }

  // https://github.com/codalien/operator-overloading-js
  //THIS is WHERE we OVERLOAD '+' Operator
  //   this.__plus = function (leftOperand: INumber) {
  //     return new INumber(leftOperand.x + this.x, leftOperand.y + this.y);
  //   };
}

function add_i_number(n1: INumber, n2: INumber): INumber {
  return new INumber(n1.x + n2.x, n1.y + n2.y);
}

let n1 = new INumber(1, 3);
let n2 = new INumber(11, 5);

let n3 = add_i_number(n1, n2);

// in-place add
n1.add_in_place(n2);

// add
let n4 = n1.add(n2);

// let n5 = n1 + n2; // overload + operator

main();

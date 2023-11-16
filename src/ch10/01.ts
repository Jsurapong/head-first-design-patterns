export {};

enum State {
  SOLD_OUT = 0,
  NO_QUARTER = 1,
  HAS_QUARTER = 2,
  SOLD = 3,
}
class GumballMachine {
  state = State.SOLD_OUT;

  constructor(public count: number) {
    if (this.count > 0) {
      this.state = State.NO_QUARTER;
    }
  }

  insertQuarter() {
    if (this.state === State.HAS_QUARTER) {
      console.log("You can't insert another quarter");
    } else if (this.state === State.NO_QUARTER) {
      this.state = State.HAS_QUARTER;
      console.log("You insert a quarter");
    } else if (this.state === State.SOLD_OUT) {
      console.log("You can't insert a quarter, the machine is sold out");
    } else if (this.state === State.SOLD) {
      console.log("Please wait, we're already giving you a gumball");
    }
  }
  ejectQuarter() {
    if (this.state === State.HAS_QUARTER) {
      console.log("Quarter returned");
      this.state = State.NO_QUARTER;
    } else if (this.state === State.NO_QUARTER) {
      console.log("You haven't inserted a quarter");
    } else if (this.state === State.SOLD_OUT) {
      console.log("You can't eject, you haven't inserted a quarter yet");
    } else if (this.state === State.SOLD) {
      console.log("Sorry, you already turned the crank");
    }
  }

  turnCrank() {
    if (this.state === State.SOLD) {
      console.log("Turning twice doesn't get you another gumball!");
    } else if (this.state === State.NO_QUARTER) {
      console.log("You turned, but there's no quarter");
    } else if (this.state === State.SOLD_OUT) {
      console.log("You turned, but there's no gumball");
    } else if (this.state === State.HAS_QUARTER) {
      console.log("You turned...");
      this.state = State.SOLD;
      this.dispense();
    }
  }

  dispense() {
    if (this.state === State.SOLD) {
      console.log("A gumball comes rolling out the slot...");
      this.count = this.count - 1;

      if (this.count === 0) {
        console.log("Oops, out of gumballs!");
        this.state = State.SOLD_OUT;
      } else {
        this.state = State.NO_QUARTER;
      }
    } else if (this.state === State.NO_QUARTER) {
      console.log("You need to pay first");
    } else if (this.state === State.SOLD_OUT) {
      console.log("No gumball dispensed");
    } else if (this.state === State.HAS_QUARTER) {
      console.log("No gumball dispensed");
    }
  }
}

function main() {
  let gumballMachine = new GumballMachine(5);
  console.log("count " + gumballMachine.count);
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  console.log("count " + gumballMachine.count);

  gumballMachine.insertQuarter();
  gumballMachine.ejectQuarter();
  gumballMachine.turnCrank();
  console.log("count " + gumballMachine.count);

  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.ejectQuarter();
  console.log("count " + gumballMachine.count);

  gumballMachine.insertQuarter();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  console.log("count " + gumballMachine.count);
}

main();

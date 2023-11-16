export {};

interface State {
  insertQuarter(): void;
  ejectQuarter(): void;
  turnCrank(): void;
  dispense(): void;
}
class GumballMachine {
  noQuarterState: State;
  hasQuarterState: State;
  soldOutState: State;
  soldState: State;

  state: State; // current

  constructor(public count: number) {
    this.noQuarterState = new NoQuarterState(this);
    this.hasQuarterState = new HasQuarterState(this);
    this.soldOutState = new SoldOutState(this);
    this.soldState = new SoldState(this);

    if (this.count > 0) {
      this.state = this.noQuarterState;
    } else {
      this.state = this.soldState;
    }
  }

  setState(state: State) {
    this.state = state;
  }
  getHasQuarterState(): State {
    return this.hasQuarterState;
  }
  getNoQuarterState(): State {
    return this.noQuarterState;
  }

  getSoldState(): State {
    return this.soldState;
  }

  getSoldOutState(): State {
    return this.soldOutState;
  }
  insertQuarter() {
    this.state.insertQuarter();
  }
  turnCrank() {
    this.state.turnCrank();
    this.state.dispense();
  }
  ejectQuarter() {
    this.state.ejectQuarter();
  }
  print() {
    console.log(this.state.constructor.name + " count " + this.count);
  }
  getCount() {
    return this.count;
  }
  releaseBall() {
    if (this.count > 0) {
      this.count = this.count - 1;
    }
  }
}

class NoQuarterState implements State {
  constructor(public gumballMachine: GumballMachine) {}
  insertQuarter() {
    console.log("You inserted a quarter");
    this.gumballMachine.setState(this.gumballMachine.getHasQuarterState());
  }
  ejectQuarter() {
    console.log("You haven't inserted a quarter");
  }
  turnCrank() {
    console.log("You turned, but there's no quarter");
  }
  dispense() {
    console.log("You need to pay first");
  }
}

class HasQuarterState implements State {
  constructor(public gumballMachine: GumballMachine) {}

  insertQuarter() {
    console.log("You can't insert another quarter");
  }
  ejectQuarter() {
    console.log("Quarter returned");
    this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
  }
  turnCrank() {
    console.log("You turned...");
    this.gumballMachine.setState(this.gumballMachine.getSoldState());
  }
  dispense() {
    console.log("No gumball dispensed");
  }
}

class SoldOutState implements State {
  constructor(public gumballMachine: GumballMachine) {}

  insertQuarter() {
    console.log("Please wait, we're already giving you a gumball");
  }
  ejectQuarter() {
    console.log("Sorry, you already turned the crank");
  }
  turnCrank() {
    console.log("Turning twice doesn't get you another gumball!");
  }
  dispense() {
    console.log("No gumball dispensed");
  }
}

class SoldState implements State {
  constructor(public gumballMachine: GumballMachine) {}

  insertQuarter() {
    console.log("Please wait, we're already giving you a gumball");
  }
  ejectQuarter() {
    console.log("Sorry, you already turned the crank");
  }
  turnCrank() {
    console.log("Turning twice doesn't get you another gumball");
  }
  dispense() {
    this.gumballMachine.releaseBall();
    if (this.gumballMachine.getCount() > 0) {
      this.gumballMachine.setState(this.gumballMachine.getNoQuarterState());
    } else {
      console.log("Oops, out of gumballs!");
      this.gumballMachine.setState(this.gumballMachine.getSoldOutState());
    }
  }
}

function main() {
  let gumballMachine = new GumballMachine(5);

  gumballMachine.print();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.print();

  gumballMachine.insertQuarter();
  gumballMachine.ejectQuarter();
  gumballMachine.turnCrank();
  gumballMachine.print();

  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.ejectQuarter();
  gumballMachine.print();

  gumballMachine.insertQuarter();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.insertQuarter();
  gumballMachine.turnCrank();
  gumballMachine.print();
}

main();

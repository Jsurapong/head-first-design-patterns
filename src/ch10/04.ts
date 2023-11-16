export {};

interface State {
  insertQuarter(gumballMachine: GumballMachine): void;
  ejectQuarter(gumballMachine: GumballMachine): void;
  turnCrank(gumballMachine: GumballMachine): void;
  dispense(gumballMachine: GumballMachine): void;
}
class GumballMachine {
  noQuarterState: State;
  hasQuarterState: State;
  soldOutState: State;
  soldState: State;
  winnerState: State;

  state: State; // current

  constructor(public count: number) {
    this.noQuarterState = new NoQuarterState();
    this.hasQuarterState = new HasQuarterState();
    this.soldOutState = new SoldOutState();
    this.soldState = new SoldState();
    this.winnerState = new WinnerState();

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

  getWinnerState(): State {
    return this.winnerState;
  }
  insertQuarter() {
    this.state.insertQuarter(this);
  }
  turnCrank() {
    this.state.turnCrank(this);
    this.state.dispense(this);
  }
  ejectQuarter() {
    this.state.ejectQuarter(this);
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
  insertQuarter(gumballMachine: GumballMachine) {
    console.log("You inserted a quarter");
    gumballMachine.setState(gumballMachine.getHasQuarterState());
  }
  ejectQuarter(gumballMachine: GumballMachine) {
    console.log("You haven't inserted a quarter");
  }
  turnCrank(gumballMachine: GumballMachine) {
    console.log("You turned, but there's no quarter");
  }
  dispense(gumballMachine: GumballMachine) {
    console.log("You need to pay first");
  }
}

class HasQuarterState implements State {
  //   constructor(public gumballMachine: GumballMachine) {}

  insertQuarter(gumballMachine: GumballMachine) {
    console.log("You can't insert another quarter");
  }
  ejectQuarter(gumballMachine: GumballMachine) {
    console.log("Quarter returned");
    gumballMachine.setState(gumballMachine.getNoQuarterState());
  }
  turnCrank(gumballMachine: GumballMachine) {
    console.log("You turned...");
    let winner = Math.floor(Math.random() * 10);

    if (winner === 0) {
      gumballMachine.setState(gumballMachine.getWinnerState());
    } else {
      gumballMachine.setState(gumballMachine.getSoldState());
    }
  }
  dispense(gumballMachine: GumballMachine) {
    console.log("No gumball dispensed");
  }
}

class SoldOutState implements State {
  insertQuarter(gumballMachine: GumballMachine) {
    console.log("Please wait, we're already giving you a gumball");
  }
  ejectQuarter(gumballMachine: GumballMachine) {
    console.log("Sorry, you already turned the crank");
  }
  turnCrank(gumballMachine: GumballMachine) {
    console.log("Turning twice doesn't get you another gumball!");
  }
  dispense(gumballMachine: GumballMachine) {
    console.log("No gumball dispensed");
  }
}

class SoldState implements State {
  insertQuarter(gumballMachine: GumballMachine) {
    console.log("Please wait, we're already giving you a gumball");
  }
  ejectQuarter(gumballMachine: GumballMachine) {
    console.log("Sorry, you already turned the crank");
  }
  turnCrank(gumballMachine: GumballMachine) {
    console.log("Turning twice doesn't get you another gumball");
  }
  dispense(gumballMachine: GumballMachine) {
    gumballMachine.releaseBall();
    if (gumballMachine.getCount() > 0) {
      gumballMachine.setState(gumballMachine.getNoQuarterState());
    } else {
      console.log("Oops, out of gumballs!");
      gumballMachine.setState(gumballMachine.getSoldOutState());
    }
  }
}

class WinnerState implements State {
  insertQuarter(gumballMachine: GumballMachine) {
    console.log("Please wait, we're already giving you a gumball");
  }
  ejectQuarter(gumballMachine: GumballMachine) {
    console.log("Sorry, you already turned the crank");
  }
  turnCrank(gumballMachine: GumballMachine) {
    console.log("Turning twice doesn't get you another gumball");
  }
  dispense(gumballMachine: GumballMachine) {
    console.log("YOU'RE A WINNER! You get two gumballs for your quarter");
    gumballMachine.releaseBall();
    if (gumballMachine.getCount() === 0) {
      gumballMachine.setState(gumballMachine.getSoldOutState());
    } else {
      gumballMachine.releaseBall();
      if (gumballMachine.getCount() > 0) {
        gumballMachine.setState(gumballMachine.getNoQuarterState());
      } else {
        gumballMachine.setState(gumballMachine.getSoldOutState());
      }
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

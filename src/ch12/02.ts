// Chain of responsibility pattern

interface Handler {
  handle(state: State): void;
}

// check number
// 1. even -> pass
// 2. mod 5 == 0 -> pass

type State = {
  num: number;
};

class EvenHandler implements Handler {
  handle(state: State) {
    if (state.num % 2 == 1) {
      // check even
      throw new Error("Not even nubmer");
    }
  }
}

class FiveHandler implements Handler {
  handle(state: State) {
    if (state.num % 5 != 0) {
      // check mod 5
      throw new Error("Cannot divide by 5");
    }
  }
}

class Handlers {
  constructor(public handlers: Handler[] = []) {}

  add(handler: Handler) {
    this.handlers.push(handler);
  }

  check(state: State) {
    for (let handler of this.handlers) {
      handler.handle(state);
    }
  }
}

function main() {
  let state: State = { num: 10 };

  let handlers = new Handlers();
  handlers.add(new FiveHandler());
  handlers.add(new EvenHandler());

  handlers.check(state);
  console.log(state);
}

main();

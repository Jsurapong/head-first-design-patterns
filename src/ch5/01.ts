export {};
class Computer {
  static uniqueInstance: Computer;

  private constructor() {} // block new Computer()

  static getInstance() {
    if (!Computer.uniqueInstance) {
      Computer.uniqueInstance = new Computer();
    }

    return Computer.uniqueInstance;
  }
}

function main() {
  let computer1 = Computer.getInstance();
  let computer2 = Computer.getInstance();
  console.log(computer1 === computer2);
}

main();

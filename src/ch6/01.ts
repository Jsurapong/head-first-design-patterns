export {};
// slot
class Light {
  on() {
    console.log("light on");
  }
  off() {
    console.log("light off");
  }
}

class GarageDoor {
  up() {
    console.log("garage door up");
  }
  down() {
    console.log("garage door down");
  }
  stop() {}
  lightOn() {}
  lightOff() {}
}

interface Command {
  execute(): void;
}

class NoCommand implements Command {
  execute(): void {
    console.log("no command");
  }
}
class LightOnCommand implements Command {
  constructor(public light: Light) {}
  execute(): void {
    this.light.on();
  }
}

class GarageDoorOpenCommand implements Command {
  constructor(public garageDoor: GarageDoor) {}
  execute(): void {
    this.garageDoor.up();
  }
}

class SimpleRemoteControl {
  slot: Command = new NoCommand();

  setCommand(command: Command) {
    this.slot = command;
  }

  buttonWasPressed() {
    this.slot.execute();
  }
}

function main() {
  let remote = new SimpleRemoteControl();
  let light = new Light();
  let lightOnCommand = new LightOnCommand(light);

  let garageDoor = new GarageDoor();
  let garageDoorOpenCommand = new GarageDoorOpenCommand(garageDoor);

  remote.setCommand(lightOnCommand);
  remote.buttonWasPressed();

  remote.setCommand(garageDoorOpenCommand);
  remote.buttonWasPressed();
}
main();

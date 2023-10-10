export {};
// slots []

class Light {
  constructor(public name: string) {}
  on() {
    console.log(this.name + " light on");
  }
  off() {
    console.log(this.name + " light off");
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

class Stereo {
  volume: number = 0;
  on() {
    console.log("stereo on");
  }
  off() {
    console.log("stereo off");
  }
  setCd() {}
  setDvd() {}
  setRadio() {}
  setVolume(volume: number) {
    this.volume = volume;
  }
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
class LightOffCommand implements Command {
  constructor(public light: Light) {}
  execute(): void {
    this.light.off();
  }
}

class GarageDoorOpenCommand implements Command {
  constructor(public garageDoor: GarageDoor) {}
  execute(): void {
    this.garageDoor.up();
  }
}

class StereoOnWithCDCommand implements Command {
  constructor(public stereo: Stereo) {}
  execute(): void {
    this.stereo.on();
    this.stereo.setCd();
    this.stereo.setVolume(11);
  }
}

class RemoteControl {
  onCommands: Command[];
  offCommands: Command[];
  constructor() {
    this.onCommands = [];
    this.offCommands = [];

    let noCommand = new NoCommand();
    for (let i = 0; i < 7; i++) {
      this.onCommands[i] = noCommand;
      this.offCommands[i] = noCommand;
    }
  }

  setCommand(slot: number, onCommand: Command, offCommand: Command) {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  onButtonWasPressed(slot: number) {
    this.onCommands[slot].execute();
  }

  offButtonWasPressed(slot: number) {
    this.offCommands[slot].execute();
  }

  print() {
    console.log("------ Remote Control -------");
    for (let index = 0; index < 7; index++) {
      console.log(
        "[slot " +
          index +
          "] " +
          this.onCommands[index].constructor.name +
          " " +
          this.offCommands[index].constructor.name
      );
    }
  }
}

function main() {
  let remote = new RemoteControl();

  let livingRoomLight = new Light("Living Room");
  let kitchenLight = new Light("Kitchen");

  let livingRoomLightOn = new LightOnCommand(livingRoomLight);
  let livingRoomLightOff = new LightOffCommand(livingRoomLight);

  let kitchenLightOn = new LightOnCommand(kitchenLight);
  let kitchenLightOff = new LightOffCommand(kitchenLight);

  remote.setCommand(0, livingRoomLightOn, livingRoomLightOff);
  remote.setCommand(1, kitchenLightOn, kitchenLightOff);

  remote.print();

  remote.onButtonWasPressed(0);
  remote.offButtonWasPressed(0);

  remote.onButtonWasPressed(1);
  remote.offButtonWasPressed(1);
}
main();

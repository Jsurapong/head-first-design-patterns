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

enum Speed {
  OFF = 0,
  LOW,
  MEDIUM,
  HIGH,
}
class CeilingFan {
  speed: Speed = Speed.OFF;
  constructor(public location: string) {}

  high() {
    this.speed = Speed.HIGH;
    console.log(this.location + " ceiling fan high");
  }
  medium() {
    this.speed = Speed.MEDIUM;
    console.log(this.location + " ceiling fan medium");
  }
  low() {
    this.speed = Speed.LOW;
    console.log(this.location + " ceiling fan low");
  }
  off() {
    this.speed = Speed.OFF;
    console.log(this.location + " ceiling fan off");
  }
  getSpeed() {
    return this.speed;
  }
}

interface Command {
  execute(): void;
  undo(): void;
}

class NoCommand implements Command {
  execute(): void {
    console.log("no command");
  }
  undo(): void {
    console.log("no command");
  }
}
class LightOnCommand implements Command {
  constructor(public light: Light) {}
  execute(): void {
    this.light.on();
  }
  undo(): void {
    this.light.off();
  }
}
class LightOffCommand implements Command {
  constructor(public light: Light) {}
  execute(): void {
    this.light.off();
  }
  undo(): void {
    this.light.on();
  }
}

class GarageDoorOpenCommand implements Command {
  constructor(public garageDoor: GarageDoor) {}
  execute(): void {
    this.garageDoor.up();
  }
  undo(): void {
    this.garageDoor.down();
  }
}

class StereoOnWithCDCommand implements Command {
  constructor(public stereo: Stereo) {}
  execute(): void {
    this.stereo.on();
    this.stereo.setCd();
    this.stereo.setVolume(11);
  }
  undo(): void {
    this.stereo.off();
  }
}

abstract class CeilingFanCommand implements Command {
  prevSpeed = Speed.OFF;
  constructor(public ceilingFan: CeilingFan) {}
  execute(): void {
    this.prevSpeed = this.ceilingFan.getSpeed();
    this.setCeilingFanSpeed();
  }

  abstract setCeilingFanSpeed(): void;
  undo(): void {
    if (this.prevSpeed === Speed.HIGH) {
      this.ceilingFan.high();
    } else if (this.prevSpeed === Speed.MEDIUM) {
      this.ceilingFan.medium();
    } else if (this.prevSpeed === Speed.LOW) {
      this.ceilingFan.low();
    } else if (this.prevSpeed === Speed.OFF) {
      this.ceilingFan.off();
    }
  }
}

class CeilingFanHighCommand extends CeilingFanCommand {
  setCeilingFanSpeed(): void {
    this.ceilingFan.high();
  }
}

class CeilingFanMediumCommand extends CeilingFanCommand {
  setCeilingFanSpeed(): void {
    this.ceilingFan.medium();
  }
}

class CeilingFanOffCommand extends CeilingFanCommand {
  setCeilingFanSpeed(): void {
    this.ceilingFan.off();
  }
}

class RemoteControlWithUndo {
  onCommands: Command[];
  offCommands: Command[];
  undoCommand: Command;
  constructor() {
    this.onCommands = [];
    this.offCommands = [];

    let noCommand = new NoCommand();
    for (let i = 0; i < 7; i++) {
      this.onCommands[i] = noCommand;
      this.offCommands[i] = noCommand;
    }

    this.undoCommand = noCommand;
  }

  setCommand(slot: number, onCommand: Command, offCommand: Command) {
    this.onCommands[slot] = onCommand;
    this.offCommands[slot] = offCommand;
  }

  onButtonWasPressed(slot: number) {
    this.onCommands[slot].execute();
    this.undoCommand = this.onCommands[slot];
  }

  offButtonWasPressed(slot: number) {
    this.offCommands[slot].execute();
    this.undoCommand = this.offCommands[slot];
  }

  undoButtonWasPressed() {
    this.undoCommand.undo();
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

    console.log("[undo] " + this.undoCommand.constructor.name);
  }
}

function main() {
  let remoteControl = new RemoteControlWithUndo();

  let ceilingFan = new CeilingFan("Living Room");
  let ceilingFanHighCommand = new CeilingFanHighCommand(ceilingFan);
  let ceilingFanMediumCommand = new CeilingFanMediumCommand(ceilingFan);
  let ceilingFanOffCommand = new CeilingFanOffCommand(ceilingFan);

  remoteControl.setCommand(0, ceilingFanMediumCommand, ceilingFanOffCommand);
  remoteControl.setCommand(1, ceilingFanHighCommand, ceilingFanOffCommand);

  remoteControl.onButtonWasPressed(0);
  remoteControl.offButtonWasPressed(0);
  remoteControl.print();
  remoteControl.undoButtonWasPressed();

  remoteControl.onButtonWasPressed(1);
  remoteControl.print();
  remoteControl.undoButtonWasPressed();
}
main();

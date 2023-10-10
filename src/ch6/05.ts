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

class MacroCommand implements Command {
  constructor(public commands: Command[]) {}

  execute(): void {
    for (let command of this.commands) {
      command.execute();
    }
  }
  undo(): void {
    for (let i = this.commands.length - 1; i >= 0; i--) {
      this.commands[i].undo();
    }
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
  let livingRoomLight = new Light("Living Room");
  let kitchenLight = new Light("Kitchen");

  let ceilingFanHighCommand = new CeilingFanHighCommand(ceilingFan);
  let ceilingFanOffCommand = new CeilingFanOffCommand(ceilingFan);

  let livingRoomLightOn = new LightOnCommand(livingRoomLight);
  let livingRoomLightOff = new LightOffCommand(livingRoomLight);

  let kitchenLightOn = new LightOnCommand(kitchenLight);
  let kitchenLightOff = new LightOffCommand(kitchenLight);

  let partyOn: Command[] = [
    ceilingFanHighCommand,
    livingRoomLightOn,
    kitchenLightOn,
  ];

  let partyOff: Command[] = [
    ceilingFanOffCommand,
    livingRoomLightOff,
    kitchenLightOff,
  ];

  let partyOnMacro = new MacroCommand(partyOn);
  let partyOffMacro = new MacroCommand(partyOff);

  remoteControl.setCommand(0, partyOnMacro, partyOffMacro);
  remoteControl.print();
  console.log("--- Pushing Macro On---");
  remoteControl.onButtonWasPressed(0);
  console.log("--- Pushing Macro off---");
  remoteControl.offButtonWasPressed(0);
  console.log("--- Pushing Macro undo---");
  remoteControl.undoButtonWasPressed();
}
main();

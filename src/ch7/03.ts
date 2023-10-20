export {};
// with the principle facade
class Thermometer {
  getTemp(): number {
    return 34.01;
  }
}

class WeatherStation {
  constructor(private thermometer: Thermometer) {}
  // getThermometer(): Thermometer {
  //   return this.thermometer;
  // }
  getTemp(): number {
    return this.thermometer.getTemp();
  }
}

class House {
  constructor(private weatherStation: WeatherStation) {}
  getTemp() {
    // let thermometer = this.weatherStation.getThermometer();
    return this.weatherStation.getTemp();
  }
}

function main() {
  let thermometer = new Thermometer();
  let weatherStation = new WeatherStation(thermometer);
  let house = new House(weatherStation);
  console.log(house.getTemp());
}
main();

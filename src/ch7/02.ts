export {};
// without the principle facade
class Thermometer {
  getTemp(): number {
    return 34.01;
  }
}

class WeatherStation {
  constructor(public thermometer: Thermometer) {}
  getThermometer(): Thermometer {
    return this.thermometer;
  }
}

class House {
  constructor(public weatherStation: WeatherStation) {}
  getTemp() {
    let thermometer = this.weatherStation.getThermometer();
    return thermometer.getTemp();
  }
}

function main() {
  let thermometer = new Thermometer();
  let weatherStation = new WeatherStation(thermometer);
  let house = new House(weatherStation);
  console.log(house.getTemp());
}
main();

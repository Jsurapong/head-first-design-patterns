class WeatherData {
  getTemperature() {
    return 1.1;
  }
  getHumidity() {
    return 2.2;
  }
  getPressure() {
    return 3.3;
  }
  measurementsChanged() {
    let temp = this.getTemperature();
    let humidity = this.getHumidity();
    let pressure = this.getPressure();

    let conditionsDisplay = new CurrentConditionsDisplay();
    conditionsDisplay.update(temp, humidity, pressure);

    let statisticsDisplay = new StatisticsDisplay();
    statisticsDisplay.update(temp, humidity, pressure);

    let forecastDisplay = new ForecastDisplay();
    forecastDisplay.update(temp, humidity, pressure);
  }
}

class CurrentConditionsDisplay {
  update(temp: number, humidity: number, pressure: number) {}
}

class StatisticsDisplay {
  update(temp: number, humidity: number, pressure: number) {}
}
class ForecastDisplay {
  update(temp: number, humidity: number, pressure: number) {}
}

function main() {
  const weather = new WeatherData();
  console.log(weather.getTemperature());
  console.log(weather.getHumidity());
  console.log(weather.getPressure());
  weather.measurementsChanged();
}

main();

export {};

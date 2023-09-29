// pull
interface Subject {
  registerObserver(o: Observer): void;
  removeObserver(o: Observer): void;
  notifyObservers(): void;
}

interface Observer {
  update(): void;
}
interface DisplayElement {
  display(): void;
}

class WeatherData implements Subject {
  private observers: Observer[] = [];
  private temperature: number = 0;
  private humidity: number = 0;
  private pressure: number = 0;

  registerObserver(o: Observer): void {
    this.observers.push(o);
  }
  removeObserver(o: Observer): void {
    this.observers = this.observers.filter((obj) => obj !== o);
  }
  notifyObservers(): void {
    for (let observer of this.observers) {
      observer.update();
    }
  }
  measurementsChanged() {
    this.notifyObservers();
  }
  setMeasurements(temperature: number, humidity: number, pressure: number) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.measurementsChanged();
  }

  getTemperature() {
    return this.temperature;
  }
  getHumidity() {
    return this.humidity;
  }
  getPressure() {
    return this.pressure;
  }
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
  private temperature: number = 0;
  private humidity: number = 0;

  constructor(private weatherData: WeatherData) {
    this.weatherData.registerObserver(this);
  }

  update() {
    this.temperature = this.weatherData.getTemperature();
    this.humidity = this.weatherData.getHumidity();
    this.display();
  }

  display(): void {
    console.log(
      "Current conditions: " +
        this.temperature +
        "F degrees and " +
        this.humidity +
        "% humidity"
    );
  }
}

class StatisticsDisplay implements Observer, DisplayElement {
  private pressure: number = 0;
  private humidity: number = 0;

  constructor(private weatherData: WeatherData) {
    this.weatherData.registerObserver(this);
  }

  update() {
    this.pressure = this.weatherData.getPressure();
    this.humidity = this.weatherData.getHumidity();
    this.display();
  }

  display(): void {
    console.log(
      "Static : " + this.pressure + " pressure " + this.humidity + "% humidity"
    );
  }
}

class ForecastDisplay implements Observer, DisplayElement {
  private pressure: number = 0;
  private temperature: number = 0;
  constructor(private weatherData: WeatherData) {
    this.weatherData.registerObserver(this);
  }
  update() {
    this.pressure = this.weatherData.getPressure();
    this.temperature = this.weatherData.getTemperature();
    this.display();
  }

  display(): void {
    console.log(
      "Forecast : " +
        this.pressure +
        " pressure " +
        this.temperature +
        "% humidity"
    );
  }
}

function main() {
  const weather = new WeatherData();

  let currentConditionsDisplay = new CurrentConditionsDisplay(weather);
  let statisticsDisplay = new StatisticsDisplay(weather);
  let forecastDisplay = new ForecastDisplay(weather);
  weather.setMeasurements(80, 65, 30);
  weather.setMeasurements(80.77, 65.88, 30.99);
  weather.setMeasurements(40, 55, 60);

  weather.removeObserver(currentConditionsDisplay);
  console.log("after remove ====");
  weather.setMeasurements(80, 65, 30);
}

main();

export {};

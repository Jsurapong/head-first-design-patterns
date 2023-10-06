export {};

class ChocolateBoiler {
  #empty: boolean = true;
  #boiled: boolean = false;

  private constructor() {}

  static instance: ChocolateBoiler;

  static getInstance(): ChocolateBoiler {
    if (!ChocolateBoiler.instance) {
      ChocolateBoiler.instance = new ChocolateBoiler();
    }
    return ChocolateBoiler.instance;
  }

  fill(): void {
    if (this.isEmpty()) {
      this.#empty = false;
      this.#boiled = false;
    }
  }

  drain(): void {
    if (!this.isEmpty() && this.isBoiled()) {
      this.#empty = true;
    }
  }

  boil(): void {
    if (!this.isEmpty() && !this.isBoiled()) {
      this.#boiled = true;
    }
  }

  isEmpty(): boolean {
    return this.#empty;
  }

  isBoiled(): boolean {
    return this.#boiled;
  }
}

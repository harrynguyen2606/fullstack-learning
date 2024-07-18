class Counter {
  #container;
  #options;
  #resultText;
  #increaseBtn;
  #decreaseBtn;
  constructor(container, options) {
    this.#container = container;
    this.options = options;
    this.#render();
    this.#setup();
  }
  #render() {
    this.#container.innerHTML = `<div class="container">
      <div id="app"></div>
      <div class="result">0</div>
      <div>
        <button class="button" data-component="decrease">-</button>
        <button class="button" data-component="increase">+</button>
      </div>
      <div class="muted">
      Min: ${this.#options.min}
      Max: ${this.#options.max}</div>
    </div>`;
  }
  #setup() {
    this.#increaseBtn = this.#container.querySelector(
      '[data-component="increase]'
    );
    this.#decreaseBtn = this.#container.querySelector(
      '[data-component="decrease]'
    );
    this.#resultText = this.#container.querySelector('.result');
    this.#increaseBtn.addEventListener('click', this.#onIncrease.bind(this));
    this.#decreaseBtn.addEventListener('click', this.#onDecrease.bind(this));
  }
  #onIncrease() {
    let currentValue = Number(this.#resultText.innerHTML);
    let newValue = currentValue + 1;
    if (newValue <= this.#options.max) {
      this.#resultText.innerHTML = newValue;
    }
  }
  #onDecrease() {
    let currentValue = Number(this.#resultText.innerHTML);
    let newValue = currentValue - 1;
    if (newValue >= this.#options.min) {
      this.#resultText.innerHTML = newValue;
    }
  }
}
export default Counter;

function secondsToHHMMSS(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
  
    // Pad single digits with leading zeros
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
  
    return ${hoursStr}:${minutesStr}:${secondsStr};
  }
  
  class Timer {
    #container;
    #seconds;
    #clock;
    #interval;
    constructor(container) {
      this.#container = container;
    }
  
    startRunning() {
      this.#container.innerHTML = `
      <div class="alert alert-info p-1 px-3 mt-3 d-inline-block">
        <i class="bi bi-clock"></i>
        <span data-component="clock">00:00:00</span>
      </div>`;
  
      this.#clock = this.#container.querySelector('[data-component="clock"]');
  
      this.#startClock();
    }
  
    stopRunning() {
      clearInterval(this.#interval);
    }
  
    getTime() {
      return secondsToHHMMSS(this.#seconds);
    }
  
    show() {
      this.#container.classList.remove('d-none');
    }
  
    hide() {
      this.#container.classList.add('d-none');
    }
  
    #startClock() {
      this.#seconds = 0;
      this.#interval = setInterval(this.#onIntervalTick.bind(this), 1000); // tick every second - 1000ms
    }
  
    #onIntervalTick() {
      this.#seconds = this.#seconds + 1;
  
      // we need to convert seconds as a number to 00:00:00
      let humanFriendlyTime = secondsToHHMMSS(this.#seconds);
      this.#clock.innerHTML = humanFriendlyTime;
    }
  }
  
  export default Timer;
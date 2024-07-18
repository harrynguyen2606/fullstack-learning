class Report {
  #container;
  constructor(container) {
    this.#container = container;
  }

  show(data) {
    // score / maxScore
    // human readable time
    this.#container.innerHTML = `
         <h2>Quiz completed!</h2>
         <div class="alert alert-primary mt-2">
             Your score is <span class="fw-bold">${data.score} / ${data.maxScore}</span>
         </div>
         <div class="alert alert-secondary">Your test time is <strong>${data.time}</strong></div></div>
     `;

    this.#container.classList.remove('d-none');
  }
  hide() {
    this.#container.classList.add('d-none');
  }
}

export default Report;

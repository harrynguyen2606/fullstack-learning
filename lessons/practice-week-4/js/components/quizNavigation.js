class QuizNavigation {
  #container;
  #activeIndex;
  #previousButton;
  #nextButton;
  #onSubmit;
  #onChange;

  constructor(container, onChange, onSubmitClicked) {
    this.#container = container;
    this.#onChange = onChange;
    this.#onSubmit = onSubmitClicked;
  }
  setQuizData(data) {
    console.log('data passing onto navigation', data);
    let pageNavigation = '';

    for (let i = 0; i <= data.items.length - 1; i++) {
      pageNavigation =
        pageNavigation +
        `<li class="page-item">
            <button class="page-link">${i + 1}</button>
        </li>`;
    }
    this.#container.innerHTML = `
    <div class="d-flex justify-content-center gap-4 mt-2">
        <div>
            <button class="btn btn-secondary" data-component="previous">
            Previous
            </button>
        </div>
        <ul class="pagination" data-component="pagination">
        ${pageNavigation}</ul>
        <div>
            <button class="btn btn-primary" data-component="next">
            Next
            </button>
        </div>
    </div>`;
    this.#setup();
    this.#setActivePagination(0);
  }

  #setup() {
    let allPaginationButtons = this.#container.querySelectorAll('.page-link');

    for (let i = 0; i < allPaginationButtons.length; i++) {
      let currentButton = allPaginationButtons[i];
      currentButton.addEventListener(
        'click',
        this.#onPaginationItemClick.bind(this)
      );
    }

    this.#nextButton = this.#container.querySelector('[data-component="next"]');
    this.#nextButton.addEventListener(
      'click',
      this.#onNextButtonClick.bind(this)
    );

    this.#previousButton = this.#container.querySelector(
      '[data-component="previous"]'
    );
    this.#previousButton.addEventListener(
      'click',
      this.#onPreviousButtonClick.bind(this)
    );
  }

  #onNextButtonClick() {
    let currentText = this.#nextButton.innerHTML;

    if (currentText === 'Submit') {
      // it means we need to notify our brain that user is submitting
      this.#onSubmit();
    } else {
      let newIndex = this.#activeIndex + 1;
      this.#setActivePagination(newIndex);
    }
  }

  #onPreviousButtonClick() {
    if (this.#activeIndex > 0) {
      let newIndex = this.#activeIndex - 1;
      this.#setActivePagination(newIndex);
    }
  }

  #onPaginationItemClick(event) {
    let currentButton = event.target;
    let label = currentButton.innerHTML;
    let index = Number(label) - 1;

    this.#setActivePagination(index);
  }

  #setActivePagination(index) {
    let allPaginationButtons = this.#container.querySelectorAll('.page-link');

    for (let i = 0; i < allPaginationButtons.length; i++) {
      let button = allPaginationButtons[i];

      if (i === index) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    }

    this.#activeIndex = index;

    // when the #activeIndex is larger than 0
    if (this.#activeIndex > 0) {
      // set the previous button disabled to false
      this.#previousButton.disabled = false;
    } else {
      // otherwise set the previous button disabled to true
      this.#previousButton.disabled = true;
    }

    // how do we know if the #activeIndex is the last item index?
    // when the #activeIndex is equal to allPaginationButtons.length - 1
    if (this.#activeIndex === allPaginationButtons.length - 1) {
      // set the Next button text to "Submit"
      this.#nextButton.innerHTML = 'Submit';
    }
    // otherwise set the Next button text to "Next"
    else {
      this.#nextButton.innerHTML = 'Next';
    }

    this.#onChange(this.#activeIndex);
  }

  show() {
    this.#container.classList.remove('d-none');
  }

  hide() {
    this.#container.classList.add('d-none');
  }
}

export default QuizNavigation;

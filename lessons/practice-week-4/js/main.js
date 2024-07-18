import QuizSelection from './components/quizSelection.js';
import QuizNavigation from './components/quizNavigation.js';
import QuizContent from './components/quizContent.js';
import Timer from './components/timer.js';
import Report from './components/report.js';

class QuizApp {
  #container;
  #quizSelection;
  #activeQuiz;
  #quizNavigation;
  #timer;
  #report;

  #quizContent;
  #totalScore;

  constructor(container) {
    this.#container = container;
    this.#render();
    this.#setup();
  }

  #render() {
    this.#container.innerHTML = `
    <div class="container mt-5 text-center">
        <div data-component="selection"></div>
        <div data-component="content"></div>
        <div data-component="timer"></div>
        <div data-component="navigation"></div>
        <div data-component="report"></div>
    </div>`;
  }

  #setup() {
    let container = this.#container;

    this.#quizSelection = new QuizSelection(
      container.querySelector('[data-component="selection"]'),
      this.#onQuizSelectionChange.bind(this)
    );

    let navigationContainer = this.#container.querySelector(
      '[data-component = "navigation"]'
    );
    this.#quizNavigation = new QuizNavigation(
      navigationContainer,
      this.#onNavigationChange.bind(this),
      this.#onSubmit.bind(this)
    );
    this.#quizContent = new QuizContent(
      container.querySelector('[data-component="content"]'),
      this.#onSelectedAnswerChanged.bind(this)
    );
    this.#timer = new Timer(
      container.querySelector('[data-component="timer"]')
    );
    this.#report = new Report(
      container.querySelector('[data-component="report"]')
    );
  }

  #onSelectedAnswerChanged(isSelectedAnswerCorrect) {
    console.log('selected answer', isSelectedAnswerCorrect);
    // this.#selectedAnswers.push(isSelectedAnswerCorrect);

    if (isSelectedAnswerCorrect) {
      this.#totalScore = this.#totalScore + 1;
    }

    // get the point
    // let total = 0;
    // for (let i = 0; i < this.#selectedAnswers.length; i++) {
    //   if (this.#selectedAnswers[i]) {
    //     // correct
    //     total = total + 1;
    //   }
    // }

    console.log('total point', this.#totalScore);
  }

  #onNavigationChange(activeIndex) {
    console.log('Current active index ', activeIndex);
    // main now will tell quizContent which index it should move to
    this.#quizContent.setActiveIndex(activeIndex);
  }

  #onSubmit() {
    console.log('On submit is being called from Quiz Navigation');
    this.#timer.stopRunning();
    this.#timer.hide();
    this.#quizContent.hide();
    this.#quizNavigation.hide();

    let score = this.#totalScore;
    let maxScore = this.#activeQuiz.items.length;
    let time = this.#timer.getTime();

    this.#report.show({
      score: score,
      maxScore: maxScore,
      time: time,
    });
  }

  #onQuizSelectionChange(selectedValue) {
    console.log(selectedValue);

    this.#timer.stopRunning();
    this.#report.hide();

    //to do fetch we need to know the url we arbout to fetch
    //1. construct the url so we can fetch
    //what do we want : date/javasscript-quiz.json
    let url = 'data/' + selectedValue + '.json';
    //same : let url = data/${selectedValue}.json;
    console.log(url);
    this.#totalScore = 0;
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(
        function (result) {
          console.log('Selected quiz data', result);
          this.#timer.startRunning();
          this.#activeQuiz = result;
          this.#quizNavigation.setQuizData(this.#activeQuiz);
          this.#quizContent.setQuizData(this.#activeQuiz);
          this.#quizContent.show();
          this.#quizNavigation.show();
          this.#timer.show();
        }.bind(this)
      );
  }
}

const app = new QuizApp(document.querySelector('#app'));

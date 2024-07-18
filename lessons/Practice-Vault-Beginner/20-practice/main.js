import Counter from './counter.js';

let counterApp = new Counter(document.querySelector('#app'), {
  min: -10,
  max: 10,
});

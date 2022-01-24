import * as _ from 'lodash';

function show(input) {
  const file = input.files[0];

  const reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = () => {
    const res = _.words(reader.result, /[-а-яё]{4,}/gim);
    const result = _.flow([
      _.countBy,
      _.toPairs,
      _.partial(_.orderBy, _, 1, 'desc'),
      _.partial(_.take, _, 10),
    ]);

    const txt = result(res).map(([word, num]) => `<tr><td>${word}<td>${num}`).join('');
    const out = document.getElementById('out');
    out.insertAdjacentHTML('beforeend', txt);
  };
}

console.log(show('show is working'));

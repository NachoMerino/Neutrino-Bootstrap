import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbar from './templates/navbar.html';

/* eslint-disable */
// eslint-disable-next-line or // eslint-disable-line You can also do this for one rule like // eslint-disable-next-line no-console (no-console is the name of the only rule to be turned off for the next line)
/* eslint-enable */

function loadPict(number) {
  const pict = `../img/grid${number}.jpg`;

  const card = `
<div class="card" >
  <img class="card-img-top" src="${pict}" alt="Card image cap ${number}">
  <div class="card-body">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
  return card;
}

const demoCard = `
<div class="container">
  <div class="row">
    <div class="col-sm">
      ${loadPict(1)}
    </div>
    <div class="col-sm">
      ${loadPict(2)}
    </div>
    <div class="col-sm">
      ${loadPict(3)}
    </div>
  </div>
  <div class="row">
    <div class="col-sm">
      ${loadPict(4)}
    </div>
    <div class="col-sm">
      ${loadPict(5)}
    </div>
    <div class="col-sm">
      ${loadPict(6)}
    </div>
  </div>
</div>`;

$(() => {
  $('#root')
    .append(navbar)
    .append(demoCard);
});

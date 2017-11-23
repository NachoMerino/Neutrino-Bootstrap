import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbar from './templates/navbar.html';

/* eslint-disable */
// eslint-disable-next-line or // eslint-disable-line You can also do this for one rule like // eslint-disable-next-line no-console (no-console is the name of the only rule to be turned off for the next line)
/* eslint-enable */
function loadPict(nameOfImg) {
  const pict = `../img/${nameOfImg}.jpg`;
  return pict;
}

function loadCard(nameOfImg) {
  const card = `
<div class="card" >
  <img class="card-img-top" src="${loadPict(nameOfImg)}" alt="Card image cap ${nameOfImg}">
  <div class="card-body">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
  return card;
}

function loadCarrouselImg(nameOfImg) {
  const carrouselImg = `
    <div class="col-sm">
      <img class="d-block" src="#" style="background-image: url(${loadPict(nameOfImg)});" alt="."/>
    </div>
  `;
  return carrouselImg;
}

function loadCarrouselText(textSide) {
  const carrouselText = `
    <div class="col-sm carrouseltext ${textSide}">
            <h1 class="display-3">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <p class="lead">
              <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
          </div>`;
  return carrouselText;
}

function loadCarrousel(nameOfImg, textSide) {
  if (textSide === 'right') {
    const carrouselCont = `
<div class="container-fluid">
        <div class="row">
          ${loadCarrouselImg(nameOfImg)}
          ${loadCarrouselText(textSide)}
        </div>
      </div>`;
    return carrouselCont;
  }
  const carrouselCont = `
<div class="container-fluid">
        <div class="row">
          ${loadCarrouselText(textSide)}
          ${loadCarrouselImg(nameOfImg)}
        </div>
      </div>`;
  return carrouselCont;
}

const carrousel = `
<div id="carrousel" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carrousel" data-slide-to="0" class="active"></li>
    <li data-target="#carrousel" data-slide-to="1"></li>
    <li data-target="#carrousel" data-slide-to="2"></li>
    <li data-target="#carrousel" data-slide-to="3"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      ${loadCarrousel('grid3', 'left')}
    </div>
    <div class="carousel-item">
      ${loadCarrousel('grid6', 'right')}
    </div>
    <div class="carousel-item">
      ${loadCarrousel('admiral-ackbar', 'left')}
    </div>
    <div class="carousel-item">
      ${loadCarrousel('grid5', 'right')}
    </div>
  </div>
  <a class="carousel-control-prev" href="#carrousel" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carrousel" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`;

const demoCard = `
<div id="cards" class="container">
  <div class="row">
    <div class="col-sm">
      ${loadCard('grid1')}
    </div>
    <div class="col-sm">
      ${loadCard('grid2')}
    </div>
    <div class="col-sm">
      ${loadCard('grid3')}
    </div>
  </div>
  <div class="row">
    <div class="col-sm">
      ${loadCard('grid4')}
    </div>
    <div class="col-sm">
      ${loadCard('grid5')}
    </div>
    <div class="col-sm">
      ${loadCard('grid6')}
    </div>
  </div>
</div>`;

$(() => {
  $('#root')
    .append(navbar)
    .append(carrousel)
    .append(demoCard);
});

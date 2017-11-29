import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbar from './templates/navbar.html';
import carousel from './templates/carousel.html';

/**
 * Carousel
 */


/**
 * Products
 */
const pictures = [
  'kitten-2.jpg',
  'kitten-little.jpg',
  'kitten.jpg',
  'koala.jpg',
  'pinguin.jpg',
  'sloth.jpg',
];

function mkCard(img) {
  return `
<div class="card">
  <img class="card-img-top" src="static/${img}" alt="Card image cap">
  <div class="card-body">
    <h4 class="card-title">Card title</h4>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
`;
}

const grid = `
<div class="container-fluid">
  <div class="row shop-products-row">
    <div class="col-12 col-lg-4">${mkCard(pictures[0])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[1])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[2])}</div>
  </div>
  <div class="row shop-products-row">
    <div class="col-12 col-lg-4">${mkCard(pictures[3])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[4])}</div>
    <div class="col-12 col-lg-4">${mkCard(pictures[5])}</div>
  </div>
</div>
`;


$(() => {
  $('#root')
    .append(navbar)
    .append(carousel)
    .append(grid);
  $('.carousel').carousel();
});

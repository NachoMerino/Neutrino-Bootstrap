import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import carouselTemplate from './templates/carousel.html';


$(() => {
  $('#root')
    .append(navbarTemplate)
    .append(carouselTemplate);
  $('.carousel').carousel();
});

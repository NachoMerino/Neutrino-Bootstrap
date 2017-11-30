import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import mkCarousel from './carousel';
// import mkProductCard from './products';
import cardTemplate from './templates/card-template.html';

function mkProductCard(product) {
  const $el = $(cardTemplate);
  $el.find('.card-title').text(product.name);
  $el.find('.card-img-top').attr('src', `http://via.placeholder.com/360x240?text=${product.name}`);
  $el.find('.card-text').text(`Price: ${product.price}€`);
  $el.find('div:nth-child(1)').attr('data-prod-id', product.category_id);
  return $el;
}


$(() => {
  $('#root').append(navbarTemplate);
  $.ajax('./static/categories.json')
    .done((categories) => {
      const $carousel = mkCarousel(categories);
      $('#root')
        .append($carousel);
      $carousel.carousel();
      for (let i = 0; i < categories.length; i += 1) {
        $('.navbar-nav').append(`
        <li class="nav-item">
        <a class="nav-link" data-id="${i}" href="#">${categories[i].name}</a>
      </li>`);
      }
    });
    
  $.ajax('./static/products.json')
    .done((products) => {
      $('#carousel-indicators').append('<div id="products-grid" class="container-fluid"></div>');
      $('#products-grid').append('<div class="row"></div>');
      products.forEach((product) => {
        $('.row').append(mkProductCard(product));
      });
      $(() => {
        $('.nav-link').click((e) => {
          const { target } = e;
          const dataId = target.getAttribute('data-id');
          console.log(dataId);
          $('.card[data-item-id=0]').empty();
        });
      });
    });
});

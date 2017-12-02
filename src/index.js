import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import mkCarousel from './carousel';
// import mkProductCard from './products';
import cardTemplate from './templates/card-template.html';

function mkProductCard(product) {
  const $el = $(cardTemplate);
  $el.find('div:nth-child(1)').addClass(`card ${product.category_id}`);
  $el.find('.card-title').text(product.name);
  $el.find('.card-img-top').attr('src', `http://via.placeholder.com/360x240?text=${product.name}`);
  $el.find('.card-text').text(`Price: ${product.price}€`);
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
      $('.navbar-nav').append(`
        <li class="nav-item">
        <a class="nav-link" data-id="all" href="#">Show All</a>
      </li>`);
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
      $('.nav-link, .btn').click((e) => {
        const { target } = e;
        const dataId = target.getAttribute('data-id');
        const navbarLong = $('.navbar-nav li').length - 2;
        if (dataId === 'all') {
          for (let i = 0; i < navbarLong; i += 1) {
            $(`.${i}`).parent().show();
          }
          return;
        }
        const dataIdNumb = Number(dataId);

        function checkCategorie(data, num) {
          const ammount = [];
          for (let i = 0; i < num + 1; i += 1) {
            ammount.push(i);
          }
          $(`.${data}`).parent().show();
          const index = ammount.indexOf(data);
          ammount.splice(index, 1);
          for (let i = 0; i < ammount.length; i += 1) {
            $(`.${ammount[i]}`).parent().hide();
          }
        }
        checkCategorie(dataIdNumb, navbarLong);
      });
    });
});

import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import modalTemplate from './templates/modal-template.html';
import mkCarousel from './carousel';
import mkProductCard from './products';

const apiDataBase = 'http://localhost:3000/database/';
const apiCategories = 'http://localhost:3000/categories/';

$(() => {
  // loading the NavBar
  $('#root')
    .append(navbarTemplate)
    .append(modalTemplate);
  // Ajax request to get our categories
  $.ajax(apiCategories)
    .done((categories) => {
      // creating the categories with the json file results
      const $carousel = mkCarousel(categories);
      $('#root').append($carousel);
      $carousel.carousel();
      // creating the Show All
      $('.navbar-nav').append(`
    <li class="nav-item">
    <a class="nav-link" data-id="all" href="#">All Products</a>
    </li>`);
      // Create the list of all the categories in the navbar
      for (let i = 0; i < categories.length; i += 1) {
        $('.navbar-nav').append(`
    <li class="nav-item">
    <a class="nav-link" data-id="${i}" href="#">${categories[i].name}</a>
    </li>`);
      }
    });

  // ajax request to get products

  $.ajax(apiDataBase)
    .done((products) => {
      console.log(products);
      $('#carousel-indicators').append(`<div class="infobox"><h2 id="infos"> All Products (${Object.keys(products).length})</h2></div>`);
      // when done all the indicators and the begining of the product grid is added
      $('#carousel-indicators').append('<div id="products-grid" class="container-fluid"></div>');
      $('#products-grid').append('<div class="row"></div>');
      // Creating the card for all the products that are anside the Json file
      products.forEach((product) => {
        $('.row').append(mkProductCard(product));
      });
      // click event to show all products from a expecific categorie
      $('.nav-link, .moreinfo').click((e) => {
        // targering to obtain the id of the button pressed
        const { target } = e;
        const dataId = target.getAttribute('data-id');
        $('.col-12').remove();
        products.forEach((product) => {
          $('.row').filter(`.${dataId}`).append(mkProductCard(product));
        });
        // in case "All Products" its press, show all the cards
        if (dataId === 'all') {
          for (let i = 0; i < 3; i += 1) {
            $(`.${i}`).parent().show();
          }
        }
      });
      $('[data-toggle="modal"]').click((e) => {
        const { target } = e;
        const targetId = target.getAttribute('id');
        $.ajax(apiDataBase)
          .done((modalProduct) => {
            const modalPath = modalProduct[targetId];
            $('.modal-title').text(modalPath.name);
            $('.modal-img').attr('src', modalPath.picture);
            $('.modal-body').text(modalPath.description);
            $('.modal-price').text(`Price ${modalPath.price} €`);
          });
      });
    })
    .fail(() => {});
});

import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import modalTemplate from './templates/modal-template.html';
import mkCarousel from './carousel';
import mkProductCard from './products';

$(() => {
  // loading the NavBar
  $('#root')
    .append(navbarTemplate)
    .append(modalTemplate);
  // Ajax request to get our categories
  $.ajax('./static/categories.json')
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
  $.ajax('./static/products.json')
    .done((products) => {
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
        const navbarLong = $('.navbar-nav li').length - 2;
        // in case "All Products" its press, show all the cards
        if (dataId === 'all') {
          for (let i = 0; i < navbarLong; i += 1) {
            $(`.${i}`).parent().show();
          }
          return;
        }
        // transfor dataId from number to String with number()
        const dataIdNumb = Number(dataId);

        // function to show or hide the cards with same categorie
        function checkCategorie(data, num) {
          const ammount = [];
          // populate the array with numbers that are the same as the number of categories
          for (let i = 0; i < num + 1; i += 1) {
            ammount.push(i);
          }
          // show card with the press categorie
          $(`.${data}`).parent().show();
          const check = $('.row .col-12').length;
          console.log(check);
          // find the position in the array of the pressed categorie
          const index = ammount.indexOf(data);
          // delete the pressed categorie from the array
          ammount.splice(index, 1);
          // hide all the categories that remain inside the array
          for (let i = 0; i < ammount.length; i += 1) {
            $(`.${ammount[i]}`).parent().hide();
          }
        }
        checkCategorie(dataIdNumb, navbarLong);
      });
      $('[data-toggle="modal"]').click((e) => {
        const { target } = e;
        const targetId = target.getAttribute('id');
        $.ajax('./static/products.json')
          .done((modalProduct) => {
            const modalPath = modalProduct[targetId];
            $('.modal-title').text(modalPath.name);
            $('.modal-img').attr('src', modalPath.picture);
            $('.modal-body')
              .text(`The amazing products has a cost of just....${modalPath.price}`)
              .text(modalPath.description);
          });
      });
    })
    .fail(() => {});
});

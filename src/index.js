import $ from 'jquery';
import 'bootstrap/js/src';
import './styles.scss';
import navbarTemplate from './templates/navbar.html';
import modalTemplate from './templates/modal-template.html';
import mkCarousel from './carousel';
import mkProductCard from './products';
// import mkCart from './cart';

// const apiDataBase = 'http://localhost:3000/products/';
// const apiCategories = 'http://localhost:3000/categories/';
const apiDataBase = 'http://10.0.1.24:3000/database/';
const apiCategories = 'http://10.0.1.24:3000/categories/';

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
      // add the number of items of the complete shop
      $('#carousel-indicators').append(`<div class="infobox"><h2 id="infos"> This Shop has ${Object.keys(products).length} Products</h2></div>`);
      // when done all the indicators and the begining of the product grid is added
      $('#carousel-indicators').append('<div id="products-grid" class="container-fluid"></div>');
      $('#products-grid').append('<div class="row"></div>');
      $('.navbar-nav').find('li:first').addClass('active');
      // Creating the card for all the products that are anside the Json file
      products.forEach((product) => {
        $('.row').append(mkProductCard(product));
      });
      // click event to show all products from a expecific categorie
      $('.nav-link, .moreinfo').click((button) => {
        // targering to obtain the id of the button pressed
        button.preventDefault();
        const { target } = button;
        const dataId = target.getAttribute('data-id');
        // make active the category we are watching
        $('.nav-link').closest('ul').find('.active').removeClass('active');
        $(target).closest('li').addClass('active');
        const navbarLong = $('.navbar-nav li').length - 2;
        // in case "All Products" its press, show all the cards
        if (dataId === 'all') {
          $('.row').empty();
          products.forEach((product) => {
            $('.row').append(mkProductCard(product));
          });
          // show the number of actual products
          $('.infobox').empty();
          const numItems = $('.row div:nth-child(2)').length;
          $('.infobox').html(`<h2 id="infos"> This Shop has ${numItems - 1} Products</h2>`);
          return;
        }
        // transform dataId from String to Number with number()
        const dataIdNumb = Number(dataId);
        // function to show or hide the cards with same categorie
        function checkCategorie(data, num, productsToGo) {
          // clean the products
          $('.row').empty();
          productsToGo.forEach((product) => {
            $('.row').append(mkProductCard(product));
          });
          const ammount = [];
          // populate the array with numbers that are the same as the number of categories
          for (let i = 0; i < num + 1; i += 1) {
            ammount.push(i);
          }
          // show card with the press categorie
          $(`.${data}`).parent().append();
          // find the position in the array of the pressed categorie
          const index = ammount.indexOf(data);
          // delete the pressed categorie from the array
          ammount.splice(index, 1);
          // hide all the categories that remain inside the array
          for (let i = 0; i < ammount.length; i += 1) {
            $(`.${ammount[i]}`).parent().detach();
          }
          // make active the clicked button
          const myCategory = $('.navbar-nav').find('.active').text();
          $('.infobox').empty();
          const numItems = $('.row div:nth-child(2)').length;
          $('.infobox').html(`<h2 id="infos"> Total Products in ${myCategory}: ${numItems - 1}</h2>`);
        }
        checkCategorie(dataIdNumb, navbarLong, products);
      });
      $('[data-toggle="modal"]').click((event) => {
        event.preventDefault();
        const { target } = event;
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

      // My Cart code start here

      const shoppingCart = $('.shopping-cart-items');
      $('.shopping-cart').hide();
      const totalPrice = [];
      $('.addItems').click((addItem) => {
        /* eslint-disable */
        openCart();
        /* eslint-enable */
        $('.shopping-cart').show();
        addItem.preventDefault();
        const { target } = addItem;
        const addedItem = target.getAttribute('id');
        $.ajax(apiDataBase)
          .done((cartProduct) => {
            const cartPath = cartProduct[addedItem];
            let items = {
              name: cartPath.name,
              price: cartPath.price,
              quantity: 1,
              picture: cartPath.picture,
            };
            if (localStorage.getItem(addedItem) !== null) {
              const localStorQuantity = JSON.parse(localStorage.getItem(addedItem));
              let counterQuantity = localStorQuantity.quantity;
              items = {
                name: cartPath.name,
                price: cartPath.price,
                quantity: counterQuantity += 1,
                picture: cartPath.picture,
              };
            }
            localStorage.setItem(addedItem, JSON.stringify(items));
            const localStorPicture = JSON.parse(localStorage.getItem(addedItem));
            const localStorName = JSON.parse(localStorage.getItem(addedItem));
            const localStorPrice = JSON.parse(localStorage.getItem(addedItem));
            const localStorQuantity = JSON.parse(localStorage.getItem(addedItem));
            if (localStorQuantity.quantity === 1) {
              shoppingCart.append(`
              <li id="${addedItem}">
                <button type="button" class="close removeItemButton" aria-label="Close">
                <span data-id="${addedItem}" aria-hidden="true">&times;</span>
                </button>
                <img src="${localStorPicture.picture}">
                <h3 class="item-name">${localStorName.name}</h3>
                <h6 class="item-price">${localStorPrice.price} €</h6>
                <h6 class="item-quantity-${addedItem}">Quantity: ${localStorQuantity.quantity}</h6>
              </li>`);
            } else {
              // const myCategory = $('.navbar-nav').find('.active').text();
              $(`.item-quantity-${addedItem}`).html(`<h6 class="item-quantity-${addedItem}">Quantity: ${localStorQuantity.quantity}</h6>`);
            }

            $('.lighter-text').empty();
            totalPrice.push(cartPath.price);
            const totalPriceSum = totalPrice.reduce((a, b) => a + b, 0);
            $('.lighter-text').append(`Total price: ${totalPriceSum} €`);
            // amount of   items from localstorage
            const shoppingCartLength = $('.shopping-cart-items li');
            $('.badge').text(shoppingCartLength.length);
            $('.removeItemButton').click((id) => {
              /* eslint-disable */
              const { target } = id;
              const idToDelete = target.getAttribute('data-id');
              /* eslint-enable */
              localStorage.removeItem(idToDelete);
              $(`#${idToDelete}`).remove();
            });
          });
      });

      function openCart() {
        const shoppingCartLength = $('.shopping-cart-items li');
        // reload localstorage
        if (shoppingCartLength.length === 0) {
          const numItems = $('.row div:nth-child(2)').length;
          for (let i = 0; i < numItems; i += 1) {
            if (localStorage.getItem(i) !== null) {
              const localStorPicture = JSON.parse(localStorage.getItem(i));
              const localStorName = JSON.parse(localStorage.getItem(i));
              const localStorPrice = JSON.parse(localStorage.getItem(i));
              const localStorQuantity = JSON.parse(localStorage.getItem(i));
              shoppingCart.append(`
          <li>
            <button type="button" class="close removeItemButton" aria-label="Close">
            <span data-id="${i}" aria-hidden="true">&times;</span>
            </button>
            <img src="${localStorPicture.picture}">
            <h3 class="item-name">${localStorName.name}</h3>
            <h6 class="item-price">${localStorPrice.price} €</h6>
            <h6 class="item-quantity-${i}">Quantity: ${localStorQuantity.quantity}</h6>
          </li>`);
            }
          }
        }
        // loaded
        $('.shopping-cart').toggle();
      }
      $('.right').click(() => {
        openCart();
      });
    })
    .fail(() => {});
});

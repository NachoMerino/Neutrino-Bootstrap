import $ from 'jquery';
import cardTemplate from './templates/card-template.html';

export default function mkProductCard(product) {
  const $el = $(cardTemplate);
  $el.find('button').attr('id', product.id);
  $el.find('div:nth-child(1)').addClass(`card ${product.category_id}`);
  $el.find('.card-title').text(product.name);
  $el.find('.card-img-top').attr('style', `background-image: url(${product.picture});background-size: cover;background-position: center;`);
  $el.find('.card-text').text(`Price: ${product.price}€`);
  return $el;
}

// $el.find('.card-img-top').attr('src', product.picture);

import $ from 'jquery';
import cardTemplate from './templates/card-template.html';

export default function mkProductCard(product) {
  const $el = $(cardTemplate);
  $el.find('.card-title').text(product.name);
  $el.find('.card-img-top').attr('src', `http://via.placeholder.com/360x240?text=${product.name}`);
  $el.find('.card-text').text(`Price: ${product.price}€`);
  $el.find('div:nth-child(1)').attr('data-id', product.category_id);
  return $el;
}
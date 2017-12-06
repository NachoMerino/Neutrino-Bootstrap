import $ from 'jquery';
import cardTemplate from './templates/card-template.html';

export default function mkProductCard(product) {
  const $el = $(cardTemplate);
  $el.find('button').attr('id', product.id);
  $el.find('div:nth-child(1)').addClass(`card ${product.category_id}`);
  $el.find('.card-title').text(product.name);
  $el.find('.card-img-top').attr('src', `http://via.placeholder.com/360x240?text=${product.name}`);
  $el.find('.card-text').text(`Price: ${product.price}€`);
  return $el;
}

import $ from 'jquery';
import './styles.css';

/* eslint-disable */
// eslint-disable-next-line or // eslint-disable-line You can also do this for one rule like // eslint-disable-next-line no-console (no-console is the name of the only rule to be turned off for the next line)
/* eslint-enable */

$(() => {
  $('body').html('<h1>Hello F*^&ing World!</h1><h2>GrowME</h2><button id="press">HERE</button>');
  $('#press').click(() => {
    const div = $('h2');
    div.animate({ fontSize: '3em', opacity: '0.4' }, 'slow');
  });
});

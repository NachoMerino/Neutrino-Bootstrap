create a folder (and enter it!)
npm init (will create the package.json)
when asked use 'src/index.js' as entry point
install the neutrino dev dependencies: npm i -D neutrino neutrino-preset-web
inside your project folder, create a folder called src with a index.js inside it
edit the package.json file and add the start and build scripts like
"build": "neutrino build --use neutrino-preset-web",
"start": "neutrino start --use neutrino-preset-web",
run the server with npm run start (or actually just npm start)

check that everything went smoothly in your browser

stop the server (CTRL+C)

install jQuery with npm i jquery (no -D because it is not a development dependency)

in your src/index.js import jQuery like: import $ from 'jquery';

restart the server (you know how to do it)

add something like:

$(() => {
  $('body').text('Hello World!');
});
and look at your browser if the text appears in the body

create a styles.css (inside the src folder) with body background-color whatever

add your CSS file by using import './styles.css';

look at your browser ;) (fancy.. hueeee)

linting is your friend! add the neutrino-preset-airbnb-base (as dev dependency) with npm i -D neutrino-preset-airbnb-base

remove the --use neutrino-preset-web from your package.json

create a file called .neutrinorc.js at the root of your project with the following content:

module.exports = {
  use: [
    ['neutrino-preset-airbnb-base'], // first the linting!
    ['neutrino-preset-web'], // then the compilation
  ],
};
linting can be a pain in the keyboard, luckily they are ways to disable it where it annoys (but! try to avoid that... please)

/* eslint-disable */ and /* eslint-enable */
// eslint-disable-next-line or // eslint-disable-line You can also do this for one rule like // eslint-disable-next-line no-console (no-console is the name of the only rule to be turned off for the next line)
now, in your browser, have a look at the <title> tag of the <head>, it should be something like Webpack App and this is not great.
Instead you want to have something like My App and to do so you can change a bit your .neutrinorc.js file the following way:

module.exports = {
  use: [
    ['neutrino-preset-airbnb-base'],
    [
      'neutrino-preset-web',
      {
        html: {
          title: 'My App'
        }
      }
    ],
  ]
};
In order to find additional configuration you will have to Read The Fine Manual (starting at https://neutrino.js.org/presets/neutrino-preset-web/ )

if you need to customize the HTML even further, you may want to find the template which used by Neutrino / Webpack to render the index.html It took me a bit of time but after following the white rabbit. I first looked at the neutrino-middleware-html-template (which was mentioned in the docs of the neutrino-preset-web).
This lead me to the html-webpack-template module and I found the template here: https://github.com/jaketrent/html-webpack-template/blob/master/index.ejs

Copy the .ejs file in your src directory (rename it if you want, I did it and called it html.template.ejs)

In your .neutrinorc.js file, change the settings to make them look like:

const path = require('path');

module.exports = {
  use: [
    ['neutrino-preset-airbnb-base'],
    [
      'neutrino-preset-web',
      {
        html: {
          template: path.join(__dirname, 'src/html.template.ejs'),
          title: 'My App',
        }
      }
    ],
  ]
};
Make changes in the template (be careful with what you change though)

restart your server



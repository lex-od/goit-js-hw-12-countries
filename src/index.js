import './styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import { error, defaults as pnDefaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryListTmpl from './data/country-list.hbs';

pnDefaults.delay = 3000;

const MAX_DISPLAY_COUNTRIES = 10;

const refs = {
  countryInput: document.querySelector('#country-input'),
  countryListWr: document.querySelector('#country-list-wrapper'),
  countryList: document.querySelector('#country-list-wrapper > ul'),
  countryCardWr: document.querySelector('#country-card-wrapper'),
};

refs.countryInput.addEventListener('input', debounce(onCounryInput, 500));

function onCounryInput(e) {
  const country = e.target.value;
  if (!country) {
    return;
  }
  fetchCountries(country)
    .then(countries => {
      if (countries.length > MAX_DISPLAY_COUNTRIES) {
        error(
          'Слишком большое количество результатов. Пожалуйста, введите более специфичный запрос!',
        );

        console.log('c > 10');
      } else if (countries.length > 1) {
        refs.countryList.innerHTML = countryListTmpl(countries);

        console.log('c > 1');
      } else if ((countries.length = 1)) {
        //

        console.log('c = 1');
      }
    })
    .catch(console.error);
}

import './styles.css';
import fetchCountries from './js/fetchCountries';
import countryListTmpl from './data/country-list.hbs';
import countryCardTmpl from './data/country-card.hbs';

import debounce from 'lodash.debounce';
import { error as pnError, defaults as pnDefaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

pnDefaults.delay = 3000;
const MAX_DISPLAY_COUNTRIES = 10;

const refs = {
  countryInput: document.querySelector('#country-input'),
  contentWrapper: document.querySelector('#content-wrapper'),
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
        pnError(
          'Слишком большое количество результатов. Пожалуйста, введите более специфичный запрос!',
        );
      } else if (countries.length > 1) {
        refs.contentWrapper.innerHTML = countryListTmpl(countries);
      } else if (countries.length === 1) {
        refs.contentWrapper.innerHTML = countryCardTmpl(countries[0]);
      }
    })
    .catch(console.error);
}

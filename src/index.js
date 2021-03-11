import './styles.css';
import fetchCountries from './js/fetchCountries';
import countryListTmpl from './data/country-list.hbs';
import countryCardTmpl from './data/country-card.hbs';

import debounce from 'lodash.debounce';
import { error as pnError, defaults as pnDefaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

pnDefaults.delay = 3000;
const MAX_DISPLAY_RESULTS = 10;

const refs = {
  countryInput: document.querySelector('#country-input'),
  contentWrapper: document.querySelector('#content-wrapper'),
};

refs.countryInput.addEventListener('input', debounce(onCounryInput, 500));

function onCounryInput(e) {
  const country = e.target.value;
  if (!country) {
    clearContent();
    return;
  }

  fetchCountries(country)
    .then(countries => {
      clearContent();

      if (countries.length > MAX_DISPLAY_RESULTS) {
        notifyExcessResults();
      } else if (countries.length > 1) {
        renderCountryList(countries);
      } else if (countries.length === 1) {
        renderCountryCard(countries[0]);
      }
    })
    .catch(console.error);
}

function renderCountryList(countries) {
  refs.contentWrapper.innerHTML = countryListTmpl(countries);
}

function renderCountryCard(country) {
  refs.contentWrapper.innerHTML = countryCardTmpl(country);
}

function clearContent() {
  refs.contentWrapper.innerHTML = '';
}

function notifyExcessResults() {
  pnError(
    'Слишком большое количество результатов. Пожалуйста, введите более специфичный запрос!',
  );
}

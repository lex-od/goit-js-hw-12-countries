export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(r => {
      if (!r.ok) {
        throw 'Ошибка получения данных!';
      }

      return r.json();
    })
    .catch(console.error);
}

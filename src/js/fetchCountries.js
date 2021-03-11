export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(
    response => {
      if (!response.ok) {
        throw 'Ошибка получения данных!';
      }

      return response.json();
    },
  );
}

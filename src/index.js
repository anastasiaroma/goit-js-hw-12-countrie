import fetchCountries from './fetchCountries.js';
import countryMarkup from './tamplates/country.hbs';
import countriesMarkup from './tamplates/countries.hbs';
import { info, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import { debounce } from 'lodash';

const inputRef = document.querySelector('.js_input');
const listRef = document.querySelector('.js_list');
const markup = document.querySelector('.js_markup');

inputRef.addEventListener('input', debounce(onInput, 500));

function onInput(e) {
  const userCountry = e.target.value;
  if (userCountry) {
    listRef.innerHTML = '';
    markup.innerHTML = '';  
  }
   fetchCountries(userCountry)
   .then(renderMarkup)
    .catch(onFetchError);
};


function renderMarkup(data) {
   if (data.length === 1) {
        return (markup.innerHTML = countryMarkup(data[0]));
      }

      if (data.length > 1 && data.length < 10) {
        return (listRef.innerHTML = countriesMarkup(data));
      }
      if (data.length > 10) {
         onFetchError(error,
            'To many matches found. Please enter more specific query!');
         return;
      }
      else {
         onFetchError(info,
            'No matches found!');
       }
      }
    
function onFetchError(typeInfo ,text) {
   listRef.innerHTML = ''
  typeInfo({
     text: `${text}`,
     delay: 1000,
     closerHover: true,
    animation: 'fade',
     animateSpeed: 'normal',
    color: 'red',
  });
}
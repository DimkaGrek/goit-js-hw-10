import SlimSelect from 'slim-select';
import { Notify } from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';

const mySelect = document.querySelector('.breed-select');

const select = new SlimSelect({
  select: mySelect,
});

const slimSelect = document.querySelector('.ss-main');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

hide(slimSelect);
hide(error);

function show(selector) {
  selector.classList.remove('hide');
}

function hide(selector) {
  selector.classList.add('hide');
}

Notify.init({
  position: 'left-top',
  fontSize: '20px',
  width: '350px',
  timeout: 5000,
});

const getBreeds = async () => {
  const data = await fetchBreeds();
  if (data) {
    hide(loader);
    show(slimSelect);

    select.addOption({ text: 'Select cat breed', value: '' });
    data.forEach(elem => {
      select.addOption({ text: elem.name, value: elem.id });
    });

    mySelect.addEventListener('change', async e => {
      hide(catInfo);
      if (e.target.value !== '') {
        show(loader);

        const catData = await fetchCatByBreed(e.target.value);

        hide(loader);

        if (catData) {
          show(catInfo);

          const cat = catData[0];
          const catDescr = cat.breeds[0];

          let catMarkup = `<img src="${cat.url}" alt="${catDescr.name}" width="500">
                            <div>
                                <h2>${catDescr.name}</h2>
                                <p>${catDescr.description}</p>
                                <p><span class="temp-span">Temperament: </span>${catDescr.temperament}</p>
                            </div>
                            `;
          catInfo.innerHTML = catMarkup;
        } else {
          Notify.failure('Oops! Something went wrong! Try reloading the page!');
        }
      }
    });
  } else {
    hide(loader);
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  }
};

getBreeds();

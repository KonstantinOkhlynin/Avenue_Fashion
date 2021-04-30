import "./style.css";
import {initialCards} from './js/arrays/array';
import {buttonLO, buttonNY, buttonPA, storesInfoMap, storesinfoTitle, storesinfoSubtitle, storesInfoText, storesInfolink} from './js/constants/constant';

function stores (num) {
    storesInfoMap.src = initialCards[num].map;
    storesinfoTitle.textContent = initialCards[num].title;
    storesinfoSubtitle.textContent = initialCards[num].subtitle;
    storesInfoText.textContent = initialCards[num].text;
    storesInfolink.href = initialCards[num].link_map;
    storesInfolink.textContent = initialCards[num].link_text;
}

function nextStores(event) {
    if (event.target.classList.contains('stores__button-js-LO')){
      stores (0)
    } else if (event.target.classList.contains('stores__button-js-NY')) {
      stores (1)
    } else if (event.target.classList.contains('stores__button-js-PA')) {
      stores (2)
    }
  }



document.addEventListener('click', nextStores);
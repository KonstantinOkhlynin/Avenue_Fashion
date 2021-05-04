import "./style.css";
import {initialCards, womensMenu} from './js/arrays/arrays';
import {Modal} from './js/classes/Modal.js';
import {storesInfoMap, storesinfoTitle, storesinfoSubtitle, storesInfoText, storesInfolink, headerWomensJs, headerLocalstoresJs, headerLookbookjs} from './js/constants/constants';
const storesButtonJsLO = document.querySelector('.stores__button-js-LO')
const storesButtonjsNY = document.querySelector('.stores__button-js-NY')
const storesButtonJsPA = document.querySelector('.stores__button-js-PA')
const storesContainer = document.querySelector('.stores__container')

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



  // const storesLO = new Stores(storesButtonJsLO,initialCards, storesContainer)
  // storesLO.listen(0)

  // const storesNY = new Stores(storesButtonjsNY,initialCards)
  // storesNY.listen(1)
  // const storesPA = new Stores(storesButtonJsPA,initialCards)
  // storesPA.listen(2)


  const modalWomens = new Modal(headerWomensJs)
  modalWomens.addModal(womensMenu);

  const modalLocalstores = new Modal(headerLocalstoresJs)
  modalLocalstores.addModal(womensMenu);

  const modalLookbook = new Modal(headerLookbookjs)
  modalLookbook.addModal(womensMenu);




document.addEventListener('click', nextStores);
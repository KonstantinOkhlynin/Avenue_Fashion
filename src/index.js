import "./style.css";
import { Slider } from './js/classes/Slider.js';
import {
  initialCards,
  womensMenu,
  lookbookMenu
} from './js/arrays/arrays';
import { Stores } from './js/classes/Stores.js';
import { Modal } from './js/classes/Modal.js';
import { Popup } from './js/classes/popup.js';
import { Zoom } from './js/classes/Zoom.js';
import {
  storesButtonJsLO,
  storesButtonjsNY,
  storesButtonJsPA,
  headerWomensJs,
  headerLookbookjs,
  mobileMenu,
  headerMenuIcon,
  photoSliderOne,
  zoomer,
  photoSliderTwo,
  zoomertwo,
  headerMensJs
} from './js/constants/constants';

const storesLo = new Stores(storesButtonJsLO, initialCards)
storesLo.listener(0);
const storesNY = new Stores(storesButtonjsNY, initialCards)
storesNY.listener(1);
const storesPa = new Stores(storesButtonJsPA, initialCards)
storesPa.listener(2);

const mobileMenuPopup = new Popup(mobileMenu)
headerMensJs
const modalWomens = new Modal(headerWomensJs)
modalWomens.addModal(womensMenu);

const modalMens = new Modal(headerMensJs)
modalMens.addModal(womensMenu);

const modalLookbook = new Modal(headerLookbookjs)
modalLookbook.addModal(lookbookMenu);

headerMenuIcon.addEventListener('click', () => {
  mobileMenuPopup.open()
})




const zoomeOne = new Zoom(photoSliderOne,zoomer)
zoomeOne.listener();

const zoomeTwo = new Zoom(photoSliderTwo,zoomertwo)
zoomeTwo.listener();

if (document.querySelector('.main-js')) {
document.addEventListener('DOMContentLoaded', function () {
  const sliderProduct = new Slider('.slider', {
    loop: true
  });
});



const ratings = document.querySelectorAll('.rating')
if (ratings.length > 0) {
  initRatings(ratings)
}

function initRatings (rating)  {
  let ratingActive, ratingValue
for (let i = 0; i < rating.length; i++) {
  const rating = ratings[i]
  initRating(rating)
}

  function initRating (rating) {
    initRatingVars(rating)
    setRatingActiveWidth()
    if (rating.classList.contains('rating_set')) {
      setRating(rating)
    }
  }

  function initRatingVars (rating) {
    ratingActive = rating.querySelector('.rating__active')
    ratingValue = rating.querySelector('.rating__value')
  }

  function setRatingActiveWidth (index = ratingValue.innerHTML)  {
    const ratingActiveWidth = index / 0.05
    ratingActive.style.width = `${ratingActiveWidth}%`
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll('.rating__item')
    for (let i = 0; i < ratingItems.length; i++) {
      const ratingItem = ratingItems[i]
      ratingItem.addEventListener('mouseenter', () => {
        initRatingVars(rating)
        setRatingActiveWidth(ratingItem.value)
      })
      ratingItem.addEventListener('mouseleave', () => {
        setRatingActiveWidth()
      })
      ratingItem.addEventListener('click', () => {
        initRatingVars(rating)
        setRatingActiveWidth()
        if (rating.dataset.ajax) {
          setRatingValue(ratingItem.value, rating)
        } else {
          ratingValue.innerHTML = i + 1
          setRatingActiveWidth()
        }
      })
    }
  }

  function setRatingValue (value,rating) {
    if (!rating.classList.contains('rating_sending')){
      rating.classList.add('rating_sending')
      fetch('https://jsonplaceholder.typicode.com/todos/5', {
      }).then(res => {
        if (res.ok) {
          return res.json()
        }
      }).then((res) => {
        console.log(res)
          const newRating = res.id
          ratingValue.innerHTML = newRating
          setRatingActiveWidth()
          rating.classList.remove('rating_sending')
      }).catch((err) => {
          alert(err)
          rating.classList.remove('rating_sending')

      }

      )

    }
  }



  // BUTTON
const descriptionButton = document.querySelector('.product__description-button-js')
const videoButton = document.querySelector('.product__video-button-js')
const sizeButton = document.querySelector('.product__size-button-js')
const deliveryButton = document.querySelector('.product__delivery-button-js')
const reviewsButton = document.querySelector('.product__reviews-button-js')

// CONTAINER
const descriptionContainer = document.querySelector('.product__description-container-js')
const videoContainer = document.querySelector('.product__video-container-js')
const sizeContainer = document.querySelector('.product__size-container-js')
const deliveryContainer = document.querySelector('.product__delivery-container-js')
const reviewsContainer = document.querySelector('.product__reviews-container-js')

descriptionButton.addEventListener('click', () => {
  descriptionContainer.style.display = 'block'
  videoContainer.style.display = 'none'
  sizeContainer.style.display = 'none'
  deliveryContainer.style.display = 'none'
  reviewsContainer.style.display = 'none'
})

videoButton.addEventListener('click', () => {
  descriptionContainer.style.display = 'none'
  videoContainer.style.display = 'flex'
  sizeContainer.style.display = 'none'
  deliveryContainer.style.display = 'none'
  reviewsContainer.style.display = 'none'
})

sizeButton.addEventListener('click', () => {
  descriptionContainer.style.display = 'none'
  videoContainer.style.display = 'none'
  sizeContainer.style.display = 'block'
  deliveryContainer.style.display = 'none'
  reviewsContainer.style.display = 'none'
})

deliveryButton.addEventListener('click', () => {
  descriptionContainer.style.display = 'none'
  videoContainer.style.display = 'none'
  sizeContainer.style.display = 'none'
  deliveryContainer.style.display = 'block'
  reviewsContainer.style.display = 'none'
})

reviewsButton.addEventListener('click', () => {
  descriptionContainer.style.display = 'none'
  videoContainer.style.display = 'none'
  sizeContainer.style.display = 'none'
  deliveryContainer.style.display = 'none'
  reviewsContainer.style.display = 'block'
})


const inputNumber = document.querySelector('.product__input-number')
const inputNumberButtonTop = document.querySelector('.product__input-number-button-top')
const inputNumberButtonBottom = document.querySelector('.product__input-number-button-bottom')

inputNumberButtonTop.addEventListener('click', () => {
  inputNumber.stepUp()
})

inputNumberButtonBottom.addEventListener('click', () => {
  inputNumber.stepDown()
})
}




}







if (document.querySelector('.main-js-one')) {
const categoryCardOne = document.querySelector('.category__card-one-js')
const categoryCardTwo = document.querySelector('.category__card-two-js')
const categoryCardTree = document.querySelector('.category__card-tree-js')
const categoryCardFour = document.querySelector('.category__card-four-js')


const cardOverflowImgJsOne = document.querySelector('.card-overflow__img-js-one')
const cardOverflowImgJsTwo = document.querySelector('.card-overflow__img-js-two')

const cardOverflowImgJsTree = document.querySelector('.card-overflow__img-js-tree')
const cardOverflowImgJsFour = document.querySelector('.card-overflow__img-js-four')

const cardOverflowImgJsFive = document.querySelector('.card-overflow__img-js-five')
const cardOverflowImgJsSix = document.querySelector('.card-overflow__img-js-six')

const cardOverflowImgJsSeven = document.querySelector('.card-overflow__img-js-seven')
const cardOverflowImgJsEight = document.querySelector('.card-overflow__img-js-eight')


cardOverflowImgJsOne.addEventListener('click', () => {
  categoryCardOne.style.backgroundImage = `url('${cardOverflowImgJsOne.dataset.src}')`
})

cardOverflowImgJsTwo.addEventListener('click', () => {
  categoryCardOne.style.backgroundImage = `url('${cardOverflowImgJsTwo.dataset.src}')`
})





cardOverflowImgJsTree.addEventListener('click', () => {
  categoryCardTwo.style.backgroundImage = `url('${cardOverflowImgJsOne.dataset.src}')`
})

cardOverflowImgJsFour.addEventListener('click', () => {
  categoryCardTwo.style.backgroundImage = `url('${cardOverflowImgJsTwo.dataset.src}')`
})







cardOverflowImgJsFive.addEventListener('click', () => {
  categoryCardTree.style.backgroundImage = `url('${cardOverflowImgJsOne.dataset.src}')`
})

cardOverflowImgJsSix.addEventListener('click', () => {
  categoryCardTree.style.backgroundImage = `url('${cardOverflowImgJsTwo.dataset.src}')`
})






cardOverflowImgJsSeven.addEventListener('click', () => {
  categoryCardFour.style.backgroundImage = `url('${cardOverflowImgJsOne.dataset.src}')`
})

cardOverflowImgJsEight.addEventListener('click', () => {
  categoryCardFour.style.backgroundImage = `url('${cardOverflowImgJsTwo.dataset.src}')`
})





}




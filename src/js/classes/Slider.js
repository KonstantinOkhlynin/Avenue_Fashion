import {
WRAPPER_SELECTOR,
ITEMS_SELECTOR,
ITEM_SELECTOR,
CONTROL_CLASS,
SELECTOR_PREV,
SELECTOR_NEXT,
SELECTOR_INDICATOR,
SLIDER_TRANSITION_OFF,
CLASS_CONTROL_HIDE,
CLASS_ITEM_ACTIVE,
CLASS_INDICATOR_ACTIVE
} from '../constants/constants.js';

function hasTouchDevice() {
  return !!('ontouchstart' in window || navigator.maxTouchPoints);
}

function hasElementInVew($elem) {
  const rect = $elem.getBoundingClientRect();
  const windowHeight = window.innerHeight ||
    document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const vertInView = rect.top <= windowHeight && rect.top + rect.height >= 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;
  return vertInView && horInView;
}

export class Slider {
  constructor(selector, config) {
    // элементы слайдера
    const $root = typeof selector === 'string' ?
  document.querySelector(selector) : selector;
this._$root = $root;
this._$wrapper = $root.querySelector(WRAPPER_SELECTOR);
this._$items = $root.querySelector(ITEMS_SELECTOR);
this._$itemList = $root.querySelectorAll(ITEM_SELECTOR);
this._$controlPrev = $root.querySelector(SELECTOR_PREV);
this._$controlNext = $root.querySelector(SELECTOR_NEXT);
this._$indicatorList = $root.querySelectorAll(SELECTOR_INDICATOR);
// экстремальные значения слайдов
this._minOrder = 0;
this._maxOrder = 0;
this._$itemWithMinOrder = null;
this._$itemWithMaxOrder = null;
this._minTranslate = 0;
this._maxTranslate = 0;
// направление смены слайдов (по умолчанию)
this._direction = 'next';
// determines whether the position of item needs to be determined
this._balancingItemsFlag = false;
this._activeItems = [];
this._isTouchDevice = hasTouchDevice();
// текущее значение трансформации
this._transform = 0;
// swipe параметры
this._hasSwipeState = false;
this.__swipeStartPos = 0;
// slider properties
this._transform = 0; // текущее значение трансформации
this._intervalId = null;
// configuration of the slider
this._config = {
  loop: true,
  autoplay: false,
  interval: 5000,
  refresh: true,
  swipe: true,
};
for (let key in config) {
  if (this._config.hasOwnProperty(key)) {
    this._config[key] = config[key];
  }
}
// create some constants
const $itemList = this._$itemList;
const widthItem = $itemList[0].offsetWidth;
const widthWrapper = this._$wrapper.offsetWidth;
const itemsInVisibleArea = Math.round(widthWrapper / widthItem);
// initial setting properties
this._widthItem = widthItem;
this._widthWrapper = widthWrapper;
this._itemsInVisibleArea = itemsInVisibleArea;
this._transformStep = 100 / itemsInVisibleArea;
// initial setting order and translate items
for (let i = 0, length = $itemList.length; i < length; i++) {
  $itemList[i].dataset.index = i;
  $itemList[i].dataset.order = i;
  $itemList[i].dataset.translate = 0;
  if (i < itemsInVisibleArea) {
    this._activeItems.push(i);
  }
}
if (this._config.loop) {
  // перемещаем последний слайд перед первым
  const count = $itemList.length - 1;
  const translate = -$itemList.length * 100;
  $itemList[count].dataset.order = -1;
  $itemList[count].dataset.translate = -$itemList.length * 100;
  $itemList[count].style.transform = 'translateX(' + translate + '%)';
  this.__refreshExtremeValues();
} else {
  if (this._$controlPrev) {
    this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);
  }
}
this._setActiveClass();
this._addEventListener();
this._updateIndicators();
this._autoplay();
}

// подключения обработчиков событий для слайдера
_addEventListener = function() {
  const $root = this._$root;
  const $items = this._$items;
  const config = this._config;
  function onClick(e) {
    const $target = e.target;
    this._autoplay('stop');
    if ($target.classList.contains(CONTROL_CLASS)) {
      e.preventDefault();
      this._direction = $target.dataset.slide;
      this._move();
    } else if ($target.dataset.slideTo) {
      const index = parseInt($target.dataset.slideTo);
      this._moveTo(index);
    }
    if (this._config.loop) {
      this._autoplay();
    }
  }
  function onMouseEnter(e) {
    this._autoplay('stop');
  }
  function onMouseLeave(e) {
    this._autoplay();
  }
  function onTransitionStart() {
    this._balancingItemsFlag = true;
    window.requestAnimationFrame(this._balancingItems.bind(this));
  }
  function onTransitionEnd() {
    this._balancingItemsFlag = false;
  }
  function onResize() {
    window.requestAnimationFrame(this._refresh.bind(this));
  }
  function onSwipeStart(e) {
    this._autoplay('stop');
    const event = e.type.search('touch') === 0 ? e.touches[0] : e;
    this._swipeStartPos = event.clientX;
    this._hasSwipeState = true;
  }
  function onSwipeEnd(e) {
    if (!this._hasSwipeState) {
      return;
    }
    const event = e.type.search('touch') === 0 ? e.changedTouches[0] : e;
    const diffPos = this._swipeStartPos - event.clientX;
    if (diffPos > 50) {
      this._direction = 'next';
      this._move();
    } else if (diffPos < -50) {
      this._direction = 'prev';
      this._move();
    }
    this._hasSwipeState = false;
    if (this._config.loop) {
      this._autoplay();
    }
  }
  function onDragStart(e) {
    e.preventDefault();
  }
  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this._autoplay('stop');
    } else if (document.visibilityState === 'visible') {
      if (this._config.loop) {
        this._autoplay();
      }
    }
  }

  $root.addEventListener('click', onClick.bind(this));
  $root.addEventListener('mouseenter', onMouseEnter.bind(this));
  $root.addEventListener('mouseleave', onMouseLeave.bind(this));
  // on resize
  if (config.refresh) {
    window.addEventListener('resize', onResize.bind(this));
  }
  // on transitionstart and transitionend
  if (config.loop) {
    $items.addEventListener('transitionstart', onTransitionStart.bind(this));
    $items.addEventListener('transitionend', onTransitionEnd.bind(this));
  }
  // on touchstart and touchend
  if (config.swipe) {
    $root.addEventListener('touchstart', onSwipeStart.bind(this));
    $root.addEventListener('mousedown', onSwipeStart.bind(this));
    document.addEventListener('touchend', onSwipeEnd.bind(this));
    document.addEventListener('mouseup', onSwipeEnd.bind(this));
  }
  $root.addEventListener('dragstart', onDragStart.bind(this));
  // при изменении активности вкладки
  document.addEventListener('visibilitychange', onVisibilityChange.bind(this));
};



// update values of extreme properties
__refreshExtremeValues = function() {
  const $itemList = this._$itemList;
  this._minOrder = +$itemList[0].dataset.order;
  this._maxOrder = this._minOrder;
  this._$itemByMinOrder = $itemList[0];
  this._$itemByMaxOrder = $itemList[0];
  this._minTranslate = +$itemList[0].dataset.translate;
  this._maxTranslate = this._minTranslate;
  for (let i = 0, length = $itemList.length; i < length; i++) {
    const $item = $itemList[i];
    const order = +$item.dataset.order;
    if (order < this._minOrder) {
      this._minOrder = order;
      this._$itemByMinOrder = $item;
      this._minTranslate = +$item.dataset.translate;
    } else if (order > this._maxOrder) {
      this._maxOrder = order;
      this._$itemByMaxOrder = $item;
      this._minTranslate = +$item.dataset.translate;
    }
  }
};



// update position of item
_balancingItems = function() {
  if (!this._balancingItemsFlag) {
    return;
  }
  const $wrapper = this._$wrapper;
  const $wrapperClientRect = $wrapper.getBoundingClientRect();
  const widthHalfItem = $wrapperClientRect.width / this._itemsInVisibleArea / 2;
  const count = this._$itemList.length;
  let translate;
  var clientRect;
  if (this._direction === 'next') {
    const wrapperLeft = $wrapperClientRect.left;
    const $min = this._$itemByMinOrder;
    translate = this._minTranslate;
    clientRect = $min.getBoundingClientRect();
    if (clientRect.right < wrapperLeft - widthHalfItem) {
      $min.dataset.order = this._minOrder + count;
      translate += count * 100;
      $min.dataset.translate = translate;
      $min.style.transform = 'translateX('.concat(translate, '%)');
      // update values of extreme properties
      this.__refreshExtremeValues();
    }
  } else {
    const wrapperRight = $wrapperClientRect.right;
    const $max = this._$itemByMaxOrder;
    translate = this._maxTranslate;
    clientRect = $max.getBoundingClientRect();
    if (clientRect.left > wrapperRight + widthHalfItem) {
      $max.dataset.order = this._maxOrder - count;
      translate -= count * 100;
      $max.dataset.translate = translate;
      $max.style.transform = 'translateX('.concat(translate, '%)');
      // update values of extreme properties
      this.__refreshExtremeValues();
    }
  }
  // updating...
  requestAnimationFrame(this._balancingItems.bind(this));
};


// _setActiveClass
_setActiveClass = function() {
  const activeItems = this._activeItems;
  const $itemList = this._$itemList;
  for (let i = 0, length = $itemList.length; i < length; i++) {
    const $item = $itemList[i];
    const index = +$item.dataset.index;
    if (activeItems.indexOf(index) > -1) {
      $item.classList.add(CLASS_ITEM_ACTIVE);
    } else {
      $item.classList.remove(CLASS_ITEM_ACTIVE);
    }
  }
};


// _updateIndicators
_updateIndicators = function() {
  const $indicatorList = this._$indicatorList;
  const $itemList = this._$itemList;
  if (!$indicatorList.length) {
    return;
  }
  for (let index = 0, length = $itemList.length; index < length; index++) {
    const $item = $itemList[index];
    if ($item.classList.contains(CLASS_ITEM_ACTIVE)) {
      $indicatorList[index].classList.add(CLASS_INDICATOR_ACTIVE);
    } else {
      $indicatorList[index].classList.remove(CLASS_INDICATOR_ACTIVE);
    }
  }
};


// move slides
_move = function() {
  if (!hasElementInVew(this._$root)) {
    return;
  }
  const step = this._direction ===
   'next' ? -this._transformStep : this._transformStep;
   const transform = this._transform + step;
  if (!this._config.loop) {
    const endTransformValue =
      this._transformStep * (this._$itemList.length - this._itemsInVisibleArea);
    if (transform < -endTransformValue || transform > 0) {
      return;
    }
    this._$controlPrev.classList.remove(CLASS_CONTROL_HIDE);
    this._$controlNext.classList.remove(CLASS_CONTROL_HIDE);
    if (transform === -endTransformValue) {
      this._$controlNext.classList.add(CLASS_CONTROL_HIDE);
    } else if (transform === 0) {
      this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);
    }
  }
  const activeIndex = [];
  let i = 0;
  let length;
  let index;
  let newIndex;
  if (this._direction === 'next') {
    for (i = 0, length = this._activeItems.length; i < length; i++) {
      index = this._activeItems[i];
      newIndex = ++index;
      if (newIndex > this._$itemList.length - 1) {
        newIndex -= this._$itemList.length;
      }
      activeIndex.push(newIndex);
    }
  } else {
    for (i = 0, length = this._activeItems.length; i < length; i++) {
      index = this._activeItems[i];
      newIndex = --index;
      if (newIndex < 0) {
        newIndex += this._$itemList.length;
      }
      activeIndex.push(newIndex);
    }
  }
  this._activeItems = activeIndex;
  this._setActiveClass();
  this._updateIndicators();
  this._transform = transform;
  this._$items.style.transform = 'translateX('.concat(transform, '%)');
};


// _moveToNext
_moveToNext = function() {
  this._direction = 'next';
  this._move();
};

// _moveToPrev
_moveToPrev = function() {
  this._direction = 'prev';
  this._move();
};

// _moveTo
_moveTo = function(index) {
  const $indicatorList = this._$indicatorList;
  const nearestIndex = null;
  const diff = null;
  let i;
  let length;
  for (i = 0, length = $indicatorList.length; i < length; i++) {
    const $indicator = $indicatorList[i];
    if ($indicator.classList.contains(CLASS_INDICATOR_ACTIVE)) {
      const slideTo = +$indicator.dataset.slideTo;
      if (diff === null) {
        nearestIndex = slideTo;
        diff = Math.abs(index - nearestIndex);
      } else {
        if (Math.abs(index - slideTo) < diff) {
          nearestIndex = slideTo;
          diff = Math.abs(index - nearestIndex);
        }
      }
    }
  }
  diff = index - nearestIndex;
  if (diff === 0) {
    return;
  }
  this._direction = diff > 0 ? 'next' : 'prev';
  for (i = 1; i <= Math.abs(diff); i++) {
    this._move();
  }
};

// _autoplay
_autoplay = function(action) {
  if (!this._config.autoplay) {
    return;
  }
  if (action === 'stop') {
    clearInterval(this._intervalId);
    this._intervalId = null;
    return;
  }
  if (this._intervalId === null) {
    this._intervalId = setInterval(
        function() {
          this._direction = 'next';
          this._move();
        }.bind(this),
        this._config.interval
    );
  }
};

// _refresh
_refresh = function() {
  // create some constants
  const $itemList = this._$itemList;
  const widthItem = $itemList[0].offsetWidth;
  const widthWrapper = this._$wrapper.offsetWidth;
  const itemsInVisibleArea = Math.round(widthWrapper / widthItem);

  if (itemsInVisibleArea === this._itemsInVisibleArea) {
    return;
  }

  this._autoplay('stop');

  this._$items.classList.add(SLIDER_TRANSITION_OFF);
  this._$items.style.transform = 'translateX(0)';

  // setting properties after reset
  this._widthItem = widthItem;
  this._widthWrapper = widthWrapper;
  this._itemsInVisibleArea = itemsInVisibleArea;
  this._transform = 0;
  this._transformStep = 100 / itemsInVisibleArea;
  this._balancingItemsFlag = false;
  this._activeItems = [];

  // setting order and translate items after reset
  for (let i = 0, length = $itemList.length; i < length; i++) {
    const $item = $itemList[i];
    const position = i;
    $item.dataset.index = position;
    $item.dataset.order = position;
    $item.dataset.translate = 0;
    $item.style.transform = 'translateX(0)';
    if (position < itemsInVisibleArea) {
      this._activeItems.push(position);
    }
  }

  this._setActiveClass();

  window.requestAnimationFrame(
      function() {
        this._$items.classList.remove(SLIDER_TRANSITION_OFF);
      }.bind(this)
  );

  // hide prev arrow for non-infinite slider
  if (!this._config.loop) {
    if (this._$controlPrev) {
      this._$controlPrev.classList.add(CLASS_CONTROL_HIDE);
    }
    return;
  }

  // translate last item before first
  const count = $itemList.length - 1;
  const translate = -$itemList.length * 100;
  $itemList[count].dataset.order = -1;
  $itemList[count].dataset.translate = -$itemList.length * 100;
  $itemList[count].style.transform = 'translateX('.concat(translate, '%)');
  // update values of extreme properties
  this.__refreshExtremeValues();
  this._updateIndicators();
  // calling _autoplay
  this._autoplay();
};

// public
next = function() {
  this._moveToNext();
};
prev = function() {
  this._moveToPrev();
};
moveTo = function(index) {
  this._moveTo(index);
};
refresh = function() {
  this._refresh();
};


}

















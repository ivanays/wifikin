"use strict";

// section-1 tecnologies tabs

document.querySelectorAll(".tabs__link").forEach((item) =>
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const id = e.target.getAttribute("href").replace("#", "");

    newFunction();
    item.classList.add("tabs__link--active");
    document.getElementById(id).classList.add("tabs__text--active");
  })
);
document.querySelector(".tabs__link").click();

function newFunction() {
  document
    .querySelectorAll(".tabs__link")
    .forEach((child) => child.classList.remove("tabs__link--active"));
  document
    .querySelectorAll(".tabs__text")
    .forEach((child) => child.classList.remove("tabs__text--active"));
}

//----------------------------------------------------------------------------------

//---------------------------------------------------------------------------
// section-1 background-image map

const screenWidth = document.querySelector("body").offsetWidth;
const dPoint = 1200;
const tPoint = 672;
const sPoint = 294;
const desctop = 1170;
const tablet = 642;
const smartfon = 264;

if (screenWidth > dPoint) {
  //bgPosition(desctop, 670, "bottom 80px", "section-1");
  //bgPosition(desctop, 762, "bottom", "section-4");
  //wMap(desctop, 570, "map");
}
if (dPoint > screenWidth) {
  //bgPosition(tablet, 430, "bottom", "section-4");
  fullMap(tablet, "map");
}
// bgPosition(desctop, 670, "bottom 80px", "section-1");
// bgPosition(desctop, 762, "bottom", "section-4");
// wMap(desctop, 570, "map");

function bgPosition(wContainer, xPosition, yPosition, id) {
  let el = document.getElementById(id);

  const bgPosX = `left ${(screenWidth - wContainer) / 2 + xPosition}px`;
  el.style.backgroundPosition = `${bgPosX} ${yPosition}`;
}

function wMap(wContainer, leftPos, id) {
  let el = document.getElementById(id);
  const wMap = `${(screenWidth - wContainer) / 2 + leftPos}px`;
  el.style.width = wMap;
}

function fullMap(wContainer, id) {
  let el = document.getElementById(id);
  const wMap = `${screenWidth}px`;
  el.style.width = wMap;
  const xPos = `-${(screenWidth - wContainer) / 2}px`;
  el.parentElement.style.left = xPos;
}

let center = [48.8866527839977, 2.34310679732974];

function init() {
  let map = new ymaps.Map("map", {
    center: center,
    zoom: 17,
  });

  map.controls.remove("geolocationControl"); // удаляем геолокацию
  map.controls.remove("searchControl"); // удаляем поиск
  map.controls.remove("trafficControl"); // удаляем контроль трафика
  map.controls.remove("typeSelector"); // удаляем тип
  map.controls.remove("fullscreenControl"); // удаляем кнопку перехода в полноэкранный режим
  map.controls.remove("zoomControl"); // удаляем контрол зуммирования
  map.controls.remove("rulerControl"); // удаляем контрол правил
  map.behaviors.disable(["scrollZoom"]); // отключаем скролл карты (опционально)
}

ymaps.ready(init);

// section-2 rates slider

const slider = document.querySelector(".slider");
const sliderItems = slider.querySelector(".slider__items");
const sliderItem = slider.querySelector(".slider__item");
//const sliderItem = slider.querySelector(".slider__item");
const sliderLine = slider.querySelector(".slider__line");
const sliderChange = slider.querySelector(".slider__change");
//const ratio = (sliderItem.offsetWidth - sliderLine.offsetWidth) / (sliderLine.offsetWidth - 100);
const ratio = (1200 - 692) / (sliderLine.offsetWidth - 100);

const body = document.body;

let isActive = false;

document.addEventListener("DOMContentLoaded", () => {
  // let leftPointSlider = (body.offsetWidth - sliderItem.offsetWidth) / 2;
  // sliderItem.style.left = `${leftPointSlider}px`;
  // let leftPointChange = sliderLine.offsetWidth / 2 - sliderChange.offsetWidth / 2;
  // sliderChange.style.left = `${leftPointChange}px`;
  //let leftPointSlider = (body.offsetWidth - sliderItem.offsetWidth) / 2;
  sliderItem.style.left = `0px`;
  //let leftPointChange = sliderLine.offsetWidth / 2 - sliderChange.offsetWidth / 2;
  sliderChange.style.left = `0px`;
});

sliderLine.addEventListener("mousedown", () => {
  isActive = true;
});

body.addEventListener("mouseup", () => {
  isActive = false;
});

body.addEventListener("mouseleave", () => {
  isActive = false;
});

const beforeAfterSlider = (x) => {
  let shiftItem = Math.max(0, Math.min(x, sliderItem.offsetWidth - body.offsetWidth));
  //let shiftItem = Math.max(0, Math.min(x, sliderItem.offsetWidth - body.offsetWidth));
  //let shiftChange = Math.max(0, Math.min(x, sliderLine.offsetWidth - 100));
  // sliderItem.style.left = `-${shiftItem}px`;
  // sliderChange.style.left = `${shiftChange}px`;
  sliderItem.style.left = `-${shiftItem}px`;
  sliderChange.style.left = `${
    (shiftItem / (sliderItem.offsetWidth - body.offsetWidth)) * 100
  }%`;
};

const pauseEvents = (e) => {
  e.stopPropagation();
  e.preventDefault();
  return false;
};

body.addEventListener("mousemove", (e) => {
  if (!isActive) {
    return;
  }

  let x = e.pageX;
  x -= sliderItems.getBoundingClientRect().left;
  //x -= sliderChange.getBoundingClientRect().left;
  beforeAfterSlider(x);
  pauseEvents(e);
});

slider.addEventListener("touchstart", () => {
  isActive = true;
});

body.addEventListener("touchend", () => {
  isActive = false;
});

body.addEventListener("touchcancel", () => {
  isActive = false;
});

body.addEventListener("touchmove", (e) => {
  if (!isActive) {
    return;
  }

  let x;

  let i;
  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= sliderItems.getBoundingClientRect().left;

  beforeAfterSlider(x);
  pauseEvents(e);
});

// ----------------------------------------------------

// header burger
// код определяющий на каком устройстве открыта страница

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

let burger = document.querySelector(".burger");
let menu = document.querySelector(".menu");

if (isMobile.any()) {
  document.body.classList.add("_touch");
  let rightPadding = (body.offsetWidth - smartfon) / 2;

  burger.addEventListener("click", function (e) {
    body.classList.toggle("_lock");
    menu.classList.toggle("_active");
    burger.classList.toggle("_active");
    if (menu.classList.contains("_active")) {
      let menuActive = document.querySelector(".menu._active");
      menuActive.style.paddingRight = `${rightPadding}px`;
    } else {
      menu.style.paddingRight = 0;
    }
  });
} else {
  document.body.classList.add("_pc");
}

// ----------------------------------------------------

// Плавный скролл Прокрутка при клике

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");

if (menuLinks.length > 0) {
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onLinkClick);
  });

  function onLinkClick(e) {
    const onLink = e.target;
    if (onLink.dataset.goto && document.querySelector(onLink.dataset.goto)) {
      const gotoBlock = document.querySelector(onLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top + pageYOffset;

      if (burger.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        burger.classList.remove("_active");
        menu.classList.remove("_active");
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}

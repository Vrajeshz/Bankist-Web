'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button Scrolling

btnScrollTo.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);

  // console.log(e.target.getBoundingClientRect());

  // console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);

  // console.log(
  //   'Height/Width viewport',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  //Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

/////////////////////////////////////////////////
// Page Navigation;

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click', function(e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// });

// 1. Add event listener to commo parent element
// 2. Determin what element originate the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // Matching Stragey
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

// tabs.forEach(function(el){
//   el.addEventListener('click', function(){
//     console.log("click");
//   })
// });

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Gaurd clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// nav.addEventListener('mouseover', function(e){
//   handleHover(e,0.5);
// });
// nav.addEventListener('mouseout', function(e){
//   handleHover(e,1);
// });

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords.top);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observe) {
//    entries.forEach(entery => {
//     console.log(entery);
//    })
// };

// const obsOption = {
//   root: null,
//   threshold: 0.1,
// };

// const obserever = new IntersectionObserver(obsCallback, obsOption);
// obserever.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Reveal section

// const allSections = document.querySelectorAll('.section');

// const revealSection = function (entries, obserever) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;
//   entry.target.classList.remove('section--hidden');

//   obserever.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.15,
// });

// allSections.forEach(section => {
//   sectionObserver.observe(section);
//   section.classList.add('section--hidden');
// });

// Lazy loading images

const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, obserever) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace img with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  obserever.unobserve(entry.target);
};

const imgObserve = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObserve.observe(img);
});

// Slider

const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotCotainer = document.querySelector('.dots');

  const maxSlide = slides.length - 1;

  const slider = document.querySelector('.slider');
  let currentSlide = 0;

  // slider.style.transform = `scale(0.35) translateX(-800px)`;
  // slider.style.overflow = 'visible';

  // FUnctions
  const createDot = function () {
    slides.forEach(function (_, i) {
      dotCotainer.insertAdjacentHTML(
        'beforeend',
        `
      <button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activeDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else currentSlide++;

    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const preSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else currentSlide--;

    goToSlide(currentSlide);
    activeDot(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    createDot();
    activeDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', preSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') preSlide();
  });

  dotCotainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });
};
slider();
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*
// Selecting Element
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections =  document.querySelectorAll('.section');

console.log(allSections);

document.getElementById('section--1');
const allButton = document.getElementsByTagName('button');
console.log(allButton);

console.log(document.getElementsByClassName('btn'));

// Creating and Inserting Element
// .insertAdjacenthtml
const message = document.createElement('div');
console.log(message);
message.classList.add('cookie-message');
message.textContent = 'We use Cookie to improve functionlatiy and Analytics.';
message.innerHTML = 'We use Cookie to improve functionlatiy and Analytics. <button class = "btn btn--close-cookie">Got it!</button> ';

header.prepend(message);
header.append(message);
header.append(message.cloneNode(true));

header.after(message);
header.before(message);

// Delete Element
document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
});

// Style

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height);
console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =Number.parseFloat( getComputedStyle(message).height, 10) + 40 + 'px';

document.documentElement.style.setProperty('--color-primary' , 'orangered');

// Attribute

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

logo.alt = 'Beautiful minimalist Logo'

//Non-Standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data Attribute 

console.log(logo.dataset.versionNumber);

// Class
logo.classList.add('c','d')
logo.classList.remove('c','d')
logo.classList.toggle('c')
logo.classList.contains('c'); // not includes

// Don't Use
logo.className = 'vrajesh';


///////////////////////////////////////
// Types of Events and Event Handlers
const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

h1.onmouseenter = function (e) {
  alert('onmouseenter: Great! You are reading the heading :D');
};

/////////////////////////////////////
// Event Propagation in Practice
rgb(122,200,95)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('LINK: ', e.target, e.currentTarget);

  //Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('COntainer: ', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV: ', e.target, e.currentTarget);
});

const h1 = document.querySelector('h1');
// const h4 = document.querySelector('h4');
// GOing downwards: child

// querySelector child find kare
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// going upward: parent

// closest parent find kare
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

// going sideway:

console.log(h1.previousElementSibling);
// console.log(h4.previousElementSibling);
console.log(h1.nextElementSibling);
// console.log(h4.nextElementSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)'
  }
});
*/

// document.addEventListener('DOMContentLoaded', function (e) {
//   console.log('HTML Parsed and DOM tree build!', e);
// });

// window.addEventListener('load', function (e) {
//   console.log('PAge fully Loades', e);
// });

// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = ' ';
// });

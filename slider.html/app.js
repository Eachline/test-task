let slider = document.querySelector('.slider');
let sliderItems = document.querySelector('.slides');
let prev = document.querySelector('.btn-prev');
let next = document.querySelector('.btn-next');
let dotsContainer = document.querySelector('.slider__dots');

const slide = (wrapper, items, prev, next) => {
   let posInitial;
   let slides = items.querySelectorAll('.slide');
   let slidesLength = slides.length;
   let slideSize = items.querySelectorAll('.slide')[0].offsetWidth;
   let firstSlide = slides[0];
   let lastSlide = slides[slidesLength - 1];
   let cloneFirst = firstSlide.cloneNode(true);
   let cloneLast = lastSlide.cloneNode(true);
   let index = 0;
   let allowShift = true;

   items.appendChild(cloneFirst);
   items.insertBefore(cloneLast, firstSlide);
   wrapper.classList.add('loaded');

   prev.addEventListener('click', () => {
      shiftSlide(-1);
   });
   next.addEventListener('click', () => {
      shiftSlide(1);
   });

   items.addEventListener('transitionend', checkIndex);

   function shiftSlide(dir) {
      items.classList.add('shifting');

      if (allowShift) {
         posInitial = items.offsetLeft;
         if (dir == 1) {
            items.style.left = posInitial - slideSize + 'px';
            index++;
         } else if (dir == -1) {
            items.style.left = posInitial + slideSize + 'px';
            index--;
         }
         activeDot(index);
      }

      allowShift = false;
   }

   function checkIndex() {
      items.classList.remove('shifting');

      if (index == -1) {
         items.style.left = -(slidesLength * slideSize) + 'px';
         index = slidesLength - 1;
      }

      if (index == slidesLength) {
         items.style.left = -(1 * slideSize) + 'px';
         index = 0;
      }
      activeDot(index);
      allowShift = true;
   }

   function addDots(item) {
      for (let i = 0; i < item.length; i++) {
         let dot = document.createElement('div');
         dot.classList.add('slider__dot');
         dotsContainer.append(dot);
      }
   }
   addDots(slides);

   let dots = document.querySelectorAll('.slider__dot');
   dots[0].classList.add('active');

   function controlsBullet(dotsList) {
      dotsList.forEach((dotItem, idx) => {
         dotItem.addEventListener('click', () => {
            index = idx;
            if (index === idx) {
               items.style.left = -((index + 1) * slideSize) + 'px';
            }
            activeDot(index);
         });
      });
   }
   controlsBullet(dots);

   function activeDot(index) {
      for (let dot of dots) {
         dot.classList.remove('active');
      }
      dots[index].classList.add('active');
   }
};

slide(slider, sliderItems, prev, next);

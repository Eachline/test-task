document.addEventListener('DOMContentLoaded', () => {
   document.body.style.overflow = 'hidden';
   const header = document.querySelector('header');
   const main = document.querySelector('.main');
   const mainChildren = Array.from(main.children);
   const missionImg = document.querySelector('.mission__img');
   const missionDescription = document.querySelector('.mission__description');

   const forms = document.querySelector('.request-form__main');
   const fieldList = forms.querySelectorAll('.field');
   const formBtn = forms.querySelector('.request-form__btn');

   const cookies = document.querySelector('.cookies-indent');
   const cookiesBtn = cookies.querySelector('.cookies__btn');

   window.addEventListener('scroll', () => {
      let scrollDistance = window.scrollY;
      mainChildren.forEach((item) => {
         let searchItemClass = item.classList.contains('mission');
         let onesPlut = item.clientWidth;
         console.log(onesPlut);
         if (searchItemClass && onesPlut > 1200) {
            let itemNode = item;
            let itemHeight = itemNode.clientHeight / 2;
            let itemTop = itemNode.offsetTop;
            let itemMiddle = itemTop - itemHeight;
            if (itemMiddle <= scrollDistance) {
               missionDescription.classList.add('mission__description_hide');
               missionImg.classList.add('mission__img_show');
            }
         }
      });
   });

   formBtn.addEventListener('click', (e) => {
      e.preventDefault();

      fieldList.forEach((field) => {
         field.style.border = 'none';
         if (field.value.toString() === '') {
            field.style.border = '2px solid red';
         }
      });
   });

   setTimeout(() => {
      if (localStorage.getItem('cookies') !== 'save') {
         cookies.style.display = 'block';
         cookiesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('cookies', 'save');
            cookies.style.display = 'none';
         });
      } else {
         cookies.style.display = 'none';
      }
   }, 3000);
});
